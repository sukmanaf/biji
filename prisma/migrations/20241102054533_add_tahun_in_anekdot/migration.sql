/*
  Warnings:

  - Added the required column `tahun` to the `anekdot` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_anekdot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "siswa_id" INTEGER NOT NULL,
    "semester" INTEGER NOT NULL,
    "bulan" INTEGER NOT NULL,
    "tahun" INTEGER NOT NULL,
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
INSERT INTO "new_anekdot" ("a_agama", "a_jati_diri", "a_literasi", "bulan", "guru", "id", "keterangan", "semester", "siswa_id", "tanggal", "tempat", "umpan_balik") SELECT "a_agama", "a_jati_diri", "a_literasi", "bulan", "guru", "id", "keterangan", "semester", "siswa_id", "tanggal", "tempat", "umpan_balik" FROM "anekdot";
DROP TABLE "anekdot";
ALTER TABLE "new_anekdot" RENAME TO "anekdot";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
