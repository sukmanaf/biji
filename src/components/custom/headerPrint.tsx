import React from "react";
import Image from "next/image";

// Definisikan tipe untuk props
interface HeaderPrintProps {
  record: {
    semester: number;
    tahun_ajaran: string;
  };
  chewy: { className: string };
  judul: string;
}

const HeaderPrint: React.FC<HeaderPrintProps> = ({
  record,
  chewy,
  judul
}) => {
  return (
    <div>
      {/* Bagian atas */}
      <div className="grid grid-cols-4">
        <div className="col-span-1 flex items-end justify-end">
          <Image
            src="/default/logo.png" // Path relatif ke public, pastikan file ada di public
            alt="Logo"
            width={80} // Set width
            height={80} // Set height
          />
        </div>
        <div className="col-span-2 flex items-center justify-center">
          {record.semester === 1 ? (
            <Image
              src="/default/semester1.png" // Path relatif ke public
              alt="sm1"
              width={220} // Set width
              height={180} // Set height
            />
          ) : (
            <Image
              src="/default/semester2.png" // Path relatif ke public
              alt="sm2"
              width={220} // Set width
              height={180} // Set height
            />
          )}
        </div>
      </div>

      {/* Bagian bawah */}
      <div className="grid grid-cols-7">
        <div className="col-span-4 flex items-center justify-center">
          <Image
            className="mb-10"
            src="/default/darul_ulum.png" // Path relatif ke public
            alt="Logo"
            width={280} // Set width
            height={280} // Set height
          />
        </div>
        <div className="col-span-3 mt-7">
          <div className="flex flex-col items-center justify-center">
            <label className={`${chewy.className} block text-4xl -mt-6`}>
              <strong>{judul}</strong>
            </label>
            <label className={`${chewy.className} block text-3xl mt-2`}>
              <strong>{record.tahun_ajaran} </strong>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderPrint;
