"use client";

import Image from "next/image";
import Header from "@/components/Header";

export default function DiscipleshipGroupsPage() {
    return (
        <>
            <Header variant="ministry" />

            <main className="min-h-screen bg-paper pt-[84px]">
                {/* Hero Section */}
                <div className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/discipleship_hero.png"
                            alt="Discipleship Groups"
                            fill
                            className="object-cover object-center opacity-70"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/20 to-charcoal/40" />
                    </div>
                    <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
                        <h1 className="font-heading text-4xl md:text-6xl text-paper tracking-[0.05em] mb-6 drop-shadow-lg text-center">Discipleship Groups</h1>
                        <p className="font-subheading-work text-paper/80 tracking-widest uppercase text-sm md:text-base font-semibold text-center">Follow me, and I will make you fishers of men.</p>
                    </div>
                </div>

                {/* Content Section */}
                <div className="bg-paper text-charcoal py-20 px-6 md:px-12">
                    <div className="max-w-4xl mx-auto space-y-16">

                        <section className="space-y-6">
                            <h2 className="font-heading text-3xl text-poppy">The Call</h2>
                            <p className="font-body-crimson text-xl leading-relaxed text-earth/85 whitespace-pre-line">
                                &quot;...And Jesus said to them, &apos;Follow me, and I will make you fishers of men.&apos; (Matt 4:19)
                                Discipleship is an organic combination of the above call. It involves imitating Jesus, being transformed by him, and taking up his mission as our own.
                            </p>
                        </section>
                        <div className="w-full h-px bg-charcoal/10" />

                        <section className="space-y-6">
                            <h2 className="font-heading text-3xl text-poppy">About Groups</h2>
                            <p className="font-body-crimson text-xl leading-relaxed text-earth/85 whitespace-pre-line">
                                Discipleship Groups (DGs) are designed to help facilitate this journey. DGs are gender-specific groups of 5 or 6 that commit to study God&apos;s word and truth, pursue spiritual disciplines, encourage one another, and spur one another on toward love and good works.
                            </p>
                        </section>
                        <div className="w-full h-px bg-charcoal/10" />

                        <section className="space-y-6">
                            <h2 className="font-heading text-3xl text-poppy">Commitment</h2>
                            <p className="font-body-crimson text-xl leading-relaxed text-earth/85 whitespace-pre-line">
                                Discipleship Groups are year-long commitments, with signups occurring every summer before launching in mid-September.
                            </p>
                        </section>
                        <div className="w-full h-px bg-charcoal/10" />

                    </div>
                </div>
            </main>
        </>
    );
}
