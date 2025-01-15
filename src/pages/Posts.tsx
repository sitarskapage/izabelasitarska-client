import {
  GeneralSectionSchema,
  ImageRefSchema,
  PostSchema,
} from "@jakubkanna/labguy-front-schema";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import { isImage } from "../utils/helpers";
import { Link } from "react-router-dom";
import Image from "../components/media/Image";
import Layout from "../components/layout/Layout";
import { useFetchData } from "../hooks/useFetch";
import { useState } from "react";
import { ArrowUpRight, Bell } from "react-bootstrap-icons";

export interface Post extends PostSchema {
  general: GeneralSectionSchema;
}

export default function Posts() {
  const { data } = useFetchData<Post[]>("posts");
  const { slug } = useParams();
  // const isMobile = useIsMobile();
  const navigate = useNavigate();
  // const [mobile] = useState(isMobile);

  const PostItem = ({ post }: { post: Post; isLast: boolean }) => {
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
        className="row text-decoration-none border-top border-dark"
      >
        <Col
          xs={12}
          md={9}
          className="py-3 px-4 position-relative"
          key={post.general.slug}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <h2 className="h4">{post.general.title}</h2>
          <small className="font-monospace">{post.general.createdAt}</small>
          <ArrowUpRight
            className="position-absolute end-0 bottom-0 pb-1 px-3 font-weight-bold "
            style={arrowStyle}
          ></ArrowUpRight>
        </Col>
        <Col xs={12} md={3} className={"border-start border-dark p-0"}>
          <div className="ratio ratio-1x1">
            {image && (
              <Image imageref={image} className="img-fluid object-fit-cover" />
            )}
          </div>
        </Col>
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

  const navigateToNotifications = () => {
    navigate("/notifications");
  };

  return slug ? (
    <Outlet />
  ) : (
    <Layout title="Blog">
      <Col xs={12}>
        <Row className="py-3">
          <Col>
            <Button variant="outline-dark" onClick={navigateToNotifications}>
              Get notifications <Bell />
            </Button>
          </Col>
        </Row>
        {!data || data.length === 0 ? <p>No posts yet.</p> : <PostsList />}
      </Col>
    </Layout>
  );
}
