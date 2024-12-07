import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import prisma from '../../../lib/prisma';
import { DateTime } from 'luxon';

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const file1 = formData.get('path_foto1') as File | null;
  const file2 = formData.get('path_foto2') as File | null;
  const file3 = formData.get('path_foto3') as File | null;
  const semester = formData.get('semester') as string | null;
  const keterangan1 = formData.get('keterangan1') as string | null;
  const keterangan2 = formData.get('keterangan2') as string | null;
  const keterangan3 = formData.get('keterangan3') as string | null;
  const minggu_ke = formData.get('minggu_ke') as string | null;
  const a_agama = formData.get('a_agama') as string | null;
  const a_jati_diri = formData.get('a_jati_diri') as string | null;
  const a_literasi = formData.get('a_literasi') as string | null;
  const siswa_id = formData.get('siswa_id') as string | null;
  
  if (!file1 || !file2 || !file3 ) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }
  // Simpan file
  const dataPost = {
        minggu_ke:parseInt(minggu_ke),
        semester:parseInt(semester),
        a_agama:a_agama,
        a_jati_diri:a_jati_diri,
        a_literasi:a_literasi,
        siswa_id:parseInt(siswa_id),
  }

      let newRecord = await prisma.foto_berseri.create({
        data: dataPost,
      });

      const uploadsDir = path.join(process.cwd(), 'public', `uploads/foto_berseri/${newRecord.id}`);
      const buffer = Buffer.from(await file1.arrayBuffer());
      await fs.mkdir(uploadsDir, { recursive: true });
      const extension1 = path.extname(file1.name);
      const fileName1 = `${Date.now()}${extension1}`;
      const filePath1 = path.join(uploadsDir, fileName1);
      const up1 = await fs.writeFile(filePath1, buffer);

      const buffer2 = Buffer.from(await file2.arrayBuffer());
      const extension2 = path.extname(file2.name);
      const fileName2 = `${Date.now()}${extension2}`;
      const filePath2 = path.join(uploadsDir, fileName2);
      const up2 = await fs.writeFile(filePath2, buffer2);

      const buffer3 = Buffer.from(await file3.arrayBuffer());
      const extension3 = path.extname(file3.name);
      const fileName3 = `${Date.now()}${extension3}`;
      const filePath3 = path.join(uploadsDir, fileName3);
      const up3 = await fs.writeFile(filePath3, buffer3);

      
      const dataFile = [
          {
            keterangan : keterangan1,
            file_path : `/uploads/foto_berseri/${newRecord.id}/${fileName1}`,
            foto_berseri_id:newRecord.id,
            foto_ke:1
          },
          {
            keterangan : keterangan2,
            file_path : `/uploads/foto_berseri/${newRecord.id}/${fileName2}`,
            foto_berseri_id:newRecord.id,
            foto_ke:2
          },
          {
            keterangan : keterangan3,
            file_path : `/uploads/foto_berseri/${newRecord.id}/${fileName3}`,
            foto_berseri_id:newRecord.id,
            foto_ke:3
          }
        ]

        await prisma.foto_berseri_file.createMany({
          data: dataFile,
        });
      const records = await prisma.foto_berseri.findMany({
        include:{
          siswa : {
            include:{
                ta:true
              }
          },
          foto_berseri_file:true
        },
        where: { id: newRecord.id },
      }); 

      const record = records.map(item => ({
        ...item,
        nama: item.siswa.nama,
        kelompok: item.siswa.kelompok,
        ta:item.siswa.ta.tahun_ajaran,
        path_foto1: item.foto_berseri_file[0]?.file_path,
        path_foto2: item.foto_berseri_file[1]?.file_path,
        path_foto3: item.foto_berseri_file[2]?.file_path,
        keterangan1: item.foto_berseri_file[0]?.keterangan,
        keterangan2: item.foto_berseri_file[1]?.keterangan,
        keterangan3: item.foto_berseri_file[2]?.keterangan,
      }));
  

    return NextResponse.json({ message: 'Record added successfully!', data: record[0] }, { status: 201 });

};
