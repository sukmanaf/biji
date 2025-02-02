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
import HeaderPrint from "@/components/custom/headerPrint";
import Image from "next/image";

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

interface ViewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  record: Record | null;
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

   const bg_foto = "default/bg_foto.png"

   
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
            judul="Dokumentasi Hasil Karya"
          />
            
            <div className="grid grid-cols-4 gap-40 mt-5">
            
              <div className="flex flex-col items-center justify-center ml-40">
                {record?.path_foto1 && (
                  <>
                    <div 
                      className="w-44 h-60 g-center "
                      style={{
                        backgroundImage: `url("${bg_foto}")` ,
                        backgroundSize: 'cover',

                      }}
                    >
                    <label><center  className={` ${chewy.className} font-bold text-sm mt-1`}>Foto 1</center></label> 

                      <div className="flex justify-center items-center w-full h-full ">
                        <Image 
                          src={record?.path_foto1 instanceof File ? URL.createObjectURL(record.path_foto1) : record.path_foto1} 
                          alt="Foto 1" 
                          className="max-h-36 object-contain" 
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="flex flex-col items-end justify-center ml-56">
                {record?.path_foto2 && (
                  <>
                  
                    <div 
                      className="w-44 h-60 g-center "
                      style={{
                        backgroundImage: `url("${bg_foto}")` ,
                        backgroundSize: 'cover',

                      }}
                    >
                    <label><center  className={` ${chewy.className} font-bold text-sm mt-1`}>Foto 2</center></label> 

                      <div className="flex justify-center items-center w-full h-full">
                        <Image 
                          src={record?.path_foto2 instanceof File ? URL.createObjectURL(record.path_foto2) : record.path_foto2} 
                          alt="Foto 2" 
                          className="max-h-36  object-contain" 
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="flex flex-col items-center justify-center ml-28">
                {record?.path_foto3 && (
                  <>
                    <div 
                      className="w-44 h-60 g-center "
                      style={{
                        backgroundImage: `url("${bg_foto}")` ,
                        backgroundSize: 'cover',

                      }}
                    >
                    <label><center  className={` ${chewy.className} font-bold text-sm mt-1`}>Foto 3</center></label> 

                      <div className="flex justify-center items-center w-full h-full ">
                        <Image 
                          src={record?.path_foto3 instanceof File ? URL.createObjectURL(record.path_foto3) : record.path_foto3} 
                          alt="Foto 3" 
                          className="max-h-36  object-contain" 
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
              <table className="w-[90%] mt-5 ml-8 ">
                <tr className="border-2 border-blue-200">
                  <td className="p-2">
                      <span className="text-xs font-bold block">
                        Keterangan foto :
                      </span>
                      <span className="text-xs  block">
                          - Foto 1 {record.keterangan1}
                      </span>
                      <span className="text-xs  block">
                          - Foto 2 {record.keterangan2}
                      </span>
                      <span className="text-xs  block">
                          - Foto 3 {record.keterangan3}
                      </span>
                  </td>
                </tr>
                <tr className="border-2 border-blue-200">
                  <td className="p-2">
                    <span className="text-xs font-bold block">
                        Analisis nilai agama dan budi pekerti :
                    </span>
                    <span className="text-xs  block">
                      {record.a_agama} 
                    </span>
                  </td>
                </tr>
                <tr className="border-2 border-blue-200">
                  <td className="p-2">
                    <span className="text-xs font-bold block">
                        Analisis jati diri : 
                    </span>
                    <span className="text-xs  block">
                      {record.a_jati_diri} 
                    </span>
                  </td>
                </tr>
                <tr className="border-2 border-blue-200">
                  <td className="p-2">
                    <span className="text-xs font-bold block">
                        Analisis literasi dan steam : 
                    </span>
                    <span className="text-xs  block">
                      {record.a_literasi} 
                    </span>
                  </td>
                </tr>
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
