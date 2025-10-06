"use client";
import React, { useState } from "react";
import { BarcodeScannerComponent } from "react-qr-barcode-scanner";

export default function BarcodeScanner() {
  const [data, setData] = useState("No result");

  return (
    <div style={{ background: "#fff", padding: "12px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
      <h4 style={{ marginBottom: "8px", fontWeight: "bold" }}>Barcode Scanner</h4>
      <BarcodeScannerComponent
        width={220}
        height={160}
        onUpdate={(err, result) => {
          if (result) setData(result.text);
        }}
      />
      <div style={{ marginTop: "8px", fontSize: "0.95em" }}>
        <strong>Result:</strong> {data}
      </div>
    </div>
  );
}