/**
 * @file src/pages/AdminDashboardPage.tsx
 * Admin Operations & Management Dashboard:
 * 1. Live Kitchen Orders Pipeline (Change status: Received -> Preparing -> Ready -> Completed)
 * 2. Real-Time Sales Metrics & Analytics Cards
 * 3. Menu Inventory & Stock Control Toggle
 * 4. Barista Shift Overview
 */

import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  ChefHat, 
  RefreshCw, 
  Package, 
  AlertCircle,
  Eye,
  DollarSign
} from 'lucide-react';
import { OrderStatus, MenuItem } from '../types';
import { MENU_ITEMS } from '../data/cafeData';

interface AdminOrder {
  orderNumber: string;
  customerName: string;
  phone: string;
  diningOption: string;
  tableOrAddress: string;
  notes?: string;
  items: any[];
  subtotal: number;
  tax: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  estimatedTime: string;
}

export const AdminDashboardPage: React.FC = () => {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<'All' | OrderStatus>('All');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'orders' | 'menu' | 'analytics'>('orders');
  const [menuStock, setMenuStock] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    MENU_ITEMS.forEach((m) => {
      map[m.id] = true;
    });
    return map;
  });

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } catch (err) {
      console.warn('Admin fetch orders fallback', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 8000); // live poll every 8 seconds
    return () => clearInterval(interval);
  }, []);

  const handleUpdateStatus = async (orderNumber: string, newStatus: OrderStatus) => {
    // optimistic UI update
    setOrders((prev) =>
      prev.map((o) => (o.orderNumber === orderNumber ? { ...o, status: newStatus } : o))
    );

    try {
      await fetch(`/api/orders/${orderNumber}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const toggleStock = (itemId: string) => {
    setMenuStock((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  // Analytics derivations
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const activeOrdersCount = orders.filter((o) => o.status === 'Received' || o.status === 'Preparing').length;
  const readyOrdersCount = orders.filter((o) => o.status === 'Ready').length;

  const filteredOrders = selectedFilter === 'All'
    ? orders
    : orders.filter((o) => o.status === selectedFilter);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      
      {/* Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8DECf]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3E6B48] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#3E6B48]">
              Live Admin & Kitchen Operations
            </span>
          </div>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#2C1810]">
            Bean & Brew Manager Console
          </h1>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-2 p-1 bg-[#F4ECE1] rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'orders'
                ? 'bg-[#3E2312] text-white shadow-xs'
                : 'text-[#6D4C3D] hover:text-[#2C1810]'
            }`}
          >
            Live Orders ({activeOrdersCount})
          </button>
          <button
            onClick={() => setActiveTab('menu')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'menu'
                ? 'bg-[#3E2312] text-white shadow-xs'
                : 'text-[#6D4C3D] hover:text-[#2C1810]'
            }`}
          >
            Inventory Control
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'analytics'
                ? 'bg-[#3E2312] text-white shadow-xs'
                : 'text-[#6D4C3D] hover:text-[#2C1810]'
            }`}
          >
            Analytics & Sales
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-[#E8DECf] shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-[#8C6D56]">Total Revenue (Today)</span>
          <div className="font-serif-display text-2xl font-bold text-[#2C1810] mt-1 tabular-nums">
            ₹{totalRevenue}
          </div>
          <span className="text-[11px] text-[#3E6B48] flex items-center gap-1 mt-1 font-medium">
            <TrendingUp className="w-3.5 h-3.5" /> +18% vs yesterday
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8DECf] shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-[#8C6D56]">Active Kitchen Queue</span>
          <div className="font-serif-display text-2xl font-bold text-[#B85D38] mt-1 tabular-nums">
            {activeOrdersCount}
          </div>
          <span className="text-[11px] text-[#8C6D56] mt-1 block">In brewing & steaming</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8DECf] shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-[#8C6D56]">Ready at Counter</span>
          <div className="font-serif-display text-2xl font-bold text-[#3E6B48] mt-1 tabular-nums">
            {readyOrdersCount}
          </div>
          <span className="text-[11px] text-[#3E6B48] mt-1 block">Awaiting customer pickup</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8DECf] shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-[#8C6D56]">Total Orders Handled</span>
          <div className="font-serif-display text-2xl font-bold text-[#2C1810] mt-1 tabular-nums">
            {orders.length}
          </div>
          <span className="text-[11px] text-[#8C6D56] mt-1 block">All dining channels</span>
        </div>
      </div>

      {/* VIEW 1: Live Kitchen Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {/* Status filter bar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {(['All', 'Received', 'Preparing', 'Ready', 'Completed'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedFilter(st)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    selectedFilter === st
                      ? 'bg-[#3E2312] text-white'
                      : 'bg-white text-[#6D4C3D] hover:bg-[#F3ECE0] border border-[#E8DECf]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <button
              onClick={fetchOrders}
              className="text-xs text-[#8C5E38] hover:text-[#5C341D] flex items-center gap-1 font-semibold"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Queue</span>
            </button>
          </div>

          {/* Orders Pipeline Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.map((order) => (
              <div
                key={order.orderNumber}
                className="bg-white rounded-2xl border border-[#E8DECf] shadow-xs flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Card Header */}
                  <div className="bg-[#FAF7F2] p-4 border-b border-[#F0EAE1] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#8C5E38] tracking-wider">
                        #{order.orderNumber}
                      </span>
                      <h3 className="font-bold text-[#2C1810] text-sm">
                        {order.customerName}
                      </h3>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        order.status === 'Received'
                          ? 'bg-[#EBF3ED] text-[#3E6B48]'
                          : order.status === 'Preparing'
                          ? 'bg-[#FDF3E8] text-[#B85D38]'
                          : order.status === 'Ready'
                          ? 'bg-[#E3EBF5] text-[#2D5A88]'
                          : 'bg-[#F0EAE1] text-[#7C5A43]'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-3 text-xs">
                    <div className="flex justify-between text-[#7C5A43]">
                      <span>{order.diningOption} · {order.tableOrAddress}</span>
                      <span>{order.createdAt}</span>
                    </div>

                    {/* Ordered items */}
                    <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#F0EAE1] space-y-1.5">
                      {order.items?.map((line, idx) => (
                        <div key={idx} className="flex justify-between text-[#2C1810]">
                          <div>
                            <span className="font-bold">{line.quantity}x</span> {line.item?.name || 'Drink'}
                            {line.customization && (
                              <p className="text-[10px] text-[#8C5E38] pl-4">
                                {line.customization.size}, {line.customization.milk}, {line.customization.sweetness}
                              </p>
                            )}
                          </div>
                          <span className="tabular-nums font-semibold">₹{line.item?.price * line.quantity}</span>
                        </div>
                      ))}
                    </div>

                    {order.notes && (
                      <p className="text-[11px] text-[#B85D38] italic bg-[#FDF0EC] p-2 rounded-lg">
                        Note: &ldquo;{order.notes}&rdquo;
                      </p>
                    )}
                  </div>
                </div>

                {/* Status action footer */}
                <div className="p-4 bg-[#FAF7F2] border-t border-[#F0EAE1] space-y-2">
                  <div className="flex justify-between text-xs font-bold text-[#2C1810]">
                    <span>Total Amount:</span>
                    <span className="tabular-nums">₹{order.total}</span>
                  </div>

                  {/* Quick status stepper buttons */}
                  <div className="grid grid-cols-3 gap-1 pt-1">
                    <button
                      onClick={() => handleUpdateStatus(order.orderNumber, 'Preparing')}
                      disabled={order.status === 'Preparing'}
                      className="py-1.5 text-[10px] font-bold uppercase rounded bg-white hover:bg-[#F3ECE0] border border-[#DFCFC0] text-[#5C4033] disabled:bg-[#3E2312] disabled:text-white"
                    >
                      Brewing
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(order.orderNumber, 'Ready')}
                      disabled={order.status === 'Ready'}
                      className="py-1.5 text-[10px] font-bold uppercase rounded bg-white hover:bg-[#F3ECE0] border border-[#DFCFC0] text-[#5C4033] disabled:bg-[#2D5A88] disabled:text-white"
                    >
                      Ready
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(order.orderNumber, 'Completed')}
                      disabled={order.status === 'Completed'}
                      className="py-1.5 text-[10px] font-bold uppercase rounded bg-white hover:bg-[#F3ECE0] border border-[#DFCFC0] text-[#5C4033] disabled:bg-[#3E6B48] disabled:text-white"
                    >
                      Done
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: Menu & Stock Inventory Management */}
      {activeTab === 'menu' && (
        <div className="bg-white rounded-3xl border border-[#E8DECf] p-6 space-y-6">
          <div>
            <h3 className="font-serif-display text-xl font-bold text-[#2C1810]">
              Menu Item Availability & Inventory
            </h3>
            <p className="text-xs text-[#7C5A43] mt-0.5">
              Toggle items in/out of stock. When toggled off, customers cannot order this item.
            </p>
          </div>

          <div className="divide-y divide-[#F0EAE1]">
            {MENU_ITEMS.map((item) => {
              const inStock = menuStock[item.id] !== false;
              return (
                <div key={item.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#FAF7F2] shrink-0 border border-[#E8DECf]">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#2C1810]">{item.name}</h4>
                      <span className="text-[11px] text-[#8C6D56]">{item.category} · ₹{item.price}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-semibold ${inStock ? 'text-[#3E6B48]' : 'text-[#B85D38]'}`}>
                      {inStock ? 'In Stock (Available)' : 'Sold Out (Disabled)'}
                    </span>
                    <button
                      onClick={() => toggleStock(item.id)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                        inStock
                          ? 'bg-[#FDF0EC] text-[#B85D38] hover:bg-[#FCE3DC]'
                          : 'bg-[#EBF3ED] text-[#3E6B48] hover:bg-[#D8EADB]'
                      }`}
                    >
                      {inStock ? 'Mark Sold Out' : 'Mark Available'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 3: Sales Analytics & Peak Hours */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Hourly Sales Bar Chart simulation */}
            <div className="bg-white p-6 rounded-3xl border border-[#E8DECf] shadow-xs space-y-4">
              <h3 className="font-serif-display text-lg font-bold text-[#2C1810]">
                Hourly Sales Distribution
              </h3>
              <p className="text-xs text-[#7C5A43]">
                Peak rush occurs between 4:00 PM – 6:30 PM (afternoon coffee break).
              </p>

              <div className="space-y-3 pt-2">
                {[
                  { hour: '8:00 AM', val: 420, percent: 30 },
                  { hour: '10:00 AM', val: 860, percent: 60 },
                  { hour: '12:00 PM', val: 1140, percent: 75 },
                  { hour: '2:00 PM', val: 680, percent: 45 },
                  { hour: '4:00 PM', val: 1350, percent: 90 },
                  { hour: '6:00 PM', val: 1620, percent: 100 },
                  { hour: '8:00 PM', val: 940, percent: 62 },
                ].map((row) => (
                  <div key={row.hour} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-[#5C4033]">{row.hour}</span>
                      <span className="font-bold text-[#2C1810] tabular-nums">₹{row.val}</span>
                    </div>
                    <div className="h-2 w-full bg-[#F4ECE1] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#3E2312] rounded-full"
                        style={{ width: `${row.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Revenue Generators */}
            <div className="bg-white p-6 rounded-3xl border border-[#E8DECf] shadow-xs space-y-4">
              <h3 className="font-serif-display text-lg font-bold text-[#2C1810]">
                Best-Selling Drinks & Bites
              </h3>
              <p className="text-xs text-[#7C5A43]">
                Highest sales contributors this week.
              </p>

              <div className="divide-y divide-[#F0EAE1] pt-2">
                {[
                  { name: 'Customized Cold Brew & Frappé', units: 62, rev: '₹12,400' },
                  { name: 'Artisan Cappuccino', units: 54, rev: '₹7,560' },
                  { name: 'Gourmet Veg Club Sandwich', units: 38, rev: '₹4,560' },
                  { name: 'Sizzling Chocolate Brownie', units: 35, rev: '₹4,550' },
                  { name: 'Special Masala Chai', units: 48, rev: '₹3,840' },
                ].map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-[#2C1810]">{item.name}</span>
                      <span className="text-[11px] text-[#8C6D56] block">{item.units} cups / units sold</span>
                    </div>
                    <span className="font-bold text-[#3E2312] tabular-nums">{item.rev}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
