/**
 * @file src/components/Navbar.tsx
 * Top Navigation bar adhering to domain design contract.
 * Features links for Home, Menu, Custom Coffee Builder, Order Track, Loyalty, and Admin.
 */

import React, { useState } from 'react';
import { 
  Coffee, 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  Clock, 
  Sparkles, 
  Sliders, 
  Award, 
  Compass, 
  ShieldAlert 
} from 'lucide-react';
import { PageId } from '../types';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAIBarista: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenAIBarista,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageId; label: string; icon?: any }[] = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'builder', label: 'Custom Coffee', icon: Sliders },
    { id: 'track', label: 'Track Order', icon: Compass },
    { id: 'loyalty', label: 'Club Perks', icon: Award },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top slim announcement bar with AI Assistant trigger & Admin quick link */}
      <div className="bg-[#2C1810] text-[#EFE3D3] text-xs py-1.5 px-4 border-b border-[#3D2318] flex items-center justify-between">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <Clock className="w-3.5 h-3.5 text-[#C89F70] shrink-0" />
          <span className="hidden sm:inline">Open today: 7:30 AM – 10:30 PM · Fresh Indiranagar Roastery</span>
          <span className="sm:hidden text-[11px]">7:30 AM – 10:30 PM · Fresh Brews</span>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-[11px]">
          <button
            onClick={onOpenAIBarista}
            className="text-[#E0A96D] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
          >
            <Sparkles className="w-3 h-3" />
            <span>AI Barista Match</span>
          </button>
          <span className="text-[#5C341D]">|</span>
          <button
            onClick={() => handleLinkClick('admin')}
            className={`hover:text-white flex items-center gap-1 cursor-pointer ${
              currentPage === 'admin' ? 'text-white font-bold' : 'text-[#C5B09E]'
            }`}
          >
            <ShieldAlert className="w-3 h-3 text-[#E0A96D]" />
            <span>Admin Console</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EADCC9] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8C5E38] rounded-md"
            aria-label="Bean & Brew Café Home"
          >
            <div className="w-10 h-10 rounded-full bg-[#3E2312] text-[#FDFBF7] flex items-center justify-center shadow-sm group-hover:bg-[#5C341D] transition-colors">
              <Coffee className="w-5 h-5 text-[#E0A96D]" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif-display text-xl sm:text-2xl font-bold tracking-tight text-[#2C1810] leading-none">
                Bean & Brew
              </span>
              <span className="text-[10px] tracking-widest uppercase font-medium text-[#7C5A43] mt-0.5">
                Café & Micro-Roastery
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-xs font-semibold tracking-wide transition-all relative py-1 focus:outline-none flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'text-[#2C1810] font-bold'
                      : 'text-[#6D4C3D] hover:text-[#2C1810]'
                  }`}
                >
                  {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#8C5E38]' : 'text-[#A98E7B]'}`} />}
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8C5E38] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Actions (AI Assistant + Cart + Mobile Toggle) */}
          <div className="flex items-center gap-2.5">
            {/* AI Barista Assistant Button */}
            <button
              onClick={onOpenAIBarista}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#3E2312] bg-[#FAF0E6] hover:bg-[#F3E2CF] border border-[#E8DECf] rounded-xl transition-all cursor-pointer shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#8C5E38]" />
              <span>AI Barista</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-[#FAF7F2] bg-[#3E2312] hover:bg-[#2C1810] rounded-xl shadow-sm transition-all cursor-pointer active:scale-95"
              aria-label={`Open shopping cart. ${cartCount} items inside`}
            >
              <ShoppingBag className="w-4 h-4 text-[#E0A96D]" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-5 h-5 px-1 text-[11px] font-bold text-white bg-[#B85D38] rounded-full tabular-nums animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#3E2312] hover:bg-[#EFE3D3] rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#EADCC9] bg-[#FAF7F2] px-6 py-5 shadow-lg animate-in slide-in-from-top duration-200">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`text-left py-2.5 px-3 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2.5 ${
                      currentPage === link.id
                        ? 'bg-[#EFE3D3] text-[#2C1810] font-bold'
                        : 'text-[#6D4C3D] hover:bg-[#F3ECE0]'
                    }`}
                  >
                    {Icon && <Icon className="w-4 h-4 text-[#8C5E38]" />}
                    <span>{link.label}</span>
                  </button>
                );
              })}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAIBarista();
                }}
                className="text-left py-2.5 px-3 rounded-xl text-xs font-semibold text-[#8C5E38] bg-[#FAF0E6] flex items-center gap-2.5 mt-1"
              >
                <Sparkles className="w-4 h-4 text-[#8C5E38]" />
                <span>AI Barista Recommendation</span>
              </button>

              <button
                onClick={() => handleLinkClick('admin')}
                className="text-left py-2.5 px-3 rounded-xl text-xs font-semibold text-[#5C4033] hover:bg-[#F3ECE0] flex items-center gap-2.5"
              >
                <ShieldAlert className="w-4 h-4 text-[#B85D38]" />
                <span>Admin & Kitchen Console</span>
              </button>

              <div className="pt-3 mt-2 border-t border-[#EADCC9] flex items-center justify-between text-xs text-[#7C5A43]">
                <span>Indiranagar Branch</span>
                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
