/**
 * @file src/pages/MenuPage.tsx
 * Full menu browsing page with interactive category tabs, instant search,
 * dietary filtering, and responsive grid of MenuCards.
 */

import React, { useState, useMemo } from 'react';
import { ShoppingBag, ArrowRight, UtensilsCrossed } from 'lucide-react';
import { MenuItem, Category } from '../types';
import { MENU_ITEMS } from '../data/cafeData';
import { CategoryFilter } from '../components/CategoryFilter';
import { MenuCard } from '../components/MenuCard';

interface MenuPageProps {
  cartQuantities: Record<string, number>;
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onOpenCart: () => void;
  totalCartItems: number;
  cartSubtotal: number;
}

const CATEGORIES: Category[] = [
  'All',
  'Coffee',
  'Tea',
  'Cold Drinks',
  'Breakfast',
  'Snacks',
  'Desserts',
];

export const MenuPage: React.FC<MenuPageProps> = ({
  cartQuantities,
  onAddToCart,
  onUpdateQuantity,
  onOpenCart,
  totalCartItems,
  cartSubtotal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [popularOnly, setPopularOnly] = useState(false);

  // Filtered menu items calculation
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // Veg filter
      if (vegOnly && !item.isVeg) {
        return false;
      }

      // Popular filter
      if (popularOnly && !item.isPopular) {
        return false;
      }

      // Search query match (name, description, or tags)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesTags = item.tags?.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, searchQuery, vegOnly, popularOnly]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38]">
          Artisanal Food & Drink
        </span>
        <h1 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#2C1810] tracking-tight">
          Bean & Brew Menu
        </h1>
        <p className="text-xs sm:text-sm text-[#7C5A43] leading-relaxed">
          Every cup is freshly ground and pulled to order. Every snack and bakery treat is prepared using authentic, clean ingredients.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#FAF0E6] p-4 sm:p-6 rounded-2xl border border-[#E8DECf]">
        <CategoryFilter
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          vegOnly={vegOnly}
          onToggleVegOnly={() => setVegOnly(!vegOnly)}
          popularOnly={popularOnly}
          onTogglePopularOnly={() => setPopularOnly(!popularOnly)}
        />
      </div>

      {/* Results Count & Active Filters indicator */}
      <div className="flex items-center justify-between text-xs text-[#8C6D56] px-1">
        <span>
          Showing <strong className="text-[#2C1810] tabular-nums">{filteredItems.length}</strong> of{' '}
          <span className="tabular-nums">{MENU_ITEMS.length}</span> delicious items
        </span>

        {(selectedCategory !== 'All' || vegOnly || popularOnly || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
              setVegOnly(false);
              setPopularOnly(false);
            }}
            className="text-xs font-semibold text-[#B85D38] hover:underline cursor-pointer"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Product Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              cartQuantity={cartQuantities[item.id] || 0}
              onAddToCart={onAddToCart}
              onUpdateQuantity={onUpdateQuantity}
            />
          ))}
        </div>
      ) : (
        /* Empty Search / Filter State */
        <div className="bg-white rounded-3xl p-12 text-center border border-[#E8DECf] max-w-md mx-auto my-8">
          <div className="w-14 h-14 rounded-full bg-[#FAF0E6] text-[#8C5E38] flex items-center justify-center mx-auto mb-4">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
          <h3 className="font-serif-display text-xl font-bold text-[#2C1810]">
            No menu items found
          </h3>
          <p className="text-xs text-[#7C5A43] mt-2 leading-relaxed">
            We couldn&apos;t find any item matching &ldquo;{searchQuery}&rdquo; in this category.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
              setVegOnly(false);
              setPopularOnly(false);
            }}
            className="mt-5 px-5 py-2.5 bg-[#3E2312] text-white text-xs font-semibold rounded-xl hover:bg-[#2C1810] transition-colors"
          >
            Show All Menu Items
          </button>
        </div>
      )}

      {/* Floating Bottom Cart Bar for quick checkout */}
      {totalCartItems > 0 && (
        <div className="fixed bottom-5 left-4 right-20 sm:right-24 max-w-xl mx-auto z-30">
          <div className="bg-[#2C1810] text-[#FFF8F0] px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl shadow-xl border border-[#4A2E1B] flex items-center justify-between gap-3 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#E0A96D] text-[#2C1810] flex items-center justify-center font-bold text-xs tabular-nums shadow-xs shrink-0">
                {totalCartItems}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate">
                  {totalCartItems} {totalCartItems === 1 ? 'item' : 'items'}
                </p>
                <p className="text-[11px] text-[#DFCFC0]">
                  <strong className="text-[#E0A96D] tabular-nums">₹{cartSubtotal}</strong>
                </p>
              </div>
            </div>

            <button
              onClick={onOpenCart}
              className="px-3 sm:px-4 py-2 bg-[#E0A96D] hover:bg-[#D49856] text-[#2C1810] text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 shadow-sm cursor-pointer shrink-0"
            >
              <span>Cart</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
