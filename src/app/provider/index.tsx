import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SignIn } from 'pages/signIn';
import { SignUp } from 'pages/signUp';
import { Wrap } from 'pages/wrap';
import { routes } from 'app/provider/routes';
import { Game } from 'pages/game';
import { TwoPlayerSession } from 'pages/twoPlayerSession';

export const Provider = () => {
	const router = createBrowserRouter([
		{
			path: routes.HOME,
			element: <Wrap />,
			children: [
				{
					path: routes.GAME,
					element: <Game />,
				},
				{
					path: routes.TWO_PLAYERS_SESSION,
					element: <TwoPlayerSession />,
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
