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
import Projects from "./pages/Projects";
import Post from "./pages/single/Post";
import Work from "./pages/single/Work";
import Project from "./pages/single/Project";
import { fetchData } from "./utils/loader";
import NotFoundPage from "./pages/404";

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
        path: "posts",
        element: <NotFoundPage />,
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
      {
        path: "projects",
        element: <Projects />,
        loader: () => fetchData("projects"),
        children: [
          {
            path: ":slug",
            element: <Project />,
            loader: ({ params }) => fetchData("projects/" + params.slug),
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
