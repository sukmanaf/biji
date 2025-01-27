"use client";
import { useState, useEffect } from "react";
import { Record, createColumns } from "./columns";
import { DataTable } from "@/components/custom/data-table";
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
import { DateTime } from "luxon";
import { ViewDialog } from "./ViewDialog";
import { string } from "zod";

interface Tahun {
  value: string;
  label: string;
}

interface Bulan {
  value: string;
  label: string;
}

interface Siswa {
  value: string;
  label: string;
}



// Fetch records from API
async function fetchRecords(): Promise<Record[]> {
  const response = await fetch("/api/karya");
  if (!response.ok) {
    throw new Error("Failed to fetch records");
  }
  return response.json();
}


async function fetchSiswa(): Promise<Siswa[]> {
  const response = await fetch("/api/siswa");
  if (!response.ok) {
    throw new Error("Failed to fetch tahun ajaran");
  }
  return response.json();
}
async function fetchBulan(): Promise<Bulan[]> {
  const response = await fetch("/api/siswa/bulan");
  if (!response.ok) {
    throw new Error("Failed to fetch tahun ajaran");
  }
  return response.json();
}

async function generateTahun(count = 3) {
  const currentYear = DateTime.now().year; // Tahun ini
  return Array.from({ length: count }, (_, i) => {
    const year = currentYear - i; // Tahun sekarang dikurangi indeks
    return { value: String(year), label: String(year) };
  });
}

export default function Page() {
  const [data, setData] = useState<Record[]>([]);
  const [tahuns, setTahun] = useState<Tahun[]>([]);
  const [bulans, setBulans] = useState<Bulan[]>([]);
  const [siswas, setSiswas] = useState<Siswa[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<FormData | null>(null); 
  const [viewRecond, setViewRecord] = useState<DataView | null>(null); 
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [idEdit, setIdEdit] = useState<number | null>(null);

  useEffect(() => {
    // Fetch data dan tahun ajaran saat komponen di-mount
    fetchRecords().then(response => {
        setData(response.data); // Misalnya responsnya seperti { data: [...] }
      }).catch(console.error);
    fetchSiswa().then(response => {
      const sis = response.data.map((item) => {
        return {
          value : String(item.id),
          label : item.nama
        }
      })
      setSiswas(sis)
    }).catch(console.error);

    fetchBulan().then(setBulans).catch(console.error);
    generateTahun(3).then(setTahun).catch(console.error);
  }, []);

  const handleAddNewRecord = async (data: FormData) => {
    try {
        const response = await fetch('/api/karya', {
            method: 'POST',
            body: data, // Convert data to JSON string
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
      const response = await fetch(`/api/karya/${idEdit}`, {
        method: 'PUT',
        body: data,
      });

      if (!response.ok) {
        throw new Error('Failed to update record');
      }

      const updatedRecord = await response.json(); // Ambil data record yang sudah diupdate

      // Update data di DataTable (misalnya recordsList)
      setData((prevData) =>
        prevData.map((item) =>
          item.id === updatedRecord.data.id ? { ...item, ...updatedRecord.data } : item
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
      const response = await fetch(`/api/karya/${id}`);
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
          const response = await fetch(`/api/karya/${id}`, {
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

  const handleView = async (id: number) => {
    try {
      setIdEdit(id)
      const response = await fetch(`/api/karya/view/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch record");
      }
      const record: DataView = await response.json();
      setViewRecord(record); // Simpan data record di state
      setIsViewDialogOpen(true); // Buka dialog
    } catch (error) {
      console.error("Error fetching record:", error);
    }
  };

  const columns = createColumns(handleView,handleEdit, handleDelete);

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
        tahuns={tahuns} // Oper daftar tahun ajaran ke dialog
        bulans={bulans} // Oper daftar tahun ajaran ke dialog
        siswas={siswas} // Oper daftar tahun ajaran ke dialog
      />

      <ViewDialog
        isOpen={isViewDialogOpen}
        onClose={() => setIsViewDialogOpen(false)}
        record={viewRecond} // Pass record yang dipilih ke dialog
      />
    </ContentLayout>
  );
}
