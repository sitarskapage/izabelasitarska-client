import { useLoaderData, useParams, Outlet } from "react-router-dom";
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
  const data = (useLoaderData() as Project[]) || null;
  const { slug } = useParams();

  if (!data) return null;

  return (
    <>
      {slug ? (
        <Outlet />
      ) : (
        <Layout title={"Projects"}>
          <Container className="d-flex flex-column gap-4">
            {data.map((item, i) => (
              <ProjectCard
                general={item.general}
                image={item.images?.[0]}
                key={i}
              />
            ))}
          </Container>
        </Layout>
      )}
    </>
  );
}
