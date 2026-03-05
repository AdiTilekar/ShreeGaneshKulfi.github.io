// ============================================================
// App-wide constants — Ganesh Kulfi Web
// ============================================================

/** Base path for GitHub Pages deployment (empty in dev) */
export const BASE_PATH =
  process.env.NODE_ENV === 'production' ? '/ShreeGaneshKulfi.github.io' : '';

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const SITE_NAME = 'Shree Ganesh Kulfi';
export const SITE_TAGLINE = 'Authentic Taste of Tradition — Now Digital';
export const SITE_DESCRIPTION =
  'Premium handcrafted kulfi in 13+ authentic flavors. Order wholesale for your shop or enjoy our traditional recipes directly. Mango, Rabdi, Dry Fruit, and more.';

export const CONTACT = {
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+91-9876543210',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@ganeshkulfi.com',
};

export const SOCIAL_MEDIA = {
  twitter: { handle: '@ganeshkulfi' },
  facebook: { page: 'ganeshkulfi' },
  instagram: { handle: '@ganeshkulfi' },
};

/** Number of items per page for paginated lists */
export const PAGE_SIZE = 20;

/** Auto-refresh interval for dashboard (ms) */
export const DASHBOARD_REFRESH_MS = 15_000;

/** Order status display config */
export const ORDER_STATUS_MAP: Record<
  string,
  { label: string; color: string; badgeClass: string }
> = {
  PENDING:          { label: 'Pending',          color: '#E8860C', badgeClass: 'badge-pending' },
  CONFIRMED:        { label: 'Confirmed',        color: '#26DE81', badgeClass: 'badge-confirmed' },
  PACKED:           { label: 'Packed',            color: '#45B7D1', badgeClass: 'badge-packed' },
  OUT_FOR_DELIVERY: { label: 'Out for Delivery', color: '#8B5CF6', badgeClass: 'badge-delivery' },
  DELIVERED:        { label: 'Delivered',         color: '#10B981', badgeClass: 'badge-delivered' },
  COMPLETED:        { label: 'Completed',         color: '#10B981', badgeClass: 'badge-delivered' },
  REJECTED:         { label: 'Rejected',          color: '#EE5A6F', badgeClass: 'badge-cancelled' },
  CANCELLED:        { label: 'Cancelled',         color: '#EE5A6F', badgeClass: 'badge-cancelled' },
  CANCELLED_ADMIN:  { label: 'Cancelled (Admin)', color: '#EE5A6F', badgeClass: 'badge-cancelled' },
};

/** Pricing tier display config */
export const TIER_MAP: Record<
  string,
  { label: string; discount: number; color: string }
> = {
  GOLD:   { label: 'Gold Tier',   discount: 20, color: '#FFD700' },
  SILVER: { label: 'Silver Tier', discount: 10, color: '#C0C0C0' },
  BASIC:  { label: 'Basic Tier',  discount: 0,  color: '#94a3b8' },
};

/** Kulfi flavor image mapping (local assets in /public/images/flavors/) */
export const FLAVOR_IMAGES: Record<string, string> = {
  'Mango Kulfi':       `${BASE_PATH}/images/flavors/mango_kulfi.png`,
  'Rabdi Kulfi':       `${BASE_PATH}/images/flavors/rabdi_kulfi.png`,
  'Dry Fruit Kulfi':   `${BASE_PATH}/images/flavors/dry_fruit_kulfi.png`,
  'Chocolate Kulfi':   `${BASE_PATH}/images/flavors/chocolate_kulfi.png`,
  'Paan Kulfi':        `${BASE_PATH}/images/flavors/paan_kulfi.png`,
  'Strawberry Kulfi':  `${BASE_PATH}/images/flavors/strawberry_kulfi.png`,
  'Sitafal Kulfi':     `${BASE_PATH}/images/flavors/sitafal_kulfi.png`,
  'Gulkand Kulfi':     `${BASE_PATH}/images/flavors/gulkand_kulfi.png`,
  'Pineapple Kulfi':   `${BASE_PATH}/images/flavors/pineapple_kulfi.png`,
  'Guava Kulfi':       `${BASE_PATH}/images/flavors/guava_kulfi.png`,
  'Jamun Kulfi':       `${BASE_PATH}/images/flavors/jamun_kulfi.png`,
  'Chikoo Kulfi':      `${BASE_PATH}/images/flavors/chikoo_kulfi.png`,
  'Fig Kulfi':         `${BASE_PATH}/images/flavors/fig_kulfi.png`,
  'Cut Kulfi':         `${BASE_PATH}/images/flavors/cut_kulfi.png`,
};
