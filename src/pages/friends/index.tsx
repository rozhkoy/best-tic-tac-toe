import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/ui/container';
import { FriendItem } from '@/shared/ui/friendItem';
import { ListWrap } from '@/shared/ui/listWrap';
import { Section } from '@/shared/ui/section';
import { useContext, useState } from 'react';
import './styles.scss';
import { CustomRadio } from '@/shared/ui/CustomRadio';
import { SearchModeProp, SearchModeTypes } from '@/features/friendSearch/types';
import { SearchBar } from '@/shared/ui/Searchbar';
import { usePlayerSearch } from '@/features/friendSearch';
import { WebSocketContext } from '@/shared/providers/WebSocketProvider';
import { ISendInviteToFriendship, ISendInviteToGame } from '@/features/webSocketConnection/types';
import { IWebSocketMessage } from '@/shared/types/webSocketMessage';
import { websocketEventNames } from '@/features/webSocketConnection/lib/websocketEventNames';
import { useAppSelector } from '@/shared/hooks/reduxHooks';

export const Friends = () => {
	const [currentTab, setCurrentTab] = useState<SearchModeTypes>('Your friends');
	const userInfo = useAppSelector((state) => state.user);
	const webSocket = useContext(WebSocketContext);
	const { searchBarState, changeHendler, result, searchResultCount, ref, acceptFriendshipInvite } = usePlayerSearch(currentTab);

	function sendInviteToFriendShip(invitationUserId: string) {
		const message: IWebSocketMessage<ISendInviteToFriendship> = {
			event: websocketEventNames.SEND_INVITE_TO_FRIENDSHIP,
			userId: userInfo.userId,
			data: {
				invitationUserId,
			},
		};

		webSocket?.instance.send(JSON.stringify(message));
	}

	function sendInviteToGame(friendId: string) {
		const message: IWebSocketMessage<ISendInviteToGame> = {
			event: websocketEventNames.INVITE_TO_GAME,
			userId: userInfo.userId,
			data: {
				friendId,
			},
		};

		webSocket?.instance.send(JSON.stringify(message));
	}

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
