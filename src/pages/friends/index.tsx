import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/ui/container';
import { Dispatch, SetStateAction, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import './styles.scss';
import { CustomRadio } from '@/shared/ui/CustomRadio';
import { FrindshipBtnsStatusTypes, IButtonsIds, IPaginationInfo, IPartialUserInfoWithBtnsStatus, SearchModeProp, SearchModeTypes } from '@/features/friendSearch/types';
import { SearchBar } from '@/shared/ui/Searchbar';
import { WebSocketContext } from '@/shared/providers/WebSocketProvider';
import { websocketEventNames } from '@/features/webSocketConnection/lib/websocketEventNames';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getAllFriends, getAllRequestsForFriendship, searchUsersByNickname } from '@/features/friendSearch/api';
import { IPaginationResponse } from '@/shared/types/findAndCount';
import { useInView } from 'react-intersection-observer';
import debounce from 'lodash/debounce';
import { ListOfUsers } from '@/features/friendSearch';
import { createFormData } from '@/shared/lib/CreateFormData';
import { useFriendsActions } from '@/features/friendSearch/lib/useFriendsActions';
import { UserStatusTypes } from '@/shared/ui/userStatus/types';
import { addAlert } from '@/features/alertProvider';
import { queryClient } from '@/app/App';

export const Friends = () => {
	const [currentTab, setCurrentTab] = useState<SearchModeTypes>('Your friends');
	const [searchBarState, setSearchBarState] = useState('');
	const { userId } = useAppSelector((state) => state.user);
	const { sendInviteToFriendShipMutation, acceptFriendshipInviteMutation, rejectFriendshipInviteMutation, sendInviteToGame, sendRejectionInviteToGame } = useFriendsActions();
	const webSocket = useContext(WebSocketContext);
	const PER_PAGE = 10;
	const [globalSearchResult, setGlobalSearchResult] = useState<Array<IPaginationResponse<Array<IPartialUserInfoWithBtnsStatus>>>>([]);
	const [friendsRequestResponse, setFriendsRequestResponse] = useState<Array<IPaginationResponse<Array<IPartialUserInfoWithBtnsStatus>>>>([]);
	const [yourFriendsResponse, setYourFriendsResponse] = useState<Array<IPaginationResponse<Array<IPartialUserInfoWithBtnsStatus>>>>([]);
	const { ref, inView } = useInView();
	const dispatch = useAppDispatch();

	function customRadioHandler(value: SearchModeTypes) {
		setCurrentTab(value);
		switch (currentTab) {
			case 'Global Search':
				globalSearch.remove();
				break;
			case 'Friends requests':
				friendsRequest.remove();
				break;
			case 'Your friends':
				yourFriends.remove();
		}
		setSearchBarState('');
	}

	const globalSearch = useInfiniteQuery({
		queryKey: ['globalSearach'],
		queryFn: ({ pageParam }) => {
			return searchUsersByNickname({ query: searchBarState, userId, page: pageParam ?? 0, perPage: PER_PAGE });
		},
		onSuccess: ({ pages }) => {
			setGlobalSearchResult(pages);
		},
		getNextPageParam: (lastPage) => lastPage.nextPage,
		enabled: currentTab === 'Global Search' && !!userId,
		refetchInterval: 30_000,
	});

	const friendsRequest = useInfiniteQuery({
		queryKey: ['friendsRequest'],
		queryFn: ({ pageParam }) => {
			return getAllRequestsForFriendship({ query: searchBarState, userId, page: pageParam ?? 0, perPage: PER_PAGE });
		},
		onSuccess: ({ pages }) => {
			setFriendsRequestResponse(pages);
		},
		getNextPageParam: (lastPage) => lastPage.nextPage,
		enabled: currentTab === 'Friends requests' && !!userId,
		refetchInterval: 30_000,
	});

	const yourFriends = useInfiniteQuery({
		queryKey: ['yourFriends'],
		queryFn: ({ pageParam }) => {
			return getAllFriends({ query: searchBarState, userId, page: pageParam ?? 0, perPage: PER_PAGE });
		},
		onSuccess: ({ pages }) => {
			setYourFriendsResponse(pages);
		},
		getNextPageParam: (lastPage) => lastPage.nextPage,
		enabled: currentTab === 'Your friends' && !!userId,
		refetchOnWindowFocus: false,
		refetchInterval: 30_000,
	});

	function buttons(btnStatus: string | null, ids: IButtonsIds, paginationInfo: IPaginationInfo, userStatus: UserStatusTypes) {
		switch (btnStatus) {
			case null:
				return <Button onClick={() => addToFriends(userId, ids.userId, paginationInfo)} size={'tiny'} variant={'primary'} fullWidth={false} type={'button'} title={'Add friend'} />;
			case 'invitation':
				return (
					<>
						<Button size={'tiny'} variant={'primary'} fullWidth={false} type={'button'} onClick={() => acceptFriendshipInvite(ids.invitationId ?? 0, paginationInfo)} title={'Accept'} />
						<Button size={'tiny'} variant={'warning'} fullWidth={false} type={'button'} onClick={() => rejectFriendshipInvite(ids.invitationId ?? 0, paginationInfo)} title={'Reject'} />
					</>
				);
			case 'friend':
				return (
					<Button
						size={'tiny'}
						variant={'primary'}
						fullWidth={false}
						type={'button'}
						onClick={() => inviteToGame(ids.userId, paginationInfo)}
						title={'Invite to game'}
						disabled={userStatus === 'offline'}
					/>
				);
			case 'invitedToGame':
				return <Button size={'tiny'} variant={'secondary'} fullWidth={false} type={'button'} onClick={() => rejectionInviteToGame(ids.userId, paginationInfo)} title={'Invited to game'} />;
			case 'pending':
				return <Button size={'tiny'} variant={'secondary'} fullWidth={false} type={'button'} onClick={() => rejectFriendshipInvite(ids.invitationId ?? 0, paginationInfo)} title={'Pending'} />;
			case 'loading':
				return <div>loading...</div>;
			case 'error':
				return <Button size={'tiny'} variant={'warning'} fullWidth={false} type={'button'} title={'Error'} />;
		}
	}

	function inviteToGame(friendId: string, paginationInfo: IPaginationInfo) {
		if (sendInviteToGame(friendId, userId, paginationInfo)) {
			replaceBtnsStatus(setYourFriendsResponse, paginationInfo, 'loading');
		} else {
			replaceBtnsStatus(setYourFriendsResponse, paginationInfo, 'error');
		}
	}

	function rejectionInviteToGame(friendId: string, paginationInfo: IPaginationInfo) {
		replaceBtnsStatus(setYourFriendsResponse, paginationInfo, 'loading');
		if (sendRejectionInviteToGame(friendId, userId)) {
			replaceBtnsStatus(setYourFriendsResponse, paginationInfo, 'friend');
		} else {
			replaceBtnsStatus(setYourFriendsResponse, paginationInfo, 'error');
		}
	}

	async function addToFriends(userId: string, invitationUserId: string, paginationInfo: IPaginationInfo) {
		replaceBtnsStatus(setGlobalSearchResult, paginationInfo, 'loading');
		const formData: FormData = createFormData([
			{ key: 'userId', value: String(userId) },
			{ key: 'invitationUserId', value: String(invitationUserId) },
		]);
		const response = await sendInviteToFriendShipMutation.mutateAsync(formData);
		if (response) {
			setGlobalSearchResult((state) => {
				state[paginationInfo.page].rows[paginationInfo.item].btnsStatus = 'pending';
				state[paginationInfo.page].rows[paginationInfo.item].invitationId = response.invitationId;
				return [...state];
			});
		} else {
			replaceBtnsStatus(setGlobalSearchResult, paginationInfo, 'error');
		}
	}

	async function acceptFriendshipInvite(inviteId: number, paginationInfo: IPaginationInfo) {
		switch (currentTab) {
			case 'Global Search':
				replaceBtnsStatus(setGlobalSearchResult, paginationInfo, 'loading');
				break;
			case 'Friends requests':
				replaceBtnsStatus(setFriendsRequestResponse, paginationInfo, 'loading');
				break;
		}

		const formData: FormData = createFormData([{ key: 'inviteId', value: String(inviteId) }]);
		const response = await acceptFriendshipInviteMutation.mutateAsync(formData);
		if (response) {
			switch (currentTab) {
				case 'Global Search':
					replaceBtnsStatus(setGlobalSearchResult, paginationInfo, 'friend');
					break;
				case 'Friends requests':
					setFriendsRequestResponse((state) => {
						state[paginationInfo.page].rows.splice(paginationInfo.item, 1);
						return [...state];
					});
					break;
			}
		} else {
			replaceBtnsStatus(setGlobalSearchResult, paginationInfo, 'error');
		}
	}

	async function rejectFriendshipInvite(inviteId: number, paginationInfo: IPaginationInfo) {
		switch (currentTab) {
			case 'Global Search':
				replaceBtnsStatus(setGlobalSearchResult, paginationInfo, 'loading');
				break;
			case 'Friends requests':
				replaceBtnsStatus(setGlobalSearchResult, paginationInfo, 'loading');
				break;
		}

		const formData: FormData = createFormData([{ key: 'inviteId', value: String(inviteId) }]);
		const response = await rejectFriendshipInviteMutation.mutateAsync(formData);
		if (response) {
			switch (currentTab) {
				case 'Global Search':
					replaceBtnsStatus(setGlobalSearchResult, paginationInfo, null);
					break;
				case 'Friends requests':
					setFriendsRequestResponse((state) => {
						state[paginationInfo.page].rows.splice(paginationInfo.item, 1);
						return [...state];
					});
					break;
			}
		} else {
			replaceBtnsStatus(setGlobalSearchResult, paginationInfo, 'error');
		}
	}

	function replaceBtnsStatus(
		setState: Dispatch<SetStateAction<Array<IPaginationResponse<Array<IPartialUserInfoWithBtnsStatus>>>>>,
		{ page, item }: IPaginationInfo,
		friendshipStatus: FrindshipBtnsStatusTypes
	) {
		setState((state) => {
			state[page].rows[item].btnsStatus = friendshipStatus;
			return [...state];
		});
	}

	useEffect(() => {
		if ((globalSearch.hasNextPage || friendsRequest.hasNextPage || yourFriends.hasNextPage) && inView) {
			switch (currentTab) {
				case 'Global Search':
					globalSearch.fetchNextPage();
					break;
				case 'Friends requests':
					friendsRequest.fetchNextPage();
					break;
				case 'Your friends':
					yourFriends.fetchNextPage();
			}
		}
	}, [inView, globalSearch, friendsRequest, yourFriends, currentTab]);

	useEffect(() => {
		if (webSocket) {
			webSocket.subscribeToOnUpdate(websocketEventNames.INVITATION_TO_GAME_HAS_BEEN_SENT, (message) => {
				replaceBtnsStatus(setYourFriendsResponse, message.data.paginationInfo, 'invitedToGame');
			});

			webSocket.subscribeToOnUpdate(websocketEventNames.INVITE_TO_GAME_IS_REJECTED, () => {
				switch (currentTab) {
					case 'Global Search':
						globalSearch.refetch();
						break;
					case 'Your friends':
						yourFriends.refetch();
				}
			});
			webSocket.subscribeToOnUpdate(websocketEventNames.USER_IS_NOT_ONLINE, () => {
				dispatch(addAlert({ heading: 'Oooooopsss!', text: 'User is not currently online' }));
				switch (currentTab) {
					case 'Global Search':
						globalSearch.refetch();
						break;
					case 'Your friends':
						yourFriends.refetch();
				}
			});

			return () => {
				webSocket.unSubscribeToOnUpdate(websocketEventNames.INVITATION_TO_GAME_HAS_BEEN_SENT);
				webSocket.unSubscribeToOnUpdate(websocketEventNames.INVITE_TO_GAME_IS_REJECTED);
				webSocket.unSubscribeToOnUpdate(websocketEventNames.USER_IS_NOT_ONLINE);
			};
		}
	}, [currentTab, dispatch, globalSearch, webSocket, yourFriends]);

	const searchBarDebounce = useMemo(() => {
		return debounce(() => {
			switch (currentTab) {
				case 'Global Search':
					queryClient.removeQueries({ queryKey: ['globalSearach'] });
					globalSearch.fetchNextPage();
					break;
				case 'Friends requests':
					queryClient.removeQueries({ queryKey: ['friendsRequest'] });
					friendsRequest.fetchNextPage();

					break;
				case 'Your friends':
					queryClient.removeQueries({ queryKey: ['yourFriends'] });
					yourFriends.fetchNextPage();
			}
		}, 300);
	}, [currentTab, globalSearch, friendsRequest, yourFriends]);

	const searchBarHandler = useCallback(
		(value: string) => {
			setSearchBarState(value);
			searchBarDebounce();
		},
		[currentTab]
	);

	return (
		<div className='friends'>
			<Container className='friends__container' size={'large'}>
				<SearchBar value={searchBarState} onChange={searchBarHandler} />

				<CustomRadio<SearchModeProp, SearchModeTypes> fields={['Your friends', 'Friends requests', 'Global Search']} value={currentTab} onChange={customRadioHandler} />

				{currentTab === 'Your friends' && (
					<ListOfUsers list={yourFriendsResponse} ref={ref}>
						{buttons}
					</ListOfUsers>
				)}
				{currentTab === 'Friends requests' && (
					<ListOfUsers list={friendsRequestResponse} ref={ref}>
						{buttons}
					</ListOfUsers>
				)}
				{currentTab === 'Global Search' && (
					<ListOfUsers list={globalSearchResult} ref={ref}>
						{buttons}
					</ListOfUsers>
				)}
			</Container>
		</div>
	);
};
