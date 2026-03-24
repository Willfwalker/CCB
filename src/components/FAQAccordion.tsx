"use client";

import { useState } from "react";

interface FAQAccordionProps {
  items: { question: string; answer: string }[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col divide-y divide-sand/60">
      {items.map((item, i) => (
        <button
          key={i}
          onClick={() => setOpenIndex(openIndex === i ? null : i)}
          className="text-left py-5 group cursor-pointer"
        >
          <div className="flex items-center justify-between gap-4">
            <span className="font-subheading-work text-[0.95rem] font-medium text-charcoal group-hover:text-brand transition-colors duration-300">
              {item.question}
            </span>
            <span
              className={`text-brand text-xl shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-45" : ""}`}
            >
              +
            </span>
          </div>
          <div
            className={`overflow-hidden transition-all duration-400 ease-in-out ${openIndex === i ? "max-h-48 mt-3 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <p className="font-body-crimson text-[0.88rem] leading-relaxed text-earth/80">
              {item.answer}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
