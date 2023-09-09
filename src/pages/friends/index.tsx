import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/ui/container';
import { Dispatch, SetStateAction, useCallback, useContext, useEffect, useState } from 'react';
import './styles.scss';
import { CustomRadio } from '@/shared/ui/CustomRadio';
import { FrienshipStatusTypes, IGetAllRequestsForFriendshipResponse, IPartialUserInfoWithFriendshipStatus, SearchModeProp, SearchModeTypes } from '@/features/friendSearch/types';
import { SearchBar } from '@/shared/ui/Searchbar';
import { WebSocketContext } from '@/shared/providers/WebSocketProvider';
import { ISendInviteToFriendship, ISendInviteToGame } from '@/features/webSocketConnection/types';
import { IWebSocketMessage } from '@/shared/types/webSocketMessage';
import { websocketEventNames } from '@/features/webSocketConnection/lib/websocketEventNames';
import { useAppSelector } from '@/shared/hooks/reduxHooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getAllFriends, getAllRequestsForFriendship, searchUsersByNickname } from '@/features/friendSearch/api';
import { IPaginationResponse } from '@/shared/types/findAndCount';
import React from 'react';
import { FriendItem } from '@/shared/ui/friendItem';
import { useInView } from 'react-intersection-observer';
import debounce from 'lodash/debounce';

export const Friends = () => {
	const [currentTab, setCurrentTab] = useState<SearchModeTypes>('Your friends');
	const [searchBarState, setSearchBarState] = useState('');
	const { userId } = useAppSelector((state) => state.user);
	const webSocket = useContext(WebSocketContext);
	const PER_PAGE = 10;
	const [globalSearchResult, setGlobalSearchResult] = useState<Array<IPaginationResponse<Array<IPartialUserInfoWithFriendshipStatus>>>>([]);
	const [friendsRequestResponse, setFriendsRequestResponse] = useState<Array<IPaginationResponse<Array<IGetAllRequestsForFriendshipResponse>>>>([]);
	const [yourFriendsResponse, setYourFriendsResponse] = useState<Array<IPaginationResponse<Array<IPartialUserInfoWithFriendshipStatus>>>>([]);
	const { ref, inView } = useInView();

	function sendInviteToFriendShip(invitationUserId: string) {
		const message: IWebSocketMessage<ISendInviteToFriendship> = {
			event: websocketEventNames.SEND_INVITE_TO_FRIENDSHIP,
			userId,
			data: {
				invitationUserId,
			},
		};

		webSocket?.instance.send(JSON.stringify(message));
	}

	function sendInviteToGame(friendId: string) {
		const message: IWebSocketMessage<ISendInviteToGame> = {
			event: websocketEventNames.INVITE_TO_GAME,
			userId,
			data: {
				friendId,
			},
		};

		webSocket?.instance.send(JSON.stringify(message));
	}

	function searchBarHandler(value: string) {
		setSearchBarState(value);
		searchBarDebounce(value, 0);
	}

	function customRadioHandler(value: SearchModeTypes) {
		setCurrentTab(value);
		setSearchBarState('');
	}

	const searchBarDebounce = useCallback(
		debounce((query, perPage) => sendQuerySearch(query, perPage), 300),
		[currentTab]
	);

	function sendQuerySearch(query: string, pageParam: number) {
		switch (currentTab) {
			case 'Global Search':
				globalSearch.fetchNextPage({ pageParam });
				break;
			case 'Friends requests':
				friendsRequest.fetchNextPage({ pageParam });
				break;
			case 'Your friends':
				yourFriends.fetchNextPage({ pageParam });
		}
	}

	function buttons(status: string | null) {
		switch (status) {
			case null:
				return <Button size={'tiny'} variant={'secondary'} fullWidth={false} type={'button'} title={'Add friend'} />;
			case 'invitation':
				return (
					<>
						<Button size={'tiny'} variant={'secondary'} fullWidth={false} type={'button'} title={'Accept'} />
						<Button size={'tiny'} variant={'warning'} fullWidth={false} type={'button'} title={'Reject'} />
					</>
				);
			case 'friend':
				return <Button size={'tiny'} variant={'secondary'} fullWidth={false} type={'button'} title={'Invite to game'} />;
			case 'pending':
				return <Button size={'tiny'} variant={'secondary'} fullWidth={false} type={'button'} title={'Invite'} />;
		}
	}

	function replaceBttns(
		setState: Dispatch<SetStateAction<Array<IPaginationResponse<Array<IPartialUserInfoWithFriendshipStatus>>> | Array<IPaginationResponse<Array<IGetAllRequestsForFriendshipResponse>>>>>,
		page: number,
		item: number,
		friendshipStatus: FrienshipStatusTypes
	) {
		setState((state) => {
			state[page].rows[item].friendshipStatus = friendshipStatus;
			return [...state];
		});
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
		enabled: currentTab === 'Global Search',
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
		enabled: currentTab === 'Friends requests',
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
		enabled: currentTab === 'Your friends',
	});

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
		<div className="friends">
			<Container className="friends__container" size={'large'}>
				<SearchBar value={searchBarState} onChange={searchBarHandler} />

				<CustomRadio<SearchModeProp, SearchModeTypes> fields={['Your friends', 'Friends requests', 'Global Search']} value={currentTab} onChange={customRadioHandler} />

				{currentTab === 'Your friends' &&
					yourFriendsResponse.map((page, pageIndex, pages) => {
						return (
							<React.Fragment key={pageIndex}>
								{page.rows.map(({ status, friendshipStatus, nickname, userId }, itemIndex, page) => {
									if (pageIndex === pages.length - 1 && itemIndex === page.length - 1) {
										return (
											<FriendItem ref={ref} key={userId} variant={'secondary'} src={''} status={status} nickname={nickname}>
												{buttons(friendshipStatus)}
											</FriendItem>
										);
									} else {
										return (
											<FriendItem key={userId} variant={'secondary'} src={''} status={status} nickname={nickname}>
												{buttons(friendshipStatus)}
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
								{page.rows.map(({ status, friendshipStatus, nickname, userId }, itemIndex, page) => {
									if (pageIndex === pages.length - 1 && itemIndex === page.length - 1) {
										return (
											<FriendItem ref={ref} key={userId} variant={'secondary'} src={''} status={status} nickname={nickname}>
												{buttons(friendshipStatus)}
											</FriendItem>
										);
									} else {
										return (
											<FriendItem key={userId} variant={'secondary'} src={''} status={status} nickname={nickname}>
												{buttons(friendshipStatus)}
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
								{page.rows.map(({ status, friendshipStatus, nickname, userId }, itemIndex, page) => {
									if (pageIndex === pages.length - 1 && itemIndex === page.length - 1) {
										return (
											<FriendItem ref={ref} key={userId} variant={'secondary'} src={''} status={status} nickname={nickname}>
												{buttons(friendshipStatus)}
												{userId}
											</FriendItem>
										);
									} else {
										return (
											<FriendItem key={userId} variant={'secondary'} src={''} status={status} nickname={nickname}>
												{userId}
												{buttons(friendshipStatus)}
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
