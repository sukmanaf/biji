import fs from 'fs';
import path from 'path';
import RecordsClient from './RecordsClient';
import prisma from '../../../lib/prisma'; // Pastikan path ini sesuai dengan lokasi file prisma.ts Anda

interface Record {
  id: number;
  tahun_ajaran: string;
}

async function fetchRecords(): Promise<Record[]> {
  // Fetch records from the database
  const records = await prisma.tahun_ajaran.findMany({
    // Adjust this according to your schema if necessary
  });
  
  return records;
}

export default async function MasterSiswa() {
  const records = await fetchRecords();

  return <RecordsClient records={records} />;
}
