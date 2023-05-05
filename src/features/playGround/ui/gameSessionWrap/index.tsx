import { PropsWithClassNameAndChildren } from 'shared/types/propsWithClassNameAndChildren';
import { Layout } from 'shared/ui/layout';
import './styles.scss';

export const GameSessionWrap: React.FC<PropsWithClassNameAndChildren> = ({ children }) => {
	return (
		<Layout className="game-session-wrap">
			<div className="game-session-wrap__container">{children}</div>
		</Layout>
	);
};
