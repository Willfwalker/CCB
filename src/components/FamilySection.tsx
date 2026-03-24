"use client";

import { useState } from "react";
import Image from "next/image";

interface FamilySectionProps {
  quote?: string;
  imageUrl?: string;
  title?: string;
  body?: string;
}

export default function FamilySection({ quote, imageUrl, title, body }: FamilySectionProps) {
  const [expanded, setExpanded] = useState(false);

  const displayQuote = quote || "God designed the family as the first institution, the first church, and the first school. Everything we do here is aimed at strengthening that design.";
  const displayTitle = title || "Family";
  const displayImage = imageUrl || "/Happy_People.png";
  const bodyParagraphs = body
    ? body.split("\n\n").filter(Boolean)
    : [
      "Before there was a church, before there was a nation, God made a family. The family is not a cultural convention — it is a divine institution, the first and most fundamental building block of human civilization.",
      "At Christ Church, we believe the household — not the individual — is the basic unit of the church. Parents are the primary disciplers of their children. The wider church family exists to surround, support, and strengthen these households in their God-given calling.",
    ];

  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="flex flex-col md:flex-row h-[60vh] min-h-[360px]">
        <div
          onClick={() => setExpanded(!expanded)}
          className="relative overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            flex: expanded ? "0 0 50%" : "0 0 100%",
          }}
        >
          <Image
            src={displayImage}
            alt="Families and friends gathering after a Sunday service"
            fill
            className={`object-cover object-[center_35%] transition-transform duration-700 ${expanded ? "scale-105" : ""}`}
            quality={85}
          />
          <div
            className={`absolute inset-0 transition-all duration-700 ${expanded
              ? "bg-charcoal/20"
              : "bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent"
              }`}
          />

          <div
            className={`absolute inset-0 z-10 flex flex-col items-center justify-end pb-10 md:pb-12 px-6 text-center transition-opacity duration-500 pointer-events-none ${expanded ? "opacity-0" : "opacity-100"}`}
          >
            <p className="font-display text-[0.95rem] sm:text-lg md:text-xl text-paper max-w-2xl leading-relaxed hover:underline underline-offset-4 decoration-paper/40 transition-all duration-300 pointer-events-auto cursor-pointer">
              {displayQuote}
            </p>
            <span className="font-subheading-work text-[0.6rem] tracking-[0.2em] uppercase text-paper/40 mt-4">
              Read more
            </span>
          </div>
        </div>

        <div
          className="relative overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            flex: expanded ? "0 0 50%" : "0 0 0%",
            opacity: expanded ? 1 : 0,
          }}
        >
          <div className="relative h-full flex flex-col justify-center px-8 md:px-14 lg:px-16 py-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(false);
              }}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-earth/40 hover:text-charcoal transition-colors cursor-pointer text-lg"
              aria-label="Close"
            >
              ✕
            </button>

            <div className="border-l-2 border-navy pl-6 md:pl-8">
              <h3 className="font-heading text-2xl md:text-3xl font-semibold text-poppy mb-4">
                {displayTitle}
              </h3>
              <div className="space-y-3 font-body-crimson text-[0.85rem] md:text-[0.92rem] leading-relaxed text-earth/85">
                {bodyParagraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
