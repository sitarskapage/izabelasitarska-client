import HTMLReactParser from "html-react-parser/lib/index";
import Layout from "../../components/layout/Layout.";
import { useData } from "../../utils/useData";
import { Container } from "react-bootstrap";
import { ProfileSchema } from "@jakubkanna/labguy-front-schema";

export default function Bio() {
  const data = useData<ProfileSchema>("/profile/1");

  if (!data) return;

  const { html_statement, html_additional } = data;

  const arrayToHtml = (arr: ProfileSchema["html_additional"]) => {
    return (arr ?? []).map((item, index) => (
      <div id={`Additional-${index}`}>
        {item.html && HTMLReactParser(item.html)}
      </div>
    ));
  };

  return (
    <Layout title="Bio">
      <Container>
        <div id="Statement">
          <h2>Statement</h2>
          <div>{html_statement && HTMLReactParser(html_statement)}</div>
        </div>
        <div id="Additional">
          <h2>Additional</h2>
          {arrayToHtml(html_additional)}
        </div>
      </Container>
    </Layout>
  );
}
