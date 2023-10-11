import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SignIn } from '@/pages/signIn';
import { SignUp } from '@/pages/signUp';

import { routes } from '@/app/provider/routes';
import { TwoPlayerSession } from '@/pages/twoPlayerSession';
import { WithBotSession } from '@/pages/withBotSession';
import { Home } from '@/pages/home';
import { OnlineSession } from '@/pages/onlineSession';
import { Friends } from '@/pages/friends';
import { PrivedRoute } from '@/features/privedRoute/ui';
import { Profile } from '@/pages/profile';

export const AppProvider = () => {
	const router = createBrowserRouter([
		{
			path: routes.HOME,
			element: <PrivedRoute />,
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
					element: <Profile />,
				},
			],
		},
		{
			path: routes.SIGN_IN,
			element: <SignIn />,
		},
		{
			path: routes.SIGN_UP,
			element: <SignUp />,
		},
	]);

	return <RouterProvider router={router} />;
};
