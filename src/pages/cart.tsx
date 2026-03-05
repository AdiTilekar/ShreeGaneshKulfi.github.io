// ============================================================
// Public Cart Page — Enhanced design, WhatsApp checkout
// ============================================================

import type { NextPage } from 'next';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import SeoLayout from '@/components/layout/SeoLayout';
import { usePublicCart } from '@/stores/usePublicCart';
import { FLAVOR_IMAGES } from '@/utils/constants';

// ⚠️ CHANGE THIS to your actual WhatsApp Business number (with country code, no +)
const WHATSAPP_NUMBER = '919028648150';

const inputClass =
  'w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all';

const CartPage: NextPage = () => {
  const { items, removeItem, updateQty, clear, totalAmount } = usePublicCart();
  const [name, setName] = useState('');
  const [shopName, setShopName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <SeoLayout title="Cart">
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900">
          <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </SeoLayout>
    );
  }

  /* ── Build WhatsApp message ── */
  const buildWhatsAppURL = () => {
    const lines = items.map(
      (item, i) => `${i + 1}. ${item.name} × ${item.qty} = ₹${item.price * item.qty}`,
    );

    const msg = [
      `🍦 *New Order — Ganesh Kulfi*`,
      ``,
      `👤 *Name:* ${name.trim()}`,
      `🏪 *Shop:* ${shopName.trim() || 'N/A'}`,
      `📞 *Phone:* ${phone.trim()}`,
      `🏠 *Address:* ${address.trim() || 'N/A'}`,
      ``,
      ...lines,
      ``,
      `💰 *Total: ₹${totalAmount()}*`,
      ``,
      `Please confirm availability and delivery. 🙏`,
    ].join('\n');

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  const canOrder = items.length > 0 && name.trim().length >= 2 && phone.trim().length >= 10 && address.trim().length >= 5;
  const total = totalAmount();

  /* ── Empty state ── */
  if (items.length === 0) {
    return (
      <SeoLayout title="Cart">
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900">
          <div className="w-28 h-28 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-6">
            <span className="text-5xl">🛒</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
            Your cart is empty
          </h1>
          <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-sm text-sm leading-relaxed">
            Looks like you haven&apos;t added any kulfi yet. Browse our delicious collection!
          </p>
          <Link
            href="/products"
            className="mt-8 inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-amber-600/20 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97]"
          >
            🍦 Explore Flavors
          </Link>
        </div>
      </SeoLayout>
    );
  }

  return (
    <SeoLayout title="Cart">
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

          {/* ── Header row ── */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
            <div>
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-medium transition-colors mb-3"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                Continue Shopping
              </Link>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                Your Cart
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {items.length} item{items.length !== 1 ? 's' : ''}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
              <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
                ₹{total}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

            {/* ══════════ Left — Cart Items ══════════ */}
            <div className="lg:col-span-3 space-y-3">
              {items.map((item) => {
                const img = FLAVOR_IMAGES[item.name] || item.image;
                const subtotal = item.price * item.qty;
                return (
                  <div
                    key={item.id}
                    className="group bg-white dark:bg-gray-900 rounded-2xl ring-1 ring-black/[0.04] dark:ring-white/[0.06] shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                  >
                    <div className="flex items-stretch">
                      {/* Image */}
                      <div className="w-24 sm:w-28 shrink-0 bg-amber-50 dark:bg-gray-800">
                        {img ? (
                          <img
                            src={img}
                            alt={item.name}
                            className="w-full h-full object-cover aspect-square"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-4xl aspect-square">
                            🍦
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base truncate">
                              {item.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 mt-0.5">
                              ₹{item.price} per unit
                            </p>
                          </div>
                          <p className="text-base sm:text-lg font-extrabold text-gray-900 dark:text-white shrink-0 tabular-nums">
                            ₹{subtotal}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          {/* Qty stepper */}
                          <div className="inline-flex items-center rounded-xl bg-gray-100 dark:bg-gray-800 ring-1 ring-black/[0.04] dark:ring-white/[0.06]">
                            <button
                              onClick={() => updateQty(item.id, item.qty - 1)}
                              className="w-9 h-9 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 font-bold transition-colors rounded-l-xl hover:bg-gray-200 dark:hover:bg-gray-700"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="w-10 text-center text-sm font-bold text-gray-900 dark:text-white tabular-nums select-none">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => updateQty(item.id, item.qty + 1)}
                              className="w-9 h-9 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 font-bold transition-colors rounded-r-xl hover:bg-gray-200 dark:hover:bg-gray-700"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          {/* Remove */}
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-xs font-medium text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors flex items-center gap-1"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Clear cart */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={clear}
                  className="text-xs font-medium text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear entire cart
                </button>
              </div>
            </div>

            {/* ══════════ Right — Checkout Sidebar ══════════ */}
            <div className="lg:col-span-2">
              <div className="sticky top-24 bg-white dark:bg-gray-900 rounded-3xl ring-1 ring-black/[0.04] dark:ring-white/[0.06] shadow-xl dark:shadow-black/30 overflow-hidden">

                {/* Sidebar header */}
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <h3 className="text-base font-extrabold text-white">Checkout via WhatsApp</h3>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rajesh Patil"
                      className={inputClass}
                    />
                  </div>

                  {/* Shop Name */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                      Shop Name
                    </label>
                    <input
                      type="text"
                      value={shopName}
                      onChange={(e) => setShopName(e.target.value)}
                      placeholder="e.g. Patil Kirana Store"
                      className={inputClass}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                      Contact Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      maxLength={15}
                      className={inputClass}
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                      Delivery Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Full address with area, city, pincode"
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {/* ── Order Summary ── */}
                  <div className="pt-2">
                    <h4 className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-3 uppercase tracking-wider">
                      Order Summary
                    </h4>
                    <div className="space-y-2.5">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between gap-3 text-sm">
                          <span className="text-gray-600 dark:text-gray-400 truncate">
                            {item.name} <span className="text-gray-400 dark:text-gray-500">×{item.qty}</span>
                          </span>
                          <span className="font-semibold text-gray-800 dark:text-gray-200 shrink-0 tabular-nums">
                            ₹{item.price * item.qty}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Divider + Total */}
                    <div className="mt-4 pt-4 border-t border-dashed border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                          Total Amount
                        </span>
                        <span className="text-xl font-black text-amber-600 dark:text-amber-400 tabular-nums">
                          ₹{total}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Validation hint */}
                  {!canOrder && (
                    <p className="text-xs text-center text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800/40 rounded-xl py-2.5 px-3">
                      Fill name, phone &amp; address to place the order
                    </p>
                  )}

                  {/* WhatsApp order button */}
                  <a
                    href={canOrder ? buildWhatsAppURL() : undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => { if (!canOrder) e.preventDefault(); }}
                    className={`w-full flex items-center justify-center gap-3 font-bold text-base py-4 rounded-2xl shadow-lg transition-all duration-300 active:scale-[0.97] ${
                      canOrder
                        ? 'bg-green-600 hover:bg-green-700 text-white shadow-green-600/25 hover:shadow-green-600/40 hover:-translate-y-0.5 cursor-pointer'
                        : 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed shadow-none'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Order on WhatsApp
                  </a>

                  <p className="text-[11px] text-center text-gray-400 dark:text-gray-500 leading-relaxed">
                    Your order &amp; contact details will be sent via WhatsApp for quick confirmation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SeoLayout>
  );
};

export default CartPage;
