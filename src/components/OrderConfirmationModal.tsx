/**
 * @file src/components/OrderConfirmationModal.tsx
 * Celebratory order confirmation modal with QR Code, Track Order CTA,
 * points earned counter, and receipt summary.
 */

import React from 'react';
import { CheckCircle2, Clock, Printer, X, Coffee, MapPin, ArrowRight, Award, QrCode } from 'lucide-react';
import { OrderDetails } from '../types';
import { CAFE_INFO } from '../data/cafeData';

interface OrderConfirmationModalProps {
  order: OrderDetails | null;
  onClose: () => void;
  onTrackOrder: (orderNumber: string) => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
  onTrackOrder,
}) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#E8DECf] overflow-hidden my-8">
        
        {/* Top Header Banner */}
        <div className="bg-[#3E2312] text-[#FFF8F0] p-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-[#DFCFC0] hover:text-white rounded-lg transition-colors cursor-pointer"
            aria-label="Close confirmation"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 bg-[#3E6B48] text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg ring-4 ring-[#FAF7F2]/20">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-[11px] uppercase tracking-widest text-[#E0A96D] font-bold">
            Order Sent To Kitchen
          </span>
          <h2 className="font-serif-display text-2xl sm:text-3xl font-bold mt-1 text-[#FFF8F0]">
            Thank You, {order.customerName}!
          </h2>
          <p className="text-xs text-[#DFCFC0] mt-1">
            Order Reference: <span className="font-mono font-bold text-white tracking-wider">#{order.orderNumber}</span>
          </p>
        </div>

        {/* Status Callout with Points Badge */}
        <div className="bg-[#F0E6D8] px-6 py-3 border-b border-[#E2D4C2] flex items-center justify-between text-xs text-[#5C4033]">
          <div className="flex items-center gap-1.5 font-medium">
            <Clock className="w-4 h-4 text-[#8C5E38]" />
            <span>Est. Ready: <strong className="text-[#2C1810]">{order.estimatedTime}</strong></span>
          </div>

          {order.earnedPoints && (
            <div className="flex items-center gap-1 font-bold text-[#3E6B48] bg-white px-2.5 py-0.5 rounded-full text-[11px] shadow-2xs">
              <Award className="w-3 h-3" />
              <span>+{order.earnedPoints} Points Earned</span>
            </div>
          )}
        </div>

        {/* Receipt Content */}
        <div className="p-6 space-y-5 max-h-[55vh] overflow-y-auto">
          {/* Order Details Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs bg-white p-4 rounded-xl border border-[#E8DECf]">
            <div>
              <span className="text-[#8C6D56] block text-[10px] uppercase">Destination</span>
              <p className="font-medium text-[#2C1810] mt-0.5">{order.tableOrAddress}</p>
            </div>
            <div>
              <span className="text-[#8C6D56] block text-[10px] uppercase">Customer Contact</span>
              <p className="font-medium text-[#2C1810] mt-0.5">{order.phone}</p>
            </div>
            {order.notes && (
              <div className="col-span-2 pt-2 border-t border-[#F0EAE1]">
                <span className="text-[#8C6D56] block text-[10px] uppercase">Preparation Note</span>
                <p className="font-medium text-[#2C1810] italic mt-0.5">&ldquo;{order.notes}&rdquo;</p>
              </div>
            )}
          </div>

          {/* Itemized Receipt Table */}
          <div className="bg-white p-4 rounded-xl border border-[#E8DECf]">
            <h4 className="text-xs font-semibold text-[#8C6D56] uppercase tracking-wider mb-3">
              Items Ordered
            </h4>
            <div className="divide-y divide-[#F0EAE1] space-y-2">
              {order.items.map((cartItem) => {
                const unitPrice = cartItem.customization ? cartItem.customization.calculatedPrice : cartItem.item.price;
                return (
                  <div key={cartItem.id} className="pt-2 first:pt-0 flex items-start justify-between text-xs">
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded bg-[#F4ECE1] text-[#3E2312] flex items-center justify-center font-bold text-[11px] tabular-nums shrink-0 mt-0.5">
                        {cartItem.quantity}
                      </span>
                      <div>
                        <span className="font-medium text-[#2C1810]">{cartItem.item.name}</span>
                        {cartItem.customization && (
                          <p className="text-[10px] text-[#8C5E38]">
                            {cartItem.customization.size}, {cartItem.customization.milk}, {cartItem.customization.sweetness}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="text-[#5C4033] font-semibold tabular-nums shrink-0">
                      ₹{unitPrice * cartItem.quantity}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Calculations Breakdown */}
            <div className="mt-4 pt-3 border-t border-[#E8DECf] space-y-1.5 text-xs text-[#6B5A4E]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-[#2C1810] tabular-nums">₹{order.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span className="font-medium text-[#2C1810] tabular-nums">₹{order.tax}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-[#3E6B48]">
                  <span>Loyalty Discount</span>
                  <span className="font-medium tabular-nums">-₹{order.discount}</span>
                </div>
              )}
              <div className="pt-2 border-t border-[#E8DECf] flex justify-between text-sm font-bold text-[#2C1810]">
                <span>Total Amount</span>
                <span className="font-serif-display text-lg text-[#2C1810] tabular-nums">
                  ₹{order.total}
                </span>
              </div>
            </div>
          </div>

          {/* Café Location & Assistance */}
          <div className="text-center text-xs text-[#8C6D56] space-y-1">
            <p className="font-medium text-[#2C1810]">{CAFE_INFO.name}</p>
            <p>{CAFE_INFO.address}</p>
          </div>
        </div>

        {/* Modal Actions: Track Order CTA */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#E8DECf] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#5C4033] bg-[#F4ECE1] hover:bg-[#EAE0D2] rounded-xl transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onTrackOrder(order.orderNumber);
            }}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#3E2312] hover:bg-[#2C1810] rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Live Track Order</span>
            <ArrowRight className="w-4 h-4 text-[#E0A96D]" />
          </button>
        </div>

      </div>
    </div>
  );
};
