import type { CategoryDefinition, Coupon, Product } from "../domain/types";

const placeholderImage = require("../../assets/fruits-and-vegetables.png");

export const categories: CategoryDefinition[] = [
  { id: "milk-dairy", title: "Milk & Dairy", slug: "milk-dairy", icon: "🥛", description: "Fresh dairy, butter, paneer and more" },
  { id: "vegetables", title: "Vegetables", slug: "vegetables", icon: "🥕", description: "Farm fresh vegetables" },
  { id: "fruits", title: "Fruits", slug: "fruits", icon: "🍎", description: "Seasonal fruits and berries" },
  { id: "eggs", title: "Eggs", slug: "eggs", icon: "🥚", description: "Fresh eggs and protein staples" },
  { id: "animals", title: "Live Animals", slug: "animals", icon: "🐄", description: "Cattle, buffalo and livestock" },
  { id: "grocery", title: "Grocery", slug: "grocery", icon: "🧺", description: "Grains, pulses and essentials" },
  { id: "snacks", title: "Snacks", slug: "snacks", icon: "🍿", description: "Snacks and pantry favourites" },
];

export const coupons: Coupon[] = [
  { id: "c1", code: "SAVE10", description: "10% off on orders above ₹200", value: 0.1 },
  { id: "c2", code: "FLAT50", description: "₹50 off", value: 50 },
];

export const featuredProducts: Product[] = [
  { id: "p1", title: "Organic Honey", price: 299, unit: "500 g", category: "grocery", image: placeholderImage, tags: ["featured", "sweet"], isFeatured: true },
  { id: "p2", title: "Masala Combo", price: 149, unit: "250 g", category: "grocery", image: placeholderImage, tags: ["featured", "spice"], isFeatured: true },
  { id: "p3", title: "Basmati Rice", price: 359, unit: "1 kg", category: "grocery", image: placeholderImage, tags: ["featured", "grain"], isFeatured: true },
  { id: "p4", title: "Fresh Paneer", price: 225, unit: "500 g", category: "milk-dairy", image: placeholderImage, tags: ["featured", "dairy"], isFeatured: true },
];

export const dealProducts: Product[] = [
  { id: "d1", title: "Amul Butter", price: 265, unit: "200 g", category: "milk-dairy", image: placeholderImage, tags: ["deal"], isDeal: true },
  { id: "d2", title: "Aashirvaad Atta", price: 249, unit: "5 kg", category: "grocery", image: placeholderImage, tags: ["deal"], isDeal: true },
  { id: "d3", title: "Fortune Sunlite", price: 135, unit: "1 L", category: "grocery", image: placeholderImage, tags: ["deal"], isDeal: true },
  { id: "d4", title: "Tata Salt", price: 17, unit: "1 kg", category: "grocery", image: placeholderImage, tags: ["deal"], isDeal: true },
];

const animalImage = (uri: string) => ({ uri });

export const liveAnimalProducts: Product[] = [
  { id: "animal-broiler-chicken", title: "Broiler Chicken", price: 280, unit: "Per bird", category: "animals", image: animalImage("https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=1200&q=80"), tags: ["live", "poultry", "broiler"], saleMode: "unit", breed: "Broiler", age: "6-8 weeks", weight: "2.2-2.6 kg", availability: "Today", location: "Pune Farm", details: "Vet-checked broiler birds, ideal for fresh home consumption and farm pickup. These birds are kept in a clean, well-ventilated poultry shed with regular health monitoring.", shortDescription: "Healthy broiler birds with premium meat quality and fast delivery.", availableUnits: 24, minOrder: 1, videoUrl: "https://www.youtube.com/watch?v=3eLJmI8U8sA", status: "Available" },
  { id: "animal-desi-chicken", title: "Desi Chicken", price: 420, unit: "Per bird", category: "animals", image: animalImage("https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=1200&q=80"), tags: ["live", "poultry", "desi"], saleMode: "unit", breed: "Desi", age: "8-10 weeks", weight: "1.8-2.2 kg", availability: "Tomorrow", location: "Nashik Village", details: "Naturally reared desi birds with strong flavor and premium meat quality. They are raised on a traditional diet with ample outdoor access.", shortDescription: "Traditional desi birds with rich flavor and strong body condition.", availableUnits: 16, minOrder: 1, videoUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4", status: "Available" },
  { id: "animal-kombda-goat", title: "Kombda Goat", price: 9800, unit: "Per goat", category: "animals", image: animalImage("https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80"), tags: ["live", "goat", "breeding"], saleMode: "unit", breed: "Kombda", age: "12-18 months", weight: "28-35 kg", availability: "This week", location: "Satara Goat Farm", details: "Healthy, active breeding-quality goat with strong build and good temperament. Suitable for farms, breeding, and home rearing.", shortDescription: "Strong kombda goats selected for breeding and healthy farming use.", availableUnits: 8, minOrder: 1, videoUrl: "https://www.youtube.com/watch?v=QhFW9aR9v0Q", status: "Limited" },
  { id: "animal-jersey-cow", title: "Jersey Cow", price: 58000, unit: "Per cow", category: "animals", image: animalImage("https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1200&q=80"), tags: ["live", "cow", "dairy"], saleMode: "unit", breed: "Jersey", age: "3 years", weight: "320-380 kg", availability: "Next week", location: "Baramati Dairy", details: "High-yield Jersey cow with good milking temperament and veterinary clearance. Ideal for dairy farms wanting reliable milk production.", shortDescription: "Premium dairy cow with excellent milk yield and calm temperament.", availableUnits: 5, minOrder: 1, videoUrl: "https://www.youtube.com/watch?v=V0d2j2H0A8Q", status: "Available" },
  { id: "animal-buffalo", title: "Murrah Buffalo", price: 92000, unit: "Per buffalo", category: "animals", image: animalImage("https://images.unsplash.com/photo-1508170752016-f7abd86503b7?auto=format&fit=crop&w=1200&q=80"), tags: ["live", "buffalo", "dairy"], saleMode: "unit", breed: "Murrah", age: "2.5 years", weight: "450-500 kg", availability: "This month", location: "Latur Dairy Hub", details: "Premium Murrah buffalo with excellent milk yield and clean health record. Professionally handled and vaccinated.", shortDescription: "Premium buffalo selected for milk production and farm strength.", availableUnits: 3, minOrder: 1, videoUrl: "https://www.youtube.com/watch?v=1Yz0_6wrtpM", status: "Limited" },
  { id: "animal-bullock", title: "Working Bullock", price: 64000, unit: "Per pair", category: "animals", image: animalImage("https://images.unsplash.com/photo-1516556645000-3898c7f475ee?auto=format&fit=crop&w=1200&q=80"), tags: ["live", "bullock", "agri"], saleMode: "unit", breed: "Local", age: "4 years", weight: "700-850 kg", availability: "Ready now", location: "Solapur Farm", details: "Strong draft bullocks for farming and transport, trained and easy to manage. Suitable for heavy agricultural work.", shortDescription: "Trained working bullocks ideal for farm operations and transport.", availableUnits: 4, minOrder: 1, videoUrl: "https://www.youtube.com/watch?v=UGg2m5k4YkA", status: "Available" },
];

export const allProducts = [...featuredProducts, ...dealProducts, ...liveAnimalProducts];
