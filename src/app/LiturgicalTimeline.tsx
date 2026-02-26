"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, DrawSVGPlugin);

/* ─── Data ─────────────────────────────────────────── */

interface LiturgicalStation {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  scriptureRef?: string;
  extendedDetails?: string;
  extendedVerses?: string[];
}

const STATIONS: LiturgicalStation[] = [
  {
    id: 1,
    title: "Call to Worship",
    subtitle: "Invocation",
    description:
      "God initiates. Our worship begins not with our effort but with His summons — a word from Scripture calling us out of the world and into His presence.",
    scriptureRef: "Psalm 95:6–7",
    extendedDetails: "In the Call to Worship, we are reminded that Christianity is a religion of revelation. We do not find God; He finds us. The minister speaks on behalf of God, calling the congregation to assemble. This echoes the gathering of Israel at Mount Sinai and anticipates the great gathering of the redeemed at the end of the age. \n\n Furthermore, the Call to Worship establishes the posture of the entire service: God speaks, and we respond. Throughout the week, we are bombarded by competing voices calling us to worship our careers, our comforts, and our own desires. The divine summons cuts through this noise, reorienting our hearts back to their true north. It is an act of spiritual warfare, a declaration that the Lord reigns and that all other allegiances are secondary. \n\n Historically, this element has always marked Christian gatherings. From the earliest centuries, believers understood that they were not merely having a meeting, but were being summoned into an audience with the King. This requires a profound shift in mindset. We are not consumers evaluating a product, but subjects responding to a sovereign summons. \n\n This is why we stand during this portion of the service. Standing is a physical expression of a spiritual reality—alertness, respect, and readiness. Just as subjects stand when a ruler enters the room, we stand when the King of the universe issues His call.",
    extendedVerses: ["Hebrews 12:18-24", "Revelation 7:9-10"]
  },
  {
    id: 2,
    title: "Confessions",
    subtitle: "Corporate Confession of Sin",
    description:
      "Having entered God's holy presence, we see ourselves rightly. Together we confess our sins — not to earn forgiveness but to receive it.",
    scriptureRef: "1 John 1:9",
    extendedDetails: "True worship requires truth-telling. In the Light of God's perfect holiness, our own sin becomes undeniable. By confessing corporately, we acknowledge that we are a community of recovering sinners. We do not hide our faults, because we know the character of the God we approach.",
    extendedVerses: ["Psalm 51:1-4", "Proverbs 28:13", "James 5:16"]
  },
  {
    id: 3,
    title: "Assurance of Pardon",
    subtitle: "Words of Absolution",
    description:
      "The minister speaks God's own promise: your sins are forgiven in Christ. This is not a wish but a declaration grounded in the cross.",
    scriptureRef: "Romans 8:1",
    extendedDetails: "The Gospel is an objective reality outside of ourselves. The minister stands as a herald of this good news, authoritatively declaring that Christ has paid the penalty for every sin just confessed. Hearing this week after week trains our hearts to rest in grace rather than our own performance.",
    extendedVerses: ["Colossians 2:13-14", "Micah 7:18-19"]
  },
  {
    id: 4,
    title: "Song of Ascent",
    subtitle: "Hymn of Praise",
    description:
      "Forgiven and restored, the congregation rises in song. Like the pilgrims ascending to Jerusalem, we lift our voices.",
    scriptureRef: "Psalm 122:1",
    extendedDetails: "Joy is the necessary response to grace. Our singing is not merely emotional expression; it is deeply formative. Through melody and poetry, we embed the truths of the Gospel into our memories and affections, encouraging one another as we sing.",
    extendedVerses: ["Ephesians 5:19", "Colossians 3:16"]
  },
  {
    id: 5,
    title: "Sermon",
    subtitle: "The Preaching of God's Word",
    description:
      "The heart of the service. God speaks to His people through the faithful exposition of Scripture.",
    scriptureRef: "Romans 10:17",
    extendedDetails: "Preaching is the primary means God uses to awaken the dead and sanctify the living. It is not a lecture or a motivational speech, but an encounter with the living Christ through the medium of a human messenger explaining the divinely inspired text.",
    extendedVerses: ["2 Timothy 4:1-2", "Nehemiah 8:8", "1 Thessalonians 2:13"]
  },
  {
    id: 6,
    title: "Profession of Faith",
    subtitle: "The Creed",
    description:
      "Having heard God's Word, we respond with the ancient words of the Church. Reciting the Creed together, we confess our shared belief.",
    scriptureRef: "Romans 10:9–10",
    extendedDetails: "The Christian faith was not invented yesterday. By confessing a historic creed (such as the Apostles' or Nicene Creed), we link arms with the saints across the centuries and around the globe, anchoring our lives in the core tenets of historical orthodoxy.",
    extendedVerses: ["1 Corinthians 15:3-4", "Jude 1:3"]
  },
  {
    id: 7,
    title: "Prayer for the World and Church",
    subtitle: "Pastoral Intercession",
    description:
      "As a royal priesthood, we intercede. The pastor leads prayers for the suffering, the lost, the nations, and the Church.",
    scriptureRef: "1 Timothy 2:1–2",
    extendedDetails: "We look beyond our own walls and our own needs. In pastoral prayer, the congregation exercises its priestly role by bringing the tears, fears, and desperate needs of the local community and the global world before a sovereign, merciful Father.",
    extendedVerses: ["Philippians 4:6", "Ephesians 6:18"]
  },
  {
    id: 8,
    title: "Lord's Supper",
    subtitle: "The Holy Communion",
    description:
      "Christ invites us to His table. In bread and wine, we receive and proclaim His body broken and blood shed.",
    scriptureRef: "1 Corinthians 11:26",
    extendedDetails: "The Eucharist is the family meal of the new covenant. It uniquely engages our physical senses—taste, touch, sight, and smell—to reassure us of Christ's spiritual presence and His future return to feast with us in the renewed creation.",
    extendedVerses: ["Matthew 26:26-28", "John 6:53-58", "Revelation 19:9"]
  },
  {
    id: 9,
    title: "Benediction",
    subtitle: "The Sending",
    description:
      "God has the last word. The minister raises his hands and speaks God's blessing over His people, sending us into the world.",
    scriptureRef: "Numbers 6:24–26",
    extendedDetails: "We are blessed in order to be a blessing. The benediction is not simply a dismissal, but an impartation of divine grace and peace meant to empower us for our weekly liturgy of loving our neighbors and serving our city.",
    extendedVerses: ["2 Corinthians 13:14", "Hebrews 13:20-21"]
  },
];

const STATION_COUNT = STATIONS.length;

/* ─── Path generation ──────────────────────────────── */

function buildWindingPath(
  w: number,
  isMobile: boolean,
  padTop: number,
  stepY: number
): { d: string; stops: { x: number; y: number; side: "left" | "right" | "center" }[] } {
  const stops: { x: number; y: number; side: "left" | "right" | "center" }[] = [];

  const leftX = isMobile ? w * 0.15 : w * 0.25;
  const rightX = isMobile ? w * 0.85 : w * 0.75;

  stops.push({ x: w / 2, y: padTop + 160, side: "center" });

  for (let i = 0; i < STATION_COUNT; i++) {
    const isRight = i % 2 === 0;

    stops.push({
      x: isRight ? rightX : leftX,
      y: padTop + stepY * (i + 1),
      side: isRight ? "right" : "left",
    });
  }

  // Build SVG path with smooth, wide S-curves between stops
  let d = `M ${stops[0].x} ${stops[0].y}`;

  const firstReal = stops[1];
  const midY0 = (stops[0].y + firstReal.y) / 2;
  d += ` C ${stops[0].x} ${midY0}, ${firstReal.x} ${midY0}, ${firstReal.x} ${firstReal.y}`;

  for (let i = 2; i < stops.length; i++) {
    const prev = stops[i - 1];
    const curr = stops[i];
    const midY = (prev.y + curr.y) / 2;

    d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
  }

  return { d, stops };
}

/* ─── Component ────────────────────────────────────── */

export default function LiturgicalTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackContainerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const drawnPathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const introTextRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedStation, setSelectedStation] = useState<LiturgicalStation | null>(null);
  const [pathData, setPathData] = useState<{
    d: string;
    stops: { x: number; y: number; side: "left" | "right" | "center" }[];
    height: number;
    stepY: number;
    w: number;
  } | null>(null);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Generate path once viewport is available
  const generatePath = useCallback(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const w = vp.offsetWidth;
    const h = vp.offsetHeight;

    // Gaps = 1.2x to 1.5x viewport height to stretch it way out
    const stepY = isMobile ? h * 1.2 : h * 1.5;
    const padTop = h / 2;
    const padBottom = h / 2;

    const computedHeight = padTop + padBottom + stepY * STATION_COUNT;
    const data = buildWindingPath(w, isMobile, padTop, stepY);
    setPathData({ ...data, height: computedHeight, stepY, w });
  }, [isMobile]);

  useEffect(() => {
    // Generate initial path, with a slight delay to ensure layout shifts are done
    setTimeout(generatePath, 100);
  }, [generatePath]);

  // GSAP animations
  useGSAP(
    () => {
      if (!pathData || !containerRef.current || !viewportRef.current || !trackContainerRef.current) return;
      if (!drawnPathRef.current || !dotRef.current) return;

      const vp = viewportRef.current;
      const trackContainer = trackContainerRef.current;
      const drawnPath = drawnPathRef.current;
      const dot = dotRef.current;
      const { stops, stepY } = pathData;

      // Position the dot at the first stop initially, hidden
      gsap.set(dot, { x: stops[0].x - 9, y: stops[0].y - 9, opacity: 0 });

      // Initialize drawn path as completely hidden
      gsap.set(drawnPath, { drawSVG: "0% 0%" });

      // Start the track container at y=0 (which displays the top of the SVG)
      gsap.set(trackContainer, { y: 0 });

      // Hide all accordions
      cardRefs.current.forEach((card) => {
        if (card) gsap.set(card, { height: 0, opacity: 0 });
      });

      if (introTextRef.current) {
        gsap.set(introTextRef.current, { opacity: 0 });
      }

      // Master timeline
      const master = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: vp,
          start: "top top",
          end: "bottom bottom",
          scrub: 2.0, // smoother and slightly slower scrubbing to catch up
          onRefresh: () => {
            // Recalculate path on resize within the timeline to keep it updated
            const w = vp.offsetWidth;
            const h = vp.offsetHeight;
            const sy = window.innerWidth < 768 ? h * 1.2 : h * 1.5;
            const newData = buildWindingPath(w, window.innerWidth < 768, h / 2, sy);
            if (drawnPath) {
              drawnPath.setAttribute("d", newData.d);
            }
          },
        },
      });

      let timeCursor = 0;

      // Phase 0: Intro text
      if (introTextRef.current) {
        // Text fades in
        master.to(introTextRef.current, { opacity: 1, duration: 1, ease: "power2.out" }, timeCursor);
        timeCursor += 1;

        master.to({}, { duration: 0.5 }, timeCursor); // read hold
        timeCursor += 0.5;

        // Dot fades in
        master.to(dot, { opacity: 1, duration: 1, ease: "power2.out" }, timeCursor);
        timeCursor += 1;

        // Both hold slightly, then text fades out
        master.to({}, { duration: 0.5 }, timeCursor); // hold
        timeCursor += 0.5;
        master.to(introTextRef.current, { opacity: 0, duration: 1, ease: "power2.in" }, timeCursor);
        timeCursor += 1;
      } else {
        master.to(dot, { opacity: 1, duration: 1 }, timeCursor);
        timeCursor += 1;
      }

      let currentProgress = 0;
      // Tail length in percentage (very small, creates a comet effect)
      const TAIL_LENGTH = 12;

      // Build per-station animations
      for (let i = 0; i < STATION_COUNT; i++) {
        const card = cardRefs.current[i];
        const stopIndex = i + 1; // 1 to STATION_COUNT

        // Fast move to just before the center of the station
        const fastTargetProgress = (stopIndex - 0.1) / STATION_COUNT;

        // Move to the exact station with a slower transition speed
        master.to(trackContainer, { y: -(stepY * (stopIndex - 0.1)), duration: 3.5, ease: "power1.inOut" }, timeCursor);
        master.to(dot, {
          motionPath: {
            path: drawnPath, align: drawnPath, alignOrigin: [0.5, 0.5],
            start: currentProgress, end: fastTargetProgress,
          },
          duration: 3.5, ease: "power1.inOut"
        }, timeCursor);
        master.to(drawnPath, {
          drawSVG: `${Math.max(0, fastTargetProgress * 100 - TAIL_LENGTH)}% ${fastTargetProgress * 100}%`,
          duration: 3.5, ease: "power1.inOut"
        }, timeCursor);

        timeCursor += 3.5;

        // Phase 2: Pulse dot + open accordion "table", while continuing to move very slowly over duration 2
        const slowTargetProgress = Math.min(1, (stopIndex + 0.15) / STATION_COUNT);

        if (card) {
          // Bring the table expansion start forward by 1.5s so it starts revealing while still tracking fast
          const tableRevealTime = timeCursor - 1.5;

          master.to(dot, { scale: 1.5, duration: 0.15, ease: "power2.out" }, tableRevealTime);
          master.to(card, { height: "auto", opacity: 1, duration: 0.8, ease: "power2.out" }, tableRevealTime);

          // Slow continuous movement through the station
          master.to(trackContainer, { y: -(stepY * (stopIndex + 0.15)), duration: 2.2, ease: "none" }, timeCursor);
          master.to(dot, {
            motionPath: {
              path: drawnPath, align: drawnPath, alignOrigin: [0.5, 0.5],
              start: fastTargetProgress, end: slowTargetProgress,
            },
            duration: 2.2, ease: "none"
          }, timeCursor);
          master.to(drawnPath, {
            drawSVG: `${Math.max(0, slowTargetProgress * 100 - TAIL_LENGTH)}% ${slowTargetProgress * 100}%`,
            duration: 2.2, ease: "none"
          }, timeCursor);

          timeCursor += 2.2;

          // Close the accordion + shrink dot before moving rapidly to the next
          if (i < STATION_COUNT - 1) {
            master.to(card, { height: 0, opacity: 0, duration: 0.3, ease: "power2.inOut" }, timeCursor);
            master.to(dot, { scale: 1, duration: 0.15, ease: "power2.inOut" }, timeCursor);
            timeCursor += 0.3;
          }
        }

        currentProgress = slowTargetProgress;
      }

      // Handle resize
      const onResize = () => {
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
      };
    },
    {
      scope: sectionRef,
      dependencies: [pathData],
      revertOnUpdate: true, // cleans up on re-renders
    }
  );

  // Calculate accordion positions relative to the trackContainer length
  const getCardStyle = (index: number): React.CSSProperties => {
    if (!pathData) return {};
    const stop = pathData.stops[index + 1];
    const isRight = stop.side === "right";
    const cardWidth = isMobile ? 240 : 380;
    const edgePadding = 16;

    if (isMobile) {
      if (isRight) {
        // Dot on right, card on left — align to left edge
        return {
          left: edgePadding,
          top: stop.y - 140,
          width: `${cardWidth}px`,
        };
      } else {
        // Dot on left, card on right — align to right edge
        return {
          right: edgePadding,
          top: stop.y - 140,
          width: `${cardWidth}px`,
        };
      }
    }

    // Desktop
    const leftX = pathData.w * 0.25;
    const rightX = pathData.w * 0.75;
    const oppositeX = isRight ? leftX : rightX;

    return {
      left: oppositeX,
      top: stop.y - 140,
      transform: isRight ? "translateX(-15%)" : "translateX(-85%)",
      width: `${cardWidth}px`,
    };
  };

  const containerHeight = isMobile ? "1800vh" : "2200vh"; // Very tall container for massive scrub distance

  return (
    <>
      <section ref={sectionRef} className="relative bg-paper overflow-hidden">
        {/* ── Scroll container ── */}
        <div
          ref={containerRef}
          className="liturgy-scroll-container"
          style={{ height: containerHeight }}
        >
          {/* ── Pinned viewport ── */}
          <div ref={viewportRef} className="liturgy-viewport relative w-full h-screen overflow-hidden">
            {/* Intro text */}
            <div ref={introTextRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full max-w-2xl px-6 pointer-events-none z-30">
              <p className="font-display text-2xl md:text-3xl lg:text-4xl text-charcoal leading-relaxed font-medium">
                God tells a story in the Bible, we use liturgy to be reminded of this story every week.
              </p>
            </div>

            {/* Tracking Sub-Container (moves up as you scroll) */}
            {pathData && (
              <div
                ref={trackContainerRef}
                className="absolute top-0 left-0 w-full will-change-transform"
                style={{ height: `${pathData.height}px` }}
              >
                {/* SVG winding path */}
                <svg
                  ref={svgRef}
                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                  viewBox={`0 0 ${pathData.w} ${pathData.height}`}
                  preserveAspectRatio="none"
                >
                  <defs>
                    {/* Glow filter for the comet tail */}
                    <filter id="comet-glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* 
                    Background track (hidden or very faint). 
                    The user requested to only see a small part of the line.
                    We make it completely transparent so only the comet tail is visible. 
                 */}
                  <path
                    fill="none"
                    stroke="transparent"
                    strokeWidth="2"
                  />

                  {/* Drawn-on path (Comet Tail) */}
                  <path
                    ref={drawnPathRef}
                    d={pathData.d}
                    fill="none"
                    stroke="var(--color-brand)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    filter="url(#comet-glow)"
                  />
                </svg>

                {/* Traveling dot (Comet Head) */}
                <div
                  ref={dotRef}
                  className="liturgy-dot shadow-[0_0_15px_3px_var(--color-brand)]"
                  style={{
                    position: "absolute",
                    top: 0, left: 0,
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    backgroundColor: "var(--color-brand)",
                    zIndex: 10
                  }}
                />

                {/* Station Expanding Accordions */}
                {STATIONS.map((station, index) => (
                  <div
                    key={station.id}
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    className="absolute overflow-hidden z-20 pointer-events-none"
                    style={getCardStyle(index)}
                  >
                    {/* Accordion Content Container */}
                    <div
                      onClick={() => setSelectedStation(station)}
                      className="group bg-paper border-t-[3px] border-brand rounded-b-xl shadow-[0_12px_40px_rgba(84,73,59,0.18)] p-4 md:p-8 m-2 pointer-events-auto flex flex-col items-center text-center cursor-pointer transition-transform hover:scale-[1.02] relative"
                    >
                      <span className="font-body text-[0.65rem] font-bold tracking-[0.3em] uppercase text-brand/80 pb-2">
                        Part {String(station.id).padStart(2, "0")}
                      </span>

                      <h3 className="font-display text-xl md:text-3xl font-semibold text-charcoal leading-snug">
                        {station.title}
                      </h3>

                      <p className="font-display text-xs md:text-sm italic text-earth/60 mt-1 mb-3 md:mb-4">
                        {station.subtitle}
                      </p>

                      <div className="w-12 h-px bg-sand mx-auto mb-4" />

                      <p className="font-body text-[0.85rem] md:text-[0.95rem] leading-relaxed text-earth/80">
                        {station.description}
                      </p>

                      {station.scriptureRef && (
                        <p className="font-display text-[0.8rem] italic text-brand/70 mt-5 bg-sand/20 px-4 py-1.5 rounded-full inline-block">
                          {station.scriptureRef}
                        </p>
                      )}

                      <div className="w-full flex justify-end mt-4">
                        <div className="flex items-center gap-1.5 text-earth/40 font-body text-[0.55rem] uppercase tracking-widest font-bold group-hover:text-earth/80 transition-colors">
                          <span>Read More</span>
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modal Overlay */}
      {selectedStation && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
            onClick={() => setSelectedStation(null)}
          />
          <div className="relative bg-paper border-t-[3px] border-brand rounded-xl shadow-2xl p-8 md:p-12 max-w-2xl w-full mx-auto transform transition-all animate-in fade-in zoom-in-95 duration-200 overflow-y-auto max-h-[85vh]">
            <button
              onClick={() => setSelectedStation(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-earth/60 hover:text-charcoal hover:bg-sand/30 rounded-full transition-colors text-lg"
              aria-label="Close details"
            >
              ✕
            </button>

            <div className="text-left">
              <span className="font-body text-[0.75rem] font-bold tracking-[0.3em] uppercase text-brand/80 pb-2 block">
                Part {String(selectedStation.id).padStart(2, "0")}
              </span>

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-2 mb-6">
                <div>
                  <h3 className="font-display text-3xl md:text-4xl font-semibold text-charcoal leading-snug">
                    {selectedStation.title}
                  </h3>
                  <p className="font-display text-base italic text-earth/60 mt-1">
                    {selectedStation.subtitle}
                  </p>
                </div>
              </div>

              <div className="w-16 h-px bg-sand mb-6" />

              <div className="space-y-4">
                <p className="font-body text-[1rem] leading-relaxed text-earth/90 font-medium">
                  {selectedStation.description}
                </p>

                {selectedStation.extendedDetails && (
                  <p className="font-body text-[0.95rem] leading-relaxed text-earth/80 border-l-2 border-brand/30 pl-4 py-1">
                    {selectedStation.extendedDetails}
                  </p>
                )}
              </div>

              {(selectedStation.scriptureRef || selectedStation.extendedVerses) && (
                <div className="mt-8 pt-6 border-t border-sand/50">
                  <span className="font-body text-[0.65rem] font-bold tracking-[0.2em] uppercase text-earth/50 block mb-3">
                    References
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedStation.scriptureRef && (
                      <span className="font-display text-[0.85rem] italic text-brand bg-brand/10 px-4 py-1.5 rounded-full">
                        {selectedStation.scriptureRef}
                      </span>
                    )}
                    {selectedStation.extendedVerses?.map((verse, idx) => (
                      <span key={idx} className="font-display text-[0.85rem] italic text-earth border border-sand px-4 py-1.5 rounded-full">
                        {verse}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )
      }
    </>
  );
}
