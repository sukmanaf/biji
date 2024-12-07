-- CreateTable
CREATE TABLE "foto_berseri" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "siswa_id" INTEGER NOT NULL,
    "munggu_ke" INTEGER NOT NULL,
    "a_agama" TEXT NOT NULL,
    "a_jati_diri" TEXT NOT NULL,
    "a_literasi" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "foto_berseri_file" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "keterangan" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "foto_berseri_id" INTEGER NOT NULL,
    CONSTRAINT "foto_berseri_file_foto_berseri_id_fkey" FOREIGN KEY ("foto_berseri_id") REFERENCES "foto_berseri" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
