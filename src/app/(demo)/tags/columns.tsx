"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const createColumns = (
  handleEdit: (id: string,payment: Payment) => void,
  handleDelete: (id: string) => void
): ColumnDef<Payment>[] => [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    id: "actions", // Kolom untuk tombol aksi
    header: "Actions",
    cell: ({ row }: { row: { original: Payment } }) => {
      const payment = row.original; // Akses data baris
      return (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(payment)}
            className="rounded bg-green-600 px-2 py-1 text-white hover:bg-green-700"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(payment.id)}
            className="rounded bg-red-600 px-2 py-1 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      );
    },
  },
];