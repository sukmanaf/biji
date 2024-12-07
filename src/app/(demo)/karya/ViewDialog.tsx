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
  a_agama: string;
  guru: string;
  semester: number;
  a_jati_diri: string;
  a_literasi: string;
  path_foto: string;
  kelompok : string;
  ta : string;
  nama : string;
  tanggal_text : string;
  logo:File
  darul_ulum:File
  bg_foto:File
  semester1:File
  semester2:File
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

              <div className="grid grid-cols-7">
                <div className="col-span-4 flex items-center justify-center">
                  <img 
                      src={record?.darul_ulum instanceof File ? URL.createObjectURL(record.darul_ulum) : record.darul_ulum} 
                      alt="Foto Semester 2" 
                      className="w-[80%] object-contain " 
                    />
                </div>
                <div className="col-span-3 ">
                  <div className="flex flex-col  items-center justify-center">
                    <label className={` ${chewy.className} block text-4xl -mt-6` }>
                      <strong>Dokumentasi </strong>
                    </label>
                    <label className={` ${chewy.className} block text-4xl ` }>
                      <strong>Hasil Karya </strong>
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
                    <td style={{ width: "20%" }}>Kelompok</td>
                    <td style={{ width: "30%" }}>: {record.kelompok}</td>
                    <td style={{ width: "20%" }}>Tanggal</td>
                    <td style={{ width: "30%" }}>
                      : {record.tanggal_text}
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
                        <img
                          src={record.path_foto}
                          alt="Foto Karya Ilmiah"
                          className="mt-2 w-auto h-auto border border-gray-300 rounded"
                        />
                      </div>
                    )}
                  </td>

                  <td className="border border-gray-300 p-2"><strong>Nama</strong> <br /> {record.nama}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2"><strong>Deskripsi Foto</strong> <br /> {record.nama}</td>
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
