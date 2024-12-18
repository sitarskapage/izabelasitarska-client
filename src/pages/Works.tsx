/** It creates set of flatMap to get all tags from works, then filter them by clicked tag. It could be optimized in the future, if there is a lot of works so fetching tags and filtering works would happen on backend for better performance*/
import { Outlet, useParams } from "react-router-dom";
import {
  GeneralSectionSchema,
  TagSchema,
  UrlSchema,
  WorkSchema,
} from "@jakubkanna/labguy-front-schema";
import Layout from "../components/layout/Layout";
import WorkCard from "../components/WorkCard";
import { MediaRef } from "../utils/helpers";
import { Col, Row } from "react-bootstrap";
import { useState } from "react";
import { motion } from "framer-motion";
import useIsMobile from "../hooks/useIsMobile";
import { useFetchData } from "../hooks/useFetch";
import Model from "../components/media/Model";

export interface Work extends WorkSchema {
  general: GeneralSectionSchema & { tags?: TagSchema[] };
  etag: string;
  media?: MediaRef[];
  urls: UrlSchema[];
}

export default function Works() {
  const { data } = useFetchData<Work[]>("works?unique=true");

  const { slug } = useParams();
  const [activeTag, setActiveTag] = useState<string | null | undefined>(null);
  const isMobile = useIsMobile();

  if (!data) return null;

  // Get unique tags from works
  const tags = Array.from(
    new Set(
      data
        .flatMap((work) => work.general.tags ?? [])
        .map((tag: TagSchema) => tag.title)
    )
  );

  // Filter works by the selected tag
  const filteredWorks = activeTag
    ? data.filter((work) =>
        work.general.tags?.some((tag) => (tag as TagSchema).title === activeTag)
      )
    : data;

  return (
    <>
      {slug ? (
        <Outlet />
      ) : !data ? (
        <p>No works yet.</p>
      ) : (
        <Layout title={"Works"}>
          <Col>
            {/* Tag Filter Buttons */}
            {tags.length > 0 && (
              <Row className="py-3 border-bottom border-dark">
                <div className="d-flex flex-wrap align-items-center gap-2">
                  <span>Display by:</span>
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      // Assign default and active class names dynamically based on the tag's title and active state.
                      // The button with the title "Looking for funding" has "btn-funding" by default,
                      // while all other buttons have "btn-outline-dark" by default.
                      // When a button is clicked (i.e., it becomes active), it gets "btn-dark" applied.
                      className={`btn btn-sm ${
                        tag === activeTag
                          ? "btn-dark" // Active buttons have the "btn-dark" class
                          : tag === "Looking for funding"
                          ? "btn-funding" // Default style for the "Looking for funding" button
                          : "btn-outline-dark" // Default style for other buttons
                      } mx-1`}
                      onClick={() =>
                        setActiveTag(tag === activeTag ? null : tag)
                      }
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </Row>
            )}

            {/* Active Tag Title */}
            <Row className={activeTag ? "py-3 border-bottom border-dark" : ""}>
              <motion.div
                layout
                initial={{ height: 0 }}
                animate={{
                  height: activeTag ? "auto" : 0,
                }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <span className="display-5">Filtered by: {activeTag}</span>
              </motion.div>
            </Row>

            {/* Work Cards */}
            <Row className="position-relative">
              <div
                className="p-0 border-dark bg-black ratio ratio-16x9"
                style={{
                  boxSizing: "border-box",
                  width: isMobile ? "100%" : "33.333%",
                  height: "auto",
                }}
              >
                <Model></Model>{" "}
              </div>

              {filteredWorks.map((item, i) =>
                item.general.published ? (
                  <div
                    key={item.id}
                    className="p-0 border-dark bg-black ratio ratio-16x9"
                    style={{
                      borderRight: i % 3 !== 2 ? "1px solid #ccc" : "none",
                      borderBottom:
                        i < filteredWorks.length - 1
                          ? "1px solid #ccc"
                          : "none",
                      boxSizing: "border-box",
                      width: isMobile ? "100%" : "33.333%",
                      height: "auto",
                    }}
                  >
                    <WorkCard work={item} />
                  </div>
                ) : null
              )}
            </Row>
          </Col>
        </Layout>
      )}
    </>
  );
}
