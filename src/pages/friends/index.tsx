import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/ui/container';
import { FriendItem } from '@/shared/ui/friendItem';
import { ListWrap } from '@/shared/ui/listWrap';
import { Section } from '@/shared/ui/section';
import { useState } from 'react';
import './styles.scss';
import { CustomRadio } from '@/shared/ui/CustomRadio';
import { SearchModeProp, SearchModeTypes } from '@/features/friendSearch/types';
import { SearchBar } from '@/shared/ui/Searchbar';
import { usePlayerSearch } from '@/features/friendSearch';
import { useWebSocketConnection } from '@/features/webSocketConnection';
import { useNavigate } from 'react-router-dom';

export const Friends = () => {
	const navigation = useNavigate();
	const [currentTab, setCurrentTab] = useState<SearchModeTypes>('Your friends');
	const { searchBarState, changeHendler, result, searchResultCount, ref, acceptFriendshipInvite } = usePlayerSearch(currentTab);
	const { sendInviteToFriendShip, sendInviteToGame, acceptInviteToGame } = useWebSocketConnection({
		showInviteToFriendship: () => {
			console.log('invite');
		},
		handleGameInvitationSent: (friendId) => {
			const result = confirm('Are you accept invite?');
			if (result) {
				console.log('ok');
				acceptInviteToGame(friendId);
			}
		},
		handleInviteToGameIsAccepted: (sessionId) => {
			console.log(sessionId);
			navigation('/online-session');
		},
	});

	return (
		<div className="friends">
			<Container className="friends__container" size={'large'}>
				<SearchBar value={searchBarState} onChange={changeHendler} />

				<CustomRadio<SearchModeProp, SearchModeTypes> fields={['Your friends', 'Friends requests', 'Global Search']} value={currentTab} onChange={setCurrentTab} />

				{currentTab === 'Your friends' && (
					<Section title={`Your Friend (${searchResultCount})`}>
						<ListWrap>
							{result.map(({ nickname, userId }, i) => {
								if (result.length === i + 1 && ref) {
									return (
										<FriendItem ref={ref} key={i} variant={'secondary'} nickname={nickname} status={'online'} src={''}>
											<Button
												size={'tiny'}
												variant={'secondary'}
												fullWidth={false}
												title={'Invite to Game'}
												type={'button'}
												onClick={() => {
													console.log('test');
													sendInviteToGame(userId);
												}}
											/>
										</FriendItem>
									);
								} else {
									return (
										<FriendItem key={i} variant={'secondary'} nickname={nickname} status={'online'} src={''}>
											<Button
												size={'tiny'}
												variant={'secondary'}
												fullWidth={false}
												title={'Invite to Game'}
												type={'button'}
												onClick={() => {
													console.log('test');
													sendInviteToGame(userId);
												}}
											/>
										</FriendItem>
									);
								}
							})}
						</ListWrap>
					</Section>
				)}

				{currentTab === 'Friends requests' && (
					<Section title={`Request (${searchResultCount})`}>
						<ListWrap>
							{result.map(({ nickname, userFriend }, i) => {
								if (result.length === i + 1 && ref) {
									return (
										<FriendItem ref={ref} key={i} variant={'secondary'} nickname={nickname} status={'online'} src={''}>
											<Button
												size={'tiny'}
												variant={'secondary'}
												fullWidth={false}
												title={'Accept'}
												type={'button'}
												onClick={() => acceptFriendshipInvite(userFriend.friendId)}
											/>
											<Button size={'tiny'} variant={'warning'} fullWidth={false} title={'Decline'} type={'button'} />
										</FriendItem>
									);
								} else {
									return (
										<FriendItem key={i} variant={'secondary'} nickname={nickname} status={'online'} src={''}>
											<Button
												size={'tiny'}
												variant={'secondary'}
												fullWidth={false}
												title={'Accept'}
												type={'button'}
												onClick={() => acceptFriendshipInvite(userFriend.friendId)}
											/>
											<Button size={'tiny'} variant={'warning'} fullWidth={false} title={'Decline'} type={'button'} />
										</FriendItem>
									);
								}
							})}
						</ListWrap>
					</Section>
				)}

				{currentTab === 'Global Search' && (
					<Section title={`Find (${searchResultCount})`}>
						<ListWrap>
							{result.map(({ nickname, userId }, i) => {
								if (result.length === i + 1 && ref) {
									return (
										<FriendItem ref={ref} key={i} variant={'secondary'} nickname={nickname} status={'online'} src={''}>
											<Button
												size={'tiny'}
												variant={'secondary'}
												fullWidth={false}
												title={'Invite'}
												type={'button'}
												onClick={() => {
													console.log('test');
													sendInviteToFriendShip(userId);
												}}
											/>
										</FriendItem>
									);
								} else {
									return (
										<FriendItem key={i} variant={'secondary'} nickname={nickname} status={'online'} src={''}>
											<Button
												size={'tiny'}
												variant={'secondary'}
												fullWidth={false}
												title={'Invite'}
												type={'button'}
												onClick={() => {
													console.log('test');
													sendInviteToFriendShip(userId);
												}}
											/>
										</FriendItem>
									);
								}
							})}
						</ListWrap>
					</Section>
				)}
			</Container>
		</div>
	);
};
