// ============================================================
// Become a Partner — Fill form, then discuss on WhatsApp
// ============================================================

import type { NextPage } from 'next';
import { useState } from 'react';
import Link from 'next/link';
import SeoLayout from '@/components/layout/SeoLayout';
import { SITE_NAME } from '@/utils/constants';

// ⚠️ Same WhatsApp number used in cart.tsx — update both if you change it
const WHATSAPP_NUMBER = '919028648150';

const STATES = [
  'Maharashtra', 'Gujarat', 'Rajasthan', 'Madhya Pradesh', 'Karnataka',
  'Goa', 'Telangana', 'Andhra Pradesh', 'Tamil Nadu', 'Kerala',
  'Uttar Pradesh', 'Delhi', 'Haryana', 'Punjab', 'Other',
];

const SignupPage: NextPage = () => {
  const [form, setForm] = useState({
    name: '',
    shopName: '',
    phone: '',
    state: '',
    address: '',
  });

  const handleChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const isValid =
    form.name.trim().length >= 2 &&
    form.shopName.trim().length >= 2 &&
    form.phone.trim().length >= 10 &&
    form.state.trim().length > 0 &&
    form.address.trim().length >= 5;

  const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    [
      `🍦 *New Partner Inquiry — Ganesh Kulfi*`,
      ``,
      `👤 *Name:* ${form.name.trim()}`,
      `🏪 *Shop Name:* ${form.shopName.trim()}`,
      `📞 *Phone:* ${form.phone.trim()}`,
      `📍 *State:* ${form.state}`,
      `🏠 *Address:* ${form.address.trim()}`,
      ``,
      `I'm interested in becoming a retail partner. Please share pricing, delivery details, and next steps! 🙏`,
    ].join('\n'),
  )}`;

  const inputClass =
    'w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all text-sm';

  return (
    <SeoLayout title="Become a Partner">
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900 p-4 sm:p-6">
        <div className="w-full max-w-md py-10">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="text-5xl block mb-3">🤝</span>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">{SITE_NAME}</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1.5 text-sm">
              Fill in your details to start a conversation
            </p>
          </div>

          {/* Form card */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl dark:shadow-black/40 ring-1 ring-black/5 dark:ring-white/10 p-6 sm:p-8 space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={handleChange('name')}
                placeholder="e.g. Rajesh Patil"
                className={inputClass}
              />
            </div>

            {/* Shop Name */}
            <div>
              <label htmlFor="shopName" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Shop Name <span className="text-red-500">*</span>
              </label>
              <input
                id="shopName"
                type="text"
                value={form.shopName}
                onChange={handleChange('shopName')}
                placeholder="e.g. Patil Kirana Store"
                className={inputClass}
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange('phone')}
                placeholder="e.g. 9876543210"
                maxLength={15}
                className={inputClass}
              />
            </div>

            {/* State */}
            <div>
              <label htmlFor="state" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                State <span className="text-red-500">*</span>
              </label>
              <select
                id="state"
                value={form.state}
                onChange={handleChange('state')}
                className={`${inputClass} ${!form.state ? 'text-gray-400 dark:text-gray-500' : ''}`}
              >
                <option value="" disabled>Select your state</option>
                {STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Shop Address <span className="text-red-500">*</span>
              </label>
              <textarea
                id="address"
                rows={3}
                value={form.address}
                onChange={handleChange('address')}
                placeholder="Full shop address with area, city, pincode"
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Hint when not valid */}
            {!isValid && (
              <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
                Please fill all fields to enable the WhatsApp button
              </p>
            )}

            {/* Discuss on WhatsApp — only clickable when form is filled */}
            <a
              href={isValid ? whatsappURL : undefined}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => { if (!isValid) e.preventDefault(); }}
              className={`w-full flex items-center justify-center gap-3 font-bold text-lg py-4 rounded-2xl shadow-xl transition-all duration-300 active:scale-[0.97] ${
                isValid
                  ? 'bg-green-600 hover:bg-green-700 text-white shadow-green-600/25 hover:shadow-green-600/40 hover:-translate-y-0.5 cursor-pointer'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed shadow-none'
              }`}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Discuss on WhatsApp
            </a>

            <p className="text-xs text-center text-gray-400 dark:text-gray-500">
              Your details will be shared via WhatsApp for quick discussion
            </p>
          </div>

          {/* Back link */}
          <p className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
            <Link href="/" className="hover:text-amber-600 transition-colors">
              ← Back to Home
            </Link>
          </p>
        </div>
      </div>
    </SeoLayout>
  );
};

export default SignupPage;
