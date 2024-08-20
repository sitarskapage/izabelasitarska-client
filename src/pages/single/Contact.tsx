import { ProfileSchema } from "@jakubkanna/labguy-front-schema";
import Layout from "../../components/layout/Layout.";
import { useData } from "../../utils/useData";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Contact() {
  const data = useData<ProfileSchema>("/profile/1");
  if (!data) return;
  const { contact } = data;

  return (
    <Layout title="Contact">
      {contact?.map((c, i) => {
        return (
          <Container key={i}>
            <Row>{c.email}</Row>
            <Row>
              {c.socialmedia?.map((sm, i) => {
                console.log(sm.platform?.toLocaleLowerCase());
                return (
                  <Container key={i}>
                    <Link
                      to={sm.profileUrl || "#"}
                      target="_blank"
                      style={{ display: "flex", gap: "0.25rem" }}
                    >
                      <i
                        className={
                          "bi " + "bi-" + sm.platform?.toLocaleLowerCase() || ""
                        }
                      ></i>
                      {sm.username}
                    </Link>
                  </Container>
                );
              })}
            </Row>
          </Container>
        );
      })}
    </Layout>
  );
}
