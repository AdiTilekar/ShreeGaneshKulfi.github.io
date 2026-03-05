// ============================================================
// _document.tsx — Custom document for SSR optimizations
// ============================================================

import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preconnect to Google Fonts for Inter */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Preconnect to API */}
        <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_API_URL || ''} />
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#E8860C" />
      </Head>
      <body className="antialiased">
        {/* Prevent FOUC — apply dark class before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=document.documentElement;var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){d.classList.add('dark')}else{d.classList.remove('dark')}}catch(e){}})()`
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}