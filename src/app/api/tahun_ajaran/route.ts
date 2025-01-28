import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import prisma from '../../../lib/prisma';
import { DateTime } from 'luxon';
import { ParseInput } from 'zod';


// Handler POST request
export async function GET(request: NextRequest) {
  try {
  
    const records = await prisma.anekdot.findMany({
      include:{
        siswa:{
          include:{
            ta:true
          }
        }
      },
      orderBy:{
        id:'desc'
      }
    });
    const newRecords = records.map((item, index) => ({
      id: item.id,
      nama: item.siswa.nama,
      tanggal: `${item.tanggal.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })}`,
    }));

    return NextResponse.json({ message: 'Record added successfully!', data: newRecords }, { status: 201 });

  } catch (error) {
    console.error('Error get data:', error);
    return NextResponse.json({ error: 'Failed to add record',message:error.message }, { status: 500 });
  }
}


export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const semester = formData.get('semester') as string | null;
    const tanggal = formData.get('tanggal') as string | null;
    const guru = formData.get('guru') as string | null;
    const a_agama = formData.get('a_agama') as string | null;
    const a_jati_diri = formData.get('a_jati_diri') as string | null;
    const a_literasi = formData.get('a_literasi') as string | null;
    const siswa_id = formData.get('siswa_id') as string | null;
    const tempat = formData.get('tempat') as string | null;
    const keterangan = formData.get('keterangan') as string | null;
    const umpan_balik = formData.get('umpan_balik') as string | null;

    const date = DateTime.fromISO(tanggal);
    const bulan = date.month; 
    const tahun = date.year; 

    const dataPost = {
      semester: parseInt(semester),
      tahun: parseInt(tahun),
      tempat: tempat,
      keterangan: keterangan,
      a_agama: a_agama,
      a_jati_diri: a_jati_diri,
      a_literasi: a_literasi,
      umpan_balik: umpan_balik,
      tanggal: DateTime.fromISO(tanggal).set({ hour: 0, minute: 0, second: 0 }),
      siswa: {
        connect: { id: parseInt(siswa_id) },
      },
      bulan: {
        connect: { id: parseInt(bulan) },
      },
    };

    let newRecord = await prisma.anekdot.create({
      data: dataPost,
    });

    const records = await prisma.anekdot.findMany({
      include: {
        siswa: {
          include: {
            ta: true,
          },
        },
        bulan: true,
      },
      where: {
        siswa_id: parseInt(siswa_id),
      },
    });

    const record = records.map((item) => ({
      ...item,
      nama: item.siswa.nama,
      kelompok: item.siswa.kelompok,
      ta: item.siswa.ta.tahun_ajaran,
      tanggal_text: item.tanggal.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    }));

    return NextResponse.json(
      { message: "Record added successfully!", data: record[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST API:", error);
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
};

