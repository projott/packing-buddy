"use client";

import type { PackingCategory as PackingCategoryType, ItemCategory } from "@/types";
import PackingItem from "./PackingItem";

interface PackingCategoryProps {
  category: PackingCategoryType;
  onToggle: (id: string) => void;
  onUpdateName: (id: string, name: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onDelete: (id: string) => void;
  onAddItem: (category: ItemCategory) => void;
}

export default function PackingCategory({
  category,
  onToggle,
  onUpdateName,
  onUpdateQuantity,
  onDelete,
  onAddItem,
}: PackingCategoryProps) {
  // Sort: unchecked items first, then checked items
  const sortedItems = [...category.items].sort((a, b) => {
    if (a.checked === b.checked) return 0;
    return a.checked ? 1 : -1;
  });

  const checkedCount = category.items.filter((i) => i.checked).length;
  const totalCount = category.items.length;

  return (
    <div className="notepad">
      {/* Category header */}
      <div className="flex items-center justify-between px-4 py-3 bg-stone-50 border-b border-stone-200 rounded-t-lg">
        <h3 className="text-sm font-semibold text-stone-700 uppercase tracking-wide">
          {category.label}
        </h3>
        <span className="text-xs text-stone-500">
          {checkedCount}/{totalCount}
        </span>
      </div>

      {/* Items */}
      <div>
        {sortedItems.map((item) => (
          <PackingItem
            key={item.id}
            item={item}
            onToggle={onToggle}
            onUpdateName={onUpdateName}
            onUpdateQuantity={onUpdateQuantity}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* Add item button */}
      <button
        onClick={() => onAddItem(category.name)}
        className="w-full py-2 px-4 text-sm text-stone-400 hover:text-amber-600 hover:bg-amber-50 transition-colors text-left rounded-b-lg"
      >
        + Add item
      </button>
    </div>
  );
}
