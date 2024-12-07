'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { AddDialog } from './AddDialog';
import {ViewDialog} from './ViewDialog';
import PlaceholderContent from '@/components/demo/placeholder-content';
import { toast } from "sonner"

interface Record {
  id?: number;
  siswa_id: string;
  minggu_ke: number;
  semester: number;
  a_agama: string;
  a_jati_diri: string;
  a_literasi: string;
  path_foto1: File; 
  path_foto2: File; 
  path_foto3: File; 
  semester1: File; 
  semester2: File; 
  keterangan1: string;
  keterangan2: string;
  keterangan3: string;
  nama: string;
  kelompok: string;
  logo: File;
  darul_ulum: File;
  bg_foto: File;
}

interface Siswas {
  value: string;
  label: string;
}

interface RecordsClientProps {
  records: Record[];
  siswas: Siswas[];
}
export default function RecordsClient({ records: initialRecords,siswas }: RecordsClientProps) {
  const [recordsList, setRecordsList] = useState<Record[]>(initialRecords);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<Record | null>(null); // Track the record being edited
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const handleAddNewRecord = async (formData: FormData) => {
    try {
      console.log("Data being sent to API:", formData);

      const response = await fetch('/api/foto_berseri', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add record');
      }

      const newRecord = await response.json();
      setRecordsList((prev) => [...prev, newRecord.data]); // Assuming setRecordsList is defined
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
      const response = await fetch(`/api/foto_berseri/${editRecord?.id}`, {
        method: 'PUT',
        body: formData,
      });


      if (!response.ok) {
        throw new Error('Failed to update record');
      }

      const updatedRecord: Record = await response.json();
      setRecordsList(recordsList.map(record => (record.id === updatedRecord.id ? updatedRecord : record)));
      setEditRecord(null); // Reset after editing
      setIsDialogOpen(false);
       toast.success("Sukses", {
            description: "Data Berhasil disimpan!"
          })
    } catch (error) {
      console.error('Failed to update record:', error);
       toast.error("Gagal", {
            description: "Data gagal disimpan!"
          })
    }
  };

  const openEditDialog = (record: Record) => {
    
    setEditRecord(record); // Set the record to be edited
    setIsDialogOpen(true);
  };
  const handleOpenViewDialog = (record) => {
    setEditRecord(record); // Set the record to be edited
    setIsViewDialogOpen(true); // Buka dialog untuk melihat detail
  };
 const handleDeleteRecord = async (id: number) => {
        try {
            const response = await fetch(`/api/foto_berseri/${id}`, {
            method: 'DELETE',
            });

            if (!response.ok) {
            throw new Error('Failed to delete record');
            }

            setRecordsList(recordsList.filter(record => record.id !== id));
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
  return (
    <ContentLayout title="Foto Berseri">
       <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Foto Berseri</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className='mt-5'>
     
      <div className="flex justify-between items-center mb-4 p-5">
        <Button onClick={() => setIsDialogOpen(true)} variant="default">
          Add New Record
        </Button>
      </div>
      <div className='p-5'>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y">
            <thead className="">
              <tr>
                <th className="px-6 py-3 text-start">No</th>
                <th className="px-6 py-3 text-start">Nama</th>
                <th className="px-6 py-3 text-start">Kelompok</th>
                <th className="px-6 py-3 text-start">Minggu Ke</th>
                <th className="px-6 py-3 text-start">Actions</th>
              </tr>
            </thead>
            <tbody className="">
              {recordsList.map((record, index) => (
                <tr key={record.id}>
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{record.nama}</td>
                  <td className="px-6 py-4">{record.kelompok}</td>
                  <td className="px-6 py-4">{record.minggu_ke}</td>
                  <td className="px-6 py-4 space-x-2">
                    <Button onClick={() => handleOpenViewDialog(record)}>View</Button>
                    <Button variant="secondary" onClick={() => openEditDialog(record)}>Edit</Button>
                    <Button variant="destructive" onClick={() => handleDeleteRecord(record.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

       </Card>

      <AddDialog 
        isOpen={isDialogOpen} 
        onClose={() => { setIsDialogOpen(false); setEditRecord(null); }} 
        onSave={editRecord ? handleEditRecord : handleAddNewRecord}
        initialData={editRecord ? editRecord: undefined}
        isEdit={!!editRecord}
        siswas={siswas}
      />

      <ViewDialog
        isOpen={isViewDialogOpen}
        onClose={() => setIsViewDialogOpen(false)}
        record={editRecord} // Pass record yang dipilih ke dialog
      />


    </ContentLayout>
  );
}
