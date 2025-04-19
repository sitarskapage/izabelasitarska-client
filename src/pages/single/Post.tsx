import { useParams } from "react-router-dom";
import {
  GeneralSectionSchema,
  ImageRefSchema,
  PostSchema,
  VideoRefSchema,
} from "@jakubkanna/labguy-front-schema";
import HTMLReactParser from "html-react-parser";
import VideoComponent from "../../components/media/Video";
import ImageComponent from "../../components/media/Image";
import Layout from "../../components/layout/Layout";
import { Content } from "@jakubkanna/labguy-front-schema/dist/Post.schema";
import { Col } from "react-bootstrap";
import { useFetchData } from "../../hooks/useFetch";
import NotFoundPage from "../404";

interface Post extends PostSchema {
  general: GeneralSectionSchema;
}

function renderPostContent(content: Content | undefined) {
  if (!content) return;

  return content.map((block, index) => {
    if ("text" in block) {
      // Handle Text block
      return (
        <div key={index} className={`p-3 container`}>
          {HTMLReactParser(block.text as string)}
        </div>
      );
    }

    if ("images" in block) {
      // Handle Image block
      const images = block.images as ImageRefSchema[];
      return images.map((image, i) => (
        <div key={`${index}-${i}`}>
          <ImageComponent imageref={image} className="w-100 h-auto" />
        </div>
      ));
    }

    if ("videos" in block) {
      // Handle Video block
      const videos = block.videos as VideoRefSchema[];
      return videos.map((video, i) => (
        <div key={`${index}-${i}`}>
          <VideoComponent videoref={video} className="w-100 h-auto" />
        </div>
      ));
    }

    return null;
  });
}

export default function Post() {
  const { slug } = useParams();
  const { data } = useFetchData<Post>(`posts/${slug}`);

  if (!data) return <NotFoundPage />;

  const { general, content } = data;

  if (!content) {
    console.warn("Content field is undefined or null.");
    return <p>No content available.</p>;
  }

  return (
    <Layout title={general.title}>
      <Col xs={12} className="d-flex flex-column  h-100 gap-2 mb-3 ">
        {renderPostContent(content)}
      </Col>
    </Layout>
  );
}
