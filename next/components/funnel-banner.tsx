"use client";

import { track } from "@/lib/posthog-client";
import type { Locale } from "@/lib/site";

const UTM = "utm_source=aisummaryhub&utm_medium=footer&utm_campaign=ecosystem";

const LINKS = {
  newsletter: `https://emersonbraun.dev/newsletter?${UTM}`,
  agentskit: `https://www.agentskit.io?${UTM}`,
} as const;

type LinkTarget = keyof typeof LINKS;

const COPY: Record<Locale, { newsletter: string; agentskit: string; separator: string }> = {
  en: {
    newsletter: "Weekly AI insights — Emerson's newsletter",
    agentskit: "Build agents with AgentsKit",
    separator: "·",
  },
  "pt-BR": {
    newsletter: "Insights semanais de IA — newsletter do Emerson",
    agentskit: "Construa agentes com AgentsKit",
    separator: "·",
  },
};

function FunnelLink({
  href,
  target,
  children,
}: {
  href: string;
  target: LinkTarget;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        track("funnel_click", {
          target,
          utm_source: "aisummaryhub",
          utm_medium: "footer",
          utm_campaign: "ecosystem",
        })
      }
      className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
    >
      {children}
    </a>
  );
}

/**
 * A tasteful top-of-funnel nudge bar rendered once at the bottom of every docs
 * and home page. Drives newsletter sign-ups and AgentsKit discovery without
 * being intrusive. Wired via layout — never pasted per-article.
 */
export function FunnelBanner({ lang }: { lang: Locale }) {
  const copy = COPY[lang];

  return (
    <div className="border-t border-fd-border bg-fd-card/60">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-1 px-4 py-3 text-sm text-fd-muted-foreground">
        {/* Newsletter CTA */}
        <FunnelLink href={LINKS.newsletter} target="newsletter">
          {/* Envelope icon */}
          <svg
            width={15}
            height={15}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          {copy.newsletter}
        </FunnelLink>

        <span className="select-none text-fd-border" aria-hidden>
          {copy.separator}
        </span>

        {/* AgentsKit CTA */}
        <FunnelLink href={LINKS.agentskit} target="agentskit">
          {/* Sparkle / agent icon */}
          <svg
            width={15}
            height={15}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
          </svg>
          {copy.agentskit}
        </FunnelLink>
      </div>
    </div>
  );
}
