import { ReactNode, useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { GeneralContext } from "../../contexts/GeneralContext";
import { Helmet } from "react-helmet";

import { ProfileSchema } from "@jakubkanna/labguy-front-schema";

export default function Layout({
  children,
  title,
  description,
  footer,
  header,
}: {
  children: ReactNode;
  title?: string;
  description?: string;
  profile?: ProfileSchema;
  footer?: ReactNode;
  header?: ReactNode;
}) {
  const { preferences } = useContext(GeneralContext);

  const metadata = {
    title: title || preferences?.artists_name || "Untitled",
    description: description,
    name: preferences?.artists_name,
  };

  return (
    <>
      {/* meta */}
      <Helmet>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="author" content={metadata.name} />
      </Helmet>

      {/* Header */}
      {title && (
        <Row
          id="SinglePageHeader"
          className="py-4 z-1"
          style={{ marginBottom: "-1px" }}
        >
          {header || <h1 className="display-1 fw-normal mb-0">{title}</h1>}
        </Row>
      )}

      {/* Body */}
      <Row className=" flex-grow-1">
        <Col xs={12}>
          <Row id="SinglePageContent" className="row flex-grow-1">
            {children}
          </Row>
        </Col>
      </Row>

      {/* Footer */}
      {footer && (
        <Col xs={12} id="SinglePageFooter">
          <Row>{footer}</Row>
        </Col>
      )}
    </>
  );
}
