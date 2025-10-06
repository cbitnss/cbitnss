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
    <div className="min-h-screen bg-white relative">
      <div className="absolute top-6 right-6 z-20">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
          onClick={() => setShowScanner((prev) => !prev)}
        >
          Scanner
        </button>
      </div>
      {showScanner && (
        <div className="absolute top-20 right-6 z-30 bg-white rounded shadow-lg p-4">
          <BarcodeScannerComponent />
        </div>
      )}
      <VolunteerNAPTable />
    </div>
  );
}
