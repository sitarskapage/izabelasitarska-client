import { useContext, useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { GeneralContext } from "../../contexts/GeneralContext";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { artists_name } from "../../utils/helpers";
import useIsMobile from "../../hooks/useIsMobile";
import { Image } from "react-bootstrap";

export default function Header() {
  const { preferences } = useContext(GeneralContext);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("MAIL");
  const isMobile = useIsMobile();

  const MarqueeText = () => {
    const textRef = useRef<HTMLDivElement | null>(null);
    const [textWidth, setTextWidth] = useState(0);

    useEffect(() => {
      if (textRef.current) {
        setTextWidth(textRef.current.scrollWidth);
      }
    }, []);

    const marqueeWidth = 70;

    return (
      <div
        style={{
          width: marqueeWidth + "px",
          overflow: "hidden",
          whiteSpace: "nowrap",
          position: "relative",
        }}
      >
        <motion.div
          ref={textRef}
          initial={{ x: marqueeWidth * 1.1 + "px" }}
          animate={{ x: `-${textWidth}px` }} // Move by actual content width
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          style={{ display: "inline-block" }}
        >
          <span>
            {currentYear} {artists_name}
          </span>
        </motion.div>
      </div>
    );
  };

  const change = () => {
    setEmail("sitarskapage@gmail.com");
  };

  return (
    <header
      className="container-fluid position-fixed bottom-0 start-0 bg-iza"
      ref={headerRef}
      style={{ zIndex: 1000 }}
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

        {/* Open Graph Meta Tags for Social Media */}
        <meta property="og:title" content={preferences?.artists_name} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="/favicon/android-chrome-512x512.png"
        />
        <meta property="og:url" content={window.location.href} />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={preferences?.artists_name} />
        <meta
          name="twitter:image"
          content="/favicon/android-chrome-512x512.png"
        />
      </Helmet>

      <Navbar expand="lg" className="p-1" style={{ fontSize: "14.5px" }}>
        <Container className={isMobile ? "py-2" : ""}>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="border-0"
          />
          <Navbar.Collapse id="basic-navbar-nav" className="w-100">
            <Nav
              id="Menu"
              className={
                "w-100 d-flex align-items-center justify-content-between" +
                (isMobile ? " py-3 fs-1" : "")
              }
            >
              <Image
                src="/favicon/android-chrome-512x512.png"
                alt="Logo"
                width={isMobile ? 50 : 25}
                className="py-1"
              />
              <div
                className={
                  "d-flex gap-3 w-100 flex-wrap justify-content-center " +
                  (isMobile ? "py-5" : "")
                }
              >
                <div id="Navigation" className="ps-2 d-flex gap-2">
                  <Link to="/">Home</Link>
                  <Link to="bio">Bio</Link>
                </div>
                <div id="Content" className="ps-2 d-flex gap-2">
                  <Link to="art">Art</Link>
                  <Link to="edu">Education</Link>
                </div>
                <div id="Links">
                  <div id="Contact" className="ps-2 d-flex gap-2">
                    <a className="link" onClick={change}>
                      {email}
                    </a>
                    <a
                      href="https://www.instagram.com/izabela_sitarska_fashion_dog/"
                      target="_blank"
                    >
                      IG
                    </a>
                  </div>
                </div>
              </div>
              <div id="Copyrights">
                <small className="d-flex gap-1">
                  <span>© </span>
                  <MarqueeText />
                </small>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
