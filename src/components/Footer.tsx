import React from "react";
import Link from "next/link";
import {
  FOOTER_NETWORK_NAMES,
  STORE_NAME,
  cleanCategoryHandle,
  getFooterSettings,
  type FooterNetwork,
} from "@/logic";
import { Truck, RotateCcw, ShieldCheck } from "lucide-react";

function SocialIcon({ network }: { network: FooterNetwork }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (network === "tiktok") {
    return (
      <svg {...common}>
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    );
  }
  if (network === "facebook") {
    return (
      <svg {...common}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export async function Footer() {
  const footer = await getFooterSettings();
  const name = footer.store_name || STORE_NAME;
  const description =
    footer.description || "Elevated skincare made with clean ingredients and backed by science.";

  const nameParts = name.trim().split(/\s+/);
  const primaryWord = nameParts[0] || "STORE";
  const secondaryWord = nameParts.slice(1).join(" ");

  const shopLinks =
    footer.shop_categories.length > 0
      ? footer.shop_categories.map((category) => ({
          key: category.id,
          label: category.name,
          href: `/c/${encodeURIComponent(cleanCategoryHandle(category.handle))}`,
        }))
      : [{ key: "all", label: "All products", href: "/shop" }];

  return (
    <footer id="footer" className="bg-soft border-t border-line text-ink mt-auto">
      <div className="max-w-[1240px] mx-auto px-6 pt-14 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand info */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex flex-col items-start leading-none mb-5 group">
              <span
                data-testid="footer-name"
                className="font-serif text-3xl font-medium tracking-[0.14em]"
              >
                {primaryWord}
              </span>
              {secondaryWord && (
                <span className="text-[8.5px] font-bold tracking-[0.5em] mt-1 text-ink">
                  {secondaryWord}
                </span>
              )}
            </Link>
            <p
              data-testid="footer-description"
              className="text-xs leading-relaxed text-aura-gray mb-6 max-w-[280px]"
            >
              {description}
            </p>
            {footer.social_links.length > 0 && (
              <ul data-testid="footer-social" className="flex items-center gap-4 text-ink">
                {footer.social_links.map((link) => (
                  <li key={link.network}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-network={link.network}
                      aria-label={FOOTER_NETWORK_NAMES[link.network]}
                      title={FOOTER_NETWORK_NAMES[link.network]}
                      className="hover:opacity-60 transition-opacity"
                    >
                      <SocialIcon network={link.network} />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Nav columns */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8">
            <nav aria-label="Shop" data-testid="footer-shop">
              <h4 className="text-[11px] font-bold tracking-[0.12em] uppercase mb-4 text-ink">
                SHOP
              </h4>
              <ul className="space-y-2.5 text-xs text-aura-gray">
                {shopLinks.map((link) => (
                  <li key={link.key}>
                    <Link href={link.href} className="hover:text-ink transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {footer.pages.length > 0 && (
              <nav aria-label="Support" data-testid="footer-support">
                <h4 className="text-[11px] font-bold tracking-[0.12em] uppercase mb-4 text-ink">
                  SUPPORT
                </h4>
                <ul className="space-y-2.5 text-xs text-aura-gray">
                  {footer.pages.map((page) => (
                    <li key={page.slug}>
                      <Link href={`/pages/${page.slug}`} className="hover:text-ink transition-colors">
                        {page.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>

          {/* Perks */}
          <div className="lg:col-span-3 flex flex-col gap-5 sm:gap-6">
            <div className="flex items-start gap-3.5">
              <Truck className="w-5 h-5 text-ink stroke-[1.4] shrink-0 mt-0.5" />
              <div>
                <h5 className="text-[10.5px] font-bold tracking-[0.1em] uppercase mb-0.5 text-ink">
                  EXPRESS DELIVERY
                </h5>
                <p className="text-[11px] text-aura-gray">Across Tunisia</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <RotateCcw className="w-5 h-5 text-ink stroke-[1.4] shrink-0 mt-0.5" />
              <div>
                <h5 className="text-[10.5px] font-bold tracking-[0.1em] uppercase mb-0.5 text-ink">
                  EASY RETURNS
                </h5>
                <p className="text-[11px] text-aura-gray">Hassle free policy</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <ShieldCheck className="w-5 h-5 text-ink stroke-[1.4] shrink-0 mt-0.5" />
              <div>
                <h5 className="text-[10.5px] font-bold tracking-[0.1em] uppercase mb-0.5 text-ink">
                  PAY ON DELIVERY
                </h5>
                <p className="text-[11px] text-aura-gray">Cash on delivery available</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-line py-4">
        <div className="max-w-[1240px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-aura-gray">
          <span>&copy; {new Date().getFullYear()} {name}. All rights reserved.</span>
          {footer.pages.length > 0 && (
            <div className="flex items-center gap-3">
              {footer.pages.slice(0, 3).map((page, index) => (
                <React.Fragment key={page.slug}>
                  {index > 0 && <span className="text-line">|</span>}
                  <Link href={`/pages/${page.slug}`} className="hover:text-ink transition-colors">
                    {page.title}
                  </Link>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
