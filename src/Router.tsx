import { Routes, Route, useLocation } from "react-router-dom";
import Homepage from "./pages/single/Home";
import Bio from "./pages/single/Bio";
import NotFoundPage from "./pages/404";
import { fetchData } from "./utils/loader";
import EduArtContent from "./components/EduArt.section";
import { AnimatePresence } from "motion/react";
import { useFetchData } from "./hooks/useFetch";
import { Work } from "../types/Work";
import EduOrArt from "./pages/single/EduOrArt";

export default function Router() {
  const location = useLocation();
  const { data } = useFetchData<Work[]>("works?unique=true");
  if (!data) return null;

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
            element={<EduOrArt data={data} variant={"art"} />}
          />
          {/* education */}
          <Route
            path="education"
            element={<EduOrArt data={data} variant="education" />}
          />
        </Route>

        {/* Bio Route */}
        <Route
          path="bio"
          element={<Bio />}
          loader={() => fetchData("profile/1")}
        />

        {/* Catch-All for Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}
