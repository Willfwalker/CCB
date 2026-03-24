"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";

export default function RootsAndAffiliations() {
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
        <section ref={containerRef} className="py-12 bg-paper">
            <div
                className="max-w-3xl mx-auto px-6 transition-all duration-1000 transform"
                style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(30px)" }}
            >
                <div className="bg-sand/20 rounded-2xl p-8 lg:p-10 border border-sand/30 hover:shadow-xl transition-shadow duration-500">
                    <div className="w-10 h-10 rounded-full bg-paper flex items-center justify-center shadow-sm mb-6">
                        <svg className="w-5 h-5 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-7m0 0V5m0 9h7m-7 0H5m14-9V3m0 20v-2m-14 2V3m0 20v-2" />
                        </svg>
                    </div>
                    <h3 className="font-heading text-2xl font-semibold text-charcoal mb-4">Roots & Affiliation</h3>
                    <p className="font-body-crimson text-[0.95rem] leading-relaxed text-earth/80 mb-6">
                        We adhere to the historic, orthodox Christian faith articulated in the Apostles&apos; and Nicene Creeds. Our doctrinal standards are the Westminster Confession of Faith and Catechisms.
                    </p>
                    <p className="font-body-crimson text-[0.95rem] leading-relaxed text-earth/80 mb-8">
                        We are a member of the Presbyterian Church in America (PCA), devoted to the inerrancy of Scriptures, the Reformed theological tradition, and the fulfillment of the Great Commission.
                    </p>
                    <Link
                        href="https://pcanet.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-subheading-work text-[0.75rem] font-bold tracking-[0.15em] uppercase text-navy hover:text-navy/70 transition-colors"
                    >
                        Learn about the PCA
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
