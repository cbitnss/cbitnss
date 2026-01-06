"use client"

import * as React from "react"
import * as XLSX from "xlsx"

export function TopVolunteers() {
  const [topVolunteers, setTopVolunteers] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const loadTopVolunteers = async () => {
      try {
        const res = await fetch("/NAPs.xlsx")
        const buf = await res.arrayBuffer()
        const wb = XLSX.read(buf, { type: "array" })
        const ws = wb.Sheets[wb.SheetNames[0]]
        const data = XLSX.utils.sheet_to_json(ws)

        const transformed = data
          .map((row) => ({
            nvId: String(row["Volunteer ID"] || "").trim(),
            rollNo: String(row["Roll Number"] || ""),
            unit: row["Unit"] || "-",
            napPoints: Number(row["Total NAPs"] || 0),
          }))
          .sort((a, b) => b.napPoints - a.napPoints)
          .slice(0, 5)

        setTopVolunteers(transformed)
        setIsLoading(false)
      } catch (error) {
        console.error("Error loading volunteers:", error)
        setIsLoading(false)
      }
    }

    loadTopVolunteers()
  }, [])

  if (isLoading) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500 text-sm">Loading top volunteers...</p>
      </div>
    )
  }

  if (topVolunteers.length === 0) {
    return null
  }

  // Arrange volunteers in podium order: [4th, 2nd, 1st, 3rd, 5th]
  const podiumOrder = topVolunteers.length >= 5 
    ? [topVolunteers[3], topVolunteers[1], topVolunteers[0], topVolunteers[2], topVolunteers[4]]
    : topVolunteers

  const podiumHeights = ["h-32", "h-40", "h-48", "h-40", "h-32"]
  const positions = ["4", "2", "1", "3", "5"]
  const podiumColors = [
    "bg-gradient-to-b from-gray-700 to-gray-800",
    "bg-gradient-to-b from-gray-300 to-gray-400",
    "bg-gradient-to-b from-yellow-400 to-yellow-500",
    "bg-gradient-to-b from-orange-600 to-orange-700",
    "bg-gradient-to-b from-gray-700 to-gray-800"
  ]

  return (
    <section className="relative py-10 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Header - Compact */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 px-4 py-1.5 rounded-full mb-3">
            <span className="text-yellow-400 font-bold text-xs uppercase tracking-widest">
              ⭐ {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-1 uppercase tracking-tight">
            Top 5 Volunteers
          </h2>
          <p className="text-base md:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 uppercase tracking-wide">
            Of The Month
          </p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full mt-3" />
        </div>

        {/* Podium Display - Compact */}
        <div className="flex items-end justify-center gap-1 md:gap-2 max-w-5xl mx-auto">
          {podiumOrder.map((volunteer, idx) => {
            const position = positions[idx]
            const isFirst = position === "1"
            const isSecond = position === "2"
            const isThird = position === "3"
            
            return (
              <div
                key={volunteer.nvId}
                className="flex flex-col items-center flex-1 max-w-[140px]"
              >
                {/* Avatar placeholder with crown for winner */}
                <div className="relative mb-2 group">
                  {isFirst && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-2xl animate-bounce">
                      👑
                    </div>
                  )}
                  <div
                    className={`relative rounded-full overflow-hidden transition-all duration-300 group-hover:scale-105 ${
                      isFirst
                        ? "w-16 h-16 md:w-20 md:h-20 border-3 border-yellow-400 shadow-xl shadow-yellow-400/50 ring-3 ring-yellow-400/20"
                        : isSecond
                        ? "w-14 h-14 md:w-16 md:h-16 border-3 border-gray-300 shadow-lg shadow-gray-300/30"
                        : isThird
                        ? "w-14 h-14 md:w-16 md:h-16 border-3 border-orange-600 shadow-lg shadow-orange-600/30"
                        : "w-12 h-12 md:w-14 md:h-14 border-2 border-gray-600"
                    }`}
                  >
                    <div className={`absolute inset-0 flex items-center justify-center text-2xl md:text-3xl ${
                      isFirst ? "bg-gradient-to-br from-yellow-300 to-yellow-600" :
                      isSecond ? "bg-gradient-to-br from-gray-200 to-gray-400" :
                      isThird ? "bg-gradient-to-br from-orange-400 to-orange-700" :
                      "bg-gradient-to-br from-gray-700 to-gray-900"
                    }`}>
                      👤
                    </div>
                  </div>
                  
                  {/* Position Badge */}
                  <div
                    className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center font-black text-sm border-3 border-black ${
                      isFirst
                        ? "bg-gradient-to-br from-yellow-300 to-yellow-600 text-black shadow-lg shadow-yellow-400/50"
                        : isSecond
                        ? "bg-gradient-to-br from-gray-200 to-gray-400 text-black shadow-lg shadow-gray-300/50"
                        : isThird
                        ? "bg-gradient-to-br from-orange-500 to-orange-700 text-white shadow-lg shadow-orange-500/50"
                        : "bg-gray-800 text-gray-400 shadow-lg"
                    }`}
                  >
                    {position}
                  </div>
                </div>

                {/* Podium */}
                <div
                  className={`w-full ${podiumHeights[idx]} ${podiumColors[idx]} rounded-t-lg flex flex-col items-center justify-start pt-4 px-2 transition-all duration-300 hover:brightness-110 relative overflow-hidden`}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent" />
                  
                  <div className="relative z-10 w-full text-center">
                    <p
                      className={`font-bold text-[10px] md:text-xs ${
                        isFirst || isSecond ? "text-black" : "text-white"
                      }`}
                    >
                      {volunteer.nvId}
                    </p>
                    <p
                      className={`text-[8px] md:text-[10px] ${
                        isFirst || isSecond ? "text-gray-800" : "text-gray-400"
                      }`}
                    >
                      {volunteer.unit}
                    </p>
                    <div
                      className={`text-xl md:text-2xl font-black ${
                        isFirst ? "text-black" : 
                        isSecond ? "text-gray-900" :
                        isThird ? "text-yellow-300" : "text-yellow-400"
                      }`}
                    >
                      {volunteer.napPoints}
                    </div>
                    <p
                      className={`text-[8px] md:text-[10px] uppercase tracking-wider font-bold ${
                        isFirst || isSecond ? "text-gray-800" : "text-gray-400"
                      }`}
                    >
                      NAPs
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Achievement message - Compact */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-xs md:text-sm">
            🎉 Congratulations to our outstanding volunteers! 🎉
          </p>
        </div>
      </div>
    </section>
  )
}
