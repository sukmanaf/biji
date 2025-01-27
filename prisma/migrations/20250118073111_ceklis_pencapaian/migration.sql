-- CreateTable
CREATE TABLE "ceklis_pencapaian" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "siswa_id" INTEGER NOT NULL DEFAULT 1,
    "id_bulan" INTEGER NOT NULL,
    "semester" INTEGER NOT NULL,
    "tahun" INTEGER NOT NULL,
    CONSTRAINT "ceklis_pencapaian_siswa_id_fkey" FOREIGN KEY ("siswa_id") REFERENCES "student" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ceklis_pencapaian_id_bulan_fkey" FOREIGN KEY ("id_bulan") REFERENCES "bulan" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ceklis_pencapaian_detail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tujuan" TEXT NOT NULL,
    "konteks" TEXT NOT NULL,
    "muncul" INTEGER NOT NULL,
    "kejadian" TEXT NOT NULL,
    "ceklis_pencapaian_id" INTEGER NOT NULL,
    CONSTRAINT "ceklis_pencapaian_detail_ceklis_pencapaian_id_fkey" FOREIGN KEY ("ceklis_pencapaian_id") REFERENCES "ceklis_pencapaian" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_anekdot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "siswa_id" INTEGER NOT NULL,
    "semester" INTEGER NOT NULL,
    "id_bulan" INTEGER NOT NULL,
    "tahun" INTEGER NOT NULL,
    "tempat" TEXT NOT NULL,
    "tanggal" DATETIME,
    "keterangan" TEXT NOT NULL,
    "a_agama" TEXT NOT NULL,
    "a_jati_diri" TEXT NOT NULL,
    "a_literasi" TEXT NOT NULL,
    "umpan_balik" TEXT NOT NULL,
    CONSTRAINT "anekdot_siswa_id_fkey" FOREIGN KEY ("siswa_id") REFERENCES "student" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "anekdot_id_bulan_fkey" FOREIGN KEY ("id_bulan") REFERENCES "bulan" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_anekdot" ("a_agama", "a_jati_diri", "a_literasi", "id", "id_bulan", "keterangan", "semester", "siswa_id", "tahun", "tanggal", "tempat", "umpan_balik") SELECT "a_agama", "a_jati_diri", "a_literasi", "id", "id_bulan", "keterangan", "semester", "siswa_id", "tahun", "tanggal", "tempat", "umpan_balik" FROM "anekdot";
DROP TABLE "anekdot";
ALTER TABLE "new_anekdot" RENAME TO "anekdot";
CREATE TABLE "new_student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "kelompok" TEXT NOT NULL,
    "guru" TEXT,
    "tahun_ajaran" INTEGER NOT NULL,
    CONSTRAINT "student_tahun_ajaran_fkey" FOREIGN KEY ("tahun_ajaran") REFERENCES "tahun_ajaran" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_student" ("guru", "id", "kelompok", "nama", "tahun_ajaran") SELECT "guru", "id", "kelompok", "nama", "tahun_ajaran" FROM "student";
DROP TABLE "student";
ALTER TABLE "new_student" RENAME TO "student";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
