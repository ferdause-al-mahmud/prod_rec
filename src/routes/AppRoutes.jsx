import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import HomePage from "../pages/HomePage";
import MyQueries from "../pages/MyQueries";
import AddQueries from "../pages/AddQueries";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import AllQueries from "../pages/AllQueries";
import QueryDetails from "../pages/QueryDetails";
import MyRecommendations from "../pages/MyRecommendations";
import RecommendationsForMe from "../pages/RecommendationsForMe";
import EditQuery from "../pages/EditQuery";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
        loader: () =>
          fetch(
            `https://prod-rec-server-site.vercel.app/queries-limit/?limit=${6}`
          ),
      },
      {
        path: "/all-queries",
        element: <AllQueries></AllQueries>,
      },
      {
        path: "/query-details/:id",
        element: (
          <PrivateRoute>
            <QueryDetails></QueryDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://prod-rec-server-site.vercel.app/query/${params.id}`),
      },
      {
        path: "/recommendation-for-me",
        element: (
          <PrivateRoute>
            <RecommendationsForMe></RecommendationsForMe>
          </PrivateRoute>
        ),
      },
      { path: "/login", element: <Login></Login> },
      { path: "/register", element: <Register></Register> },
      {
        path: "/my-queries",
        element: (
          <PrivateRoute>
            <MyQueries></MyQueries>
          </PrivateRoute>
        ),
      },
      {
        path: "/add-queries",
        element: (
          <PrivateRoute>
            <AddQueries></AddQueries>
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-query/:id",
        element: (
          <PrivateRoute>
            <EditQuery></EditQuery>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://prod-rec-server-site.vercel.app/query/${params.id}`),
      },
      {
        path: "/my-recommendations",
        element: (
          <PrivateRoute>
            <MyRecommendations></MyRecommendations>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
