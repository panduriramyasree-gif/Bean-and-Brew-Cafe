/**
 * @file src/components/AIBaristaModal.tsx
 * AI Barista Assistant powered by Gemini API with Real-Time Google Search Grounding.
 * 
 * Features:
 * 1. "Ask Barista Anything (Real-Time)" tab: Grounded with live Google Search for weather,
 *    current events, origin news, opening hours, local recommendations, and real-time facts.
 * 2. "Personalized Sommelier" tab: Interactive mood/taste matching with one-click "Apply to Cart".
 */

import React, { useState } from 'react';
import { 
  Sparkles, 
  Coffee, 
  ArrowRight, 
  X, 
  Loader2, 
  Utensils, 
  Globe, 
  ExternalLink, 
  Send, 
  Compass, 
  MessageSquare
} from 'lucide-react';
import { CoffeeCustomization, MenuItem } from '../types';
import { MENU_ITEMS } from '../data/cafeData';

interface AIBaristaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyRecommendation: (customization: CoffeeCustomization, baseItem: MenuItem) => void;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  sources?: { title: string; uri: string }[];
  searchQueries?: string[];
  isGrounded?: boolean;
}

export const AIBaristaModal: React.FC<AIBaristaModalProps> = ({
  isOpen,
  onClose,
  onApplyRecommendation,
}) => {
  const [activeTab, setActiveTab] = useState<'realtime' | 'recommend'>('realtime');

  // Real-time Chat State
  const [realtimeQuestion, setRealtimeQuestion] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hello! ☕ I'm your Bean & Brew Barista with access to real-time Google Search. Ask me anything about our menu, today's weather in Bengaluru, current coffee trends, or pairing ideas for right now!",
    }
  ]);

  // Sommelier Recommendation State
  const [tastePreference, setTastePreference] = useState('Smooth, nutty & slightly sweet');
  const [timeOfDay, setTimeOfDay] = useState('Morning');
  const [moodOrDiet, setMoodOrDiet] = useState('Need focused energy for work');
  const [customIdea, setCustomIdea] = useState('');
  const [isLoadingRec, setIsLoadingRec] = useState(false);
  const [aiResult, setAiResult] = useState<any | null>(null);

  if (!isOpen) return null;

  // Handle Real-Time Search Grounded Question
  const handleAskRealtime = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = realtimeQuestion.trim();
    if (!query || isSearching) return;

    const userMsg: ChatMessage = { role: 'user', content: query };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setRealtimeQuestion('');
    setIsSearching(true);

    try {
      const response = await fetch('/api/ai/ask-realtime', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: query,
          history: updatedMessages.slice(-6).map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch real-time response');
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.answer,
          sources: data.sources || [],
          searchQueries: data.searchQueries || [],
          isGrounded: data.isGrounded,
        },
      ]);
    } catch (err: any) {
      console.error('Realtime query error:', err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "I ran into a temporary hiccup fetching live web data. At Bean & Brew on 100 Feet Road, Indiranagar, we recommend our Signature Cold Coffee (₹160) or Caramel Hazelnut Latte (₹175)!",
        },
      ]);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle Sommelier recommendation form
  const handleAskBarista = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingRec(true);

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
      setAiResult({
        recommendation: "Based on your vibe, try our signature Caramel Hazelnut Latte with Oat Milk and Cinnamon Dust for a velvety, long-lasting boost.",
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
      setIsLoadingRec(false);
    }
  };

  const handleApplyToCart = () => {
    if (!aiResult) return;
    
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
      calculatedPrice: baseItem.price + 30 + 40 + 25,
    };

    onApplyRecommendation(customization, baseItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#E8DECf] overflow-hidden my-6 flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-[#3E2312] text-[#FFF8F0] p-5 sm:p-6 relative flex items-center justify-between shrink-0 border-b border-[#4E2F1B]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E0A96D] text-[#3E2312] flex items-center justify-center shadow-sm shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase text-[#E0A96D]">
                <span>Gemini 3.8 Flash</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#3E6B48] animate-pulse" />
                <span className="text-[10px] text-[#CDBBB0] lowercase">with Google Search Grounding</span>
              </div>
              <h2 className="font-serif-display text-lg sm:text-xl font-bold text-white">
                Bean & Brew AI Concierge
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#DFCFC0] hover:text-white rounded-lg transition-colors cursor-pointer"
            aria-label="Close AI Barista"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#F4ECE1] px-5 sm:px-6 py-2 border-b border-[#E8DECf] flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('realtime')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'realtime'
                ? 'bg-[#3E2312] text-[#FFF8F0] shadow-xs'
                : 'bg-transparent text-[#6B5A4E] hover:text-[#2C1810]'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-[#E0A96D]" />
            <span>Ask with Real-Time Web Data</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('recommend')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'recommend'
                ? 'bg-[#3E2312] text-[#FFF8F0] shadow-xs'
                : 'bg-transparent text-[#6B5A4E] hover:text-[#2C1810]'
            }`}
          >
            <Coffee className="w-3.5 h-3.5 text-[#E0A96D]" />
            <span>Sommelier Recipe Match</span>
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {activeTab === 'realtime' ? (
            /* TAB 1: REAL-TIME SEARCH GROUNDED Q&A */
            <div className="flex flex-col h-full space-y-4">
              <div className="bg-[#FFFDF9] border border-[#E8DECf] rounded-2xl p-4 text-xs text-[#5C4033] flex items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#8C5E38] shrink-0" />
                  <span>
                    Powered by <strong>Google Search Grounding</strong>. Ask about today&apos;s weather, coffee beans harvest, local Bengaluru events, or café specials!
                  </span>
                </div>
              </div>

              {/* Chat Thread */}
              <div className="space-y-3 min-h-[220px] max-h-[340px] overflow-y-auto pr-1">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-[#3E2312] text-[#FFF8F0] rounded-tr-xs'
                          : 'bg-white text-[#2C1810] border border-[#E8DECf] shadow-2xs rounded-tl-xs'
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.content}</p>

                      {/* Display Grounding Citations */}
                      {msg.sources && msg.sources.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-[#F0EAE1]">
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#8C5E38] uppercase tracking-wider mb-1.5">
                            <Globe className="w-3 h-3 text-[#3E6B48]" />
                            <span>Real-Time Web Sources:</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {msg.sources.slice(0, 3).map((src, sIdx) => (
                              <a
                                key={sIdx}
                                href={src.uri}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 bg-[#FAF7F2] hover:bg-[#F4ECE1] text-[#3E2312] px-2 py-1 rounded-md text-[11px] font-medium border border-[#E5DACD] transition-colors"
                              >
                                <span className="truncate max-w-[180px]">{src.title}</span>
                                <ExternalLink className="w-2.5 h-2.5 opacity-60 shrink-0" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isSearching && (
                  <div className="flex items-center gap-2 text-xs text-[#8C5E38] bg-white px-3.5 py-2.5 rounded-xl border border-[#E8DECf] w-fit animate-pulse">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#E0A96D]" />
                    <span>Searching Google & synthesizing live answer...</span>
                  </div>
                )}
              </div>

              {/* Quick Prompt Suggestions */}
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                <button
                  type="button"
                  onClick={() => setRealtimeQuestion("What's the weather like in Bengaluru today and what should I order?")}
                  className="px-2.5 py-1 bg-white hover:bg-[#F4ECE1] text-[#6B5A4E] rounded-lg border border-[#E5DACD] transition-colors cursor-pointer truncate max-w-full"
                >
                  🌤️ Bengaluru weather & drink pairing
                </button>
                <button
                  type="button"
                  onClick={() => setRealtimeQuestion("Tell me about Chikmagalur coffee beans harvest this season")}
                  className="px-2.5 py-1 bg-white hover:bg-[#F4ECE1] text-[#6B5A4E] rounded-lg border border-[#E5DACD] transition-colors cursor-pointer truncate max-w-full"
                >
                  🌱 Chikmagalur Arabica harvest news
                </button>
                <button
                  type="button"
                  onClick={() => setRealtimeQuestion("What are the best coffee specials at Bean & Brew today?")}
                  className="px-2.5 py-1 bg-white hover:bg-[#F4ECE1] text-[#6B5A4E] rounded-lg border border-[#E5DACD] transition-colors cursor-pointer truncate max-w-full"
                >
                  ⭐ Bean & Brew Signature Specials
                </button>
              </div>

              {/* Chat Input Bar */}
              <form onSubmit={handleAskRealtime} className="flex items-center gap-2 pt-2 border-t border-[#E8DECf]">
                <input
                  type="text"
                  value={realtimeQuestion}
                  onChange={(e) => setRealtimeQuestion(e.target.value)}
                  placeholder="Ask any question requiring real-time web data..."
                  className="flex-1 px-4 py-2.5 bg-white border border-[#DFCFC0] rounded-xl text-xs text-[#2C1810] focus:outline-none focus:ring-1 focus:ring-[#8C5E38]"
                />
                <button
                  type="submit"
                  disabled={isSearching || !realtimeQuestion.trim()}
                  className="p-2.5 sm:px-4 sm:py-2.5 bg-[#3E2312] text-[#FFF8F0] font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm hover:bg-[#2C1810] transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 shrink-0"
                >
                  <Send className="w-3.5 h-3.5 text-[#E0A96D]" />
                  <span className="hidden sm:inline">Ask Live</span>
                </button>
              </form>
            </div>
          ) : (
            /* TAB 2: SOMMELIER RECIPE MATCH */
            <div>
              {!aiResult ? (
                <form onSubmit={handleAskBarista} className="space-y-4">
                  <p className="text-xs text-[#6B5A4E] leading-relaxed">
                    Tell our Barista AI how you&apos;re feeling, and it will custom-tailor the perfect drink recipe and food pairing for you.
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
                      <option value="Chilled, creamy and dessert-like">Chilled, creamy and dessert-like (Cold Brew / Frappé)</option>
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
                    disabled={isLoadingRec}
                    className="w-full py-3 px-4 bg-[#3E2312] text-[#FFF8F0] font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:bg-[#2C1810] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isLoadingRec ? (
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
                /* Results Screen */
                <div className="space-y-4 animate-in fade-in duration-300">
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

                    {aiResult.foodPairing && (
                      <div className="flex items-center gap-2 text-xs text-[#3E6B48] bg-[#F1F6F2] p-2.5 rounded-lg border border-[#D5E5D8]">
                        <Utensils className="w-3.5 h-3.5 shrink-0" />
                        <span>Recommended Food Pairing: <strong>{aiResult.foodPairing}</strong></span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={handleApplyToCart}
                      className="flex-1 py-3 px-4 bg-[#3E2312] text-[#FFF8F0] font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm hover:bg-[#2C1810] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Add Custom Recipe to Cart</span>
                      <ArrowRight className="w-4 h-4 text-[#E0A96D]" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setAiResult(null)}
                      className="py-3 px-4 bg-[#F4ECE1] text-[#5C4033] font-semibold text-xs rounded-xl hover:bg-[#EAE0D2] transition-colors cursor-pointer"
                    >
                      Try Different Mood
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
