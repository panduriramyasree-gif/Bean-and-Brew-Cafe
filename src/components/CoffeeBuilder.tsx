/**
 * @file src/components/CoffeeBuilder.tsx
 * Interactive "Build Your Coffee" Customizer.
 * Lets customers customize:
 * 1. Base Drink (Espresso, Latte, Cold Coffee, Cappuccino, Americano)
 * 2. Size (Small +₹0, Medium +₹30, Large +₹60)
 * 3. Milk (Regular Milk +₹0, Oat Milk +₹40, Almond Milk +₹45, Soy Milk +₹35)
 * 4. Sweetness (No Sugar 0%, Less Sugar 50%, Normal Sugar 100%)
 * 5. Roast (Medium Roast, Dark Roast Arabica)
 * 6. Toppings (Caramel Drizzle +₹25, Chocolate Swirl +₹25, Whipped Cream +₹35, Cinnamon Dust +₹15, Extra Shot +₹40)
 *
 * Real-time price calculation:
 * Base Price + Size Offset + Milk Offset + Toppings Sum = Final Custom Price!
 */

import React, { useState, useMemo } from 'react';
import { Coffee, Plus, Check, Sparkles, Sliders, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { 
  CoffeeSize, 
  CoffeeMilk, 
  CoffeeSweetness, 
  CoffeeRoast, 
  CoffeeTopping, 
  CoffeeCustomization, 
  MenuItem 
} from '../types';
import { MENU_ITEMS } from '../data/cafeData';

interface CoffeeBuilderProps {
  onAddCustomizedCoffee: (customization: CoffeeCustomization, baseItem: MenuItem) => void;
  onExploreMenu: () => void;
}

// Configurable pricing matrix
export const CUSTOMIZATION_PRICING = {
  sizes: {
    'Small': { label: 'Small (250ml)', price: 0, tag: 'Single shot' },
    'Medium': { label: 'Medium (350ml)', price: 30, tag: 'Double shot, popular' },
    'Large': { label: 'Large (450ml)', price: 60, tag: 'Triple shot boost' },
  } as Record<CoffeeSize, { label: string; price: number; tag: string }>,

  milks: {
    'Regular Milk': { label: 'Whole Cow Milk', price: 0, desc: 'Classic velvety creaminess' },
    'Oat Milk': { label: 'Artisan Oat Milk', price: 40, desc: 'Dairy-free, naturally sweet & silky' },
    'Almond Milk': { label: 'Roasted Almond Milk', price: 45, desc: 'Light, nutty & low calorie' },
    'Soy Milk': { label: 'Organic Soy Milk', price: 35, desc: 'High protein plant-based' },
  } as Record<CoffeeMilk, { label: string; price: number; desc: string }>,

  sweetness: [
    { id: 'No Sugar (0%)', label: 'No Sugar', percent: '0%', desc: 'Pure espresso notes' },
    { id: 'Less Sugar (50%)', label: 'Mild Sugar', percent: '50%', desc: 'Subtle sweetness' },
    { id: 'Normal Sugar (100%)', label: 'Standard Sweet', percent: '100%', desc: 'Café standard' },
  ] as { id: CoffeeSweetness; label: string; percent: string; desc: string }[],

  roasts: [
    { id: 'Medium Roast', label: 'Medium Roast', desc: 'Citrus, floral & caramel notes' },
    { id: 'Dark Roast Arabica', label: 'Dark Roast Arabica', desc: 'Bold, dark cocoa & smoky finish' },
  ] as { id: CoffeeRoast; label: string; desc: string }[],

  toppings: [
    { id: 'Caramel Drizzle', label: 'Salted Caramel Drizzle', price: 25 },
    { id: 'Chocolate Swirl', label: 'Belgian Chocolate Swirl', price: 25 },
    { id: 'Whipped Cream', label: 'Fresh Vanilla Whipped Cream', price: 35 },
    { id: 'Cinnamon Dust', label: 'Ceylon Cinnamon Dust', price: 15 },
    { id: 'Extra Espresso Shot', label: 'Extra Arabica Espresso Shot', price: 40 },
  ] as { id: CoffeeTopping; label: string; price: number }[],
};

export const CoffeeBuilder: React.FC<CoffeeBuilderProps> = ({
  onAddCustomizedCoffee,
  onExploreMenu,
}) => {
  // Available base drinks from menu
  const baseCoffeeItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => item.category === 'Coffee' || item.category === 'Cold Drinks');
  }, []);

  // Builder state
  const [selectedDrinkId, setSelectedDrinkId] = useState<string>(baseCoffeeItems[0]?.id || 'cappuccino-01');
  const [size, setSize] = useState<CoffeeSize>('Medium');
  const [milk, setMilk] = useState<CoffeeMilk>('Regular Milk');
  const [sweetness, setSweetness] = useState<CoffeeSweetness>('Less Sugar (50%)');
  const [roast, setRoast] = useState<CoffeeRoast>('Dark Roast Arabica');
  const [selectedToppings, setSelectedToppings] = useState<CoffeeTopping[]>(['Caramel Drizzle']);
  const [notes, setNotes] = useState('');
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Active base item
  const selectedBaseItem = baseCoffeeItems.find((item) => item.id === selectedDrinkId) || baseCoffeeItems[0];

  // Mathematical price calculation
  const sizeCost = CUSTOMIZATION_PRICING.sizes[size].price;
  const milkCost = CUSTOMIZATION_PRICING.milks[milk].price;
  const toppingsCost = selectedToppings.reduce((sum, topId) => {
    const topping = CUSTOMIZATION_PRICING.toppings.find((t) => t.id === topId);
    return sum + (topping ? topping.price : 0);
  }, 0);

  const finalCalculatedPrice = selectedBaseItem.price + sizeCost + milkCost + toppingsCost;

  // Toggle topping
  const handleToggleTopping = (toppingId: CoffeeTopping) => {
    if (selectedToppings.includes(toppingId)) {
      setSelectedToppings(selectedToppings.filter((t) => t !== toppingId));
    } else {
      setSelectedToppings([...selectedToppings, toppingId]);
    }
  };

  // Add to cart handler
  const handleAddToCart = () => {
    const customization: CoffeeCustomization = {
      baseDrinkId: selectedBaseItem.id,
      baseDrinkName: selectedBaseItem.name,
      size,
      milk,
      sweetness,
      roast,
      toppings: selectedToppings,
      notes: notes.trim(),
      calculatedPrice: finalCalculatedPrice,
    };

    onAddCustomizedCoffee(customization, selectedBaseItem);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-14 space-y-10">
      
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0E6] border border-[#E8DECf] text-[#8C5E38] text-xs font-semibold uppercase tracking-wider">
          <Sliders className="w-3.5 h-3.5" />
          <span>Interactive Barista Studio</span>
        </div>
        <h1 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#2C1810] tracking-tight">
          Build Your Custom Coffee
        </h1>
        <p className="text-xs sm:text-sm text-[#7C5A43] leading-relaxed">
          Craft your personal signature cup. Choose your espresso base, cup volume, dairy/vegan milk, roast profile, and gourmet toppings with live price calculation.
        </p>
      </div>

      {/* Main Builder Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Customization Controls (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Step 1: Select Base Drink */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E8DECf] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C5E38] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#3E2312] text-white flex items-center justify-center text-[10px]">1</span>
                Choose Coffee Base
              </h3>
              <span className="text-xs text-[#8C6D56]">Base price included</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {baseCoffeeItems.map((item) => {
                const isSelected = item.id === selectedDrinkId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedDrinkId(item.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#3E2312] bg-[#FAF3EC] ring-1 ring-[#3E2312] shadow-xs'
                        : 'border-[#E8DECf] bg-white hover:border-[#8C5E38]'
                    }`}
                  >
                    <div>
                      <span className="text-[11px] font-bold text-[#2C1810] block">{item.name}</span>
                      <span className="text-[10px] text-[#8C6D56] block truncate">{item.category}</span>
                    </div>
                    <span className="text-xs font-bold text-[#3E2312] mt-2 tabular-nums">
                      ₹{item.price}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Choose Size */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E8DECf] shadow-2xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C5E38] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#3E2312] text-white flex items-center justify-center text-[10px]">2</span>
              Select Cup Size
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(Object.keys(CUSTOMIZATION_PRICING.sizes) as CoffeeSize[]).map((sz) => {
                const isSelected = size === sz;
                const info = CUSTOMIZATION_PRICING.sizes[sz];
                return (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSize(sz)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#3E2312] bg-[#FAF3EC] ring-1 ring-[#3E2312] shadow-xs'
                        : 'border-[#E8DECf] bg-white hover:border-[#8C5E38]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#2C1810]">{sz}</span>
                      <span className="text-xs font-semibold text-[#8C5E38] tabular-nums">
                        {info.price === 0 ? 'Included' : `+₹${info.price}`}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6B5A4E] mt-1">{info.label}</p>
                    <span className="text-[10px] text-[#A98E7B] mt-0.5 block">{info.tag}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Choose Milk */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E8DECf] shadow-2xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C5E38] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#3E2312] text-white flex items-center justify-center text-[10px]">3</span>
              Choose Milk Type
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(Object.keys(CUSTOMIZATION_PRICING.milks) as CoffeeMilk[]).map((m) => {
                const isSelected = milk === m;
                const info = CUSTOMIZATION_PRICING.milks[m];
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMilk(m)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#3E2312] bg-[#FAF3EC] ring-1 ring-[#3E2312] shadow-xs'
                        : 'border-[#E8DECf] bg-white hover:border-[#8C5E38]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#2C1810]">{info.label}</span>
                      <span className="text-xs font-semibold text-[#8C5E38] tabular-nums">
                        {info.price === 0 ? 'Included' : `+₹${info.price}`}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6B5A4E] mt-1">{info.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: Sweetness & Roast Profile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Sweetness */}
            <div className="bg-white rounded-2xl p-5 border border-[#E8DECf] shadow-2xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C5E38] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#3E2312] text-white flex items-center justify-center text-[10px]">4</span>
                Sweetness Level
              </h3>
              <div className="space-y-2">
                {CUSTOMIZATION_PRICING.sweetness.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSweetness(s.id)}
                    className={`w-full p-2.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                      sweetness === s.id
                        ? 'border-[#3E2312] bg-[#FAF3EC] font-bold text-[#2C1810]'
                        : 'border-[#E8DECf] text-[#6B5A4E] hover:border-[#8C5E38]'
                    }`}
                  >
                    <span>{s.label}</span>
                    <span className="text-[11px] text-[#8C6D56]">{s.percent}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Roast Profile */}
            <div className="bg-white rounded-2xl p-5 border border-[#E8DECf] shadow-2xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C5E38] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#3E2312] text-white flex items-center justify-center text-[10px]">5</span>
                Espresso Roast
              </h3>
              <div className="space-y-2">
                {CUSTOMIZATION_PRICING.roasts.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRoast(r.id)}
                    className={`w-full p-2.5 rounded-lg border text-left text-xs transition-all flex flex-col justify-between cursor-pointer ${
                      roast === r.id
                        ? 'border-[#3E2312] bg-[#FAF3EC] font-bold text-[#2C1810]'
                        : 'border-[#E8DECf] text-[#6B5A4E] hover:border-[#8C5E38]'
                    }`}
                  >
                    <span>{r.label}</span>
                    <span className="text-[10px] text-[#8C6D56] font-normal mt-0.5">{r.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 5: Gourmet Toppings & Add-ons */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E8DECf] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C5E38] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#3E2312] text-white flex items-center justify-center text-[10px]">6</span>
                Gourmet Toppings & Add-ons
              </h3>
              <span className="text-xs text-[#8C6D56]">Select multiple</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {CUSTOMIZATION_PRICING.toppings.map((t) => {
                const isChecked = selectedToppings.includes(t.id);
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleToggleTopping(t.id)}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      isChecked
                        ? 'border-[#3E2312] bg-[#FAF3EC] ring-1 ring-[#3E2312]'
                        : 'border-[#E8DECf] bg-white hover:border-[#8C5E38]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-4 h-4 rounded border flex items-center justify-center ${
                        isChecked ? 'bg-[#3E2312] border-[#3E2312] text-white' : 'border-[#C89F70]'
                      }`}>
                        {isChecked && <Check className="w-3 h-3" />}
                      </span>
                      <span className="text-xs font-medium text-[#2C1810]">{t.label}</span>
                    </div>
                    <span className="text-xs font-bold text-[#8C5E38] tabular-nums">
                      +₹{t.price}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Barista Notes input */}
          <div className="bg-white rounded-2xl p-5 border border-[#E8DECf] shadow-2xs">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#8C5E38] mb-1.5">
              Special Barista Instructions (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Extra hot, serve in ceramic mug, cinnamon on rim"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#DFCFC0] rounded-xl text-xs text-[#2C1810] focus:outline-none focus:ring-1 focus:ring-[#8C5E38]"
            />
          </div>

        </div>

        {/* Right Column: Live Price & Cup Receipt Summary (4 Cols sticky) */}
        <div className="lg:col-span-4 sticky top-24 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-[#E8DECf] shadow-md space-y-6">
            
            <div className="flex items-center gap-3 pb-4 border-b border-[#F0EAE1]">
              <div className="w-12 h-12 rounded-2xl bg-[#3E2312] text-[#E0A96D] flex items-center justify-center shadow-sm">
                <Coffee className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C5E38]">
                  Custom Recipe
                </span>
                <h3 className="font-serif-display text-xl font-bold text-[#2C1810] leading-tight">
                  {size} {selectedBaseItem.name}
                </h3>
              </div>
            </div>

            {/* Customization Details List */}
            <div className="space-y-2.5 text-xs text-[#6B5A4E]">
              <div className="flex justify-between py-1 border-b border-[#F5ECE1]">
                <span>Base Drink ({selectedBaseItem.name})</span>
                <span className="font-semibold text-[#2C1810] tabular-nums">₹{selectedBaseItem.price}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-[#F5ECE1]">
                <span>Cup Size ({size})</span>
                <span className="font-semibold text-[#2C1810] tabular-nums">
                  {sizeCost === 0 ? '₹0' : `+₹${sizeCost}`}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-[#F5ECE1]">
                <span>Milk Option ({milk})</span>
                <span className="font-semibold text-[#2C1810] tabular-nums">
                  {milkCost === 0 ? '₹0' : `+₹${milkCost}`}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-[#F5ECE1]">
                <span>Sweetness</span>
                <span className="font-medium text-[#2C1810]">{sweetness}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-[#F5ECE1]">
                <span>Roast Profile</span>
                <span className="font-medium text-[#2C1810]">{roast}</span>
              </div>

              {selectedToppings.length > 0 && (
                <div className="pt-1">
                  <span className="text-[10px] uppercase font-bold text-[#8C5E38] block mb-1">
                    Toppings ({selectedToppings.length}):
                  </span>
                  <div className="space-y-1 pl-2">
                    {selectedToppings.map((topId) => {
                      const t = CUSTOMIZATION_PRICING.toppings.find((x) => x.id === topId);
                      return (
                        <div key={topId} className="flex justify-between text-[11px]">
                          <span>• {t?.label}</span>
                          <span className="font-semibold text-[#2C1810] tabular-nums">+₹{t?.price}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Final Total Calculation Display */}
            <div className="pt-4 border-t border-[#E8DECf]">
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8C5E38] font-bold block">
                    Calculated Final Price
                  </span>
                  <span className="text-[11px] text-[#8C6D56]">Base + Customization</span>
                </div>
                <span className="font-serif-display text-3xl font-bold text-[#2C1810] tabular-nums">
                  ₹{finalCalculatedPrice}
                </span>
              </div>

              {/* Add to Cart CTA */}
              <button
                type="button"
                onClick={handleAddToCart}
                className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
                  addedSuccess
                    ? 'bg-[#3E6B48] text-white'
                    : 'bg-[#3E2312] text-[#FFF8F0] hover:bg-[#2C1810] active:scale-95'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 text-[#E0A96D]" />
                    <span>Add Custom Drink · ₹{finalCalculatedPrice}</span>
                  </>
                )}
              </button>
            </div>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={onExploreMenu}
                className="text-xs text-[#8C5E38] hover:underline"
              >
                Browse ready-to-order menu items →
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
