import { ReactNode, useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { GeneralContext } from "../../contexts/GeneralContext";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

import { ProfileSchema } from "@jakubkanna/labguy-front-schema";
import { containerTopToBottom } from "../../utils/framer-motion";
import AnimatedTitle from "../AnimatedTitle";

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
      <Helmet>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="author" content={metadata.name} />
      </Helmet>
      <>
        {/* Header */}
        {title && (
          <Row
            id="SinglePageHeader"
            className="border-dark border-bottom py-4 bg-light z-1"
          >
            {header || (
              <h1 className="display-1 fw-normal mb-0">
                <AnimatedTitle title={title} />
              </h1>
            )}
          </Row>
        )}
        <motion.div
          key="footer"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={containerTopToBottom}
          transition={{ duration: 0.5 }}
          className="row flex-grow-1"
        >
          {/* Body */}
          <Col xs={12}>
            <Row id="SinglePageContent" className="h-100">
              {children}
            </Row>
          </Col>

          {/*Footer*/}

          {footer && (
            <Col xs={12} id="SinglePageFooter">
              <Row>{footer}</Row>
            </Col>
          )}
        </motion.div>
      </>
    </>
  );
}
