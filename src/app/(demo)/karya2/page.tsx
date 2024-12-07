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
import {ViewDialog} from './ViewDialog';
import { toast } from "sonner"

interface Siswa {
  value: string;
  label: string;
}

interface ViewRecord {
  siswa_id: string;
  tanggal: Date;
  a_agama: string;
  guru: string;
  semester: number;
  a_jati_diri: string;
  a_literasi: string;
  path_foto: string;
  kelompok : string;
  ta : string;
  nama : string;
  tanggal_text : string;
  logo:File
  darul_ulum:File
  bg_foto:File
  semester1:File
  semester2:File
}

// Fetch records from API
async function fetchRecords(): Promise<Record[]> {
  const response = await fetch("/api/karya");
  if (!response.ok) {
    throw new Error("Failed to fetch records");
  }
  return response.json();
}

// Fetch tahun ajaran from API
async function fetchSiswa(): Promise<Siswa[]> {
  const response = await fetch("/api/siswa/");
  if (!response.ok) {
    throw new Error("Failed to fetch tahun ajaran");
  }
  const data = await response.json()
  return  data.data.map((item) => ({
          value: String(item.id),
          label: item.nama,
        }));

}

export default function Page() {
  const [data, setData] = useState<Record[]>([]);
  const [siswa, setSiswa] = useState<Siswa[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<Record | null>(null);
  const [idEdit, setIdEdit] = useState<number | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [viewRecord, setViewRecord] = useState<ViewRecord | null>(null);

  useEffect(() => {
    // Fetch data dan tahun ajaran saat komponen di-mount
    fetchRecords().then(response => {
        setData(response.data); // Misalnya responsnya seperti { data: [...] }
      }).catch(console.error);
    fetchSiswa().then(setSiswa).catch(console.error);
    console.log(siswa);
    
  }, []);

  const handleAddNewRecord = async (formData: FormData) => {
    try {

      const response = await fetch('/api/karya', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add record');
      }

      const newRecord = await response.json();
      console.log('New Record:', newRecord);
      setData((prev) => [...prev, newRecord.data]); // Assuming setRecordsList is defined
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


 const handleEditRecord = async (formData: FormData) => {
    try {
      console.log('ini edit');
      
      const response = await fetch(`/api/karya/${idEdit}`, {
        method: 'PUT',
        body: formData,
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
      const response = await fetch(`/api/karya/print/${id}`);
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
  const handlePrint = async (id: number) => {
    try {
      setIdEdit(id)
      const response = await fetch(`/api/karya/print/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch record");
      }
      const record: ViewRecord = await response.json();
      setViewRecord(record); // Simpan data record di state
      setIsViewDialogOpen(true); // Buka dialog
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


  const columns = createColumns(handleEdit, handleDelete,handlePrint);

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
        siswas={siswa} // Oper daftar tahun ajaran ke dialog
      />

      <ViewDialog
        isOpen={isViewDialogOpen}
        onClose={() => setIsViewDialogOpen(false)}
        record={viewRecord} // Pass record yang dipilih ke dialog
      />
    </ContentLayout>
  );
}
