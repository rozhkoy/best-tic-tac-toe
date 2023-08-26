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
import { getGameHistoryByUserId } from './api';
import { useInView } from 'react-intersection-observer';
import { IGameHistoryItemResponse } from '@/shared/types/findAndCount';
import { divide } from 'lodash';

export const Profile = () => {
	const PER_PAGE = 10;

	const { userId } = useParams();
	const [isFriend, setIsFriend] = useState(false);

	const navigation = useNavigate();

	const [ref, inView] = useInView();

	useEffect(() => {
		if (!userId) {
			navigation('/');
		}
	}, []);

	// const userInfoByUserId = useQuery({
	// 	queryKey: ['userInfoByUserId', userId],
	// 	queryFn: () => getUserInfoByUserId({ userId: Number(userId) ?? 0 }),
	// });

	const history = useInfiniteQuery({
		queryKey: ['gameHistory'],
		queryFn: ({ pageParam }) => {
			return getGameHistoryByUserId({ userId: +userId!, page: pageParam ?? 0, perPage: PER_PAGE });
		},
		getNextPageParam: (lastPage) => lastPage.nextPage,
	});

	useEffect(() => {
		console.log('viso', history.hasNextPage);
		if (inView && history.hasNextPage) {
			history.fetchNextPage();
		}
	}, [inView, history.hasNextPage]);

	useEffect(() => {
		console.log(history.data?.pages);
	});

	return (
		<div className="profile">
			<Container size="large" className="profile__container">
				{/* {userInfoByUserId.isSuccess ? (
					<div className="profile__user-info">
						<UserProfile nickname={'test'} status={'online'} src={''} size="large"></UserProfile>
						<div className="profile__btns">
							{isFriend ? (
								<Button size={'medium'} variant={'primary'} fullWidth={false} title={'Invite to game'} type={'button'} disabled={false} />
							) : (
								<Button size={'medium'} variant={'primary'} fullWidth={false} title={'Invite to friends'} type={'button'} disabled={false} />
							)}
						</div>
					</div>
				) : null} */}
				<Section title="Statistics" className="profile__stats">
					<div className="profile__stats-wrap">
						<StatsItem number={1500} text={'Wins'} />
						<StatsItem number={1500} text={'Wins'} />
						<StatsItem number={1500} text={'Wins'} />
					</div>
				</Section>

				<Section title="Statistics" className="profile__history">
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
