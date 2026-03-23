"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

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

export default function ChildrensMinistryPage() {
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
            <div className={`fixed inset-0 z-[70] transition-opacity duration-300 ${ministriesOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-md" onClick={() => setMinistriesOpen(false)} />
                <div className={`absolute top-0 right-0 h-full w-[420px] max-w-[90vw] bg-paper shadow-2xl flex flex-col transition-transform duration-500 ease-out ${ministriesOpen ? "translate-x-0" : "translate-x-full"}`}>
                    <div className="flex items-center justify-between px-8 pt-8 pb-6">
                        <h2 className="font-heading text-[1.4rem] text-charcoal tracking-[0.08em]">Ministries</h2>
                        <button onClick={() => setMinistriesOpen(false)} className="w-10 h-10 flex items-center justify-center text-charcoal/50 hover:text-charcoal transition-colors text-xl" aria-label="Close ministries">✕</button>
                    </div>
                    <div className="mx-8 h-px bg-charcoal/10" />
                    <div className="flex-1 overflow-y-auto px-8 py-8 flex flex-col gap-8">
                        {Object.entries(MINISTRIES).map(([category, items]) => (
                            <div key={category}>
                                <h4 className="font-subheading-work text-[0.65rem] font-bold tracking-[0.25em] uppercase text-poppy/80 mb-4">{category}</h4>
                                <ul className="space-y-3">
                                    {items.map((m) => (
                                        <li key={m}>
                                            <Link
                                                href={({ "Men's Ministry": "/ccbmen", "Women's Ministry": "/ccbwomen", "Discipleship Groups": "/discipleship-groups", "Home Fellowships": "/home-fellowships", "Children's Ministry": "/childrens-ministry", "Youth Ministry": "/youth", "Trinity Classical School": "https://www.trinitybham.org", "Missionaries": "/missions-blog", "Christ Church Press": "https://www.christchurchpress.com", "Hospitality Ministry": "/hospitality-ministry-1" } as Record<string, string>)[m] || "/"}
                                                onClick={() => setMinistriesOpen(false)}
                                                className="font-body-crimson text-[1.05rem] text-charcoal/70 hover:text-charcoal transition-colors duration-200 block py-0.5"
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
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-paper ${scrolled ? "shadow-md" : ""}`}>
                <div className="pl-4 pr-8 sm:px-6 lg:px-10 flex items-center justify-between h-[84px]">
                    <Link href="/" className="flex items-center group animate-nav-in">
                        <div className="relative w-auto aspect-[5/2] transition-all duration-500" style={{ height: scrolled ? "70px" : "100px" }}>
                            <Image src="/church-logo.png" alt="Christ Church Bellingham logo" fill className="object-contain" />
                        </div>
                    </Link>
                    <nav className={`hidden md:flex flex-col items-end justify-center transition-opacity duration-300 ${ministriesOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                        <div className="flex items-center gap-10">
                            {NAV_ITEMS.map((label, i) => {
                                if (label === "Ministries") {
                                    return (
                                        <button key={label} onClick={() => setMinistriesOpen(true)} className="font-subheading-work text-[0.9rem] font-medium tracking-[0.18em] capitalize transition-colors duration-500 animate-nav-in text-earth hover:text-charcoal" style={{ animationDelay: `${0.1 + i * 0.08}s` }}>
                                            {label}
                                        </button>
                                    );
                                }
                                return (
                                    <Link key={label} href={label === "Visit Us" ? "/visit" : `/#${label.toLowerCase().replace(/\s+/g, "-")}`} className="font-subheading-work text-[0.9rem] font-medium tracking-[0.18em] capitalize transition-colors duration-500 animate-nav-in text-earth hover:text-charcoal" style={{ animationDelay: `${0.1 + i * 0.08}s` }}>
                                        {label}
                                    </Link>
                                );
                            })}
                            <Link href="/doctrine" className="font-subheading-work text-[0.9rem] font-medium tracking-[0.18em] capitalize transition-colors duration-500 animate-nav-in text-earth hover:text-charcoal">Doctrine</Link>
                            <Link href="/#give" className="font-subheading-work text-[0.9rem] font-semibold tracking-[0.18em] capitalize transition-colors duration-500 animate-nav-in text-earth hover:text-charcoal">Give</Link>
                        </div>
                    </nav>
                    <button className={`md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] transition-opacity duration-300 ${ministriesOpen ? "opacity-0 pointer-events-none" : ""}`} onClick={() => setMenuOpen(true)}>
                        <span className="block w-6 h-[2px] rounded bg-charcoal transition-colors duration-500" />
                        <span className="block w-6 h-[2px] rounded bg-charcoal transition-colors duration-500" />
                        <span className="block w-6 h-[2px] rounded bg-charcoal transition-colors duration-500" />
                    </button>
                </div>
            </header>

            {/* ═══════════════ Mobile Sidebar ═══════════════ */}
            <div className={`fixed inset-0 z-[60] transition-opacity duration-300 md:hidden ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                <div className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
                <nav className={`absolute top-0 right-0 h-full w-64 bg-paper shadow-2xl flex flex-col transition-transform duration-300 ease-out ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
                    <div className="flex items-center justify-end h-[84px] pr-12">
                        <button onClick={() => setMenuOpen(false)} className="w-10 h-10 flex items-center justify-center text-charcoal/60 hover:text-charcoal transition-colors text-2xl">✕</button>
                    </div>
                    <div className="flex flex-col gap-2 pl-8 pr-12 pt-4">
                        {NAV_ITEMS.map((label) => {
                            if (label === "Ministries") {
                                return (
                                    <button key={label} onClick={() => { setMenuOpen(false); setMinistriesOpen(true); }} className="font-subheading-work text-[0.95rem] font-medium tracking-[0.18em] uppercase text-charcoal/80 hover:text-poppy py-3 border-b border-charcoal/10 transition-colors duration-300 text-left">
                                        {label}
                                    </button>
                                );
                            }
                            return (
                                <Link key={label} href={label === "Visit Us" ? "/visit" : `/#${label.toLowerCase().replace(/\s+/g, "-")}`} onClick={() => setMenuOpen(false)} className="font-subheading-work text-[0.95rem] font-medium tracking-[0.18em] uppercase text-charcoal/80 hover:text-poppy py-3 border-b border-charcoal/10 transition-colors duration-300">
                                    {label}
                                </Link>
                            );
                        })}
                        <Link href="/doctrine" onClick={() => setMenuOpen(false)} className="font-subheading-work text-[0.95rem] font-medium tracking-[0.18em] uppercase text-earth hover:text-charcoal py-3 border-b border-charcoal/10 transition-colors duration-300">Doctrine</Link>
                        <Link href="/#give" onClick={() => setMenuOpen(false)} className="font-subheading-work text-[0.95rem] font-semibold tracking-[0.18em] uppercase text-earth hover:text-charcoal py-3 transition-colors duration-300">Give</Link>
                    </div>
                </nav>
            </div>

            <main className="min-h-screen bg-paper pt-[84px]">
                {/* Hero Section */}
                <div className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/childrens-hero.png"
                            alt="Children's Ministry"
                            fill
                            className="object-cover object-center opacity-70"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/20 to-charcoal/40" />
                    </div>
                    <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
                        <h1 className="font-heading text-4xl md:text-6xl text-charcoal tracking-[0.05em] mb-6 drop-shadow-lg">
                            CCB Kids
                        </h1>
                        <p className="font-subheading-work text-earth hover:text-charcoal tracking-widest uppercase text-sm md:text-base font-semibold">
                            Partnering with parents to teach children the gospel
                        </p>
                    </div>
                </div>

                {/* Content Section */}
                <div className="bg-paper text-charcoal py-20 px-6 md:px-12">
                    <div className="max-w-4xl mx-auto space-y-16">

                        {/* Mission */}
                        <section className="space-y-6">
                            <h2 className="font-heading text-3xl text-poppy">Our Mission</h2>
                            <p className="font-body-crimson text-xl leading-relaxed text-earth/85">
                                The Children&apos;s Ministry at Christ Church Bellingham seeks to glorify God by partnering with parents to teach children the gospel of Jesus Christ, how to live a gospel-centered life, and how to proclaim the gospel to the world.
                            </p>
                            <p className="font-body-crimson text-xl leading-relaxed text-earth/85">
                                We believe that Scripture includes children as a part of the church body. Therefore, our mission is to partner with families to teach kids how to love God, love one another, and love the world. Our Sunday school classes are designed to be intentional times of discipleship where children learn from safe and trusted adults, in a way they can receive and understand. Our kids want to know Jesus and have fun doing it!
                            </p>
                        </section>

                        <div className="w-full h-px bg-charcoal/10" />

                        {/* What to Expect */}
                        <section className="space-y-6">
                            <h2 className="font-heading text-3xl text-poppy">What to expect on Sundays</h2>
                            <p className="font-body-crimson text-lg leading-relaxed text-earth/85">
                                Our nursery runs the entire length of the 9 AM service. Parents are welcome to drop off babies and toddlers at the nursery classroom at any point during the service. During the 9 am service, children ages 3–7 worship with the congregation for the first 15 minutes of the service. They are released for an age-appropriate Bible lesson shortly before the sermon. Parents walk their children out to the lobby to meet their classroom teachers and pick them up from their classrooms in the TCS building after the sermon.
                            </p>
                            <p className="font-body-crimson text-lg leading-relaxed text-earth/85">
                                First-time parents, please come to the Connect Desk, and a Service Producer will help you fill out a registration card with your name, your cell phone numbers, the child/ren&apos;s name, any allergies the child may have, and any persons NOT permitted to pick up your child/ren. A Service Producer is scheduled at every CCB Kids class to assist parents in check-in and check-out. Children will be released to their parents or approved guardians only. Parents are asked to assist their children with using the bathroom before the service, and will be notified if a baby needs a diaper change during the service.
                            </p>

                            <div className="grid md:grid-cols-2 gap-10 mt-10">
                                <div className="bg-charcoal/5 p-8 rounded-lg border border-charcoal/10">
                                    <h3 className="font-heading text-xl text-charcoal mb-4">9 AM Service</h3>
                                    <ul className="space-y-4 font-body-crimson text-lg text-earth/85">
                                        <li className="flex items-start">
                                            <span className="text-brand mr-3">●</span>
                                            <span><strong>Nursery:</strong> (6 months–2 years) 8:45–10:00 am: TCS Building Fellowship Hall</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-brand mr-3">●</span>
                                            <span><strong>3–4-year-old class:</strong> 9:15–10:00 am: TCS 1st-grade classroom (TCS Building)</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-brand mr-3">●</span>
                                            <span><strong>5–7-year-old class:</strong> 9:15–10:00 am: TCS 2nd-grade classroom (TCS Building)</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-charcoal/5 p-8 rounded-lg border border-charcoal/10">
                                    <h3 className="font-heading text-xl text-charcoal mb-4">11 AM Service</h3>
                                    <p className="font-body-crimson text-lg text-earth/85">
                                        We do not offer nursery or children&apos;s classes during this service.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <div className="w-full h-px bg-charcoal/10" />

                        {/* Curriculum */}
                        <section className="space-y-6 flex flex-col items-center text-center max-w-2xl mx-auto">
                            <h2 className="font-heading text-3xl text-poppy">Curriculum and Safety</h2>
                            <p className="font-body-crimson text-lg leading-relaxed text-earth/85">
                                We use <a href="https://www.thebiggeststory.com/" className="text-brand hover:underline font-medium" target="_blank" rel="noopener noreferrer">The Biggest Story Curriculum</a> by Kevin DeYoung in our 3-4-year-old and 5-7-year-old classes. Safety is our top priority, and we invite you to consult our <a href="https://docs.google.com/document/d/1qBcBe2s7SMP5Hj1Wefp6Cav9ipmZzxHc_DSk_i7rkLM/edit?usp=sharing" className="text-brand hover:underline font-medium" target="_blank" rel="noopener noreferrer">CCB Kids training handbook</a> and <a href="https://docs.google.com/document/d/12L0BGd1MYwONybga-BfcIPYsVuRRwvuioaBmMdwqys0/edit?usp=sharing" className="text-brand hover:underline font-medium" target="_blank" rel="noopener noreferrer">child protection policy</a> to learn about our safety policies and procedures.
                            </p>
                        </section>

                    </div>
                </div>
            </main>
        </>
    );
}
