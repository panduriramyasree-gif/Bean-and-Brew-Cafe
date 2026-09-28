/**
 * @file src/components/CategoryFilter.tsx
 * Interactive category tabs and search bar for the menu.
 * Allows instant live filtering by category, search term, and dietary preference.
 */

import React from 'react';
import { Search, X, Flame } from 'lucide-react';
import { Category } from '../types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  vegOnly: boolean;
  onToggleVegOnly: () => void;
  popularOnly: boolean;
  onTogglePopularOnly: () => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  vegOnly,
  onToggleVegOnly,
  popularOnly,
  onTogglePopularOnly,
}) => {
  return (
    <div className="space-y-4">
      {/* Top row: Search and Quick Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input Box */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C6D56]" />
          <input
            type="text"
            placeholder="Search cappuccino, fries, sandwich..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 bg-white border border-[#E3D7C7] rounded-xl text-sm text-[#2C1810] placeholder:text-[#A98E7B] focus:outline-none focus:ring-2 focus:ring-[#8C5E38] focus:border-transparent transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A98E7B] hover:text-[#2C1810] p-1"
              aria-label="Clear search query"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Dietary & Popular toggles */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Pure Veg filter toggle */}
          <button
            onClick={onToggleVegOnly}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
              vegOnly
                ? 'bg-[#3E6B48] text-white border-[#3E6B48] shadow-xs'
                : 'bg-white text-[#5C4033] border-[#E3D7C7] hover:border-[#3E6B48]'
            }`}
          >
            <span
              className={`w-3.5 h-3.5 rounded-xs p-0.5 border flex items-center justify-center ${
                vegOnly ? 'border-white' : 'border-[#3E6B48]'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  vegOnly ? 'bg-white' : 'bg-[#3E6B48]'
                }`}
              />
            </span>
            <span>Pure Veg</span>
          </button>

          {/* Popular toggle */}
          <button
            onClick={onTogglePopularOnly}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
              popularOnly
                ? 'bg-[#B85D38] text-white border-[#B85D38] shadow-xs'
                : 'bg-white text-[#5C4033] border-[#E3D7C7] hover:border-[#B85D38]'
            }`}
          >
            <Flame className={`w-3.5 h-3.5 ${popularOnly ? 'text-white' : 'text-[#B85D38]'}`} />
            <span>Popular Only</span>
          </button>
        </div>
      </div>

      {/* Category Segmented Scrollable Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar -mx-1 px-1">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold whitespace-nowrap rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8C5E38] cursor-pointer ${
                isSelected
                  ? 'bg-[#3E2312] text-[#FFF8F0] shadow-xs'
                  : 'bg-white text-[#6D4C3D] hover:bg-[#F3ECE0] hover:text-[#2C1810] border border-[#E8DECf]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};
