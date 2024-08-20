import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Homepage from "./pages/single/Home";
import Bio from "./pages/single/Bio";
import Contact from "./pages/single/Contact";
import Works from "./pages/Works";
import Projects from "./pages/Projects";
import Post from "./pages/single/Post";
import Work from "./pages/single/Work";
import Project from "./pages/single/Project";

const routes = [
  {
    path: "",
    element: <App />,
    children: [
      { path: "/", element: <Homepage /> },
      { path: ":slug", element: <Post /> },
      { path: "bio", element: <Bio /> },
      { path: "contact", element: <Contact /> },
      {
        path: "works",
        element: <Works />,
        children: [{ path: ":slug", element: <Work /> }],
      },
      {
        path: "projects",
        element: <Projects />,
        children: [{ path: ":slug", element: <Project /> }],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default function Router() {
  return <RouterProvider router={router} />;
}
