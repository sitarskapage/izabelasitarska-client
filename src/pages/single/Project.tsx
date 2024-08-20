import { useOutletContext } from "react-router-dom";
import Layout from "../../components/layout/Layout.";

export default function Project() {
  const selected = useOutletContext();

  if (!selected) {
    return;
  }
  return (
    <Layout title={selected.general.title}>{selected.general.title}</Layout>
  );
}
