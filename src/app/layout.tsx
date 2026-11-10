import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { STORE_NAME, getCategories } from "@/lib/medusa";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ClientProviders } from "@/components/ClientProviders";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `${STORE_NAME} — Pure Ingredients. Visible Results.`,
  description: `Elevated skincare made with clean ingredients and backed by science. Shop online at ${STORE_NAME}.`,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCategories();

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-white text-ink font-sans antialiased">
        <ClientProviders>
          <Header categories={categories} />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
