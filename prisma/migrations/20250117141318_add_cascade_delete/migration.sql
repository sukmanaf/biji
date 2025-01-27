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
    CONSTRAINT "anekdot_id_bulan_fkey" FOREIGN KEY ("id_bulan") REFERENCES "bulan" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_anekdot" ("a_agama", "a_jati_diri", "a_literasi", "id", "id_bulan", "keterangan", "semester", "siswa_id", "tahun", "tanggal", "tempat", "umpan_balik") SELECT "a_agama", "a_jati_diri", "a_literasi", "id", "id_bulan", "keterangan", "semester", "siswa_id", "tahun", "tanggal", "tempat", "umpan_balik" FROM "anekdot";
DROP TABLE "anekdot";
ALTER TABLE "new_anekdot" RENAME TO "anekdot";
CREATE TABLE "new_foto_berseri" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "siswa_id" INTEGER NOT NULL,
    "minggu_ke" INTEGER NOT NULL,
    "semester" INTEGER NOT NULL DEFAULT 1,
    "a_agama" TEXT NOT NULL,
    "a_jati_diri" TEXT NOT NULL,
    "a_literasi" TEXT NOT NULL,
    CONSTRAINT "foto_berseri_siswa_id_fkey" FOREIGN KEY ("siswa_id") REFERENCES "student" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_foto_berseri" ("a_agama", "a_jati_diri", "a_literasi", "id", "minggu_ke", "semester", "siswa_id") SELECT "a_agama", "a_jati_diri", "a_literasi", "id", "minggu_ke", "semester", "siswa_id" FROM "foto_berseri";
DROP TABLE "foto_berseri";
ALTER TABLE "new_foto_berseri" RENAME TO "foto_berseri";
CREATE TABLE "new_karya" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "siswa_id" INTEGER NOT NULL,
    "tanggal" DATETIME NOT NULL,
    "a_agama" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,
    "a_jati_diri" TEXT NOT NULL,
    "a_literasi" TEXT NOT NULL,
    "path_foto" TEXT NOT NULL,
    CONSTRAINT "karya_siswa_id_fkey" FOREIGN KEY ("siswa_id") REFERENCES "student" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_karya" ("a_agama", "a_jati_diri", "a_literasi", "id", "path_foto", "semester", "siswa_id", "tanggal") SELECT "a_agama", "a_jati_diri", "a_literasi", "id", "path_foto", "semester", "siswa_id", "tanggal" FROM "karya";
DROP TABLE "karya";
ALTER TABLE "new_karya" RENAME TO "karya";
CREATE TABLE "new_student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "kelompok" TEXT NOT NULL,
    "guru" TEXT,
    "tahun_ajaran" INTEGER NOT NULL,
    CONSTRAINT "student_tahun_ajaran_fkey" FOREIGN KEY ("tahun_ajaran") REFERENCES "tahun_ajaran" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_student" ("guru", "id", "kelompok", "nama", "tahun_ajaran") SELECT "guru", "id", "kelompok", "nama", "tahun_ajaran" FROM "student";
DROP TABLE "student";
ALTER TABLE "new_student" RENAME TO "student";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
