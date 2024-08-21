import {
  GeneralSectionSchema,
  ImageRefSchema,
  ProjectSchema,
} from "@jakubkanna/labguy-front-schema";
import { useData } from "../utils/useData";
import Card from "../components/Card";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout.";

export default function Projects() {
  const [selected, setSelected] = useState<ProjectSchema | null>(null);
  const data = useData<ProjectSchema[]>("/projects/");
  const location = useLocation();

  // Reset the selected state when the location changes to the parent route
  useEffect(() => {
    // Check if we are on the parent route (e.g., "/projects") by comparing the path
    if (location.pathname === "/projects") {
      setSelected(null);
    }
  }, [location]);

  if (!data) return null;

  return (
    <>
      {!selected && (
        <Layout title="Projects">
          {data.map((project, i) => (
            <Card
              general={project.general as GeneralSectionSchema}
              image={project.images?.[0] as ImageRefSchema}
              key={i}
              onClick={() => setSelected(project)}
            ></Card>
          ))}
        </Layout>
      )}
      <Outlet context={selected} />
    </>
  );
}
