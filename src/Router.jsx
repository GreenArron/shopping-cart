import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";
import ErrorPage from "./pages/ErrorPage";

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
            children: [
              {
                path: "checkout",
                element: <Checkout />,
              },
            ],
          },
        ],
      },
    ],
    { basename: "/shopping-cart" },
  );

  return <RouterProvider router={router} />;
};

export default Router;
