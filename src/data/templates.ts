import { ItemCategory, TripType, Gender } from "@/types";

export interface TemplateItem {
  name: string;
  category: ItemCategory;
  quantity: number;
}

export interface TripTemplate {
  tripType: TripType;
  gender?: Gender;
  label: string;
  items: TemplateItem[];
  removals?: string[]; // item names to remove from base list
}

export const tripTemplates: TripTemplate[] = [
  {
    tripType: "wedding",
    gender: "male",
    label: "Wedding (Male Guest)",
    items: [
      { name: "Suit / sport coat", category: "clothing", quantity: 1 },
      { name: "Dress shirt", category: "clothing", quantity: 1 },
      { name: "Tie", category: "clothing", quantity: 1 },
      { name: "Dress shoes", category: "clothing", quantity: 1 },
      { name: "Dress socks", category: "clothing", quantity: 1 },
      { name: "Cufflinks", category: "trip-specific", quantity: 1 },
      { name: "Pocket square", category: "trip-specific", quantity: 1 },
      { name: "Garment bag", category: "trip-specific", quantity: 1 },
      { name: "Lint roller", category: "trip-specific", quantity: 1 },
      { name: "Cologne", category: "toiletries", quantity: 1 },
      { name: "Hair product / gel", category: "toiletries", quantity: 1 },
      { name: "Wedding card", category: "trip-specific", quantity: 1 },
      { name: "Wedding gift (if not shipped)", category: "trip-specific", quantity: 1 },
    ],
  },
  {
    tripType: "wedding",
    gender: "female",
    label: "Wedding (Female Guest)",
    items: [
      { name: "Dress / outfit for ceremony", category: "clothing", quantity: 1 },
      { name: "Dress / outfit for rehearsal dinner", category: "clothing", quantity: 1 },
      { name: "Heels / dress shoes", category: "clothing", quantity: 1 },
      { name: "Clutch / evening bag", category: "clothing", quantity: 1 },
      { name: "Jewelry / accessories", category: "trip-specific", quantity: 1 },
      { name: "Shapewear", category: "clothing", quantity: 1 },
      { name: "Stain remover pen", category: "trip-specific", quantity: 1 },
      { name: "Fashion tape", category: "trip-specific", quantity: 1 },
      { name: "Extra earring backs", category: "trip-specific", quantity: 1 },
      { name: "Garment bag", category: "trip-specific", quantity: 1 },
      { name: "Lint roller", category: "trip-specific", quantity: 1 },
      { name: "Perfume", category: "toiletries", quantity: 1 },
      { name: "Curling iron / flat iron", category: "toiletries", quantity: 1 },
      { name: "Setting spray", category: "toiletries", quantity: 1 },
      { name: "Wedding card", category: "trip-specific", quantity: 1 },
      { name: "Wedding gift (if not shipped)", category: "trip-specific", quantity: 1 },
    ],
  },
  {
    tripType: "sporting-event",
    label: "Sporting Event",
    items: [
      { name: "Team gear / jersey", category: "clothing", quantity: 1 },
      { name: "Comfortable walking shoes", category: "clothing", quantity: 1 },
      { name: "Sunscreen (sport/sweatproof)", category: "toiletries", quantity: 1 },
      { name: "Poncho / rain gear", category: "clothing", quantity: 1 },
      { name: "Portable phone charger", category: "electronics", quantity: 1 },
      { name: "Cash for vendors", category: "documents", quantity: 1 },
      { name: "Earplugs", category: "trip-specific", quantity: 1 },
      { name: "Binoculars", category: "trip-specific", quantity: 1 },
      { name: "Clear bag (stadium policy)", category: "trip-specific", quantity: 1 },
      { name: "Seat cushion", category: "trip-specific", quantity: 1 },
      { name: "Hand warmers", category: "trip-specific", quantity: 2 },
      { name: "Foam finger / rally towel", category: "trip-specific", quantity: 1 },
    ],
  },
  {
    tripType: "general",
    label: "General Trip",
    items: [], // no additional items beyond base
  },
];

export function getTemplate(
  tripType: TripType,
  gender: Gender
): TripTemplate {
  // Try to find gender-specific template first
  const specific = tripTemplates.find(
    (t) => t.tripType === tripType && t.gender === gender
  );
  if (specific) return specific;

  // Fall back to gender-agnostic template
  const generic = tripTemplates.find(
    (t) => t.tripType === tripType && !t.gender
  );
  if (generic) return generic;

  // Final fallback to general
  return tripTemplates.find((t) => t.tripType === "general")!;
}
