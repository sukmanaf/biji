import path from 'path';
import fs from 'fs';
import { NextResponse } from 'next/server';

export async function GET(req) {
  // Ambil parameter dari URL
  const { searchParams } = new URL(req.url);
  const namePath = searchParams.get('namePath');

  if (!namePath) {
    return NextResponse.json({ error: "namePath is required" }, { status: 400 });
  }

  const filePath = path.join(process.cwd(),  namePath);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  // Baca file sebagai stream
  const fileStream = fs.createReadStream(filePath);
  const response = new NextResponse(fileStream);
  
  response.headers.set('Content-Type', 'image/jpeg');
  return response;
}
