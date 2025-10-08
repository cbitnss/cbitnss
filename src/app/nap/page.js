
"use client";

import React, { useState, useEffect } from "react";
import { VolunteerNAPTable } from "@/components/NAPTable";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

// Example dataset with barcodes
const dataset = {
  "123456789": { name: "John Doe", email: "john@example.com" },
  "987654321": { name: "Jane Smith", email: "jane@example.com" },
};

export default function NapPage() {
  const [showScanner, setShowScanner] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearch = () => {
    const result = Object.values(dataset).find(
      (entry) =>
        entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResult(result || { error: "No matching record found" });
  };

  return (
    <div className="min-h-screen bg-white relative pt-4">
      {/* Scanner Button (red) - only on mobile */}
      {isMobile && (
        <div className="flex justify-end mr-6 mb-4">
          <button
            className="px-4 py-2 bg-red-600 text-white rounded shadow hover:bg-red-700 transition"
            onClick={() => setShowScanner((prev) => !prev)}
          >
            Scanner
          </button>
        </div>
      )}

      {/* Barcode Scanner Popup */}
      {showScanner && (
        <div className="absolute top-20 right-6 z-[9999] bg-white rounded shadow-lg p-4 border border-gray-200">
          <BarcodeScannerComponent
            onUpdate={(err, result) => {
              if (result) {
                const data = dataset[result.text];
                setScannedData(data || { error: "Barcode not found" });
                setShowScanner(false);
              }
            }}
            style={{ width: 300 }}
          />
        </div>
      )}

      {/* Display scanned data */}
      {scannedData && (
        <div className="p-4 bg-gray-100 rounded shadow m-6">
          {scannedData.error ? (
            <p className="text-red-500">{scannedData.error}</p>
          ) : (
            <>
              <p><strong>Name:</strong> {scannedData.name}</p>
              <p><strong>Email:</strong> {scannedData.email}</p>
            </>
          )}
        </div>
      )}

      {/* Search Bar */}
      <div className="flex items-center gap-2 px-6 mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {/* Main Table */}
      <VolunteerNAPTable />

      {/* Display search result */}
      {searchResult && (
        <div className="p-4 bg-gray-100 rounded shadow m-6">
          {searchResult.error ? (
            <p className="text-red-500">{searchResult.error}</p>
          ) : (
            <>
              <p><strong>Name:</strong> {searchResult.name}</p>
              <p><strong>Email:</strong> {searchResult.email}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
