import { client, isConfigured } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import {
  homePageQuery,
  announcementsQuery,
  faqQuery,
  coreValuesQuery,
  liturgicalStationsQuery,
} from "@/sanity/queries";
import HomeClient from "./HomeClient";

export default async function Home() {
  let homePage = null;
  let announcements = null;
  let faqItems = null;
  let coreValues = null;
  let liturgicalStations = null;

  if (isConfigured) {
    [homePage, announcements, faqItems, coreValues, liturgicalStations] =
      await Promise.all([
        client.fetch(homePageQuery, {}, { next: { revalidate: 60 } }).catch(() => null),
        client.fetch(announcementsQuery, {}, { next: { revalidate: 60 } }).catch(() => null),
        client.fetch(faqQuery, {}, { next: { revalidate: 60 } }).catch(() => null),
        client.fetch(coreValuesQuery, {}, { next: { revalidate: 60 } }).catch(() => null),
        client.fetch(liturgicalStationsQuery, {}, { next: { revalidate: 60 } }).catch(() => null),
      ]);
  }

  // Transform Sanity image references to URLs
  const heroImageUrl = homePage?.heroImage
    ? urlFor(homePage.heroImage).width(1920).quality(85).url()
    : undefined;

  const familyImageUrl = homePage?.familyImage
    ? urlFor(homePage.familyImage).width(1920).quality(85).url()
    : undefined;

  // Transform core values to include sequential IDs
  const transformedCoreValues = coreValues?.length
    ? coreValues.map((v: Record<string, unknown>, i: number) => ({
        id: i + 1,
        title: v.title as string,
        subtitle: v.subtitle as string,
        colorVar: v.colorVar as string,
        description: v.description as string,
        extendedDetails: v.extendedDetails as string,
        verses: (v.verses as Array<{ reference: string; text: string }>) || [],
      }))
    : undefined;

  // Transform liturgical stations to include sequential IDs
  const transformedStations = liturgicalStations?.length
    ? liturgicalStations.map((s: Record<string, unknown>, i: number) => ({
        id: i + 1,
        title: s.title as string,
        subtitle: s.subtitle as string,
        description: s.description as string,
        scriptureRef: s.scriptureRef as string | undefined,
        extendedDetails: s.extendedDetails as string | undefined,
        extendedVerses: s.extendedVerses as string[] | undefined,
      }))
    : undefined;

  return (
    <HomeClient
      heroImageUrl={heroImageUrl}
      heroScriptureRef={homePage?.heroScriptureRef}
      heroScriptureText={homePage?.heroScriptureText}
      announcements={announcements}
      faqItems={faqItems}
      familyQuote={homePage?.familyQuote}
      familyImageUrl={familyImageUrl}
      familyTitle={homePage?.familyTitle}
      familyBody={homePage?.familyBody}
      youtubeVideoUrl={homePage?.youtubeVideoUrl}
      coreValues={transformedCoreValues}
      liturgicalStations={transformedStations}
    />
  );
}
