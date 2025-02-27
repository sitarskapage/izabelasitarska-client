import { Routes, Route, useLocation } from "react-router-dom";
import Homepage from "./pages/single/Home";
import Bio from "./pages/single/Bio";
import NotFoundPage from "./pages/404";
import { fetchData } from "./utils/loader";
import EduArtContent from "./components/EduArt.section";
import Art from "./pages/single/Art";
import Edu from "./pages/single/Edu";
import { AnimatePresence } from "motion/react";

export default function Router() {
  const location = useLocation();

  return (
    <AnimatePresence initial={false} mode="wait">
      <Routes location={location}>
        {/* Root Route */}
        <Route path="/" element={<Homepage />}>
          {/* home */}
          <Route path="" element={<EduArtContent />} />
          {/* art */}
          <Route path="art" element={<Art />} />
          {/* education */}
          <Route path="education" element={<Edu />} />
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
