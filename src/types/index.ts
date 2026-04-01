export type TripType = "wedding" | "sporting-event" | "general";
export type Gender = "male" | "female" | "unspecified";
export type TravelMode = "flying" | "driving";
export type Accommodation = "hotel" | "airbnb";

export type ItemCategory =
  | "clothing"
  | "toiletries"
  | "electronics"
  | "documents"
  | "trip-specific"
  | "misc";

export interface TripInput {
  destination: string;
  startDate: string; // ISO date string
  endDate: string;
  tripType: TripType;
  gender: Gender;
  travelMode: TravelMode;
  accommodation: Accommodation;
}

export interface WeatherSummary {
  avgHigh: number; // Fahrenheit
  avgLow: number;
  rainChance: number; // 0-100
  description: string; // e.g. "Warm and sunny" or "Cold with rain"
}

export interface PackingItem {
  id: string;
  name: string;
  quantity: number;
  category: ItemCategory;
  checked: boolean;
  note?: string;
}

export interface PackingCategory {
  name: ItemCategory;
  label: string;
  items: PackingItem[];
}

export interface PackingList {
  tripInput: TripInput;
  weather: WeatherSummary | null;
  categories: PackingCategory[];
  createdAt: string;
}
