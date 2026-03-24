"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

const DEFAULT_VALUES = [
    {
        id: 1,
        title: "Grace",
        subtitle: "It all starts here.",
        colorVar: "var(--color-sky)",
        description: "Our standing rests entirely on the unmerited favor we receive in Christ.",
        extendedDetails: "In a world driven by performance and merit, grace is radically countercultural. We believe that God's love isn't a wage we earn but a gift we receive through faith. This reality frees us from the exhausting treadmill of self-justification, allowing us to be honest about our failures and genuinely compassionate toward others' shortcomings. Grace doesn't just save us; it continuously transforms us, melting our pride and reshaping our hearts into the image of Christ.",
        verses: [
            { reference: "Ephesians 2:8\u20139", text: "For by grace you have been saved through faith. And this is not your own doing; it is the gift of God, not a result of works, so that no one may boast." },
            { reference: "Romans 5:8", text: "But God shows his love for us in that while we were still sinners, Christ died for us." },
            { reference: "Titus 3:5", text: "He saved us, not because of works done by us in righteousness, but according to his own mercy." },
        ],
    },
    {
        id: 2,
        title: "Truth",
        subtitle: "Anchored in Scripture.",
        colorVar: "var(--color-navy)",
        description: "We are committed to the objective, unchanging truth revealed in the Bible.",
        extendedDetails: "In an age of subjective morality and skepticism, we stand unapologetically on the absolute truth of God's Word. We hold to the inerrancy and authority of Scripture, and are anchored in the deep theological commitments of the Reformed tradition. Truth is not just a concept to be debated but a reality to be lived. Engaging faithfully with truth means wrestling with hard texts, cultivating the life of the mind, and allowing God's Word to confront, comfort, and direct every aspect of our lives.",
        verses: [
            { reference: "John 17:17", text: "Sanctify them in the truth; your word is truth." },
            { reference: "2 Timothy 3:16\u201317", text: "All Scripture is breathed out by God and profitable for teaching, for reproof, for correction, and for training in righteousness, that the man of God may be complete, equipped for every good work." },
            { reference: "Psalm 119:105", text: "Your word is a lamp to my feet and a light to my path." },
        ],
    },
    {
        id: 3,
        title: "Hospitality",
        subtitle: "A welcoming culture.",
        colorVar: "var(--color-poppy)",
        description: "Because God welcomed us, we open our lives, homes, and hearts to others.",
        extendedDetails: "Hospitality at its core is not about entertaining; it is about making strangers into neighbors, and neighbors into family. It reflects the very heart of the Gospel\u2014that while we were enemies, Christ welcomed us. We are dedicated to creating a \u2018Gospel-culture\u2019 where outcasts find a seat at the table, where the lonely find community, and where differences are bridged by the unifying love of Jesus. It is a profound, practical apologetic to a fractured world.",
        verses: [
            { reference: "Romans 15:7", text: "Therefore welcome one another as Christ has welcomed you, for the glory of God." },
            { reference: "Hebrews 13:2", text: "Do not neglect to show hospitality to strangers, for thereby some have entertained angels unawares." },
            { reference: "1 Peter 4:9", text: "Show hospitality to one another without grumbling." },
        ],
    },
    {
        id: 4,
        title: "Formation",
        subtitle: "Growing deeper.",
        colorVar: "var(--color-sea)",
        description: "We are intentionally formed by liturgy, education, and robust discipleship.",
        extendedDetails: "We are all being formed by the world around us. To counteract this, we engage in deliberate spiritual formation. This happens through the rhythms of our Sunday liturgy, rigorous biblical education, and intentional discipleship in relationships. We care deeply about the \u2018how\u2019 of spiritual growth, supporting men, women, and families in their unique paths of sanctification. Our goal is not just an exchange of information, but a holistic transformation of the soul, mind, and habits.",
        verses: [
            { reference: "Romans 12:2", text: "Do not be conformed to this world, but be transformed by the renewal of your mind, that by testing you may discern what is the will of God." },
            { reference: "Colossians 3:16", text: "Let the word of Christ dwell in you richly, teaching and admonishing one another in all wisdom, singing psalms and hymns and spiritual songs." },
            { reference: "Proverbs 22:6", text: "Train up a child in the way he should go; even when he is old he will not depart from it." },
        ],
    },
    {
        id: 5,
        title: "Kingdom",
        subtitle: "Building for generations.",
        colorVar: "var(--color-wine)",
        description: "We invest in institution building and mission for the next 100 years.",
        extendedDetails: "The Kingdom of God is a public reality, not merely a private spiritual experience. Therefore, we are committed to cultural renewal, local mission, and global outreach. We aren\u2019t just thinking about next week; we are building institutions\u2014like schools and lasting community infrastructure\u2014that will serve our city and glorify God for a hundred years to come. We seek the peace and prosperity of Bellingham, anticipating the day when Christ makes all things new.",
        verses: [
            { reference: "Jeremiah 29:7", text: "Seek the welfare of the city where I have sent you into exile, and pray to the Lord on its behalf, for in its welfare you will find your welfare." },
            { reference: "Matthew 6:10", text: "Your kingdom come, your will be done, on earth as it is in heaven." },
            { reference: "Isaiah 65:21\u201322", text: "They shall build houses and inhabit them; they shall plant vineyards and eat their fruit\u2026for like the days of a tree shall the days of my people be." },
        ],
    },
];

interface CoreValuesScrollerProps {
    values?: Array<{
        id: number;
        title: string;
        subtitle: string;
        colorVar: string;
        description: string;
        extendedDetails: string;
        verses: { reference: string; text: string }[];
    }>;
}

export default function CoreValuesScroller({ values }: CoreValuesScrollerProps) {
    const VALUES = (values && values.length > 0 ? values : DEFAULT_VALUES).slice(0, 5);
    const containerRef = useRef<HTMLElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const titleTextRef = useRef<HTMLDivElement>(null);
    const subtitleTextRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const keepScrollingRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const pathsRef = useRef<(SVGPathElement | null)[]>([]);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    const [selectedValue, setSelectedValue] = useState<typeof VALUES[0] | null>(null);

    // Lock body scroll and disable ScrollTrigger when modal is open
    useEffect(() => {
        if (selectedValue) {
            document.body.style.overflow = "hidden";
            ScrollTrigger.getAll().forEach(st => st.disable());
        } else {
            document.body.style.overflow = "";
            ScrollTrigger.getAll().forEach(st => st.enable());
        }
        return () => {
            document.body.style.overflow = "";
            ScrollTrigger.getAll().forEach(st => st.enable());
        };
    }, [selectedValue]);
    const [layout, setLayout] = useState<{
        w: number;
        h: number;
        positions: { x: number; y: number }[];
        dList: string[];
        cardWidth: number;
    } | null>(null);

    // Generate responsive layout
    const updateLayout = useCallback(() => {
        if (!viewportRef.current) return;
        const w = viewportRef.current.offsetWidth;
        const h = viewportRef.current.offsetHeight;
        const isMobile = w < 1024;

        let positions: { x: number; y: number }[] = [];
        let dList: string[] = [];
        let cardWidth = isMobile ? 140 : 180;

        if (isMobile) {
            cardWidth = Math.min(130, w * 0.35);
            const cx = w * 0.12; // trunk on left
            const mainLineEndpoint = h * 0.92;
            const startY = Math.max(h * 0.28, 180); // start below header + title
            const spacing = (h * 0.62) / 5;

            positions = VALUES.map((_, i) => ({
                x: w * 0.55,
                y: startY + i * spacing + 40
            }));

            // Main trunk line (start below title area)
            dList.push(`M ${cx} ${startY} L ${cx} ${mainLineEndpoint}`);

            // Branches pointing from trunk to cards
            positions.forEach(p => {
                dList.push(`M ${cx} ${p.y} C ${cx + 20} ${p.y}, ${p.x - 80} ${p.y}, ${p.x - cardWidth / 2} ${p.y}`);
            });

        } else {
            const cx = w / 2;
            const cy = h * 0.35; // point where it splits
            cardWidth = Math.min((w * 0.9) / 5 - 10, 180); // fit 5 cards across screen

            positions = VALUES.map((_, i) => ({
                x: w * (0.1 + 0.8 * (i) / 4), // distribute evenly across 80% of screen width
                y: h * 0.65 // vertical center of cards
            }));

            // Main trunk line down (start below title area)
            dList.push(`M ${cx} ${h * 0.28} L ${cx} ${cy}`);

            // Branches from the split point
            positions.forEach(p => {
                // graceful split curve
                // Start at cx, cy. Go horizontally/down to p.x, then straight down to p.y
                const controlY = cy + (p.y - cy) * 0.4;
                dList.push(`M ${cx} ${cy} C ${cx} ${controlY}, ${p.x} ${controlY}, ${p.x} ${p.y - 120}`);
            });
        }

        setLayout({ w, h, positions, dList, cardWidth });
    }, []);

    useEffect(() => {
        updateLayout();
        window.addEventListener("resize", updateLayout);
        return () => window.removeEventListener("resize", updateLayout);
    }, [updateLayout]);

    useGSAP(() => {
        if (!layout || !containerRef.current || !viewportRef.current) return;

        const isMobile = layout.w < 1024;

        // Reset styles
        gsap.set(titleTextRef.current, { opacity: 0, y: 20 });
        gsap.set(subtitleTextRef.current, { opacity: 0, y: 20 });
        if (keepScrollingRef.current) gsap.set(keepScrollingRef.current, { opacity: 0, y: 20 });
        pathsRef.current.forEach(path => {
            if (path) gsap.set(path, { drawSVG: "0%" });
        });
        cardsRef.current.forEach(card => {
            if (card) gsap.set(card, { opacity: 0, y: 30, ...(isMobile ? {} : { scale: 0.9 }), pointerEvents: "none" });
        });
        if (buttonRef.current) gsap.set(buttonRef.current, { opacity: 0, y: 30, pointerEvents: "none" });
        const master = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                pin: true,
                start: "top top",
                end: isMobile ? "+=1000" : "+=1800",
                scrub: 1, // lowered from 2 to keep up better during fast scrolling
                invalidateOnRefresh: true, // helps cold load recalculations
                fastScrollEnd: true, // instantly snap to end state if user aggressively scrolls past
            }
        });

        let t = 0;

        // Phase 1: Intro text
        master.to(titleTextRef.current, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, t);
        master.to(subtitleTextRef.current, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, t + 0.2);
        if (keepScrollingRef.current) {
            master.to(keepScrollingRef.current, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, t + 0.4);
        }
        t += 1.5;

        // Phase 2: Draw the main trunk line (path 0)
        if (pathsRef.current[0]) {
            master.to(pathsRef.current[0], { drawSVG: "100%", duration: 1.5, ease: "power2.inOut" }, t);
        }
        t += 1.0; // overlap slightly 

        // Removed fade out text so it stays visible

        // Phase 3: Draw the 5 branches simultaneously
        pathsRef.current.slice(1).forEach((path) => {
            if (path) {
                master.to(path, { drawSVG: "100%", duration: 1.5, ease: "power2.out" }, t);
            }
        });

        t += 1.5;

        // Phase 4: Reveal the cards
        cardsRef.current.forEach((card, index) => {
            if (card) {
                master.to(card, {
                    opacity: 1,
                    y: 0,
                    ...(isMobile ? {} : { scale: 1 }),
                    pointerEvents: "auto",
                    duration: isMobile ? 0.5 : 0.8,
                    ease: isMobile ? "power2.out" : "back.out(1.2)"
                }, t + (index * (isMobile ? 0.08 : 0.15))); // stagger
            }
        });

        t += 1.5;

        // Phase 5: Reveal the Meet Our Staff button & Hide Keep Scrolling
        if (buttonRef.current) {
            master.to(buttonRef.current, {
                opacity: 1,
                y: 0,
                pointerEvents: "auto",
                duration: 0.8,
                ease: "back.out(1.2)"
            }, t);
        }
        if (keepScrollingRef.current) {
            master.to(keepScrollingRef.current, {
                opacity: 0,
                duration: 0.5
            }, t);
        }

        t += 1.0;

        // Final hold
        master.to({}, { duration: 0.5 }, t);

    }, { scope: containerRef, dependencies: [layout] });

    return (
        <>
            <section id="about-us" ref={containerRef} className="relative bg-paper w-full h-screen overflow-hidden">
                <div ref={viewportRef} className="relative w-full h-full">
                    {/* Central Titles */}
                    {layout && (
                        <div
                            className={`absolute flex flex-col items-center justify-center text-center w-full max-w-2xl left-1/2 -translate-x-1/2 pointer-events-none z-30 ${layout.w < 1024 ? "top-[100px]" : "top-[15%]"
                                }`}
                        >
                            <div className="bg-paper/90 md:bg-paper/80 md:backdrop-blur-sm py-2 px-4 md:px-6 rounded-2xl">
                                <h2 ref={titleTextRef} className="font-display text-2xl sm:text-4xl md:text-5xl font-semibold text-charcoal mb-2 md:mb-4">
                                    Our Core Values
                                </h2>
                                <p ref={subtitleTextRef} className="font-body text-[0.78rem] sm:text-[0.95rem] md:text-[1.05rem] leading-relaxed text-earth/80">
                                    These five principles form the bedrock of our Gospel-culture, shaping how we worship, live, and engage with the world.
                                </p>
                            </div>
                        </div>
                    )}

                    {layout && (
                        <>
                            {/* SVG Lines */}
                            <svg
                                ref={svgRef}
                                className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
                                viewBox={`0 0 ${layout.w} ${layout.h}`}
                                preserveAspectRatio="none"
                            >
                                {layout.dList.map((d, i) => (
                                    <path
                                        key={i}
                                        ref={(el) => { pathsRef.current[i] = el; }}
                                        d={d}
                                        fill="none"
                                        stroke={i === 0 ? "var(--color-brand)" : VALUES[i - 1].colorVar}
                                        strokeWidth="3.5"
                                        strokeLinecap="round"
                                        className="opacity-80"
                                    />
                                ))}
                            </svg>

                            {/* Value Cards */}
                            {VALUES.map((val, i) => {
                                const pos = layout.positions[i];

                                // Simple icon selector based on value title
                                let Icon;
                                if (val.title === "Grace") Icon = <img src="/dove_alpha.png" alt="Grace Dove" className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 mb-1 sm:mb-2 object-contain" />;
                                else if (val.title === "Truth") Icon = <svg className="w-5 h-5 sm:w-8 sm:h-8 lg:w-10 lg:h-10 mb-1 sm:mb-3" style={{ color: val.colorVar }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>;
                                else if (val.title === "Hospitality") Icon = <svg className="w-5 h-5 sm:w-8 sm:h-8 lg:w-10 lg:h-10 mb-1 sm:mb-3" style={{ color: val.colorVar }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>;
                                else if (val.title === "Formation") Icon = <svg className="w-5 h-5 sm:w-8 sm:h-8 lg:w-10 lg:h-10 mb-1 sm:mb-3" style={{ color: val.colorVar }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-7m4-5a4 4 0 10-8 0 4 4 0 00-2 7h12a4 4 0 00-2-7z" /></svg>;
                                else Icon = <svg className="w-5 h-5 sm:w-8 sm:h-8 lg:w-10 lg:h-10 mb-1 sm:mb-3" style={{ color: val.colorVar }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M22 20v-9H2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2Z" /><path d="M18 11V4H6v7" /><path d="M15 22v-4a3 3 0 0 0-3-3v0a3 3 0 0 0-3 3v4" /><path d="M22 11V9" /><path d="M2 11V9" /><path d="M6 4V2" /><path d="M18 4V2" /><path d="M10 4V2" /><path d="M14 4V2" /></svg>; // Kingdom castle

                                return (
                                    <div
                                        key={val.id}
                                        ref={(el) => { cardsRef.current[i] = el; }}
                                        onClick={() => setSelectedValue(val)}
                                        className="absolute z-30 group bg-paper rounded-xl shadow-[0_12px_40px_rgba(84,73,59,0.18)] p-2.5 sm:p-4 md:p-6 cursor-pointer flex flex-col justify-center text-center items-center md:hover:-translate-y-2 md:transition-transform md:duration-300 border-t-[3px]"
                                        style={{
                                            top: pos.y,
                                            left: pos.x,
                                            width: `${layout.cardWidth}px`,
                                            transform: "translate(-50%, -50%)",
                                            borderColor: val.colorVar
                                        }}
                                    >
                                        {Icon}
                                        <h3 className="font-display text-sm sm:text-lg lg:text-2xl font-semibold text-charcoal mb-1 sm:mb-3">
                                            {val.title}
                                        </h3>

                                        <div className="w-full flex justify-center mt-auto">
                                            <div className="flex items-center gap-1.5 font-body text-[0.55rem] uppercase tracking-widest font-bold opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: val.colorVar }}>
                                                <span>Read More</span>
                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Keep Scrolling Indicator */}
                            <div ref={keepScrollingRef} className="absolute bottom-6 left-6 z-40 flex items-center gap-2 text-charcoal/40 bg-paper/50 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-sand/50 pointer-events-none md:bottom-8 md:left-8">
                                <span className="font-subheading-work text-[0.6rem] md:text-[0.65rem] font-bold tracking-[0.2em] uppercase">Keep Scrolling</span>
                                <div className="animate-bounce">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                    </svg>
                                </div>
                            </div>

                            {/* Meet Our Staff Button */}
                            <div ref={buttonRef} className="absolute z-40"
                                style={{
                                    bottom: layout.w < 1024 ? "3%" : "8%",
                                    right: layout.w < 1024 ? "10%" : undefined,
                                    left: layout.w < 1024 ? undefined : "50%",
                                    transform: layout.w < 1024 ? "none" : "translateX(-50%)"
                                }}>
                                <Link href="/about-us" className="inline-flex items-center gap-2 bg-paper text-charcoal px-5 py-2.5 rounded-full border border-charcoal hover:bg-brand hover:border-brand hover:text-paper shadow-[0_4px_14px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_20px_rgba(140,32,25,0.3)] transition-all duration-300 font-display font-medium text-[1rem]">
                                    <span>Meet Our Staff</span>
                                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </Link>
                            </div>
                        </>
                    )}
                </div>

            </section>

            {/* Modal Overlay for Extended Details */}
            {selectedValue && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    onTouchMove={(e) => {
                        // Allow scrolling inside the modal content, but prevent background scroll
                        const modal = e.currentTarget.querySelector('[data-modal-content]') as HTMLElement | null;
                        if (modal && modal.contains(e.target as Node)) return;
                        e.preventDefault();
                    }}
                    onWheel={(e) => {
                        const modal = e.currentTarget.querySelector('[data-modal-content]') as HTMLElement | null;
                        if (modal && modal.contains(e.target as Node)) return;
                        e.stopPropagation();
                    }}
                >
                    <div
                        className="absolute inset-0 bg-charcoal/80 md:backdrop-blur-sm cursor-pointer animate-fade-in"
                        onClick={() => setSelectedValue(null)}
                    />
                    <div data-modal-content className="relative bg-paper rounded-xl shadow-2xl p-8 md:p-12 max-w-2xl w-full mx-auto transform transition-all animate-reveal-scale overflow-y-auto max-h-[85vh] z-50 border-t-[4px] overscroll-contain" style={{ borderColor: selectedValue.colorVar }}>
                        <button
                            onClick={() => setSelectedValue(null)}
                            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-earth/60 hover:text-charcoal hover:bg-sand/30 rounded-full transition-colors text-xl"
                            aria-label="Close details"
                        >
                            ✕
                        </button>

                        <div className="text-left">
                            <span className="font-body text-[0.75rem] font-bold tracking-[0.3em] uppercase pb-2 block" style={{ color: selectedValue.colorVar }}>
                                Core Value 0{selectedValue.id}
                            </span>

                            <h3 className="font-display text-3xl md:text-5xl font-semibold text-charcoal leading-snug mt-2">
                                {selectedValue.title}
                            </h3>
                            <p className="font-display text-lg italic text-earth/60 mt-2 mb-6">
                                {selectedValue.subtitle}
                            </p>

                            <div className="w-16 h-px mb-8" style={{ backgroundColor: selectedValue.colorVar, opacity: 0.5 }} />

                            <div className="space-y-6">
                                <p className="font-body text-[1.05rem] leading-loose text-charcoal/90 font-medium tracking-wide">
                                    {selectedValue.description}
                                </p>

                                <p className="font-body text-[0.95rem] leading-relaxed text-earth/80 pt-2 border-t border-sand/30">
                                    {selectedValue.extendedDetails}
                                </p>

                                <div className="pt-4 border-t border-sand/30">
                                    <span className="font-subheading-work text-[0.7rem] font-bold tracking-[0.3em] uppercase text-earth/50 block mb-3">
                                        Scripture
                                    </span>
                                    <div className="space-y-3">
                                        {selectedValue.verses.map((v, i) => (
                                            <div key={i} className="pl-4 border-l-2" style={{ borderColor: selectedValue.colorVar }}>
                                                <p className="font-body-crimson text-[0.88rem] leading-relaxed text-earth/80 italic">
                                                    &ldquo;{v.text}&rdquo;
                                                </p>
                                                <span className="font-subheading-work text-[0.72rem] font-semibold tracking-[0.12em] uppercase mt-1 block" style={{ color: selectedValue.colorVar }}>
                                                    {v.reference}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
