// ============================================================
// Products Page — Premium Collection Showcase
// ============================================================

import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import SeoLayout from '@/components/layout/SeoLayout';
import QuantityModal from '@/components/ui/QuantityModal';
import type { Product } from '@/types';
import { FLAVOR_IMAGES, SITE_NAME } from '@/utils/constants';

interface ProductsPageProps {
  products: Product[];
}

const CATEGORY_LABELS: Record<string, { label: string; color: string }> = {
  CLASSIC: { label: 'Classic', color: 'bg-amber-100 text-amber-800' },
  PREMIUM: { label: 'Premium', color: 'bg-violet-100 text-violet-800' },
  FRUIT: { label: 'Fruit', color: 'bg-green-100 text-green-800' },
  FUSION: { label: 'Fusion', color: 'bg-blue-100 text-blue-800' },
  SPECIAL: { label: 'Special', color: 'bg-amber-100 text-amber-800' },
};

const ProductsPage: NextPage<ProductsPageProps> = ({ products }) => {
  const [modalProduct, setModalProduct] = useState<{ id: string; name: string; price: number; image: string | null } | null>(null);

  const activeProducts = products.filter((p) => p.isActive);

  return (
    <SeoLayout
      title="Products"
      description="Explore our complete range of 14 handcrafted kulfi flavors. Mango, Rabdi, Dry Fruit, Chocolate, Paan, and more."
    >
      {/* ── Hero Banner ───────────────────────────────────────── */}
      <div className="relative bg-gray-950 dark:bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(220,38,38,0.12),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-amber-400 text-sm font-bold tracking-wider mb-6">
            THE COLLECTION
          </span>
          <h1 className="text-5xl sm:text-7xl font-black text-white leading-tight">
            14 Flavors of{' '}
            <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent">
              Pure Joy
            </span>
          </h1>
          <p className="mt-6 text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto">
            Each one slow-cooked, hand-crafted, and frozen with the care of three generations.
            Find the flavor your customers will fall in love with.
          </p>
          <Link href="/signup" className="mt-8 inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-amber-600/30 hover:-translate-y-0.5 transition-all duration-300 text-sm">
            Become a Retail Partner →
          </Link>
        </div>
      </div>

      {/* ── Product Grid ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="flex items-center justify-between mb-10">
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            <span className="text-gray-900 dark:text-white font-bold">{activeProducts.length}</span> flavors available
          </p>
          <Link href="/cart" className="text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors">
            View Cart →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {activeProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickAdd={() => setModalProduct({ id: product.id, name: product.name, price: product.basePrice, image: FLAVOR_IMAGES[product.name] || product.imageUrl || null })}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/30 dark:to-amber-900/20 rounded-3xl p-10 sm:p-14 ring-1 ring-amber-200/50 dark:ring-amber-700/30">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">
              Can&apos;t decide? <span className="text-amber-600">Order a sample pack.</span>
            </h2>
            <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-lg mx-auto text-lg">
              Get a taste of all 14 flavors and let your customers pick their favorites.
              Register as a retail partner to order.
            </p>
            <Link
              href="/signup"
              className="mt-8 inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold px-10 py-5 rounded-2xl shadow-xl shadow-amber-600/30 hover:-translate-y-1 transition-all duration-300"
            >
              Start Selling Now →
            </Link>
          </div>
        </div>
      </div>

      <QuantityModal open={!!modalProduct} onClose={() => setModalProduct(null)} product={modalProduct} />
    </SeoLayout>
  );
};

export default ProductsPage;

// ─── Product Card ────────────────────────────────────────────

function ProductCard({
  product,
  onQuickAdd,
}: {
  product: Product;
  onQuickAdd: () => void;
}) {
  const flavorImage = FLAVOR_IMAGES[product.name] || product.imageUrl;
  const cat = CATEGORY_LABELS[product.category] || { label: product.category, color: 'bg-gray-100 text-gray-700' };

  return (
    <div onClick={onQuickAdd} className="group relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl dark:hover:shadow-black/40 ring-1 ring-black/[0.04] dark:ring-white/[0.06] transition-all duration-500 hover:-translate-y-2 flex flex-col cursor-pointer">
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-amber-50/60 to-gray-50 dark:from-gray-800 dark:to-gray-900">
        {flavorImage ? (
          <img
            src={flavorImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-6xl opacity-30 select-none">🍦</span>
          </div>
        )}
        {/* Hover gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Category badge */}
        <span className={`absolute top-4 left-4 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide ${cat.color}`}>
          {cat.label}
        </span>

        {product.isSeasonal && (
          <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-400 text-amber-900 tracking-wide">
            🌸 Seasonal
          </span>
        )}

        {/* Price on hover */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
          <span className="text-white font-extrabold text-3xl drop-shadow-lg">₹{product.basePrice.toFixed(0)}</span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg group-hover:text-amber-600 transition-colors duration-300">
            {product.name}
          </h3>
          <span className="text-lg font-bold text-amber-500 sm:group-hover:opacity-0 transition-opacity shrink-0">
            ₹{product.basePrice.toFixed(0)}
          </span>
        </div>
        {product.description && (
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">{product.description}</p>
        )}

      </div>
    </div>
  );
}

// ─── SSG ──────────────────────────────────────────────────────

export const getStaticProps: GetStaticProps<ProductsPageProps> = async () => {
  let products: Product[] = [];

  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
    const res = await fetch(`${API_URL}/api/products`);
    if (res.ok) {
      const json = await res.json();
      products = json.data?.products || [];
    }
  } catch {
    // Fallback products
  }

  if (products.length === 0) {
    products = getStaticFallbackProducts();
  }

  return {
    props: { products },
  };
};

function getStaticFallbackProducts(): Product[] {
  const flavors = [
    { name: 'Mango Kulfi', cat: 'CLASSIC' as const, price: 30, desc: 'Rich Alphonso mango kulfi, slow-frozen to perfection' },
    { name: 'Rabdi Kulfi', cat: 'PREMIUM' as const, price: 35, desc: 'Classic rabdi flavored kulfi with condensed milk richness' },
    { name: 'Dry Fruit Kulfi', cat: 'PREMIUM' as const, price: 40, desc: 'Loaded with almonds, cashews, and pistachios' },
    { name: 'Chocolate Kulfi', cat: 'FUSION' as const, price: 30, desc: 'Belgian cocoa meets traditional kulfi craftsmanship' },
    { name: 'Paan Kulfi', cat: 'CLASSIC' as const, price: 30, desc: 'Betel leaf infused kulfi with a refreshing twist' },
    { name: 'Strawberry Kulfi', cat: 'FRUIT' as const, price: 30, desc: 'Fresh strawberry puree blended into creamy kulfi' },
    { name: 'Sitafal Kulfi', cat: 'FRUIT' as const, price: 35, desc: 'Custard apple (sitafal) flavored seasonal delight' },
    { name: 'Gulkand Kulfi', cat: 'SPECIAL' as const, price: 35, desc: 'Rose petal preserve (gulkand) infused kulfi' },
    { name: 'Pineapple Kulfi', cat: 'FRUIT' as const, price: 30, desc: 'Tropical pineapple goodness in every bite' },
    { name: 'Guava Kulfi', cat: 'FRUIT' as const, price: 30, desc: 'Desi pink guava flavored traditional kulfi' },
    { name: 'Jamun Kulfi', cat: 'FRUIT' as const, price: 30, desc: 'Indian blackberry (jamun) with a tangy-sweet profile' },
    { name: 'Chikoo Kulfi', cat: 'FRUIT' as const, price: 30, desc: 'Sapodilla (chikoo) kulfi, naturally sweet and earthy' },
    { name: 'Fig Kulfi', cat: 'SPECIAL' as const, price: 35, desc: 'Premium fig flavored kulfi with real fig pieces' },
  ];

  return flavors.map((f, i) => ({
    id: `fallback-${i}`,
    name: f.name,
    description: f.desc,
    basePrice: f.price,
    category: f.cat,
    imageUrl: FLAVOR_IMAGES[f.name] || null,
    isAvailable: true,
    isSeasonal: f.cat === 'SPECIAL',
    minOrderQuantity: 1,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}
