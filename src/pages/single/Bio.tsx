import HTMLReactParser from "html-react-parser/lib/index";
import Layout from "../../components/layout/Layout.";
import { ProfileSchema } from "@jakubkanna/labguy-front-schema";
import { useLoaderData } from "react-router-dom";

export default function Bio() {
  const data = (useLoaderData() as ProfileSchema) || null;

  if (!data) return null;

  const { statement, additional } = data;

  const arrayToHtml = (arr: ProfileSchema["additional"]) => {
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
        <div>{statement && HTMLReactParser(statement)}</div>
      </div>
      <div id="Additional">
        <h2>Additional</h2>
        {arrayToHtml(additional)}
      </div>
    </Layout>
  );
}
