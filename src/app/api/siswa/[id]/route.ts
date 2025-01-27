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
    const existingRecord = await prisma.student.findUnique({ where: { id } });

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
    const existingRecord = await prisma.student.findUnique({ where: { id } });

    if (!existingRecord) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    // Delete the record
    await prisma.student.delete({ where: { id } });

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

    const updatedData = await request.json();

    // Validate updatedData if necessary
    if (!updatedData || typeof updatedData.nama !== 'string' ||  typeof updatedData.guru !== 'string' || typeof updatedData.kelompok !== 'string' || typeof updatedData.tahun_ajaran !== 'string') {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    }

    // Check if the record exists before attempting to update
    const existingRecord = await prisma.student.findUnique({ where: { id } });

    if (!existingRecord) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    // Update the record
    const tahun_ajaran = parseInt(updatedData.tahun_ajaran)
    const updatedRecord = await prisma.student.update({
      where: { id },
      data: {
        nama: updatedData.nama, // Assuming 'tahun_ajaran' is the field to update
        kelompok: updatedData.kelompok, // Assuming 'tahun_ajaran' is the field to update
        guru: updatedData.guru, // Assuming 'tahun_ajaran' is the field to update
        tahun_ajaran: tahun_ajaran, // Assuming 'tahun_ajaran' is the field to update
      },
    });
    const ta = await prisma.tahun_ajaran.findUnique({
      where: {
        id: tahun_ajaran,
      },
    })
    updatedRecord['tahun_ajaran'] = ta.tahun_ajaran
    
    return NextResponse.json(updatedRecord);
  } catch (error) {
    console.error('Error updating record:', error);
    return NextResponse.json({ error: 'Failed to update record' }, { status: 500 });
  }
}
