/**
 * @file src/App.tsx
 * Master Application Coordinator for Bean & Brew Café.
 * 
 * Features:
 * - Routing between Home, Menu, Custom Coffee Builder, Order Tracking, Loyalty Club, About, Contact, Admin
 * - Multi-line shopping cart supporting custom coffee configurations
 * - Loyalty Points balance and rewards redemption
 * - Gemini AI Barista Assistant modal
 * - Express backend persistence for live kitchen orders & status
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  PageId, 
  CartItem, 
  MenuItem, 
  OrderDetails, 
  CoffeeCustomization, 
  UserAccount 
} from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { CoffeeBuilder } from './components/CoffeeBuilder';
import { AIBaristaModal } from './components/AIBaristaModal';

// Pages
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { LoyaltyPage } from './pages/LoyaltyPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

export default function App() {
  // 1. Navigation State
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [trackingOrderNumber, setTrackingOrderNumber] = useState<string>('BB-7421');

  // 2. Simulated Customer User Account (Demonstrating Authentication / Loyalty / State)
  const [user, setUser] = useState<UserAccount>(() => {
    try {
      const saved = localStorage.getItem('bean_and_brew_user');
      return saved ? JSON.parse(saved) : {
        name: 'Aditi Varma',
        email: 'aditi.varma@example.com',
        phone: '+91 98765 11223',
        loyaltyPoints: 180, // initial welcome points
        role: 'customer'
      };
    } catch {
      return {
        name: 'Aditi Varma',
        email: 'aditi.varma@example.com',
        phone: '+91 98765 11223',
        loyaltyPoints: 180,
        role: 'customer'
      };
    }
  });

  // 3. Shopping Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('bean_and_brew_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 4. Modals & Overlay State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAIBaristaOpen, setIsAIBaristaOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bean_and_brew_cart', JSON.stringify(cartItems));
      localStorage.setItem('bean_and_brew_user', JSON.stringify(user));
    } catch (err) {
      console.warn('Could not save to localStorage', err);
    }
  }, [cartItems, user]);

  // Derived quantity map for standard menu cards
  const cartQuantities = useMemo(() => {
    const map: Record<string, number> = {};
    cartItems.forEach((ci) => {
      if (!ci.customization) {
        map[ci.item.id] = (map[ci.item.id] || 0) + ci.quantity;
      }
    });
    return map;
  }, [cartItems]);

  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [cartItems]);

  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((acc, curr) => {
      const unitPrice = curr.customization ? curr.customization.calculatedPrice : curr.item.price;
      return acc + unitPrice * curr.quantity;
    }, 0);
  }, [cartItems]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((cur) => (cur === message ? null : cur));
    }, 2400);
  };

  // --- Cart Actions ---

  // Standard Item Add
  const handleAddToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id && !ci.customization);
      if (existing) {
        return prev.map((ci) =>
          ci.id === existing.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { id: `item-${Date.now()}-${item.id}`, item, quantity: 1 }];
    });
    showToast(`Added ${item.name} to cart`);
  };

  // Customized Drink Add (Base + Size + Milk + Toppings)
  const handleAddCustomizedCoffee = (customization: CoffeeCustomization, baseItem: MenuItem) => {
    const newCartItem: CartItem = {
      id: `custom-${Date.now()}`,
      item: baseItem,
      quantity: 1,
      customization,
    };
    setCartItems((prev) => [...prev, newCartItem]);
    showToast(`Added Custom ${customization.size} ${baseItem.name} to cart`);
    setIsCartOpen(true);
  };

  // Update item quantity by line ID
  const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((ci) => (ci.id === cartItemId ? { ...ci, quantity: newQuantity } : ci))
    );
  };

  // Remove by line ID
  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.id !== cartItemId));
    showToast('Item removed from cart');
  };

  const handleClearCart = () => {
    setCartItems([]);
    showToast('Cart cleared');
  };

  // When order is placed
  const handleOrderPlaced = (order: OrderDetails) => {
    setCompletedOrder(order);
    setCartItems([]);
    setIsCartOpen(false);

    // Update user's loyalty points balance (+earned, -redeemed)
    if (order.earnedPoints || order.redeemedPoints) {
      setUser((prev) => ({
        ...prev,
        loyaltyPoints: Math.max(0, prev.loyaltyPoints - (order.redeemedPoints || 0) + (order.earnedPoints || 0)),
      }));
    }
  };

  // Redeem perks from Loyalty page
  const handleRedeemReward = (pointsCost: number, rewardTitle: string) => {
    setUser((prev) => ({
      ...prev,
      loyaltyPoints: Math.max(0, prev.loyaltyPoints - pointsCost),
    }));
    showToast(`Redeemed ${rewardTitle}! Points updated.`);
  };

  const handleTrackOrderFromModal = (orderNumber: string) => {
    setCompletedOrder(null);
    setTrackingOrderNumber(orderNumber);
    setCurrentPage('track');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2C1810]">
      
      {/* 1. Header Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAIBarista={() => setIsAIBaristaOpen(true)}
      />

      {/* 2. Main Page Router */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={setCurrentPage}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenAIBarista={() => setIsAIBaristaOpen(true)}
            cartQuantities={cartQuantities}
            onAddToCart={handleAddToCart}
            onUpdateQuantity={(itemId, qty) => {
              const target = cartItems.find((ci) => ci.item.id === itemId && !ci.customization);
              if (target) handleUpdateQuantity(target.id, qty);
            }}
          />
        )}

        {currentPage === 'menu' && (
          <MenuPage
            cartQuantities={cartQuantities}
            onAddToCart={handleAddToCart}
            onUpdateQuantity={(itemId, qty) => {
              const target = cartItems.find((ci) => ci.item.id === itemId && !ci.customization);
              if (target) handleUpdateQuantity(target.id, qty);
            }}
            onOpenCart={() => setIsCartOpen(true)}
            totalCartItems={totalCartCount}
            cartSubtotal={cartSubtotal}
          />
        )}

        {currentPage === 'builder' && (
          <CoffeeBuilder
            onAddCustomizedCoffee={handleAddCustomizedCoffee}
            onExploreMenu={() => setCurrentPage('menu')}
          />
        )}

        {currentPage === 'track' && (
          <OrderTrackingPage initialOrderNumber={trackingOrderNumber} />
        )}

        {currentPage === 'loyalty' && (
          <LoyaltyPage
            user={user}
            onRedeemReward={handleRedeemReward}
            onExploreMenu={() => setCurrentPage('menu')}
          />
        )}

        {currentPage === 'admin' && (
          <AdminDashboardPage />
        )}

        {currentPage === 'about' && (
          <AboutPage onNavigate={setCurrentPage} />
        )}

        {currentPage === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* 3. Footer */}
      <Footer onNavigate={setCurrentPage} />

      {/* 4. Slide-over Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        user={user}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderPlaced={handleOrderPlaced}
        onExploreMenu={() => {
          setIsCartOpen(false);
          setCurrentPage('menu');
        }}
      />

      {/* 5. Gemini AI Barista Sommelier Modal */}
      <AIBaristaModal
        isOpen={isAIBaristaOpen}
        onClose={() => setIsAIBaristaOpen(false)}
        onApplyRecommendation={(customization, baseItem) => {
          handleAddCustomizedCoffee(customization, baseItem);
        }}
      />

      {/* 6. Order Confirmation Modal */}
      <OrderConfirmationModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
        onTrackOrder={handleTrackOrderFromModal}
      />

      {/* 7. Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2C1810] text-[#FFF8F0] text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg border border-[#4A2E1B] flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span className="w-2 h-2 rounded-full bg-[#E0A96D]" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
