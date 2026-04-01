"use client";

import { useState, useRef, useEffect } from "react";
import type { PackingItem as PackingItemType } from "@/types";

interface PackingItemProps {
  item: PackingItemType;
  onToggle: (id: string) => void;
  onUpdateName: (id: string, name: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onDelete: (id: string) => void;
}

export default function PackingItem({
  item,
  onToggle,
  onUpdateName,
  onUpdateQuantity,
  onDelete,
}: PackingItemProps) {
  const [editing, setEditing] = useState(item.name === "");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  function handleNameBlur() {
    setEditing(false);
    if (!item.name.trim()) {
      onDelete(item.id);
    }
  }

  function handleNameKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      setEditing(false);
      if (!item.name.trim()) {
        onDelete(item.id);
      }
    }
    if (e.key === "Escape") {
      setEditing(false);
    }
  }

  return (
    <div
      className={`notepad-line flex items-center gap-2 py-2 px-3 group ${
        item.checked ? "item-checked" : ""
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(item.id)}
        className="flex-shrink-0 w-5 h-5 border-2 border-stone-400 rounded flex items-center justify-center hover:border-amber-500 transition-colors"
        aria-label={item.checked ? "Uncheck item" : "Check item"}
      >
        {item.checked && (
          <svg
            className="w-3 h-3 text-amber-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </button>

      {/* Item name */}
      {editing ? (
        <input
          ref={inputRef}
          type="text"
          value={item.name}
          onChange={(e) => onUpdateName(item.id, e.target.value)}
          onBlur={handleNameBlur}
          onKeyDown={handleNameKeyDown}
          placeholder="Item name..."
          className="editable-field flex-1 px-1 py-0.5 text-sm bg-transparent border-none"
        />
      ) : (
        <button
          onClick={() => !item.checked && setEditing(true)}
          className="flex-1 text-left text-sm cursor-text hover:bg-amber-50 rounded px-1 py-0.5 transition-colors"
        >
          {item.name || "Click to name this item..."}
        </button>
      )}

      {/* Quantity controls */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="w-6 h-6 text-xs font-bold text-stone-500 hover:text-amber-600 hover:bg-amber-50 rounded transition-colors"
          aria-label="Decrease quantity"
        >
          -
        </button>
        <span className="w-6 text-center text-sm font-medium text-stone-600">
          {item.quantity}
        </span>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="w-6 h-6 text-xs font-bold text-stone-500 hover:text-amber-600 hover:bg-amber-50 rounded transition-colors"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      {/* Delete button */}
      <button
        onClick={() => onDelete(item.id)}
        className="flex-shrink-0 w-6 h-6 text-stone-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all rounded"
        aria-label="Delete item"
      >
        <svg className="w-4 h-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
