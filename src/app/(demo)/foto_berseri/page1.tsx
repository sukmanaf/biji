import fs from 'fs';
import path from 'path';
import RecordsClient from './RecordsClient';
import prisma from '../../../lib/prisma'; 

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
  keterangan1: string;
  keterangan2: string;
  keterangan3: string;
}

async function fetchRecords(): Promise<Record[]> {
  
  const records = await prisma.foto_berseri.findMany({
    include:{
      siswa : {
        include:{
            ta:true
          }
      },
      foto_berseri_file:true
    }
  }); 

  const record = records.map(item => ({
    ...item,
    nama: item.siswa.nama,
    guru: item.siswa.guru,
    kelompok: item.siswa.kelompok,
    ta:item.siswa.ta.tahun_ajaran,
    semester:item.semester,
    path_foto1: item.foto_berseri_file[0]?.file_path,
    path_foto2: item.foto_berseri_file[1]?.file_path,
    path_foto3: item.foto_berseri_file[2]?.file_path,
    keterangan1: item.foto_berseri_file[0]?.keterangan,
    keterangan2: item.foto_berseri_file[1]?.keterangan,
    keterangan3: item.foto_berseri_file[2]?.keterangan,
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
  console.log(records);
  
  return <RecordsClient records={records} siswas={siswas} />;
}
