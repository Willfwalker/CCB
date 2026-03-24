"use client";

import Image from "next/image";
import Header from "@/components/Header";

export default function YouthMinistryPage() {
    return (
        <>
            <Header variant="ministry" />

            <main className="min-h-screen bg-paper pt-[84px] text-charcoal">
                {/* Hero Section */}
                <div className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/youth-hero.png"
                            alt="Youth Ministry"
                            fill
                            className="object-cover object-center opacity-70"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/20 to-charcoal/40" />
                    </div>
                    <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
                        <h1 className="font-heading text-4xl md:text-6xl text-charcoal tracking-[0.05em] mb-6 drop-shadow-lg">
                            CCB Youth
                        </h1>
                        <p className="font-subheading-work text-earth tracking-widest uppercase text-sm md:text-base font-semibold">
                            Making Joyful Disciples of Jesus
                        </p>
                    </div>
                </div>

                {/* Content Section */}
                <div className="bg-paper text-charcoal py-20 px-6 md:px-12">
                    <div className="max-w-4xl mx-auto space-y-16">

                        <section className="space-y-6">
                            <h2 className="font-heading text-3xl text-poppy">Our Mission</h2>
                            <p className="font-body-crimson text-xl leading-relaxed text-earth/85">
                                CCB Youth exists to partner with parents in making joyful disciples of Jesus in the world. Everything we do revolves around spiritual friendship and spiritual formation—helping teens connect and grow in their love of God and assisting parents in their discipleship.
                            </p>
                            <p className="font-body-crimson text-xl leading-relaxed text-earth/85">
                                CCB Youth is a place for the teens of Whatcom County to find community, belonging, and meaning in Jesus.
                            </p>
                        </section>

                        <div className="w-full h-px bg-charcoal/10" />

                        <section className="space-y-6">
                            <h2 className="font-heading text-3xl text-poppy">What to expect at youth group</h2>
                            <p className="font-body-crimson text-xl text-brand font-medium uppercase tracking-widest">
                                Wednesdays from 6:00–8:00 at the church
                            </p>
                            <div className="bg-charcoal/5 p-8 rounded-lg border border-charcoal/10 mt-8">
                                <ul className="space-y-6 font-body-crimson text-lg text-earth/85">
                                    <li className="flex items-start">
                                        <span className="text-brand mr-4 mt-1">●</span>
                                        <span><strong>Middle & High School:</strong> Middle school (7th–8th grade) and high school are separate, except for singing and the lesson.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-brand mr-4 mt-1">●</span>
                                        <span><strong>Activities & Discussion:</strong> We do a game or activity, have a time of singing, hear an interactive lesson from Scripture, and break into age- and gender-based small groups for further discussion.</span>
                                    </li>
                                </ul>
                            </div>
                        </section>

                        <div className="w-full h-px bg-charcoal/10" />

                        <section className="space-y-6 text-center max-w-2xl mx-auto">
                            <h2 className="font-heading text-4xl text-poppy mb-4">Join Us!</h2>
                            <p className="font-body-crimson text-xl text-earth/85">
                                We hope you&apos;ll join us! Please reach out to <strong className="text-charcoal">Chase Lindsey</strong> at <a href="mailto:youth@christchurchbellingham.org" className="text-brand hover:underline">youth@christchurchbellingham.org</a> with any questions.
                            </p>
                        </section>

                    </div>
                </div>
            </main>
        </>
    );
}
