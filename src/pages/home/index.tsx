import './style.scss';

import { GameSelector } from '@/features/gameSelector';
import { CSSTransition } from 'react-transition-group';
import { Button } from '@/shared/ui/button';
import { useAppDispatch } from '@/shared/hooks/reduxHooks';
import { addNotif } from '@/features/notifications/store';
import { useState } from 'react';
import { nanoid } from 'nanoid';

export const Home = () => {
	const dispatch = useAppDispatch();
	const [isVisible, setIsVisible] = useState(false);
	const handleButtonClick = () => {
		setIsVisible(!isVisible);
	};
	return (
		<div className="home">
			<div className="home__container">
				<GameSelector />

				<Button
					onClick={() => dispatch(addNotif({ userId: 0, friendId: 0, src: 'df', nickname: 'asdfasdfasd', isVisible: true, id: nanoid() }))}
					size={'medium'}
					variant={'primary'}
					title="add notifs"
					fullWidth={false}
					type={'button'}></Button>
			</div>
		</div>
	);
};
