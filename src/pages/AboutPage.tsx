/**
 * @file src/pages/AboutPage.tsx
 * About page telling the story, philosophy, bean sourcing, and atmosphere of Bean & Brew Café.
 */

import React from 'react';
import { Coffee, Heart, Award, Users, Flame, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { PageId } from '../types';
import { CAFE_INFO } from '../data/cafeData';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-16 space-y-16">
      
      {/* 1. Header Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38]">
          Our Journey
        </span>
        <h1 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#2C1810] tracking-tight">
          The Story of Bean & Brew
        </h1>
        <p className="text-sm sm:text-base text-[#7C5A43] leading-relaxed">
          Born out of a deep reverence for authentic coffee craft and slow living in the bustling heart of Bengaluru.
        </p>
      </div>

      {/* 2. Hero Story Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="relative rounded-3xl overflow-hidden shadow-lg border border-[#E8DECf] aspect-[4/3]">
          <img
            src={CAFE_INFO.images.hero}
            alt="Bean & Brew Café Barista Counter"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
            <p className="text-white text-xs font-medium">
              Indiranagar Café & Micro-Roastery · Founded 2018
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8C5E38]">
            <Sparkles className="w-4 h-4" />
            <span>How It All Started</span>
          </div>
          <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#2C1810]">
            From a humble coffee cart to your cozy everyday retreat.
          </h2>
          <p className="text-xs sm:text-sm text-[#6B5A4E] leading-relaxed">
            Bean & Brew began in 2018 with two lifelong friends, a vintage lever espresso machine, and a simple conviction: great coffee should never feel pretentiously complicated or rushed.
          </p>
          <p className="text-xs sm:text-sm text-[#6B5A4E] leading-relaxed">
            We spent months hiking through lush plantations in Chikmagalur and the Nilgiris, speaking directly with shade-grown coffee farmers. Today, we directly source shade-grown, hand-harvested Arabica beans, roast them in small batches each Monday, and pull every shot with uncompromising precision.
          </p>
        </div>
      </div>

      {/* 3. Our Mission & Core Values */}
      <div className="bg-[#FAF0E6] rounded-3xl p-8 sm:p-12 border border-[#E8DECf]">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38]">
            What Drives Us
          </span>
          <h2 className="font-serif-display text-3xl font-bold text-[#2C1810] tracking-tight mt-1">
            Our Mission & Philosophy
          </h2>
          <p className="text-xs text-[#7C5A43] mt-2">
            Three guiding commitments behind every drink, snack, and morning smile.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-[#E8DECf] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#3E2312] text-[#E0A96D] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif-display text-lg font-bold text-[#2C1810]">
              Ethical Sourcing
            </h3>
            <p className="text-xs text-[#6B5A4E] leading-relaxed">
              We pay fair, above-market prices directly to local farming families, fostering sustainable agricultural practices and single-estate traceability.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#E8DECf] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#3E2312] text-[#E0A96D] flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="font-serif-display text-lg font-bold text-[#2C1810]">
              Artisan Micro-Roasting
            </h3>
            <p className="text-xs text-[#6B5A4E] leading-relaxed">
              Beans are roasted in small 5kg batches to highlight delicate floral, cacao, and nutty flavor profiles rather than burning them bitter.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#E8DECf] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#3E2312] text-[#E0A96D] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-serif-display text-lg font-bold text-[#2C1810]">
              Warm Community Hub
            </h3>
            <p className="text-xs text-[#6B5A4E] leading-relaxed">
              High-speed Wi-Fi, comfortable ergonomic seating, calming indie jazz, and friendly baristas who remember your usual order.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Why Customers Love Visiting */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38]">
            The Experience
          </span>
          <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#2C1810]">
            Why You Should Visit Bean & Brew
          </h2>
          <ul className="space-y-3 text-xs sm:text-sm text-[#6B5A4E]">
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#EFE3D3] text-[#3E2312] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                ✓
              </span>
              <span><strong>Fresh Daily Bakery:</strong> Sourdough loaves, flaky butter croissants, and fudgy walnut brownies baked fresh at 6:30 AM every morning.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#EFE3D3] text-[#3E2312] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                ✓
              </span>
              <span><strong>Inclusive Dietary Menu:</strong> Abundant vegan milk choices (oat, almond, soy), pure vegetarian snacks, and sugar-free brewing methods.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#EFE3D3] text-[#3E2312] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                ✓
              </span>
              <span><strong>Work & Reading Friendly:</strong> Plentiful universal power sockets at every booth, quiet garden seating, and a community book exchange shelf.</span>
            </li>
          </ul>

          <div className="pt-2">
            <button
              onClick={() => onNavigate('menu')}
              className="px-6 py-3 bg-[#3E2312] hover:bg-[#2C1810] text-[#FFF8F0] text-xs font-semibold uppercase tracking-wider rounded-xl transition-all inline-flex items-center gap-2"
            >
              <span>Explore Menu Items</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E0A96D]" />
            </button>
          </div>
        </div>

        {/* Gallery Collage */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl overflow-hidden aspect-square border border-[#E8DECf] shadow-xs">
            <img
              src={CAFE_INFO.images.cappuccino}
              alt="Cappuccino art"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="rounded-2xl overflow-hidden aspect-square border border-[#E8DECf] shadow-xs">
            <img
              src={CAFE_INFO.images.coldCoffee}
              alt="Iced Cold Coffee"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="rounded-2xl overflow-hidden aspect-square border border-[#E8DECf] shadow-xs">
            <img
              src={CAFE_INFO.images.sandwich}
              alt="Artisan sandwich"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="rounded-2xl overflow-hidden aspect-square border border-[#E8DECf] shadow-xs">
            <img
              src={CAFE_INFO.images.brownie}
              alt="Chocolate Brownie"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

    </div>
  );
};
