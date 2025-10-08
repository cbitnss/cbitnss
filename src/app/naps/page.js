"use client";

import React, { useState } from "react";
import { VolunteerNAPTable } from "@/components/NAPTable";
import dynamic from "next/dynamic";

// Dynamically import barcode scanner to avoid SSR issues
const BarcodeScannerComponent = dynamic(
  () => import("@/components/BarcodeScanner"),
  { ssr: false }
);

export default function NapsPage() {
  const [showScanner, setShowScanner] = useState(false);

  return (
    <div className="min-h-screen bg-white relative pt-4">
      {/* Scanner Button (red) */}
      <div className="flex justify-end mr-6 mb-4">
        <button
          className="px-4 py-2 bg-red-600 text-white rounded shadow hover:bg-red-700 transition"
          onClick={() => setShowScanner((prev) => !prev)}
        >
          Scanner
        </button>
      </div>

      {/* Barcode Scanner Popup */}
      {showScanner && (
        <div className="absolute top-20 right-6 z-[9999] bg-white rounded shadow-lg p-4 border border-gray-200">
          <BarcodeScannerComponent />
        </div>
      )}

      {/* Main Table */}
      <VolunteerNAPTable />
    </div>
  );
}
