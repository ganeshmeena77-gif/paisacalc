import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/calculatorMeta";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} – ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Free online calculators for income tax, SIP, EMI, GST, FD, PPF, HRA, gratuity and more — built for India, updated for FY 2026-27.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE_NAME,
    title: `${SITE_NAME} – ${SITE_TAGLINE}`,
    description:
      "Free online calculators for income tax, SIP, EMI, GST, FD, PPF, HRA, gratuity and more — built for India, updated for FY 2026-27.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} – ${SITE_TAGLINE}`,
    description:
      "Free online calculators for income tax, SIP, EMI, GST, FD, PPF, HRA, gratuity and more — built for India.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-gradient-to-br from-white via-blue-50 to-indigo-50 text-slate-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
