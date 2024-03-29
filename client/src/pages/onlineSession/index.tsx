import { addAlert } from '@/features/alertProvider';
import { GameBoardWrap, GameInfo, PlayField, usePlayFieldHandler } from '@/features/playGround';
import { GameStatusMessage, ICurrentMove, IPlayers, PlayerSymbolsType } from '@/features/playGround/types';
import { websocketEventNames } from '@/features/webSocketConnection/lib/websocketEventNames';
import { IGetDataAboutOpponent, IIfWinnerFind, IMessageOnGameOver, IMessageWithFriendId, IOnGameOver, IReadyStateToGame, ISyncGameboardState } from '@/features/webSocketConnection/types';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { WebSocketContext } from '@/shared/providers/WebSocketProvider';
import { IWebSocketMessage } from '@/shared/types/webSocketMessage';
import { FieldCell } from '@/shared/ui/fieldCell';
import { ICellData } from '@/shared/ui/fieldCell/types';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useBeforeUnload, useBlocker, useNavigate, useParams } from 'react-router-dom';
import { IInfoAboutOpponent, IPartialPlayerData } from './types';
import { GameOverPopup } from '@/shared/ui/gameOverPopup';
import { CSSTransition } from 'react-transition-group';
import { updateIsPlayingStatus } from '@/entities/user';
import { WarningPopup } from '@/shared/ui/warning';

export const OnlineSession = () => {
	const NUMBER_OF_GAMES = 5;
	const { sessionId } = useParams();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const userInfo = useAppSelector((state) => state.user);
	const blocker = useBlocker(({ currentLocation, nextLocation }) => {
		return !!(userInfo.isPlaying && currentLocation.pathname !== nextLocation.pathname);
	});
	const [isVisibleWarningPopup, setIsVisibleWarningPopup] = useState<boolean>(false);

	const webSocket = useContext(WebSocketContext);

	const [isBlockMove, setIsBlockMove] = useState<boolean>(true);

	const [gameOverMessage, setGameOverMessage] = useState<GameStatusMessage>({
		message: '',
		isShow: false,
		color: 'secondary',
	});
	const [friendId, setFriendId] = useState<string>('0');
	const [isWinnerFound, setIsWinnerFound] = useState<boolean>(false);
	const [countGames, setCountGames] = useState<number>(0);
	const [playersData, setPlayersData] = useState<IPlayers>({
		cross: {
			nickname: '',
			score: 0,
			userId: '0',
		},
		nought: {
			nickname: '',
			score: 0,
			userId: '0',
		},
	});
	const [gameStatusMessage, setGameStatusMessage] = useState<GameStatusMessage>({
		message: '',
		isShow: false,
		color: 'secondary',
	});
	const { playFieldState, resetState, currentMove, markCell, setPlayFieldState, setCurrentMove } = usePlayFieldHandler(
		[],
		playersData,
		(symbol) => {
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
			setIsWinnerFound(true);
			setPlayersData(players);
			setCountGames((prev) => ++prev);
			sendMessageIfWinnerFind({ gameStatusMessage: message, players, friendId, countGames: countGames + 1 });
			setGameStatusMessage(message);
		},
		() => {
			const message: GameStatusMessage = {
				message: 'Draw!',
				isShow: true,
				color: 'secondary',
			};
			setCountGames((prev) => ++prev);
			setGameStatusMessage(message);
			sendMessageIfWinnerFind({ gameStatusMessage: message, players: playersData, friendId, countGames: countGames + 1 });
			setIsWinnerFound(true);
		},
		() => {
			setGameStatusMessage({
				message: '',
				isShow: false,
				color: 'secondary',
			});
		},
		({ playFieldState, currentMove }, isWinnerFound) => {
			updateGameboard(friendId, playFieldState, currentMove, isWinnerFound);
		}
	);

	useEffect(() => {
		if (userInfo.userId) {
			getDataAboutOpponent(sessionId as string);
		}

		if (webSocket) {
			webSocket.subscribeToOnUpdate(websocketEventNames.DATA_ABOUT_OPONENT, (message: IWebSocketMessage<IInfoAboutOpponent>) => {
				dispatch(updateIsPlayingStatus(true));
				updatePlayersData(message);
			});

			webSocket.subscribeToOnUpdate(websocketEventNames.START_GAME, () => {
				setIsBlockMove(false);
			});

			webSocket.subscribeToOnUpdate(websocketEventNames.SYNC_PLAYGROUND, ({ data }: IWebSocketMessage<ISyncGameboardState>) => {
				if (!data.isWinnerFound) {
					setIsBlockMove(false);
				}
				setPlayFieldState(data.playFieldState);
				setCurrentMove(data.currentMove);
			});

			webSocket.subscribeToOnUpdate(websocketEventNames.WINNER_FIND, ({ data: { gameStatusMessage, players, countGames } }: IWebSocketMessage<IIfWinnerFind>) => {
				setGameStatusMessage(gameStatusMessage);
				setPlayersData(players);
				setCountGames(countGames);
				setIsBlockMove(true);
			});

			webSocket.subscribeToOnUpdate(websocketEventNames.RESET_GAME_STATE, () => {
				resetState();
			});

			webSocket.subscribeToOnUpdate(websocketEventNames.GAME_OVER, ({ data: { winnerPlayerId } }) => {
				setGameOverMessage((state) => {
					state.message = winnerPlayerId == 0 ? 'Draw!' : winnerPlayerId == userInfo.userId ? 'You Won!' : 'You Lost!';
					state.isShow = true;
					state.color = winnerPlayerId !== userInfo.userId ? 'red' : 'secondary';
					return { ...state };
				});
				dispatch(updateIsPlayingStatus(false));
			});

			webSocket.subscribeToOnUpdate(websocketEventNames.SESSIONS_IS_CLOSED, (message) => {
				dispatch(addAlert({ heading: 'Oooooopssss', text: message.error }));
				navigate('/', { replace: true });
			});
		}

		return () => {
			webSocket?.unSubscribeToOnUpdate(websocketEventNames.DATA_ABOUT_OPONENT);
			webSocket?.unSubscribeToOnUpdate(websocketEventNames.START_GAME);
			webSocket?.unSubscribeToOnUpdate(websocketEventNames.SYNC_PLAYGROUND);
			webSocket?.unSubscribeToOnUpdate(websocketEventNames.WINNER_FIND);
		};
	}, [userInfo.userId]);

	useEffect(() => {
		if (playersData.cross.nickname && playersData.cross.userId === userInfo.userId) {
			sendReadyState(userInfo.userId, sessionId as string);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [playersData]);

	useEffect(() => {
		let restartTimer: ReturnType<typeof setTimeout>;
		if (isWinnerFound) {
			restartTimer = setTimeout(() => {
				if (countGames < NUMBER_OF_GAMES) {
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
				} else {
					onGameOver({ friendId });
				}
			}, 2000);
		}
		return () => {
			clearTimeout(restartTimer);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isWinnerFound]);

	function getDataAboutOpponent(sessionId: string) {
		const message: IWebSocketMessage<IGetDataAboutOpponent> = {
			event: websocketEventNames.DATA_ABOUT_OPONENT,
			userId: userInfo.userId,
			data: {
				sessionId,
			},
			error: '',
		};
		webSocket?.send(JSON.stringify(message));
	}

	function sendReadyState(userId: string, sessionId: string) {
		const message: IWebSocketMessage<IReadyStateToGame> = {
			event: websocketEventNames.START_GAME,
			userId: userId,
			data: {
				sessionId,
			},
			error: '',
		};
		webSocket?.send(JSON.stringify(message));
	}

	function updateGameboard(friendId: string, playFieldState: Array<ICellData>, currentMove: ICurrentMove, isWinnerFound: boolean) {
		const message: IWebSocketMessage<ISyncGameboardState> = {
			event: websocketEventNames.SYNC_PLAYGROUND,
			userId: userInfo.userId,
			data: {
				friendId,
				currentMove,
				playFieldState,
				isWinnerFound,
			},
			error: '',
		};
		webSocket?.send(JSON.stringify(message));
	}

	function updatePlayersData({ data }: IWebSocketMessage<IInfoAboutOpponent>) {
		const prevPlayersDataState = playersData;

		const objectKeys = Object.keys(data.players);
		for (const key of objectKeys) {
			const player = data.players[key as IPartialPlayerData];

			if (player.userId === userInfo.userId) {
				setFriendId(player.friendId);
			}

			prevPlayersDataState[player.role].nickname = player.nickname;
			prevPlayersDataState[player.role].userId = player.userId;
		}

		setCurrentMove((state) => {
			state.symbol = 'cross';
			state.player = prevPlayersDataState.cross.nickname;
			return state;
		});

		setPlayersData({ ...prevPlayersDataState });
	}

	function sendMessageIfWinnerFind({ gameStatusMessage, players, friendId, countGames }: IIfWinnerFind) {
		const message: IWebSocketMessage<IIfWinnerFind> = {
			event: websocketEventNames.WINNER_FIND,
			userId: userInfo.userId,
			data: {
				friendId,
				gameStatusMessage,
				players,
				countGames,
			},
			error: '',
		};
		webSocket?.send(JSON.stringify(message));
	}

	function resetGameState({ friendId }: IMessageWithFriendId) {
		const message: IWebSocketMessage<IMessageWithFriendId> = {
			event: websocketEventNames.RESET_GAME_STATE,
			userId: userInfo.userId,
			data: {
				friendId,
			},
			error: '',
		};
		webSocket?.send(JSON.stringify(message));
	}

	function sendGameOverMessage(data: IMessageOnGameOver) {
		const message: IWebSocketMessage<IMessageOnGameOver> = {
			event: websocketEventNames.GAME_OVER,
			userId: userInfo.userId,
			data,
			error: '',
		};

		webSocket?.send(JSON.stringify(message));
	}

	function onGameOver({ friendId }: IOnGameOver) {
		const firstPlayerId: string = playersData.cross.userId ?? '0';
		const secondPlayerId: string = playersData.nought.userId ?? '0';
		let winnerPlayerId = '0';

		if (playersData.cross.userId && playersData.nought.userId) {
			winnerPlayerId = playersData.cross.score > playersData.nought.score ? playersData.cross.userId : playersData.cross.score !== playersData.nought.score ? playersData.nought.userId : '0';
		}

		setGameOverMessage((state) => {
			state.message = winnerPlayerId == '0' ? 'Draw!' : winnerPlayerId == userInfo.userId ? 'You Won!' : 'You Lost!';
			state.isShow = true;
			state.color = winnerPlayerId !== userInfo.userId ? 'red' : 'secondary';
			return { ...state };
		});

		sendGameOverMessage({
			sessionId: sessionId ?? '0',
			friendId,
			winnerPlayerId,
			firstPlayerId,
			secondPlayerId,
			factor: 1,
		});
	}

	function onYes() {
		const firstPlayerId: string = playersData.cross.userId ?? '0';
		const secondPlayerId: string = playersData.nought.userId ?? '0';
		const winnerPlayerId = playersData.cross.userId === userInfo.userId ? secondPlayerId : firstPlayerId;

		sendGameOverMessage({
			sessionId: sessionId ?? '0',
			friendId,
			winnerPlayerId,
			firstPlayerId,
			secondPlayerId,
			factor: 2,
		});
		dispatch(updateIsPlayingStatus(false));
		setIsVisibleWarningPopup(false);
		if (blocker.state === 'blocked') blocker.proceed();
	}

	function onClickOnCell(index: number) {
		setIsBlockMove(true);
		markCell(index);
	}

	function onNo() {
		setIsVisibleWarningPopup(false);
		if (blocker.state === 'blocked') blocker.reset();
	}

	useBeforeUnload(
		useCallback((e) => {
			return (e.returnValue = 'Leave a Match?');
		}, [])
	);

	useEffect(() => {
		if (blocker.state === 'blocked') {
			setIsVisibleWarningPopup(true);
		}
	}, [blocker.state]);

	return (
		<>
			<GameBoardWrap>
				<GameInfo gameStatusMessage={gameStatusMessage} currentMove={currentMove} playersData={playersData} />
				<PlayField>
					{playFieldState.map((item, index) => {
						return <FieldCell blockMove={isBlockMove} key={item.id} symbolName={item.symbol} highlight={item.highlight} markCell={onClickOnCell} index={index} />;
					})}
				</PlayField>
			</GameBoardWrap>
			<CSSTransition in={gameOverMessage.isShow} timeout={300} classNames='opacity' unmountOnExit>
				<GameOverPopup message={gameOverMessage.message} color={gameOverMessage.color} />
			</CSSTransition>
			<CSSTransition in={isVisibleWarningPopup} timeout={300} classNames='opacity' unmountOnExit>
				<WarningPopup heading={'Leave a Match?'} text={'If you leave this match, it will count as a lost. Are you sure you want to exit?'} onYes={onYes} onNo={onNo} />
			</CSSTransition>
		</>
	);
};
