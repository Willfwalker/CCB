"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import LiturgicalTimeline from "./LiturgicalTimeline";
import CoreValuesScroller from "./CoreValuesScroller";

const NAV_ITEMS = ["Visit Us", "Doctrine", "Ministries", "Media"] as const;

const MINISTRIES = {
  "Life Together": [
    "Men's Ministry",
    "Women's Ministry",
    "Discipleship Groups",
    "Home Fellowships",
  ],
  "Next Generation": [
    "Children's Ministry",
    "Youth Ministry",
    "Trinity Classical School",
  ],
  "Mission & Service": [
    "Missionaries",
    "Christ Church Press",
    "Hospitality Ministry",
  ]
};

const ANNOUNCEMENTS = [
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
] as const;

const FAQ_ITEMS = [
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

function TimelineItem({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: "translateY(24px)",
        ...(visible
          ? {
            opacity: 1,
            transform: "translateY(0)",
            transition: "opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
          }
          : {}),
      }}
    >
      {children}
    </div>
  );
}

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col divide-y divide-sand/60">
      {FAQ_ITEMS.map((item, i) => (
        <button
          key={i}
          onClick={() => setOpenIndex(openIndex === i ? null : i)}
          className="text-left py-5 group cursor-pointer"
        >
          <div className="flex items-center justify-between gap-4">
            <span className="font-subheading-work text-[0.95rem] font-medium text-charcoal group-hover:text-brand transition-colors duration-300">
              {item.question}
            </span>
            <span
              className={`text-brand text-xl shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-45" : ""
                }`}
            >
              +
            </span>
          </div>
          <div
            className={`overflow-hidden transition-all duration-400 ease-in-out ${openIndex === i ? "max-h-48 mt-3 opacity-100" : "max-h-0 opacity-0"
              }`}
          >
            <p className="font-body-crimson text-[0.88rem] leading-relaxed text-earth/80">
              {item.answer}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}

function FamilySection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="flex flex-col md:flex-row h-[60vh] min-h-[360px]">
        {/* Photo — slides to left half when expanded */}
        <div
          onClick={() => setExpanded(!expanded)}
          className="relative overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            flex: expanded ? "0 0 50%" : "0 0 100%",
          }}
        >
          <Image
            src="/Happy_People.png"
            alt="Families and friends gathering after a Sunday service"
            fill
            className={`object-cover object-[center_35%] transition-transform duration-700 ${expanded ? "scale-105" : ""
              }`}
            quality={85}
          />
          <div
            className={`absolute inset-0 transition-all duration-700 ${expanded
              ? "bg-charcoal/20"
              : "bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent"
              }`}
          />

          {/* Quote overlay — fades out when expanded */}
          <div
            className={`absolute inset-0 z-10 flex flex-col items-center justify-end pb-10 md:pb-12 px-6 text-center transition-opacity duration-500 pointer-events-none ${expanded ? "opacity-0" : "opacity-100"
              }`}
          >
            <p className="font-display text-[0.95rem] sm:text-lg md:text-xl text-paper max-w-2xl leading-relaxed hover:underline underline-offset-4 decoration-paper/40 transition-all duration-300 pointer-events-auto cursor-pointer">
              God designed the family as the first institution, the first
              church, and the first school. Everything we do here is aimed at
              strengthening that design.
            </p>
            <span className="font-subheading-work text-[0.6rem] tracking-[0.2em] uppercase text-paper/40 mt-4">
              Read more
            </span>
          </div>
        </div>

        {/* Text panel — slides in from right */}
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
                Family
              </h3>
              <div className="space-y-3 font-body-crimson text-[0.85rem] md:text-[0.92rem] leading-relaxed text-earth/85">
                <p>
                  Before there was a church, before there was a nation, God made
                  a family. The family is not a cultural convention — it is a
                  divine institution, the first and most fundamental building
                  block of human civilization.
                </p>
                <p>
                  At Christ Church, we believe the household — not the
                  individual — is the basic unit of the church. Parents are the
                  primary disciplers of their children. The wider church family
                  exists to surround, support, and strengthen these households
                  in their God-given calling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [ministriesOpen, setMinistriesOpen] = useState(false);
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight - 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      {/* ═══════════════ Ministries Slide-Out ═══════════════ */}
      <div
        className={`fixed inset-0 z-[70] transition-opacity duration-300 ${ministriesOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        {/* Blurred backdrop */}
        <div
          className="absolute inset-0 bg-charcoal/40 backdrop-blur-md"
          onClick={() => setMinistriesOpen(false)}
        />

        {/* Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[420px] max-w-[90vw] bg-navy shadow-2xl flex flex-col transition-transform duration-500 ease-out ${ministriesOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-8 pt-8 pb-6">
            <h2 className="font-heading text-[1.4rem] text-paper tracking-[0.08em]">
              Ministries
            </h2>
            <button
              onClick={() => setMinistriesOpen(false)}
              className="w-10 h-10 flex items-center justify-center text-paper/50 hover:text-paper transition-colors text-xl"
              aria-label="Close ministries"
            >
              ✕
            </button>
          </div>

          {/* Divider */}
          <div className="mx-8 h-px bg-paper/15" />

          {/* Ministry Categories */}
          <div className="flex-1 overflow-y-auto px-8 py-8 flex flex-col gap-8">
            {Object.entries(MINISTRIES).map(([category, items]) => (
              <div key={category}>
                <h4 className="font-subheading-work text-[0.65rem] font-bold tracking-[0.25em] uppercase text-poppy/80 mb-4">
                  {category}
                </h4>
                <ul className="space-y-3">
                  {items.map((m) => (
                    <li key={m}>
                      <Link
                        href={({ "Men's Ministry": "/ccbmen", "Women's Ministry": "/ccbwomen", "Discipleship Groups": "/discipleship-groups", "Home Fellowships": "/home-fellowships", "Children's Ministry": "/childrens-ministry", "Youth Ministry": "/youth", "Trinity Classical School": "https://www.trinitybham.org", "Missionaries": "/missions-blog", "Christ Church Press": "https://www.christchurchpress.com", "Hospitality Ministry": "/hospitality-ministry-1" } as Record<string, string>)[m] || "/"}
                        onClick={() => setMinistriesOpen(false)}
                        className="font-body-crimson text-[1.05rem] text-paper/70 hover:text-paper transition-colors duration-200 block py-0.5"
                      >
                        {m}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════ Fixed Header ═══════════════ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-paper shadow-md" : "bg-transparent"
          }`}
      /* Alt: navy/gold header → scrolled ? "bg-navy shadow-md" */
      >
        <div className="pl-4 pr-8 sm:px-6 lg:px-10 flex items-center justify-between h-[84px]">
          {/* ── Logo ── */}
          <Link
            href="/"
            className="flex items-center group animate-nav-in"
            style={{ opacity: 0 }}
          >
            <div
              className="relative w-auto aspect-[5/2] transition-all duration-500"
              style={{ height: scrolled ? "70px" : "100px" }}
            >
              <Image
                src="/church-logo.png"
                alt="Christ Church Bellingham logo"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          {/* ── Navigation ── */}
          <nav className={`hidden md:flex flex-col items-end justify-center transition-opacity duration-300 ${ministriesOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
            <div className="flex items-center gap-10">
              {NAV_ITEMS.map((label, i) => {
                if (label === "Ministries") {
                  return (
                    <button
                      key={label}
                      onClick={() => setMinistriesOpen(true)}
                      className={`font-subheading-work text-[0.9rem] font-medium tracking-[0.18em] capitalize transition-colors duration-500 animate-nav-in cursor-pointer ${scrolled
                        ? "text-earth hover:text-charcoal"
                        : "text-paper hover:text-paper/70"
                        }`}
                      style={{ animationDelay: `${0.1 + i * 0.08}s`, opacity: 0 }}
                    >
                      {label}
                    </button>
                  );
                }
                return (
                  <Link
                    key={label}
                    href={
                      label === "Doctrine" ? "/doctrine" :
                        label === "Visit Us" ? "/visit" :
                          label === "Media" ? "/media" :
                            `#${(label as string).toLowerCase().replace(/\s+/g, "-")}`
                    }
                    className={`font-subheading-work text-[0.9rem] font-medium tracking-[0.18em] capitalize transition-colors duration-500 animate-nav-in ${scrolled
                      ? "text-earth hover:text-charcoal"
                      : "text-paper hover:text-paper/70"
                      }`}
                    style={{ animationDelay: `${0.1 + i * 0.08}s`, opacity: 0 }}
                  >
                    {label}
                  </Link>
                );
              })}
              <Link
                href="#give"
                className={`font-subheading-work text-[0.9rem] font-semibold tracking-[0.18em] capitalize transition-colors duration-500 animate-nav-in ${scrolled
                  ? "text-earth hover:text-charcoal"
                  : "text-paper hover:text-paper/70"
                  }`}
                /* Alt: navy/gold header → "text-poppy/80 hover:text-poppy" */
                style={{ animationDelay: `${0.1 + NAV_ITEMS.length * 0.08}s`, opacity: 0 }}
              >
                Give
              </Link>
            </div>
            {/* ── Horizontal divider under nav ── */}
            <div
              className={`w-4/5 h-px mr-13 transition-all duration-500 animate-fade-in ${scrolled ? "opacity-0" : "bg-paper/30"
                }`}
              style={{ animationDelay: "0.5s", opacity: 0 }}
            />
          </nav>

          {/* ── Mobile hamburger ── */}
          <button
            className={`md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] animate-nav-in transition-opacity duration-300 ${ministriesOpen ? "opacity-0 pointer-events-none" : ""}`}
            style={ministriesOpen ? undefined : { opacity: 0 }}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <span className={`block w-6 h-[2px] rounded transition-colors duration-500 ${scrolled ? "bg-charcoal" : "bg-paper"}`} />
            <span className={`block w-6 h-[2px] rounded transition-colors duration-500 ${scrolled ? "bg-charcoal" : "bg-paper"}`} />
            <span className={`block w-6 h-[2px] rounded transition-colors duration-500 ${scrolled ? "bg-charcoal" : "bg-paper"}`} />
          </button>
        </div>
      </header>

      {/* ═══════════════ Mobile Sidebar ═══════════════ */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 md:hidden ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />

        {/* Panel */}
        <nav
          className={`absolute top-0 right-0 h-full w-64 bg-navy shadow-2xl flex flex-col transition-transform duration-300 ease-out ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          {/* Close button */}
          <div className="flex items-center justify-end h-[84px] pr-12">
            <button
              onClick={() => setMenuOpen(false)}
              className="w-10 h-10 flex items-center justify-center text-paper/60 hover:text-paper transition-colors text-2xl"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2 pl-8 pr-12 pt-4">
            {NAV_ITEMS.map((label) => {
              if (label === "Ministries") {
                return (
                  <button
                    key={label}
                    onClick={() => { setMenuOpen(false); setMinistriesOpen(true); }}
                    className="font-subheading-work text-[0.95rem] font-medium tracking-[0.18em] uppercase text-paper/80 hover:text-poppy py-3 border-b border-paper/10 transition-colors duration-300 text-left cursor-pointer"
                  >
                    {label}
                  </button>
                );
              }
              return (
                <Link
                  key={label}
                  href={
                    label === "Doctrine" ? "/doctrine" :
                      label === "Visit Us" ? "/visit" :
                        label === "Media" ? "/media" :
                          `#${(label as string).toLowerCase().replace(/\s+/g, "-")}`
                  }
                  onClick={() => setMenuOpen(false)}
                  className="font-subheading-work text-[0.95rem] font-medium tracking-[0.18em] uppercase text-paper/80 hover:text-poppy py-3 border-b border-paper/10 transition-colors duration-300"
                >
                  {label}
                </Link>
              );
            })}
            <Link
              href="#give"
              onClick={() => setMenuOpen(false)}
              className="font-subheading-work text-[0.95rem] font-semibold tracking-[0.18em] uppercase text-poppy hover:text-poppy/80 py-3 transition-colors duration-300"
            >
              Give
            </Link>
          </div>
        </nav>
      </div>

      {/* ═══════════════ Hero / CTA ═══════════════ */}
      <section className="relative h-screen min-h-[540px] overflow-hidden">
        {/* Background */}
        <Image
          src={process.env.NEXT_PUBLIC_HERO_MODE === "teaching" ? "/dad_teaching.png" : "/church_building.png"}
          alt="Pastor teaching the congregation bathed in golden light"
          fill
          className="object-cover object-[center_28%]"
          priority
          quality={85}
        />

        {/* Warm dark overlay — uses explicit rgba gradient */}
        <div className="absolute inset-0 hero-overlay" />

        {/* Scripture content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          {/* Decorative rule */}
          <div
            className="w-8 h-px bg-white/35 mb-5 animate-fade-in"
            style={{ animationDelay: "0.3s", opacity: 0 }}
          />

          <p
            className="font-subheading-work text-[0.68rem] font-semibold tracking-[0.4em] uppercase text-white/60 mb-5 animate-fade-up"
            style={{ animationDelay: "0.5s", opacity: 0 }}
          >
            John 6:37
          </p>

          <blockquote
            className="max-w-3xl animate-fade-up"
            style={{ animationDelay: "0.7s", opacity: 0 }}
          >
            <p className="font-subheading-work text-[1.4rem] sm:text-3xl md:text-4xl lg:text-[2.6rem] font-light leading-[1.38] text-paper">
              &ldquo;All that the Father gives me will come to me,
              and whoever comes to me I will never cast out.&rdquo;
            </p>
          </blockquote>

          {/* Decorative rule */}
          <div
            className="w-8 h-px bg-white/35 mt-7 animate-fade-in"
            style={{ animationDelay: "1.1s", opacity: 0 }}
          />

          {/* CTA Buttons */}
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
      <CoreValuesScroller />

      {/* ═══════════════ Family Section ═══════════════ */}
      <FamilySection />

      {/* ═══════════════ Liturgical Timeline ═══════════════ */}
      <LiturgicalTimeline />

      {/* ═══════════════ Video Section ═══════════════ */}
      <section ref={sectionRef} className="bg-paper py-24 lg:py-32 px-6 lg:px-10">
        <div className="mx-auto max-w-7xl flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left — FAQ accordion */}
          <div className="w-full lg:w-1/2">
            {/* Section heading with corner accent */}
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
              <FAQAccordion />
            </div>
          </div>

          {/* Right — YouTube video embed */}
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
                src="https://www.youtube.com/embed/BBEQdFyD_SY"
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
          {/* Section heading with corner accent — mirrored to bottom-right */}
          <div className="flex justify-start mb-16">
            <div className="border-l-2 border-t-2 border-brand pl-6 pt-4">
              <h2 className="font-heading text-4xl md:text-5xl font-semibold text-charcoal">
                Announcements
              </h2>
            </div>
          </div>

          {/* Timeline */}
          <div className="ml-4 md:ml-0">
            <div className="flex flex-col gap-12">
              {ANNOUNCEMENTS.map((item, i) => (
                <TimelineItem key={i}>
                  <div className="flex gap-6 sm:gap-10 items-start">
                    {/* Date label */}
                    <div className="w-24 md:w-36 shrink-0 text-right pt-1">
                      <span className="font-subheading-work text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-earth/70">
                        {item.date}
                      </span>
                    </div>

                    {/* Dot + vertical line segment */}
                    <div className="relative shrink-0 hidden sm:flex flex-col items-center pt-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-brand ring-4 ring-paper relative z-10" />
                      {i < ANNOUNCEMENTS.length - 1 && (
                        <div className="w-px bg-brand/25 absolute top-4" style={{ bottom: "-16rem" }} />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-2">
                      <h3 className="font-heading text-xl md:text-2xl font-semibold text-charcoal leading-snug">
                        {item.title}
                      </h3>
                      <p className="font-body-crimson text-[0.88rem] leading-relaxed text-earth/80 mt-2">
                        {item.description}
                      </p>
                      {"rsvpLink" in item && (
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
