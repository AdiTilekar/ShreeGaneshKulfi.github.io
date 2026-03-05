// ============================================================
// Quantity Modal — Opens when user clicks a kulfi card
// Lets them pick qty → adds to public cart with toast
// ============================================================

import { useState, useEffect } from 'react';
import { usePublicCart } from '@/stores/usePublicCart';

interface QuantityModalProps {
  open: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    price: number;
    image: string | null;
  } | null;
}

export default function QuantityModal({ open, onClose, product }: QuantityModalProps) {
  const [qty, setQty] = useState(1);
  const [toast, setToast] = useState(false);
  const addItem = usePublicCart((s) => s.addItem);

  // Reset qty when a new product opens
  useEffect(() => {
    if (open) setQty(1);
  }, [open, product?.id]);

  if (!open || !product) return null;

  const total = product.price * qty;

  const handleAdd = () => {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image }, qty);
    setToast(true);
    setTimeout(() => {
      setToast(false);
      onClose();
    }, 1200);
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
        <div
          className="pointer-events-auto bg-white dark:bg-gray-900 rounded-3xl shadow-2xl dark:shadow-black/60 w-full max-w-sm overflow-hidden ring-1 ring-black/5 dark:ring-white/10 animate-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Product image */}
          {product.image && (
            <div className="relative aspect-[4/3] bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              <button
                onClick={onClose}
                className="absolute top-3 right-3 w-8 h-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 transition-colors"
              >
                ✕
              </button>
            </div>
          )}

          <div className="p-6">
            <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">{product.name}</h3>
            <p className="text-amber-600 font-bold text-lg mt-1">₹{product.price} each</p>

            {/* Qty picker */}
            <div className="mt-6 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Quantity</span>
              <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded-xl px-2 py-1">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-lg font-bold shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
                >
                  −
                </button>
                <input
                  type="number"
                  min={1}
                  value={qty}
                  onChange={(e) => {
                    const v = parseInt(e.target.value, 10);
                    if (!isNaN(v) && v >= 1) setQty(v);
                  }}
                  className="w-14 text-center bg-transparent text-xl font-extrabold text-gray-900 dark:text-white outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-9 h-9 rounded-lg bg-amber-600 text-white text-lg font-bold shadow-sm hover:bg-amber-700 transition-colors flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total */}
            <div className="mt-5 flex justify-between items-center px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 ring-1 ring-amber-200 dark:ring-amber-800">
              <span className="text-sm text-gray-600 dark:text-gray-400">₹{product.price} × {qty}</span>
              <span className="text-2xl font-extrabold text-amber-700 dark:text-amber-400">₹{total}</span>
            </div>

            {/* Add button */}
            <button
              onClick={handleAdd}
              disabled={toast}
              className="mt-5 w-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-lg py-4 rounded-2xl shadow-xl shadow-amber-600/25 hover:shadow-amber-600/40 transition-all duration-300 active:scale-[0.97] disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {toast ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  Added to Cart!
                </>
              ) : (
                <>
                  🛒 Add to Cart — ₹{total}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
