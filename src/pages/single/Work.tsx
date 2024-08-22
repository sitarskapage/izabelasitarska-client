import { useLoaderData } from "react-router-dom";
import Layout from "../../components/layout/Layout.";
import { Work as WorkSchema } from "../Works";

export default function Work() {
  const data = (useLoaderData() as WorkSchema) || null;

  if (!data) return null;

  const { general } = data;

  return <Layout title={general.title}>{general.title}</Layout>;
}
