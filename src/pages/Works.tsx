import {
  GeneralSectionSchema,
  WorkSchema,
} from "@jakubkanna/labguy-front-schema";
import Layout from "../components/layout/Layout.";
import { useData } from "../utils/useData";
import Card from "../components/Card";

export default function Work() {
  const data = useData<WorkSchema[]>("/works/");

  if (!data) return;

  return (
    <Layout title="Works">
      {data.map((work) => {
        return (
          <Card
            general={work.general as GeneralSectionSchema}
            image={undefined}
          ></Card>
        );
      })}
    </Layout>
  );
}
