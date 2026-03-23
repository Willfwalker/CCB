"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import DoctrineSection from "../DoctrineSection";

const NAV_ITEMS = ["Visit Us", "Ministries", "Media"] as const;

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

export default function DoctrinePage() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [ministriesOpen, setMinistriesOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
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
                    <div className="mx-8 h-px bg-paper/15" />
                    <div className="flex-1 overflow-y-auto px-8 py-8 flex flex-col gap-8">
                        {Object.entries(MINISTRIES).map(([category, items]) => (
                            <div key={category}>
                                <h4 className="font-subheading-work text-[0.65rem] font-bold tracking-[0.25em] uppercase text-gold-dk/80 mb-4">
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
                className={`absolute top-0 left-0 right-0 z-50 transition-all duration-500 bg-navy ${scrolled ? "shadow-md" : ""}`}
            >
                <div className="pl-4 pr-8 sm:px-6 lg:px-10 flex items-center justify-between h-[84px]">
                    {/* ── Logo ── */}
                    <Link
                        href="/"
                        className="flex items-center group animate-nav-in"
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
                                            className="font-subheading-work text-[0.9rem] font-medium tracking-[0.18em] capitalize transition-colors duration-500 animate-nav-in text-gold-dk hover:text-paper cursor-pointer"
                                            style={{ animationDelay: `${0.1 + i * 0.08}s` }}
                                        >
                                            {label}
                                        </button>
                                    );
                                }
                                return (
                                    <Link
                                        key={label}
                                        href={
                                            label === "Visit Us" ? "/visit" :
                                                `/#${label.toLowerCase().replace(/\s+/g, "-")}`
                                        }
                                        className="font-subheading-work text-[0.9rem] font-medium tracking-[0.18em] capitalize transition-colors duration-500 animate-nav-in text-gold-dk hover:text-paper"
                                        style={{ animationDelay: `${0.1 + i * 0.08}s` }}
                                    >
                                        {label}
                                    </Link>
                                );
                            })}
                            <Link
                                href="/doctrine"
                                className="font-subheading-work text-[0.9rem] font-medium tracking-[0.18em] capitalize transition-colors duration-500 animate-nav-in text-paper"
                            >
                                Doctrine
                            </Link>
                            <Link
                                href="/#give"
                                className="font-subheading-work text-[0.9rem] font-semibold tracking-[0.18em] capitalize transition-colors duration-500 animate-nav-in text-gold-dk hover:text-paper"
                            >
                                Give
                            </Link>
                        </div>
                    </nav>

                    {/* ── Mobile hamburger ── */}
                    <button
                        className={`md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] transition-opacity duration-300 ${ministriesOpen ? "opacity-0 pointer-events-none" : ""}`}
                        onClick={() => setMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <span className="block w-6 h-[2px] rounded bg-paper transition-colors duration-500" />
                        <span className="block w-6 h-[2px] rounded bg-paper transition-colors duration-500" />
                        <span className="block w-6 h-[2px] rounded bg-paper transition-colors duration-500" />
                    </button>
                </div>
            </header>

            {/* ═══════════════ Mobile Sidebar ═══════════════ */}
            <div
                className={`fixed inset-0 z-[60] transition-opacity duration-300 md:hidden ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            >
                <div
                    className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
                    onClick={() => setMenuOpen(false)}
                />
                <nav
                    className={`absolute top-0 right-0 h-full w-64 bg-navy shadow-2xl flex flex-col transition-transform duration-300 ease-out ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
                >
                    <div className="flex items-center justify-end h-[84px] pr-12">
                        <button
                            onClick={() => setMenuOpen(false)}
                            className="w-10 h-10 flex items-center justify-center text-paper/60 hover:text-paper transition-colors text-2xl"
                            aria-label="Close menu"
                        >
                            ✕
                        </button>
                    </div>
                    <div className="flex flex-col gap-2 pl-8 pr-12 pt-4">
                        {NAV_ITEMS.map((label) => {
                            if (label === "Ministries") {
                                return (
                                    <button
                                        key={label}
                                        onClick={() => { setMenuOpen(false); setMinistriesOpen(true); }}
                                        className="font-subheading-work text-[0.95rem] font-medium tracking-[0.18em] uppercase text-paper/80 hover:text-gold-dk py-3 border-b border-paper/10 transition-colors duration-300 text-left cursor-pointer"
                                    >
                                        {label}
                                    </button>
                                );
                            }
                            return (
                                <Link
                                    key={label}
                                    href={
                                        label === "Visit Us" ? "/visit" :
                                            `/#${label.toLowerCase().replace(/\s+/g, "-")}`
                                    }
                                    onClick={() => setMenuOpen(false)}
                                    className="font-subheading-work text-[0.95rem] font-medium tracking-[0.18em] uppercase text-paper/80 hover:text-gold-dk py-3 border-b border-paper/10 transition-colors duration-300"
                                >
                                    {label}
                                </Link>
                            );
                        })}
                        <Link
                            href="/doctrine"
                            onClick={() => setMenuOpen(false)}
                            className="font-subheading-work text-[0.95rem] font-medium tracking-[0.18em] uppercase text-paper py-3 border-b border-paper/10 transition-colors duration-300"
                        >
                            Doctrine
                        </Link>
                        <Link
                            href="/#give"
                            onClick={() => setMenuOpen(false)}
                            className="font-subheading-work text-[0.95rem] font-semibold tracking-[0.18em] uppercase text-gold-dk hover:text-paper py-3 transition-colors duration-300"
                        >
                            Give
                        </Link>
                    </div>
                </nav>
            </div>

            <main className="min-h-screen bg-navy pt-12 md:pt-20">
                <DoctrineSection />
            </main>
        </>
    );
}
