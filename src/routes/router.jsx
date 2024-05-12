import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import NewBook from "../pages/books/NewBook";
import Login from "../pages/signInUp/Login";
import Register from "../pages/signInUp/Register";
import PrivateRoute from "./PrivateRoute";
import AllBook from "../pages/books/AllBook";
import Details from "../pages/books/Details";
import Borrowed from "../pages/books/Borrowed";
import MyBooks from "../pages/books/MyBooks";
import UpdateBook from "../pages/books/UpdateBook";

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
      {
        path: "/books/borrowed",
        element: <Borrowed></Borrowed>,
      },
      {
        path: "/books/my",
        element: <MyBooks></MyBooks>,
      },
      {
        path: "/book/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/book/${params.id}`),
        element: (
          <PrivateRoute>
            <Details></Details>
          </PrivateRoute>
        ),
      },
      {
        path: "/book/:id/edit",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/book/${params.id}`),
        element: (
          <PrivateRoute>
            <UpdateBook></UpdateBook>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
