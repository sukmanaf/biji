import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import prisma from '../../../lib/prisma';
import { DateTime } from 'luxon';
import { ParseInput } from 'zod';


// Handler POST request
export async function GET(request: NextRequest) {
  try {
  
    const records = await prisma.tahun_ajaran.findMany();
   

    return NextResponse.json({ message: 'Record added successfully!', data: records }, { status: 201 });

  } catch (error) {
    console.error('Error get data:', error);
    return NextResponse.json({ error: 'Failed to add record',message:error.message }, { status: 500 });
  }
}


export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();

    // Validate data if necessary
    if (!data || typeof data.tahun_ajaran !== 'string') {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    }


    
    let newRecord = await prisma.tahun_ajaran.create({
      data: {tahun_ajaran:data.tahun_ajaran},
    });

    const records = await prisma.tahun_ajaran.findMany({
      
    });


    return NextResponse.json(
      { message: "Record added successfully!", data: records[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST API:", error);
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
};

