/**
 * @file src/components/CartDrawer.tsx
 * Interactive slide-over cart drawer with custom drink calculations,
 * loyalty points redemption toggle, dining option, and instant ordering.
 */

import React, { useState } from 'react';
import { X, ShoppingBag, ArrowRight, Trash2, ShieldCheck, Award, Sparkles } from 'lucide-react';
import { CartItem, DiningOption, OrderDetails, UserAccount } from '../types';
import { CartItemRow } from './CartItemRow';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  user: UserAccount;
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onOrderPlaced: (order: OrderDetails) => void;
  onExploreMenu: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  user,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderPlaced,
  onExploreMenu,
}) => {
  const [diningOption, setDiningOption] = useState<DiningOption>('Dine-in');
  const [customerName, setCustomerName] = useState(user.name || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [tableOrAddress, setTableOrAddress] = useState('Table 04');
  const [notes, setNotes] = useState('');
  const [redeemPoints, setRedeemPoints] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Subtotal calculation supporting customizations
  const subtotal = items.reduce((acc, curr) => {
    const unitPrice = curr.customization ? curr.customization.calculatedPrice : curr.item.price;
    return acc + unitPrice * curr.quantity;
  }, 0);

  const tax = Math.round(subtotal * 0.05); // 5% GST
  const deliveryFee = diningOption === 'Delivery' && subtotal > 0 ? 30 : 0;
  
  // Redeem points discount (₹1 per point, max ₹100 or 50% of subtotal)
  const maxRedeemable = Math.min(user.loyaltyPoints, 100, Math.floor(subtotal * 0.4));
  const pointsDiscount = redeemPoints ? maxRedeemable : 0;
  
  const finalTotal = Math.max(0, subtotal + tax + deliveryFee - pointsDiscount);
  const pointsToEarn = Math.floor(finalTotal * 0.1); // 10% loyalty cashback

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (items.length === 0) {
      setErrorMessage('Your cart is empty. Add delicious items to place an order.');
      return;
    }

    if (!customerName.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }

    if (!phone.trim() || phone.trim().length < 8) {
      setErrorMessage('Please enter a valid phone number.');
      return;
    }

    if (!tableOrAddress.trim()) {
      setErrorMessage(
        diningOption === 'Dine-in'
          ? 'Please specify your table number (e.g. Table 4).'
          : diningOption === 'Delivery'
          ? 'Please enter your delivery address.'
          : 'Please specify pickup time or note.'
      );
      return;
    }

    setIsSubmitting(true);

    const orderNumber = `BB-${Math.floor(1000 + Math.random() * 9000)}`;
    const orderData: OrderDetails = {
      orderNumber,
      customerName: customerName.trim(),
      phone: phone.trim(),
      diningOption,
      tableOrAddress: tableOrAddress.trim(),
      notes: notes.trim(),
      items: [...items],
      subtotal,
      tax,
      discount: pointsDiscount,
      total: finalTotal,
      status: 'Received',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedTime: diningOption === 'Delivery' ? '30-40 mins' : '12-15 mins',
      earnedPoints: pointsToEarn,
      redeemedPoints: pointsDiscount,
    };

    try {
      // Post to Express backend
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
    } catch (err) {
      console.warn('Backend order store fallback', err);
    } finally {
      setIsSubmitting(false);
      onOrderPlaced(orderData);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col border-l border-[#EADCC9]">
          
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-[#E8DECf] bg-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#3E2312] text-[#E0A96D] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-serif-display text-lg font-bold text-[#2C1810]">
                  Your Order Cart
                </h2>
                <span className="text-xs text-[#8C6D56]">
                  {items.length} {items.length === 1 ? 'item' : 'items'} selected
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {items.length > 0 && (
                <button
                  onClick={onClearCart}
                  className="text-xs text-[#A98E7B] hover:text-[#B85D38] p-1.5 flex items-center gap-1 rounded transition-colors cursor-pointer"
                  title="Clear all items"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Clear</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 text-[#5C4033] hover:text-[#2C1810] hover:bg-[#F3ECE0] rounded-lg transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Drawer Body */}
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#EFE3D3] text-[#7C5A43] flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-serif-display text-xl font-bold text-[#2C1810]">
                Your cart is empty
              </h3>
              <p className="text-xs text-[#7C5A43] mt-2 max-w-xs leading-relaxed">
                Add an artisanal coffee, customize your drink, or pick delicious freshly baked treats.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onExploreMenu();
                }}
                className="mt-6 px-5 py-2.5 bg-[#3E2312] text-[#FFF8F0] text-xs font-semibold uppercase tracking-wider rounded-lg shadow-sm hover:bg-[#2C1810] transition-colors cursor-pointer"
              >
                Explore Menu
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
              {/* Itemized List */}
              <div className="bg-white rounded-xl p-3 sm:p-4 border border-[#E8DECf] shadow-2xs">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38] mb-2">
                  Order Items
                </h3>
                <div className="divide-y divide-[#F0EAE1]">
                  {items.map((cartItem) => (
                    <CartItemRow
                      key={cartItem.id}
                      cartItem={cartItem}
                      onUpdateQuantity={onUpdateQuantity}
                      onRemove={onRemoveItem}
                    />
                  ))}
                </div>
              </div>

              {/* Loyalty Club Perks Widget */}
              {user.loyaltyPoints > 0 && (
                <div className="bg-[#FAF3EC] p-3.5 rounded-xl border border-[#E8DECf] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Award className="w-4 h-4 text-[#8C5E38]" />
                    <div>
                      <span className="text-xs font-bold text-[#2C1810] block">
                        Redeem Brew Club Points
                      </span>
                      <span className="text-[11px] text-[#7C5A43]">
                        Balance: {user.loyaltyPoints} pts (Save up to ₹{maxRedeemable})
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setRedeemPoints(!redeemPoints)}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                      redeemPoints
                        ? 'bg-[#3E6B48] text-white border-[#3E6B48]'
                        : 'bg-white text-[#3E2312] border-[#DFCFC0]'
                    }`}
                  >
                    {redeemPoints ? 'Applied -₹' + pointsDiscount : 'Apply'}
                  </button>
                </div>
              )}

              {/* Order Options & Customer Details */}
              <form id="order-form" onSubmit={handleCheckout} className="bg-white rounded-xl p-4 border border-[#E8DECf] shadow-2xs space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38]">
                  Dining Details
                </h3>

                {/* Dining Option Segmented Tabs */}
                <div className="grid grid-cols-3 gap-1 p-1 bg-[#F4ECE1] rounded-lg">
                  {(['Dine-in', 'Takeaway', 'Delivery'] as DiningOption[]).map((option) => (
                    <button
                      type="button"
                      key={option}
                      onClick={() => setDiningOption(option)}
                      className={`py-1.5 text-xs font-semibold rounded-md transition-all text-center cursor-pointer ${
                        diningOption === option
                          ? 'bg-[#3E2312] text-white shadow-2xs'
                          : 'text-[#6D4C3D] hover:text-[#2C1810]'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {/* Form fields */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-[#5C4033] mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#DFCFC0] rounded-lg text-[#2C1810] focus:outline-none focus:ring-1 focus:ring-[#8C5E38]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#5C4033] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#DFCFC0] rounded-lg text-[#2C1810] focus:outline-none focus:ring-1 focus:ring-[#8C5E38]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#5C4033] mb-1">
                      {diningOption === 'Dine-in'
                        ? 'Table Number *'
                        : diningOption === 'Delivery'
                        ? 'Delivery Address *'
                        : 'Pickup Time / Counter Note *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={
                        diningOption === 'Dine-in'
                          ? 'e.g. Table 04 (Indoor)'
                          : diningOption === 'Delivery'
                          ? 'Flat, Building, Street in Indiranagar'
                          : 'e.g. In 15 minutes'
                      }
                      value={tableOrAddress}
                      onChange={(e) => setTableOrAddress(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#DFCFC0] rounded-lg text-[#2C1810] focus:outline-none focus:ring-1 focus:ring-[#8C5E38]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#5C4033] mb-1">
                      Special Preparation Notes (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Less ice, extra hot, oat milk"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#DFCFC0] rounded-lg text-[#2C1810] focus:outline-none focus:ring-1 focus:ring-[#8C5E38]"
                    />
                  </div>
                </div>

                {errorMessage && (
                  <p className="text-xs text-[#B85D38] bg-[#FDF0EC] p-2 rounded-lg border border-[#F3C4B3]">
                    {errorMessage}
                  </p>
                )}
              </form>
            </div>
          )}

          {/* Drawer Footer: Bill Breakdown & Place Order Button */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#E8DECf] bg-white space-y-3">
              <div className="space-y-1.5 text-xs text-[#6B5A4E]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#2C1810] tabular-nums">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (5% Cafe Tax)</span>
                  <span className="font-semibold text-[#2C1810] tabular-nums">₹{tax}</span>
                </div>
                {diningOption === 'Delivery' && (
                  <div className="flex justify-between text-[#3E6B48]">
                    <span>Packaging & Delivery</span>
                    <span className="font-semibold tabular-nums">₹{deliveryFee}</span>
                  </div>
                )}
                {pointsDiscount > 0 && (
                  <div className="flex justify-between text-[#3E6B48]">
                    <span>Brew Club Loyalty Discount</span>
                    <span className="font-semibold tabular-nums">-₹{pointsDiscount}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-[#F0EAE1] flex justify-between text-sm font-bold text-[#2C1810]">
                  <div>
                    <span>Total Payable</span>
                    <span className="text-[10px] text-[#3E6B48] block font-normal">
                      Earn +{pointsToEarn} points on this order!
                    </span>
                  </div>
                  <span className="font-serif-display text-lg text-[#2C1810] tabular-nums">
                    ₹{finalTotal}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                form="order-form"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-[#3E2312] text-[#FFF8F0] font-semibold text-xs uppercase tracking-wider rounded-xl shadow-md hover:bg-[#2C1810] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed active:scale-[0.99]"
              >
                {isSubmitting ? (
                  <span>Transmitting to Kitchen...</span>
                ) : (
                  <>
                    <span>Place Order · ₹{finalTotal}</span>
                    <ArrowRight className="w-4 h-4 text-[#E0A96D]" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#8C6D56]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#3E6B48]" />
                <span>Pay at café counter / Cash on Delivery · No pre-payment needed</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
