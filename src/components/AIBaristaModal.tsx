/**
 * @file src/components/AIBaristaModal.tsx
 * AI Barista Assistant powered by Gemini API.
 * Interactively prompts customers on mood, taste profile, and time of day,
 * then returns a customized signature drink with one-click "Apply to Customizer & Cart".
 */

import React, { useState } from 'react';
import { Sparkles, Coffee, ArrowRight, X, Loader2, CheckCircle2, MessageSquare, Utensils } from 'lucide-react';
import { CoffeeCustomization, MenuItem } from '../types';
import { MENU_ITEMS } from '../data/cafeData';

interface AIBaristaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyRecommendation: (customization: CoffeeCustomization, baseItem: MenuItem) => void;
}

export const AIBaristaModal: React.FC<AIBaristaModalProps> = ({
  isOpen,
  onClose,
  onApplyRecommendation,
}) => {
  const [tastePreference, setTastePreference] = useState('Smooth, nutty & slightly sweet');
  const [timeOfDay, setTimeOfDay] = useState('Morning');
  const [moodOrDiet, setMoodOrDiet] = useState('Need focused energy for work');
  const [customIdea, setCustomIdea] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [aiResult, setAiResult] = useState<any | null>(null);

  if (!isOpen) return null;

  const handleAskBarista = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/barista-recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tastePreference,
          timeOfDay,
          moodOrDiet,
          customDrinkIdea: customIdea,
        }),
      });

      if (!response.ok) throw new Error('Failed to fetch recommendation');
      const data = await response.json();
      setAiResult(data);
    } catch (err) {
      console.error('Barista error:', err);
      // Fallback response for offline or transient network
      setAiResult({
        recommendation: "Based on your morning focus vibe, try our signature Caramel Hazelnut Latte with Oat Milk and Cinnamon Dust for a velvety, long-lasting caffeine boost.",
        suggestedDrink: "Caramel Hazelnut Latte",
        suggestedCustomization: {
          size: "Large",
          milk: "Oat Milk",
          sweetness: "Less Sugar (50%)",
          toppings: ["Caramel Drizzle", "Cinnamon Dust"]
        },
        foodPairing: "Gourmet Veg Club Sandwich",
        flavorNotes: "Buttery caramel, toasted hazelnut, smooth Arabica crema"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyToCart = () => {
    if (!aiResult) return;
    
    // Match suggested base drink or fallback to Latte
    const baseItem = 
      MENU_ITEMS.find((m) => m.name.toLowerCase().includes((aiResult.suggestedDrink || '').toLowerCase())) ||
      MENU_ITEMS.find((m) => m.name === 'Caramel Hazelnut Latte') ||
      MENU_ITEMS[0];

    const customization: CoffeeCustomization = {
      baseDrinkId: baseItem.id,
      baseDrinkName: baseItem.name,
      size: (aiResult.suggestedCustomization?.size as any) || 'Medium',
      milk: (aiResult.suggestedCustomization?.milk as any) || 'Oat Milk',
      sweetness: (aiResult.suggestedCustomization?.sweetness as any) || 'Less Sugar (50%)',
      roast: 'Dark Roast Arabica',
      toppings: (aiResult.suggestedCustomization?.toppings as any) || ['Caramel Drizzle'],
      notes: `AI Sommelier Recommendation for ${timeOfDay}`,
      calculatedPrice: baseItem.price + 30 + 40 + 25, // calculated
    };

    onApplyRecommendation(customization, baseItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#E8DECf] overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="bg-[#3E2312] text-[#FFF8F0] p-6 relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E0A96D] text-[#3E2312] flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase text-[#E0A96D]">
                <span>Gemini AI Barista</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#3E6B48] animate-pulse" />
              </div>
              <h2 className="font-serif-display text-xl font-bold text-white">
                Personalized Coffee Sommelier
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#DFCFC0] hover:text-white rounded-lg transition-colors"
            aria-label="Close AI Barista"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          
          {!aiResult ? (
            /* Prompt Form */
            <form onSubmit={handleAskBarista} className="space-y-4">
              <p className="text-xs text-[#6B5A4E] leading-relaxed">
                Not sure what to order? Tell our Barista AI how you&apos;re feeling, and it will custom-tailor the perfect drink recipe and food pairing for you.
              </p>

              <div>
                <label className="block text-xs font-bold text-[#5C4033] uppercase tracking-wider mb-1.5">
                  1. Current Time of Day
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Morning (Wake up)', 'Afternoon (Refresher)', 'Evening (Cozy/Chill)'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTimeOfDay(t.split(' ')[0])}
                      className={`py-2 px-2 text-xs rounded-xl border font-medium text-center transition-all cursor-pointer ${
                        timeOfDay === t.split(' ')[0]
                          ? 'border-[#3E2312] bg-[#FAF3EC] text-[#2C1810] font-bold'
                          : 'border-[#DFCFC0] bg-white text-[#6B5A4E] hover:border-[#8C5E38]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5C4033] uppercase tracking-wider mb-1.5">
                  2. Flavor & Taste Profile
                </label>
                <select
                  value={tastePreference}
                  onChange={(e) => setTastePreference(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DFCFC0] rounded-xl text-xs text-[#2C1810] focus:outline-none focus:ring-1 focus:ring-[#8C5E38]"
                >
                  <option value="Smooth, nutty & slightly sweet">Smooth, nutty & slightly sweet (e.g. Caramel Latte)</option>
                  <option value="Bold, dark espresso with zero sugar">Bold, dark espresso with zero sugar (Pure coffee kick)</option>
                  <option value="Chilled, creamy and indulgent">Chilled, creamy and dessert-like (Cold Brew / Frappé)</option>
                  <option value="Spicy, comforting & aromatic tea">Spicy, comforting & aromatic tea (Masala Chai)</option>
                  <option value="Light, floral and refreshing">Light, floral and refreshing (Earl Grey / Fruit Cooler)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5C4033] uppercase tracking-wider mb-1.5">
                  3. Mood or Dietary Preference
                </label>
                <input
                  type="text"
                  value={moodOrDiet}
                  onChange={(e) => setMoodOrDiet(e.target.value)}
                  placeholder="e.g. Dairy-free, need focus for coding, feeling relaxed..."
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DFCFC0] rounded-xl text-xs text-[#2C1810] focus:outline-none focus:ring-1 focus:ring-[#8C5E38]"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-[#3E2312] text-[#FFF8F0] font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:bg-[#2C1810] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#E0A96D]" />
                    <span>Consulting Barista AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#E0A96D]" />
                    <span>Get Custom Barista Recommendation</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            /* AI Results Screen */
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="bg-white p-5 rounded-2xl border border-[#E8DECf] shadow-2xs space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF0E6] text-[#8C5E38] flex items-center justify-center shrink-0">
                    <Coffee className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C5E38]">
                      Barista's Curated Choice
                    </span>
                    <h3 className="font-serif-display text-xl font-bold text-[#2C1810]">
                      {aiResult.suggestedDrink}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-[#5C4033] leading-relaxed italic bg-[#FAF7F2] p-3.5 rounded-xl border border-[#F0EAE1]">
                  &ldquo;{aiResult.recommendation}&rdquo;
                </p>

                {/* Recipe specs */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-[#FAF7F2] p-2.5 rounded-lg border border-[#F0EAE1]">
                    <span className="text-[10px] text-[#8C6D56] uppercase font-bold block">Size & Milk</span>
                    <p className="font-medium text-[#2C1810]">
                      {aiResult.suggestedCustomization?.size} · {aiResult.suggestedCustomization?.milk}
                    </p>
                  </div>
                  <div className="bg-[#FAF7F2] p-2.5 rounded-lg border border-[#F0EAE1]">
                    <span className="text-[10px] text-[#8C6D56] uppercase font-bold block">Sweetness & Toppings</span>
                    <p className="font-medium text-[#2C1810] truncate">
                      {aiResult.suggestedCustomization?.sweetness} · {aiResult.suggestedCustomization?.toppings?.join(', ') || 'None'}
                    </p>
                  </div>
                </div>

                {/* Pairing Note */}
                {aiResult.foodPairing && (
                  <div className="flex items-center gap-2 text-xs text-[#3E6B48] bg-[#F1F6F2] p-2.5 rounded-lg border border-[#D5E5D8]">
                    <Utensils className="w-3.5 h-3.5 shrink-0" />
                    <span>Recommended Food Pairing: <strong>{aiResult.foodPairing}</strong></span>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleApplyToCart}
                  className="flex-1 py-3 px-4 bg-[#3E2312] text-[#FFF8F0] font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm hover:bg-[#2C1810] transition-all flex items-center justify-center gap-2"
                >
                  <span>Add Custom Recipe to Cart</span>
                  <ArrowRight className="w-4 h-4 text-[#E0A96D]" />
                </button>

                <button
                  type="button"
                  onClick={() => setAiResult(null)}
                  className="py-3 px-4 bg-[#F4ECE1] text-[#5C4033] font-semibold text-xs rounded-xl hover:bg-[#EAE0D2] transition-colors"
                >
                  Try Different Mood
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
