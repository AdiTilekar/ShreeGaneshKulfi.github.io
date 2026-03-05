// ============================================================
// SeoLayout — Root layout with Navbar + Footer + SEO head tags
// ============================================================

import React from 'react';
import Head from 'next/head';
import { SITE_NAME, SITE_TAGLINE } from '@/utils/constants';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface SeoLayoutProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  /** Hide navbar / footer on certain pages (login, splash) */
  bare?: boolean;
}

export default function SeoLayout({
  title,
  description,
  children,
  bare = false,
}: SeoLayoutProps) {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — ${SITE_TAGLINE}`;
  const pageDesc =
    description ||
    'Premium handcrafted kulfi in 13+ authentic flavors. Order wholesale for your shop or enjoy our traditional recipes directly.';

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:site_name" content={SITE_NAME} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />

        {/* Performance hints */}
        <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_API_URL || ''} />
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_API_URL || ''} />
      </Head>

      {!bare && <Navbar />}

      <main className="min-h-screen">{children}</main>

      {!bare && <Footer />}
    </>
  );
}

// Keep named export for backward compat with _app.tsx
export { SeoLayout };
