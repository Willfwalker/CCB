"use client";

import Image from "next/image";
import Header from "@/components/Header";

export default function WomensMinistryPage() {
    return (
        <>
            <Header variant="ministry" />

            <main className="min-h-screen bg-paper pt-[84px]">
                {/* Hero Section */}
                <div className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/womens_ministry_hero.png"
                            alt="Women's Ministry"
                            fill
                            className="object-cover object-center opacity-70"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/20 to-charcoal/40" />
                    </div>
                    <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
                        <h1 className="font-heading text-4xl md:text-6xl text-paper tracking-[0.05em] mb-6 drop-shadow-lg text-center">Women&apos;s Ministry</h1>
                        <p className="font-subheading-work text-paper/80 tracking-widest uppercase text-sm md:text-base font-semibold text-center">Promoting a culture of holiness and grace</p>
                    </div>
                </div>

                {/* Content Section */}
                <div className="bg-paper text-charcoal py-20 px-6 md:px-12">
                    <div className="max-w-4xl mx-auto space-y-16">

                        <section className="space-y-6">
                            <h2 className="font-heading text-3xl text-poppy">Our Mission</h2>
                            <p className="font-body-crimson text-xl leading-relaxed text-earth/85 whitespace-pre-line">
                                CCB Women&apos;s Ministry aspires to promote a culture of holiness and grace among the women of Christ Church Bellingham, such that the mind, affections, and will of women in our church are shaped by and rooted in God&apos;s word.
                            </p>
                        </section>
                        <div className="w-full h-px bg-charcoal/10" />

                        <section className="space-y-6">
                            <h2 className="font-heading text-3xl text-poppy">Our Goal</h2>
                            <p className="font-body-crimson text-xl leading-relaxed text-earth/85 whitespace-pre-line">
                                We seek to equip women in being theologically sound by facilitating scripturally based, grace-filled gatherings, cultivating a community that encourages and supports one another in all seasons of life.
                            </p>
                        </section>
                        <div className="w-full h-px bg-charcoal/10" />

                        <section className="space-y-6">
                            <h2 className="font-heading text-3xl text-poppy">Upcoming Events</h2>
                            <p className="font-body-crimson text-xl leading-relaxed text-earth/85 whitespace-pre-line">
                                Women&apos;s Brunch: Saturday, March 7th 9:00 - 11:30 am. Join us for our annual Spring Brunch! Our theme this year is Spiritual Friendship.
                            </p>
                        </section>
                        <div className="w-full h-px bg-charcoal/10" />

                    </div>
                </div>
            </main>
        </>
    );
}
