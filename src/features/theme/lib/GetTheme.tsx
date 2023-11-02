import { useAppDispatch } from '@/shared/hooks/reduxHooks';
import { PropsWithChildren, useEffect } from 'react';
import { updateTheme } from '..';
import { themeTypes } from '@/features/settings/types';
import { toggleNotificationsVisible } from '@/features/notifications/store';

export const GetTheme: React.FC<PropsWithChildren> = ({ children }) => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const { innerWidth } = window;

		if (innerWidth < 767) {
			dispatch(toggleNotificationsVisible(false));
		}

		const theme = localStorage.getItem('theme');
		if (theme && theme !== 'auto') {
			document.body.className = `${theme}-theme`;
			dispatch(updateTheme(theme as themeTypes));
		} else {
			const getCurrentTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
			if (getCurrentTheme()) {
				document.body.className = `dark-theme`;
				dispatch(updateTheme('dark'));
			} else {
				document.body.className = `light-theme`;
				dispatch(updateTheme('light'));
			}
		}
	}, []);
	return <>{children}</>;
};
