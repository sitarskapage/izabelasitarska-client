import { useContext, useState } from "react";
import {
  Navbar,
  Collapse,
  Button,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  TooltipProps,
  Container,
} from "react-bootstrap";
import { GeneralContext } from "../../contexts/GeneralContext";
import { Link } from "react-router-dom";

export default function Footer() {
  const { preferences } = useContext(GeneralContext);
  const artists_name = preferences ? preferences.artists_name : "";
  const currentYear = new Date().getFullYear();

  // State to control the collapse
  const [open, setOpen] = useState(false);

  const menuItems = [
    { label: "Bio", path: "bio" },
    { label: "Blog", path: "blog" },
    { label: "Works", path: "works" },
    { label: "Contact", path: "contact" },
  ];

  const renderTooltip = (props: TooltipProps) => (
    <Tooltip id="button-tooltip" {...props}>
      Homepage
    </Tooltip>
  );
  const renderTooltip2 = (props: TooltipProps) => (
    <Tooltip id="button-tooltip" {...props}>
      Menu
    </Tooltip>
  );

  return (
    <footer className="container-fluid position-fixed bottom-0 start-0 bg-kanna w-100 border-top border-dark mh-100 z-3">
      <nav className="d-flex justify-content-between align-items-center">
        <OverlayTrigger
          overlay={renderTooltip}
          placement="right"
          delay={{ show: 1000, hide: 400 }}
        >
          <Navbar.Brand className="text-uppercase">
            <Link to={"/"}>{artists_name}</Link>
          </Navbar.Brand>
        </OverlayTrigger>
        <OverlayTrigger
          overlay={renderTooltip2}
          placement="top"
          delay={{ show: 1000, hide: 10 }}
        >
          <Button
            onClick={() => setOpen(!open)}
            aria-controls="CollapseMenu"
            aria-expanded={open}
            className="p-0 flex-grow-1 d-flex justify-content-end"
            variant="link"
          >
            <i className="bi bi-list fs-2 text-dark"></i>
          </Button>
        </OverlayTrigger>
      </nav>

      <Collapse in={open} className="">
        {/* border-top border-dark */}
        <Container fluid id="CollapseMenu" className="px-0 ">
          <Row>
            {menuItems.map((item, index) => (
              <Col
                key={index}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className="py-5  text-center"
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
            <Col className="font-monospace border-top border-dark d-flex justify-content-end">
              <small>
                © {currentYear} {artists_name}
              </small>
            </Col>
          </Row>
        </Container>
      </Collapse>
    </footer>
  );
}
