import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { SignIn } from '@/pages/signIn';
import { SignUp } from '@/pages/signUp';
import { routes } from '@/app/provider/routes';
import { TwoPlayersSession } from '@/pages/twoPlayersSession';
import { WithBotSession } from '@/pages/withBotSession';
import { Home } from '@/pages/home';
import { OnlineSession } from '@/pages/onlineSession';
import { Friends } from '@/pages/friends';
import { Profile } from '@/pages/profile';
import { Wrap } from '@/pages/wrap';
import { PrivateRoutes } from '@/features/privateRoutes';
import { GetAuthState } from '@/features/accountAuth/lib/getAuthState';
import { Providers } from '@/features/providers';
import { PageNotFound } from '@/pages/404';

export const AppProvider = () => {
	const router = createBrowserRouter([
		{
			path: routes.HOME,
			element: (
				<Providers>
					<Wrap />
				</Providers>
			),
			children: [
				{
					path: routes.HOME,
					element: <Home />,
				},
				{
					path: routes.TWO_PLAYERS_SESSION,
					element: <TwoPlayersSession />,
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
					path: routes.USER + '/:targetUser',
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
		{ path: '*', element: <PageNotFound /> },
	]);

	return <RouterProvider router={router} />;
};
