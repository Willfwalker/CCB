import { client, isConfigured } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { visitPageQuery } from "@/sanity/queries";
import VisitPageClient from "./VisitPageClient";

export default async function VisitPage() {
  let data = null;

  if (isConfigured) {
    data = await client
      .fetch(visitPageQuery, {}, { next: { revalidate: 60 } })
      .catch(() => null);
  }

  const sidebarImageUrl = data?.sidebarImage
    ? urlFor(data.sidebarImage).width(800).quality(85).url()
    : undefined;

  return (
    <VisitPageClient
      serviceAddress={data?.serviceAddress}
      serviceTimes={data?.serviceTimes}
      nurseryInfo={data?.nurseryInfo}
      bulletinLink={data?.bulletinLink}
      sidebarImageUrl={sidebarImageUrl}
      whatToExpect={data?.whatToExpect}
    />
  );
}
