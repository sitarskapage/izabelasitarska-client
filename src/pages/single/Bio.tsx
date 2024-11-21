import HTMLReactParser from "html-react-parser/lib/index";
import Layout from "../../components/layout/Layout.";
import { ProfileSchema } from "@jakubkanna/labguy-front-schema";
import { useLoaderData } from "react-router-dom";
import { useContext } from "react";
import { GeneralContext } from "../../contexts/GeneralContext";
import PortfolioButton from "../../components/PortfolioButton";
import { renderSingleItem } from "../../hooks/useArrayRender";
import BioTables from "../../components/BioTables";

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
      <div id="Statement">{statement && HTMLReactParser(statement)}</div>
      <div id="Additional" className="border-dark border-top p-4">
        {renderSingleItem(additional, 0)}
      </div>
      {preferences?.enable_portfolio_pdf && (
        <div id="Portfolio" className="border-dark border-top p-4">
          <h2>Portfolio</h2>
          <PortfolioButton url={data.portfolio_pdf_url} />
        </div>
      )}
    </Layout>
  );
}
