import fs from 'fs';
import path from 'path';
import RecordsClient from './RecordsClient';
import prisma from '../../../lib/prisma'; 

interface Record {
    id: number;
    siswa_id: number;
    tanggal: Date;
    a_agama: string;
    semester: number;
    a_jati_diri: string;
    a_literasi: string;
    path_foto: string;
    kelompok: string;
}

async function fetchRecords(): Promise<Record[]> {
  
  const records = await prisma.karya.findMany({
    include:{
      siswa : {
        include:{
            ta:true
          }
      }
    }
  }); 

  const record = records.map(item => (
    {
    ...item,
    tanggal_text : item.tanggal ?` ${item.tanggal.toLocaleDateString("id-ID", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}` : '',
    nama: item.siswa.nama,
    guru: item.siswa.guru,
    kelompok: item.siswa.kelompok,
    ta:item.siswa.ta.tahun_ajaran,
    logo:"default/logo.png",
    bg_foto:"default/bg_foto.png",
    darul_ulum:"default/darul_ulum.png",
    semester1:"default/semester1.png",
    semester2:"default/semester2.png",
  }));
  
  return record
  
}

async function fetchSiswa(): Promise<Record[]> {
  const records = await prisma.student.findMany();
  const newRecords = records.map(item => ({
    value: String(item.id),
    label: item.nama
  }));
  
  return newRecords;
}
    
export default async function Karya() {
  const records = await fetchRecords();
  const siswas = await fetchSiswa();
   
  return <RecordsClient records={records} siswas={siswas} />;
}
