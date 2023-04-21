import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SignIn } from 'pages/SignIn';
import { SignUp } from 'pages/SignUp';
import { Wrap } from 'pages/Wrap';
import { routes } from 'app/provider/routes';

export const Provider = () => {
	const router = createBrowserRouter([
		{
			path: routes.HOME,
			element: <Wrap />,
			children: [
				{
					path: routes.HOME,
					element: <></>,
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
