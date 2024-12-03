import { useContext, useEffect, useRef, useState } from "react";
import { Navbar, Button, Row, Col } from "react-bootstrap";
import { GeneralContext } from "../../contexts/GeneralContext";
import { Link } from "react-router-dom";
import useIsMobile from "../../hooks/useIsMobile";
import { ScrollContext } from "../../contexts/ScrollContext";
import { AnimatePresence, motion } from "framer-motion";

export default function Footer({
  setFooterHeight,
}: {
  setFooterHeight: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { preferences } = useContext(GeneralContext);
  const artists_name = preferences ? preferences.artists_name : "";
  const currentYear = new Date().getFullYear();
  const isMobile = useIsMobile();
  const footerRef = useRef<HTMLDivElement | null>(null);
  const isBottom = useContext(ScrollContext);
  const [open, setOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const menuItems = [
    { label: "Bio", path: "bio" },
    { label: "Blog", path: "blog" },
    { label: "Works", path: "works" },
    { label: "Contact", path: "contact" },
  ];

  useEffect(() => {
    if (footerRef.current) {
      const height = footerRef.current.clientHeight;
      if (height) setFooterHeight(height);
    }
  }, [setFooterHeight, isMobile]);

  useEffect(() => {
    if (isBottom) setOpen(true);
    if (!isBottom) setOpen(false);
  }, [isBottom]);

  // Measure content height when it is rendered
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [open]);

  return (
    <footer
      className={`container-fluid position-fixed bottom-0 start-0 bg-kanna w-100 border-top border-dark mh-100 z-3 overflow-auto ${
        isMobile && "py-2"
      }`}
      ref={footerRef}
    >
      {/* HIDDEN */}
      <nav className={"d-flex justify-content-between align-items-center"}>
        <Navbar.Brand className="text-uppercase">
          <Link to={"/"} onClick={() => setOpen(false)}>
            {artists_name}
          </Link>
        </Navbar.Brand>

        <Button
          onClick={() => setOpen(!open)}
          className="p-0 flex-grow-1 d-flex justify-content-end"
          variant="link"
        >
          <i className="bi bi-list fs-2 text-dark"></i>
        </Button>
      </nav>

      {/* VISIBLE */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: contentHeight || "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.33 }}
            ref={contentRef}
          >
            <Row>
              {menuItems.map((item, index) => (
                <Col
                  key={index}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  className="py-5 text-center"
                >
                  <Link
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className="fs-3"
                  >
                    {item.label}
                  </Link>
                </Col>
              ))}
            </Row>
            <Row>
              <Col className="font-monospace pt-2 border-dark d-flex justify-content-end">
                <small>
                  © {currentYear} {artists_name}
                </small>
              </Col>
            </Row>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
