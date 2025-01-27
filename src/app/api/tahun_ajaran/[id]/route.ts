import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma'; // Adjust the path according to your directory structure



export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10);

    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }

    // Check if the record exists before attempting to delete
    const existingRecord = await prisma.tahun_ajaran.findUnique({ where: { id } });

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
    const existingRecord = await prisma.tahun_ajaran.findUnique({ where: { id } });

    if (!existingRecord) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    // Delete the record
    await prisma.tahun_ajaran.delete({ where: { id } });

    return NextResponse.json({ message: 'Record deleted successfully!' }, { status: 200 });

  } catch (error) {
    console.error('Error deleting record:', error);
    return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 });
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
    if (!updatedData || typeof updatedData.tahun_ajaran !== 'string') {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    }

    // Check if the record exists before attempting to update
    const existingRecord = await prisma.tahun_ajaran.findUnique({ where: { id } });

    if (!existingRecord) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    // Update the record
    const updatedRecord = await prisma.tahun_ajaran.update({
      where: { id },
      data: {
        tahun_ajaran: updatedData.tahun_ajaran, // Assuming 'tahun_ajaran' is the field to update
      },
    });

    return NextResponse.json({message : 'Success Update Data',data :updatedRecord}, { status: 200 });

  } catch (error) {
    console.error('Error updating record:', error);
    return NextResponse.json({ error: 'Failed to update record' }, { status: 500 });
  }
}