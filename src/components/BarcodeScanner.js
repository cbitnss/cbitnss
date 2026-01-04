"use client"

import BarcodeScannerComponent from "react-qr-barcode-scanner"

export default function BarcodeScanner({ onScan }) {
  return (
    <div className="bg-black border border-gray-800 rounded-lg p-3">
      <p className="text-xs text-gray-400 mb-2 font-semibold uppercase">
        Scan NV ID
      </p>

      <BarcodeScannerComponent
        width={240}
        height={180}
        onUpdate={(err, result) => {
          if (result?.text) {
            onScan(result.text.trim())
          }
        }}
      />
    </div>
  )
}
