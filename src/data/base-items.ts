import { ItemCategory } from "@/types";

export interface BaseItem {
  name: string;
  category: ItemCategory;
  baseQuantity: number;
  perDay?: boolean; // if true, quantity scales with trip duration
  conditions?: {
    weather?: "hot" | "cold" | "rainy";
    travelMode?: "flying" | "driving";
    accommodation?: "airbnb"; // only include if staying at airbnb
    gender?: "male" | "female";
  };
}

export const baseItems: BaseItem[] = [
  // Clothing -- universal
  { name: "Underwear", category: "clothing", baseQuantity: 1, perDay: true },
  { name: "Socks", category: "clothing", baseQuantity: 1, perDay: true },
  { name: "T-shirts / tops", category: "clothing", baseQuantity: 1, perDay: true },
  { name: "Pants / bottoms", category: "clothing", baseQuantity: 1 },
  { name: "Pajamas", category: "clothing", baseQuantity: 1 },
  { name: "Comfortable walking shoes", category: "clothing", baseQuantity: 1 },
  { name: "Belt", category: "clothing", baseQuantity: 1 },

  // Toiletries -- universal
  { name: "Toothbrush", category: "toiletries", baseQuantity: 1 },
  { name: "Toothpaste", category: "toiletries", baseQuantity: 1 },
  { name: "Deodorant", category: "toiletries", baseQuantity: 1 },
  { name: "Shampoo", category: "toiletries", baseQuantity: 1 },
  { name: "Conditioner", category: "toiletries", baseQuantity: 1 },
  { name: "Body wash / soap", category: "toiletries", baseQuantity: 1 },
  { name: "Razor", category: "toiletries", baseQuantity: 1 },
  { name: "Sunscreen", category: "toiletries", baseQuantity: 1 },
  { name: "Lip balm", category: "toiletries", baseQuantity: 1 },
  { name: "Medications (prescription)", category: "toiletries", baseQuantity: 1 },
  { name: "Pain reliever (ibuprofen/tylenol)", category: "toiletries", baseQuantity: 1 },

  // Electronics -- universal
  { name: "Phone charger", category: "electronics", baseQuantity: 1 },
  { name: "Phone", category: "electronics", baseQuantity: 1 },
  { name: "Headphones / earbuds", category: "electronics", baseQuantity: 1 },
  { name: "Portable battery pack", category: "electronics", baseQuantity: 1 },

  // Documents -- universal
  { name: "ID / driver's license", category: "documents", baseQuantity: 1 },
  { name: "Credit card / debit card", category: "documents", baseQuantity: 1 },
  { name: "Cash", category: "documents", baseQuantity: 1 },
  { name: "Health insurance card", category: "documents", baseQuantity: 1 },

  // Misc -- universal
  { name: "Reusable water bottle", category: "misc", baseQuantity: 1 },
  { name: "Snacks", category: "misc", baseQuantity: 1 },

  // Weather-conditional items
  { name: "Sunglasses", category: "clothing", baseQuantity: 1, conditions: { weather: "hot" } },
  { name: "Hat / cap", category: "clothing", baseQuantity: 1, conditions: { weather: "hot" } },
  { name: "Shorts", category: "clothing", baseQuantity: 2, conditions: { weather: "hot" } },
  { name: "Sandals / flip-flops", category: "clothing", baseQuantity: 1, conditions: { weather: "hot" } },
  { name: "Swimsuit", category: "clothing", baseQuantity: 1, conditions: { weather: "hot" } },
  { name: "Winter jacket / coat", category: "clothing", baseQuantity: 1, conditions: { weather: "cold" } },
  { name: "Gloves", category: "clothing", baseQuantity: 1, conditions: { weather: "cold" } },
  { name: "Scarf", category: "clothing", baseQuantity: 1, conditions: { weather: "cold" } },
  { name: "Thermal underwear / base layer", category: "clothing", baseQuantity: 1, conditions: { weather: "cold" } },
  { name: "Warm hat / beanie", category: "clothing", baseQuantity: 1, conditions: { weather: "cold" } },
  { name: "Sweater / fleece", category: "clothing", baseQuantity: 1, conditions: { weather: "cold" } },
  { name: "Rain jacket", category: "clothing", baseQuantity: 1, conditions: { weather: "rainy" } },
  { name: "Umbrella", category: "misc", baseQuantity: 1, conditions: { weather: "rainy" } },
  { name: "Waterproof shoes / boots", category: "clothing", baseQuantity: 1, conditions: { weather: "rainy" } },

  // Flying-specific
  { name: "TSA-approved liquids bag", category: "misc", baseQuantity: 1, conditions: { travelMode: "flying" } },
  { name: "Luggage tags", category: "misc", baseQuantity: 2, conditions: { travelMode: "flying" } },
  { name: "Neck pillow", category: "misc", baseQuantity: 1, conditions: { travelMode: "flying" } },
  { name: "Passport", category: "documents", baseQuantity: 1, conditions: { travelMode: "flying" } },

  // Airbnb-specific (hotels provide these)
  { name: "Towel(s)", category: "misc", baseQuantity: 2, conditions: { accommodation: "airbnb" } },
  { name: "Hair dryer", category: "toiletries", baseQuantity: 1, conditions: { accommodation: "airbnb" } },

  // Gender-specific
  { name: "Makeup bag", category: "toiletries", baseQuantity: 1, conditions: { gender: "female" } },
  { name: "Hair ties / bobby pins", category: "toiletries", baseQuantity: 1, conditions: { gender: "female" } },
  { name: "Feminine hygiene products", category: "toiletries", baseQuantity: 1, conditions: { gender: "female" } },
];

export const categoryLabels: Record<ItemCategory, string> = {
  clothing: "Clothing",
  toiletries: "Toiletries",
  electronics: "Electronics",
  documents: "Documents & Money",
  "trip-specific": "Trip-Specific",
  misc: "Miscellaneous",
};
