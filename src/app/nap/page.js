"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { VolunteerNAPTable } from "@/components/NAPTable"

const BarcodeScanner = dynamic(
  () => import("@/components/BarcodeScanner"),
  { ssr: false }
)

export default function NapPage() {
  const [isMobile, setIsMobile] = useState(false)
  const [showScanner, setShowScanner] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const handleScan = (nvId) => {
    setSearchValue(nvId)
    setShowScanner(false)
  }

  return (
    <div className="relative">
      {/* HEADER + SEARCH */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-3">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
          Volunteer <span className="text-blue-600">Leaderboard</span>
        </h1>

        <p className="mt-1 text-gray-500 text-sm md:text-base">
          Tracking the dedication of our NSS volunteers.
        </p>

        {/* Instant Search */}
        <div className="mt-3">
          <input
            type="text"
            placeholder="Search by NV ID or Roll Number"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full sm:w-96 bg-transparent border-b border-gray-800 text-white px-0 py-2 text-base focus:outline-none focus:border-blue-500 placeholder:text-gray-600"
          />
        </div>
      </div>

      {/* Mobile Scanner */}
      {isMobile && (
        <button
          onClick={() => setShowScanner(true)}
          className="fixed bottom-6 right-6 z-50 bg-red-600 text-white px-5 py-3 text-sm font-bold rounded-full shadow-lg"
        >
          SCAN
        </button>
      )}

      {showScanner && (
        <div className="fixed bottom-20 right-6 z-[9999]">
          <BarcodeScanner onScan={handleScan} />
        </div>
      )}

      {/* TABLE */}
      <VolunteerNAPTable searchValue={searchValue} />
    </div>
  )
}
