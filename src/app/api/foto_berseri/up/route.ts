import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  // Membaca isi file sebagai Buffer
  const buffer = Buffer.from(await file.arrayBuffer());
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

  // Buat folder 'uploads' jika belum ada
  await fs.mkdir(uploadsDir, { recursive: true });

  // Path untuk menyimpan file
  const filePath = path.join(uploadsDir, file.name);

  // Menyimpan file ke dalam folder public/uploads
  await fs.writeFile(filePath, buffer);

  return NextResponse.json({ message: 'File uploaded successfully', filePath: `/uploads/${file.name}` });
};
