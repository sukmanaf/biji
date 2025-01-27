"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Record = {
  id: number
  nama: number
  bulan: number
  tahun: number
}

export const createColumns = (
  handleView: (id: string) => void,
  handleEdit: (id: string) => void,
  handleDelete: (id: string) => void
): ColumnDef<Record>[] => [
 {
    id: "no",  // Menggunakan id 'no' untuk kolom nomor
    header: "No",
    cell: ({ row }: { row: { index: number } }) => {
      // index adalah posisi baris dalam data (dimulai dari 0)
      return <span>{row.index + 1}</span>;  // Menambahkan 1 agar nomor mulai dari 1
    },
  },
  {
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "bulan",
    header: "Bulan",
  },
  {
    accessorKey: "tahun",
    header: "Tahun",
  },
  {
    id: "actions", // Kolom untuk tombol aksi
    header: "Actions",
    cell: ({ row }: { row: { original: Record } }) => {
      const record = row.original; // Akses data baris
      return (
        <div className="flex gap-2">
          <Button
            onClick={() => handleView(record.id)}
            className="" variant="default"
          >
            View
          </Button>
          <Button
            onClick={() => handleEdit(record.id)}
            className="" variant="success"
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(record.id)}
            className="" variant="destructive"
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];