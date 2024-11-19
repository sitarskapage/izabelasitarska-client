import { Outlet, useLoaderData, useParams } from "react-router-dom";
import {
  GeneralSectionSchema,
  WorkSchema,
} from "@jakubkanna/labguy-front-schema";
import Layout from "../components/layout/Layout.";
import WorkCard from "../components/WorkCard";
import { isMobile, MediaRef } from "../utils/helpers";
import { Col, Row } from "react-bootstrap";

export interface Work extends WorkSchema {
  general: GeneralSectionSchema;
  media?: MediaRef[];
}

export default function Works() {
  const data = (useLoaderData() as Work[]) || null;
  const { slug } = useParams();

  if (!data) return null;

  return (
    <>
      {slug ? (
        <Outlet />
      ) : (
        <Layout title={"Works"}>
          <Col className="p-0">
            <div className="p-0 d-flex w-100 flex-wrap">
              {data.map((item, i) =>
                item.general.published ? (
                  <div
                    className="p-0 border-dark bg-black ratio ratio-16x9 "
                    style={{
                      // Apply border-right to all columns except the last one
                      borderRight: i % 3 !== 2 ? "1px solid #ccc" : "none",
                      borderBottom:
                        i < data.length - 1 ? "1px solid #ccc" : "none",
                      boxSizing: "border-box",
                      width: isMobile() ? "100%" : "33.333%",
                      height: "auto",
                      //max width 50 on bootstrap breakpoint 'md'
                      //max width 100 on bootstrap breakpoint 'xs'
                    }}
                  >
                    <WorkCard work={item} />
                  </div>
                ) : null
              )}
            </div>
          </Col>
        </Layout>
      )}
    </>
  );
}
