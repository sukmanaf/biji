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
                    <strong>Foto Berseri </strong>
                  </label>
                  <label className={` ${chewy.className} block text-3xl mt-2`}>
                    <strong>{record.ta} </strong>
                  </label>
                </div>
                <div className="grid grid-cols-7 items-start justify-start  mt-2">
                  <div className={` ${chewy.className} col-span-2 text-xl`}>Nama <label className="float-end">: </label></div>
                  <div className={` ${chewy.className} col-span-5 text-xl ml-1`}> {record.nama} </div>
                </div>
                <div className="grid grid-cols-7 items-start justify-start ">
                  <div className={` ${chewy.className} col-span-2 text-xl`}>Kelompok<label className="float-end">: </label></div>
                  <div className={` ${chewy.className} col-span-5 text-xl ml-1`}> {record.kelompok}</div>
                </div>
                <div className="grid grid-cols-7 items-start justify-start ">
                  <div className={` ${chewy.className} col-span-2 text-xl`}>Minggu Ke<label className="float-end">: </label></div>
                  <div className={` ${chewy.className} col-span-5 text-xl ml-1`}> {record.minggu_ke}</div>
                </div>
              </div>
            </div>
          
            
            <div className="grid grid-cols-4 gap-40 mt-5">
            
              <div className="flex flex-col items-center justify-center ml-40">
                {record?.path_foto1 && (
                  <>
                    <div 
                      className="w-44 h-60 g-center "
                      style={{
                        backgroundImage: `url("${record?.bg_foto}")` ,
                        backgroundSize: 'cover',

                      }}
                    >
                    <label><center  className={` ${chewy.className} font-bold text-sm mt-1`}>Foto 1</center></label> 

                      <div className="flex justify-center items-center w-full h-full ">
                        <img 
                          src={record?.path_foto1 instanceof File ? URL.createObjectURL(record.path_foto1) : record.path_foto1} 
                          alt="Foto 1" 
                          className="max-h-36 object-contain" 
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
                        backgroundImage: `url("${record?.bg_foto}")` ,
                        backgroundSize: 'cover',

                      }}
                    >
                    <label><center  className={` ${chewy.className} font-bold text-sm mt-1`}>Foto 2</center></label> 

                      <div className="flex justify-center items-center w-full h-full">
                        <img 
                          src={record?.path_foto2 instanceof File ? URL.createObjectURL(record.path_foto2) : record.path_foto2} 
                          alt="Foto 2" 
                          className="max-h-36  object-contain" 
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
                        backgroundImage: `url("${record?.bg_foto}")` ,
                        backgroundSize: 'cover',

                      }}
                    >
                    <label><center  className={` ${chewy.className} font-bold text-sm mt-1`}>Foto 3</center></label> 

                      <div className="flex justify-center items-center w-full h-full ">
                        <img 
                          src={record?.path_foto3 instanceof File ? URL.createObjectURL(record.path_foto3) : record.path_foto3} 
                          alt="Foto 3" 
                          className="max-h-36  object-contain" 
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
              <table className="w-[90%] mt-5 ml-8 ">
                <tr className="border-2 border-pink-600">
                  <td className="p-2">
                      <span className="text-xs font-bold block">
                        Keterangan foto :
                      </span>
                      <span className="text-xs font-bold block">
                          - Foto 1 {record.keterangan1}
                      </span>
                      <span className="text-xs font-bold block">
                          - Foto 2 {record.keterangan2}
                      </span>
                      <span className="text-xs font-bold block">
                          - Foto 3 {record.keterangan3}
                      </span>
                  </td>
                </tr>
                <tr className="border-2 border-pink-600">
                  <td className="p-2">
                    <span className="text-xs font-bold block">
                        Analisis nilai agama dan budi pekerti :
                    </span>
                    <span className="text-xs font-bold block">
                      {record.a_agama} 
                    </span>
                  </td>
                </tr>
                <tr className="border-2 border-pink-600">
                  <td className="p-2">
                    <span className="text-xs font-bold block">
                        Analisis jati diri : 
                    </span>
                    <span className="text-xs font-bold block">
                      {record.a_jati_diri} 
                    </span>
                  </td>
                </tr>
                <tr className="border-2 border-pink-600">
                  <td className="p-2">
                    <span className="text-xs font-bold block">
                        Analisis literasi dan steam : 
                    </span>
                    <span className="text-xs font-bold block">
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
