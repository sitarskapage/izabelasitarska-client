/** It creates set of flatMap to get all tags from works, then filter them by clicked tag. It could be optimized in the future, if there is a lot of works so fetching tags and filtering works would happen on backend for better performance*/
import { Outlet, useParams, useSearchParams } from "react-router-dom";
import {
  GeneralSectionSchema,
  TagSchema,
  UrlSchema,
  WorkSchema,
} from "@jakubkanna/labguy-front-schema";
import Layout from "../components/layout/Layout";
import WorkCard from "../components/WorkCard";
import { MediaRef } from "../utils/helpers";
import { Col, Container, Row } from "react-bootstrap";
import { ReactNode, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useIsMobile from "../hooks/useIsMobile";
import { useFetchData } from "../hooks/useFetch";
import { Link } from "react-router-dom";

export interface Work extends WorkSchema {
  general: GeneralSectionSchema & { tags?: TagSchema[] };
  etag: string;
  media?: MediaRef[];
  urls: UrlSchema[];
}

export default function Works() {
  const { data } = useFetchData<Work[]>("works?unique=true");
  const [searchParams, setSearchParams] = useSearchParams();
  const { slug } = useParams();

  // Change to array of tags
  const [activeTags, setActiveTags] = useState<string[]>(
    searchParams.get("tags")?.split(",").filter(Boolean) || []
  );

  const isMobile = useIsMobile();

  if (!data) return null;

  // Updated tag selection handler
  const handleTagSelect = (tag: string) => {
    const newTags = activeTags.includes(tag)
      ? activeTags.filter((t) => t !== tag) // Remove tag if already selected
      : [...activeTags, tag]; // Add tag if not selected

    setActiveTags(newTags);

    // Update URL
    if (newTags.length > 0) {
      setSearchParams({ tags: newTags.join(",") });
    } else {
      setSearchParams({});
    }
  };

  // Get unique tags from works
  const tags = Array.from(
    new Set(
      data
        .flatMap((work) => work.general.tags ?? [])
        .map((tag: TagSchema) => tag.title)
    )
  );

  // Updated filtering logic to match ALL selected tags
  const filteredWorks =
    activeTags.length > 0
      ? data.filter((work) =>
          // Check if work has ALL selected tags
          activeTags.every((selectedTag) =>
            work.general.tags?.some(
              (tag) => (tag as TagSchema).title === selectedTag
            )
          )
        )
      : data;

  const Description: React.FC<{ children: ReactNode; title: string }> = ({
    children,
    title,
  }) => {
    return (
      <Container className="border-start border-end border-dark py-3">
        <Row>
          <Col>
            <h1>{title}</h1>
            {children}
          </Col>
        </Row>
      </Container>
    );
  };

  const descriptions = [
    {
      tag: "Fight or Flight",
      title: "Fight or Flight",
      content: (
        <>
          <p>
            Fight or Flight describes the complex survival reaction of living
            organisms, commonly known as adrenaline. The exhibition presents an
            analysis of this process not only from a biological point of view
            but also from an economic and cultural perspective. Installations
            are placed between the walls of the United Climbing space. Although
            minimalist in form, they abound in confrontations with extensive
            visions of the future of humanity, such as those presented by Leszek
            Kołakowski or John Danaher. Created with modern machines such as 3D
            milling and 3D printers, as well as various AI models and
            smartphones, these installations embody the characteristic hope for
            a better tomorrow. What else are the bodies of people playing with
            climbing problems, lying on sun-warmed mats amidst the industrial
            halls of WSK, if not a longed for perfect world? This experiment
            combines two different subcultures without aiming to achieve any
            specific results.
          </p>
          <Link to={"/fight-or-flight"}>Read more</Link>
        </>
      ),
    },
    {
      tag: "Velo-art",
      title: "Velo-art",
      content: (
        <>
          <p>
            The prefix velo has been adopted from the word velocipede. Today it
            is often used as a collective mark of various types of circumstances
            linked to the vehicles with one and more wheels powered by muscles.
            Bicycles started to appear in the history of art a long time ago. We
            can find them in the works of artists such as: Marcel Duchamp
            (Bicycle Wheel), Robert Rauchenberg (Riding Bikes), William De
            Koonig (Woman and Bicycle), Ai Wei Wei (Forever Bicycles), Bas Jan
            Adler (Fall II), Natalia Gonczarova (Cyclist), Guido van der Werve
            (Nummer veertien) and others. Velo-art is about all creative
            activities that use or relate to the world of bicycles. It is above
            all the freedom given by the two wheels. Simplicity. Integration
            with the surrounding space, natural or unnatural, through direct
            experience of speed, distance, adrenaline, movement, effort, new
            places, emotions, people, love to bicycle etc. Simple relation
            between bike, art and human. Therefore it confronts with the world
            of definitions. It’s another description, the presence of which is
            beautiful but doubtfully necessary. It balances on the edge of
            emptiness and excessive limitations. Thus where is the place for
            freedom in the world where the tiniest thing has been defined or on
            the another hand what would a zebra crossing with no straps be? No
            one ever said that art has to challenge the world through
            seriousness. It unfortunately leads to the definition of
            contemporary art; for example – the Bicycle Wheel designer – M.
            Duchamp’s „If I Call It Art, It’s Art”. Does it seem to keep us in a
            single place for years now or it allows us to breath the way we want
            to? How can you evolve something that is everything?
          </p>
          <Link to={"/velo-art"}>Read more</Link>
        </>
      ),
    },
  ];

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
                  <span className="font-monospace">Display by:</span>
                  {tags.map(
                    (tag, index) =>
                      tag && (
                        <button
                          key={index}
                          className={`btn btn-sm ${
                            activeTags.includes(tag)
                              ? "btn-dark fs-5"
                              : tag === "Looking for funding"
                              ? "btn-funding"
                              : tag === "Fight or Flight"
                              ? "btn-outline-dark fs-5"
                              : tag === "Velo-art"
                              ? "btn-outline-dark fs-5"
                              : "btn-outline-dark"
                          } mx-1`}
                          onClick={() => handleTagSelect(tag)}
                        >
                          {tag}
                        </button>
                      )
                  )}
                </div>
              </Row>
            )}

            {/* Active Tag Title */}
            <Row>
              <AnimatePresence mode="wait">
                {descriptions
                  .filter((desc) => activeTags.includes(desc.tag))
                  .map((desc) => (
                    <motion.div
                      key={desc.tag}
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.5 }}
                      className="overflow-hidden"
                    >
                      <Description title={desc.title}>
                        {desc.content}
                      </Description>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </Row>

            {/* Work Cards */}
            <Row className="position-relative">
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
