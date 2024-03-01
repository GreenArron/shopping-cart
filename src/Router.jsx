import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Shop from "./pages/Shop";
import ErrorPage from "./pages/ErrorPage";
import Index from "./pages/Index";

const Router = () => {
  const router = createBrowserRouter(
    [
      {
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/",
            element: Index(),
          },
          {
            path: "products/",
            element: <Shop />,
          },
        ],
      },
    ],
    { basename: "/shopping-cart" },
  );

  return <RouterProvider router={router} />;
};

export default Router;
