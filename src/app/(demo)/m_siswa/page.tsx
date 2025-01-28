"use client";
import { useState, useEffect } from "react";
import { Record, createColumns } from "./columns";
import { DataTable } from "./data-table";
import { Card } from "@/components/ui/card";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { AddDialog } from "./AddDialog";
import { toast } from "sonner"

interface TahunAjaran {
  value: string;
  label: string;
}

// Fetch records from API
async function fetchRecords(): Promise<Record[]> {
  const response = await fetch("/api/siswa");
  if (!response.ok) {
    throw new Error("Failed to fetch records");
  }
  return response.json();
}

// Fetch tahun ajaran from API
async function fetchTa(): Promise<TahunAjaran[]> {
  const response = await fetch("/api/tahun_ajaran");
  if (!response.ok) {
    throw new Error("Failed to fetch tahun ajaran");
  }
  return response.json();
}

export default function Page() {
  const [data, setData] = useState<Record[]>([]);
  const [tahunAjarans, setTahunAjarans] = useState<TahunAjaran[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<Record | null>(null);
  const [idEdit, setIdEdit] = useState<number | null>(null);

  useEffect(() => {
    // Fetch data dan tahun ajaran saat komponen di-mount
    fetchRecords().then(response => {
        setData(response.data); // Misalnya responsnya seperti { data: [...] }
      }).catch(console.error);
    fetchTa().then(response => {
      const ta = response.data.map((item) => {
        return {
          value : String(item.id),
          label : item.tahun_ajaran
        }
      })
      setTahunAjarans(ta); // Misalnya responsnya seperti { data: [...] }
    }).catch(console.error);
  }, []);

  const handleAddNewRecord = async (data: FormData) => {
    try {
        const response = await fetch('/api/siswa', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // Convert data to JSON string
        });

        if (!response.ok) {
            throw new Error('Failed to add record');
        }
        const newRecord: Record = await response.json();
    
        // Update recordsList untuk menambahkan record baru di paling atas
        setData((prevData) => [newRecord.data, ...prevData]);

         toast.success("Sukses", {
            description: "Data Berhasil disimpan!"
          })
    } catch (error) {
        console.error('Failed to add record:', error);
         toast.error("Gagal", {
            description: "Data Gagal disimpan!"
          })
    }
};


  const handleEditRecord = async (data: FormData) => {
    try {
      const response = await fetch(`/api/siswa/${idEdit}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update record');
      }

      const updatedRecord = await response.json(); // Ambil data record yang sudah diupdate

      // Update data di DataTable (misalnya recordsList)
      setData((prevData) =>
        prevData.map((item) =>
          item.id === updatedRecord.id ? { ...item, ...updatedRecord } : item
        )
      );

      toast.success("Sukses", {
        description: "Data Berhasil disimpan!",
      });
    } catch (error) {
      console.error('Failed to update record:', error);
      toast.error("Gagal", {
        description: "Data Gagal disimpan!",
      });
    }
  };


  const handleEdit = async (id: number) => {
    try {
      setIdEdit(id)
      const response = await fetch(`/api/siswa/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch record");
      }
      const record: Record = await response.json();
      setEditingRecord(record); // Simpan data record di state
      setIsDialogOpen(true); // Buka dialog
    } catch (error) {
      console.error("Error fetching record:", error);
    }
  };

  const handleDelete = async (id: number) => {
    // Hapus record berdasarkan ID
        try {
          const response = await fetch(`/api/siswa/${id}`, {
          method: 'DELETE',
          });

          if (!response.ok) {
          throw new Error('Failed to delete record');
          }

          setData((prevData) => prevData.filter((item) => item.id !== id));
          
            toast.success("Sukses", {
              description: "Data Berhasil dihapus!"
            })
      } catch (error) {
          console.error('Failed to delete record:', error);
            toast.error("Gagal", {
            description: "Data Gagal dihapus!"
          })
      }
  };


  const columns = createColumns(handleEdit, handleDelete);

  return (
    <ContentLayout title="Siswa">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Siswa</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="mt-5">
        <main className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4 p-5">
            <Button
              onClick={() => {
                setIsDialogOpen(true);
                setEditingRecord(null); // Kosongkan initialData untuk mode add
              }}
              variant="default"
            >
              Add New Record
            </Button>
          </div>
          <DataTable columns={columns} data={data} />
        </main>
      </Card>

      <AddDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditingRecord(null);
        }}
        onSave={editingRecord ? handleEditRecord : handleAddNewRecord}
        initialData={editingRecord}
        isEdit={!!editingRecord}
        tahun_ajarans={tahunAjarans} // Oper daftar tahun ajaran ke dialog
      />
    </ContentLayout>
  );
}
