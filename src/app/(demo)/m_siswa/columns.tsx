"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Record = {
  id: number
  nama: string
  guru: string
  kelompok: string
  ta: string
}

export const createColumns = (
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
    accessorKey: "guru",
    header: "Guru",
  },
  {
    accessorKey: "kelompok",
    header: "Kelompok",
  },
  {
    accessorKey: "tahun_ajaran",
    header: "Tahun Ajaran",
  },
  {
    id: "actions", // Kolom untuk tombol aksi
    header: "Actions",
    cell: ({ row }: { row: { original: Record } }) => {
      const record = row.original; // Akses data baris
      return (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(record.id)}
            className="rounded bg-green-600 px-2 py-1 text-white hover:bg-green-700"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(record.id)}
            className="rounded bg-red-600 px-2 py-1 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      );
    },
  },
];