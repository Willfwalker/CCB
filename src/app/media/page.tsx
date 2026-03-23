"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

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

export default function MediaPage() {
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
        <div className="min-h-screen bg-paper pt-[84px]">
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
            <header className="fixed top-0 left-0 right-0 z-50 bg-paper shadow-md">
                <div className="pl-4 pr-8 sm:px-6 lg:px-10 flex items-center justify-between h-[84px]">
                    {/* ── Logo ── */}
                    <Link href="/" className="flex items-center group animate-nav-in">
                        <div className="relative w-auto aspect-[5/2] h-[70px]">
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
                                            className="font-subheading-work text-[0.9rem] font-medium tracking-[0.18em] capitalize transition-colors duration-500 animate-nav-in text-earth hover:text-charcoal cursor-pointer"
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
                                            label === "Doctrine" ? "/doctrine" :
                                                label === "Visit Us" ? "/visit" :
                                                    label === "Media" ? "/media" :
                                                        `/#${(label as string).toLowerCase().replace(/\s+/g, "-")}`
                                        }
                                        className="font-subheading-work text-[0.9rem] font-medium tracking-[0.18em] capitalize transition-colors duration-500 animate-nav-in text-earth hover:text-charcoal"
                                        style={{ animationDelay: `${0.1 + i * 0.08}s` }}
                                    >
                                        {label}
                                    </Link>
                                );
                            })}
                            <Link
                                href="/#give"
                                className="font-subheading-work text-[0.9rem] font-semibold tracking-[0.18em] capitalize transition-colors duration-500 animate-nav-in text-earth hover:text-charcoal"
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
                        <span className="block w-6 h-[2px] rounded bg-charcoal transition-colors duration-500" />
                        <span className="block w-6 h-[2px] rounded bg-charcoal transition-colors duration-500" />
                        <span className="block w-6 h-[2px] rounded bg-charcoal transition-colors duration-500" />
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
                                        label === "Doctrine" ? "/doctrine" :
                                            label === "Visit Us" ? "/visit" :
                                                label === "Media" ? "/media" :
                                                    `/#${(label as string).toLowerCase().replace(/\s+/g, "-")}`
                                    }
                                    onClick={() => setMenuOpen(false)}
                                    className="font-subheading-work text-[0.95rem] font-medium tracking-[0.18em] uppercase text-paper/80 hover:text-gold-dk py-3 border-b border-paper/10 transition-colors duration-300"
                                >
                                    {label}
                                </Link>
                            );
                        })}
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
            {/* ═══════════════ Hero Section ═══════════════ */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                {/* Background dark color to match general aesthetic */}
                <div className="absolute inset-0 bg-navy">
                    {/* We'll use a placeholder photo with a rich overlay for a premium feel */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-navy via-navy/90 to-navy/40 mix-blend-multiply z-10" />
                    <Image
                        src="/dad_teaching.png" /* Using existing image for now, can be changed later */
                        alt="Christ Church Media Background"
                        fill
                        className="object-cover object-[center_30%] opacity-40"
                        priority
                    />
                </div>

                <div className="relative z-20 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
                    <div
                        className="w-8 h-px bg-gold/50 mb-6 animate-fade-in"
                        style={{ animationDelay: "0.2s", opacity: 0 }}
                    />
                    <h1
                        className="font-heading text-5xl md:text-6xl lg:text-7xl text-paper font-semibold tracking-wide mb-6 animate-fade-up"
                        style={{ animationDelay: "0.4s", opacity: 0 }}
                    >
                        Christ Church Press
                    </h1>
                    <p
                        className="font-body-crimson text-xl md:text-2xl text-paper/80 leading-relaxed max-w-2xl animate-fade-up"
                        style={{ animationDelay: "0.6s", opacity: 0 }}
                    >
                        Offering articles and podcasts that extend the pulpit, discipling our church while providing sound gospel teaching for believers everywhere.
                    </p>
                    <div
                        className="w-8 h-px bg-gold/50 mt-8 animate-fade-in"
                        style={{ animationDelay: "0.8s", opacity: 0 }}
                    />
                </div>
            </section>

            {/* ═══════════════ Podcast Section ═══════════════ */}
            <section className="py-24 px-6 md:px-12 lg:px-24 bg-paper relative">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
                    <div className="w-full lg:w-1/2 order-2 lg:order-1 relative">
                        <div className="aspect-square relative rounded-xl overflow-hidden shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
                            <Image
                                src="/dad_teaching.png"
                                alt="Podcast Cover"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent flex items-end p-8">
                                <h3 className="text-paper font-heading text-2xl md:text-3xl">Christ Church Bellingham Podcast</h3>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 order-1 lg:order-2 flex flex-col items-start">
                        <h4 className="font-subheading-work text-[0.85rem] font-bold tracking-[0.25em] uppercase text-poppy/90 mb-4">
                            Our Podcast
                        </h4>
                        <h2 className="font-heading text-4xl md:text-5xl text-charcoal font-semibold mb-6">
                            Listen & Grow
                        </h2>
                        <p className="font-body-crimson text-lg md:text-xl text-earth/80 leading-relaxed mb-8">
                            The Christ Church Bellingham Podcast is an extension of our preaching ministry. Our aim is to root Christians more deeply in the gospel and make us wiser in the Scriptures, all so we can live godly lives and engage our culture for Christ.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a href="https://podcasts.apple.com/us/podcast/renew-northwest-podcast/id1724059937" target="_blank" rel="noopener noreferrer" className="font-subheading-work text-[0.85rem] font-semibold tracking-[0.1em] uppercase text-paper bg-charcoal px-6 py-3 rounded-full hover:bg-poppy transition-colors duration-300">
                                Apple Podcasts
                            </a>
                            <a href="https://open.spotify.com/show/7nJqxpHfVRUE2ow7mxlEiF" target="_blank" rel="noopener noreferrer" className="font-subheading-work text-[0.85rem] font-semibold tracking-[0.1em] uppercase text-charcoal border border-charcoal/30 px-6 py-3 rounded-full hover:bg-charcoal/5 transition-colors duration-300">
                                Spotify
                            </a>
                            <a href="https://www.buzzsprout.com/2257544" target="_blank" rel="noopener noreferrer" className="font-subheading-work text-[0.85rem] font-semibold tracking-[0.1em] uppercase text-charcoal border border-charcoal/30 px-6 py-3 rounded-full hover:bg-charcoal/5 transition-colors duration-300">
                                RSS Feed
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ Featured Articles Section ═══════════════ */}
            <section className="py-24 px-6 md:px-12 lg:px-24 bg-navy text-paper">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-paper/20 pb-8">
                        <div>
                            <h4 className="font-subheading-work text-[0.85rem] font-bold tracking-[0.25em] uppercase text-gold/90 mb-3">
                                Latest Writing
                            </h4>
                            <h2 className="font-heading text-4xl md:text-5xl font-semibold">
                                Featured Articles
                            </h2>
                        </div>
                        <a href="https://christchurchpress.com" target="_blank" rel="noopener noreferrer" className="mt-6 md:mt-0 font-subheading-work text-[0.9rem] font-medium tracking-[0.1em] uppercase text-paper/80 hover:text-gold transition-colors duration-300 flex items-center gap-2">
                            View All Articles <span className="text-xl">&rarr;</span>
                        </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Article 1 */}
                        <a href="https://christchurchpress.com/faith-life/some-thoughts-on-mentorship" target="_blank" rel="noopener noreferrer" className="group flex flex-col h-full bg-paper/5 rounded-lg p-8 hover:bg-paper/10 transition-colors duration-300">
                            <span className="font-subheading-work text-[0.7rem] font-bold tracking-[0.2em] uppercase text-gold/80 mb-4 inline-block">
                                Faith + Life
                            </span>
                            <h3 className="font-heading text-2xl font-semibold mb-3 group-hover:text-gold transition-colors duration-300">
                                Some Thoughts on Mentorship
                            </h3>
                            <p className="font-body-crimson text-paper/70 line-clamp-3 mb-6 flex-1">
                                You may know that for the last couple of years, our church leadership has been giving attention to leadership development. One expression of that is that we have been trying to pair emerging leaders with mentors for their continued development...
                            </p>
                            <div className="font-subheading-work text-[0.85rem] text-paper/60 border-t border-paper/10 pt-4 mt-auto flex justify-between items-center">
                                <span>Matt Boffey</span>
                                <span className="group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
                            </div>
                        </a>

                        {/* Article 2 */}
                        <a href="https://christchurchpress.com/ministry-mission/a-resource-for-the-season-of-lent" target="_blank" rel="noopener noreferrer" className="group flex flex-col h-full bg-paper/5 rounded-lg p-8 hover:bg-paper/10 transition-colors duration-300">
                            <span className="font-subheading-work text-[0.7rem] font-bold tracking-[0.2em] uppercase text-gold/80 mb-4 inline-block">
                                Ministry + Mission
                            </span>
                            <h3 className="font-heading text-2xl font-semibold mb-3 group-hover:text-gold transition-colors duration-300">
                                A Resource for the Season of Lent
                            </h3>
                            <p className="font-body-crimson text-paper/70 line-clamp-3 mb-6 flex-1">
                                A few months ago our church released a new tool to help our congregation read God’s word and pray together throughout the week. It’s an app called The Reformed Hours of Prayer...
                            </p>
                            <div className="font-subheading-work text-[0.85rem] text-paper/60 border-t border-paper/10 pt-4 mt-auto flex justify-between items-center">
                                <span>Nate Walker</span>
                                <span className="group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
                            </div>
                        </a>

                        {/* Article 3 */}
                        <a href="https://christchurchpress.com/christ-and-culture/4-views-of-the-millennium" target="_blank" rel="noopener noreferrer" className="group flex flex-col h-full bg-paper/5 rounded-lg p-8 hover:bg-paper/10 transition-colors duration-300">
                            <span className="font-subheading-work text-[0.7rem] font-bold tracking-[0.2em] uppercase text-gold/80 mb-4 inline-block">
                                Christ + Culture
                            </span>
                            <h3 className="font-heading text-2xl font-semibold mb-3 group-hover:text-gold transition-colors duration-300">
                                4 Views of the Millennium
                            </h3>
                            <p className="font-body-crimson text-paper/70 line-clamp-3 mb-6 flex-1">
                                As I continue this series on eschatology, I would be completely remiss if I neglected the topic of the Millennium. Few debates on eschatology have generated as much heated debate and controversy as the question of how we are to understand Revelation 20...
                            </p>
                            <div className="font-subheading-work text-[0.85rem] text-paper/60 border-t border-paper/10 pt-4 mt-auto flex justify-between items-center">
                                <span>Jon Brodhagen</span>
                                <span className="group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            {/* ═══════════════ Reformed Hours of Prayer App ═══════════════ */}
            <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#E0D9CB] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-charcoal/5 skew-x-12 translate-x-1/2" />
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10 text-center md:text-left">
                    <div className="w-full md:w-2/3">
                        <h4 className="font-subheading-work text-[0.85rem] font-bold tracking-[0.25em] uppercase text-poppy/90 mb-4">
                            The App Is Here
                        </h4>
                        <h2 className="font-heading text-4xl md:text-5xl font-semibold text-charcoal mb-6">
                            Reformed Hours of Prayer
                        </h2>
                        <p className="font-body-crimson text-lg md:text-xl text-earth/80 leading-relaxed mb-8 max-w-2xl">
                            Organize your communal and personal life around seven hours of prayer, rotating new prayers each day of the month.
                        </p>
                        <a href="https://christchurchpress.com/reformed-hours-of-prayer" target="_blank" rel="noopener noreferrer" className="inline-block font-subheading-work text-[0.85rem] font-semibold tracking-[0.1em] uppercase text-paper bg-brand px-8 py-4 rounded-full hover:bg-brand/90 transition-all duration-300 shadow-xl shadow-brand/20">
                            Discover the App
                        </a>
                    </div>
                </div>
            </section>

        </div>
    );
}
