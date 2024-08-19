import { ProfileSchema } from "@jakubkanna/labguy-front-schema";
import Layout from "../components/layout/Layout.";
import { useData } from "../utils/useData";

export default function Bio() {
  const data = useData<ProfileSchema>("/posts/");

  if (!data) return;

  return (
    <Layout title="Posts">
      <></>
    </Layout>
  );
}
