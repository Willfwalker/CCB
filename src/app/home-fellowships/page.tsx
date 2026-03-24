"use client";

import Image from "next/image";
import Header from "@/components/Header";

export default function HomeFellowshipsPage() {
    return (
        <>
            <Header variant="ministry" />

            <main className="min-h-screen bg-paper pt-[84px]">
                {/* Hero Section */}
                <div className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/home_fellowships_hero.png"
                            alt="Home Fellowships"
                            fill
                            className="object-cover object-center opacity-70"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/20 to-charcoal/40" />
                    </div>
                    <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
                        <h1 className="font-heading text-4xl md:text-6xl text-paper tracking-[0.05em] mb-6 drop-shadow-lg text-center">Home Fellowships</h1>
                        <p className="font-subheading-work text-paper/80 tracking-widest uppercase text-sm md:text-base font-semibold text-center">Attending the temple together and breaking bread in their homes</p>
                    </div>
                </div>

                {/* Content Section */}
                <div className="bg-paper text-charcoal py-20 px-6 md:px-12">
                    <div className="max-w-4xl mx-auto space-y-16">

                        <section className="space-y-6">
                            <h2 className="font-heading text-3xl text-poppy">The Vision</h2>
                            <p className="font-body-crimson text-xl leading-relaxed text-earth/85 whitespace-pre-line">
                                &quot;...And day by day, attending the temple together and breaking bread in their homes, they received their food with glad and generous hearts...&quot; (Acts 2:46-47)
                                The Bible offers a beautiful vision of the magnetic power of godly fellowship and hospitality.
                            </p>
                        </section>
                        <div className="w-full h-px bg-charcoal/10" />

                        <section className="space-y-6">
                            <h2 className="font-heading text-3xl text-poppy">Our Focus</h2>
                            <p className="font-body-crimson text-xl leading-relaxed text-earth/85 whitespace-pre-line">
                                As the early church committed themselves to sharing meals, discussing the word, and praying communally, the Lord grew his church. Home Fellowships are designed to be an extension of Sunday morning worship, with an emphasis on fellowship and community.
                            </p>
                        </section>
                        <div className="w-full h-px bg-charcoal/10" />

                        <section className="space-y-6">
                            <h2 className="font-heading text-3xl text-poppy">Get Involved</h2>
                            <p className="font-body-crimson text-xl leading-relaxed text-earth/85 whitespace-pre-line">
                                We are continuing to facilitate gathering in each others&apos; homes through Home Fellowships. A great way to get to know others in our church, especially if you are newer to the community.
                            </p>
                        </section>
                        <div className="w-full h-px bg-charcoal/10" />

                    </div>
                </div>
            </main>
        </>
    );
}
