/**
 * @file src/pages/HomePage.tsx
 * Welcoming homepage for Bean & Brew Café.
 * Includes Hero banner with "Build Your Drink" and "AI Barista" CTAs,
 * Café Story, Popular Items, Interactive Customization Teaser, Reviews, and Location.
 */

import React from 'react';
import { 
  ArrowRight, 
  Star, 
  Clock, 
  MapPin, 
  Sparkles, 
  Coffee, 
  Heart, 
  CheckCircle2, 
  Sliders, 
  Award, 
  Compass 
} from 'lucide-react';
import { MenuItem, PageId } from '../types';
import { CAFE_INFO, REVIEWS, MENU_ITEMS } from '../data/cafeData';
import { MenuCard } from '../components/MenuCard';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenCart: () => void;
  onOpenAIBarista: () => void;
  cartQuantities: Record<string, number>;
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenCart,
  onOpenAIBarista,
  cartQuantities,
  onAddToCart,
  onUpdateQuantity,
}) => {
  const popularItems = MENU_ITEMS.filter((item) => item.isPopular).slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[580px] sm:min-h-[640px] flex items-center justify-center overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <img
            src={CAFE_INFO.images.hero}
            alt="Bean & Brew Café warm interior"
            className="w-full h-full object-cover object-center scale-100"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F0F08] via-[#2A160C]/75 to-[#1F0F08]/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center text-[#FFF8F0] py-20">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#E0A96D] text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome to Indiranagar&apos;s Favorite Coffee Roastery</span>
          </div>

          <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white text-balance leading-[1.1]">
            {CAFE_INFO.name}
          </h1>

          <p className="mt-4 font-serif-display text-xl sm:text-2xl italic text-[#EADCC9] max-w-2xl mx-auto">
            &ldquo;{CAFE_INFO.tagline}&rdquo;
          </p>

          <p className="mt-4 text-xs sm:text-base text-[#DBC5B3] max-w-xl mx-auto leading-relaxed">
            Specialty single-estate Arabica beans, soothing masala chai, handcrafted sourdough sandwiches, and fresh baked desserts made fresh every single morning.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('builder')}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#E0A96D] hover:bg-[#D49856] text-[#2C1810] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sliders className="w-4 h-4" />
              <span>Build Your Custom Coffee</span>
            </button>

            <button
              onClick={() => onNavigate('menu')}
              className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-[#FFF8F0] font-semibold text-xs uppercase tracking-wider rounded-xl border border-white/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Menu</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenAIBarista}
              className="w-full sm:w-auto px-5 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-[#E0A96D] font-bold text-xs uppercase tracking-wider rounded-xl border border-[#E0A96D]/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Barista Match</span>
            </button>
          </div>

          {/* Highlights */}
          <div className="mt-12 pt-8 border-t border-white/15 grid grid-cols-3 gap-4 max-w-2xl mx-auto text-center">
            <div>
              <div className="font-serif-display text-xl sm:text-2xl font-bold text-[#E0A96D]">100%</div>
              <div className="text-[11px] sm:text-xs text-[#DFCFC0]">Arabica Estate Beans</div>
            </div>
            <div>
              <div className="font-serif-display text-xl sm:text-2xl font-bold text-[#E0A96D]">Custom</div>
              <div className="text-[11px] sm:text-xs text-[#DFCFC0]">Cup Size, Milk & Toppings</div>
            </div>
            <div>
              <div className="font-serif-display text-xl sm:text-2xl font-bold text-[#E0A96D]">4.9 ★</div>
              <div className="text-[11px] sm:text-xs text-[#DFCFC0]">Over 1,200+ Reviews</div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. "BUILD YOUR DRINK" INTERACTIVE FEATURE SPOTLIGHT */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-[#3E2312] to-[#2C1810] text-[#FFF8F0] rounded-3xl p-8 sm:p-12 shadow-xl border border-[#5C341D] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#E0A96D] text-[11px] font-bold uppercase tracking-wider">
              <Sliders className="w-3.5 h-3.5" />
              <span>State-of-the-Art Feature</span>
            </div>

            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              Customize Your Cup Exactly How You Love It.
            </h2>

            <p className="text-xs sm:text-sm text-[#DFCFC0] leading-relaxed">
              Don&apos;t settle for generic coffee. With our interactive Drink Customizer, configure your base roast, cup size, plant-based or whole milk, sweetness scale, and decadent drizzle toppings with live real-time price calculation:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
              <div className="bg-white/10 p-3 rounded-xl border border-white/15">
                <span className="text-[10px] text-[#E0A96D] uppercase font-bold block">1. Cup Size</span>
                <span className="font-semibold text-white">Small · Medium · Large</span>
              </div>
              <div className="bg-white/10 p-3 rounded-xl border border-white/15">
                <span className="text-[10px] text-[#E0A96D] uppercase font-bold block">2. Milk Choice</span>
                <span className="font-semibold text-white">Whole · Oat · Almond · Soy</span>
              </div>
              <div className="bg-white/10 p-3 rounded-xl border border-white/15">
                <span className="text-[10px] text-[#E0A96D] uppercase font-bold block">3. Sweetness</span>
                <span className="font-semibold text-white">0% · 50% · 100%</span>
              </div>
              <div className="bg-white/10 p-3 rounded-xl border border-white/15">
                <span className="text-[10px] text-[#E0A96D] uppercase font-bold block">4. Toppings</span>
                <span className="font-semibold text-white">Caramel · Whip · Cocoa</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('builder')}
                className="px-6 py-3 bg-[#E0A96D] hover:bg-[#D49856] text-[#2C1810] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Launch Drink Builder</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onOpenAIBarista}
                className="px-5 py-3 bg-white/10 hover:bg-white/20 text-[#FFF8F0] font-semibold text-xs uppercase tracking-wider rounded-xl border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E0A96D]" />
                <span>Ask AI Barista</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-md border border-white/20">
              <img
                src={CAFE_INFO.images.coldCoffee}
                alt="Customized Iced Coffee"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-3 -left-3 bg-[#FAF7F2] text-[#2C1810] p-4 rounded-xl border border-[#E8DECf] shadow-lg max-w-[210px] hidden sm:block">
              <p className="text-[10px] font-bold uppercase text-[#8C5E38]">Live Formula</p>
              <p className="text-xs font-bold leading-tight mt-0.5">Base + Size + Milk + Toppings = Final Price</p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. POPULAR MENU ITEMS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38]">
              Guest Favorites
            </span>
            <h2 className="font-serif-display text-3xl font-bold text-[#2C1810] tracking-tight mt-1">
              Popular At Bean & Brew
            </h2>
          </div>
          <button
            onClick={() => onNavigate('menu')}
            className="text-xs font-bold uppercase tracking-wider text-[#3E2312] hover:text-[#8C5E38] inline-flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>View All {MENU_ITEMS.length} Items</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Grid of popular items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularItems.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              cartQuantity={cartQuantities[item.id] || 0}
              onAddToCart={onAddToCart}
              onUpdateQuantity={onUpdateQuantity}
            />
          ))}
        </div>
      </section>

      {/* 4. REWARDS & QR PICKUP HIGHLIGHT CARDS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card A: Brew Club Perks */}
          <div className="bg-[#FAF0E6] rounded-3xl p-8 border border-[#E8DECf] flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#3E2312] text-[#E0A96D] flex items-center justify-center shadow-xs">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-serif-display text-2xl font-bold text-[#2C1810]">
                Bean & Brew Club Perks
              </h3>
              <p className="text-xs text-[#6B5A4E] leading-relaxed">
                Earn 10% back in points on every drink. Swap points for complimentary cappuccinos, freshly baked croissants, and secret seasonal drinks.
              </p>
            </div>

            <div className="pt-6">
              <button
                onClick={() => onNavigate('loyalty')}
                className="px-5 py-2.5 bg-[#3E2312] text-[#FFF8F0] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#2C1810] transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <span>View Member Rewards</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E0A96D]" />
              </button>
            </div>
          </div>

          {/* Card B: Live Track & QR Pickup */}
          <div className="bg-white rounded-3xl p-8 border border-[#E8DECf] shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#3E2312] text-[#E0A96D] flex items-center justify-center shadow-xs">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-serif-display text-2xl font-bold text-[#2C1810]">
                Live Kitchen Tracking & QR Code
              </h3>
              <p className="text-xs text-[#6B5A4E] leading-relaxed">
                Never wait around guessing. Watch your barista grind, brew, and steam your cup in real time. Flash your digital QR code at pickup!
              </p>
            </div>

            <div className="pt-6">
              <button
                onClick={() => onNavigate('track')}
                className="px-5 py-2.5 bg-[#F4ECE1] text-[#3E2312] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#EAE0D2] transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Track An Order</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#8C5E38]" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 5. CUSTOMER REVIEWS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-[#FAF0E6] rounded-3xl p-8 sm:p-12 border border-[#E8DECf]">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38]">
              Kind Words
            </span>
            <h2 className="font-serif-display text-3xl font-bold text-[#2C1810] tracking-tight mt-1">
              What Our Regulars Say
            </h2>
            <p className="text-xs text-[#7C5A43] mt-2">
              Loved by coffee connoisseurs, students, remote creators, and neighborhood families.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl p-6 border border-[#E8DECf] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 mb-3 text-[#E0A96D]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-[#5C4033] leading-relaxed italic">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F0EAE1] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#3E2312] text-[#EFE3D3] flex items-center justify-center text-xs font-bold">
                    {review.avatarText}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#2C1810]">{review.name}</h4>
                    <span className="text-[11px] text-[#8C6D56]">{review.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
