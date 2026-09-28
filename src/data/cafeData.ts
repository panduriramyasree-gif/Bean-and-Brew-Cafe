/**
 * @file src/data/cafeData.ts
 * Central data store for Bean & Brew Café.
 * Beginners can easily edit prices, descriptions, and add new items here!
 * Every single item has a unique, dedicated photographic asset.
 */

import { MenuItem, Review } from '../types';

// Hero ambiance
import heroImg from '../assets/images/hero_cafe_ambiance_1790599197763.jpg';

// Coffee category images (unique per drink)
import cappuccinoImg from '../assets/images/cappuccino_art_1790599211673.jpg';
import espressoImg from '../assets/images/espresso_shot_1790602991916.jpg';
import latteImg from '../assets/images/caramel_latte_1790603004618.jpg';
import americanoImg from '../assets/images/classic_americano_1790603019246.jpg';

// Cold drinks category images (unique per beverage)
import coldCoffeeImg from '../assets/images/cold_coffee_iced_1790599225462.jpg';
import vietnameseIcedImg from '../assets/images/vietnamese_iced_1790603033258.jpg';
import mangoCoolerImg from '../assets/images/mango_cooler_1790603046899.jpg';

// Tea category images (unique per tea)
import masalaChaiImg from '../assets/images/masala_chai_1790603060030.jpg';
import earlGreyImg from '../assets/images/earl_grey_tea_1790603072445.jpg';
import jasmineTeaImg from '../assets/images/jasmine_tea_1790603085456.jpg';

// Breakfast category images (unique per dish)
import vegClubSandwichImg from '../assets/images/sandwiches_pastries_1790599237089.jpg';
import avocadoToastImg from '../assets/images/avocado_toast_1790603100251.jpg';
import blueberryPancakesImg from '../assets/images/blueberry_pancakes_1790603114493.jpg';

// Snacks category images (unique per snack)
import frenchFriesImg from '../assets/images/french_fries_1790603127752.jpg';
import garlicBreadImg from '../assets/images/garlic_bread_1790603139685.jpg';
import paneerRollImg from '../assets/images/paneer_roll_1790603153697.jpg';

// Desserts category images (unique per dessert)
import brownieImg from '../assets/images/chocolate_brownie_dessert_1790599248823.jpg';
import cheesecakeImg from '../assets/images/baked_cheesecake_1790603166208.jpg';
import tiramisuImg from '../assets/images/coffee_tiramisu_1790603182189.jpg';

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
    sandwich: vegClubSandwichImg,
    brownie: brownieImg,
  }
};

export const MENU_ITEMS: MenuItem[] = [
  // COFFEE CATEGORY (4 Items)
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
    image: espressoImg,
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
    image: latteImg,
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
    image: americanoImg,
    isPopular: false,
    isVeg: true,
    prepTime: '4 mins',
    tags: ['Bold', 'Zero Sugar']
  },

  // COLD DRINKS CATEGORY (3 Items)
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
    image: vietnameseIcedImg,
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
    image: mangoCoolerImg,
    isPopular: false,
    isVeg: true,
    prepTime: '4 mins',
    tags: ['Fruity', 'Mocktail']
  },

  // TEA CATEGORY (3 Items)
  {
    id: 'masala-chai-01',
    name: 'Special Masala Chai',
    category: 'Tea',
    description: 'Authentic Assam CTC tea brewed with crushed green cardamom, dried ginger, cloves, and whole milk.',
    price: 80,
    image: masalaChaiImg,
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
    image: earlGreyImg,
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
    image: jasmineTeaImg,
    isPopular: false,
    isVeg: true,
    prepTime: '4 mins',
    tags: ['Detox', 'Light']
  },

  // BREAKFAST CATEGORY (3 Items)
  {
    id: 'veg-sandwich-01',
    name: 'Gourmet Veg Club Sandwich',
    category: 'Breakfast',
    description: 'Toasted artisan multigrain sourdough stuffed with English cucumber, tomatoes, bell peppers, melted cheddar, and basil pesto.',
    price: 120,
    image: vegClubSandwichImg,
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
    image: avocadoToastImg,
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
    image: blueberryPancakesImg,
    isPopular: false,
    isVeg: true,
    prepTime: '10 mins',
    tags: ['Sweet', 'Warm']
  },

  // SNACKS CATEGORY (3 Items)
  {
    id: 'french-fries-01',
    name: 'Crispy Peri-Peri French Fries',
    category: 'Snacks',
    description: 'Golden potato fries tossed in our signature smoky peri-peri spice blend, served with garlic herb dip.',
    price: 110,
    image: frenchFriesImg,
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
    image: garlicBreadImg,
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
    image: paneerRollImg,
    isPopular: false,
    isVeg: true,
    prepTime: '9 mins',
    tags: ['Savory', 'Filling']
  },

  // DESSERTS CATEGORY (3 Items)
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
    image: cheesecakeImg,
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
    image: tiramisuImg,
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
