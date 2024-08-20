import { useContext } from "react";
import Layout from "../../components/layout/Layout.";
import { GeneralContext } from "../../contexts/GeneralContext";
import { Container, Row } from "react-bootstrap";
import Image from "../../components/Image";
import { ImageRefSchema } from "@jakubkanna/labguy-front-schema";

export default function Homepage() {
  const { preferences } = useContext(GeneralContext);
  if (!preferences) return;
  const { homepage_heading, homepage_subheading, homepage_background_image } =
    preferences;

  return (
    <Layout title="">
      <Container>
        <Row>
          <Image image={homepage_background_image as ImageRefSchema}></Image>
        </Row>
        <Row>
          <h1>{homepage_heading}</h1>
        </Row>
        <Row>
          <h2>{homepage_subheading}</h2>
        </Row>
      </Container>
    </Layout>
  );
}
