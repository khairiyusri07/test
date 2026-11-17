import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { findItem } from './data';

export type CartLine = { id: string; qty: number };

const STORAGE_KEY = 'hc-order-cart-v1';

function loadCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((l): l is CartLine => !!l && typeof l.id === 'string' && findItem(l.id) !== undefined && typeof l.qty === 'number' && l.qty > 0)
      .map((l) => ({ id: l.id, qty: Math.min(99, Math.floor(l.qty)) }));
  } catch {
    return [];
  }
}

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  flash: string | null;
  add: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(loadCart);
  const [flash, setFlash] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Storage can be unavailable in private browsing; the cart still works for this visit.
    }
  }, [lines]);

  useEffect(() => {
    if (!flash) return;
    const timer = window.setTimeout(() => setFlash(null), 2800);
    return () => window.clearTimeout(timer);
  }, [flash]);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((total, line) => total + line.qty, 0);
    const subtotal = lines.reduce((total, line) => {
      const item = findItem(line.id);
      return total + (item ? item.price * line.qty : 0);
    }, 0);

    return {
      lines,
      count,
      subtotal,
      flash,
      add(id) {
        const item = findItem(id);
        if (!item) return;
        setLines((prev) => {
          const existing = prev.find((line) => line.id === id);
          if (existing) return prev.map((line) => (line.id === id ? { ...line, qty: Math.min(99, line.qty + 1) } : line));
          return [...prev, { id, qty: 1 }];
        });
        setFlash(`${item.name} added to your order`);
      },
      setQty(id, qty) {
        setLines((prev) =>
          qty <= 0
            ? prev.filter((line) => line.id !== id)
            : prev.map((line) => (line.id === id ? { ...line, qty: Math.min(99, Math.floor(qty)) } : line)),
        );
      },
      remove(id) {
        setLines((prev) => prev.filter((line) => line.id !== id));
      },
      clear() {
        setLines([]);
      },
    };
  }, [lines, flash]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const value = useContext(CartContext);
  if (!value) throw new Error('useCart must be used inside a CartProvider');
  return value;
}
