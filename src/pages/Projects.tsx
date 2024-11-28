import { useLoaderData, useParams, Outlet } from "react-router-dom";
import {
  GeneralSectionSchema,
  ProjectSchema,
  UrlSchema,
} from "@jakubkanna/labguy-front-schema";
import Layout from "../components/layout/Layout";
import { Container } from "react-bootstrap";
import { Work } from "./Works";
import { MediaRef } from "../utils/helpers";
import ProjectRow from "../components/ProjectRow";

export interface Project extends ProjectSchema {
  general: GeneralSectionSchema;
  media: MediaRef[];
  urls: UrlSchema[];
  works: Work[];
}

export default function Projects() {
  const data = (useLoaderData() as Project[]) || null;
  const { slug } = useParams();

  if (!data) return null;

  const fofData = data.find((proj) => proj.general.slug == "fight-or-flight");
  const veloartData = data.find((proj) => proj.general.slug == "velo-art");
  const exodusData = data.find((proj) => proj.general.slug == "exodus");

  const veloImg = (
    <img
      src={"images/velo-art_logo.svg"}
      height={""}
      loading="lazy"
      className={"h-100 mw-100"}
    />
  );
  const fofImg = (
    <img
      src={"images/fof-logo.svg"}
      height={""}
      loading="lazy"
      className={"h-100 mw-100"}
    />
  );
  const exodusImg = (
    <img
      src={"images/exodus-logo.svg"}
      height={""}
      loading="lazy"
      className={"h-100 mw-100"}
    />
  );

  return (
    <>
      {slug ? (
        <Outlet />
      ) : (
        <Layout title={"Projects"}>
          <Container>
            <ProjectRow id="Exodus" image={exodusImg} data={exodusData} isNew />
            <ProjectRow id="FightorFlight" image={fofImg} data={fofData} />
            <ProjectRow
              id="Velo-art"
              image={veloImg}
              data={veloartData}
              isLast
            />
          </Container>
        </Layout>
      )}
    </>
  );
}
