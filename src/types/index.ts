/**
 * @file src/types/index.ts
 * Extended Type definitions for the Bean & Brew Café full-featured system.
 */

export type Category = 
  | 'All'
  | 'Coffee'
  | 'Tea'
  | 'Cold Drinks'
  | 'Breakfast'
  | 'Snacks'
  | 'Desserts';

export interface MenuItem {
  id: string;
  name: string;
  category: Exclude<Category, 'All'>;
  description: string;
  price: number; // in Indian Rupees (₹)
  image: string;
  isPopular?: boolean;
  isVeg?: boolean;
  prepTime?: string;
  tags?: string[];
  stock?: number;
  isAvailable?: boolean;
}

// --- Custom Coffee Builder Types ---
export type CoffeeSize = 'Small' | 'Medium' | 'Large';
export type CoffeeMilk = 'Regular Milk' | 'Oat Milk' | 'Almond Milk' | 'Soy Milk';
export type CoffeeSweetness = 'No Sugar (0%)' | 'Less Sugar (50%)' | 'Normal Sugar (100%)';
export type CoffeeRoast = 'Medium Roast' | 'Dark Roast Arabica';
export type CoffeeTopping = 'Caramel Drizzle' | 'Chocolate Swirl' | 'Whipped Cream' | 'Cinnamon Dust' | 'Extra Espresso Shot';

export interface CoffeeCustomization {
  baseDrinkId: string;
  baseDrinkName: string;
  size: CoffeeSize;
  milk: CoffeeMilk;
  sweetness: CoffeeSweetness;
  roast: CoffeeRoast;
  toppings: CoffeeTopping[];
  notes?: string;
  calculatedPrice: number;
}

export interface CartItem {
  id: string; // unique cart line ID (allows multiple customized variations of the same drink)
  item: MenuItem;
  quantity: number;
  customization?: CoffeeCustomization;
}

export type DiningOption = 'Dine-in' | 'Takeaway' | 'Delivery';

export type OrderStatus = 'Received' | 'Preparing' | 'Ready' | 'Completed' | 'Cancelled';

export interface OrderDetails {
  orderNumber: string;
  customerName: string;
  phone: string;
  diningOption: DiningOption;
  tableOrAddress: string;
  notes?: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  estimatedTime: string;
  earnedPoints?: number;
  redeemedPoints?: number;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  role: string;
  avatarText: string;
  date?: string;
}

export interface UserAccount {
  name: string;
  email: string;
  phone: string;
  loyaltyPoints: number;
  role: 'customer' | 'admin';
  savedAddresses?: string[];
  orderHistory?: string[]; // array of order numbers
}

export interface AIRecommendationRequest {
  tastePreference: string; // e.g. "sweet & iced", "bold black", "light herbal"
  timeOfDay: string;       // "Morning", "Afternoon", "Evening"
  moodOrDiet: string;      // "Need energy", "Relaxing", "Dairy-free", "Keto"
}

export type PageId = 
  | 'home' 
  | 'menu' 
  | 'builder' 
  | 'track' 
  | 'loyalty' 
  | 'about' 
  | 'contact' 
  | 'admin';
