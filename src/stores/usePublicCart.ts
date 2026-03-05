// ============================================================
// Public Cart Store — for website visitors (non-retailer)
// Persisted in localStorage. Sends order via WhatsApp.
// ============================================================

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface PublicCartItem {
  id: string;
  name: string;
  price: number;
  image: string | null;
  qty: number;
}

interface PublicCartState {
  items: PublicCartItem[];
}

interface PublicCartActions {
  addItem: (item: Omit<PublicCartItem, 'qty'>, qty?: number) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  totalItems: () => number;
  totalAmount: () => number;
}

export const usePublicCart = create<PublicCartState & PublicCartActions>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item, qty = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, qty: i.qty + qty } : i,
              ),
            };
          }
          return { items: [...state.items, { ...item, qty }] };
        }),

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      updateQty: (id, qty) =>
        set((state) => ({
          items:
            qty <= 0
              ? state.items.filter((i) => i.id !== id)
              : state.items.map((i) => (i.id === id ? { ...i, qty } : i)),
        })),

      clear: () => set({ items: [] }),

      totalItems: () => get().items.reduce((s, i) => s + i.qty, 0),

      totalAmount: () => get().items.reduce((s, i) => s + i.price * i.qty, 0),
    }),
    {
      name: 'ganesh-kulfi-public-cart',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined'
          ? localStorage
          : { getItem: () => null, setItem: () => {}, removeItem: () => {} },
      ),
    },
  ),
);
