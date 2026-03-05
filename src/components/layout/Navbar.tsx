// ============================================================
// Navbar — Responsive top navigation
// ============================================================

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { usePublicCart } from '@/stores/usePublicCart';
import { SITE_NAME, BASE_PATH } from '@/utils/constants';
import { useTheme } from '@/hooks/useTheme';

export default function Navbar() {
  const router = useRouter();
  const publicCartCount = usePublicCart((s) => s.totalItems());
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <img src={`${BASE_PATH}/images/logo.png`} alt="Ganesh Kulfi" className="h-9 w-9 rounded-full object-cover" />
          <span className="font-display font-bold text-lg text-gray-900 dark:text-white hidden sm:inline">
            {SITE_NAME}
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink href="/" active={router.pathname === '/'}>
            Home
          </NavLink>
          <NavLink href="/products" active={router.pathname === '/products'}>
            Products
          </NavLink>
          <NavLink href="/cart" active={router.pathname === '/cart'}>
            Cart
            {publicCartCount > 0 && (
              <span className="ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-600 text-white text-xs font-bold">
                {publicCartCount}
              </span>
            )}
          </NavLink>
          <NavLink href="/signup" active={router.pathname === '/signup'}>
            Become a Partner
          </NavLink>

          {/* Dark mode toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isDark ? (
              <svg className="w-[18px] h-[18px] text-gray-400 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" strokeWidth="2"/><path strokeWidth="2" strokeLinecap="round" d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.36-7.36l-1.41 1.41M7.05 16.95l-1.41 1.41m12.72 0l-1.41-1.41M7.05 7.05L5.64 5.64"/></svg>
            ) : (
              <svg className="w-[18px] h-[18px] text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.005 9.005 0 0012 21a9.005 9.005 0 008.354-5.646z"/></svg>
            )}
          </button>
        </div>

        {/* Mobile: toggle + hamburger */}
        <div className="md:hidden flex items-center gap-1">
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isDark ? (
              <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" strokeWidth="2"/><path strokeWidth="2" strokeLinecap="round" d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.36-7.36l-1.41 1.41M7.05 16.95l-1.41 1.41m12.72 0l-1.41-1.41M7.05 7.05L5.64 5.64"/></svg>
            ) : (
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.005 9.005 0 0012 21a9.005 9.005 0 008.354-5.646z"/></svg>
            )}
          </button>
          <button
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            <MobileLink href="/" onClick={() => setMobileOpen(false)}>Home</MobileLink>
            <MobileLink href="/products" onClick={() => setMobileOpen(false)}>Products</MobileLink>
            <MobileLink href="/cart" onClick={() => setMobileOpen(false)}>
              Cart {publicCartCount > 0 && `(${publicCartCount})`}
            </MobileLink>
            <MobileLink href="/signup" onClick={() => setMobileOpen(false)}>Become a Partner</MobileLink>
          </div>
        </div>
      )}
    </header>
  );
}

// ─── Sub-components ──────────────────────────────────────────

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`text-sm font-medium transition-colors flex items-center gap-1 ${
        active
          ? 'text-brand-orange'
          : 'text-gray-600 dark:text-gray-400 hover:text-brand-orange'
      }`}
    >
      {children}
    </Link>
  );
}

function MobileLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
    >
      {children}
    </Link>
  );
}
