/*
  Warnings:

  - Added the required column `guru` to the `karya` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semester` to the `karya` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal` to the `karya` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_karya" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "siswa_id" INTEGER NOT NULL,
    "tanggal" DATETIME NOT NULL,
    "a_agama" TEXT NOT NULL,
    "guru" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,
    "a_jati_diri" TEXT NOT NULL,
    "a_literasi" TEXT NOT NULL,
    "path_foto" TEXT NOT NULL,
    CONSTRAINT "karya_siswa_id_fkey" FOREIGN KEY ("siswa_id") REFERENCES "student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_karya" ("a_agama", "a_jati_diri", "a_literasi", "id", "path_foto", "siswa_id") SELECT "a_agama", "a_jati_diri", "a_literasi", "id", "path_foto", "siswa_id" FROM "karya";
DROP TABLE "karya";
ALTER TABLE "new_karya" RENAME TO "karya";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
