import { NextResponse } from 'next/server';
import path from 'path';
import prisma from '../../../lib/prisma';
import { promises as fs } from 'fs';

const uploadDir = path.join(process.cwd(), 'public', 'uploads');



// Handler POST request
export async function GET(request: NextRequest) {
  try {
  
    const records = await prisma.student.findMany({
      include:{
        ta : true
      },
      orderBy:{
        id:'desc'
      }
    });
    const newRecords = records.map((item, index) => ({
      id: item.id,
      nama: item.nama,
      guru: item.guru,
      kelompok: item.kelompok,
      tahun_ajaran: item.ta.tahun_ajaran,
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

    if (!data || typeof data !== 'object' ||  !data.nama ||  !data.guru  || !data.tahun_ajaran || !data.kelompok) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    }

    // Create a new record in the database
    let newRecord = await prisma.student.create({
      data: {
        nama: data.nama,
        kelompok: data.kelompok,
        guru: data.guru,
        tahun_ajaran: parseInt(data.tahun_ajaran),
      },
    });

    const ta = await prisma.tahun_ajaran.findFirst({
      where: {
        id: newRecord.tahun_ajaran,
      },
    })
    const newData = {
      id:newRecord.id,
      nama:newRecord.nama,
      guru:newRecord.guru,
      kelompok:newRecord.kelompok,
      tahun_ajaran : ta?.tahun_ajaran
    }

    return NextResponse.json({ message: 'Record added successfully!', data: newData }, { status: 201 });
  } catch (error) {
    console.error('Error saving data:', error);
    return NextResponse.json({ error: 'Failed to add record',message:error.message }, { status: 500 });
  }
}