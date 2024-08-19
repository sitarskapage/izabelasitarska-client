import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Homepage from "./pages/single/Home";
import Bio from "./pages/single/Bio";
import Contact from "./pages/single/Contact";
import Works from "./pages/Works";
import Projects from "./pages/Projects";
import Posts from "./pages/Posts";

const routes = [
  { path: "*" },
  {
    path: "",
    element: <App />,
    children: [
      { path: "/", element: <Homepage /> },
      {
        path: "bio",
        element: <Bio />,
      },
      { path: "works", element: <Works /> },
      { path: "projects", element: <Projects /> },
      { path: "posts", element: <Posts /> },
      { path: "contact", element: <Contact /> },
    ],
  },
];

const router = createBrowserRouter(routes);

export default function Router() {
  return <RouterProvider router={router} />;
}
