"use client";

import React, { useRef,useEffect } from "react";
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
import Image from "next/image";
import HeaderPrint from "@/components/custom/headerPrint";

const chewy = Chewy({
  subsets: ['latin'],
  weight : ['400'] // Tambahkan subset yang dibutuhkan
});

interface Record {
  id?: number;
  siswa_id: string;
  minggu_ke: number;
  semester: number;
  a_agama: string;
  a_jati_diri: string;
  a_literasi: string;
  path_foto1: File; 
  path_foto2: File; 
  path_foto3: File; 
  semester1: File; 
  semester2: File; 
  keterangan1: string;
  keterangan2: string;
  keterangan3: string;
  nama:string;
  kelompok:string;
  ta:string;
  logo:File
  darul_ulum:File
  bg_foto:File
}



interface DataView {
  id?:number;
  nama: string;
  siswa: string;
  bulan: string;
  kelompok: string;
  guru: string;
  tahun: string;
  tahun_ajaran: string;
  semester: number;
  detail: { tujuan: string; konteks: string; kejadian: string; muncul: number }[];
}

interface ViewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  record: DataView | null;
}

export function ViewDialog({ isOpen, onClose, record }: ViewDialogProps) {
  const printRef = useRef<HTMLDivElement>(null);
  
  // Create Object URLs for File instances
  
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
      <DialogContent className="max-w-4xl w-4/5 md:w-2/3 lg:w-1/2 overflow-hidden">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
            {/* Detail dari karya ilmiah yang dipilih. */}
          </DialogDescription>
        </DialogHeader>
         <PerfectScrollbar style={{ maxHeight: "80vh", overflow: "hidden" }}>
          <div ref={printRef} >
          <HeaderPrint
            record={record}
            chewy={{ className: "font-chewy" }}
            judul="Ceklis Pencapaian"
          />
          
            
            <table className="table-auto w-full ">
              <tbody>
                <tr>
                  {/* Kolom Nama */}
                  <td className="w-1/6  ">Nama</td>
                  <td className="w-1/20 ">:</td>
                  <td className="w-6/12 ">{record.nama}</td>
                  
                  {/* Kolom Bulan */}
                  <td className="w-1/6  ">Bulan</td>
                  <td className="w-1/20 ">:</td>
                  <td className="w-1/2 ">{record.bulan}, {record.tahun}</td>
                </tr>
                <tr>
                  <td >Kelompok</td>
                  <td >:</td>
                  <td >{record.kelompok} </td>
                  
                  <td >Guru Kelas</td>
                  <td >:</td>
                  <td >{record.guru}</td>
                </tr>
              </tbody>
            </table>

            <table className="table-auto w-full mt-10 border border-gray-300 border-collapse">
              <thead className="bg-green-400">
                <tr className="border border-gray-300">
                  <td className="w-12 border border-gray-300 text-center" rowSpan={2}>
                    No
                  </td>
                  <td className="border border-gray-300 text-center" rowSpan={2}>
                    Tujuan Pembelajaran
                  </td>
                  <td className="border border-gray-300 text-center" colSpan={4}>
                    Hasil Pengamatan
                  </td>
                </tr>
                <tr className="border border-gray-300">
                  <td className="border border-gray-300 text-center">Konteks</td>
                  <td className="border border-gray-300 text-center">Belum Muncul</td>
                  <td className="border border-gray-300 text-center">Sudah Muncul</td>
                  <td className="border border-gray-300 text-center">Kejadian yang diamati</td>
                </tr>
              </thead>
              <tbody>
                {record.detail.map((item, index) => (
                   <tr key={item.id} className="border border-gray-300">
                   <td className="border border-gray-300 text-center align-top px-1 py-1">{index + 1}</td>
                   <td className="border border-gray-300 align-top px-1 py-1">{item.tujuan}</td>
                   <td className="border border-gray-300 align-top px-1 py-1">{item.konteks}</td>
                   <td className="border border-gray-300 text-center align-top px-1 py-1">
                     {item.muncul !== 1 && <span>&#10003;</span>}
                   </td>
                   <td className="border border-gray-300 text-center align-top px-1 py-1">
                     {item.muncul === 1 && <span>&#10003;</span>}
                   </td>
                   <td className="border border-gray-300 align-top px-1 py-1">{item.kejadian}</td>
                 </tr>
                ))}
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
