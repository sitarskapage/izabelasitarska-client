import HTMLReactParser from "html-react-parser/lib/index";
import Layout from "../../components/layout/Layout.";
import { ProfileSchema } from "@jakubkanna/labguy-front-schema";
import { useLoaderData } from "react-router-dom";
import { useContext } from "react";
import { GeneralContext } from "../../contexts/GeneralContext";
import PortfolioButton from "../../components/PortfolioButton";
import { renderSingleItem } from "../../hooks/useArrayRender";
import BioTables from "../../components/BioTables";
import { Col, Container, Row } from "react-bootstrap";

export default function Bio() {
  const data = (useLoaderData() as ProfileSchema) || null;
  const { preferences } = useContext(GeneralContext);

  if (!data) return null;

  const { statement, additional } = data;

  return (
    <Layout
      title="Bio"
      description={statement || undefined}
      footer={<BioTables profile={data} />}
    >
      <Col>
        <Container className="border-start border-end border-dark">
          <Row id="Statement">
            <Col className="p-2">{statement && HTMLReactParser(statement)}</Col>
          </Row>
          <Row id="Additional" className="border-dark border-top">
            <Col className="p-4">{renderSingleItem(additional, 0)}</Col>
          </Row>
          {preferences?.enable_portfolio_pdf && (
            <Row id="Portfolio" className="border-dark border-top p-4">
              <Col>
                <h2>Portfolio</h2>
                <PortfolioButton url={data.portfolio_pdf_url} />
              </Col>
            </Row>
          )}
        </Container>
      </Col>
    </Layout>
  );
}
