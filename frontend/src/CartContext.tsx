import React, { createContext, useContext, useState } from 'react';

// I defined CartItem to track everything I need to display in the cart summary
export interface CartItem {
  bookID: number;
  title: string;
  price: number;
  quantity: number;
}

// This interface describes what I'm exposing through context —
// the cart array and a function to add items to it
interface CartContextType {
  cart: CartItem[];
  addToCart: (bookID: number, title: string, price: number) => void;
}

// I provide a safe default so useCart() never returns undefined
const CartContext = createContext<CartContextType>({ cart: [], addToCart: () => {} });

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // If the book is already in the cart I increment its quantity instead of adding a duplicate
  const addToCart = (bookID: number, title: string, price: number) => {
    setCart(prev => {
      const existing = prev.find(c => c.bookID === bookID);
      if (existing) {
        return prev.map(c => c.bookID === bookID ? { ...c, quantity: c.quantity + 1 } : c);
      }
      return [...prev, { bookID, title, price, quantity: 1 }];
    });
  };

  return <CartContext.Provider value={{ cart, addToCart }}>{children}</CartContext.Provider>;
}

// I export this custom hook so components don't need to import CartContext directly
export const useCart = () => useContext(CartContext);
