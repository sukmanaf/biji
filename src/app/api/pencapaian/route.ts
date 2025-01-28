import { NextResponse } from 'next/server';
import path from 'path';
import prisma from '../../../lib/prisma';
import { promises as fs } from 'fs';

const uploadDir = path.join(process.cwd(), 'public', 'uploads');

export async function GET(request: NextRequest) {
  try {
  
    const records = await prisma.ceklis_pencapaian.findMany({
      include:{
        siswa:true,
        bulan:true
      },
      orderBy:{
        id:'desc'
      }
    });
    const newRecords = records.map((item, index) => ({
      id: item.id,
      nama: item.siswa.nama,
      bulan: item.bulan.nama_bulan,
      tahun: item.tahun,
    }));

    return NextResponse.json({ message: 'Record added successfully!', data: newRecords }, { status: 201 });

  } catch (error) {
    console.error('Error get data:', error);
    return NextResponse.json({ error: 'Failed to add record',message:error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validasi data yang diperlukan
    if (
      !data ||
      typeof data !== 'object' ||
      !data.siswa_id ||
      !data.tahun ||
      !data.id_bulan ||
      // data.semester == null ||
      !Array.isArray(data.ceklis_pencapaian_detail)
    ) {
      return NextResponse.json(
        { error: 'Invalid data format or missing required fields' },
        { status: 400 }
      );
    }

    // Simpan data ceklis_pencapaian
    const ceklisPencapaian = await prisma.ceklis_pencapaian.create({
      data: {
        siswa: {
          connect: { id: parseInt(data.siswa_id) }, // Hubungkan ke siswa berdasarkan siswa_id
        },
        bulan: {
          connect: { id: parseInt(data.id_bulan) }, // Hubungkan ke bulan berdasarkan id_bulan
        },
        semester: parseInt(data.semester) || 1,
        tahun: parseInt(data.tahun),
        ceklis_pencapaian_detail: {
          create: data.ceklis_pencapaian_detail.map((detail) => ({
            tujuan: detail.tujuan,
            konteks: detail.konteks,
            kejadian: detail.kejadian,
            muncul: detail.muncul === 'on' ? 1 : parseInt(detail.muncul), // Pastikan "muncul" sesuai format angka
          })),
        },
      },
    });
    
    
    const records = await prisma.ceklis_pencapaian.findMany({
      where:{
        siswa_id:ceklisPencapaian.siswa_id
      },
      include:{
        siswa:true,
        bulan:true
      },
      orderBy:{
        id:'desc'
      }
    });
    const newRecords = records.map((item, index) => ({
      id: item.id,
      nama: item.siswa.nama,
      bulan: item.bulan.nama_bulan,
      tahun: item.tahun,
    }));

    return NextResponse.json(
      {
        message: 'Record added successfully!',
        data: newRecords[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving data:', error);
    return NextResponse.json(
      { error: 'Failed to add record', details: error.message },
      { status: 500 }
    );
  }
}