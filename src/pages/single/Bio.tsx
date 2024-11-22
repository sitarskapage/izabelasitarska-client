import HTMLReactParser from "html-react-parser/lib/index";
import Layout from "../../components/layout/Layout.";
import { ProfileSchema } from "@jakubkanna/labguy-front-schema";
import { useLoaderData } from "react-router-dom";
import { useContext } from "react";
import { GeneralContext } from "../../contexts/GeneralContext";
import PortfolioButton from "../../components/PortfolioButton";
import { renderSingleItem } from "../../hooks/useArrayRender";
import BioTables from "../../components/BioTables";
import { container } from "../../utils/framer-motion";
import { motion } from "framer-motion";
import { Row } from "react-bootstrap";

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
      <motion.div
        key="content"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={container}
        transition={{ duration: 0.5 }}
        className="flex-grow-1 col"
      >
        <Row id="Statement">{statement && HTMLReactParser(statement)}</Row>
        <Row id="Additional" className="border-dark border-top p-4">
          {renderSingleItem(additional, 0)}
        </Row>
        {preferences?.enable_portfolio_pdf && (
          <Row id="Portfolio" className="border-dark border-top p-4">
            <h2>Portfolio</h2>
            <PortfolioButton url={data.portfolio_pdf_url} />
          </Row>
        )}
      </motion.div>
    </Layout>
  );
}
