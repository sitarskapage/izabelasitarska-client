import {
  GeneralSectionSchema,
  TagSchema,
  UrlSchema,
  WorkSchema,
} from "@jakubkanna/labguy-front-schema";

export interface Work extends WorkSchema {
  general: GeneralSectionSchema & { tags?: TagSchema[] };
  etag: string;
  media?: MediaRef[];
  urls: UrlSchema[];
}
