"use client";

import { useState } from "react";
import type {
  TripInput,
  TripType,
  Gender,
  TravelMode,
  Accommodation,
} from "@/types";

interface TripFormProps {
  onSubmit: (input: TripInput) => void;
  loading?: boolean;
}

export default function TripForm({ onSubmit, loading }: TripFormProps) {
  const today = new Date().toISOString().split("T")[0];
  const defaultEnd = new Date(Date.now() + 3 * 86400000)
    .toISOString()
    .split("T")[0];

  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(defaultEnd);
  const [tripType, setTripType] = useState<TripType>("general");
  const [gender, setGender] = useState<Gender>("unspecified");
  const [travelMode, setTravelMode] = useState<TravelMode>("flying");
  const [accommodation, setAccommodation] = useState<Accommodation>("hotel");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      destination,
      startDate,
      endDate,
      tripType,
      gender,
      travelMode,
      accommodation,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="notepad p-6 space-y-5">
      <h2 className="text-xl font-semibold text-stone-700">
        Tell me about your trip
      </h2>

      {/* Destination */}
      <div>
        <label
          htmlFor="destination"
          className="block text-sm font-medium text-stone-600 mb-1"
        >
          Where are you going?
        </label>
        <input
          id="destination"
          type="text"
          placeholder="e.g. Austin, TX"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full px-3 py-2 border border-stone-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
        />
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-stone-600 mb-1"
          >
            Start date
          </label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-3 py-2 border border-stone-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          />
        </div>
        <div>
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-stone-600 mb-1"
          >
            End date
          </label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-3 py-2 border border-stone-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          />
        </div>
      </div>

      {/* Trip type */}
      <div>
        <label
          htmlFor="tripType"
          className="block text-sm font-medium text-stone-600 mb-1"
        >
          What kind of trip?
        </label>
        <select
          id="tripType"
          value={tripType}
          onChange={(e) => setTripType(e.target.value as TripType)}
          className="w-full px-3 py-2 border border-stone-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
        >
          <option value="general">General trip</option>
          <option value="wedding">Wedding</option>
          <option value="sporting-event">Sporting event</option>
        </select>
      </div>

      {/* Gender */}
      <div>
        <label
          htmlFor="gender"
          className="block text-sm font-medium text-stone-600 mb-1"
        >
          Packing for
        </label>
        <select
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value as Gender)}
          className="w-full px-3 py-2 border border-stone-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
        >
          <option value="unspecified">Anyone</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      {/* Travel mode toggle */}
      <div>
        <label className="block text-sm font-medium text-stone-600 mb-2">
          How are you getting there?
        </label>
        <div className="flex rounded-md overflow-hidden border border-stone-300">
          <button
            type="button"
            onClick={() => setTravelMode("flying")}
            className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
              travelMode === "flying"
                ? "bg-amber-500 text-white"
                : "bg-white text-stone-600 hover:bg-stone-50"
            }`}
          >
            Flying
          </button>
          <button
            type="button"
            onClick={() => setTravelMode("driving")}
            className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
              travelMode === "driving"
                ? "bg-amber-500 text-white"
                : "bg-white text-stone-600 hover:bg-stone-50"
            }`}
          >
            Driving
          </button>
        </div>
      </div>

      {/* Accommodation toggle */}
      <div>
        <label className="block text-sm font-medium text-stone-600 mb-2">
          Where are you staying?
        </label>
        <div className="flex rounded-md overflow-hidden border border-stone-300">
          <button
            type="button"
            onClick={() => setAccommodation("hotel")}
            className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
              accommodation === "hotel"
                ? "bg-amber-500 text-white"
                : "bg-white text-stone-600 hover:bg-stone-50"
            }`}
          >
            Hotel
          </button>
          <button
            type="button"
            onClick={() => setAccommodation("airbnb")}
            className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
              accommodation === "airbnb"
                ? "bg-amber-500 text-white"
                : "bg-white text-stone-600 hover:bg-stone-50"
            }`}
          >
            Airbnb
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-4 bg-amber-600 text-white font-medium rounded-md hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Building your packing list..." : "Build My Packing List"}
      </button>
    </form>
  );
}
