"use client";

import type { PackingList as PackingListType, ItemCategory } from "@/types";
import PackingCategory from "./PackingCategory";

interface PackingListProps {
  list: PackingListType;
  onToggle: (id: string) => void;
  onUpdateName: (id: string, name: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onDelete: (id: string) => void;
  onAddItem: (category: ItemCategory) => void;
  onClear: () => void;
}

export default function PackingList({
  list,
  onToggle,
  onUpdateName,
  onUpdateQuantity,
  onDelete,
  onAddItem,
  onClear,
}: PackingListProps) {
  const totalItems = list.categories.reduce(
    (sum, cat) => sum + cat.items.length,
    0
  );
  const checkedItems = list.categories.reduce(
    (sum, cat) => sum + cat.items.filter((i) => i.checked).length,
    0
  );
  const progress =
    totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* Header with progress */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-stone-700">
            Your Packing List
          </h2>
          {list.weather && (
            <p className="text-sm text-stone-500 mt-1">
              {list.tripInput.destination && `${list.tripInput.destination} -- `}
              {list.weather.description} (High: {list.weather.avgHigh}F, Low:{" "}
              {list.weather.avgLow}F)
            </p>
          )}
        </div>
        <button
          onClick={onClear}
          className="text-sm text-stone-400 hover:text-red-500 transition-colors"
        >
          Start over
        </button>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-stone-200 rounded-full h-2">
        <div
          className="bg-amber-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-stone-500 text-right">
        {checkedItems} of {totalItems} items packed ({progress}%)
      </p>

      {/* Categories */}
      <div className="space-y-4">
        {list.categories.map((category) => (
          <PackingCategory
            key={category.name}
            category={category}
            onToggle={onToggle}
            onUpdateName={onUpdateName}
            onUpdateQuantity={onUpdateQuantity}
            onDelete={onDelete}
            onAddItem={onAddItem}
          />
        ))}
      </div>
    </div>
  );
}
