import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { Alert } from '@/shared/ui/alert';
import { CSSTransition } from 'react-transition-group';
import { showNextAlert, toggleAlertVisible } from '../store';
import { useEffect } from 'react';

export const AlertProvider = () => {
	const { currentAlert } = useAppSelector((state) => state.alert);

	const dispatch = useAppDispatch();

	useEffect(() => {
		let timer: ReturnType<typeof setTimeout>;
		if (currentAlert.isVisible) {
			timer = setTimeout(() => {
				dispatch(toggleAlertVisible(false));
			}, 3_000);
		}

		return () => {
			clearInterval(timer);
		};
	}, [dispatch, currentAlert]);

	function onExited() {
		dispatch(showNextAlert());
	}

	return (
		<CSSTransition timeout={500} in={currentAlert.isVisible} classNames='pop-out' onExited={onExited} unmountOnExit>
			<Alert heading={currentAlert.heading} text={currentAlert.text} />
		</CSSTransition>
	);
};
