import { Button, CustomButton } from '@/shared/ui/button';
import { Container } from '@/shared/ui/container';
import { Dispatch, SetStateAction, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import './styles.scss';
import { CustomRadio } from '@/shared/ui/CustomRadio';
import { FrindshipBtnsStatusTypes, IButtonsIds, IPaginationInfo, IPartialUserInfoWithBtnsStatus, SearchModeProp, SearchModeTypes } from '@/features/friendSearch/types';
import { SearchBar } from '@/shared/ui/Searchbar';
import { WebSocketContext } from '@/shared/providers/WebSocketProvider';
import { websocketEventNames } from '@/features/webSocketConnection/lib/websocketEventNames';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { getAllFriends, getAllRequestsForFriendship, searchUsersByNickname, sendAcceptFriendshipInvite, sendInviteToFriendship, sendRejectFriendshipInvite } from '@/features/friendSearch/api';
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
import { friendBtnStatuses } from '@/features/friendSearch/friendBtnStatuses';
import { userStatuses } from '@/shared/ui/userStatus/userStatuses';

export const Friends = () => {
	const [currentTab, setCurrentTab] = useState<SearchModeTypes>('Friends');
	const [searchBarState, setSearchBarState] = useState('');
	const { userId } = useAppSelector((state) => state.user);
	const { sendInviteToGame, sendDeclineInviteToGame } = useFriendsActions();
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
		enabled: currentTab === 'Requests' && !!userId,
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
		enabled: currentTab === 'Friends' && !!userId,
		refetchOnWindowFocus: false,
		refetchInterval: 30_000,
	});

	const sendInviteToFriendShipMutation = useMutation({
		mutationFn: async ({ userId, formData }: { userId: string; formData: FormData }) => await sendInviteToFriendship(userId, formData),
		onError: () => {
			globalSearch.refetch();
		},
	});

	const acceptFriendshipInviteMutation = useMutation({
		mutationFn: async (invitationId: string) => await sendAcceptFriendshipInvite(invitationId),
		onError: () => {
			switch (currentTab) {
				case 'Search':
					globalSearch.refetch();
					break;
				case 'Requests':
					friendsRequest.refetch();
					break;
			}
		},
	});

	const rejectFriendshipInviteMutation = useMutation({
		mutationFn: async (invitationId: string) => await sendRejectFriendshipInvite(invitationId),
		onError: () => {
			switch (currentTab) {
				case 'Search':
					globalSearch.refetch();
					break;
				case 'Requests':
					friendsRequest.refetch();
					break;
			}
		},
	});

	function buttons(btnStatus: string | null, ids: IButtonsIds, paginationInfo: IPaginationInfo, userStatus: UserStatusTypes) {
		switch (btnStatus) {
			case null:
				return (
					<CustomButton size={'tiny'} onClick={() => addToFriends(userId, ids.userId, paginationInfo)}>
						<Icon name={'addToFriends'} size='large' />
					</CustomButton>
				);

			case friendBtnStatuses.INVITATION_TO_FRIENDS:
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
			case friendBtnStatuses.FRIEND:
				return (
					<CustomButton size={'tiny'} onClick={() => inviteToGame(ids.userId, paginationInfo)} disabled={userStatus === userStatuses.OFFLINE}>
						<Icon name={'inviteToGame'} size='large' />
					</CustomButton>
				);
			case friendBtnStatuses.INVITED_TO_GAME:
				return (
					<CustomButton size={'tiny'} onClick={() => declineInviteToGame(ids.userId, paginationInfo)}>
						<Icon name={'invitedToGame'} size='large' />
					</CustomButton>
				);
			case friendBtnStatuses.PENDING:
				return (
					<CustomButton size={'tiny'} onClick={() => rejectFriendshipInvite(ids.invitationId ?? '0', paginationInfo)}>
						<Icon name={'pending'} size='large' />
					</CustomButton>
				);
			case friendBtnStatuses.LOADING:
				return (
					<CustomButton size={'tiny'}>
						<Icon name={'spiner'} size='large' />
					</CustomButton>
				);
			case friendBtnStatuses.ERROR:
				return <Button size={'tiny'} variant={'warning'} fullWidth={false} type={'button'} title={'Error'} />;
		}
	}

	function inviteToGame(friendId: string, paginationInfo: IPaginationInfo) {
		if (sendInviteToGame(friendId, userId, paginationInfo)) {
			switch (currentTab) {
				case 'Search':
					replaceBtnsStatus(setGlobalSearchResult, paginationInfo, friendBtnStatuses.LOADING);
					break;
				case 'Friends':
					replaceBtnsStatus(setYourFriendsResponse, paginationInfo, friendBtnStatuses.LOADING);
					break;
			}
		} else {
			switch (currentTab) {
				case 'Search':
					replaceBtnsStatus(setGlobalSearchResult, paginationInfo, friendBtnStatuses.ERROR);
					break;
				case 'Friends':
					replaceBtnsStatus(setYourFriendsResponse, paginationInfo, friendBtnStatuses.ERROR);
					break;
			}
		}
	}

	function declineInviteToGame(friendId: string, paginationInfo: IPaginationInfo) {
		switch (currentTab) {
			case 'Search':
				replaceBtnsStatus(setGlobalSearchResult, paginationInfo, friendBtnStatuses.LOADING);
				break;
			case 'Friends':
				replaceBtnsStatus(setYourFriendsResponse, paginationInfo, friendBtnStatuses.LOADING);
				break;
		}
		if (sendDeclineInviteToGame(friendId, userId)) {
			switch (currentTab) {
				case 'Search':
					replaceBtnsStatus(setGlobalSearchResult, paginationInfo, friendBtnStatuses.FRIEND);
					break;
				case 'Friends':
					replaceBtnsStatus(setYourFriendsResponse, paginationInfo, friendBtnStatuses.FRIEND);
					break;
			}
		} else {
			switch (currentTab) {
				case 'Search':
					replaceBtnsStatus(setGlobalSearchResult, paginationInfo, friendBtnStatuses.ERROR);
					break;
				case 'Friends':
					replaceBtnsStatus(setYourFriendsResponse, paginationInfo, friendBtnStatuses.ERROR);
					break;
			}
		}
	}

	async function addToFriends(userId: string, invitationUserId: string, paginationInfo: IPaginationInfo) {
		replaceBtnsStatus(setGlobalSearchResult, paginationInfo, friendBtnStatuses.LOADING);
		const formData: FormData = createFormData([{ key: 'invitationUserId', value: invitationUserId }]);
		const response = await sendInviteToFriendShipMutation.mutateAsync({ userId, formData });
		if (response) {
			setGlobalSearchResult((state) => {
				state[paginationInfo.page].rows[paginationInfo.item].btnsStatus = friendBtnStatuses.PENDING;
				state[paginationInfo.page].rows[paginationInfo.item].invitationId = response;
				return [...state];
			});
		} else {
			replaceBtnsStatus(setGlobalSearchResult, paginationInfo, friendBtnStatuses.ERROR);
		}
	}

	async function acceptFriendshipInvite(invitationId: string, paginationInfo: IPaginationInfo) {
		switch (currentTab) {
			case 'Search':
				replaceBtnsStatus(setGlobalSearchResult, paginationInfo, friendBtnStatuses.LOADING);
				break;
			case 'Requests':
				replaceBtnsStatus(setFriendsRequestResponse, paginationInfo, friendBtnStatuses.LOADING);
				break;
		}

		const response = await acceptFriendshipInviteMutation.mutateAsync(invitationId);
		if (response) {
			switch (currentTab) {
				case 'Search':
					replaceBtnsStatus(setGlobalSearchResult, paginationInfo, friendBtnStatuses.FRIEND);
					break;
				case 'Requests':
					setFriendsRequestResponse((state) => {
						state[paginationInfo.page].rows.splice(paginationInfo.item, 1);
						return [...state];
					});
					break;
			}
		} else {
			replaceBtnsStatus(setGlobalSearchResult, paginationInfo, friendBtnStatuses.ERROR);
		}
	}

	async function rejectFriendshipInvite(invitationId: string, paginationInfo: IPaginationInfo) {
		switch (currentTab) {
			case 'Search':
				replaceBtnsStatus(setGlobalSearchResult, paginationInfo, friendBtnStatuses.LOADING);
				break;
			case 'Requests':
				replaceBtnsStatus(setFriendsRequestResponse, paginationInfo, friendBtnStatuses.LOADING);
				break;
		}

		const response = await rejectFriendshipInviteMutation.mutateAsync(invitationId);

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
			replaceBtnsStatus(setGlobalSearchResult, paginationInfo, friendBtnStatuses.LOADING);
		}
	}

	function replaceBtnsStatus(
		setState: Dispatch<SetStateAction<Array<IPaginationResponse<Array<IPartialUserInfoWithBtnsStatus>>>>>,
		{ page, item }: IPaginationInfo,
		friendshipStatus: FrindshipBtnsStatusTypes
	) {
		setState((state) => {
			if (state[page].rows.length) {
				state[page].rows[item].btnsStatus = friendshipStatus;
				return [...state];
			}
			return state;
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
			webSocket.subscribeToOnUpdate(websocketEventNames.INVITATION_TO_GAME_HAS_BEEN_SENT, () => {
				switch (currentTab) {
					case 'Search':
						globalSearch.refetch();
						break;
					case 'Friends':
						yourFriends.refetch();
				}
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
					<ListOfUsers list={yourFriendsResponse} ref={ref} isLoading={yourFriends.isLoading} isSuccess={yourFriends.isSuccess} isError={yourFriends.isError}>
						{buttons}
					</ListOfUsers>
				)}
				{currentTab === 'Requests' && (
					<ListOfUsers list={friendsRequestResponse} ref={ref} isLoading={friendsRequest.isLoading} isSuccess={friendsRequest.isSuccess} isError={friendsRequest.isError}>
						{buttons}
					</ListOfUsers>
				)}
				{currentTab === 'Search' && (
					<ListOfUsers list={globalSearchResult} ref={ref} isLoading={globalSearch.isLoading} isSuccess={globalSearch.isSuccess} isError={globalSearch.isError}>
						{buttons}
					</ListOfUsers>
				)}
			</Container>
		</div>
	);
};
