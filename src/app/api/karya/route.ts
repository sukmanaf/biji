import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import prisma from '../../../lib/prisma';
import { DateTime } from 'luxon';

export async function GET(request: NextRequest) {
  try {
  
    const records = await prisma.karya.findMany({
      include:{
        siswa : {
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
  const formData = await req.formData();
  const file = formData.get('path_foto') as File || null;
  const semester = formData.get('semester') as string || null;
  const tanggal = formData.get('tanggal') as string || null;
  const a_agama = formData.get('a_agama') as string || null;
  const a_jati_diri = formData.get('a_jati_diri') as string || null;
  const a_literasi = formData.get('a_literasi') as string || null;
  const siswa_id = formData.get('siswa_id') as string || null;
  const deskripsi_foto = formData.get('deskripsi_foto') as string || null;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  try {
    
    // Membaca isi file sebagai Buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads/karya');

    // Buat folder 'uploads' jika belum ada
    await fs.mkdir(uploadsDir, { recursive: true });

    // Ekstrak ekstensi file
    const extension = path.extname(file.name);

    // Ganti nama file menggunakan timestamp dan ekstensi asli
    const fileName = `${Date.now()}${extension}`;

    // Path untuk menyimpan file dengan nama baru
    const filePath = path.join(uploadsDir, fileName);

    // Simpan file
    const dataPost = {
          semester:parseInt(semester) || parseInt(1),
          tanggal:DateTime.fromISO(tanggal).set({ hour: 0, minute: 0, second: 0 }),
          a_agama:a_agama,
          a_jati_diri:a_jati_diri,
          a_literasi:a_literasi,
          deskripsi_foto:deskripsi_foto,
          siswa: {
            connect: { id: parseInt(siswa_id) }, // Hubungkan ke siswa berdasarkan siswa_id
          },
          path_foto: `/uploads/karya/${fileName}`
    }

        await fs.writeFile(filePath, buffer);
        let newRecord = await prisma.karya.create({
          data: dataPost,
        });

        const records = await prisma.karya.findMany({
          include:{
            siswa : {
              include:{
                  ta:true
                }
            }
          },
          where:{
            id : newRecord.id,
          }
        }); 

        const record = records.map(item => ({
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
          tahun_ajaran:item.siswa.ta.tahun_ajaran,
          logo:"default/logo.png",
          bg_foto:"default/bg_foto.png",
          darul_ulum:"default/darul_ulum.png",
          semester1:"default/semester1.png",
          semester2:"default/semester2.png",
        }));
        

      return NextResponse.json({ message: 'Record added successfully!', data: record[0] }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to save record',message : error.message }, { status: 500 });
    
    }
};
