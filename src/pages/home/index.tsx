import './style.scss';
import { GameSelector } from '@/features/gameSelector';
import { Button } from '@/shared/ui/button';
import { useAppDispatch } from '@/shared/hooks/reduxHooks';

import { addAlert } from '@/features/alertProvider/store';
import { nanoid } from 'nanoid';

export const Home = () => {
	const dispatch = useAppDispatch();

	return (
		<div className='home'>
			<div className='home__container'>
				<GameSelector />

				<Button
					onClick={() => dispatch(addAlert({ heading: 'Oooooopsss!', text: 'If you leave this match, ure you want to exit?' + nanoid() }))}
					size={'medium'}
					variant={'primary'}
					title='add notifs'
					fullWidth={false}
					type={'button'}></Button>
			</div>
		</div>
	);
};
