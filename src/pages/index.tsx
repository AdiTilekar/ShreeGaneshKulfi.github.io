// ============================================================
// Landing Page — Bold + Modern Design
// Eye-catching visuals, gradient accents, rich hover effects
// ============================================================

import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import SeoLayout from '@/components/layout/SeoLayout';
import QuantityModal from '@/components/ui/QuantityModal';
import { FLAVOR_IMAGES } from '@/utils/constants';
import type { Product } from '@/types';

interface HomeProps {
  featuredProducts: Product[];
}

/* ── Fade-in on scroll ──────────────────────────────────────── */
function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-[800ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ── Animated counter ───────────────────────────────────────── */
function Counter({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            setValue(Math.floor(progress * end));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{value}{suffix}</span>;
}

/* ── Data ───────────────────────────────────────────────────── */
const BEST_SELLERS = [
  { name: 'Mango Kulfi', tagline: 'Our #1 Bestseller', badge: 'Most Loved', img: '/images/flavors/mango_kulfi.png' },
  { name: 'Dry Fruit Kulfi', tagline: 'The Royal Choice', badge: 'Premium', img: '/images/flavors/dry_fruit_kulfi.png' },
  { name: 'Paan Kulfi', tagline: 'The Desi Classic', badge: 'Trending', img: '/images/flavors/paan_kulfi.png' },
];

const TESTIMONIALS = [
  { name: 'Rajesh Patil', location: 'Nashik', text: 'My customers keep coming back just for Ganesh Kulfi. The Mango flavor sells out every single day!', role: 'Retail Partner since 2023' },
  { name: 'Priya Sharma', location: 'Pune', text: 'The quality is unmatched. No other brand gives this kind of creaminess. My shop\'s bestseller!', role: 'Retail Partner since 2024' },
  { name: 'Amit Deshmukh', location: 'Ahmednagar', text: 'Ordering is simple, delivery is always on time. My customers won\'t accept anything else.', role: 'Retail Partner since 2023' },
];

const TRUST_ITEMS = [
  { icon: '🏭', text: 'Made Fresh Daily' },
  { icon: '🧊', text: 'Cold-Chain Delivery' },
  { icon: '🌿', text: '100% Natural' },
  { icon: '⚡', text: 'Same-Day Dispatch' },
];

/* ================================================================
   MAIN PAGE
   ================================================================ */
const Home: NextPage<HomeProps> = ({ featuredProducts }) => {
  const [modalProduct, setModalProduct] = useState<{ id: string; name: string; price: number; image: string | null } | null>(null);

  return (
    <SeoLayout
      title="Home"
      description="Premium handcrafted kulfi in 14 authentic flavors. 10 lakh+ kulfis sold. The fastest-growing kulfi brand with 100+ retail partners."
    >
      {/* ═══════════════════════════════════════════════════════════
          1. HERO — Big, bold, gradient text, floating images
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900">
        {/* Decorative glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-200/30 dark:bg-amber-600/10 rounded-full blur-[100px] -translate-y-1/4 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-200/25 dark:bg-orange-700/8 rounded-full blur-[80px] translate-y-1/4 -translate-x-1/4 pointer-events-none" />

        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #92400e 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full py-20 lg:py-0">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left — Copy */}
            <div className="animate-hero-text">
              <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 text-sm font-bold tracking-wide mb-6">
                🍦 Premium Handcrafted Kulfi
              </span>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-gray-900 dark:text-white">
                Real Kulfi.{' '}
                <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent">
                  Real Taste.
                </span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg">
                Trusted by <strong className="text-gray-900 dark:text-white">100+ retailers</strong> across Maharashtra.
                Over <strong className="text-amber-600">10 Lakh+ kulfis</strong> sold and counting.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link href="/products" className="group inline-flex items-center gap-3 bg-amber-600 hover:bg-amber-700 text-white text-lg font-bold px-9 py-4 rounded-2xl shadow-xl shadow-amber-600/25 hover:shadow-amber-600/40 transition-all duration-300 hover:-translate-y-1 active:scale-[0.97]">
                  Explore All Flavors
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link href="/signup" className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border-2 border-gray-200 dark:border-gray-700 hover:border-amber-400 dark:hover:border-amber-500 font-semibold px-8 py-4 rounded-2xl transition-all duration-300">
                  Become a Partner
                </Link>
              </div>

              {/* Stats row */}
              <div className="mt-12 flex items-center gap-8 sm:gap-12">
                {[
                  { val: '10L+', label: 'Kulfis Sold' },
                  { val: '100+', label: 'Retail Partners' },
                  { val: '14', label: 'Flavors' },
                ].map((s, i) => (
                  <div key={s.label} className="flex items-center gap-8 sm:gap-12">
                    {i > 0 && <div className="w-px h-12 bg-gray-200 dark:bg-gray-700 -ml-8 sm:-ml-12" />}
                    <div>
                      <p className="text-3xl sm:text-4xl font-black text-amber-600">{s.val}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Image showcase */}
            <div className="relative hidden lg:block">
              <div className="relative z-10">
                <img
                  src="/images/flavors/mango_kulfi.png"
                  alt="Mango Kulfi — Our Bestseller"
                  className="w-full max-w-md mx-auto rounded-3xl shadow-2xl shadow-amber-900/20 dark:shadow-black/40 ring-1 ring-black/5 dark:ring-white/10 animate-float"
                />
              </div>
              {/* Floating satellite kulfis */}
              <div className="absolute -top-8 -left-4 w-36 h-36 rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5 dark:ring-white/10 rotate-[-6deg] hover:rotate-0 transition-transform duration-500">
                <img src="/images/flavors/paan_kulfi.png" alt="Paan Kulfi" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -left-8 w-32 h-32 rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5 dark:ring-white/10 rotate-[5deg] hover:rotate-0 transition-transform duration-500">
                <img src="/images/flavors/strawberry_kulfi.png" alt="Strawberry Kulfi" className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-12 -right-6 w-28 h-28 rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5 dark:ring-white/10 rotate-[8deg] hover:rotate-0 transition-transform duration-500">
                <img src="/images/flavors/dry_fruit_kulfi.png" alt="Dry Fruit Kulfi" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-8 right-8 w-32 h-32 rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5 dark:ring-white/10 rotate-[-4deg] hover:rotate-0 transition-transform duration-500">
                <img src="/images/flavors/chocolate_kulfi.png" alt="Chocolate Kulfi" className="w-full h-full object-cover" />
              </div>
              {/* Badge */}
              <div className="absolute bottom-16 -left-12 bg-white dark:bg-gray-900 rounded-2xl px-5 py-4 shadow-xl ring-1 ring-black/5 dark:ring-white/10 z-20">
                <p className="text-2xl font-black text-amber-600 leading-none">10 Lakh+</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold mt-1">Kulfis Sold!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow">
          <div className="w-7 h-12 rounded-full border-2 border-amber-300 dark:border-amber-600 flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-amber-400 dark:bg-amber-500 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          2. TRUST STRIP
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {TRUST_ITEMS.map((item) => (
              <div key={item.text} className="flex items-center justify-center gap-2.5 py-2">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-sm font-bold text-gray-700 dark:text-gray-300 tracking-wide">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          3. BEST SELLERS — Hero treatment for top 3
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-white dark:bg-gray-950 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-sm font-bold tracking-wide mb-4">
                CUSTOMERS&apos; FAVORITE
              </span>
              <h2 className="text-4xl sm:text-6xl font-black text-gray-900 dark:text-white leading-tight">
                Our Top 3{' '}
                <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">Bestsellers</span>
              </h2>
              <p className="mt-4 text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">
                The flavors our 100+ retail partners can&apos;t keep in stock
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BEST_SELLERS.map((item, i) => (
              <Reveal key={item.name} delay={i * 100}>
                <div className="group relative">
                  <span className="absolute -top-4 -left-2 z-20 text-8xl font-black text-amber-100 dark:text-amber-900/40 group-hover:text-amber-200 dark:group-hover:text-amber-800/50 transition-colors select-none leading-none">
                    {i + 1}
                  </span>
                  <div className="relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl dark:shadow-black/30 transition-all duration-500 hover:-translate-y-3 ring-1 ring-black/5 dark:ring-white/10">
                    <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                      <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-amber-600 text-white text-xs font-bold shadow-lg">
                        {item.badge}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 via-amber-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                        <button
                          onClick={() => setModalProduct({ id: `bs-${i}`, name: item.name, price: item.name.includes('Dry Fruit') ? 40 : 30, image: item.img })}
                          className="w-full text-center bg-white text-amber-700 font-bold py-3 rounded-xl hover:bg-amber-50 transition-colors text-sm"
                        >
                          Add to Cart →
                        </button>
                      </div>
                    </div>
                    <div className="p-6 cursor-pointer" onClick={() => setModalProduct({ id: `bs-${i}`, name: item.name, price: item.name.includes('Dry Fruit') ? 40 : 30, image: item.img })}>
                      <p className="text-amber-500 text-sm font-bold tracking-wide uppercase">{item.tagline}</p>
                      <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1">{item.name}</h3>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          4. FULL COLLECTION — Card grid with hover effects
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 dark:bg-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-12 bg-amber-500" />
                <span className="text-amber-600 dark:text-amber-400 font-bold text-sm tracking-[0.2em] uppercase">The Collection</span>
                <div className="h-px w-12 bg-amber-500" />
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white">
                Every Flavor.{' '}
                <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">Every Craving.</span>
              </h2>
              <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                From the rich creaminess of Rabdi to the exotic punch of Paan —
                there&apos;s a Ganesh Kulfi for every taste bud.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-8">
            {featuredProducts.map((product, i) => {
              const img = FLAVOR_IMAGES[product.name] || product.imageUrl;
              return (
                <Reveal key={product.id} delay={i * 60}>
                  <div onClick={() => setModalProduct({ id: product.id, name: product.name, price: product.basePrice, image: img || null })} className="group block cursor-pointer">
                    <div className="relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl dark:shadow-black/30 ring-1 ring-black/[0.04] dark:ring-white/[0.06] transition-all duration-500 hover:-translate-y-2">
                      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-amber-50 to-gray-50 dark:from-gray-700 dark:to-gray-800">
                        {img ? (
                          <img src={img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                        ) : (
                          <div className="flex items-center justify-center h-full"><span className="text-6xl opacity-30">🍦</span></div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                          <span className="text-white font-extrabold text-2xl">₹{product.basePrice.toFixed(0)}</span>
                          <span className="bg-white text-amber-600 text-xs font-bold px-3 py-1.5 rounded-lg">Add to Cart</span>
                        </div>
                      </div>
                      <div className="p-4 sm:p-5">
                        <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg group-hover:text-amber-600 transition-colors duration-300 truncate">
                          {product.name}
                        </h3>
                        {product.description && (
                          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1 line-clamp-1">{product.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <div className="text-center mt-16">
            <Link href="/products" className="group inline-flex items-center gap-3 bg-gray-900 dark:bg-white hover:bg-amber-600 dark:hover:bg-amber-500 text-white dark:text-gray-900 text-base font-bold px-10 py-5 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-amber-600/30 transition-all duration-300 hover:-translate-y-1">
              View All 14 Flavors
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          5. OUR STORY
          ═══════════════════════════════════════════════════════════ */}
      <section id="our-story" className="relative bg-gray-950 dark:bg-black text-white py-28 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[600px] h-[400px] bg-amber-600/8 rounded-full blur-[120px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <Reveal>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-12 bg-amber-500" />
                  <span className="text-amber-400 font-bold text-sm tracking-[0.2em] uppercase">Our Story</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                  Started Small.{' '}
                  <span className="text-amber-400">Growing Fast.</span>{' '}
                  10 Lakh+ Kulfis Sold.
                </h2>
                <div className="mt-8 space-y-6 text-gray-300 text-lg leading-relaxed">
                  <p>
                    It started with a <strong className="text-white">simple idea in Kopargaon</strong> — what if
                    people could taste kulfi the way it&apos;s meant to be? No shortcuts. No artificial anything.
                    Just <strong className="text-white">pure milk, real fruit, and honest patience.</strong>
                  </p>
                  <p>
                    That idea <strong className="text-white">exploded</strong>. What began as a small operation
                    quickly became the go-to kulfi brand for retailers across Maharashtra. Today we&apos;ve
                    crossed <strong className="text-amber-400">10 lakh kulfis sold</strong>, partnered with
                    <strong className="text-white"> 100+ retailers</strong>, and we&apos;re adding new partners every week.
                  </p>
                  <p className="text-amber-300 font-semibold text-xl italic border-l-4 border-amber-500 pl-5">
                    &quot;We didn&apos;t inherit a legacy — we&apos;re building one. One kulfi at a time.&quot;
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 hover:ring-amber-500/40 transition-all duration-500 group">
                      <img src="/images/flavors/mango_kulfi.png" alt="Mango Kulfi" className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                    </div>
                    <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 hover:ring-amber-500/40 transition-all duration-500 group">
                      <img src="/images/flavors/gulkand_kulfi.png" alt="Gulkand Kulfi" className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                    </div>
                  </div>
                  <div className="space-y-4 pt-10">
                    <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 hover:ring-amber-500/40 transition-all duration-500 group">
                      <img src="/images/flavors/dry_fruit_kulfi.png" alt="Dry Fruit Kulfi" className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                    </div>
                    <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 hover:ring-amber-500/40 transition-all duration-500 group">
                      <img src="/images/flavors/rabdi_kulfi.png" alt="Rabdi Kulfi" className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-5 -left-5 bg-amber-600 text-white rounded-2xl px-7 py-5 shadow-2xl shadow-amber-600/40">
                  <span className="block text-4xl font-black leading-none">10L+</span>
                  <span className="text-sm text-amber-100 font-semibold">Kulfis Sold</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          6. STATS — Animated counters
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-20 bg-gradient-to-b from-gray-950 to-gray-900 dark:from-black dark:to-gray-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(217,119,6,0.1),transparent_70%)]" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {[
              { value: 14, suffix: '+', label: 'Flavors', sub: 'Each one a masterpiece' },
              { value: 100, suffix: '+', label: 'Retailers', sub: 'And growing every week' },
              { value: 10, suffix: 'L+', label: 'Kulfis Sold', sub: 'And counting...' },
              { value: 365, suffix: '', label: 'Days/Year', sub: 'Fresh supply, always' },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 80}>
                <div>
                  <div className="text-5xl sm:text-6xl font-black text-white leading-none">
                    <Counter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-amber-400 font-bold text-sm tracking-wide mt-3">{stat.label}</p>
                  <p className="text-gray-500 text-xs mt-1">{stat.sub}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          7. TESTIMONIALS
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-white dark:bg-gray-950 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm font-bold tracking-wide mb-4">
                WHAT OUR PARTNERS SAY
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white">
                Don&apos;t Take Our Word.{' '}
                <span className="text-amber-600">Take Theirs.</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 80}>
                <div className="relative bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 hover:bg-white dark:hover:bg-gray-800 hover:shadow-xl dark:hover:shadow-black/30 transition-all duration-500 border border-transparent hover:border-gray-100 dark:hover:border-gray-700 group">
                  <svg className="w-10 h-10 text-amber-200 dark:text-amber-800 group-hover:text-amber-300 dark:group-hover:text-amber-600 transition-colors mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
                  </svg>
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed font-medium">
                    &quot;{t.text}&quot;
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">{t.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t.role} &middot; {t.location}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          8. WHY US — Value propositions
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 dark:bg-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white">
                The Ganesh Kulfi <span className="text-amber-600">Guarantee</span>
              </h2>
              <p className="mt-4 text-gray-500 dark:text-gray-400 text-lg">
                Why 100+ retailers choose us over every other brand
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🧪', title: 'Zero Artificial Anything', desc: 'No colors, no preservatives, no flavoring. Just real food.' },
              { icon: '⏱️', title: 'Slow-Cooked 6+ Hours', desc: 'Hours of simmering for that dense, creamy texture.' },
              { icon: '❄️', title: 'Cold-Chain Delivery', desc: 'Temperature-controlled from factory to your freezer.' },
              { icon: '💰', title: 'Up to 20% Off', desc: 'Gold tier partners save 20%. More orders, more savings.' },
              { icon: '📱', title: 'Easy Online Orders', desc: 'Order from your phone, track in real-time.' },
              { icon: '🤝', title: 'Dedicated Support', desc: 'A real person picks up when you call. Always.' },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 60}>
                <div className="flex gap-5 p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-xl dark:hover:shadow-black/20 transition-all duration-300 group ring-1 ring-black/[0.03] dark:ring-white/[0.06]">
                  <span className="text-3xl shrink-0 group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">{item.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          9. FLAVOR STRIP — Scrolling images
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-12 bg-white dark:bg-gray-950 overflow-hidden">
        <div className="flex animate-scroll-x gap-5" style={{ width: 'max-content' }}>
          {[...Object.entries(FLAVOR_IMAGES), ...Object.entries(FLAVOR_IMAGES)].map(([name, src], i) => (
            <div key={`${name}-${i}`} className="shrink-0 w-44 group cursor-pointer">
              <div className="rounded-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10 group-hover:ring-amber-300 dark:group-hover:ring-amber-600 shadow-sm group-hover:shadow-xl transition-all duration-500">
                <img src={src} alt={name} className="w-44 h-44 object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
              </div>
              <p className="text-center text-sm font-bold text-gray-700 dark:text-gray-300 mt-2.5 group-hover:text-amber-600 transition-colors">{name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          10. FINAL CTA — Bold gradient card
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="relative bg-gradient-to-br from-amber-600 via-amber-700 to-orange-800 rounded-[2.5rem] p-12 md:p-20 overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />
              <div className="absolute top-1/2 right-10 w-32 h-32 bg-amber-500/30 rounded-full blur-2xl" />

              <div className="relative text-center">
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-sm font-semibold mb-6">
                  JOIN 100+ HAPPY RETAILERS
                </span>
                <h2 className="text-4xl sm:text-6xl font-black text-white leading-tight">
                  Your Customers Are<br />
                  <span className="text-amber-200">Waiting for This Kulfi.</span>
                </h2>
                <p className="mt-6 text-amber-100 max-w-xl mx-auto text-lg leading-relaxed">
                  Don&apos;t let them settle for ordinary ice cream. Join the fastest-growing kulfi brand in Maharashtra.
                  Register today and get your first order within 48 hours.
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-5">
                  <Link href="/signup" className="group inline-flex items-center gap-2 bg-white text-amber-700 hover:bg-amber-50 font-black text-lg px-10 py-5 rounded-2xl shadow-2xl transition-all duration-300 hover:-translate-y-1 active:scale-[0.97]">
                    Start Selling Now
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  <Link href="/cart" className="inline-flex items-center gap-2 bg-transparent border-2 border-white/40 text-white hover:bg-white/10 hover:border-white/70 font-semibold text-lg px-10 py-5 rounded-2xl transition-all duration-300">
                    View Cart 🛒
                  </Link>
                </div>
                <p className="mt-6 text-amber-200/60 text-sm">
                  Free to register &middot; No minimum order &middot; Cancel anytime
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <QuantityModal open={!!modalProduct} onClose={() => setModalProduct(null)} product={modalProduct} />
    </SeoLayout>
  );
};

export default Home;

// ─── SSG — Fetch product catalog at build time ───────────────

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  let products: Product[] = [];

  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
    const res = await fetch(`${API_URL}/api/products`);
    if (res.ok) {
      const json = await res.json();
      products = json.data?.products || [];
    }
  } catch {
    products = getFallbackProducts();
  }

  const featured = products.filter((p) => p.isActive).slice(0, 8);

  return {
    props: { featuredProducts: featured.length > 0 ? featured : getFallbackProducts() },
  };
};

function getFallbackProducts(): Product[] {
  const flavors = [
    { name: 'Mango Kulfi', category: 'CLASSIC' as const, price: 30, desc: 'Rich Alphonso mango kulfi — our most-loved flavor since day one' },
    { name: 'Rabdi Kulfi', category: 'PREMIUM' as const, price: 35, desc: 'Slow-reduced milk with the soul of pure desi rabdi' },
    { name: 'Dry Fruit Kulfi', category: 'PREMIUM' as const, price: 40, desc: 'Loaded with almonds, pistachios, and cashews in every bite' },
    { name: 'Chocolate Kulfi', category: 'FUSION' as const, price: 30, desc: 'Where rich cocoa meets centuries-old kulfi craftsmanship' },
    { name: 'Paan Kulfi', category: 'CLASSIC' as const, price: 30, desc: 'That refreshing betel leaf punch you never knew you needed' },
    { name: 'Strawberry Kulfi', category: 'FRUIT' as const, price: 30, desc: 'Bursting with real strawberry — sweet, pink, irresistible' },
    { name: 'Sitafal Kulfi', category: 'FRUIT' as const, price: 35, desc: 'Seasonal custard apple goodness in frozen perfection' },
    { name: 'Gulkand Kulfi', category: 'SPECIAL' as const, price: 35, desc: 'Rose petal jam frozen into a dessert that feels like poetry' },
  ];

  return flavors.map((f, i) => ({
    id: `fallback-${i}`,
    name: f.name,
    description: f.desc,
    basePrice: f.price,
    category: f.category,
    imageUrl: FLAVOR_IMAGES[f.name] || null,
    isAvailable: true,
    isSeasonal: false,
    minOrderQuantity: 1,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}
