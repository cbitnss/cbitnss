"use client";
import React from "react";

/**
 * Simple list renderer for lost & found items.
 * Props:
 *  - items: array of items
 *  - onResolve(id): called when an item is removed/resolved
 */
export default function LostFoundList({ items = [], onResolve }) {
  if (!items || items.length === 0) {
    return <div className="p-6 text-center text-gray-300">No reports yet.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((it) => (
        <div key={it.id} className="bg-white/6 rounded-lg p-4 shadow-md flex flex-col">
          <div className="h-40 w-full mb-3 rounded overflow-hidden bg-black/10 flex items-center justify-center">
            <img src={it.image || "/keys.jpg"} alt={it.title} className="object-cover w-full h-full" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1">{it.title}</h3>
            <p className="text-sm text-gray-200 mb-2">{it.description}</p>
            <p className="text-xs text-gray-300"><strong>{it.type === "lost" ? "Lost" : "Found"}</strong> • {it.when || "N/A"} • {it.place || "Unknown"}</p>
            <div className="mt-3 text-sm text-gray-200">
              <div><strong>Contact:</strong> {it.contactName || "—"}</div>
              <div><strong>Phone:</strong> {it.contactPhone || "—"}</div>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={() => navigator.clipboard?.writeText(`${it.contactName || ""} ${it.contactPhone || ""}`)} className="flex-1 px-3 py-2 rounded bg-white/5">Copy Contact</button>
            <button onClick={() => onResolve(it.id)} className="flex-1 px-3 py-2 rounded bg-red-600 text-white">Resolve</button>
          </div>
        </div>
      ))}
    </div>
  );
}
