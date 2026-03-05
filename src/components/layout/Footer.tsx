// ============================================================
// Footer — Site footer with SEO-friendly links
// ============================================================

import React from 'react';
import Link from 'next/link';
import { SITE_NAME, CONTACT } from '@/utils/constants';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl" aria-hidden>🍦</span>
              <span className="font-display font-bold text-lg text-white">{SITE_NAME}</span>
            </div>
            <p className="text-sm leading-relaxed">
              Authentic handcrafted kulfi, made with love and tradition. Serving retailers and customers
              across Maharashtra with 13+ irresistible flavors.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm list-none pl-0">
              <li><Link href="/" className="hover:text-brand-orange transition-colors">Home</Link></li>
              <li><Link href="/products" className="hover:text-brand-orange transition-colors">Our Flavors</Link></li>
              <li><Link href="/signup" className="hover:text-brand-orange transition-colors">Become a Partner</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="space-y-2 text-sm list-none pl-0">
              <li>
                <a href={`tel:${CONTACT.phone}`} className="hover:text-brand-orange transition-colors">
                  📞 {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="hover:text-brand-orange transition-colors">
                  ✉️ {CONTACT.email}
                </a>
              </li>
              <li className="text-gray-400">
                📍 Kopargaon, Maharashtra, India
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
              Business Hours
            </h3>
            <ul className="space-y-2 text-sm list-none pl-0">
              <li>Mon – Sat: 8:00 AM – 8:00 PM</li>
              <li>Sunday: 9:00 AM – 6:00 PM</li>
              <li className="text-brand-orange-light font-medium mt-2">
                Orders accepted 24/7 online
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {year} {SITE_NAME}. All rights reserved.</p>
          <p>Handcrafted with ❤️ in Kopargaon</p>
        </div>
      </div>
    </footer>
  );
}
