import HTMLReactParser from "html-react-parser/lib/index";
import Layout from "../../components/layout/Layout.";
import { ProfileSchema } from "@jakubkanna/labguy-front-schema";
import { useLoaderData } from "react-router-dom";

export default function Bio() {
  const data = (useLoaderData() as ProfileSchema) || null;

  if (!data) return null;

  const { html_statement, html_additional } = data;

  const arrayToHtml = (arr: ProfileSchema["html_additional"]) => {
    return (arr ?? []).map((item, index) => (
      <div id={`Additional-${index}`} key={index}>
        {item.html && HTMLReactParser(item.html)}
      </div>
    ));
  };

  return (
    <Layout title="Bio">
      <div id="Statement">
        <h2>Statement</h2>
        <div>{html_statement && HTMLReactParser(html_statement)}</div>
      </div>
      <div id="Additional">
        <h2>Additional</h2>
        {arrayToHtml(html_additional)}
      </div>
    </Layout>
  );
}
