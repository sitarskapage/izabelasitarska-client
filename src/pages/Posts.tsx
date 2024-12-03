import {
  GeneralSectionSchema,
  ImageRefSchema,
  PostSchema,
} from "@jakubkanna/labguy-front-schema";
import { Outlet, useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { isImage } from "../utils/helpers";
import { Link } from "react-router-dom";
import Image from "../components/Image";
import Layout from "../components/layout/Layout";
import { useState } from "react";
import useIsMobile from "../hooks/useIsMobile";
import { useFetchData } from "../hooks/useFetch";

export interface Post extends PostSchema {
  general: GeneralSectionSchema;
}

export default function Posts() {
  const { data } = useFetchData<Post[]>("posts");
  const { slug } = useParams();
  const [fontSizeClass, setFontSizeClass] = useState("fs-4");
  const isMobile = useIsMobile();

  const PostItem = ({ post, isLast }: { post: Post; isLast: boolean }) => {
    // Find the first image
    const image = post.content
      ?.flatMap((item) => (item.images as ImageRefSchema[]) || [])
      .find((img) => isImage(img));

    return (
      <Col key={post.general.slug} className="mb-4">
        <Link to={post.general.slug || "#"} className="text-decoration-none">
          <Row
            className={` ${!isLast ? "border-bottom border-dark" : ""}`}
            onMouseOver={() => setFontSizeClass("fs-3")}
            onMouseOut={() => setFontSizeClass("fs-4")}
          >
            <Col xs={12} md={9} className="py-3 px-4 position-relative">
              <h2 className="h4">{post.general.title}</h2>
              <small className="font-monospace">{post.general.createdAt}</small>
              <i
                className={`bi bi-arrow-up-right position-absolute end-0 bottom-0 pb-1 px-3 font-weight-bold ${fontSizeClass}`}
              ></i>
            </Col>
            <Col
              xs={12}
              md={3}
              className={isMobile ? "p-0" : "border-start border-dark p-0"}
            >
              {image && <Image imageref={image} />}
            </Col>
          </Row>
        </Link>
      </Col>
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
      {!data || data.length === 0 ? <p>No posts yet.</p> : <PostsList />}
    </Layout>
  );
}
