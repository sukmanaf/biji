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
import { toast } from "sonner"

 
interface Record {
  id: number;
  nama: string;
  guru: string;
  kelompok: string;
  tahun_ajaran: string;
  tahun_ajaran_text: string;
}


interface Tas {
  value: string;
  label: string;
}

interface RecordsClientProps {
  records: Record[];
  tahun_ajarans: Tas[];
}
export default function RecordsClient({ records: initialRecords,tahun_ajarans }: RecordsClientProps) {
  const [recordsList, setRecordsList] = useState<Record[]>(initialRecords);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<Record | null>(null); // Track the record being edited

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
        setRecordsList([...recordsList, newRecord.data]);
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
      const response = await fetch(`/api/siswa/${editRecord?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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
            description: "Data Gagal disimpan!"
          })
    }
  };

  const openEditDialog = (record: Record) => {
    setEditRecord(record); // Set the record to be edited
    setIsDialogOpen(true);
  };
 const handleDeleteRecord = async (id: number) => {
        try {
            const response = await fetch(`/api/siswa/${id}`, {
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
    <ContentLayout title="Master Siswa">
       <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Master Data</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Siswa</BreadcrumbPage>
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
                <th className="px-6 py-3 text-start">Guru</th>
                <th className="px-6 py-3 text-start">Kelompok</th>
                <th className="px-6 py-3 text-start">Tahun Ajaran</th>
                <th className="px-6 py-3 text-start">Actions</th>
              </tr>
            </thead>
            <tbody className=" ">
              {recordsList.map((record, index) => (
                <tr key={record.id}>
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{record.nama}</td>
                  <td className="px-6 py-4">{record.guru}</td>
                  <td className="px-6 py-4">{record.kelompok}</td>
                  <td className="px-6 py-4">{record.tahun_ajaran_text}</td>
                  <td className="px-6 py-4 space-x-2">
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
        initialData={editRecord ? { nama: editRecord.nama, guru : editRecord.guru, kelompok: editRecord.kelompok, tahun_ajaran: editRecord.tahun_ajaran } : undefined}
        isEdit={!!editRecord}
        tahun_ajarans={tahun_ajarans}
      />
      
    </ContentLayout>
  );
}
