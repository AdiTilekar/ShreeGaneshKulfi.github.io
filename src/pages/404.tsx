// ============================================================
// 404 Page — Custom not found with SEO-friendly markup
// ============================================================

import Link from 'next/link';
import SeoLayout from '@/components/layout/SeoLayout';

export default function Custom404() {
  return (
    <SeoLayout title="Page Not Found" description="The page you're looking for doesn't exist.">
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <span className="text-7xl mb-4">🍦</span>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
        <p className="text-lg text-gray-500 mb-8 max-w-md">
          Oops! This page has melted away. Let&apos;s get you back to something delicious.
        </p>
        <div className="flex gap-4">
          <Link
            href="/"
            className="btn-primary"
          >
            Go Home
          </Link>
          <Link
            href="/products"
            className="btn-secondary"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </SeoLayout>
  );
}
