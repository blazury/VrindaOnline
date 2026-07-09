"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cartItems: CartItem[];
  isOpen: boolean;
  inventory: Record<string, number>;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: (open?: boolean) => void;
  decrementStock: (id: string) => void;
  cartSubtotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Default inventory for products set to exactly 1
  const [inventory, setInventory] = useState<Record<string, number>>({
    ghee: 1,
    honey: 1,
    moringa: 1,
    "coconut-oil": 1,
    "premium-masala": 1
  });

  // Load cart and inventory from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("vrnda_cart");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }

      const savedInventory = localStorage.getItem("vrnda_inventory");
      if (savedInventory) {
        setInventory(JSON.parse(savedInventory));
      }
    } catch (e) {
      console.error("Failed to load cart or inventory data", e);
    }
    setIsInitialized(true);
  }, []);

  // Save cart and inventory to localStorage on changes
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem("vrnda_cart", JSON.stringify(cartItems));
        localStorage.setItem("vrnda_inventory", JSON.stringify(inventory));
      } catch (e) {
        console.error("Failed to save cart or inventory data", e);
      }
    }
  }, [cartItems, inventory, isInitialized]);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    const stock = inventory[item.id] ?? 1;
    if (stock <= 0) return; // Product is out of stock!

    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        if (existing.quantity >= stock) {
          return prev; // Limit quantity to available stock!
        }
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsOpen(true); // Open the drawer automatically when an item is added!
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    const stock = inventory[id] ?? 1;
    if (quantity > stock) {
      quantity = stock; // Limit quantity to available stock!
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleCart = (open?: boolean) => {
    setIsOpen((prev) => (open !== undefined ? open : !prev));
  };

  const decrementStock = (id: string) => {
    setInventory((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] ?? 1) - 1)
    }));
  };

  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isOpen,
        inventory,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
        decrementStock,
        cartSubtotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
