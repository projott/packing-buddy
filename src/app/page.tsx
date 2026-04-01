"use client";

import { useState } from "react";
import type { TripInput } from "@/types";
import { generatePackingList } from "@/lib/packing-engine";
import { getWeatherForTrip } from "@/lib/weather";
import { usePackingList } from "@/hooks/usePackingList";
import TripForm from "@/components/TripForm";
import PackingList from "@/components/PackingList";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const {
    packingList,
    loaded,
    setList,
    toggleItem,
    updateItemName,
    updateItemQuantity,
    deleteItem,
    addItem,
    clearList,
  } = usePackingList();

  async function handleTripSubmit(input: TripInput) {
    setLoading(true);
    try {
      // Fetch weather if destination is provided
      let weather = null;
      if (input.destination.trim()) {
        weather = await getWeatherForTrip(
          input.destination,
          input.startDate,
          input.endDate
        );
      }

      const list = generatePackingList(input, weather);
      setList(list);
    } catch {
      // Generate list without weather on any error
      const list = generatePackingList(input, null);
      setList(list);
    } finally {
      setLoading(false);
    }
  }

  // Don't render until localStorage has been checked
  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-stone-400">Loading...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-stone-800">Packing Buddy</h1>
          <p className="text-sm text-stone-500">
            Smart packing lists for every trip
          </p>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        {packingList ? (
          <PackingList
            list={packingList}
            onToggle={toggleItem}
            onUpdateName={updateItemName}
            onUpdateQuantity={updateItemQuantity}
            onDelete={deleteItem}
            onAddItem={addItem}
            onClear={clearList}
          />
        ) : (
          <TripForm onSubmit={handleTripSubmit} loading={loading} />
        )}
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-stone-200 py-4">
        <div className="max-w-2xl mx-auto px-4 text-center text-xs text-stone-400">
          Built by Projot
        </div>
      </footer>
    </main>
  );
}
