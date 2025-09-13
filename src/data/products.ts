// data/products.ts
import type { Product} from '../types';

// Import your images
import ToteBags from '../assets/LandingPage/totebags.png';
import Drinkware from '../assets/LandingPage/download (2).png';
import Corporate from '../assets/LandingPage/CorporateBranding.png';
import Apparels from '../data/Apparels/Tshirts/T5.webp';
import Vouchers from '../assets/LandingPage/kes. 1000.png';
import FridgeMagnet from '../assets/LandingPage/custom-fridge-magnet.jpg';

// Import product images
import ToteBag1 from '../data/ToteBags/black-white-canvas-tote-bag-Thailand.jpg';
import ToteBag2 from '../data/ToteBags/JuteToteBag.webp';
import Mug1 from '../data/DrinkWare/CeramicMug.webp';
import Mug2 from '../data/DrinkWare/InsulatedTumbler.webp';

export const categories = [
  {
    id: 1,
    name: "Tote Bags",
    slug: "tote-bags",
    description: "Eco-friendly and stylish tote bags for everyday use",
    image: ToteBags,
  },
  {
    id: 2,
    name: "Drinkware",
    slug: "drinkware",
    description: "Custom tumblers, mugs, and bottles for your beverages",
    image: Drinkware,
  },
  {
    id: 3,
    name: "Corporate Branding",
    slug: "corporate-branding",
    description: "Professional branding solutions for your business",
    image: Corporate,
  },
  {
    id: 4,
    name: "Apparels",
    slug: "apparels",
    description: "Custom t-shirts, hats, and other wearable merchandise",
    image: Apparels,
  },
  {
    id: 5,
    name: "Vouchers",
    slug: "vouchers",
    description: "Gift cards and promotional vouchers for your customers",
    image: Vouchers,
  },
  {
    id: 6,
    name: "Fridge Magnets",
    slug: "fridge-magnets",
    description: "Custom magnets for promotions or keepsakes",
    image: FridgeMagnet,
  }
];

export const products: Product[] = [
  // Tote Bags
  {
    id: 101,
    name: "Eco Canvas Tote",
    price: 1200,
    image: ToteBag1,
    category: "tote-bags",
    description: "Durable canvas tote bag with custom printing",
    inStock: true,
    tags: ["eco-friendly", "canvas", "custom"],
    images: [ToteBag1, ToteBag2],
    details: "This eco-friendly tote bag is made from high-quality canvas material. Perfect for shopping, beach trips, or everyday use. Features reinforced handles and a spacious interior.",
    variations: [
      {
        id: 1,
        name: "Small",
        price: 1000,
        inStock: true,
        attributes: { Size: "Small", Color: "Natural" }
      },
      {
        id: 2,
        name: "Medium",
        price: 1200,
        inStock: true,
        attributes: { Size: "Medium", Color: "Natural" }
      },
      {
        id: 3,
        name: "Large",
        price: 1500,
        inStock: false,
        attributes: { Size: "Large", Color: "Natural" }
      },
      {
        id: 4,
        name: "Medium - Blue",
        price: 1300,
        inStock: true,
        attributes: { Size: "Medium", Color: "Blue" }
      }
    ]
  },
  {
    id: 102,
    name: "Jute Shopping Bag",
    price: 1500,
    image: ToteBag2,
    category: "tote-bags",
    description: "Natural jute material with reinforced handles",
    inStock: true,
    tags: ["jute", "natural", "shopping"],
    images: [ToteBag2, ToteBag1],
    details: "Eco-friendly jute bag with comfortable handles. Perfect for grocery shopping or as a stylish everyday bag.",
    variations: [
      {
        id: 5,
        name: "Standard",
        price: 1500,
        inStock: true,
        attributes: { Size: "Standard", Color: "Natural" }
      }
    ]
  },
  
  // Drinkware
  {
    id: 201,
    name: "Custom Ceramic Mug",
    price: 800,
    image: Mug1,
    category: "drinkware",
    description: "11oz ceramic mug with full-wrap printing",
    inStock: true,
    tags: ["ceramic", "mug", "custom"],
    images: [Mug1, Mug2],
    details: "High-quality ceramic mug that holds 11oz of your favorite beverage. Dishwasher and microwave safe.",
    variations: [
      {
        id: 6,
        name: "White",
        price: 800,
        inStock: true,
        attributes: { Color: "White", Size: "11oz" }
      },
      {
        id: 7,
        name: "Black",
        price: 850,
        inStock: true,
        attributes: { Color: "Black", Size: "11oz" }
      }
    ]
  },
  {
    id: 202,
    name: "Insulated Travel Tumbler",
    price: 1800,
    image: Mug2,
    category: "drinkware",
    description: "Double-walled stainless steel tumbler",
    inStock: true,
    tags: ["insulated", "travel", "stainless steel"],
    images: [Mug2, Mug1],
    details: "Keep your drinks hot or cold for hours with our premium insulated tumbler. Leak-proof lid and comfortable grip.",
    variations: [
      {
        id: 8,
        name: "12oz - Silver",
        price: 1800,
        inStock: true,
        attributes: { Size: "12oz", Color: "Silver" }
      },
      {
        id: 9,
        name: "16oz - Black",
        price: 2000,
        inStock: true,
        attributes: { Size: "16oz", Color: "Black" }
      }
    ]
  },

  ////
    {
    id: 202,
    name: "Insulated Travel Tumbler",
    price: 1800,
    image: Apparels,
    category: "apparels",
    description: "Double-walled stainless steel tumbler",
    inStock: true,
    tags: ["insulated", "travel", "stainless steel"],
    images: [Mug2, Mug1],
    details: "Keep your drinks hot or cold for hours with our premium insulated tumbler. Leak-proof lid and comfortable grip.",
    variations: [
      {
        id: 8,
        name: "12oz - Silver",
        price: 1800,
        inStock: true,
        attributes: { Size: "12oz", Color: "Silver" }
      },
      {
        id: 9,
        name: "16oz - Black",
        price: 2000,
        inStock: true,
        attributes: { Size: "16oz", Color: "Black" }
      }
    ]
  },
  
  // Add more products as needed...
];
