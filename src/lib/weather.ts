import type { WeatherSummary } from "../types";

const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";
const ARCHIVE_URL = "https://archive-api.open-meteo.com/v1/archive";

export async function geocodeCity(
  city: string
): Promise<{ lat: number; lng: number; name: string } | null> {
  try {
    const url = `${GEOCODING_URL}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
    const res = await fetch(url);
    if (!res.ok) return null;

    const data = await res.json();
    if (!data.results || data.results.length === 0) return null;

    const result = data.results[0];
    return {
      lat: result.latitude,
      lng: result.longitude,
      name: result.name,
    };
  } catch {
    return null;
  }
}

export async function getWeather(
  lat: number,
  lng: number,
  startDate: string,
  endDate: string
): Promise<WeatherSummary | null> {
  try {
    const now = new Date();
    const tripStart = new Date(startDate);
    const daysUntilTrip = Math.floor(
      (tripStart.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysUntilTrip <= 14) {
      return await fetchForecast(lat, lng, startDate, endDate);
    } else {
      return await fetchHistorical(lat, lng, startDate, endDate);
    }
  } catch {
    return null;
  }
}

export async function getWeatherForTrip(
  destination: string,
  startDate: string,
  endDate: string
): Promise<WeatherSummary | null> {
  try {
    const location = await geocodeCity(destination);
    if (!location) return null;

    return await getWeather(location.lat, location.lng, startDate, endDate);
  } catch {
    return null;
  }
}

async function fetchForecast(
  lat: number,
  lng: number,
  startDate: string,
  endDate: string
): Promise<WeatherSummary | null> {
  const url = `${FORECAST_URL}?latitude=${lat}&longitude=${lng}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&temperature_unit=fahrenheit&start_date=${startDate}&end_date=${endDate}`;
  const res = await fetch(url);
  if (!res.ok) return null;

  const data = await res.json();
  const daily = data.daily;
  if (!daily) return null;

  const highs: number[] = daily.temperature_2m_max;
  const lows: number[] = daily.temperature_2m_min;
  const rainChances: number[] = daily.precipitation_probability_max;

  const avgHigh = average(highs);
  const avgLow = average(lows);
  const rainChance = average(rainChances);

  return {
    avgHigh: Math.round(avgHigh),
    avgLow: Math.round(avgLow),
    rainChance: Math.round(rainChance),
    description: generateDescription(avgHigh, rainChance),
  };
}

async function fetchHistorical(
  lat: number,
  lng: number,
  startDate: string,
  endDate: string
): Promise<WeatherSummary | null> {
  const lastYearStart = shiftYear(startDate, -1);
  const lastYearEnd = shiftYear(endDate, -1);

  const url = `${ARCHIVE_URL}?latitude=${lat}&longitude=${lng}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&temperature_unit=fahrenheit&start_date=${lastYearStart}&end_date=${lastYearEnd}`;
  const res = await fetch(url);
  if (!res.ok) return null;

  const data = await res.json();
  const daily = data.daily;
  if (!daily) return null;

  const highs: number[] = daily.temperature_2m_max;
  const lows: number[] = daily.temperature_2m_min;
  const precipSums: number[] = daily.precipitation_sum;

  const avgHigh = average(highs);
  const avgLow = average(lows);

  const rainyDays = precipSums.filter((p) => p > 0.1).length;
  const rainChance = (rainyDays / precipSums.length) * 100;

  return {
    avgHigh: Math.round(avgHigh),
    avgLow: Math.round(avgLow),
    rainChance: Math.round(rainChance),
    description: generateDescription(avgHigh, rainChance),
  };
}

function average(nums: number[]): number {
  if (nums.length === 0) return 0;
  return nums.reduce((sum, n) => sum + n, 0) / nums.length;
}

function shiftYear(dateStr: string, offset: number): string {
  const date = new Date(dateStr);
  date.setFullYear(date.getFullYear() + offset);
  return date.toISOString().split("T")[0];
}

function generateDescription(avgHigh: number, rainChance: number): string {
  const isHot = avgHigh >= 85;
  const isWarm = avgHigh >= 70;
  const isMild = avgHigh >= 55;
  const isCold = avgHigh < 55;

  const isRainy = rainChance >= 50;
  const isSomeRain = rainChance >= 25;

  if (isHot && isRainy) return "Hot with frequent rain";
  if (isHot && isSomeRain) return "Hot with some rain";
  if (isHot) return "Hot and sunny";

  if (isWarm && isRainy) return "Warm with frequent rain";
  if (isWarm && isSomeRain) return "Warm with some rain";
  if (isWarm) return "Warm and sunny";

  if (isMild && isRainy) return "Mild with frequent rain";
  if (isMild && isSomeRain) return "Mild with some rain";
  if (isMild) return "Mild temperatures";

  if (isCold && isRainy) return "Cold with rain";
  if (isCold && isSomeRain) return "Cold with some rain";
  return "Cold and dry";
}
