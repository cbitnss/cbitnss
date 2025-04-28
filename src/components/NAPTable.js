"use client"

import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"

// Columns definition
const columns = [
  {
    accessorKey: "nvId",
    header: "NV ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "napPoints",
    header: "NAP Points",
    cell: ({ row }) => (
      <div className="text-right">{row.getValue("napPoints")}</div>
    ),
  },
]

// Generate 250 rows of mock data
const volunteers = Array.from({ length: 250 }, (_, i) => ({
  nvId: `NV${String(i + 1).padStart(3, "0")}`,
  name: `Volunteer ${i + 1}`,
  napPoints: Math.floor(Math.random() * 3000) + 500,
}))

export function VolunteerNAPTable() {
  const [sorting, setSorting] = React.useState([
    { id: "napPoints", desc: true },
  ])
  const [visibleCount, setVisibleCount] = React.useState(10)

  const table = useReactTable({
    data: volunteers, // pass all data here so sorting covers everything
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  })

  // Get sorted rows, but only render up to visibleCount
  const rows = table.getRowModel().rows.slice(0, visibleCount)

  return (
    <div className="w-full bg-white">
    <div className="container max-w-7xl mx-auto px-4 py-8 ">
      <h2 className="text-2xl font-bold mb-4">Volunteer NAP Points Ranking</h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {visibleCount < table.getRowModel().rows.length && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="cursor-pointer text-center font-semibold text-blue-500"
                  onClick={() => setVisibleCount((prev) => prev + 10)}
                >
                  Load 10 more...
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