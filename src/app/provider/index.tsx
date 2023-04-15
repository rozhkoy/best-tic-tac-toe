import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from '../../pages/Home';
import { SignIn } from 'pages/SignIn';

export const Provider = () => {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Home />,
		},
		{
			path: '/signin',
			element: <SignIn />,
		},
	]);

	return <RouterProvider router={router} />;
};
