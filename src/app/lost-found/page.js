"use client";
import React, { useEffect, useState } from "react";
import LostFoundForm from "@/components/LostFoundForm";
import LostFoundList from "@/components/LostFoundList";

export default function LostFoundPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("lostFoundItems");
      if (raw) {
        const parsed = JSON.parse(raw);
        // If parsed is empty array, fall through to seed
        if (Array.isArray(parsed) && parsed.length > 0) {
          setItems(parsed);
          return;
        }
      }
      // Seed dummy data (one lost, one found) using /keys.png if nothing stored
      const seed = [
        {
          id: `lf_${Date.now()}_lost`,
          type: "lost",
          title: "Set of keys",
          description: "Blue keychain with 3 keys. Lost near library steps.",
          when: "2025-05-01 10:30",
          place: "Library steps",
          contactName: "Ravi",
          contactPhone: "9876543210",
          image: "/keys.png",
          createdAt: new Date().toISOString(),
          resolved: false,
        },
        {
          id: `lf_${Date.now()}_found`,
          type: "found",
          title: "Keys found",
          description: "Found keys with blue keychain. Picked up near canteen.",
          when: "2025-05-02 14:20",
          place: "Canteen",
          contactName: "Meera",
          contactPhone: "9123456780",
          image: "/keys.png",
          createdAt: new Date().toISOString(),
          resolved: false,
        },
      ];
      localStorage.setItem("lostFoundItems", JSON.stringify(seed));
      setItems(seed);
    } catch (e) {
      setItems([]);
    }
  }, []);

  const persist = (next) => {
    setItems(next);
    try {
      localStorage.setItem("lostFoundItems", JSON.stringify(next));
    } catch (e) {}
  };

  const handleAdd = (item) => {
    const next = [item, ...items];
    persist(next);
  };

  const handleResolve = (id) => {
    const next = items.filter((i) => i.id !== id);
    persist(next);
  };

  return (
    <main className="min-h-screen bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Lost & Found</h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Report an item</h2>
          <LostFoundForm onAdd={handleAdd} />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Recent reports</h2>
          <LostFoundList items={items} onResolve={handleResolve} />
        </section>
      </div>
    </main>
  );
}
