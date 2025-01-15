import { useContext, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { GeneralContext } from "../../contexts/GeneralContext";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import useIsMobile from "../../hooks/useIsMobile";

export default function Header({
  setHeaderHeight,
}: {
  setHeaderHeight: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { preferences } = useContext(GeneralContext);
  const artists_name = preferences ? preferences.artists_name : "";
  const headerRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();

  // Measure content height when it is rendered
  useEffect(() => {
    if (headerRef.current) {
      const height = headerRef.current.clientHeight;
      if (height) setHeaderHeight(height);
    }
  }, [setHeaderHeight, isMobile]);

  return (
    <header
      className="container-fluid position-absolute top-0 start-0"
      ref={headerRef}
    >
      <Helmet>
        <title>{preferences?.artists_name}</title>
        <meta name="author" content={preferences?.artists_name} />

        {/* Favicons and Icons for Different Platforms */}
        <link rel="icon" href="/favicon/favicon.ico" type="image/x-icon" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicon/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/favicon/android-chrome-512x512.png"
        />

        {/* Optional: Web App Manifest for Android */}
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </Helmet>
      <Navbar expand="lg">
        <Container>
          <Link to="/">
            <Navbar.Brand>{artists_name}</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto gap-2">
              <Link to="bio">Bio</Link>
              <Link to="projects">Projects</Link>
              <Link to="works">Works</Link>
              <Link to="contact">Contact</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
