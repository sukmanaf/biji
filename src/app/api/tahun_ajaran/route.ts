// src/app/api/tahun-ajaran/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma'; // Pastikan path ini sesuai dengan lokasi file prisma.ts Anda



// Handler POST request
export async function GET(request: NextRequest) {
  try {
  
    const records = await prisma.tahun_ajaran.findMany({
      orderBy:{
        id:'desc'
      }
    });
    const newRecords = records.map((item, index) => ({
      id: item.id,
      tahun_ajaran: item.tahun_ajaran,
    }));

    return NextResponse.json({ message: 'Record added successfully!', data: newRecords }, { status: 201 });

  } catch (error) {
    console.error('Error get data:', error);
    return NextResponse.json({ error: 'Failed to add record' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data || typeof data !== 'object' || !data.tahun_ajaran) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    }

    // Create a new record in the database
    const newRecord = await prisma.tahun_ajaran.create({
      data: {
        tahun_ajaran: data.tahun_ajaran,
      },
    });

    return NextResponse.json({ message: 'Record added successfully!', data: newRecord }, { status: 201 });
  } catch (error) {
    console.error('Error saving data:', error);
    return NextResponse.json({ error: 'Failed to add record' }, { status: 500 });
  }
}

