-- CreateTable
CREATE TABLE "anekdot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "siswa_id" INTEGER NOT NULL,
    "semester" INTEGER NOT NULL,
    "bulan" INTEGER NOT NULL,
    "guru" TEXT NOT NULL,
    "tempat" TEXT NOT NULL,
    "tanggal" DATETIME NOT NULL,
    "keterangan" TEXT NOT NULL,
    "a_agama" TEXT NOT NULL,
    "a_jati_diri" TEXT NOT NULL,
    "a_literasi" TEXT NOT NULL,
    "umpan_balik" TEXT NOT NULL,
    CONSTRAINT "anekdot_siswa_id_fkey" FOREIGN KEY ("siswa_id") REFERENCES "student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "bulan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bulan" INTEGER NOT NULL,
    "nama_bulan" TEXT NOT NULL
);
