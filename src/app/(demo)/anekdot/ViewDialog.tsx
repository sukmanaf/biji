"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { Chewy } from 'next/font/google';

const chewy = Chewy({
  subsets: ['latin'],
  weight : ['400'] // Tambahkan subset yang dibutuhkan
});


interface Record {
  siswa_id: string;
  tanggal: Date;
  tanggal_text: string;
  a_agama: string;
  guru: string;
  semester: number;
  a_jati_diri: string;
  a_literasi: string;
  path_foto: string;
  kelompok : string;
  nama : string;
  ta : string;
  tempat : string;
  umpan_balik : string;
  keterangan : string;
  tahun : number;
  logo: File;
  darul_ulum: File;
  bg_foto: File;
  semester1: File;
  semester2: File;
  bulan : [nama_bulan : string]
}

interface ViewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  record: Record | null;
}

export function ViewDialog({ isOpen, onClose, record }: ViewDialogProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (printRef.current) {
      const printContents = printRef.current.innerHTML;
      const originalContents = document.body.innerHTML;
      
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); // Reload to restore any JavaScript functionalities
    }
  };

  if (!record) return null;
  console.log(record);
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-4/5 md:w-2/3 lg:w-1/2">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
            {/* Detail dari karya ilmiah yang dipilih. */}
          </DialogDescription>
        </DialogHeader>
        <div ref={printRef}>
          <div className="grid grid-cols-4">
              <div className="col-span-1 flex items-end justify-end">
              <img 
                src={record?.logo instanceof File ? URL.createObjectURL(record.logo) : record.logo} 
                alt="Foto 3" 
                className="max-h-32 object-contain  mt-11" 
                />
              </div>
              <div className="col-span-2 flex items-center justify-center">
                {record.semester === 1 ? (
                  <img 
                    src={record?.semester1 instanceof File ? URL.createObjectURL(record.semester1) : record.semester1} 
                    alt="Foto Semester 1" 
                    className="max-h-24 w-[70%] mb-10 object-contain mt-11" 
                  />
                ) : (
                  <img 
                    src={record?.semester2 instanceof File ? URL.createObjectURL(record.semester2) : record.semester2} 
                    alt="Foto Semester 2" 
                    className="max-h-24 object-contain mt-11" 
                  />
                )}
              </div>
            </div>
          
            <div className="grid grid-cols-9">
              <div className="col-span-5 flex items-center justify-center">
                <img 
                    src={record?.darul_ulum instanceof File ? URL.createObjectURL(record.darul_ulum) : record.darul_ulum} 
                    alt="Foto Semester 2" 
                    className="w-[80%] object-contain " 
                  />
              </div>
              <div className="col-span-4 ">
                <div className="flex flex-col  items-center justify-center">
                  <label className={` ${chewy.className} block text-5xl ` }>
                    <strong>Catatan Anekdot </strong>
                  </label>
                  <label className={` ${chewy.className} block text-3xl mt-2`}>
                    <strong>{record.ta} </strong>
                  </label>
                </div>
              </div>
            </div>

          <table className="min-w-full mb-2 mt-5">
            <tbody>
              <tr>
                  <td style={{ width: "15%" }}>Nama</td>
                  <td style={{ width: "35%" }}>: {record.nama}</td>
                  <td style={{ width: "15%" }}>Bulan</td>
                  <td style={{ width: "35%" }}>: {record.bulan.nama_bulan}</td>
                </tr>

              <tr>
                <td>Kelompok </td>
                <td>: {record.kelompok}</td>
                <td>Guru Kelas </td>
                <td>: {record.siswa.guru}</td>
              </tr>
            </tbody>
          </table>

          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th colSpan={2}> Tuliskan apa yang guru lihat & dengar setiap tanggal peristiwa</th>
              </tr>
              <tr className="bg-green-300">
                  <th style={{ width: "45%" }} className="border border-gray-300 p-2 text-left">Tempat & tanggal <br/> 
                  {`${record.tempat} ${record.tanggal_text}`}
                  </th>
                <th style={{ width: "55%" , verticalAlign: "middle"}}className="border border-gray-300 p-2 text-left">Analisis Pencapaian  </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2" rowSpan={5} style={{ verticalAlign: 'top' }}>
                 {record.keterangan}
                </td>

                <td className="border border-gray-300 p-2"><strong>Nilai Agama dan Budi Pekerti</strong> <br /> {record.a_jati_diri}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2"><strong>Jati Diri</strong> <br /> {record.a_literasi}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2"><strong>Literasi dan steam</strong> <br /> {record.a_agama}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2"><strong>Umpan balik</strong> <br /> {record.a_jati_diri}</td>
              </tr>
              
            </tbody>
          </table>
        </div>

        <DialogFooter className="p-3">
          <DialogClose asChild>
            <Button type="button" variant="outline" onClick={onClose}>
              Close
            </Button>
          </DialogClose>
          <Button type="button" onClick={handlePrint}>
            Print
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
