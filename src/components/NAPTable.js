"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table"
import * as XLSX from "xlsx"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const columns = [
  { 
    accessorKey: "nvId", 
    header: "NV ID",
    cell: ({ row }) => <span className="font-mono text-gray-500">{row.getValue("nvId")}</span>
  },
  { 
    accessorKey: "rollNo", 
    header: "Roll Number",
    cell: ({ row }) => <span className="font-mono text-gray-400">{row.getValue("rollNo")}</span>
  },
  { 
    accessorKey: "unit", 
    header: "Unit",
    cell: ({ row }) => (
      <span className="inline-flex items-center px-3 py-1 text-xs font-bold text-blue-400 bg-blue-900/10 border border-blue-900/30 rounded-full">
        {row.getValue("unit")}
      </span>
    )
  },
  {
    accessorKey: "napPoints",
    header: "NAP Points",
    cell: ({ row }) => {
      const points = parseFloat(row.getValue("napPoints"));
      return (
        <div className="text-right font-black text-xl">
          <span className={points > 0 ? "text-blue-500" : "text-gray-700"}>
            {points}
          </span>
        </div>
      )
    },
  },
]

export function VolunteerNAPTable() {
  const [sorting, setSorting] = React.useState([{ id: "napPoints", desc: true }])
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [visibleCount, setVisibleCount] = React.useState(15)
  const [volunteers, setVolunteers] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const loadExcelData = async () => {
      try {
        const response = await fetch("/NAPs.xlsx")
        const arrayBuffer = await response.arrayBuffer()
        const workbook = XLSX.read(arrayBuffer, { type: "array" })
        const worksheet = workbook.Sheets[workbook.SheetNames[0]]
        const jsonData = XLSX.utils.sheet_to_json(worksheet)

        const transformed = jsonData
          .map((row) => ({
            nvId: row["Volunteer ID"] || "N/A",
            rollNo: row["Roll Number"] || "Unknown",
            unit: row["Unit"] || "-",
            napPoints: Number(row["Total NAPs"] || 0),
          }))
          .sort((a, b) => b.napPoints - a.napPoints)

        setVolunteers(transformed)
      } catch (error) {
        console.error("Error loading Excel file:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadExcelData()
  }, [])

  const table = useReactTable({
    data: volunteers,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  const rows = table.getRowModel().rows.slice(0, visibleCount)

  return (
    // 1. Force Black Background on the entire page container
    <div className="min-h-screen w-full bg-black text-white font-sans">
      <div className="container max-w-7xl mx-auto px-4 py-24">
        
        {/* Header - Text only, no boxes */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-2">
              Volunteer <span className="text-blue-600">Leaderboard</span>
            </h1>
            <p className="text-gray-500 text-lg">
              Tracking the dedication of our NSS volunteers.
            </p>
          </div>
          
          {/* Search - Transparent input */}
          <div className="w-full md:w-auto">
            <input
              placeholder="Search ID or Roll..."
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="w-full md:w-80 bg-transparent border-b border-gray-800 text-white px-0 py-2 text-lg focus:outline-none focus:border-blue-500 placeholder:text-gray-700 transition-colors font-medium"
            />
          </div>
        </div>

        {/* Table - TRANSPARENT. No cards. No white bg. */}
        <div className="w-full">
          <Table className="bg-transparent">
            <TableHeader className="bg-transparent border-b border-gray-800">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="border-none hover:bg-transparent">
                  {headerGroup.headers.map((header) => {
                    const isSorted = header.column.getIsSorted()
                    return (
                      <TableHead key={header.id} className="text-gray-500 font-bold uppercase text-xs tracking-widest py-4 px-2 bg-transparent">
                        <button
                          className="flex items-center gap-2 hover:text-white transition-colors uppercase"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          <span className={`text-blue-500 text-[10px] transition-opacity ${isSorted ? 'opacity-100' : 'opacity-0'}`}>
                            {isSorted === "asc" ? "▲" : "▼"}
                          </span>
                        </button>
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            
            <TableBody className="bg-transparent">
              {isLoading ? (
                <TableRow className="border-none hover:bg-transparent">
                  <TableCell colSpan={columns.length} className="h-32 text-center text-gray-600">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : rows.length > 0 ? (
                rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="border-b border-gray-900 hover:bg-blue-900/5 transition-colors bg-transparent"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-5 px-2 text-gray-300">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow className="border-none hover:bg-transparent">
                  <TableCell colSpan={columns.length} className="h-32 text-center text-gray-600">
                    No volunteers found.
                  </TableCell>
                </TableRow>
              )}

              {/* Load More - Minimal Button */}
              {visibleCount < table.getFilteredRowModel().rows.length && (
                <TableRow className="border-none hover:bg-transparent">
                  <TableCell colSpan={columns.length} className="pt-8 text-center">
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 20)}
                      className="px-6 py-2 text-xs font-bold tracking-[0.2em] uppercase text-gray-500 hover:text-blue-500 transition-colors"
                    >
                      Load More
                    </button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}