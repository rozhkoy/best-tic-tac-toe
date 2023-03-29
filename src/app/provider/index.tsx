import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../../pages/Home";

export const Provider = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
    ]);

    return <RouterProvider router={router} />;
};
