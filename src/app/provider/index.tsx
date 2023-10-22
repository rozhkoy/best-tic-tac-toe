import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SignIn } from '@/pages/signIn';
import { SignUp } from '@/pages/signUp';

import { routes } from '@/app/provider/routes';
import { TwoPlayerSession } from '@/pages/twoPlayerSession';
import { WithBotSession } from '@/pages/withBotSession';
import { Home } from '@/pages/home';
import { OnlineSession } from '@/pages/onlineSession';
import { Friends } from '@/pages/friends';
import { WebSocketWrap } from '@/features/webSocketWrap/ui';
import { Profile } from '@/pages/profile';
import { useEffect } from 'react';
import { PrivateRoutes } from '@/features/privateRoutes';

export const AppProvider = () => {
	useEffect(() => {
		const theme = localStorage.getItem('theme');
		if (theme && theme !== 'auto') {
			document.body.className = `${theme}-theme`;
		} else {
			const getCurrentTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
			if (getCurrentTheme()) {
				document.body.className = `dark-theme`;
			} else {
				document.body.className = `light-theme`;
			}
		}
	}, []);

	const router = createBrowserRouter([
		{
			path: routes.HOME,
			element: <WebSocketWrap />,
			children: [
				{
					path: routes.HOME,
					element: <Home />,
				},
				{
					path: routes.TWO_PLAYERS_SESSION,
					element: <TwoPlayerSession />,
				},
				{
					path: routes.WITH_BOT_SESSION + '/:hardLevel',
					element: <WithBotSession />,
				},
				{
					path: routes.ONLINE_SSESSION,
					element: <OnlineSession />,
				},
				{
					path: routes.FRIENDS,
					element: <Friends />,
				},
				{
					path: routes.USER + '/:userId',
					element: (
						<PrivateRoutes>
							<Profile />
						</PrivateRoutes>
					),
				},
			],
		},
		{
			path: routes.SIGN_IN,
			element: (
				<PrivateRoutes isReverse={true}>
					<SignIn />
				</PrivateRoutes>
			),
		},
		{
			path: routes.SIGN_UP,
			element: (
				<PrivateRoutes isReverse={true}>
					<SignUp />
				</PrivateRoutes>
			),
		},
	]);

	return <RouterProvider router={router} />;
};
