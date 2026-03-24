"use client";

import Image from "next/image";
import Header from "@/components/Header";

export default function MissionsPage() {
    return (
        <>
            <Header variant="ministry" />

            <main className="min-h-screen bg-paper pt-[84px]">
                {/* Hero Section */}
                <div className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/missionaries_hero.png"
                            alt="Missionaries"
                            fill
                            className="object-cover object-center opacity-70"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/20 to-charcoal/40" />
                    </div>
                    <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
                        <h1 className="font-heading text-4xl md:text-6xl text-paper tracking-[0.05em] mb-6 drop-shadow-lg text-center">Missionaries</h1>
                        <p className="font-subheading-work text-paper/80 tracking-widest uppercase text-sm md:text-base font-semibold text-center">Supporting church planting and discipleship globally</p>
                    </div>
                </div>

                {/* Content Section */}
                <div className="bg-paper text-charcoal py-20 px-6 md:px-12">
                    <div className="max-w-4xl mx-auto space-y-16">

                        <section className="space-y-6">
                            <h2 className="font-heading text-3xl text-poppy">The Anichkins</h2>
                            <p className="font-body-crimson text-xl leading-relaxed text-earth/85 whitespace-pre-line">
                                Church Planting in Riga, Latvia. Pray for their continued work in sharing the gospel and building up the local church in Riga.
                            </p>
                        </section>
                        <div className="w-full h-px bg-charcoal/10" />

                        <section className="space-y-6">
                            <h2 className="font-heading text-3xl text-poppy">The Davids</h2>
                            <p className="font-body-crimson text-xl leading-relaxed text-earth/85 whitespace-pre-line">
                                Training key leaders who are God-delighting servants and who will in turn equip other Cuban pastors and church leaders to be the same.
                            </p>
                        </section>
                        <div className="w-full h-px bg-charcoal/10" />

                        <section className="space-y-6">
                            <h2 className="font-heading text-3xl text-poppy">The Wadhams</h2>
                            <p className="font-body-crimson text-xl leading-relaxed text-earth/85 whitespace-pre-line">
                                Working with the tribes to establish Native churches on the Lummi and Nooksack reservations.
                            </p>
                        </section>
                        <div className="w-full h-px bg-charcoal/10" />

                    </div>
                </div>
            </main>
        </>
    );
}
