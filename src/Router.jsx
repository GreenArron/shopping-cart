import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Shop from "./pages/Shop";
import ErrorPage from "./pages/ErrorPage";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "shop/",
          element: <Shop />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
