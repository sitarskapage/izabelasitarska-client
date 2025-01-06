import { useContext } from "react";
import { GeneralContext } from "../../contexts/GeneralContext";
import { Helmet } from "react-helmet";

function Header() {
  const { preferences } = useContext(GeneralContext);
  const lightColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--light-color");

  return (
    <header>
      <Helmet>
        <title>{preferences?.artists_name}</title>
        <meta name="author" content={preferences?.artists_name} />
        <meta name="theme-color" content={lightColor} />
        {/* Favicons and Icons for Different Platforms */}
        <link rel="icon" href={`/favicon/favicon.ico`} type="image/x-icon" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`/favicon/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`/favicon/favicon-16x16.png`}
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`/favicon/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href={`${
            import.meta.env.BASE_URL
          }/favicon/android-chrome-192x192.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href={`${
            import.meta.env.BASE_URL
          }/favicon/android-chrome-512x512.png`}
        />

        {/* Optional: Web App Manifest for Android */}
        <link rel="manifest" href={`/favicon/site.webmanifest`} />
      </Helmet>
    </header>
  );
}

export default Header;
