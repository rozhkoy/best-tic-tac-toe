import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/ui/container';
import { UserProfile } from '@/shared/ui/userProfile';
import './styles.scss';
import React, { useEffect, useState } from 'react';
import { Section } from '@/shared/ui/section';
import { StatsItem } from '@/shared/ui/statsItem';
import { ListWrap } from '@/shared/ui/listWrap';

import { HistoryItem } from '@/shared/ui/historyItem';
import { Nothing } from '@/shared/ui/nothing';
import { useNavigate, useParams } from 'react-router-dom';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getGameHistoryByUserId, getProfileInfoByUserId } from './api';
import { useInView } from 'react-intersection-observer';
import { useAppSelector } from '@/shared/hooks/reduxHooks';
import { UserStatusTypes } from '@/shared/ui/userStatus/types';
import { FrindshipBtnsStatusTypes } from '@/features/friendSearch/types';
import { useFriendsActions } from '@/features/friendSearch/lib/useFriendsActions';
import { IProfileFriendshipBtns } from './types';
import { createFormData } from '@/shared/lib/CreateFormData';

export const Profile = () => {
	const PER_PAGE = 10;
	const userInfo = useAppSelector((state) => state.user);
	const { userId } = useParams();
	const [btnStatus, setBtnStatus] = useState<IProfileFriendshipBtns>({
		status: null,
	});
	const navigation = useNavigate();
	const { sendInviteToFriendShipMutation, acceptFriendshipInviteMutation, rejectFriendshipInviteMutation, sendInviteToGame, sendRejectionInviteToGame } = useFriendsActions();
	const [ref, inView] = useInView();

	const profileInfoByUserId = useQuery({
		queryKey: ['userInfoByUserId', userId],
		queryFn: () => getProfileInfoByUserId({ userId: Number(userId) ?? 0, currentUserId: userInfo.userId }),
		onSuccess: (data) => setBtnStatus(data.friendshipResponse),
		enabled: !!userInfo.isAuth,
	});

	const history = useInfiniteQuery({
		queryKey: ['gameHistory'],
		queryFn: ({ pageParam }) => {
			return getGameHistoryByUserId({ userId: Number(userId), page: pageParam ?? 0, perPage: PER_PAGE });
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
		if (profileInfoByUserId.isError || !userId) {
			navigation('/');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [profileInfoByUserId.isError, userId]);

	function buttons(btnStatus: FrindshipBtnsStatusTypes, userStatus: UserStatusTypes) {
		switch (btnStatus) {
			case null:
				return <Button size={'tiny'} variant={'primary'} fullWidth={false} type={'button'} title={'Add friend'} onClick={() => addToFriends(userInfo.userId, Number(userId))} />;
			case 'invitation':
				return (
					<>
						<Button size={'tiny'} variant={'primary'} fullWidth={false} type={'button'} title={'Accept'} />
						<Button size={'tiny'} variant={'warning'} fullWidth={false} type={'button'} title={'Reject'} />
					</>
				);
			case 'friend':
				return <Button size={'tiny'} variant={'primary'} fullWidth={false} type={'button'} title={'Invite to game'} disabled={userStatus === 'offline'} />;
			case 'invitedToGame':
				return <Button size={'tiny'} variant={'secondary'} fullWidth={false} type={'button'} title={'Invited to game'} />;
			case 'pending':
				return <Button size={'tiny'} variant={'secondary'} fullWidth={false} type={'button'} title={'Pending'} />;
			case 'loading':
				return <div>loading...</div>;
			case 'error':
				return <Button size={'tiny'} variant={'warning'} fullWidth={false} type={'button'} title={'Error'} />;
		}
	}

	async function addToFriends(userId: number, invitationUserId: number) {
		setBtnStatus((state) => {
			state.status = 'loading';
			return { ...state };
		});
		const formData: FormData = createFormData([
			{ key: 'userId', value: String(userInfo.userId) },
			{ key: 'invitationUserId', value: String(invitationUserId) },
		]);
		const response = await sendInviteToFriendShipMutation.mutateAsync(formData);
		if (response) {
			setBtnStatus((state) => {
				state.status = 'pending';
				state.invitationId = response.invitationId;
				return { ...state };
			});
		} else {
			setBtnStatus((state) => {
				state.status = 'error';
				return { ...state };
			});
		}
	}

	return (
		<div className='profile'>
			<Container size='large' className='profile__container'>
				{profileInfoByUserId.isSuccess ? (
					<>
						<div className='profile__user-info'>
							<UserProfile
								nickname={profileInfoByUserId.data.userInfo.nickname}
								status={profileInfoByUserId.data.userInfo.status}
								src={''}
								rating={profileInfoByUserId.data.userInfo.rating}
								size='large'></UserProfile>

							{Number(userId) != userInfo.userId ? <div className='profile__btns'> {btnStatus && buttons(btnStatus.status, profileInfoByUserId.data.userInfo.status)}</div> : null}
						</div>

						<Section title='Statistics' className='profile__stats'>
							<div className='profile__stats-wrap'>
								<StatsItem number={profileInfoByUserId.data.stats.wins} text={'Wins'} />
								<StatsItem number={profileInfoByUserId.data.stats.losses} text={'Losses'} />
								<StatsItem number={profileInfoByUserId.data.stats.draws} text={'Draws'} />
							</div>
						</Section>
					</>
				) : null}
				<Section title='History' className='profile__history'>
					<ListWrap>
						{history.data && history.data?.pages[0].rows.length > 0 ? (
							history.data.pages.map((page, pageIndex, pages) => (
								<React.Fragment key={pageIndex}>
									{page.rows.map((item, itemIndex, page) => {
										const date = new Date(+item.timestamp);
										const formatDate = `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)} ${('0' + date.getDate()).slice(-2)}.${(
											'0' +
											(date.getMonth() + 1)
										).slice(-2)}.${date.getFullYear()}`;
										if (pageIndex === pages.length - 1 && itemIndex === page.length - 1) {
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
