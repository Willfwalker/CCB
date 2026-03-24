"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const DEFAULT_DOCTRINES = [
    {
        category: "The Trinity",
        content:
            "There is one God, who exists eternally in three persons: the Father, the Son, and the Holy Spirit. He is the sovereign Creator and Sustainer of all things.",
    },
    {
        category: "The Scriptures",
        content:
            "The Bible is the written word of God, inspired by the Holy Spirit and without error in the original manuscripts. It is the infallible and authoritative rule for all matters of faith and practice.",
    },
    {
        category: "Humanity & Sin",
        content:
            "All are sinners and totally unable to save themselves from God’s displeasure, except by his mercy. Without Christ, we are separated from the life of God.",
    },
    {
        category: "Sovereign Grace",
        content:
            "Salvation is by God alone as He sovereignly chooses those He will save. His choice is based purely on his grace, not on any human individual merit or foreseen faith.",
    },
    {
        category: "The Son",
        content:
            "Jesus Christ is the eternal Son of God, who through his perfect life and sacrificial death atoned for the sins of all who will trust in him, alone, for salvation.",
    },
    {
        category: "The Holy Spirit",
        content:
            "The Holy Spirit indwells God’s people, giving them the strength and wisdom to trust Christ and follow him, producing the fruit of righteousness in their lives.",
    },
    {
        category: "The Covenant",
        content:
            "God is gracious and faithful to his people not simply as individuals but as families in successive generations according to his covenant promises.",
    },
    {
        category: "The Return",
        content:
            "Jesus will return, bodily and visibly, to judge all mankind and to receive his people to himself, bringing about the new heavens and the new earth.",
    },
    {
        category: "Reformed Theology",
        content:
            "We embrace the rich theological heritage of the Protestant Reformation, emphasizing God's total sovereignty in salvation and the supreme authority of the Scriptures.",
    },
];

const DEFAULT_PRESS_RESOURCES = [
    {
        type: "Podcast",
        title: "Christ Church Bellingham Podcast",
        description: "An extension of our preaching ministry, renewing our minds in the truth of God.",
        url: "https://podcasts.apple.com/us/podcast/renew-northwest-podcast/id1724059937",
        color: "var(--color-sky)",
    },
    {
        type: "Article",
        title: "Some Thoughts on Mentorship",
        description: "Equipping emerging leaders with biblical guidance and wisdom for life.",
        url: "https://christchurchpress.com/faith-life/some-thoughts-on-mentorship",
        color: "var(--color-navy)",
    },
    {
        type: "Article",
        title: "A Resource for the Season of Lent",
        description: "The Reformed Hours of Prayer app to organize communal life around prayer.",
        url: "https://christchurchpress.com/ministry-mission/a-resource-for-the-season-of-lent",
        color: "var(--color-gold-dk)",
    },
    {
        type: "Article",
        title: "TCS Statement on Creation",
        description: "Science depends on the foundations of Scripture, affirming a biblical view of creation.",
        url: "https://christchurchpress.com/faith-life/tcs-statement-on-creation",
        color: "var(--color-paper)",
    },
];

interface DoctrineSectionProps {
    doctrines?: { category: string; content: string }[];
    pressResources?: { type: string; title: string; description: string; url: string; color: string }[];
}

export default function DoctrineSection({ doctrines, pressResources }: DoctrineSectionProps) {
    const DOCTRINES = doctrines && doctrines.length > 0 ? doctrines : DEFAULT_DOCTRINES;
    const PRESS_RESOURCES = pressResources && pressResources.length > 0 ? pressResources : DEFAULT_PRESS_RESOURCES;
    const [openDoctrine, setOpenDoctrine] = useState<number | null>(0);
    const containerRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="doctrine" ref={containerRef} className="py-24 lg:py-32 bg-navy relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-dk/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">


                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                    {/* Left Column: Theological Tenets */}
                    <div
                        className="lg:col-span-7 transition-all duration-1000 delay-200 transform flex flex-col h-full"
                        style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(30px)" }}
                    >
                        <div className="border-l-2 border-gold-dk pl-6 mb-10">
                            <h3 className="font-heading text-3xl font-semibold text-gold-dk">What We Believe</h3>
                            <p className="font-subheading-work text-[0.8rem] tracking-widest uppercase text-gold-dk/60 mt-3">Theological Tenets</p>
                        </div>

                        <div className="flex flex-col divide-y divide-gold-dk/20 border-b border-gold-dk/20 mb-8 sm:mb-0">
                            {DOCTRINES.map((doc, i) => (
                                <button
                                    key={i}
                                    onClick={() => setOpenDoctrine(openDoctrine === i ? null : i)}
                                    className="text-left py-5 group cursor-pointer"
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <span className="font-subheading-work text-[0.95rem] font-medium text-gold-dk group-hover:text-paper transition-colors duration-300">
                                            {i < 9 ? `0${i + 1}` : i + 1}. {doc.category}
                                        </span>
                                        <span
                                            className={`text-gold-dk text-xl shrink-0 transition-transform duration-300 ${openDoctrine === i ? "rotate-45" : ""
                                                }`}
                                        >
                                            +
                                        </span>
                                    </div>
                                    <div
                                        className={`overflow-hidden transition-all duration-400 ease-in-out ${openDoctrine === i ? "max-h-48 mt-3 opacity-100" : "max-h-0 opacity-0"
                                            }`}
                                    >
                                        <p className="font-body-crimson text-[0.95rem] leading-relaxed text-gold-dk/80 pl-8 border-l-2 border-gold-dk/40 ml-4">
                                            {doc.content}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Roots & Resources */}
                    <div
                        className="lg:col-span-5 flex flex-col gap-16 transition-all duration-1000 delay-400 transform"
                        style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(30px)" }}
                    >

                        {/* Dive Deeper (Christ Church Press) */}
                        <div className="relative flex-1">
                            <div className="absolute -left-6 top-6 bottom-6 w-px bg-gold-dk/20" />
                            <div className="relative z-10 h-full flex flex-col">
                                <h3 className="font-heading text-2xl font-semibold text-gold-dk mb-8">Dive Deeper</h3>

                                <div className="space-y-4">
                                    {PRESS_RESOURCES.map((res, i) => (
                                        <a
                                            key={i}
                                            href={res.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block group bg-transparent rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gold-dk/30 hover:border-gold-dk hover:-translate-y-1"
                                        >
                                            <span className="font-subheading-work text-[0.65rem] font-bold tracking-[0.2em] uppercase block mb-2" style={{ color: res.color === 'var(--color-navy)' ? 'var(--color-paper)' : res.color }}>
                                                {res.type}
                                            </span>
                                            <h4 className="font-heading text-lg font-semibold text-gold-dk group-hover:text-paper transition-colors mb-2">
                                                {res.title}
                                            </h4>
                                            <p className="font-body-crimson text-[0.9rem] text-gold-dk/70 leading-relaxed">
                                                {res.description}
                                            </p>
                                        </a>
                                    ))}
                                </div>

                                <div className="mt-auto pt-6 border-t border-gold-dk/20">
                                    <Link href="https://christchurchpress.com/" target="_blank" rel="noopener noreferrer" className="font-subheading-work text-[0.8rem] font-semibold tracking-[0.15em] uppercase text-gold-dk hover:text-paper transition-colors duration-300 inline-flex items-center gap-2">
                                        Visit Christ Church Press
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}
