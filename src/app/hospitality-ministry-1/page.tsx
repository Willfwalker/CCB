"use client";

import Image from "next/image";
import Header from "@/components/Header";

export default function HospitalityMinistryPage() {
    return (
        <>
            <Header variant="ministry" />

            <main className="min-h-screen bg-paper pt-[84px]">
                {/* Hero Section */}
                <div className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/hospitality_hero.png"
                            alt="Hospitality Ministry"
                            fill
                            className="object-cover object-center opacity-70"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/20 to-charcoal/40" />
                    </div>
                    <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
                        <h1 className="font-heading text-4xl md:text-6xl text-paper tracking-[0.05em] mb-6 drop-shadow-lg text-center">Hospitality Ministry</h1>
                        <p className="font-subheading-work text-paper/80 tracking-widest uppercase text-sm md:text-base font-semibold text-center">Serving and welcoming the church body</p>
                    </div>
                </div>

                {/* Content Section */}
                <div className="bg-paper text-charcoal py-20 px-6 md:px-12">
                    <div className="max-w-4xl mx-auto space-y-16">

                        <section className="space-y-6">
                            <h2 className="font-heading text-3xl text-poppy">Our Mission</h2>
                            <p className="font-body-crimson text-xl leading-relaxed text-earth/85 whitespace-pre-line">
                                The Hospitality Ministry exists to foster a welcoming environment where the love of Christ is tangibly felt through acts of service, warm greetings, and sharing meals together.
                            </p>
                        </section>
                        <div className="w-full h-px bg-charcoal/10" />

                        <section className="space-y-6">
                            <h2 className="font-heading text-3xl text-poppy">Serving the Body</h2>
                            <p className="font-body-crimson text-xl leading-relaxed text-earth/85 whitespace-pre-line">
                                Whether it&apos;s Sunday morning coffee, organizing potlucks, or helping with special events, we believe that hospitality is a powerful way to build community and show the grace of God to one another.
                            </p>
                        </section>
                        <div className="w-full h-px bg-charcoal/10" />

                        <section className="space-y-6">
                            <h2 className="font-heading text-3xl text-poppy">Get Involved</h2>
                            <p className="font-body-crimson text-xl leading-relaxed text-earth/85 whitespace-pre-line">
                                We are always looking for more volunteers to help serve. If you have a heart for welcoming others and creating a warm atmosphere, please contact us to join the team!
                            </p>
                        </section>
                        <div className="w-full h-px bg-charcoal/10" />

                    </div>
                </div>
            </main>
        </>
    );
}
