import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichBlocks } from "@/components/RichBlocks";
import { STORE_NAME, getFooterPage, type RichBlock } from "@/lib/medusa";

export const dynamic = "force-dynamic";

interface SupportPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: SupportPageProps) {
  const { slug } = await params;
  const page = await getFooterPage(slug);
  return { title: page ? `${page.title} | ${STORE_NAME}` : STORE_NAME };
}

function withoutRepeatedTitle(blocks: RichBlock[], title: string): RichBlock[] {
  const first = blocks[0];
  if (first && first.type === "heading") {
    const heading = first.content
      .map((node) =>
        node.type === "text"
          ? node.text
          : node.type === "link"
          ? node.children.map((c) => c.text).join("")
          : " "
      )
      .join("")
      .replace(/[\s:]+$/, "")
      .trim()
      .toLowerCase();
    if (heading === title.trim().toLowerCase()) return blocks.slice(1);
  }
  return blocks;
}

export default async function SupportPage({ params }: SupportPageProps) {
  const { slug } = await params;
  const page = await getFooterPage(slug);

  if (!page) {
    notFound();
  }

  const blocks = withoutRepeatedTitle(page.blocks, page.title);

  return (
    <article className="max-w-[840px] mx-auto px-6 py-8 sm:py-12 min-h-screen space-y-8">
      {/* ── Breadcrumb ── */}
      <nav aria-label="Breadcrumb">
        <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-aura-gray">
          <Link href="/" className="hover:text-ink transition-colors">
            HOME
          </Link>{" "}
          / <span className="text-ink">{page.title.toUpperCase()}</span>
        </p>
      </nav>

      <h1 className="font-serif text-3xl sm:text-4xl font-medium text-ink pb-4 border-b border-line">
        {page.title}
      </h1>

      <div className="prose prose-zinc max-w-none text-xs sm:text-sm text-aura-gray leading-relaxed space-y-4">
        <RichBlocks blocks={blocks} />
      </div>
    </article>
  );
}
