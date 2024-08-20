import {
  GeneralSectionSchema,
  ProjectSchema,
} from "@jakubkanna/labguy-front-schema";
import Layout from "../components/layout/Layout.";
import { useData } from "../utils/useData";
import Card from "../components/Card";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function Projects() {
  const [selected, setSelected] = useState<ProjectSchema | null>(null);
  const data = useData<ProjectSchema[]>("/projects/");
  if (!data) return;

  return (
    <>
      {!selected && (
        <Layout title="Projects">
          {data.map((project, i) => {
            return (
              <Card
                general={project.general as GeneralSectionSchema}
                image={undefined}
                key={i}
                onClick={() => setSelected(project)}
              ></Card>
            );
          })}
        </Layout>
      )}
      <Outlet context={selected} />
    </>
  );
}
