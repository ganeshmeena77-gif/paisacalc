import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/calculatorMeta";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the PaisaCalc privacy policy to learn what information we collect, how cookies and advertising work on our site, and how to contact us with questions.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: `Privacy Policy | ${SITE_NAME}`,
    description: "What information we collect, cookies, and third-party advertising on PaisaCalc.",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Privacy Policy</h1>
        <p className="mt-2 text-sm text-slate-500">Last updated: June 2026</p>
      </header>

      <article className="prose prose-slate max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h3:text-lg prose-a:text-brand-600">
        <p>
          This Privacy Policy explains how {SITE_NAME} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;)
          handles information when you visit{" "}
          <Link href="/">paisacalc.com</Link> (the &ldquo;Site&rdquo;). By using the Site, you agree to the
          practices described in this policy.
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          {SITE_NAME} does not require any sign-up, login, or account creation. The figures you enter into our
          calculators (such as your salary, investment amounts, or loan details) are processed{" "}
          <strong>entirely within your own browser</strong> using JavaScript. We do not transmit, collect, or
          store any of the financial figures you enter &mdash; they are never sent to our servers.
        </p>
        <p>
          Like most websites, our hosting provider may automatically log basic technical information for
          security and performance purposes, such as your IP address, browser type, device type, and the pages
          you visit. This information is aggregated and is not used to personally identify you.
        </p>

        <h2>2. Cookies and Tracking Technologies</h2>
        <p>
          We may use cookies or similar local storage technologies to remember your preferences (for example,
          a recently used calculator) and to understand how visitors use the Site through aggregated analytics.
          You can disable cookies through your browser settings; the Site will continue to function, though
          some preferences may not be remembered.
        </p>

        <h2>3. Third-Party Advertising (Google AdSense)</h2>
        <p>
          We may display advertisements served by Google AdSense and other third-party advertising networks.
          These third parties may use cookies, web beacons, or similar technologies to collect information
          about your visits to this and other websites in order to provide advertisements about goods and
          services that may interest you.
        </p>
        <p>
          Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit
          to this site and/or other sites on the Internet. You may opt out of personalized advertising by
          visiting{" "}
          <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
            Google Ads Settings
          </a>
          . You can also visit{" "}
          <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer">
            www.aboutads.info
          </a>{" "}
          to opt out of third-party vendor cookies used for personalized advertising.
        </p>

        <h2>4. Analytics</h2>
        <p>
          We may use web analytics services (such as Google Analytics) to understand how visitors interact
          with the Site &mdash; for example, which calculators are most popular and how people navigate the
          Site. These services use cookies and collect information in an anonymous or pseudonymous form, such
          as your approximate location, device type, and pages visited.
        </p>

        <h2>5. Links to Other Sites</h2>
        <p>
          Our Site may contain links to external websites (for example, official government portals like the
          Income Tax Department, EPFO, or RBI). We are not responsible for the privacy practices or content of
          these external sites. We encourage you to review the privacy policy of any site you visit.
        </p>

        <h2>6. Children&apos;s Privacy</h2>
        <p>
          {SITE_NAME} is not directed at children under the age of 13, and we do not knowingly collect personal
          information from children.
        </p>

        <h2>7. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time to reflect changes in our practices or for legal
          and regulatory reasons. Any changes will be posted on this page with an updated revision date.
        </p>

        <h2>8. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please reach out via our{" "}
          <Link href="/contact">Contact</Link> page.
        </p>
      </article>
    </div>
  );
}
