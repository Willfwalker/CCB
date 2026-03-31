"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MINISTRIES, MINISTRY_LINKS, getNavHref } from "@/lib/navigation";

type HeaderVariant = "transparent" | "navy" | "paper" | "ministry";

interface HeaderProps {
  variant?: HeaderVariant;
}

export default function Header({ variant = "paper" }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [ministriesOpen, setMinistriesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (variant === "transparent") {
        setScrolled(window.scrollY > window.innerHeight - 100);
      } else {
        setScrolled(window.scrollY > 50);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  const isTransparent = variant === "transparent";
  const isNavy = variant === "navy";
  const isMinistry = variant === "ministry";
  const isPaper = variant === "paper";

  // Header position & background
  const position = isNavy ? "absolute" : "fixed";
  const bg = isNavy
    ? `bg-navy ${scrolled ? "shadow-md" : ""}`
    : isPaper
      ? "bg-paper shadow-md"
      : isMinistry
        ? `bg-paper ${scrolled ? "shadow-md" : ""}`
        : scrolled ? "bg-paper shadow-md" : "bg-transparent";

  // Nav link colors
  const navColor = isNavy
    ? "text-gold-dk hover:text-paper"
    : isTransparent && !scrolled
      ? "text-paper hover:text-paper/70"
      : "text-earth hover:text-charcoal";

  // Hamburger bar color
  const barColor = isNavy
    ? "bg-paper"
    : isTransparent && !scrolled
      ? "bg-paper"
      : "bg-charcoal";

  // Whether Doctrine is in the main nav loop or shown separately
  const showDoctrineInLoop = isTransparent || isPaper;
  const showSeparateDoctrine = isNavy || isMinistry;
  const navItems = showDoctrineInLoop
    ? ["Visit Us", "Doctrine", "Ministries"]
    : ["Visit Us", "Ministries"];

  // Give link href
  const giveHref = isTransparent ? "#give" : "/#give";

  // Animate nav items on home page
  const anim = isTransparent ? "animate-nav-in" : "";
  const animStyle = (i: number) =>
    isTransparent ? { animationDelay: `${0.1 + i * 0.08}s`, opacity: 0 } : undefined;

  // Doctrine page shows Doctrine link as current page (text-paper)
  const doctrineLinkColor = isNavy ? "text-paper" : navColor;

  // Panel theme: ministry pages use light (paper) panels, everything else uses dark (navy)
  const panelDark = !isMinistry;
  const panelBg = panelDark ? "bg-navy" : "bg-paper";
  const panelTitle = panelDark ? "text-paper" : "text-charcoal";
  const panelClose = panelDark ? "text-paper/50 hover:text-paper" : "text-charcoal/50 hover:text-charcoal";
  const panelDivider = panelDark ? "bg-paper/15" : "bg-charcoal/10";
  const panelCategory = isNavy ? "text-gold-dk/80" : panelDark ? "text-poppy/80" : "text-poppy/80";
  const panelLink = panelDark ? "text-paper/70 hover:text-paper" : "text-charcoal/70 hover:text-charcoal";

  // Mobile sidebar theme
  const sidebarBg = panelDark ? "bg-navy" : "bg-paper";
  const sidebarClose = panelDark ? "text-paper/60 hover:text-paper" : "text-charcoal/60 hover:text-charcoal";
  const sidebarLink = panelDark ? "text-paper/80" : "text-charcoal/80";
  const sidebarHover = panelDark ? "hover:text-gold-dk" : "hover:text-poppy";
  const sidebarBorder = panelDark ? "border-paper/10" : "border-charcoal/10";
  const sidebarDoctrine = isNavy ? "text-paper" : panelDark ? "text-paper/80" : "text-earth hover:text-charcoal";
  const sidebarGive = panelDark ? "text-gold-dk hover:text-paper" : "text-earth hover:text-charcoal";

  return (
    <>
      {/* ═══════════════ Ministries Slide-Out ═══════════════ */}
      <div
        className={`fixed inset-0 z-[70] transition-opacity duration-300 ${ministriesOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div
          className="absolute inset-0 bg-charcoal/40 backdrop-blur-md"
          onClick={() => setMinistriesOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-[420px] max-w-[90vw] ${panelBg} shadow-2xl flex flex-col transition-transform duration-500 ease-out ${ministriesOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between px-8 pt-8 pb-6">
            <h2 className={`font-heading text-[1.4rem] ${panelTitle} tracking-[0.08em]`}>
              Ministries
            </h2>
            <button
              onClick={() => setMinistriesOpen(false)}
              className={`w-10 h-10 flex items-center justify-center ${panelClose} transition-colors text-xl`}
              aria-label="Close ministries"
            >
              ✕
            </button>
          </div>
          <div className={`mx-8 h-px ${panelDivider}`} />
          <div className="flex-1 overflow-y-auto px-8 py-8 flex flex-col gap-8">
            {Object.entries(MINISTRIES).map(([category, items]) => (
              <div key={category}>
                <h4 className={`font-subheading-work text-[0.65rem] font-bold tracking-[0.25em] uppercase ${panelCategory} mb-4`}>
                  {category}
                </h4>
                <ul className="space-y-3">
                  {items.map((m) => (
                    <li key={m}>
                      <Link
                        href={MINISTRY_LINKS[m] || "/"}
                        onClick={() => setMinistriesOpen(false)}
                        className={`font-body-crimson text-[1.05rem] ${panelLink} transition-colors duration-200 block py-0.5`}
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
      <header
        className={`${position} top-0 left-0 right-0 z-50 transition-all duration-500 ${bg}`}
      >
        <div className="pl-4 pr-8 sm:px-6 lg:px-10 flex items-center justify-between h-[84px]">
          {/* Logo */}
          <Link
            href="/"
            className={`flex items-center group ${anim}`}
            style={isTransparent ? { opacity: 0 } : undefined}
          >
            <div
              className="relative w-auto aspect-[5/2] transition-all duration-500"
              style={{ height: scrolled ? "70px" : "100px" }}
            >
              <Image
                src="/church-logo.png"
                alt="Christ Church Bellingham logo"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex flex-col items-end justify-center transition-opacity duration-300 ${ministriesOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
            <div className="flex items-center gap-10">
              {navItems.map((label, i) => {
                if (label === "Ministries") {
                  return (
                    <button
                      key={label}
                      onClick={() => setMinistriesOpen(true)}
                      className={`font-subheading-work text-[0.9rem] font-medium tracking-[0.18em] capitalize transition-colors duration-500 ${anim} ${navColor} cursor-pointer`}
                      style={animStyle(i)}
                    >
                      {label}
                    </button>
                  );
                }
                return (
                  <Link
                    key={label}
                    href={getNavHref(label)}
                    className={`font-subheading-work text-[0.9rem] font-medium tracking-[0.18em] capitalize transition-colors duration-500 ${anim} ${navColor}`}
                    style={animStyle(i)}
                  >
                    {label}
                  </Link>
                );
              })}
              {/* Separate Doctrine link for navy/ministry variants */}
              {showSeparateDoctrine && (
                <Link
                  href="/doctrine"
                  className={`font-subheading-work text-[0.9rem] font-medium tracking-[0.18em] capitalize transition-colors duration-500 ${anim} ${doctrineLinkColor}`}
                >
                  Doctrine
                </Link>
              )}
              <Link
                href={giveHref}
                className={`font-subheading-work text-[0.9rem] font-semibold tracking-[0.18em] capitalize transition-colors duration-500 ${anim} ${navColor}`}
                style={isTransparent ? { animationDelay: `${0.1 + navItems.length * 0.08}s`, opacity: 0 } : undefined}
              >
                Give
              </Link>
            </div>
            {/* Decorative divider (home page only) */}
            {isTransparent && (
              <div
                className={`w-4/5 h-px mr-13 transition-all duration-500 animate-fade-in ${scrolled ? "opacity-0" : "bg-paper/30"}`}
                style={{ animationDelay: "0.5s", opacity: 0 }}
              />
            )}
          </nav>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] ${anim} transition-opacity duration-300 ${ministriesOpen ? "opacity-0 pointer-events-none" : ""}`}
            style={isTransparent && !ministriesOpen ? { opacity: 0 } : undefined}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <span className={`block w-6 h-[2px] rounded transition-colors duration-500 ${barColor}`} />
            <span className={`block w-6 h-[2px] rounded transition-colors duration-500 ${barColor}`} />
            <span className={`block w-6 h-[2px] rounded transition-colors duration-500 ${barColor}`} />
          </button>
        </div>
      </header>

      {/* ═══════════════ Mobile Sidebar ═══════════════ */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 md:hidden ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div
          className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        <nav
          className={`absolute top-0 right-0 h-full w-64 ${sidebarBg} shadow-2xl flex flex-col transition-transform duration-300 ease-out ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-end h-[84px] pr-12">
            <button
              onClick={() => setMenuOpen(false)}
              className={`w-10 h-10 flex items-center justify-center ${sidebarClose} transition-colors text-2xl`}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>
          <div className="flex flex-col gap-2 pl-8 pr-12 pt-4">
            {navItems.map((label) => {
              if (label === "Ministries") {
                return (
                  <button
                    key={label}
                    onClick={() => { setMenuOpen(false); setMinistriesOpen(true); }}
                    className={`font-subheading-work text-[0.95rem] font-medium tracking-[0.18em] uppercase ${sidebarLink} ${sidebarHover} py-3 border-b ${sidebarBorder} transition-colors duration-300 text-left cursor-pointer`}
                  >
                    {label}
                  </button>
                );
              }
              return (
                <Link
                  key={label}
                  href={getNavHref(label)}
                  onClick={() => setMenuOpen(false)}
                  className={`font-subheading-work text-[0.95rem] font-medium tracking-[0.18em] uppercase ${sidebarLink} ${sidebarHover} py-3 border-b ${sidebarBorder} transition-colors duration-300`}
                >
                  {label}
                </Link>
              );
            })}
            {/* Separate Doctrine link for navy/ministry variants */}
            {showSeparateDoctrine && (
              <Link
                href="/doctrine"
                onClick={() => setMenuOpen(false)}
                className={`font-subheading-work text-[0.95rem] font-medium tracking-[0.18em] uppercase ${sidebarDoctrine} py-3 border-b ${sidebarBorder} transition-colors duration-300`}
              >
                Doctrine
              </Link>
            )}
            <Link
              href={giveHref}
              onClick={() => setMenuOpen(false)}
              className={`font-subheading-work text-[0.95rem] font-semibold tracking-[0.18em] uppercase ${sidebarGive} py-3 transition-colors duration-300`}
            >
              Give
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}

