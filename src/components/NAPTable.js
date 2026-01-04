"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
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
    cell: ({ row }) => (
      <span className="font-mono text-gray-400">
        {row.getValue("nvId")}
      </span>
    ),
  },
  {
    accessorKey: "rollNo",
    header: "Roll Number",
    cell: ({ row }) => (
      <span className="font-mono text-gray-500">
        {row.getValue("rollNo")}
      </span>
    ),
  },
  {
    accessorKey: "unit",
    header: "Unit",
    cell: ({ row }) => (
      <span className="text-blue-400 text-xs font-bold uppercase">
        {row.getValue("unit")}
      </span>
    ),
  },
  {
    accessorKey: "napPoints",
    header: () => (
      <div className="text-right pr-2">NAP Points</div>
    ),
    cell: ({ row }) => (
      <div className="text-right pr-2 font-black text-xl text-blue-500">
        {row.getValue("napPoints")}
      </div>
    ),
  },
]

export function VolunteerNAPTable({ searchValue }) {
  const [sorting, setSorting] = React.useState([
    { id: "napPoints", desc: true },
  ])
  const [volunteers, setVolunteers] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const loadExcelData = async () => {
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

      setVolunteers(transformed)
      setIsLoading(false)
    }

    loadExcelData()
  }, [])

  const filteredData = React.useMemo(() => {
    if (!searchValue) return volunteers
    const q = searchValue.toLowerCase()
    return volunteers.filter(
      (v) =>
        v.nvId.toLowerCase().includes(q) ||
        v.rollNo.toLowerCase().includes(q)
    )
  }, [searchValue, volunteers])

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="relative max-w-7xl mx-auto px-6 pt-2 pb-20">
      <Table className="bg-transparent">
        <TableHeader className="bg-black sticky top-0 z-10">
          {table.getHeaderGroups().map((hg) => (
            <TableRow
              key={hg.id}
              className="border-b-2 border-gray-700"
            >
              {hg.headers.map((h) => (
                <TableHead
                  key={h.id}
                  className="bg-black text-gray-300 uppercase text-xs tracking-[0.25em] font-extrabold py-4"
                >
                  {flexRender(
                    h.column.columnDef.header,
                    h.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-center text-gray-600 py-20"
              >
                Loading…
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="border-b border-gray-900"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="py-5">
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-center text-red-500 py-20"
              >
                No matching record
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
