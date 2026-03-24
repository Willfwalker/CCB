import { client, isConfigured } from "@/sanity/client";
import { doctrinePageQuery } from "@/sanity/queries";
import DoctrinePageClient from "./DoctrinePageClient";

export default async function DoctrinePage() {
  let data = null;

  if (isConfigured) {
    data = await client
      .fetch(doctrinePageQuery, {}, { next: { revalidate: 60 } })
      .catch(() => null);
  }

  const pressResources = data?.pressResources?.map(
    (r: { resourceType: string; title: string; description: string; url: string; color: string }) => ({
      type: r.resourceType,
      title: r.title,
      description: r.description,
      url: r.url,
      color: r.color,
    })
  );

  return (
    <DoctrinePageClient
      doctrines={data?.doctrines}
      pressResources={pressResources}
    />
  );
}
