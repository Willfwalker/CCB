"use client";

import Image from "next/image";
import Header from "@/components/Header";

export interface VisitPageClientProps {
    serviceAddress?: string;
    serviceTimes?: string[];
    nurseryInfo?: string;
    bulletinLink?: string;
    sidebarImageUrl?: string;
    whatToExpect?: string;
}

export default function VisitPageClient({
    serviceAddress,
    serviceTimes,
    nurseryInfo,
    bulletinLink,
    sidebarImageUrl,
    whatToExpect,
}: VisitPageClientProps) {
    return (
        <>
            <Header variant="paper" />

            <main className="min-h-screen bg-paper pt-32 pb-24">
                <div className="mx-auto max-w-5xl px-6 lg:px-10 mt-8">

                    {/* Header */}
                    <div className="mb-16 border-l-2 border-brand pl-6">
                        <h1 className="font-heading text-5xl md:text-6xl text-charcoal font-semibold">
                            Visit Us
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Main Information */}
                        <div className="space-y-12">

                            <section>
                                <h2 className="font-heading text-3xl text-poppy font-semibold mb-6">Join Us!</h2>
                                <div className="prose prose-lg text-earth/85 font-body-crimson max-w-none">
                                    <p>
                                        Worship with us on Sundays at <strong>{serviceAddress || "2826 Birchwood Avenue"}</strong> at the following times:
                                    </p>
                                    <ul className="list-disc pl-5 my-4 space-y-2">
                                        {(serviceTimes || ["9:00 am", "11:00 am"]).map((time, i) => (
                                            <li key={i}><strong>{time}</strong></li>
                                        ))}
                                    </ul>
                                    {nurseryInfo ? (
                                        nurseryInfo.split("\n").filter(Boolean).map((p, i) => (
                                            <p key={i}>{p}</p>
                                        ))
                                    ) : (
                                        <>
                                            <p>
                                                Nursery is offered for children ages 0–2 during the entire 9am service.
                                            </p>
                                            <p>
                                                At our 9am service, children ages 3–7 are dismissed during the sermon for an age-appropriate Bible lesson and then welcomed back into the service about 40 minutes later.
                                            </p>
                                            <p>
                                                Children are always welcome to remain in either service for the entire time, and we have our foyer and nursing mother&apos;s room available to parents as well.
                                            </p>
                                        </>
                                    )}
                                    <p className="mt-4">
                                        <a href={bulletinLink || "https://christchurchbellingham.org/s/Sunday-March-1-2026.pdf"} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline font-semibold">
                                            View this Sunday&apos;s bulletin &rarr;
                                        </a>
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="font-heading text-3xl text-poppy font-semibold mb-6">Watch a Sermon Online</h2>
                                <div className="prose prose-lg text-earth/85 font-body-crimson max-w-none">
                                    <p>
                                        You can find sermons and other teachings from our pastors on <a href="https://www.youtube.com/channel/UCJPIhO8AXzBPJsrNAkoriuQ" className="text-brand hover:underline">YouTube</a>.
                                    </p>
                                    <p>
                                        Podcast more your style? Listen on <a href="https://open.spotify.com/show/7nJqxpHfVRUE2ow7mxlEiF" className="text-brand hover:underline">Spotify</a> or <a href="https://podcasts.apple.com/us/podcast/christ-church-bellingham-podcast/id1724059937" className="text-brand hover:underline">iTunes</a>.
                                    </p>
                                    <p>
                                        Also, check out <a href="https://christchurchpress.com" className="text-brand hover:underline">Christ Church Press</a> for additional teaching content from our church.
                                    </p>
                                </div>
                            </section>

                        </div>

                        {/* Sidebar Area: Image + What to expect */}
                        <div className="space-y-8 h-fit">
                            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                                <Image
                                    src={sidebarImageUrl || "/dad_teaching.png"}
                                    alt="Teaching at Christ Church Bellingham"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="bg-navy/5 p-8 rounded-lg">
                                <section>
                                    <h2 className="font-heading text-3xl text-charcoal font-semibold mb-6">What to expect</h2>
                                    <div className="prose prose-lg text-earth/85 font-body-crimson space-y-4">
                                        <p>
                                            {whatToExpect || 'Though we observe historic church traditions, we are definitely a \u201cBellingham church.\u201d Dress is casual. The music is eclectic Americana folk. Our manner is informal but sincere. Expect both joy and gravity as we approach the Almighty God.'}
                                        </p>
                                        <p className="font-semibold text-charcoal pt-4 border-t border-brand/20">
                                            We hope you come for a visit!
                                        </p>
                                    </div>
                                </section>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </>
    );
}
