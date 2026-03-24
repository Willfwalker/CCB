"use client";

import Image from "next/image";
import Header from "@/components/Header";

export default function ChildrensMinistryPage() {
    return (
        <>
            <Header variant="ministry" />

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
                        <p className="font-subheading-work text-earth tracking-widest uppercase text-sm md:text-base font-semibold">
                            Partnering with parents to teach children the gospel
                        </p>
                    </div>
                </div>

                {/* Content Section */}
                <div className="bg-paper text-charcoal py-20 px-6 md:px-12">
                    <div className="max-w-4xl mx-auto space-y-16">

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
