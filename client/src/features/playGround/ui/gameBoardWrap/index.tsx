import { PropsWithClassNameAndChildren } from '@/shared/types/propsWithClassNameAndChildren';
import { Layout } from '@/shared/ui/layout';
import './styles.scss';

export const GameBoardWrap: React.FC<PropsWithClassNameAndChildren> = ({ children }) => {
	return (
		<Layout className='game-board-wrap'>
			<div className='game-board-wrap__container'>{children}</div>
		</Layout>
	);
};
