import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import App from "./App";
import Homepage from "./pages/single/Home";
import Bio from "./pages/single/Bio";
import Contact from "./pages/single/Contact";
import Works from "./pages/Works";
import Post from "./pages/single/Post";
import Work from "./pages/single/Work";
import { fetchData } from "./utils/loader";
import NotFoundPage from "./pages/404";
import Posts from "./pages/Posts";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "", element: <Homepage /> },
      {
        path: ":slug",
        element: <Post />,
        loader: ({ params }) => fetchData("posts/" + params.slug),
      },

      { path: "bio", element: <Bio />, loader: () => fetchData("profile/1") },
      {
        path: "blog",
        element: <Posts />,
        loader: () => fetchData("posts"),
        children: [
          {
            path: ":slug",
            element: <Post />,
            loader: ({ params }) => fetchData("posts/" + params.slug),
          },
        ],
      },
      {
        path: "contact",
        element: <Contact />,
        loader: () => fetchData("profile/1"),
      },
      {
        path: "works",
        element: <Works />,
        loader: () => fetchData("works"),
        children: [
          {
            path: ":slug",
            element: <Work />,
            loader: ({ params }) => fetchData("works/" + params.slug),
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});
export default function Router() {
  return <RouterProvider router={router} />;
}
