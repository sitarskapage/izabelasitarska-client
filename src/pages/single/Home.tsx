import { useContext } from "react";
import Layout from "../../components/layout/Layout.";
import { GeneralContext } from "../../contexts/GeneralContext";
import { Col, ListGroup, Row } from "react-bootstrap";
import Image from "../../components/Image";
import { ImageRefSchema, UrlSchema } from "@jakubkanna/labguy-front-schema";
import { Link } from "react-router-dom";

export default function Homepage() {
  const { preferences } = useContext(GeneralContext);

  if (!preferences) return null;

  const {
    homepage_heading,
    homepage_subheading,
    homepage_background_image,
    homepage_urls,
  } = preferences;

  return (
    <Layout title="">
      <Col className="d-flex flex-column gap-2 h-100">
        <Row>
          <h1>{homepage_heading}</h1>
        </Row>
        <Row className="flex-grow-1">
          {homepage_background_image && (
            <Image
              className="w-100 h-100 object-fit-cover"
              image={homepage_background_image[0] as ImageRefSchema}
            ></Image>
          )}
        </Row>
        <Row>
          <h2>{homepage_subheading}</h2>
        </Row>
        <Row>
          <Col>
            <ListGroup horizontal>
              {homepage_urls &&
                homepage_urls.map((url) => {
                  return (
                    <ListGroup.Item>
                      <Link to={(url as UrlSchema).url} target="_blank">
                        {(url as UrlSchema).title}
                      </Link>
                    </ListGroup.Item>
                  );
                })}
            </ListGroup>
          </Col>
        </Row>
      </Col>
    </Layout>
  );
}
