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
import Error from "../pages/404/Error";
import Home from "../pages/home/Home";
import Categories from "../pages/books/Categories";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
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
        element: (
          <PrivateRoute>
            <AllBook></AllBook>
          </PrivateRoute>
        ),
      },
      {
        path: "/books/categories/:category",
        element: (
          <PrivateRoute>
            <Categories></Categories>
          </PrivateRoute>
        ),
      },
      {
        path: "/books/borrowed",
        element: (
          <PrivateRoute>
            <Borrowed></Borrowed>
          </PrivateRoute>
        ),
      },
      {
        path: "/books/my",
        element: (
          <PrivateRoute>
            <MyBooks></MyBooks>
          </PrivateRoute>
        ),
      },
      {
        path: "/book/:id",
        element: (
          <PrivateRoute>
            <Details></Details>
          </PrivateRoute>
        ),
      },
      {
        path: "/book/:id/edit",
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
