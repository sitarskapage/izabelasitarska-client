import {
  GeneralSectionSchema,
  ImageRefSchema,
  ProjectSchema,
  UrlSchema,
} from "@jakubkanna/labguy-front-schema";
import { Work } from "./Works";
import { MediaRef } from "../utils/helpers";

export interface Project extends ProjectSchema {
  general: GeneralSectionSchema;
  media: MediaRef[];
  urls: UrlSchema[];
  works: Work[];
  cover: ImageRefSchema;
}
