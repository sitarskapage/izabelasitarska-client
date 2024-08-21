import { useState, useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { useData } from "../utils/useData";
import {
  GeneralSectionSchema,
  ImageRefSchema,
  ProjectSchema,
} from "@jakubkanna/labguy-front-schema";
import Layout from "../components/layout/Layout.";
import ProjectCard from "../components/ProjectCard";
import { Container } from "react-bootstrap";

export interface Project extends ProjectSchema {
  general: GeneralSectionSchema;
  images: ImageRefSchema[];
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const data = useData<Project[]>("/projects/");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/projects/") {
      setSelected(null);
    }
  }, [location]);

  if (!data) return null;

  return (
    <>
      {!selected && (
        <Layout title={"Projects"}>
          <Container className="d-flex flex-column gap-4">
            {data.map((item, i) => (
              <ProjectCard
                general={item.general}
                image={item.images?.[0]}
                key={i}
                onClick={() => setSelected(item)}
              />
            ))}
          </Container>
        </Layout>
      )}
      <Outlet context={selected} />
    </>
  );
}
