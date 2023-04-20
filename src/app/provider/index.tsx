import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SignIn } from 'pages/SignIn';
import { SignUp } from 'pages/SignUp';
import { Wrap } from 'pages/Wrap';

export const Provider = () => {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Wrap />,
		},
		{
			path: '/sign-in',
			element: <SignIn />,
		},
		{
			path: '/sign-up',
			element: <SignUp />,
		},
	]);

	return <RouterProvider router={router} />;
};
