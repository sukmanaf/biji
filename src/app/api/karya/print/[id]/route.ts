import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10);

    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }
    const records = await prisma.karya.findMany({
    include:{
      siswa : {
        include:{
            ta:true
          }
      }
    },
    where:{
      id:id
    },
    take:1
  }); 

  const record = records.map(item => (
    {
    ...item,
    tanggal_text : item.tanggal ?` ${item.tanggal.toLocaleDateString("id-ID", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}` : '',
    nama: item.siswa.nama,
    guru: item.siswa.guru,
    kelompok: item.siswa.kelompok,
    ta:item.siswa.ta.tahun_ajaran,
    logo:"default/logo.png",
    bg_foto:"default/bg_foto.png",
    darul_ulum:"default/darul_ulum.png",
    semester1:"default/semester1.png",
    semester2:"default/semester2.png",
  }));

    return NextResponse.json(record[0], { status: 200 });
  } catch (error) {
    console.error('Error get data:', error);
    return NextResponse.json({ error: 'Failed to get record' }, { status: 500 });
  }
}