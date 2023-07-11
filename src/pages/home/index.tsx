import { Section } from '@/shared/ui/section';
import './style.scss';
import { StatsItem } from '@/shared/ui/statsItem';
import { HistoryItem } from '@/shared/ui/historyItem';
import { GameSelector } from '@/features/gameSelector';
import { HistoryItemProps } from '@/shared/ui/historyItem/types';
import { useState } from 'react';
import { FriendItem } from '@/shared/ui/friendItem';
import { Button } from '@/shared/ui/button';
import { ListWrap } from '@/shared/ui/listWrap';
import { UserStatusTypes } from '@/shared/ui/userStatus/types';
import { PlayerSearchTimer } from '@/shared/ui/playerSearchTimer';
import { PlayerWaiting } from '@/shared/ui/playerWaiting';
import { SearchBar } from '@/shared/ui/Searchbar';

export const Home = () => {
	const [history] = useState<Array<HistoryItemProps>>([
		{ nickname: 'Friend nickname', dateTime: '12:30 16.03.2023', date: '12:30 16.03.2023', status: 'LOST', statusColor: 'red' },
		{ nickname: 'Friend nickname', dateTime: '12:30 16.03.2023', date: '12:30 16.03.2023', status: 'LOST', statusColor: 'red' },
		{ nickname: 'Friend nickname', dateTime: '12:30 16.03.2023', date: '12:30 16.03.2023', status: 'WIN', statusColor: 'white' },
		{ nickname: 'Friend nickname', dateTime: '12:30 16.03.2023', date: '12:30 16.03.2023', status: 'LOST', statusColor: 'red' },
		{ nickname: 'Friend nickname', dateTime: '12:30 16.03.2023', date: '12:30 16.03.2023', status: 'WIN', statusColor: 'white' },
		{ nickname: 'Friend nickname', dateTime: '12:30 16.03.2023', date: '12:30 16.03.2023', status: 'WIN', statusColor: 'white' },
		{ nickname: 'Friend nickname', dateTime: '12:30 16.03.2023', date: '12:30 16.03.2023', status: 'WIN', statusColor: 'white' },
		{ nickname: 'Friend nickname', dateTime: '12:30 16.03.2023', date: '12:30 16.03.2023', status: 'WIN', statusColor: 'white' },
		{ nickname: 'Friend nickname', dateTime: '12:30 16.03.2023', date: '12:30 16.03.2023', status: 'WIN', statusColor: 'white' },
		{ nickname: 'Friend nickname', dateTime: '12:30 16.03.2023', date: '12:30 16.03.2023', status: 'WIN', statusColor: 'white' },
		{ nickname: 'Friend nickname', dateTime: '12:30 16.03.2023', date: '12:30 16.03.2023', status: 'WIN', statusColor: 'white' },
	]);

	const [state, setState] = useState<string>('');
	const [friends] = useState<Array<{ nickname: string; status: UserStatusTypes }>>([
		{ nickname: 'nickname', status: 'online' },
		{ nickname: 'nickname', status: 'online' },
		{ nickname: 'nickname', status: 'offline' },
		{ nickname: 'nickname', status: 'online' },
		{ nickname: 'nickname', status: 'playing' },
		{ nickname: 'nickname', status: 'online' },
		{ nickname: 'nickname', status: 'offline' },
	]);

	return (
		<div className="home">
			<div className="home__container">
				<div className="home__column">
					<Section className="statistics" title="Statistics">
						<ul className="statistics__list">
							<StatsItem className="statictics__item" number={100} text={'wins'} />
							<StatsItem className="tatictics__item" number={100} text={'wins'} />
							<StatsItem className="tatictics__item" number={100} text={'wins'} />
						</ul>
					</Section>
					<Section className="history" title="history">
						<ListWrap className="history__list">
							{history.map((item) => (
								<HistoryItem nickname={item.nickname} date={item.date} dateTime={item.date} status={item.status} statusColor={item.statusColor} />
							))}
						</ListWrap>
					</Section>
				</div>
				<div className="home__column">
					<Section title="Game settings" className="game-settings">
						<GameSelector />
					</Section>

					<PlayerSearchTimer cancelhandler={() => console.log('cancel')} timer={'1:23'} />
					<PlayerWaiting cancelHandler={() => console.log('cancel')} nickname={'nickanme'} avatarSrc={'/'} />
				</div>
				<div className="home__column">
					<Section className="your-friends" title="Your Friend (6)">
						<SearchBar value={state} onChange={setState} />
						<ListWrap className="your-friends__list">
							{friends.map(({ nickname, status }) => (
								<FriendItem variant={'primary'} nickname={nickname} status={status} src={''}>
									<Button size={'tiny'} variant={'primary'} fullWidth={false} title={'Invite'} type={'button'} />
								</FriendItem>
							))}
						</ListWrap>
					</Section>
				</div>
			</div>
		</div>
	);
};
