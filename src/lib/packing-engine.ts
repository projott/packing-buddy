import type {
  TripInput,
  WeatherSummary,
  PackingList,
  PackingItem,
  PackingCategory,
  ItemCategory,
} from "@/types";
import { baseItems, categoryLabels } from "@/data/base-items";
import type { BaseItem } from "@/data/base-items";
import { getTemplate } from "@/data/templates";
import { getWeatherConditions, scaleQuantity } from "./adjustments";

let idCounter = 0;

function generateId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  idCounter += 1;
  return `item-${idCounter}-${Date.now()}`;
}

function calculateDays(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffMs = end.getTime() - start.getTime();
  const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return Math.max(1, days);
}

function itemMatchesConditions(
  item: BaseItem,
  input: TripInput,
  weatherConditions: Set<"hot" | "cold" | "rainy">
): boolean {
  const cond = item.conditions;
  if (!cond) return true; // no conditions = always included

  // Each condition field is a gate -- if specified, it must match
  if (cond.weather && !weatherConditions.has(cond.weather)) return false;
  if (cond.travelMode && cond.travelMode !== input.travelMode) return false;
  if (cond.accommodation && cond.accommodation !== input.accommodation)
    return false;
  if (cond.gender && cond.gender !== input.gender) return false;

  return true;
}

export function generatePackingList(
  input: TripInput,
  weather: WeatherSummary | null
): PackingList {
  const days = calculateDays(input.startDate, input.endDate);
  const weatherConditions = getWeatherConditions(weather);

  // Step 1: Filter base items by conditions
  const filteredBase = baseItems.filter((item) =>
    itemMatchesConditions(item, input, weatherConditions)
  );

  // Step 2: Get template and its items
  const template = getTemplate(input.tripType, input.gender);
  const removalSet = new Set(
    (template.removals ?? []).map((name) => name.toLowerCase())
  );

  // Build a map of items keyed by lowercase name
  // Base items first, then template items override on name collision
  const itemMap = new Map<
    string,
    { name: string; category: ItemCategory; quantity: number }
  >();

  for (const item of filteredBase) {
    const key = item.name.toLowerCase();
    if (removalSet.has(key)) continue; // removed by template
    itemMap.set(key, {
      name: item.name,
      category: item.category,
      quantity: scaleQuantity(item, days),
    });
  }

  // Step 3: Apply template overlay -- template items override base items on collision
  for (const tItem of template.items) {
    const key = tItem.name.toLowerCase();
    itemMap.set(key, {
      name: tItem.name,
      category: tItem.category,
      quantity: tItem.quantity,
    });
  }

  // Step 4: Group into categories
  const categoryMap = new Map<ItemCategory, PackingItem[]>();

  for (const entry of Array.from(itemMap.values())) {
    const packingItem: PackingItem = {
      id: generateId(),
      name: entry.name,
      quantity: entry.quantity,
      category: entry.category,
      checked: false,
    };

    const existing = categoryMap.get(entry.category);
    if (existing) {
      existing.push(packingItem);
    } else {
      categoryMap.set(entry.category, [packingItem]);
    }
  }

  // Build categories array in a consistent order
  const categoryOrder: ItemCategory[] = [
    "clothing",
    "toiletries",
    "electronics",
    "documents",
    "trip-specific",
    "misc",
  ];

  const categories: PackingCategory[] = categoryOrder
    .filter((cat) => categoryMap.has(cat))
    .map((cat) => ({
      name: cat,
      label: categoryLabels[cat],
      items: categoryMap.get(cat)!,
    }));

  return {
    tripInput: input,
    weather,
    categories,
    createdAt: new Date().toISOString(),
  };
}
