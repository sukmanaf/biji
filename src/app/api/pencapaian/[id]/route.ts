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
    const existingRecord = await prisma.ceklis_pencapaian.findUnique({ where: { id },include:{ceklis_pencapaian_detail:true} });

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
    const existingRecord = await prisma.ceklis_pencapaian.findUnique({ where: { id } });

    if (!existingRecord) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    // Delete the record
    await prisma.ceklis_pencapaian.delete({ where: { id } });

    return NextResponse.json({ message: 'Record deleted successfully!' }, { status: 200 });

  } catch (error) {
    console.error('Error deleting record:', error);
    return NextResponse.json({ error: 'Failed to delete record',message : error.message }, { status: 500 });
  }
}
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10);

    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }

    const data = await request.json();
    if (
      !data ||
      typeof data !== 'object' ||
      !data.siswa_id ||
      !data.tahun ||
      !data.id_bulan ||
      data.semester == null ||
      !Array.isArray(data.ceklis_pencapaian_detail)
    ) {
      return NextResponse.json(
        { error: 'Invalid data format or missing required fields' },
        { status: 400 }
      );
    }
  
    // Find the record by ID to ensure it exists
    const existingRecord = await prisma.ceklis_pencapaian.findUnique({
      where: {
        id: id, // Use the ID to find the existing record
      },
    });
  
    if (!existingRecord) {
      return NextResponse.json(
        { error: 'Record not found' },
        { status: 404 }
      );
    }
  
    // Update the record
    const updatedCeklisPencapaian = await prisma.ceklis_pencapaian.update({
      where: { id: id }, // Use the ID of the record to update
      data: {
        siswa_id: parseInt(data.siswa_id.toString()), // Ensure the ID is a number
        id_bulan: parseInt(data.id_bulan.toString()),
        semester: parseInt(data.semester.toString()),
        tahun: parseInt(data.tahun.toString()),
        ceklis_pencapaian_detail: {
          deleteMany: {}, // Delete existing details first (if any)
          create: data.ceklis_pencapaian_detail.map((detail) => ({
            tujuan: detail.tujuan,
            konteks: detail.konteks,
            kejadian: detail.kejadian,
            muncul: detail.muncul === 1 ? 1 : 0, // Ensure 'muncul' is stored as 1 or 0
          })),
        },
      },
    });
  
    // Fetch the updated records
    const records = await prisma.ceklis_pencapaian.findMany({
      where: {
        siswa_id: updatedCeklisPencapaian.siswa_id,
      },
      include: {
        siswa: true,
        bulan: true,
      },
      orderBy: {
        id: 'desc',
      },
    });
  
    const newRecords = records.map((item) => ({
      id: item.id,
      nama: item.siswa.nama,
      bulan: item.bulan.nama_bulan,
      tahun: item.tahun,
    }));
  
    return NextResponse.json(
      {
        message: 'Record updated successfully!',
        data: newRecords[0], // Return the first updated record
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating record:', error);
    return NextResponse.json({ error: 'Failed to update record' }, { status: 500 });
  }
}
