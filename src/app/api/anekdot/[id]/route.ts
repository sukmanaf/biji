import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import prisma from '../../../../lib/prisma'; // Pastikan path ini sesuai dengan lokasi file prisma.ts Anda
import { DateTime } from 'luxon';


export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10);

    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }

    // Check if the record exists before attempting to delete
    const existingRecord = await prisma.anekdot.findUnique({ where: { id } });

    if (!existingRecord) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }


    return NextResponse.json(existingRecord, { status: 200 });

  } catch (error) {
    console.error('Error deleting record:', error);
    return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10);

    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }

    // Check if the record exists before attempting to delete
    const existingRecord = await prisma.anekdot.findUnique({ where: { id } });

    if (!existingRecord) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    // Delete the record
    await prisma.anekdot.delete({ where: { id } });

    return NextResponse.json({ message: 'Record deleted successfully!' }, { status: 200 });

  } catch (error) {
    console.error('Error deleting record:', error);
    return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 });
  }
}
export const PUT  = async (request: NextRequest, { params }: { params: { id: string } }) => {
  
  try {
    const id = parseInt(params.id, 10);

      const formData = await request.formData();
      const semester = formData.get('semester') as string | null;
      const tanggal = formData.get('tanggal') as string | null;
      const a_agama = formData.get('a_agama') as string | null;
      const a_jati_diri = formData.get('a_jati_diri') as string | null;
      const a_literasi = formData.get('a_literasi') as string | null;
      const siswa_id = formData.get('siswa_id') as string | null;
      const tempat = formData.get('tempat') as string | null;
      const keterangan = formData.get('keterangan') as string | null;
      const umpan_balik = formData.get('umpan_balik') as string | null;
      const date = DateTime.fromISO(tanggal);
      const bulan = date.month; // This will give you 11
      const tahun = date.year; // This will give you 11

    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }


    // Check if the record exists before attempting to update
    const existingRecord = await prisma.anekdot.findUnique({ where: { id } });

    if (!existingRecord) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }
    const dataPost = {
        semester:parseInt(semester),
        tahun:parseInt(tahun),
        tempat:tempat,
        keterangan:keterangan,
        a_agama:a_agama,
        a_jati_diri:a_jati_diri,
        a_literasi:a_literasi,
        umpan_balik:umpan_balik,
        tanggal:DateTime.fromISO(tanggal).set({ hour: 0, minute: 0, second: 0 }),
        siswa: {
          connect: { id: parseInt(siswa_id) } // where existingStudentId is the ID of an existing student
        },
        bulan:{
          connect:{id:parseInt(bulan)}
        }
      }
    // Update the record
    const updatedRecord = await prisma.anekdot.update({
      where: { id },
      data: dataPost,
    });

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
  
    return NextResponse.json({ message: 'Record added successfully!', data: newRecords[0] }, { status: 201 });

  } catch (error) {
    console.error('Error updating record:', error);
    return NextResponse.json({ error: 'Failed to update record',message : error.message }, { status: 500 });
  }
}
