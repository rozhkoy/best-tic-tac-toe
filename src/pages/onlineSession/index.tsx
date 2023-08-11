import { GameBoardWrap, GameInfo, PlayField, usePlayFieldHandler } from '@/features/playGround';
import { GameStatusMessage, ICurrentMove, IPlayers, PlayerSymbolsType } from '@/features/playGround/types';
import { websocketEventNames } from '@/features/webSocketConnection/lib/websocketEventNames';
import { IGetDataAboutOpponent, IIfWinnerFind, IMessageWithFriendId, IReadyStateToGame, ISyncGameboardState } from '@/features/webSocketConnection/types';
import { useAppSelector } from '@/shared/hooks/reduxHooks';
import { WebSocketContext } from '@/shared/providers/WebSocketProvider';
import { IWebSocketMessage } from '@/shared/types/webSocketMessage';
import { FieldCell } from '@/shared/ui/fieldCell';
import { ICellData } from '@/shared/ui/fieldCell/types';
import { nanoid } from 'nanoid';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const OnlineSession = () => {
	const { sessionId } = useParams();
	const webSocket = useContext(WebSocketContext);
	const [isBlockMove, setIsBlockMove] = useState<boolean>(true);
	const userInfo = useAppSelector((state) => state.user);
	const [friendId, setFriendId] = useState<number>(0);
	const [isWinnerFound, setIsWinnerFound] = useState<boolean>(false);
	const [playersData, setPlayerData] = useState<IPlayers>({
		cross: {
			nickname: '',
			score: 0,
			userId: 0,
		},
		nought: {
			nickname: '',
			score: 0,
			userId: 0,
		},
	});
	const { playFieldState, resetState, currentMove, markCell, setPlayFieldState, setCurrentMove } = usePlayFieldHandler(
		[],
		playersData,
		(symbol) => {
			console.log('test test');
			const message: GameStatusMessage = {
				color: 'secondary',
				isShow: true,
				message: 'The crosses won!',
			};
			const players: IPlayers = playersData;
			switch (symbol) {
				case 'cross':
					message.color = 'secondary';
					message.message = 'The crosses won!';
					players.cross.score = ++playersData.cross.score;
					break;
				case 'nought':
					message.color = 'red';
					message.message = 'The noughts won!';
					players.nought.score = ++playersData.nought.score;
					break;
			}
			setPlayerData(players);
			sendMessageifWinnerFind({ gameStatusMessage: message, players, friendId });
			setGameStatusMessage(message);
			setIsWinnerFound(true);
		},
		() => {
			setGameStatusMessage({
				message: 'Draw!',
				isShow: true,
				color: 'secondary',
			});
		},
		() => {
			setGameStatusMessage({
				message: '',
				isShow: false,
				color: 'secondary',
			});
		},
		({ playFieldState, currentMove }) => {
			setIsBlockMove(true);
			updateGameboard(friendId, playFieldState, currentMove);
		}
	);
	const [gameStatusMessage, setGameStatusMessage] = useState<GameStatusMessage>({
		message: '',
		isShow: false,
		color: 'secondary',
	});

	interface IDataAboutOpponent {
		firstPlayer: {
			userId: number;
			isReady: boolean;
			role: 'cross' | 'nought';
			friendId: number;
			nickname: string;
		};
		secondPlayer: {
			userId: number;
			isReady: boolean;
			role: 'cross' | 'nought';
			friendId: number;
			nickname: string;
		};
	}

	type IPlayerData = 'firstPlayer' | 'secondPlayer';

	useEffect(() => {
		getDataAboutOpponent(sessionId as string);

		if (webSocket) {
			webSocket.subscribeToOnUpdate(websocketEventNames.DATA_ABOUT_OPONENT, (message: IWebSocketMessage<IDataAboutOpponent>) => {
				updatePlayersData(message);
			});

			webSocket.subscribeToOnUpdate(websocketEventNames.START_GAME, () => {
				setIsBlockMove(false);
			});

			webSocket.subscribeToOnUpdate(websocketEventNames.SYNC_PLAYGROUND, ({ data }: IWebSocketMessage<ISyncGameboardState>) => {
				console.log(data);
				setIsBlockMove(false);
				setPlayFieldState(data.playFieldState);
				setCurrentMove(data.currentMove);
			});

			webSocket.subscribeToOnUpdate(websocketEventNames.WINNER_FIND, ({ data: { gameStatusMessage, players } }: IWebSocketMessage<IIfWinnerFind>) => {
				setGameStatusMessage(gameStatusMessage);
				setPlayerData(players);
			});

			webSocket.subscribeToOnUpdate(websocketEventNames.RESET_GAME_STATE, () => {
				resetState();
			});
		}

		return () => {
			webSocket?.unSubscribeToOnUpdate(websocketEventNames.DATA_ABOUT_OPONENT);
			webSocket?.unSubscribeToOnUpdate(websocketEventNames.START_GAME);
			webSocket?.unSubscribeToOnUpdate(websocketEventNames.SYNC_PLAYGROUND);
			webSocket?.unSubscribeToOnUpdate(websocketEventNames.WINNER_FIND);
		};
	}, []);

	useEffect(() => {
		if (playersData.cross.nickname && playersData.cross.userId === userInfo.userId) {
			sendReadyState(userInfo.userId, sessionId as string);
		}
	}, [playersData]);

	useEffect(() => {
		let restartTimer: ReturnType<typeof setTimeout>;
		if (isWinnerFound) {
			restartTimer = setTimeout(() => {
				resetGameState({ friendId });
				resetState();
				setIsWinnerFound(false);
				const objectKeys = Object.keys(playersData);
				for (const key of objectKeys) {
					const player = playersData[key as PlayerSymbolsType];
					if (player.userId === userInfo.userId) {
						setIsBlockMove(false);
					}
				}
			}, 2000);
		}
		return () => {
			clearTimeout(restartTimer);
		};
	}, [isWinnerFound]);

	function getDataAboutOpponent(sessionId: string) {
		const message: IWebSocketMessage<IGetDataAboutOpponent> = {
			event: websocketEventNames.DATA_ABOUT_OPONENT,
			userId: userInfo.userId,
			data: {
				sessionId,
			},
		};
		webSocket?.instance.send(JSON.stringify(message));
	}

	function sendReadyState(userId: number, sessionId: string) {
		const message: IWebSocketMessage<IReadyStateToGame> = {
			event: websocketEventNames.START_GAME,
			userId: userId,
			data: {
				sessionId,
			},
		};
		webSocket?.instance.send(JSON.stringify(message));
	}

	function updateGameboard(friendId: number, playFieldState: Array<ICellData>, currentMove: ICurrentMove) {
		const message: IWebSocketMessage<ISyncGameboardState> = {
			event: websocketEventNames.SYNC_PLAYGROUND,
			userId: userInfo.userId,
			data: {
				friendId,
				currentMove,
				playFieldState,
			},
		};
		webSocket?.instance.send(JSON.stringify(message));
	}

	function updatePlayersData({ data }: IWebSocketMessage<IDataAboutOpponent>) {
		setPlayerData((prev) => {
			console.log(data);
			const objectKeys = Object.keys(data);
			for (const key of objectKeys) {
				const player = data[key as IPlayerData];

				if (player.userId === userInfo.userId) {
					console.log(player, userInfo);
					setFriendId(player.friendId);
				}

				prev[player.role].nickname = player.nickname;
				prev[player.role].userId = player.userId;
			}

			return { ...prev };
		});
	}

	function sendMessageifWinnerFind({ gameStatusMessage, players, friendId }: IIfWinnerFind) {
		const message: IWebSocketMessage<IIfWinnerFind> = {
			event: websocketEventNames.WINNER_FIND,
			userId: userInfo.userId,
			data: {
				friendId,
				gameStatusMessage,
				players,
			},
		};
		webSocket?.instance.send(JSON.stringify(message));
	}

	function resetGameState({ friendId }: IMessageWithFriendId) {
		const message: IWebSocketMessage<IMessageWithFriendId> = {
			event: websocketEventNames.RESET_GAME_STATE,
			userId: userInfo.userId,
			data: {
				friendId,
			},
		};
		webSocket?.instance.send(JSON.stringify(message));
	}

	return (
		<GameBoardWrap>
			<GameInfo gameStatusMessage={gameStatusMessage} currentMove={currentMove} playersData={playersData} />
			<PlayField>
				{playFieldState.map((item, index) => {
					return <FieldCell blockMove={isBlockMove} key={nanoid()} symbolName={item.symbol} highlight={item.highlight} markCell={markCell} index={index} />;
				})}
			</PlayField>
		</GameBoardWrap>
	);
};
