import { useParams, Outlet } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import { Container } from "react-bootstrap";
import Layout from "../components/layout/Layout";
import { useFetchData } from "../hooks/useFetch";
import { Project } from "../../types/Project";

export default function Projects() {
  const { data } = useFetchData<Project[]>("projects");
  const { slug } = useParams();

  if (!data) return null;
  return (
    <>
      {slug ? (
        <Outlet />
      ) : (
        <Layout title={"Projects"}>
          <Container className="d-flex flex-column gap-4">
            {data.map(
              (item, i) =>
                item.general.published && <ProjectCard project={item} key={i} />
            )}
          </Container>
        </Layout>
      )}
    </>
  );
}
