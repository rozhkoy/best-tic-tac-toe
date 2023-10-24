import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { SignIn } from '@/pages/signIn';
import { SignUp } from '@/pages/signUp';
import { routes } from '@/app/provider/routes';
import { TwoPlayerSession } from '@/pages/twoPlayerSession';
import { WithBotSession } from '@/pages/withBotSession';
import { Home } from '@/pages/home';
import { OnlineSession } from '@/pages/onlineSession';
import { Friends } from '@/pages/friends';
import { Profile } from '@/pages/profile';
import { useEffect } from 'react';
import { Wrap } from '@/pages/wrap';
import { PrivateRoutes } from '@/features/privateRoutes';
import { GetAuthState } from '@/features/accountAuth/lib/getAuthState';

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
			element: <Wrap />,
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
					element: (
						<PrivateRoutes redirectPath={`${routes.ACCOUNTS}/${routes.SIGN_IN}`} isAllow={true}>
							<OnlineSession />
						</PrivateRoutes>
					),
				},
				{
					path: routes.FRIENDS,
					element: (
						<PrivateRoutes redirectPath={`${routes.ACCOUNTS}/${routes.SIGN_IN}`} isAllow={true}>
							<Friends />
						</PrivateRoutes>
					),
				},
				{
					path: routes.USER + '/:userId',
					element: (
						<PrivateRoutes redirectPath={`${routes.ACCOUNTS}/${routes.SIGN_IN}`} isAllow={true}>
							<Profile />
						</PrivateRoutes>
					),
				},
			],
		},
		{
			path: routes.ACCOUNTS,
			element: (
				<GetAuthState>
					<Outlet />
				</GetAuthState>
			),
			children: [
				{
					path: routes.SIGN_IN,
					element: (
						<PrivateRoutes redirectPath={routes.HOME} isAllow={false}>
							<SignIn />
						</PrivateRoutes>
					),
				},
				{
					path: routes.SIGN_UP,
					element: (
						<PrivateRoutes redirectPath={routes.HOME} isAllow={false}>
							<SignUp />
						</PrivateRoutes>
					),
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
};
