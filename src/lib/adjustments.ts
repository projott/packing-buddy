import type { WeatherSummary } from "@/types";
import type { BaseItem } from "@/data/base-items";

type WeatherCondition = "hot" | "cold" | "rainy";

export function getWeatherConditions(
  weather: WeatherSummary | null
): Set<WeatherCondition> {
  const conditions = new Set<WeatherCondition>();
  if (!weather) return conditions;

  if (weather.avgHigh > 80) conditions.add("hot");
  if (weather.avgLow < 50) conditions.add("cold");
  if (weather.rainChance > 40) conditions.add("rainy");

  return conditions;
}

export function scaleQuantity(item: BaseItem, days: number): number {
  if (!item.perDay) {
    // Special case: bottoms scale by days but aren't perDay
    const name = item.name.toLowerCase();
    if (name.includes("pants") || name.includes("bottoms")) {
      return Math.max(1, Math.ceil(days / 2.5));
    }
    return item.baseQuantity;
  }

  const name = item.name.toLowerCase();

  // Underwear: days + 2, minimum 3
  if (name.includes("underwear")) {
    return Math.max(3, days + 2);
  }

  // Socks: days + 1
  if (name.includes("sock")) {
    return days + 1;
  }

  // Tops: quantity = days
  return days;
}
