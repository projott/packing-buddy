"use client";

import { useState, useEffect, useCallback } from "react";
import type { PackingList, PackingItem, ItemCategory } from "@/types";

const STORAGE_KEY = "packing-buddy-list";

export function usePackingList() {
  const [packingList, setPackingList] = useState<PackingList | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setPackingList(JSON.parse(saved));
      }
    } catch {
      // ignore parse errors
    }
    setLoaded(true);
  }, []);

  // Save to localStorage whenever the list changes
  useEffect(() => {
    if (!loaded) return;
    if (packingList) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(packingList));
    }
  }, [packingList, loaded]);

  const setList = useCallback((list: PackingList) => {
    setPackingList(list);
  }, []);

  const toggleItem = useCallback((itemId: string) => {
    setPackingList((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        categories: prev.categories.map((cat) => ({
          ...cat,
          items: cat.items.map((item) =>
            item.id === itemId ? { ...item, checked: !item.checked } : item
          ),
        })),
      };
    });
  }, []);

  const updateItemName = useCallback((itemId: string, name: string) => {
    setPackingList((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        categories: prev.categories.map((cat) => ({
          ...cat,
          items: cat.items.map((item) =>
            item.id === itemId ? { ...item, name } : item
          ),
        })),
      };
    });
  }, []);

  const updateItemQuantity = useCallback(
    (itemId: string, quantity: number) => {
      setPackingList((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          categories: prev.categories.map((cat) => ({
            ...cat,
            items: cat.items.map((item) =>
              item.id === itemId
                ? { ...item, quantity: Math.max(0, quantity) }
                : item
            ),
          })),
        };
      });
    },
    []
  );

  const updateItemNote = useCallback((itemId: string, note: string) => {
    setPackingList((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        categories: prev.categories.map((cat) => ({
          ...cat,
          items: cat.items.map((item) =>
            item.id === itemId ? { ...item, note } : item
          ),
        })),
      };
    });
  }, []);

  const deleteItem = useCallback((itemId: string) => {
    setPackingList((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        categories: prev.categories
          .map((cat) => ({
            ...cat,
            items: cat.items.filter((item) => item.id !== itemId),
          }))
          .filter((cat) => cat.items.length > 0),
      };
    });
  }, []);

  const addItem = useCallback((category: ItemCategory) => {
    setPackingList((prev) => {
      if (!prev) return prev;
      const newItem: PackingItem = {
        id: crypto.randomUUID(),
        name: "",
        quantity: 1,
        category,
        checked: false,
      };
      return {
        ...prev,
        categories: prev.categories.map((cat) =>
          cat.name === category
            ? { ...cat, items: [...cat.items, newItem] }
            : cat
        ),
      };
    });
  }, []);

  const clearList = useCallback(() => {
    setPackingList(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    packingList,
    loaded,
    setList,
    toggleItem,
    updateItemName,
    updateItemQuantity,
    updateItemNote,
    deleteItem,
    addItem,
    clearList,
  };
}
