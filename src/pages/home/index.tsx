import { Section } from '@/shared/ui/section';
import './style.scss';
import { StatsItem } from '@/shared/ui/statsItem';
import { SetStateAction, useState } from 'react';
import { HistoryItem } from '@/shared/ui/historyItem';
import { GameSelector } from '@/features/gameSelector';
import { FriendItem } from '@/shared/ui/friendItem';
import { HistoryItemProps } from '@/shared/ui/historyItem/types';
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
						<ul className="history__list">
							{history.map((item) => (
								<HistoryItem nickname={item.nickname} date={item.date} dateTime={item.date} status={item.status} statusColor={item.statusColor} />
							))}
						</ul>
					</Section>
				</div>
				<div className="home__column">
					<Section title="Game settings" className="game-settings">
						<GameSelector />
					</Section>
				</div>
				<div className="home__column">
					<Section title="Your Friend (6)">
						<SearchBar value={state} onChange={setState} variant={'primary'} />
					</Section>
				</div>
			</div>
		</div>
	);
};
