/**
 * @file src/components/Footer.tsx
 * Quiet, warm footer with cafe story, hours, contact details, and navigation links.
 */

import React from 'react';
import { Coffee, MapPin, Phone, Mail, Clock, Heart } from 'lucide-react';
import { PageId } from '../types';
import { CAFE_INFO } from '../data/cafeData';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLinkClick = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#24130A] text-[#EFE3D3] pt-14 pb-8 border-t border-[#3D2318]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#3D2318]">
          
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#3E2312] text-[#E0A96D] flex items-center justify-center border border-[#5C341D]">
                <Coffee className="w-4 h-4" />
              </div>
              <span className="font-serif-display text-xl font-bold tracking-tight text-[#FFF8F0]">
                {CAFE_INFO.name}
              </span>
            </div>
            <p className="text-xs text-[#C5B09E] leading-relaxed">
              &ldquo;{CAFE_INFO.tagline}&rdquo; Dedicated to the art of fine coffee, artisanal bakes, and peaceful community moments in Bengaluru.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-[#A98E7B]">
              <span>Follow us:</span>
              <span className="text-[#E0A96D] hover:underline cursor-pointer">Instagram</span>
              <span>·</span>
              <span className="text-[#E0A96D] hover:underline cursor-pointer">Facebook</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-serif-display text-sm font-semibold text-[#FFF8F0] uppercase tracking-wider mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-[#C5B09E]">
              <li>
                <button
                  onClick={() => handleLinkClick('home')}
                  className="hover:text-[#FFF8F0] transition-colors focus:outline-none"
                >
                  Home & Specials
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('menu')}
                  className="hover:text-[#FFF8F0] transition-colors focus:outline-none"
                >
                  Explore Full Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('about')}
                  className="hover:text-[#FFF8F0] transition-colors focus:outline-none"
                >
                  Our Coffee Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('contact')}
                  className="hover:text-[#FFF8F0] transition-colors focus:outline-none"
                >
                  Contact & Directions
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours of Operation */}
          <div>
            <h4 className="font-serif-display text-sm font-semibold text-[#FFF8F0] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#E0A96D]" />
              Opening Hours
            </h4>
            <div className="space-y-2 text-xs text-[#C5B09E]">
              <div>
                <p className="font-medium text-[#EFE3D3]">Weekdays (Mon – Fri)</p>
                <p className="text-[11px] text-[#A98E7B]">7:30 AM – 10:30 PM</p>
              </div>
              <div className="pt-1">
                <p className="font-medium text-[#EFE3D3]">Weekends (Sat – Sun)</p>
                <p className="text-[11px] text-[#A98E7B]">8:00 AM – 11:30 PM</p>
              </div>
              <p className="text-[11px] text-[#8C6D56] pt-1">
                Kitchen closes 30 mins before closing time.
              </p>
            </div>
          </div>

          {/* Col 4: Contact & Location */}
          <div>
            <h4 className="font-serif-display text-sm font-semibold text-[#FFF8F0] uppercase tracking-wider mb-4">
              Visit The Café
            </h4>
            <div className="space-y-2.5 text-xs text-[#C5B09E]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E0A96D] shrink-0 mt-0.5" />
                <span>{CAFE_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#E0A96D] shrink-0" />
                <span>{CAFE_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#E0A96D] shrink-0" />
                <span>{CAFE_INFO.email}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C6D56] gap-3">
          <p>© {new Date().getFullYear()} {CAFE_INFO.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3 h-3 text-[#B85D38] fill-current" /> for coffee lovers everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
};
