"use client";

import { useState, useEffect } from "react";
import { Payment, createColumns } from "./columns";
import { DataTable } from "./data-table";
import { Card } from "@/components/ui/card";
import { ContentLayout } from '@/components/admin-panel/content-layout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';

async function fetchData(): Promise<Payment[]> {
  // Fetch data from API (disimulasikan dengan data statis di sini)
  return [
    { id: "728ed52f", amount: 100, status: "pending", email: "m@example.com" },
    { id: "9f3d48a2", amount: 200, status: "success", email: "a@example.com" },
    { id: "1c67b90d", amount: 150, status: "failed", email: "b@example.com" },
    // ...data lainnya
  ];
}

export default function DemoPage() {
  const [data, setData] = useState<Payment[]>([]);

  useEffect(() => {
    // Fetch data saat komponen di-mount
    fetchData().then((fetchedData) => setData(fetchedData));
  }, []);

  const handleInsert = () => {
    const newData: Payment = {
      id: Math.random().toString(16).slice(2),
      amount: 500,
      status: "success",
      email: "new@example.com",
    };

    // Tambahkan data baru
    setData((prevData) => [newData, ...prevData]);
  };

  const handleEdit = (id: string, updatedFields: Partial<Payment>) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, ...updatedFields } : item
      )
    );
  };

  const handleDelete = (id: string) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };
  const columns = createColumns(handleEdit, handleDelete);
  return (
    <ContentLayout title="Karya Ilmiah">
       <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Karya Ilmiah</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className='mt-5'>
    <main className="container mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Data Table</h1>
      <button
        onClick={handleInsert}
        className="mb-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Add New Data
      </button>
      <DataTable columns={columns} data={data} />
    </main>
    </Card>
    </ContentLayout>
  );
}
