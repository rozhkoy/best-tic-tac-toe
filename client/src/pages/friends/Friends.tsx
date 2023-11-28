import { Button, CustomButton } from '@/shared/ui/button';
import { Container } from '@/shared/ui/container';
import { Dispatch, SetStateAction, useCallback, useContext, useEffect, useMemo, useState } from 'react';
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
import { Icon } from '@/shared/ui/icon';

export const Friends = () => {
	const [currentTab, setCurrentTab] = useState<SearchModeTypes>('Friends');
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
			case 'Search':
				globalSearch.remove();
				break;
			case 'Requests':
				friendsRequest.remove();
				break;
			case 'Friends':
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
		enabled: currentTab === 'Search' && !!userId,
		refetchInterval: 30000,
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
		enabled: currentTab === 'Requests' && !!userId,
		refetchInterval: 30000,
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
		enabled: currentTab === 'Friends' && !!userId,
		refetchOnWindowFocus: false,
		refetchInterval: 30000,
	});

	function buttons(btnStatus: string | null, ids: IButtonsIds, paginationInfo: IPaginationInfo, userStatus: UserStatusTypes) {
		switch (btnStatus) {
			case null:
				return (
					<CustomButton size={'tiny'} onClick={() => addToFriends(userId, ids.userId, paginationInfo)}>
						<Icon name={'addToFriends'} size='large' />
					</CustomButton>
				);

			case 'invitation':
				return (
					<>
						<CustomButton size={'tiny'} onClick={() => acceptFriendshipInvite(ids.invitationId ?? '0', paginationInfo)}>
							<Icon name={'mark'} size='large' />
						</CustomButton>
						<CustomButton size={'tiny'} onClick={() => rejectFriendshipInvite(ids.invitationId ?? '0', paginationInfo)}>
							<Icon name={'reject'} size='large' />
						</CustomButton>
					</>
				);
			case 'friend':
				return (
					<CustomButton size={'tiny'} onClick={() => inviteToGame(ids.userId, paginationInfo)} disabled={userStatus === 'offline'}>
						<Icon name={'inviteToGame'} size='large' />
					</CustomButton>
				);
			case 'invitedToGame':
				return (
					<CustomButton size={'tiny'} onClick={() => rejectionInviteToGame(ids.userId, paginationInfo)}>
						<Icon name={'invitedToGame'} size='large' />
					</CustomButton>
				);
			case 'pending':
				return (
					<CustomButton size={'tiny'} onClick={() => rejectFriendshipInvite(ids.invitationId ?? '0', paginationInfo)}>
						<Icon name={'pending'} size='large' />
					</CustomButton>
				);
			case 'loading':
				return (
					<CustomButton size={'tiny'}>
						<Icon name={'spiner'} size='large' />
					</CustomButton>
				);
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

	async function acceptFriendshipInvite(inviteId: string, paginationInfo: IPaginationInfo) {
		switch (currentTab) {
			case 'Search':
				replaceBtnsStatus(setGlobalSearchResult, paginationInfo, 'loading');
				break;
			case 'Requests':
				replaceBtnsStatus(setFriendsRequestResponse, paginationInfo, 'loading');
				break;
		}

		const formData: FormData = createFormData([{ key: 'inviteId', value: String(inviteId) }]);
		const response = await acceptFriendshipInviteMutation.mutateAsync(formData);
		if (response) {
			switch (currentTab) {
				case 'Search':
					replaceBtnsStatus(setGlobalSearchResult, paginationInfo, 'friend');
					break;
				case 'Requests':
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

	async function rejectFriendshipInvite(inviteId: string, paginationInfo: IPaginationInfo) {
		switch (currentTab) {
			case 'Search':
				replaceBtnsStatus(setGlobalSearchResult, paginationInfo, 'loading');
				break;
			case 'Requests':
				replaceBtnsStatus(setGlobalSearchResult, paginationInfo, 'loading');
				break;
		}

		const formData: FormData = createFormData([{ key: 'inviteId', value: String(inviteId) }]);
		const response = await rejectFriendshipInviteMutation.mutateAsync(formData);
		if (response) {
			switch (currentTab) {
				case 'Search':
					replaceBtnsStatus(setGlobalSearchResult, paginationInfo, null);
					break;
				case 'Requests':
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
				case 'Search':
					globalSearch.fetchNextPage();
					break;
				case 'Requests':
					friendsRequest.fetchNextPage();
					break;
				case 'Friends':
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
					case 'Search':
						globalSearch.refetch();
						break;
					case 'Friends':
						yourFriends.refetch();
				}
			});
			webSocket.subscribeToOnUpdate(websocketEventNames.USER_IS_NOT_ONLINE, () => {
				dispatch(addAlert({ heading: 'Oooooopsss!', text: 'User is not currently online' }));
				switch (currentTab) {
					case 'Search':
						globalSearch.refetch();
						break;
					case 'Friends':
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
				case 'Search':
					queryClient.removeQueries({ queryKey: ['globalSearach'] });
					globalSearch.fetchNextPage();
					break;
				case 'Requests':
					queryClient.removeQueries({ queryKey: ['friendsRequest'] });
					friendsRequest.fetchNextPage();

					break;
				case 'Friends':
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
			<Container className='friends__container' size={'large'} withPadding={true}>
				<SearchBar value={searchBarState} onChange={searchBarHandler} />

				<CustomRadio<SearchModeProp, SearchModeTypes> fields={['Friends', 'Requests', 'Search']} value={currentTab} onChange={customRadioHandler} />

				{currentTab === 'Friends' && (
					<ListOfUsers list={yourFriendsResponse} ref={ref}>
						{buttons}
					</ListOfUsers>
				)}
				{currentTab === 'Requests' && (
					<ListOfUsers list={friendsRequestResponse} ref={ref}>
						{buttons}
					</ListOfUsers>
				)}
				{currentTab === 'Search' && (
					<ListOfUsers list={globalSearchResult} ref={ref}>
						{buttons}
					</ListOfUsers>
				)}
			</Container>
		</div>
	);
};
