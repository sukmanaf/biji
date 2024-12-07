/*
  Warnings:

  - You are about to drop the column `munggu_ke` on the `foto_berseri` table. All the data in the column will be lost.
  - Added the required column `minggu_ke` to the `foto_berseri` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_foto_berseri" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "siswa_id" INTEGER NOT NULL,
    "minggu_ke" INTEGER NOT NULL,
    "a_agama" TEXT NOT NULL,
    "a_jati_diri" TEXT NOT NULL,
    "a_literasi" TEXT NOT NULL,
    CONSTRAINT "foto_berseri_siswa_id_fkey" FOREIGN KEY ("siswa_id") REFERENCES "student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_foto_berseri" ("a_agama", "a_jati_diri", "a_literasi", "id", "siswa_id") SELECT "a_agama", "a_jati_diri", "a_literasi", "id", "siswa_id" FROM "foto_berseri";
DROP TABLE "foto_berseri";
ALTER TABLE "new_foto_berseri" RENAME TO "foto_berseri";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
