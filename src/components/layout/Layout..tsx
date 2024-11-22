import { ReactNode, useContext } from "react";
import { Container, Row } from "react-bootstrap";
import { GeneralContext } from "../../contexts/GeneralContext";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

import { ProfileSchema } from "@jakubkanna/labguy-front-schema";
import { container } from "../../utils/framer-motion";
import AnimatedTitle from "../AnimatedTitle";

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
  const containerClassFluid = "flex-grow-1 d-flex";

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

        {/* Body */}
        <Container
          fluid={fluid}
          className={fluid ? containerClassFluid : containerClass}
        >
          <motion.div
            key="content"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={container}
            transition={{ duration: 0.5 }}
            className="flex-grow-1"
          >
            <Row id="SinglePageContent" className="h-100">
              {children}
            </Row>
          </motion.div>
        </Container>

        {/*Footer*/}
        <motion.div
          key="footer"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={container}
          transition={{ duration: 0.5 }}
        >
          <Row id="SinglePageFooter">{footer}</Row>
        </motion.div>
      </>
    </>
  );
}
