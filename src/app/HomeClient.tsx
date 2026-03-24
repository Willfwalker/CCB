"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import LiturgicalTimeline from "@/components/LiturgicalTimeline";
import CoreValuesScroller from "@/components/CoreValuesScroller";
import FamilySection from "@/components/FamilySection";
import FAQAccordion from "@/components/FAQAccordion";
import TimelineItem from "@/components/TimelineItem";

const DEFAULT_ANNOUNCEMENTS = [
  {
    date: "Mar 7",
    title: "Women\u2019s Spring Brunch",
    description:
      "Mark your calendars for our annual brunch, happening Saturday, March 7th, from 9\u201311:30 am. Ladies in high school are encouraged to attend as well! The theme is spiritual friendship, with a focus on the \u201cone another\u201d commands of Scripture.",
    rsvpLink: "https://bit.ly/WomensBrunch26CCB",
  },
  {
    date: "Mar 8",
    title: "Twentysomethings Supper",
    description:
      "Pastor Nate is hosting another monthly get-together for twentysomethings\u2014single, married, kids, no kids, doesn\u2019t matter. Bring friends! A casual time of sharing a meal, hanging out, and discussing theology. March 8th from 3\u20136 pm.",
    rsvpLink: "https://bit.ly/TSSMarch2026",
  },
  {
    date: "Mar 14",
    title: "Peacemaking Mini-Conference",
    description:
      "Join us Saturday, March 14, from 9 am\u201312:30 pm for an in-house conference on godly conflict resolution. Core principles and practical strategies for more peaceable relationships. Pastors Nate and Matt will each deliver a talk, followed by interactive sessions.",
    rsvpLink: "https://bit.ly/CCBpeacemaking",
  },
  {
    date: "Mar 20",
    title: "TCS Benefit Gala",
    description:
      "You are invited to attend the upcoming gala for our church\u2019s school, Trinity Classical School. All funds raised will go toward the Tuition Assistance Fund.",
    rsvpLink: "https://bit.ly/TCSgala",
  },
  {
    date: "Sundays thru Mar 29",
    title: "Membership Class",
    description:
      "An 8-week series of classes designed to prepare you for membership in our church. Six classes on core theological distinctives of the Reformed tradition, and two on distinctives of our church. Sundays from 1\u20132 pm in the Fellowship Hall.",
    rsvpLink: "https://bit.ly/CCBmembership26",
  },
  {
    date: "May 15\u201317",
    title: "Men\u2019s Retreat",
    description:
      "Men, save the date for our upcoming retreat on the Camp Firwood grounds. More details soon to come.",
  },
  {
    date: "Now thru June",
    title: "Home Fellowships",
    description:
      "We are continuing to facilitate gathering in each others\u2019 homes through Home Fellowships. A great way to get to know others in our church, especially if you are newer to the community.",
    rsvpLink: "https://bit.ly/HomeFellowships26",
  },
];

const DEFAULT_FAQ_ITEMS = [
  {
    question: "What do we believe?",
    answer:
      "We hold to the historic Christian faith as summarized in the Apostles' and Nicene Creeds. We believe in the authority of Scripture, the sovereignty of God, and salvation by grace alone through faith alone in Christ alone.",
  },
  {
    question: "What is our worship like?",
    answer:
      "Our worship is reverent and liturgical, centered on the preaching of God's Word, the singing of psalms and hymns, the prayers of the people, and the regular celebration of the Lord's Supper.",
  },
  {
    question: "When do we meet?",
    answer:
      "We gather every Lord's Day at 10:00 AM for morning worship. We also have midweek fellowship and prayer meetings on Wednesday evenings at 7:00 PM.",
  },
  {
    question: "How can I get involved?",
    answer:
      "The best way to get started is to join us on a Sunday morning. After the service, we'd love to meet you and help you find ways to connect — whether through a small group, serving, or one of our ministries.",
  },
];

export interface HomeClientProps {
  heroImageUrl?: string;
  heroScriptureRef?: string;
  heroScriptureText?: string;
  announcements?: { date: string; title: string; description: string; rsvpLink?: string }[];
  faqItems?: { question: string; answer: string }[];
  familyQuote?: string;
  familyImageUrl?: string;
  familyTitle?: string;
  familyBody?: string;
  youtubeVideoUrl?: string;
  coreValues?: Array<{
    id: number;
    title: string;
    subtitle: string;
    colorVar: string;
    description: string;
    extendedDetails: string;
    verses: { reference: string; text: string }[];
  }>;
  liturgicalStations?: Array<{
    id: number;
    title: string;
    subtitle: string;
    description: string;
    scriptureRef?: string;
    extendedDetails?: string;
    extendedVerses?: string[];
  }>;
}

export default function HomeClient({
  heroImageUrl,
  heroScriptureRef,
  heroScriptureText,
  announcements,
  faqItems,
  familyQuote,
  familyImageUrl,
  familyTitle,
  familyBody,
  youtubeVideoUrl,
  coreValues,
  liturgicalStations,
}: HomeClientProps) {
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const displayAnnouncements = announcements && announcements.length > 0 ? announcements : DEFAULT_ANNOUNCEMENTS;
  const displayFaqItems = faqItems && faqItems.length > 0 ? faqItems : DEFAULT_FAQ_ITEMS;
  const displayHeroImage = heroImageUrl || (process.env.NEXT_PUBLIC_HERO_MODE === "teaching" ? "/dad_teaching.png" : "/church_building.png");
  const displayScriptureRef = heroScriptureRef || "John 6:37";
  const displayScriptureText = heroScriptureText || "\u201cAll that the Father gives me will come to me, and whoever comes to me I will never cast out.\u201d";
  const displayVideoUrl = youtubeVideoUrl || "https://www.youtube.com/embed/BBEQdFyD_SY";

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header variant="transparent" />

      {/* ═══════════════ Hero / CTA ═══════════════ */}
      <section className="relative h-screen min-h-[540px] overflow-hidden">
        <Image
          src={displayHeroImage}
          alt="Pastor teaching the congregation bathed in golden light"
          fill
          className="object-cover object-[center_28%]"
          priority
          quality={85}
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <div
            className="w-8 h-px bg-white/35 mb-5 animate-fade-in"
            style={{ animationDelay: "0.3s", opacity: 0 }}
          />
          <p
            className="font-subheading-work text-[0.68rem] font-semibold tracking-[0.4em] uppercase text-white/60 mb-5 animate-fade-up"
            style={{ animationDelay: "0.5s", opacity: 0 }}
          >
            {displayScriptureRef}
          </p>
          <blockquote
            className="max-w-3xl animate-fade-up"
            style={{ animationDelay: "0.7s", opacity: 0 }}
          >
            <p className="font-subheading-work text-[1.4rem] sm:text-3xl md:text-4xl lg:text-[2.6rem] font-light leading-[1.38] text-paper">
              {displayScriptureText}
            </p>
          </blockquote>
          <div
            className="w-8 h-px bg-white/35 mt-7 animate-fade-in"
            style={{ animationDelay: "1.1s", opacity: 0 }}
          />
          <div
            className="flex items-center gap-5 mt-10 animate-fade-up"
            style={{ animationDelay: "1.3s", opacity: 0 }}
          >
            <Link
              href="/doctrine"
              className="font-subheading-work text-[0.85rem] font-semibold tracking-[0.15em] uppercase text-white bg-brand px-7 py-3 rounded-full hover:bg-brand/85 transition-all duration-300"
            >
              Doctrine
            </Link>
            <Link
              href="/visit"
              className="font-subheading-work text-[0.85rem] font-semibold tracking-[0.15em] uppercase text-white border border-white/50 px-7 py-3 rounded-full hover:bg-white/10 transition-all duration-300"
            >
              Visit Us
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ Core Values / About Us ═══════════════ */}
      <CoreValuesScroller values={coreValues} />

      {/* ═══════════════ Family Section ═══════════════ */}
      <FamilySection
        quote={familyQuote}
        imageUrl={familyImageUrl}
        title={familyTitle}
        body={familyBody}
      />

      {/* ═══════════════ Liturgical Timeline ═══════════════ */}
      <LiturgicalTimeline stations={liturgicalStations} />

      {/* ═══════════════ Video Section ═══════════════ */}
      <section ref={sectionRef} className="bg-paper py-24 lg:py-32 px-6 lg:px-10">
        <div className="mx-auto max-w-7xl flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div className="w-full lg:w-1/2">
            <div
              className="flex justify-start mb-10"
              style={{
                opacity: 0,
                animation: sectionVisible ? "reveal-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards" : "none",
              }}
            >
              <div className="border-r-2 border-b-2 border-brand pr-6 pb-4">
                <h2 className="font-heading text-4xl md:text-5xl font-semibold text-charcoal">
                  Who Are We
                </h2>
              </div>
            </div>
            <div
              style={{
                opacity: 0,
                animation: sectionVisible ? "reveal-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.15s forwards" : "none",
              }}
            >
              <FAQAccordion items={displayFaqItems} />
            </div>
          </div>
          <div
            className="w-full lg:w-1/2 flex items-center"
            style={{
              opacity: 0,
              animation: sectionVisible ? "reveal-scale 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.25s forwards" : "none",
            }}
          >
            <div className="w-full aspect-video rounded-sm overflow-hidden shadow-lg">
              <iframe
                className="w-full h-full"
                src={displayVideoUrl}
                title="Who Are We — Christ Church Bellingham"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ Announcements ═══════════════ */}
      <section className="bg-paper py-24 lg:py-32 px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex justify-start mb-16">
            <div className="border-l-2 border-t-2 border-brand pl-6 pt-4">
              <h2 className="font-heading text-4xl md:text-5xl font-semibold text-charcoal">
                Announcements
              </h2>
            </div>
          </div>
          <div className="ml-4 md:ml-0">
            <div className="flex flex-col gap-12">
              {displayAnnouncements.map((item, i) => (
                <TimelineItem key={i}>
                  <div className="flex gap-6 sm:gap-10 items-start">
                    <div className="w-24 md:w-36 shrink-0 text-right pt-1">
                      <span className="font-subheading-work text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-earth/70">
                        {item.date}
                      </span>
                    </div>
                    <div className="relative shrink-0 hidden sm:flex flex-col items-center pt-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-brand ring-4 ring-paper relative z-10" />
                      {i < displayAnnouncements.length - 1 && (
                        <div className="w-px bg-brand/25 absolute top-4" style={{ bottom: "-16rem" }} />
                      )}
                    </div>
                    <div className="flex-1 pb-2">
                      <h3 className="font-heading text-xl md:text-2xl font-semibold text-charcoal leading-snug">
                        {item.title}
                      </h3>
                      <p className="font-body-crimson text-[0.88rem] leading-relaxed text-earth/80 mt-2">
                        {item.description}
                      </p>
                      {item.rsvpLink && (
                        <a
                          href={item.rsvpLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block font-subheading-work text-[0.8rem] font-semibold tracking-[0.12em] uppercase text-brand hover:text-wine transition-colors duration-300 mt-3"
                        >
                          RSVP &rarr;
                        </a>
                      )}
                    </div>
                  </div>
                </TimelineItem>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
