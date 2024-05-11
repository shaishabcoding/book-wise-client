import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import NewBook from "../pages/books/NewBook";
import Login from "../pages/signInUp/Login";
import Register from "../pages/signInUp/Register";
import PrivateRoute from "./PrivateRoute";
import AllBook from "../pages/books/AllBook";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    // errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <p>hello</p>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/books/new",
        element: (
          <PrivateRoute>
            <NewBook></NewBook>
          </PrivateRoute>
        ),
      },
      {
        path: "/books/all",
        element: <AllBook></AllBook>,
      },
    ],
  },
]);

export default router;
