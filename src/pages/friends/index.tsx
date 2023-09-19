import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/ui/container';
import { Dispatch, SetStateAction, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import './styles.scss';
import { CustomRadio } from '@/shared/ui/CustomRadio';
import { FriendItemBtnsStatusTypes, IButtonsIds, IPaginationInfo, IPartialUserInfoWithFriendshipStatus, SearchModeProp, SearchModeTypes } from '@/features/friendSearch/types';
import { SearchBar } from '@/shared/ui/Searchbar';
import { WebSocketContext } from '@/shared/providers/WebSocketProvider';
import { ISendInviteToGame } from '@/features/webSocketConnection/types';
import { IWebSocketMessage } from '@/shared/types/webSocketMessage';
import { websocketEventNames } from '@/features/webSocketConnection/lib/websocketEventNames';
import { useAppSelector } from '@/shared/hooks/reduxHooks';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { getAllFriends, getAllRequestsForFriendship, searchUsersByNickname, sendAcceptFriendshipInvite, sendInviteToFriendship, sendRejectFriendshipInvite } from '@/features/friendSearch/api';
import { IPaginationResponse } from '@/shared/types/findAndCount';
import React from 'react';
import { FriendItem } from '@/shared/ui/friendItem';
import { useInView } from 'react-intersection-observer';
import debounce from 'lodash/debounce';
import { createFormData } from '@/shared/lib/CreateFormData';

export const Friends = () => {
	const [currentTab, setCurrentTab] = useState<SearchModeTypes>('Your friends');
	const [searchBarState, setSearchBarState] = useState('');
	const { userId } = useAppSelector((state) => state.user);
	const webSocket = useContext(WebSocketContext);
	const PER_PAGE = 10;
	const [globalSearchResult, setGlobalSearchResult] = useState<Array<IPaginationResponse<Array<IPartialUserInfoWithFriendshipStatus>>>>([]);
	const [friendsRequestResponse, setFriendsRequestResponse] = useState<Array<IPaginationResponse<Array<IPartialUserInfoWithFriendshipStatus>>>>([]);
	const [yourFriendsResponse, setYourFriendsResponse] = useState<Array<IPaginationResponse<Array<IPartialUserInfoWithFriendshipStatus>>>>([]);
	const { ref, inView } = useInView();

	function sendInviteToGame(friendId: number, paginationInfo: IPaginationInfo) {
		const message: IWebSocketMessage<ISendInviteToGame> = {
			event: websocketEventNames.INVITE_TO_GAME,
			userId,
			data: {
				friendId,
				paginationInfo,
			},
		};

		webSocket?.instance.send(JSON.stringify(message));

		replaceFriendshiptStatus(setYourFriendsResponse, paginationInfo, 'loading');
	}

	useEffect(() => {
		if (webSocket) {
			webSocket.subscribeToOnUpdate(websocketEventNames.INVITATION_TO_GAME_HAS_BEEN_SENT, (message) => {
				replaceFriendshiptStatus(setYourFriendsResponse, message.data.paginationInfo, 'invitedToGame');
			});
			webSocket.subscribeToOnUpdate(websocketEventNames.INVITE_TO_GAME_IS_REJECTED, (message) => {
				for (let page = 0; page < yourFriendsResponse.length; page++) {
					for (let item = 0; item < yourFriendsResponse[page].rows.length; item++) {
						if (yourFriendsResponse[page].rows[item].userId === message.userId) {
							replaceFriendshiptStatus(setYourFriendsResponse, { page, item }, 'friend');
						}
					}
				}
			});
		}
	});

	const searchBarDebounce = useMemo(() => {
		return debounce((pageParam) => {
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
		}, 300);
	}, [debounce, currentTab]);

	const searchBarHandler = useCallback((value: string) => {
		setSearchBarState(value);
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

		// searchBarDebounce(0);
	}, []);

	function customRadioHandler(value: SearchModeTypes) {
		setCurrentTab(value);
		setSearchBarState('');
	}

	const globalSearch = useInfiniteQuery({
		queryKey: ['globalSearach'],
		queryFn: ({ pageParam }) => {
			return searchUsersByNickname({ query: searchBarState, userId, page: pageParam ?? 0, perPage: PER_PAGE });
		},
		onSuccess: ({ pages }) => {
			console.log(pages);
			setGlobalSearchResult(pages);
		},
		getNextPageParam: (lastPage) => lastPage.nextPage,
		enabled: currentTab === 'Global Search' && !!userId,
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
	});

	function buttons(status: string | null, ids: IButtonsIds, paginationInfo: IPaginationInfo) {
		switch (status) {
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
				return <Button size={'tiny'} variant={'primary'} fullWidth={false} type={'button'} onClick={() => sendInviteToGame(ids.userId, paginationInfo)} title={'Invite to game'} />;
			case 'invitedToGame':
				return <Button size={'tiny'} variant={'secondary'} fullWidth={false} type={'button'} title={'Invited to game'} />;
			case 'pending':
				return <Button size={'tiny'} variant={'secondary'} fullWidth={false} type={'button'} onClick={() => rejectFriendshipInvite(ids.invitationId ?? 0, paginationInfo)} title={'Pending'} />;
			case 'loading':
				return <div>loading...</div>;
			case 'error':
				return <Button size={'tiny'} variant={'warning'} fullWidth={false} type={'button'} title={'Error'} />;
		}
	}

	const sendInviteToFriendShipMutation = useMutation({
		mutationFn: async (formData: FormData) => await sendInviteToFriendship(formData),
	});

	const acceptFriendshipInviteMutation = useMutation({
		mutationFn: async (formData: FormData) => await sendAcceptFriendshipInvite(formData),
	});

	const rejectFriendshipInviteMutation = useMutation({
		mutationFn: async (formData: FormData) => await sendRejectFriendshipInvite(formData),
	});

	async function addToFriends(userId: number, invitationUserId: number, paginationInfo: IPaginationInfo) {
		replaceFriendshiptStatus(setGlobalSearchResult, paginationInfo, 'loading');
		const formData: FormData = createFormData([
			{ key: 'userId', value: String(userId) },
			{ key: 'invitationUserId', value: String(invitationUserId) },
		]);
		const response = await sendInviteToFriendShipMutation.mutateAsync(formData);
		if (response) {
			setGlobalSearchResult((state) => {
				state[paginationInfo.page].rows[paginationInfo.item].friendshipStatus = 'pending';
				state[paginationInfo.page].rows[paginationInfo.item].invitationId = response.invitationId;
				return [...state];
			});
		} else {
			replaceFriendshiptStatus(setGlobalSearchResult, paginationInfo, 'error');
		}
	}

	async function acceptFriendshipInvite(inviteId: number, paginationInfo: IPaginationInfo) {
		switch (currentTab) {
			case 'Global Search':
				replaceFriendshiptStatus(setGlobalSearchResult, paginationInfo, 'loading');
				break;
			case 'Friends requests':
				replaceFriendshiptStatus(setFriendsRequestResponse, paginationInfo, 'loading');
				break;
		}

		const formData: FormData = createFormData([{ key: 'inviteId', value: String(inviteId) }]);
		const response = await acceptFriendshipInviteMutation.mutateAsync(formData);
		if (response) {
			switch (currentTab) {
				case 'Global Search':
					replaceFriendshiptStatus(setGlobalSearchResult, paginationInfo, 'friend');
					break;
				case 'Friends requests':
					setFriendsRequestResponse((state) => {
						state[paginationInfo.page].rows.splice(paginationInfo.item, 1);
						return [...state];
					});
					break;
			}
		} else {
			replaceFriendshiptStatus(setGlobalSearchResult, paginationInfo, 'error');
		}
	}

	async function rejectFriendshipInvite(inviteId: number, paginationInfo: IPaginationInfo) {
		switch (currentTab) {
			case 'Global Search':
				replaceFriendshiptStatus(setGlobalSearchResult, paginationInfo, 'loading');
				break;
			case 'Friends requests':
				replaceFriendshiptStatus(setGlobalSearchResult, paginationInfo, 'loading');
				break;
		}

		const formData: FormData = createFormData([{ key: 'inviteId', value: String(inviteId) }]);
		const response = await rejectFriendshipInviteMutation.mutateAsync(formData);
		if (response) {
			switch (currentTab) {
				case 'Global Search':
					replaceFriendshiptStatus(setGlobalSearchResult, paginationInfo, null);
					break;
				case 'Friends requests':
					setFriendsRequestResponse((state) => {
						state[paginationInfo.page].rows.splice(paginationInfo.item, 1);
						return [...state];
					});
					break;
			}
		} else {
			replaceFriendshiptStatus(setGlobalSearchResult, paginationInfo, 'error');
		}
	}

	function replaceFriendshiptStatus(
		setState: Dispatch<SetStateAction<Array<IPaginationResponse<Array<IPartialUserInfoWithFriendshipStatus>>>>>,
		{ page, item }: IPaginationInfo,
		friendshipStatus: FriendItemBtnsStatusTypes
	) {
		setState((state) => {
			state[page].rows[item].friendshipStatus = friendshipStatus;
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
	}, [inView, globalSearch.hasNextPage, friendsRequest.hasNextPage, yourFriends.hasNextPage]);

	return (
		<div className='friends'>
			<Container className='friends__container' size={'large'}>
				<SearchBar value={searchBarState} onChange={searchBarHandler} />

				<CustomRadio<SearchModeProp, SearchModeTypes> fields={['Your friends', 'Friends requests', 'Global Search']} value={currentTab} onChange={customRadioHandler} />

				{currentTab === 'Your friends' &&
					yourFriendsResponse.map((page, pageIndex, pages) => {
						return (
							<React.Fragment key={pageIndex}>
								{page.rows.map(({ status, nickname, userId, friendshipStatus }, itemIndex, page) => {
									if (pageIndex === pages.length - 1 && itemIndex === page.length - 1) {
										return (
											<FriendItem ref={ref} key={userId} variant={'secondary'} src={''} status={status} nickname={nickname}>
												{userId}
												{buttons(friendshipStatus, { userId }, { page: pageIndex, item: itemIndex })}
											</FriendItem>
										);
									} else {
										return (
											<FriendItem key={userId} variant={'secondary'} src={''} status={status} nickname={nickname}>
												{userId}
												{buttons(friendshipStatus, { userId }, { page: pageIndex, item: itemIndex })}
											</FriendItem>
										);
									}
								})}
							</React.Fragment>
						);
					})}

				{currentTab === 'Friends requests' &&
					friendsRequestResponse.map((page, pageIndex, pages) => {
						return (
							<React.Fragment key={pageIndex}>
								{page.rows.map(({ status, nickname, userId, friendshipStatus, invitationId }, itemIndex, page) => {
									if (pageIndex === pages.length - 1 && itemIndex === page.length - 1) {
										return (
											<FriendItem ref={ref} key={userId} variant={'secondary'} src={''} status={status} nickname={nickname}>
												{buttons(friendshipStatus, { userId, invitationId: invitationId }, { page: pageIndex, item: itemIndex })}
											</FriendItem>
										);
									} else {
										return (
											<FriendItem key={userId} variant='secondary' src={''} status={status} nickname={nickname}>
												{buttons(friendshipStatus, { userId, invitationId: invitationId }, { page: pageIndex, item: itemIndex })}
											</FriendItem>
										);
									}
								})}
							</React.Fragment>
						);
					})}

				{currentTab === 'Global Search' &&
					globalSearchResult.map((page, pageIndex, pages) => {
						return (
							<React.Fragment key={pageIndex}>
								{page.rows.map(({ status, friendshipStatus, nickname, userId, invitationId }, itemIndex, page) => {
									if (pageIndex === pages.length - 1 && itemIndex === page.length - 1) {
										return (
											<FriendItem ref={ref} key={userId + itemIndex} variant={'secondary'} src={''} status={status} nickname={nickname}>
												{userId}
												{buttons(friendshipStatus, { userId, invitationId: invitationId }, { page: pageIndex, item: itemIndex })}
											</FriendItem>
										);
									} else {
										return (
											<FriendItem key={userId + itemIndex} variant={'secondary'} src={''} status={status} nickname={nickname}>
												{userId}
												{buttons(friendshipStatus, { userId, invitationId: invitationId }, { page: pageIndex, item: itemIndex })}
											</FriendItem>
										);
									}
								})}
							</React.Fragment>
						);
					})}
			</Container>
		</div>
	);
};
