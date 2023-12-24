import { useAppSelector } from '@/shared/hooks/reduxHooks';
import { Preloader } from '@/shared/ui/preloader';
import { CSSTransition } from 'react-transition-group';

export const PreloaderProvider = () => {
	const preloader = useAppSelector((state) => state.preloader);

	return (
		<CSSTransition in={preloader.isVisible} timeout={300} classNames='opacity' unmountOnExit>
			<Preloader />
		</CSSTransition>
	);
};
