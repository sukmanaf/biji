import fs from 'fs';
import path from 'path';
import RecordsClient from './RecordsClient';
import prisma from '../../../lib/prisma'; // Pastikan path ini sesuai dengan lokasi file prisma.ts Anda
import { log } from 'console';

interface Record {
  id: number;
  nama: string;
  kelompok: string;
  guru: string;
  tahun_ajaran: string;
  tahun_ajaran_text: string;
  ta : {}
}

interface Tas {
  value: string;
  label: string;
}

async function fetchRecords(): Promise<Record[]> {
  
  const records = await prisma.student.findMany({
    include:{
      ta : true
    }
  });
  const newRecords = records.map(item => ({
    ...item,
    tahun_ajaran: String(item.tahun_ajaran),
    tahun_ajaran_text: item.ta.tahun_ajaran
  }));
  
  return newRecords;
}


async function fetchTa(): Promise<Record[]> {
  const records = await prisma.tahun_ajaran.findMany();
  const newRecords = records.map(item => ({
    value: String(item.id),
    label: item.tahun_ajaran
  }));
  
  return newRecords;
}


export default async function MasterSiswa() {
  const records = await fetchRecords();
  const ta = await fetchTa();
  
  return <RecordsClient records={records} tahun_ajarans={ta} />;
}
