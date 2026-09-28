/**
 * @file src/components/MenuCard.tsx
 * Reusable card displaying an individual menu item.
 * Allows adding to cart, increasing/decreasing quantity directly from the card,
 * and displaying realistic preparation time and dietary info.
 */

import React, { useState } from 'react';
import { Plus, Minus, Check, Clock, Coffee } from 'lucide-react';
import { MenuItem } from '../types';

interface MenuCardProps {
  item: MenuItem;
  cartQuantity: number;
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({
  item,
  cartQuantity,
  onAddToCart,
  onUpdateQuantity,
}) => {
  const [imageError, setImageError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(item);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#EBE3D5] shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col h-full">
      {/* Product Image Slot */}
      <div className="relative aspect-[4/3] bg-[#F4EFEA] overflow-hidden">
        {!imageError ? (
          <img
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          /* Graceful styled SVG fallback container */
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#F5EBE1] to-[#EBDCCB] text-[#8C6D56] p-4 text-center">
            <Coffee className="w-8 h-8 mb-2 opacity-60" />
            <span className="text-xs font-medium">{item.name}</span>
          </div>
        )}

        {/* Popular / Veg indicator in corner */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          {item.isVeg && (
            <span
              className="w-4 h-4 bg-white/95 rounded-xs p-0.5 border border-[#3E6B48] flex items-center justify-center shadow-xs"
              title="Vegetarian"
            >
              <span className="w-2 h-2 rounded-full bg-[#3E6B48]" />
            </span>
          )}
          {item.isPopular && (
            <span className="bg-[#2C1810]/90 backdrop-blur-xs text-[#FFF8F0] text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full shadow-xs">
              Popular
            </span>
          )}
        </div>

        {/* Preparation time badge */}
        {item.prepTime && (
          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-[#5C4033] text-[11px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1 shadow-2xs">
            <Clock className="w-3 h-3 text-[#A98E7B]" />
            <span>{item.prepTime}</span>
          </div>
        )}
      </div>

      {/* Card Content Area */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Unboxed category metadata with separator */}
          <div className="flex items-center gap-1.5 text-xs text-[#8C6D56] font-medium mb-1">
            <span>{item.category}</span>
            {item.tags && item.tags.length > 0 && (
              <>
                <span aria-hidden="true">·</span>
                <span>{item.tags[0]}</span>
              </>
            )}
          </div>

          {/* Item Name */}
          <h3 className="font-serif-display text-lg font-bold text-[#2C1810] tracking-tight group-hover:text-[#5C341D] transition-colors leading-snug">
            {item.name}
          </h3>

          {/* Item Description */}
          <p className="mt-1.5 text-xs text-[#6B5A4E] leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Price & Cart Action Baseline */}
        <div className="mt-4 pt-3 border-t border-[#F0EAE1] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-[#A98E7B] font-medium">Price</span>
            <span className="font-serif-display text-lg font-bold text-[#2C1810] tabular-nums">
              ₹{item.price}
            </span>
          </div>

          {/* Cart Controls */}
          {cartQuantity === 0 ? (
            <button
              onClick={handleAdd}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8C5E38] active:scale-95 ${
                justAdded
                  ? 'bg-[#3E6B48] text-white shadow-xs'
                  : 'bg-[#3E2312] text-[#FFF8F0] hover:bg-[#2C1810] shadow-xs'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5 text-[#E0A96D]" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-[#F6F0E8] border border-[#E2D6C5] rounded-lg p-0.5">
              <button
                onClick={() => onUpdateQuantity(item.id, cartQuantity - 1)}
                className="w-7 h-7 rounded-md bg-white text-[#3E2312] flex items-center justify-center hover:bg-[#EFE3D3] transition-colors shadow-2xs focus:outline-none"
                aria-label={`Decrease quantity of ${item.name}`}
              >
                <Minus className="w-3 h-3" />
              </button>

              <span className="text-xs font-bold text-[#2C1810] w-6 text-center tabular-nums">
                {cartQuantity}
              </span>

              <button
                onClick={() => onUpdateQuantity(item.id, cartQuantity + 1)}
                className="w-7 h-7 rounded-md bg-[#3E2312] text-white flex items-center justify-center hover:bg-[#2C1810] transition-colors shadow-2xs focus:outline-none"
                aria-label={`Increase quantity of ${item.name}`}
              >
                <Plus className="w-3 h-3 text-[#E0A96D]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
