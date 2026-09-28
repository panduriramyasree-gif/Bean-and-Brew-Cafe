/**
 * @file src/data/cafeData.ts
 * Central data store for Bean & Brew Café.
 * Beginners can easily edit prices, descriptions, and add new items here!
 */

import { MenuItem, Review } from '../types';

import heroImg from '../assets/images/hero_cafe_ambiance_1790599197763.jpg';
import cappuccinoImg from '../assets/images/cappuccino_art_1790599211673.jpg';
import coldCoffeeImg from '../assets/images/cold_coffee_iced_1790599225462.jpg';
import sandwichImg from '../assets/images/sandwiches_pastries_1790599237089.jpg';
import brownieImg from '../assets/images/chocolate_brownie_dessert_1790599248823.jpg';

export const CAFE_INFO = {
  name: 'Bean & Brew Café',
  tagline: 'Freshly Brewed. Made With Love.',
  subtitle: 'Artisanal roasts, soul-warming teas, fresh daily bakes, and peaceful neighborhood vibes.',
  phone: '+91 98765 43210',
  email: 'hello@beanandbrewcafe.com',
  address: '42 Roasted Bean Lane, 100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038',
  landmark: 'Right across from Metro Pillar 114',
  hours: {
    weekdays: 'Monday – Friday: 7:30 AM – 10:30 PM',
    weekends: 'Saturday – Sunday: 8:00 AM – 11:30 PM',
  },
  socials: {
    instagram: '@beanandbrew.cafe',
    facebook: '/beanandbrewcafe',
  },
  images: {
    hero: heroImg,
    cappuccino: cappuccinoImg,
    coldCoffee: coldCoffeeImg,
    sandwich: sandwichImg,
    brownie: brownieImg,
  }
};

export const MENU_ITEMS: MenuItem[] = [
  // COFFEE CATEGORY
  {
    id: 'cappuccino-01',
    name: 'Cappuccino',
    category: 'Coffee',
    description: 'Double shot of dark roasted Arabica espresso topped with rich velvety steamed milk microfoam and cocoa dust.',
    price: 140,
    image: cappuccinoImg,
    isPopular: true,
    isVeg: true,
    prepTime: '5 mins',
    tags: ['Espresso', 'Hot', 'Arabica']
  },
  {
    id: 'espresso-02',
    name: 'Single Origin Espresso',
    category: 'Coffee',
    description: 'Intense, aromatic 30ml pure shot with rich crema from Chikmagalur estate beans.',
    price: 110,
    image: cappuccinoImg,
    isPopular: false,
    isVeg: true,
    prepTime: '3 mins',
    tags: ['Strong', 'Pure']
  },
  {
    id: 'latte-03',
    name: 'Caramel Hazelnut Latte',
    category: 'Coffee',
    description: 'Silky smooth espresso with whole milk, infused with buttery caramel and roasted hazelnut syrup.',
    price: 175,
    image: cappuccinoImg,
    isPopular: true,
    isVeg: true,
    prepTime: '6 mins',
    tags: ['Sweet', 'Flavored']
  },
  {
    id: 'americano-04',
    name: 'Classic Americano',
    category: 'Coffee',
    description: 'Espresso stretched with hot filtered water, showcasing deep floral and nutty tasting notes.',
    price: 120,
    image: cappuccinoImg,
    isPopular: false,
    isVeg: true,
    prepTime: '4 mins',
    tags: ['Bold', 'Zero Sugar']
  },

  // COLD DRINKS CATEGORY
  {
    id: 'cold-coffee-01',
    name: 'Signature Cold Coffee',
    category: 'Cold Drinks',
    description: 'Thick, creamy blended cold coffee made with slow-steeped espresso, chilled fresh milk, and vanilla bean cream.',
    price: 160,
    image: coldCoffeeImg,
    isPopular: true,
    isVeg: true,
    prepTime: '5 mins',
    tags: ['Chilled', 'Bestseller']
  },
  {
    id: 'iced-latte-02',
    name: 'Vietnamese Iced Coffee',
    category: 'Cold Drinks',
    description: 'Dark roast dripped over ice and rich sweetened condensed milk for the ultimate pick-me-up.',
    price: 170,
    image: coldCoffeeImg,
    isPopular: false,
    isVeg: true,
    prepTime: '5 mins',
    tags: ['Sweet', 'Strong']
  },
  {
    id: 'mango-peach-cooler-03',
    name: 'Mango Peach Sparkling Cooler',
    category: 'Cold Drinks',
    description: 'Refreshing sparkling soda infused with Alphonso mango pulp, crushed mint, and juicy peach nectar.',
    price: 150,
    image: coldCoffeeImg,
    isPopular: false,
    isVeg: true,
    prepTime: '4 mins',
    tags: ['Fruity', 'Mocktail']
  },

  // TEA CATEGORY
  {
    id: 'masala-chai-01',
    name: 'Special Masala Chai',
    category: 'Tea',
    description: 'Authentic Assam CTC tea brewed with crushed green cardamom, dried ginger, cloves, and whole milk.',
    price: 80,
    image: cappuccinoImg,
    isPopular: true,
    isVeg: true,
    prepTime: '6 mins',
    tags: ['Traditional', 'Spiced']
  },
  {
    id: 'earl-grey-02',
    name: 'Earl Grey Lavender Tea',
    category: 'Tea',
    description: 'Full-leaf Ceylon black tea scented with cold-pressed Italian bergamot and subtle French lavender petals.',
    price: 110,
    image: cappuccinoImg,
    isPopular: false,
    isVeg: true,
    prepTime: '4 mins',
    tags: ['Floral', 'Aromatherapy']
  },
  {
    id: 'green-tea-03',
    name: 'Honey Lemon Jasmine Green Tea',
    category: 'Tea',
    description: 'Delicate high-grown green tea scented with night-blooming jasmine flowers, raw wild honey, and lemon.',
    price: 95,
    image: cappuccinoImg,
    isPopular: false,
    isVeg: true,
    prepTime: '4 mins',
    tags: ['Detox', 'Light']
  },

  // BREAKFAST CATEGORY
  {
    id: 'veg-sandwich-01',
    name: 'Gourmet Veg Club Sandwich',
    category: 'Breakfast',
    description: 'Toasted artisan multigrain sourdough stuffed with English cucumber, tomatoes, bell peppers, melted cheddar, and basil pesto.',
    price: 120,
    image: sandwichImg,
    isPopular: true,
    isVeg: true,
    prepTime: '8 mins',
    tags: ['Crispy', 'Healthy']
  },
  {
    id: 'avocado-toast-02',
    name: 'Avocado & Herb Toast',
    category: 'Breakfast',
    description: 'Hass avocado mashed with lime, sea salt, red chili flakes, and microgreens on toasted rustic sourdough.',
    price: 180,
    image: sandwichImg,
    isPopular: true,
    isVeg: true,
    prepTime: '7 mins',
    tags: ['Vegan', 'Superfood']
  },
  {
    id: 'pancakes-03',
    name: 'Fluffy Blueberry Pancakes',
    category: 'Breakfast',
    description: 'Stack of three golden buttermilk pancakes stuffed with fresh blueberries, served with whipped butter and maple syrup.',
    price: 190,
    image: sandwichImg,
    isPopular: false,
    isVeg: true,
    prepTime: '10 mins',
    tags: ['Sweet', 'Warm']
  },

  // SNACKS CATEGORY
  {
    id: 'french-fries-01',
    name: 'Crispy Peri-Peri French Fries',
    category: 'Snacks',
    description: 'Golden potato fries tossed in our signature smoky peri-peri spice blend, served with garlic herb dip.',
    price: 110,
    image: sandwichImg,
    isPopular: true,
    isVeg: true,
    prepTime: '6 mins',
    tags: ['Spicy', 'Crunchy']
  },
  {
    id: 'garlic-bread-02',
    name: 'Cheesy Garlic Pull-Apart Bread',
    category: 'Snacks',
    description: 'Freshly baked baguette loaded with roasted garlic butter, parsley, and bubbling melted mozzarella.',
    price: 140,
    image: sandwichImg,
    isPopular: false,
    isVeg: true,
    prepTime: '8 mins',
    tags: ['Cheesy', 'Comfort']
  },
  {
    id: 'paneer-wrap-03',
    name: 'Tandoori Spiced Paneer Roll',
    category: 'Snacks',
    description: 'Marinated cottage cheese cubes roasted in tandoor spices, rolled in a flaky paratha with mint chutney and pickled onions.',
    price: 150,
    image: sandwichImg,
    isPopular: false,
    isVeg: true,
    prepTime: '9 mins',
    tags: ['Savory', 'Filling']
  },

  // DESSERTS CATEGORY
  {
    id: 'chocolate-brownie-01',
    name: 'Sizzling Chocolate Brownie',
    category: 'Desserts',
    description: 'Warm, gooey Belgian dark chocolate fudge brownie with crackly top crust, warm chocolate sauce, and walnuts.',
    price: 130,
    image: brownieImg,
    isPopular: true,
    isVeg: true,
    prepTime: '5 mins',
    tags: ['Decadent', 'Fudge']
  },
  {
    id: 'cheesecake-02',
    name: 'Classic New York Baked Cheesecake',
    category: 'Desserts',
    description: 'Creamy, velvety cheesecake on a buttery graham cracker crust, topped with tart raspberry compote.',
    price: 195,
    image: brownieImg,
    isPopular: true,
    isVeg: true,
    prepTime: '3 mins',
    tags: ['Creamy', 'Gourmet']
  },
  {
    id: 'tiramisu-03',
    name: 'Authentic Coffee Tiramisu',
    category: 'Desserts',
    description: 'Espresso-soaked savoiardi ladyfingers layered with whipped mascarpone cream and dusted with Dutch cocoa.',
    price: 210,
    image: brownieImg,
    isPopular: false,
    isVeg: true,
    prepTime: '3 mins',
    tags: ['Coffee', 'Italian']
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Ananya Sharma',
    rating: 5,
    comment: 'The cappuccino and peri-peri fries are hands down the best in the city. The ambient jazz and warm lighting make it my favorite remote work spot!',
    role: 'Food Blogger & Designer',
    avatarText: 'AS'
  },
  {
    id: 'rev-2',
    name: 'Vikram Malhotra',
    rating: 5,
    comment: 'Bean & Brew is my daily ritual. The cold coffee is rich and perfectly balanced without being overly sweet. Great service every single time.',
    role: 'Regular Patron',
    avatarText: 'VM'
  },
  {
    id: 'rev-3',
    name: 'Sneha Rao',
    rating: 5,
    comment: 'Their chocolate brownie served fresh and warm is pure bliss! The staff is courteous and the online ordering process is delightfully fast.',
    role: 'Local Resident',
    avatarText: 'SR'
  }
];
