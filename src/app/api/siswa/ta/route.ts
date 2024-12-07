import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
export async function GET(request: NextRequest) {
  try {
    const records = await prisma.tahun_ajaran.findMany();
    const newRecords = records.map(item => ({
      value: String(item.id),
      label: item.tahun_ajaran
    }));

    return NextResponse.json(newRecords, { status: 200 });
  } catch (error) {
    console.error('Error get data:', error);
    return NextResponse.json({ error: 'Failed to get record' }, { status: 500 });
  }
}