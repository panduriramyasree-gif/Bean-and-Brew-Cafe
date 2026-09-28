/**
 * @file src/components/CartItemRow.tsx
 * Renders an individual item row inside the shopping cart.
 * Displays drink customization badges (Size, Milk, Toppings) if present.
 */

import React, { useState } from 'react';
import { Plus, Minus, Trash2, Coffee, Sliders } from 'lucide-react';
import { CartItem } from '../types';

interface CartItemRowProps {
  cartItem: CartItem;
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemove: (cartItemId: string) => void;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({
  cartItem,
  onUpdateQuantity,
  onRemove,
}) => {
  const { id, item, quantity, customization } = cartItem;
  const [imgError, setImgError] = useState(false);

  // Unit price is calculatedPrice for custom drinks, or item.price for regular items
  const unitPrice = customization ? customization.calculatedPrice : item.price;
  const lineTotal = unitPrice * quantity;

  return (
    <div className="flex items-start gap-3 py-3 border-b border-[#F0EAE1] last:border-b-0">
      {/* Thumbnail */}
      <div className="w-16 h-16 rounded-xl bg-[#F4EFEA] overflow-hidden shrink-0 border border-[#E8DECf]">
        {!imgError && item.image ? (
          <img
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#A98E7B]">
            <Coffee className="w-5 h-5" />
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-1">
          <h4 className="text-sm font-semibold text-[#2C1810] truncate">
            {customization ? `${customization.size} ${item.name}` : item.name}
          </h4>
          <span className="font-semibold text-[#3E2312] text-xs tabular-nums shrink-0">
            ₹{lineTotal}
          </span>
        </div>

        {/* Customization Details Pills */}
        {customization ? (
          <div className="mt-1 space-y-1">
            <div className="flex flex-wrap gap-1 text-[10px]">
              <span className="bg-[#FAF3EC] text-[#8C5E38] px-1.5 py-0.5 rounded font-medium">
                {customization.milk}
              </span>
              <span className="bg-[#FAF3EC] text-[#8C5E38] px-1.5 py-0.5 rounded font-medium">
                {customization.sweetness.split(' ')[0]}
              </span>
              <span className="bg-[#FAF3EC] text-[#8C5E38] px-1.5 py-0.5 rounded font-medium">
                {customization.roast.split(' ')[0]}
              </span>
            </div>
            {customization.toppings && customization.toppings.length > 0 && (
              <p className="text-[10px] text-[#7C5A43] truncate">
                + {customization.toppings.join(', ')}
              </p>
            )}
          </div>
        ) : (
          <span className="text-[11px] text-[#8C6D56]">₹{item.price} each</span>
        )}

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center bg-[#F4ECE1] border border-[#DFCFC0] rounded-lg p-0.5">
            <button
              onClick={() => onUpdateQuantity(id, quantity - 1)}
              className="w-6 h-6 rounded bg-white text-[#3E2312] flex items-center justify-center hover:bg-[#EAE0D2] transition-colors shadow-2xs focus:outline-none cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-xs font-bold text-[#2C1810] w-6 text-center tabular-nums">
              {quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(id, quantity + 1)}
              className="w-6 h-6 rounded bg-[#3E2312] text-white flex items-center justify-center hover:bg-[#2C1810] transition-colors shadow-2xs focus:outline-none cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3 text-[#E0A96D]" />
            </button>
          </div>

          <button
            onClick={() => onRemove(id)}
            className="p-1 text-[#A98E7B] hover:text-[#B85D38] transition-colors rounded hover:bg-[#F3ECE0] cursor-pointer"
            title="Remove item"
            aria-label={`Remove ${item.name} from cart`}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
