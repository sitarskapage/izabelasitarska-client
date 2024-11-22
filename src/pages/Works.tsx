/** It creates set of flatMap to get all tags from works, then filter them by clicked tag. It could be optimized in the future, if there is a lot of works so fetching tags and filtering works would happen on backend for better performance*/
import { Outlet, useLoaderData, useParams } from "react-router-dom";
import {
  GeneralSectionSchema,
  TagSchema,
  WorkSchema,
} from "@jakubkanna/labguy-front-schema";
import Layout from "../components/layout/Layout.";
import WorkCard from "../components/WorkCard";
import { isMobile, MediaRef } from "../utils/helpers";
import { Col, Row } from "react-bootstrap";
import { useState } from "react";

export interface Work extends WorkSchema {
  general: GeneralSectionSchema & { tags?: TagSchema[] };
  etag: string;
  media?: MediaRef[];
}

export default function Works() {
  const works = (useLoaderData() as Work[]) || null;
  const { slug } = useParams();
  const [activeTag, setActiveTag] = useState<string | null | undefined>(null);

  // Get unique tags from works
  const tags = Array.from(
    new Set(
      works.flatMap((work) => work.general.tags ?? []) // Flatten all tags and remove duplicates
    )
  );

  // Filter works by the selected tag
  const filteredWorks = activeTag
    ? works.filter((work) =>
        work.general.tags?.some((tag) => (tag as TagSchema).title === activeTag)
      )
    : works;

  return (
    <>
      {slug ? (
        <Outlet />
      ) : !works ? (
        <p>No works yet.</p>
      ) : (
        <Layout title={"Works"} fluid>
          <Col className="p-0">
            {/* Tag Filter Buttons */}
            {tags.length > 0 && (
              <Row className="py-3 border-bottom border-dark">
                <div className="d-flex flex-wrap align-items-center">
                  <span>Display by:</span>
                  {tags.map((tag) => (
                    <button
                      key={tag.title}
                      // Assign default and active class names dynamically based on the tag's title and active state.
                      // The button with the title "Looking for funding" has "btn-funding" by default,
                      // while all other buttons have "btn-outline-dark" by default.
                      // When a button is clicked (i.e., it becomes active), it gets "btn-dark" applied.
                      className={`btn btn-sm ${
                        tag.title === activeTag
                          ? "btn-dark" // Active buttons have the "btn-dark" class
                          : tag.title === "Looking for funding"
                            ? "btn-funding" // Default style for the "Looking for funding" button
                            : "btn-outline-dark" // Default style for other buttons
                      } mx-1`}
                      onClick={() =>
                        setActiveTag(tag.title === activeTag ? null : tag.title)
                      }
                    >
                      {tag.title}
                    </button>
                  ))}
                </div>
              </Row>
            )}

            {/* Active Tag Title */}
            {activeTag && (
              <Row className="py-3 border-bottom border-dark">
                <span className="display-5">Filtered by: {activeTag}</span>
              </Row>
            )}

            {/* Work Cards */}
            <Row className="">
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
                      width: isMobile() ? "100%" : "33.333%",
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
