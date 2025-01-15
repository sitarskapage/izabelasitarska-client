import { Routes, Route, useLocation } from "react-router-dom";
import Homepage from "./pages/single/Home";
import Bio from "./pages/single/Bio";
import Contact from "./pages/single/Contact";
import Works from "./pages/Works";
import Projects from "./pages/Projects";
import Post from "./pages/single/Post";
import Work from "./pages/single/Work";
import Project from "./pages/single/Project";
import Posts from "./pages/Posts";
import NotFoundPage from "./pages/404";
import { fetchData } from "./utils/loader";

export default function Router() {
  const location = useLocation();

  return (
    <Routes key={location.pathname} location={location}>
      {/* Root Route */}
      <Route index element={<Homepage />} />

      {/* Single Post Route */}
      <Route
        path=":slug"
        element={<Post />}
        loader={({ params }) => fetchData(`posts/${params.slug}`)}
      />

      {/* Bio Route */}
      <Route
        path="bio"
        element={<Bio />}
        loader={() => fetchData("profile/1")}
      />

      {/* Blog Routes */}
      <Route path="posts" element={<Posts />}>
        <Route
          path=":slug"
          element={<Post />}
          loader={({ params }) => fetchData(`posts/${params.slug}`)}
        />
      </Route>

      {/* Contact Route */}
      <Route
        path="contact"
        element={<Contact />}
        loader={() => fetchData("profile/1")}
      />

      {/* Works Routes */}
      <Route path="works" element={<Works />} loader={() => fetchData("works")}>
        <Route
          path=":slug"
          element={<Work />}
          loader={({ params }) => fetchData(`works/${params.slug}`)}
        />
      </Route>

      {/* Projects Routes */}
      <Route
        path="projects"
        element={<Projects />}
        loader={() => fetchData("projects")}
      >
        <Route
          path=":slug"
          element={<Project />}
          loader={({ params }) => fetchData(`projects/${params.slug}`)}
        />
      </Route>

      {/* Catch-All for Not Found */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
