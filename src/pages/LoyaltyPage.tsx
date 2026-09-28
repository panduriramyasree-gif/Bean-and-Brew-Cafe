/**
 * @file src/pages/LoyaltyPage.tsx
 * Customer Loyalty Rewards & Points page.
 * Customers earn 10 points per ₹100 spent (10% back).
 * Can redeem points for free coffees, discounts, or exclusive pastries.
 */

import React, { useState } from 'react';
import { Award, Gift, Sparkles, Check, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { UserAccount } from '../types';

interface LoyaltyPageProps {
  user: UserAccount;
  onRedeemReward: (pointsCost: number, rewardTitle: string) => void;
  onExploreMenu: () => void;
}

const REWARDS = [
  {
    id: 'rew-1',
    title: 'Free Artisanal Cappuccino',
    description: 'Redeem for any hot Cappuccino or Americano with dairy or plant milk.',
    points: 150,
    category: 'Coffee',
  },
  {
    id: 'rew-2',
    title: '₹100 Off Any Order Above ₹300',
    description: 'Instant discount applied directly to your next online or dine-in cart.',
    points: 200,
    category: 'Discount',
  },
  {
    id: 'rew-3',
    title: 'Warm Chocolate Fudge Brownie',
    description: 'Fresh Belgian brownie with rich chocolate sauce and walnuts.',
    points: 250,
    category: 'Dessert',
  },
  {
    id: 'rew-4',
    title: 'Signature Cold Coffee & Fries Combo',
    description: 'Iced blended cold brew paired with crispy peri-peri fries.',
    points: 350,
    category: 'Combo',
  }
];

export const LoyaltyPage: React.FC<LoyaltyPageProps> = ({
  user,
  onRedeemReward,
  onExploreMenu,
}) => {
  const [redeemedId, setRedeemedId] = useState<string | null>(null);

  const handleRedeem = (reward: typeof REWARDS[0]) => {
    if (user.loyaltyPoints < reward.points) return;
    onRedeemReward(reward.points, reward.title);
    setRedeemedId(reward.id);
    setTimeout(() => setRedeemedId(null), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-14 space-y-12">
      
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0E6] border border-[#E8DECf] text-[#8C5E38] text-xs font-semibold uppercase tracking-wider">
          <Award className="w-3.5 h-3.5" />
          <span>Bean & Brew Club</span>
        </div>
        <h1 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#2C1810] tracking-tight">
          Loyalty Rewards & Coffee Perks
        </h1>
        <p className="text-xs sm:text-sm text-[#7C5A43] leading-relaxed">
          Every sip counts. Earn 10 loyalty points for every ₹100 spent and unlock complimentary coffees, discounts, and secret seasonal drinks.
        </p>
      </div>

      {/* Member Points Card */}
      <div className="bg-[#3E2312] text-[#FFF8F0] rounded-3xl p-6 sm:p-10 shadow-xl border border-[#5C341D] relative overflow-hidden">
        {/* Subtle decorative radial scrim */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 bg-radial from-white to-transparent pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          
          <div className="md:col-span-7 space-y-3">
            <span className="text-[11px] uppercase tracking-widest text-[#E0A96D] font-bold">
              Gold Tier Member
            </span>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-white">
              {user.name}&apos;s Coffee Pass
            </h2>
            <p className="text-xs text-[#DFCFC0]">
              Member ID: <span className="font-mono text-white">BB-PASS-9821</span> · Phone: {user.phone}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#E0A96D]">
              <Sparkles className="w-4 h-4" />
              <span>You earn 10 points on every ₹100 spent automatically on checkout</span>
            </div>
          </div>

          <div className="md:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center">
            <span className="text-xs text-[#DFCFC0] uppercase tracking-wider block font-medium">
              Available Balance
            </span>
            <div className="font-serif-display text-4xl sm:text-5xl font-bold text-[#E0A96D] my-1 tabular-nums">
              {user.loyaltyPoints}
            </div>
            <span className="text-xs text-[#DFCFC0] block">
              Brew Points (Approx value: ₹{user.loyaltyPoints})
            </span>

            <button
              onClick={onExploreMenu}
              className="mt-4 w-full py-2.5 bg-[#E0A96D] hover:bg-[#D49856] text-[#2C1810] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm"
            >
              Order to Earn Points
            </button>
          </div>

        </div>
      </div>

      {/* Available Rewards Catalog */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif-display text-2xl font-bold text-[#2C1810]">
              Redeemable Perks
            </h3>
            <p className="text-xs text-[#7C5A43] mt-0.5">
              Select any perk below to redeem your points instantly.
            </p>
          </div>
          <span className="text-xs font-semibold text-[#8C5E38]">
            {user.loyaltyPoints} Points Available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {REWARDS.map((rew) => {
            const canAfford = user.loyaltyPoints >= rew.points;
            const isJustRedeemed = redeemedId === rew.id;

            return (
              <div
                key={rew.id}
                className="bg-white rounded-2xl p-6 border border-[#E8DECf] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C5E38] bg-[#FAF3EC] px-2.5 py-1 rounded-md">
                      {rew.category}
                    </span>
                    <span className="text-xs font-bold text-[#2C1810] tabular-nums">
                      {rew.points} Points
                    </span>
                  </div>

                  <h4 className="font-serif-display text-lg font-bold text-[#2C1810] mt-2">
                    {rew.title}
                  </h4>
                  <p className="text-xs text-[#6B5A4E] mt-1 leading-relaxed">
                    {rew.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F0EAE1] flex items-center justify-between">
                  <div className="text-[11px] text-[#8C6D56]">
                    {canAfford ? (
                      <span className="text-[#3E6B48] font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        Eligible to unlock
                      </span>
                    ) : (
                      <span>Need {rew.points - user.loyaltyPoints} more points</span>
                    )}
                  </div>

                  <button
                    onClick={() => handleRedeem(rew)}
                    disabled={!canAfford || isJustRedeemed}
                    className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed ${
                      isJustRedeemed
                        ? 'bg-[#3E6B48] text-white'
                        : canAfford
                        ? 'bg-[#3E2312] text-[#FFF8F0] hover:bg-[#2C1810] shadow-2xs'
                        : 'bg-[#F0EAE1] text-[#A98E7B] border border-[#DFCFC0]'
                    }`}
                  >
                    {isJustRedeemed ? 'Redeemed!' : canAfford ? 'Redeem Perk' : 'Locked'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* How it works info footer */}
      <div className="bg-[#FAF0E6] rounded-3xl p-8 border border-[#E8DECf] grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div>
          <div className="w-10 h-10 rounded-full bg-[#3E2312] text-[#E0A96D] flex items-center justify-center mx-auto mb-2 font-bold text-sm">
            1
          </div>
          <h4 className="font-serif-display font-bold text-sm text-[#2C1810]">Order & Sip</h4>
          <p className="text-xs text-[#6B5A4E] mt-1">Dine in or order online through our digital cart.</p>
        </div>
        <div>
          <div className="w-10 h-10 rounded-full bg-[#3E2312] text-[#E0A96D] flex items-center justify-center mx-auto mb-2 font-bold text-sm">
            2
          </div>
          <h4 className="font-serif-display font-bold text-sm text-[#2C1810]">Earn 10% Back</h4>
          <p className="text-xs text-[#6B5A4E] mt-1">Receive points instantly credited on every checkout.</p>
        </div>
        <div>
          <div className="w-10 h-10 rounded-full bg-[#3E2312] text-[#E0A96D] flex items-center justify-center mx-auto mb-2 font-bold text-sm">
            3
          </div>
          <h4 className="font-serif-display font-bold text-sm text-[#2C1810]">Complimentary Bakes</h4>
          <p className="text-xs text-[#6B5A4E] mt-1">Swap points for handcrafted artisan coffees and treats.</p>
        </div>
      </div>

    </div>
  );
};
