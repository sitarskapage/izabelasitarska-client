import { useState, useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { useData } from "../utils/useData";
import {
  GeneralSectionSchema,
  ImageRefSchema,
  WorkSchema,
} from "@jakubkanna/labguy-front-schema";
import Layout from "../components/layout/Layout.";
import WorkCard from "../components/WorkCard";
import { Col } from "react-bootstrap";

export interface Work extends WorkSchema {
  general: GeneralSectionSchema;
  images: ImageRefSchema[];
}

export default function Works() {
  const [selected, setSelected] = useState<Work | null>(null);
  const data = useData<Work[]>("/works/");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/works/") {
      setSelected(null);
    }
  }, [location]);

  if (!data) return null;

  return (
    <>
      {!selected && (
        <Layout title={"Works"}>
          <Col xs={12} md={6} lg={3}>
            {data.map((item, i) => (
              <WorkCard
                work={item}
                image={item.images?.[0]}
                key={i}
                onClick={() => setSelected(item)}
              />
            ))}
          </Col>
        </Layout>
      )}
      <Outlet context={selected} />
    </>
  );
}
