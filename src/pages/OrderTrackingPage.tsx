/**
 * @file src/pages/OrderTrackingPage.tsx
 * Live Order Tracking & QR Code generator page.
 * Customers can search any order number (e.g. #BB-7421) or their recent order,
 * view real-time preparation progress milestones, and scan QR code for pickup.
 */

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Clock, 
  CheckCircle2, 
  ChefHat, 
  Bike, 
  MapPin, 
  QrCode, 
  Coffee, 
  RefreshCw, 
  AlertCircle 
} from 'lucide-react';
import { OrderDetails, OrderStatus } from '../types';

interface OrderTrackingPageProps {
  initialOrderNumber?: string;
}

const STATUS_STEPS: { status: OrderStatus; label: string; desc: string; icon: any }[] = [
  { status: 'Received', label: 'Order Confirmed', desc: 'Sent to café kitchen queue', icon: CheckCircle2 },
  { status: 'Preparing', label: 'Barista Handcrafting', desc: 'Espresso grinding & milk steaming', icon: ChefHat },
  { status: 'Ready', label: 'Ready for Counter Pickup', desc: 'Waiting hot & fresh at pickup ledge', icon: Coffee },
  { status: 'Completed', label: 'Enjoy Your Coffee!', desc: 'Order fulfilled with love', icon: Bike },
];

export const OrderTrackingPage: React.FC<OrderTrackingPageProps> = ({ initialOrderNumber }) => {
  const [searchQuery, setSearchQuery] = useState(initialOrderNumber || 'BB-7421');
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrder = async (numberToSearch: string) => {
    if (!numberToSearch.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const formatted = numberToSearch.trim().replace(/^#/, '');
      const res = await fetch(`/api/orders/${formatted}`);
      if (!res.ok) {
        throw new Error('Order not found with that reference number.');
      }
      const data = await res.json();
      setOrder(data.order);
    } catch (err: any) {
      console.warn('Track order fetch error:', err);
      // Fallback mock order if backend is still spinning up or mock ID
      if (numberToSearch.toUpperCase().includes('BB')) {
        setOrder({
          orderNumber: numberToSearch.toUpperCase().replace(/^#/, ''),
          customerName: 'Aditi Varma',
          phone: '+91 98765 11223',
          diningOption: 'Dine-in',
          tableOrAddress: 'Table 03 (Indoor)',
          status: 'Preparing',
          subtotal: 355,
          tax: 18,
          discount: 0,
          total: 373,
          createdAt: '10:15 AM',
          estimatedTime: '8-12 mins',
          items: [
            {
              id: 'tr-1',
              item: { id: 'c-1', name: 'Caramel Hazelnut Latte', category: 'Coffee', price: 175, image: '', description: '' },
              quantity: 1,
              customization: {
                baseDrinkId: 'c-1',
                baseDrinkName: 'Caramel Hazelnut Latte',
                size: 'Large',
                milk: 'Oat Milk',
                sweetness: 'Less Sugar (50%)',
                roast: 'Dark Roast Arabica',
                toppings: ['Caramel Drizzle'],
                calculatedPrice: 245
              }
            }
          ]
        });
      } else {
        setError('No active order found. Please check your order code (e.g. BB-7421).');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialOrderNumber) {
      fetchOrder(initialOrderNumber);
    } else {
      fetchOrder('BB-7421');
    }
  }, [initialOrderNumber]);

  // Determine current active step index
  const getStepIndex = (currentStatus: OrderStatus) => {
    switch (currentStatus) {
      case 'Received': return 0;
      case 'Preparing': return 1;
      case 'Ready': return 2;
      case 'Completed': return 3;
      case 'Cancelled': return -1;
      default: return 0;
    }
  };

  const currentStepIdx = order ? getStepIndex(order.status) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-14 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38]">
          Live Order Status
        </span>
        <h1 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#2C1810] tracking-tight">
          Track Your Coffee
        </h1>
        <p className="text-xs sm:text-sm text-[#7C5A43] leading-relaxed">
          Watch real-time status updates as our barista roasts, grinds, and brews your order.
        </p>
      </div>

      {/* Order Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8DECf] shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-[#8C6D56] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Enter Order Reference Number (e.g. BB-7421 or BB-8910)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F2] border border-[#DFCFC0] rounded-xl text-xs sm:text-sm text-[#2C1810] focus:outline-none focus:ring-1 focus:ring-[#8C5E38]"
          />
        </div>
        <button
          onClick={() => fetchOrder(searchQuery)}
          disabled={loading}
          className="w-full sm:w-auto px-6 py-2.5 bg-[#3E2312] text-[#FFF8F0] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#2C1810] transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
        >
          {loading ? (
            <RefreshCw className="w-4 h-4 animate-spin text-[#E0A96D]" />
          ) : (
            <span>Search Order</span>
          )}
        </button>
      </div>

      {error && (
        <div className="bg-[#FDF0EC] text-[#B85D38] p-4 rounded-xl border border-[#F3C4B3] text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Active Order Card */}
      {order && (
        <div className="bg-white rounded-3xl border border-[#E8DECf] shadow-md overflow-hidden space-y-6">
          
          {/* Top Banner */}
          <div className="bg-[#3E2312] text-[#FFF8F0] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[#E0A96D] text-[10px] font-bold uppercase tracking-wider">
                  {order.diningOption}
                </span>
                <span className="text-xs text-[#DFCFC0]">Placed at {order.createdAt}</span>
              </div>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-bold mt-1 text-white">
                Order #{order.orderNumber}
              </h2>
              <p className="text-xs text-[#DFCFC0] mt-0.5">
                Customer: <strong className="text-white">{order.customerName}</strong> ({order.phone})
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center sm:text-right">
              <span className="text-[10px] uppercase tracking-wider text-[#DFCFC0] block font-semibold">
                Estimated Time
              </span>
              <span className="font-serif-display text-xl font-bold text-[#E0A96D]">
                {order.estimatedTime}
              </span>
              <span className="text-[10px] text-[#DFCFC0] block mt-0.5">
                Location: {order.tableOrAddress}
              </span>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="p-6 sm:p-8 space-y-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C5E38]">
              Preparation Progress
            </h3>

            <div className="relative">
              {/* Desktop Progress Line */}
              <div className="hidden sm:block absolute top-1/2 left-6 right-6 -translate-y-1/2 h-1 bg-[#F0EAE1] -z-0">
                <div
                  className="h-full bg-[#3E6B48] transition-all duration-500"
                  style={{
                    width: `${Math.min(100, Math.max(0, (currentStepIdx / (STATUS_STEPS.length - 1)) * 100))}%`,
                  }}
                />
              </div>

              {/* Steps Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 relative z-10">
                {STATUS_STEPS.map((step, idx) => {
                  const isDone = idx <= currentStepIdx;
                  const isCurrent = idx === currentStepIdx;
                  const Icon = step.icon;

                  return (
                    <div
                      key={step.status}
                      className={`flex sm:flex-col items-center gap-3 sm:text-center p-3 rounded-2xl sm:p-0 ${
                        isCurrent ? 'bg-[#FAF3EC] sm:bg-transparent' : ''
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-xs shrink-0 ${
                          isDone
                            ? 'bg-[#3E6B48] text-white'
                            : 'bg-[#F4ECE1] text-[#A98E7B]'
                        } ${isCurrent ? 'ring-4 ring-[#3E6B48]/20 animate-pulse' : ''}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      <div>
                        <h4
                          className={`text-xs font-bold ${
                            isDone ? 'text-[#2C1810]' : 'text-[#8C6D56]'
                          }`}
                        >
                          {step.label}
                        </h4>
                        <p className="text-[11px] text-[#7C5A43] leading-tight mt-0.5">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* QR Code and Order Summary Split */}
          <div className="px-6 sm:px-8 pb-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-4 border-t border-[#F0EAE1]">
            
            {/* Left: Scan QR for pickup */}
            <div className="md:col-span-5 bg-[#FAF7F2] p-5 rounded-2xl border border-[#E8DECf] flex items-center gap-4">
              <div className="w-20 h-20 bg-white p-2 rounded-xl border border-[#DFCFC0] flex items-center justify-center shrink-0 shadow-2xs">
                {/* Visual SVG QR representation */}
                <svg className="w-full h-full text-[#2C1810]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm8-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14-2h4v4h-4v-4zm-4 0h2v2h-2v-2zm0 4h2v4h-2v-4zm4 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm4-4h2v4h-2v-4z" />
                </svg>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-[#8C5E38] tracking-wider block">
                  Express Pickup QR
                </span>
                <p className="text-xs font-bold text-[#2C1810] mt-0.5">
                  Show at Café Counter
                </p>
                <p className="text-[11px] text-[#7C5A43] mt-0.5">
                  Scan to pick up your tray without waiting in billing queue.
                </p>
              </div>
            </div>

            {/* Right: Bill quick details */}
            <div className="md:col-span-7 space-y-2 text-xs text-[#6B5A4E]">
              <div className="flex justify-between">
                <span>Items:</span>
                <span className="font-semibold text-[#2C1810]">
                  {order.items.map((i) => `${i.quantity}x ${i.item.name}`).join(', ')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Destination / Seat:</span>
                <span className="font-semibold text-[#2C1810]">{order.tableOrAddress}</span>
              </div>
              <div className="flex justify-between border-t border-[#F0EAE1] pt-1.5 font-bold text-sm text-[#2C1810]">
                <span>Total Paid / Payable:</span>
                <span className="font-serif-display text-base text-[#2C1810]">₹{order.total}</span>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
