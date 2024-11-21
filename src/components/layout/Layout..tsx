import { ReactNode, useContext } from "react";
import { Container, Row } from "react-bootstrap";
import { GeneralContext } from "../../contexts/GeneralContext";
import { Helmet } from "react-helmet";

import { ProfileSchema } from "@jakubkanna/labguy-front-schema";

export default function Layout({
  children,
  title,
  description,
  footer,
  header,
  fluid,
}: {
  children: ReactNode;
  title?: string;
  description?: string;
  profile?: ProfileSchema;
  footer?: ReactNode;
  header?: ReactNode;
  fluid?: boolean;
}) {
  const { preferences } = useContext(GeneralContext);

  const metadata = {
    title: title || preferences?.artists_name || "Untitled",
    description: description,
    name: preferences?.artists_name,
  };

  const containerClass =
    "flex-grow-1 border-dark border-start border-end d-flex py-2";
  const containerClassFludid = "flex-grow-1 px-0 d-flex";
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="author" content={metadata.name} />
      </Helmet>
      <>
        <Row id="SinglePageHeader" className="border-dark border-bottom">
          {header || (title && <h1 className="display-1">{title}</h1>)}
        </Row>
        <Container
          fluid={fluid}
          className={fluid ? containerClassFludid : containerClass}
        >
          <Row id="SinglePageContent" className="flex-grow-1">
            {children}
          </Row>
        </Container>
        <Row id="SinglePageFooter">{footer}</Row>
      </>
    </>
  );
}
