/**
 * @file server.ts
 * Express backend running Vite middleware in dev and providing full-stack API routes:
 * 1. AI Barista Assistant powered by Gemini API (@google/genai)
 * 2. In-Memory Orders & Real-time Status updates
 * 3. Menu management & Stock inventory
 * 4. Analytics endpoints for Admin Dashboard
 */

import express, { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// In-Memory Database store
interface OrderRecord {
  orderNumber: string;
  customerName: string;
  phone: string;
  diningOption: string;
  tableOrAddress: string;
  notes?: string;
  items: any[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: 'Received' | 'Preparing' | 'Ready' | 'Completed' | 'Cancelled';
  createdAt: string;
  estimatedTime: string;
  earnedPoints?: number;
}

const ordersStore: OrderRecord[] = [
  {
    orderNumber: 'BB-7421',
    customerName: 'Aditi Varma',
    phone: '+91 98765 11223',
    diningOption: 'Dine-in',
    tableOrAddress: 'Table 03',
    notes: 'Extra hot latte, oat milk',
    items: [
      {
        id: 'mock-1',
        item: { name: 'Caramel Hazelnut Latte', price: 175, category: 'Coffee' },
        quantity: 1,
        customization: { size: 'Large', milk: 'Oat Milk', sweetness: 'Less Sugar (50%)', toppings: ['Caramel Drizzle'] }
      },
      {
        id: 'mock-2',
        item: { name: 'Sizzling Chocolate Brownie', price: 130, category: 'Desserts' },
        quantity: 1
      }
    ],
    subtotal: 355,
    tax: 18,
    discount: 0,
    total: 373,
    status: 'Preparing',
    createdAt: '10:15 AM',
    estimatedTime: '10 mins',
    earnedPoints: 37
  },
  {
    orderNumber: 'BB-8910',
    customerName: 'Rohan Mehra',
    phone: '+91 91234 56789',
    diningOption: 'Takeaway',
    tableOrAddress: 'Counter Pickup',
    items: [
      {
        id: 'mock-3',
        item: { name: 'Signature Cold Coffee', price: 160, category: 'Cold Drinks' },
        quantity: 2
      }
    ],
    subtotal: 320,
    tax: 16,
    discount: 20,
    total: 316,
    status: 'Ready',
    createdAt: '10:05 AM',
    estimatedTime: 'Ready for pickup',
    earnedPoints: 31
  }
];

// --- 1. AI Barista Recommendation Route ---
app.post('/api/ai/barista-recommend', async (req: Request, res: Response) => {
  try {
    const { tastePreference, timeOfDay, moodOrDiet, customDrinkIdea } = req.body;

    if (!aiClient) {
      // Fallback response if API key is not configured yet
      return res.json({
        recommendation: "Our Signature Cold Coffee with Oat Milk and a touch of Cinnamon Dust is perfect for your taste!",
        suggestedCustomization: {
          size: "Medium",
          milk: "Oat Milk",
          sweetness: "Less Sugar (50%)",
          toppings: ["Cinnamon Dust"],
          baseDrink: "Signature Cold Coffee"
        },
        flavorNotes: "Rich, nutty, and subtly spiced with slow-steeped espresso.",
        isAI: false
      });
    }

    const systemPrompt = `You are the master barista and coffee sommelier at 'Bean & Brew Café' in Indiranagar, Bengaluru.
Our menu offers:
- Coffees: Cappuccino (₹140), Single Origin Espresso (₹110), Caramel Hazelnut Latte (₹175), Classic Americano (₹120)
- Cold Drinks: Signature Cold Coffee (₹160), Vietnamese Iced Coffee (₹170), Mango Peach Cooler (₹150)
- Teas: Special Masala Chai (₹80), Earl Grey Lavender (₹110), Honey Lemon Jasmine Green Tea (₹95)
- Bites & Bakery: Gourmet Veg Club Sandwich (₹120), Avocado & Herb Toast (₹180), Fluffy Pancakes (₹190), Crispy Peri-Peri Fries (₹110), Cheesy Garlic Pull-Apart Bread (₹140), Chocolate Brownie (₹130)

Available customizations:
- Sizes: Small, Medium, Large
- Milk: Regular Milk, Oat Milk, Almond Milk, Soy Milk
- Sweetness: No Sugar (0%), Less Sugar (50%), Normal Sugar (100%)
- Toppings: Caramel Drizzle, Chocolate Swirl, Whipped Cream, Cinnamon Dust, Extra Espresso Shot

Respond in strictly valid JSON format with:
{
  "recommendation": "1-2 sentences warm personalized barista recommendation and why it pairs with their mood/time",
  "suggestedDrink": "Exact drink name from our menu or builder",
  "suggestedCustomization": {
    "size": "Small" | "Medium" | "Large",
    "milk": "Regular Milk" | "Oat Milk" | "Almond Milk" | "Soy Milk",
    "sweetness": "No Sugar (0%)" | "Less Sugar (50%)" | "Normal Sugar (100%)",
    "toppings": ["Topping1", "Topping2"]
  },
  "foodPairing": "A snack or dessert from our menu that pairs heavenly with it",
  "flavorNotes": "3-4 flavor descriptors like Velvety, Floral, Dark Cocoa"
}`;

    const userPrompt = `Customer Preferences:
- Taste profile: ${tastePreference || 'Nutty and creamy'}
- Time of Day: ${timeOfDay || 'Morning'}
- Mood / Diet: ${moodOrDiet || 'Energizing, vegan-friendly'}
- Custom request / Idea: ${customDrinkIdea || 'Surprise me with something artisan'}`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `${systemPrompt}\n\n${userPrompt}`,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    const parsed = JSON.parse(text);
    return res.json({ ...parsed, isAI: true });
  } catch (error: any) {
    console.error('Gemini Barista Error:', error);
    return res.json({
      recommendation: "A fresh Caramel Hazelnut Latte with Oat Milk and Cinnamon Dust is our Barista's top pick for you!",
      suggestedDrink: "Caramel Hazelnut Latte",
      suggestedCustomization: {
        size: "Medium",
        milk: "Oat Milk",
        sweetness: "Less Sugar (50%)",
        toppings: ["Cinnamon Dust", "Caramel Drizzle"]
      },
      foodPairing: "Warm Sizzling Chocolate Brownie",
      flavorNotes: "Toasted hazelnut, buttery caramel, velvety microfoam",
      isAI: false
    });
  }
});

// --- 2. Orders Management Endpoints ---
app.get('/api/orders', (_req: Request, res: Response) => {
  res.json({ orders: ordersStore });
});

app.get('/api/orders/:orderNumber', (req: Request, res: Response) => {
  const { orderNumber } = req.params;
  const order = ordersStore.find((o) => o.orderNumber.toUpperCase() === orderNumber.toUpperCase());
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json({ order });
});

app.post('/api/orders', (req: Request, res: Response) => {
  const newOrder: OrderRecord = {
    ...req.body,
    orderNumber: req.body.orderNumber || `BB-${Math.floor(1000 + Math.random() * 9000)}`,
    status: 'Received',
    createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    earnedPoints: Math.floor((req.body.total || 100) * 0.1), // 10% cash back in points
  };
  ordersStore.unshift(newOrder);
  res.status(201).json({ success: true, order: newOrder });
});

app.patch('/api/orders/:orderNumber/status', (req: Request, res: Response) => {
  const { orderNumber } = req.params;
  const { status } = req.body;
  const order = ordersStore.find((o) => o.orderNumber.toUpperCase() === orderNumber.toUpperCase());
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  order.status = status;
  res.json({ success: true, order });
});

// --- 3. Analytics Summary Endpoint for Admin ---
app.get('/api/admin/analytics', (_req: Request, res: Response) => {
  const totalRevenue = ordersStore.reduce((acc, o) => acc + (o.total || 0), 0);
  const totalOrders = ordersStore.length;
  const activeOrders = ordersStore.filter((o) => o.status === 'Received' || o.status === 'Preparing').length;
  const completedOrders = ordersStore.filter((o) => o.status === 'Completed' || o.status === 'Ready').length;

  res.json({
    totalRevenue,
    totalOrders,
    activeOrders,
    completedOrders,
    averageOrderValue: totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0,
    salesByHour: [
      { hour: '8 AM', sales: 420 },
      { hour: '10 AM', sales: 860 },
      { hour: '12 PM', sales: 1140 },
      { hour: '2 PM', sales: 680 },
      { hour: '4 PM', sales: 1350 },
      { hour: '6 PM', sales: 1620 },
      { hour: '8 PM', sales: 940 },
    ],
    popularItems: [
      { name: 'Cappuccino', count: 48, revenue: 6720 },
      { name: 'Customized Cold Coffee', count: 39, revenue: 7800 },
      { name: 'Crispy Peri-Peri Fries', count: 32, revenue: 3520 },
      { name: 'Gourmet Veg Club Sandwich', count: 28, revenue: 3360 },
      { name: 'Sizzling Chocolate Brownie', count: 24, revenue: 3120 },
    ]
  });
});

// Start Dev or Prod server with Vite
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Bean & Brew Café Full-Stack server running on port ${PORT}`);
  });
}

startServer();
