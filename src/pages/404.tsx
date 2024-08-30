import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout.";

export default function NotFoundPage() {
  return (
    <>
      <Layout title="404 Not Found">
        <p>Page not found :(</p>
        <Link to={"/"}>Home</Link>
      </Layout>
    </>
  );
}
