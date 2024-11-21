import { ReactNode, useContext } from "react";
import { Container, Row } from "react-bootstrap";
import { GeneralContext } from "../../contexts/GeneralContext";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import BioTables from "../BioTables";
import { ProfileSchema } from "@jakubkanna/labguy-front-schema";

export default function Layout({
  children,
  title,
  description,
  profile,
}: {
  children: ReactNode;
  title?: string;
  description?: string;
  profile?: ProfileSchema;
}) {
  const { preferences } = useContext(GeneralContext);

  const metadata = {
    title: title || preferences?.artists_name || "Untitled",
    description: description,
    name: preferences?.artists_name,
  };

  const location = useLocation();
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="author" content={metadata.name} />
      </Helmet>
      <Row id="SinglePageHeader" className="border-dark border-bottom">
        {title && <h1 className="display-1">{title}</h1>}
      </Row>
      <Container className="flex-grow-1 border-dark border-start border-end d-flex">
        <Row id="SinglePageContent" className="flex-grow-1 py-2">
          {children}
        </Row>
      </Container>
      <Row id="SinglePageFooter">
        {location.pathname == "/bio" && profile && (
          <BioTables profile={profile} />
        )}
      </Row>
    </>
  );
}
