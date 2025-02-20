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
import HeaderPrint from "@/components/custom/headerPrint";
import Image from "next/image";

const chewy = Chewy({
  subsets: ['latin'],
  weight : ['400'] // Tambahkan subset yang dibutuhkan
});


interface DataView {
  siswa_id: string;
  a_agama: string;
  guru: string;
  semester: number;
  a_jati_diri: string;
  a_literasi: string;
  path_foto: string;
  kelompok : string;
  tahun_ajaran : string;
  nama : string;
  tanggal : string;
  logo:File
  darul_ulum:File
  bg_foto:File
  semester1:File
  semester2:File
}

interface ViewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  record: DataView | null;
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
   console.log("record view");
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
         <PerfectScrollbar style={{ maxHeight: "80vh", overflow: "hidden" }}>

          <div ref={printRef}>
          <HeaderPrint
            record={record}
            chewy={{ className: "font-chewy" }}
            judul="Dokumentasi Hasil Karya"
          />

            <table className="min-w-full mb-2 mt-5">
              <tbody>
                <tr>
                    <td style={{ width: "20%" }}>Kelompok</td>
                    <td style={{ width: "30%" }}>: {record.kelompok}</td>
                    <td style={{ width: "20%" }}>Tanggal</td>
                    <td style={{ width: "30%" }}>
                      : {record.tanggal}
                    </td>
                  </tr>

                <tr>
                  <td>Semester </td>
                  <td>: {record.semester}</td>
                  <td>Guru Kelas </td>
                  <td>: {record.guru}</td>
                </tr>
              </tbody>
            </table>

            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-green-300">
                  <th style={{ width: "35%" }} className="border border-gray-300 p-2 text-left">Foto</th>
                  <th style={{ width: "65%" }}className="border border-gray-300 p-2 text-left">Keterangan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2" rowSpan={6}>
                    {record.path_foto && (
                      <div className="flex justify-center items-center h-full">
              
                        <Image
                          src={`/api/image?namePath=${record.path_foto}`}
                          alt="Foto 3"
                          className="max-h-36 object-contain"
                          width={100}
                          height={100}
                          unoptimized={true} // Supaya Next.js tidak memproses gambar
                        />
                        
                      </div>
                    )}
                  </td>

                  <td className="border border-gray-300 p-2"><strong>Nama</strong> <br /> {record.nama}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2"><strong>Deskripsi Foto</strong> <br /> {record.deskripsi_foto}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2"><strong>Analisis Nilai Agama dan Budi Pekerti</strong> <br /> {record.a_agama}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2"><strong>Analisis Jati Diri</strong> <br /> {record.a_jati_diri}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2"><strong>Analisis Literasi dan steam</strong> <br /> {record.a_literasi}</td>
                </tr>
              </tbody>
            </table>
          </div>
          </PerfectScrollbar>
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
