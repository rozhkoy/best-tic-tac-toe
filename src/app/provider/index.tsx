import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from '../../pages/Home';
import { SignIn } from 'pages/SignIn';
import { SignUp } from 'pages/SignUp';

export const Provider = () => {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Home />,
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
