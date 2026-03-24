import { createClient } from "next-sanity";
import { sanityConfig } from "./config";

const isConfigured = sanityConfig.projectId && sanityConfig.projectId !== "REPLACE_ME";

export const client = isConfigured
  ? createClient(sanityConfig)
  : createClient({ ...sanityConfig, projectId: "placeholder" });

export { isConfigured };
