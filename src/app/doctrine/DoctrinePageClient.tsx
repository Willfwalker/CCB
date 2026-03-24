"use client";

import Header from "@/components/Header";
import DoctrineSection from "@/components/DoctrineSection";

export interface DoctrinePageProps {
    doctrines?: { category: string; content: string }[];
    pressResources?: { type: string; title: string; description: string; url: string; color: string }[];
}

export default function DoctrinePageClient({ doctrines, pressResources }: DoctrinePageProps) {
    return (
        <>
            <Header variant="navy" />
            <main className="min-h-screen bg-navy pt-12 md:pt-20">
                <DoctrineSection doctrines={doctrines} pressResources={pressResources} />
            </main>
        </>
    );
}
