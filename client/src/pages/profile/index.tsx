import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/ui/container';
import { UserProfile, UserProfileSkeleton } from '@/shared/ui/userProfile';
import './styles.scss';
import React, { useContext, useEffect, useState } from 'react';
import { Section } from '@/shared/ui/section';
import { StatsItem, StatsItemSkeleton } from '@/shared/ui/statsItem';
import { ListWrap } from '@/shared/ui/listWrap';
import { HistoryItem, HistoryItemSkeleton } from '@/shared/ui/historyItem';
import { Nothing } from '@/shared/ui/nothing';
import { useNavigate, useParams } from 'react-router-dom';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getGameHistoryByUserId, getProfileInfoByUserId } from './api';
import { useInView } from 'react-intersection-observer';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { UserStatusTypes } from '@/shared/ui/userStatus/types';
import { useFriendsActions } from '@/features/friendSearch/lib/useFriendsActions';
import { IProfileFriendshipBtns } from './types';
import { createFormData } from '@/shared/lib/CreateFormData';
import { websocketEventNames } from '@/features/webSocketConnection/lib/websocketEventNames';
import { WebSocketContext } from '@/shared/providers/WebSocketProvider';
import { addAlert } from '@/features/alertProvider';
import { SkeletonItem } from '@/shared/ui/skeletonItem';
import { friendBtnStatuses } from '@/features/friendSearch/friendBtnStatuses';
import { userStatuses } from '@/shared/ui/userStatus/userStatuses';

export const Profile = () => {
	const PER_PAGE = 10;
	const userInfo = useAppSelector((state) => state.user);
	const { targetUser } = useParams();
	const [btnStatus, setBtnStatus] = useState<IProfileFriendshipBtns>({
		status: null,
	});
	const webSocket = useContext(WebSocketContext);
	const navigation = useNavigate();
	const { sendInviteToFriendShipMutation, acceptFriendshipInviteMutation, rejectFriendshipInviteMutation, sendInviteToGame, sendRejectionInviteToGame } = useFriendsActions();
	const [ref, inView] = useInView();
	const dispatch = useAppDispatch();
	const profileInfoByUserId = useQuery({
		queryKey: ['userInfoByUserId', targetUser],
		queryFn: () => getProfileInfoByUserId({ targetUser: targetUser ?? '0', userId: userInfo.userId }),
		onSuccess: (data) => setBtnStatus(data.friendshipResponse),
		enabled: !!userInfo.isAuth,
	});

	const history = useInfiniteQuery({
		queryKey: ['gameHistory'],
		queryFn: ({ pageParam }) => {
			return getGameHistoryByUserId({ userId: targetUser ?? '0', page: pageParam ?? 0, perPage: PER_PAGE });
		},
		getNextPageParam: (lastPage) => lastPage.nextPage,
		enabled: !!userInfo.isAuth,
	});

	useEffect(() => {
		if (inView && history.hasNextPage) {
			history.fetchNextPage();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inView, history.hasNextPage]);

	useEffect(() => {
		if (profileInfoByUserId.isError || !targetUser) {
			navigation('/', { replace: true });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [profileInfoByUserId.isError, targetUser]);

	function buttons(btnStatus: IProfileFriendshipBtns, userStatus: UserStatusTypes) {
		switch (btnStatus.status) {
			case null:
				return <Button size={'tiny'} variant={'primary'} fullWidth={false} type={'button'} title={'Add friend'} onClick={() => addToFriends(userInfo.userId, targetUser ?? '0')} />;
			case friendBtnStatuses.INVITATION_TO_FRIENDS:
				return (
					<>
						<Button size={'tiny'} variant={'primary'} fullWidth={false} type={'button'} title={'Accept'} onClick={() => acceptFriendshipInvite(btnStatus.invitationId ?? '0')} />
						<Button size={'tiny'} variant={'warning'} fullWidth={false} type={'button'} title={'Reject'} onClick={() => rejectFriendshipInvite(btnStatus.invitationId ?? '0')} />
					</>
				);
			case friendBtnStatuses.FRIEND:
				return (
					<Button
						size={'tiny'}
						variant={'primary'}
						fullWidth={false}
						type={'button'}
						title={'Invite to game'}
						disabled={userStatus === userStatuses.OFFLINE}
						onClick={() => inviteToGame(targetUser ?? '0', userInfo.userId)}
					/>
				);
			case friendBtnStatuses.INVITED_TO_GAME:
				return (
					<Button size={'tiny'} variant={'secondary'} fullWidth={false} type={'button'} title={'Invited to game'} onClick={() => rejectionInviteToGame(targetUser ?? '0', userInfo.userId)} />
				);
			case friendBtnStatuses.PENDING:
				return <Button size={'tiny'} variant={'secondary'} fullWidth={false} type={'button'} title={'Pending'} onClick={() => rejectFriendshipInvite(btnStatus.invitationId ?? '0')} />;
			case friendBtnStatuses.LOADING:
				return <div>loading...</div>;
			case friendBtnStatuses.ERROR:
				return <Button size={'tiny'} variant={'warning'} fullWidth={false} type={'button'} title={'Error'} />;
		}
	}

	async function addToFriends(userId: string, invitationUserId: string) {
		setBtnStatus((state) => {
			state.status = friendBtnStatuses.LOADING;
			return { ...state };
		});
		const formData: FormData = createFormData([{ key: 'invitationUserId', value: String(invitationUserId) }]);
		const response = await sendInviteToFriendShipMutation.mutateAsync({ userId, formData });
		if (response) {
			setBtnStatus((state) => {
				state.status = friendBtnStatuses.PEDING;
				state.invitationId = response.invitationId;
				return { ...state };
			});
		} else {
			setBtnStatus((state) => {
				state.status = friendBtnStatuses.ERROR;
				return { ...state };
			});
		}
	}

	async function acceptFriendshipInvite(invitationId: string) {
		setBtnStatus((state) => {
			state.status = friendBtnStatuses.LOADING;
			return { ...state };
		});

		const response = await acceptFriendshipInviteMutation.mutateAsync(invitationId);
		if (response) {
			setBtnStatus((state) => {
				state.status = friendBtnStatuses.FRIEND;
				return { ...state };
			});
		} else {
			setBtnStatus((state) => {
				state.status = friendBtnStatuses.ERROR;
				return { ...state };
			});
		}
	}

	async function rejectFriendshipInvite(invitationId: string) {
		setBtnStatus((state) => {
			state.status = friendBtnStatuses.LOADING;
			return { ...state };
		});

		const response = await rejectFriendshipInviteMutation.mutateAsync(invitationId);
		if (response) {
			setBtnStatus((state) => {
				state.status = null;
				return { ...state };
			});
		} else {
			setBtnStatus((state) => {
				state.status = friendBtnStatuses.ERROR;
				return { ...state };
			});
		}
	}

	function inviteToGame(friendId: string, userId: string) {
		if (sendInviteToGame(friendId, userId)) {
			setBtnStatus((state) => {
				state.status = friendBtnStatuses.LOADING;
				return { ...state };
			});
		} else {
			setBtnStatus((state) => {
				state.status = friendBtnStatuses.ERROR;
				return { ...state };
			});
		}
	}

	function rejectionInviteToGame(friendId: string, userId: string) {
		if (sendRejectionInviteToGame(friendId, userId)) {
			setBtnStatus((state) => {
				state.status = friendBtnStatuses.LOADING;
				return { ...state };
			});
		} else {
			setBtnStatus((state) => {
				state.status = friendBtnStatuses.ERROR;
				return { ...state };
			});
		}
	}

	useEffect(() => {
		if (webSocket) {
			webSocket.subscribeToOnUpdate(websocketEventNames.INVITATION_TO_GAME_HAS_BEEN_SENT, () => {
				setBtnStatus((state) => {
					state.status = state.status = friendBtnStatuses.INVITED_TO_GAME;
					return { ...state };
				});
			});

			webSocket.subscribeToOnUpdate(websocketEventNames.INVITE_TO_GAME_IS_REJECTED, () => {
				setBtnStatus((state) => {
					state.status = friendBtnStatuses.FRIEND;
					return { ...state };
				});
				profileInfoByUserId.refetch();
			});
			webSocket.subscribeToOnUpdate(websocketEventNames.USER_IS_NOT_ONLINE, () => {
				dispatch(addAlert({ heading: 'Oooooopsss!', text: 'User is not currently online' }));
				profileInfoByUserId.refetch();
			});

			return () => {
				webSocket.unSubscribeToOnUpdate(websocketEventNames.INVITATION_TO_GAME_HAS_BEEN_SENT);
				webSocket.unSubscribeToOnUpdate(websocketEventNames.INVITE_TO_GAME_IS_REJECTED);
				webSocket.unSubscribeToOnUpdate(websocketEventNames.USER_IS_NOT_ONLINE);
			};
		}
	}, [dispatch, webSocket]);

	return (
		<div className='profile'>
			<Container size='large' className='profile__container' withPadding={true}>
				{profileInfoByUserId.data ? (
					<>
						<div className='profile__user-info'>
							<UserProfile
								nickname={profileInfoByUserId.data.userInfo.nickname}
								status={profileInfoByUserId.data.userInfo.status}
								src={`https://source.boringavatars.com/beam/100/${profileInfoByUserId.data.userInfo.nickname}`}
								rating={profileInfoByUserId.data.userInfo.rating}
								size='large'
							/>

							{targetUser != userInfo.userId ? <div className='profile__btns'> {btnStatus && buttons(btnStatus, profileInfoByUserId.data.userInfo.status)}</div> : null}
						</div>

						<Section title='Statistics' className='profile__stats'>
							<div className='profile__stats-wrap'>
								<StatsItem number={profileInfoByUserId.data.stats.wins} text={'Wins'} />
								<StatsItem number={profileInfoByUserId.data.stats.losses} text={'Losses'} />
								<StatsItem number={profileInfoByUserId.data.stats.draws} text={'Draws'} />
							</div>
						</Section>
					</>
				) : (
					<>
						<div className='profile__user-info'>
							<UserProfileSkeleton size='large' rating={true} />

							{targetUser != userInfo.userId ? (
								<div className='profile__btns'>
									<SkeletonItem width={120} height={40} />
								</div>
							) : null}
						</div>

						<Section title='Statistics' className='profile__stats'>
							<div className='profile__stats-wrap'>
								<StatsItemSkeleton />
								<StatsItemSkeleton />
								<StatsItemSkeleton />
							</div>
						</Section>
					</>
				)}
				<Section title='History' className='profile__history'>
					<ListWrap>
						{history.isLoading ? (
							[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => <HistoryItemSkeleton />)
						) : history.data && history.data?.pages[0].rows.length > 0 ? (
							history.data.pages.map((page, pageIndex, pages) => (
								<React.Fragment key={pageIndex}>
									{page.rows.map((item, itemIndex, page) => {
										const date = new Date(+item.timestamp);
										const formatDate = `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)} ${('0' + date.getDate()).slice(-2)}.${(
											'0' +
											(date.getMonth() + 1)
										).slice(-2)}.${date.getFullYear()}`;
										if (pageIndex === pages.length - 1 && itemIndex === Math.floor(page.length / 2)) {
											return (
												<HistoryItem
													key={item.gameHistoryId}
													ref={ref}
													date={formatDate}
													dateTime={formatDate}
													nickname={item.userInfo.nickname}
													status={item.gameStatus}
													statusColor={item.gameStatus === 'lost' ? 'red' : 'white'}
												/>
											);
										} else {
											return (
												<HistoryItem
													key={item.gameHistoryId}
													nickname={item.userInfo.nickname}
													date={formatDate}
													dateTime={formatDate}
													status={item.gameStatus}
													statusColor={item.gameStatus === 'lost' ? 'red' : 'white'}
												/>
											);
										}
									})}
								</React.Fragment>
							))
						) : (
							<Nothing />
						)}
					</ListWrap>
				</Section>
			</Container>
		</div>
	);
};
