import { Routes, Route, useLocation } from "react-router-dom";
import Homepage from "./pages/single/Home";
import Bio from "./pages/single/Bio";
import NotFoundPage from "./pages/404";
import { fetchData } from "./utils/loader";
import EduArtContent from "./components/EduArt.section";
import { AnimatePresence } from "motion/react";
import { useFetchData } from "./hooks/useFetch";
import { Work as WorkType } from "../types/Work";
import EduOrArt from "./pages/single/EduOrArt";
import Work from "./pages/single/Work";
import { Post as PostType } from "./pages/Posts";
import Post from "./pages/single/Post";

export default function Router() {
  const location = useLocation();
  const { data: works } = useFetchData<WorkType[]>("works?unique=true");
  const { data: posts } = useFetchData<PostType[]>("posts");

  const data = [...(works || []), ...(posts || [])];

  if (!data || !works || !posts) return null;

  return (
    <AnimatePresence initial={false} mode="wait">
      <Routes location={location}>
        {/* Root Route */}
        <Route path="/" element={<Homepage />}>
          {/* home */}
          <Route path="" element={<EduArtContent data={data} />} />
          {/* art */}
          <Route
            path="art"
            element={<EduOrArt data={works} variant={"art"} />}
          />
          {/* edu */}
          <Route path="edu" element={<EduOrArt data={posts} variant="edu" />} />
        </Route>

        {/* Bio Route */}
        <Route
          path="bio"
          element={<Bio />}
          loader={() => fetchData("profile/1")}
        />
        {/* work route */}
        <Route path="art/:slug" element={<Work />} />
        <Route path="edu/:slug" element={<Post />} />

        {/* Catch-All for Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}
