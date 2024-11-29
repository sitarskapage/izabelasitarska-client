import { Routes, Route, useLocation } from "react-router-dom";
import Homepage from "./pages/single/Home";
import Bio from "./pages/single/Bio";
import Contact from "./pages/single/Contact";
import Works from "./pages/Works";
import Post from "./pages/single/Post";
import Work from "./pages/single/Work";
import Posts from "./pages/Posts";
import NotFoundPage from "./pages/404";
import { AnimatePresence } from "framer-motion";

export default function Router() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        {/* Root Route */}
        <Route path="/" element={<Homepage />} />

        {/* Single Post Route */}
        <Route path=":slug" element={<Post />} />

        {/* Bio Route */}
        <Route path="bio" element={<Bio />} />

        {/* Blog Routes */}
        <Route path="blog" element={<Posts />}>
          <Route path=":slug" element={<Post />} />
        </Route>

        {/* Contact Route */}
        <Route path="contact" element={<Contact />} />

        {/* Works Routes */}
        <Route path="works" element={<Works />}>
          <Route path=":slug" element={<Work />} />
        </Route>

        {/* Catch-All for Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}
