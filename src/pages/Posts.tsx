import {
  GeneralSectionSchema,
  ImageRefSchema,
  PostSchema,
} from "@jakubkanna/labguy-front-schema";
import { Outlet, useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { isImage } from "../utils/helpers";
import { Link } from "react-router-dom";
import Image from "../components/media/Image";
import Layout from "../components/layout/Layout";
import useIsMobile from "../hooks/useIsMobile";
import { useFetchData } from "../hooks/useFetch";
import { useState } from "react";

export interface Post extends PostSchema {
  general: GeneralSectionSchema;
}

export default function Posts() {
  const { data } = useFetchData<Post[]>("posts");
  const { slug } = useParams();
  const isMobile = useIsMobile();

  const PostItem = ({ post, isLast }: { post: Post; isLast: boolean }) => {
    //
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseOver = () => setIsHovered(true);
    const handleMouseOut = () => setIsHovered(false);

    const arrowStyle = {
      fontSize: isHovered ? "1.5rem" : "1.25rem", // Equivalent to fs-3 and fs-4
      fontWeight: "bold",
    };
    // Find the first image
    const image = post.content
      ?.flatMap((item) => (item.images as ImageRefSchema[]) || [])
      .find((img) => isImage(img));

    return (
      <Link
        to={post.general.slug || "#"}
        className="text-decoration-none"
        key={post.general.slug}
      >
        <Row
          className={`${!isLast ? "border-bottom border-dark" : ""}`}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <Col xs={12} md={9} className="py-3 px-4 position-relative">
            <h2 className="h4">{post.general.title}</h2>
            <small className="font-monospace">{post.general.createdAt}</small>
            <i
              className="bi bi-arrow-up-right position-absolute end-0 bottom-0 pb-1 px-3 font-weight-bold "
              style={arrowStyle}
            ></i>
          </Col>
          <Col
            xs={12}
            md={3}
            className={isMobile ? "p-0" : "border-start border-dark p-0"}
          >
            <div className="ratio ratio-1x1">
              {image && (
                <Image
                  imageref={image}
                  className="img-fluid object-fit-cover"
                />
              )}
            </div>
          </Col>
        </Row>
      </Link>
    );
  };

  const PostsList = () => {
    return (
      <>
        {data?.map((post, index) => {
          const isLast = index === data.length - 1 && !data[0];
          return post.general.published ? (
            <PostItem key={post.general.slug} post={post} isLast={isLast} />
          ) : null;
        })}
      </>
    );
  };

  return slug ? (
    <Outlet />
  ) : (
    <Layout title="Blog">
      <Col>
        {!data || data.length === 0 ? <p>No posts yet.</p> : <PostsList />}
      </Col>
    </Layout>
  );
}
