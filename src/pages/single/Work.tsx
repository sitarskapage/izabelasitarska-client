import { useOutletContext } from "react-router-dom";
import Layout from "../../components/layout/Layout.";
import {
  GeneralSectionSchema,
  WorkSchema,
} from "@jakubkanna/labguy-front-schema";

export default function Work() {
  const selected: WorkSchema = useOutletContext();

  const general = selected.general as GeneralSectionSchema;

  if (!selected) return null;

  return <Layout title={general.title}>{general.title}</Layout>;
}
