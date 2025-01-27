import fs from 'fs';
import path from 'path';
import RecordsClient from './RecordsClient';
// import prisma from '../../../lib/prisma'; 
import { PrismaClient } from '@prisma/client';
import { formatDateToIndonesian } from "@/lib/helpers";

const prisma = new PrismaClient()
interface Record {
    id: number;
    siswa_id: number;
    tanggal: Date;
    a_agama: string;
    guru: string;
    semester: number;
    a_jati_diri: string;
    a_literasi: string;
    path_foto: string;
    kelompok: string;
}

async function fetchRecords(): Promise<Record[]> {
  
  const records = await prisma.anekdot.findMany({
    include:{
      siswa : {
        include:{
            ta:true
          }
      },
      bulan:true
    }
  }); 

  const record = records.map(item => ({
    ...item,
    nama: item.siswa.nama,
    guru: item.siswa.guru,
    kelompok: item.siswa.kelompok,
    ta:item.siswa.ta.tahun_ajaran,
    tanggal_text : item.tanggal.toLocaleDateString("id-ID", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }),
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

async function fetchBulan(): Promise<Record[]> {
  const records = await prisma.bulan.findMany();
  const newRecords = records.map(item => ({
    value: String(item.bulan),
    label: item.nama_bulan
  }));

  return newRecords;
}
    
export default async function Karya() {
  const records = await fetchRecords();
  const siswas = await fetchSiswa();
  const bulan = await fetchBulan();
  
  return <RecordsClient records={records} bulan={bulan} siswas={siswas} />;
}
