import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import prisma from '../../../../lib/prisma'; // Pastikan path ini sesuai dengan lokasi file prisma.ts Anda

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10);
    
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }

    // Check if the record exists before attempting to delete
    let existingRecord = await prisma.karya.findUnique({ where: { id } });

    if (!existingRecord) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    existingRecord['siswa_id'] = String(existingRecord.siswa_id)

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
    const existingRecord = await prisma.karya.findUnique({ where: { id } });

    if (!existingRecord) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    // Delete the record
    await prisma.karya.delete({ where: { id } });

    return NextResponse.json({ message: 'Record deleted successfully!' }, { status: 200 });

  } catch (error) {
    console.error('Error deleting record:', error);
    return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 });
  }
}
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10);
    const formData = await request.formData();
    const file = formData.get('path_foto') as File | null;
    const semester = formData.get('semester') as string | null;
    const tanggal = formData.get('tanggal') as string | null;
    const a_agama = formData.get('a_agama') as string | null;
    const a_jati_diri = formData.get('a_jati_diri') as string | null;
    const a_literasi = formData.get('a_literasi') as string | null;
    const siswa_id = formData.get('siswa_id') as string | null;
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }

    const updatedData = await request.json();
    // Validate updatedData if necessary
    // if (!updatedData || typeof updatedData.tahun_ajaran !== 'string') {
    //   return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    // }

    // Check if the record exists before attempting to update
    const existingRecord = await prisma.karya.findUnique({ where: { id } });

    if (!existingRecord) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    // Update the record
    const updatedRecord = await prisma.karya.update({
      where: { id },
      data: {
          semester : parseInt(semester),
          tanggal,
          a_agama,
          a_jati_diri,
          a_literasi,
          siswa_id :parseInt(siswa_id),
      },
    });

    return NextResponse.json(updatedRecord);
  } catch (error) {
    console.error('Error updating record:', error);
   return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}
