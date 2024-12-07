/*
  Warnings:

  - You are about to drop the column `semester` on the `student` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "kelompok" TEXT NOT NULL,
    "tahun_ajaran" INTEGER NOT NULL,
    CONSTRAINT "student_tahun_ajaran_fkey" FOREIGN KEY ("tahun_ajaran") REFERENCES "tahun_ajaran" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_student" ("id", "kelompok", "nama", "tahun_ajaran") SELECT "id", "kelompok", "nama", "tahun_ajaran" FROM "student";
DROP TABLE "student";
ALTER TABLE "new_student" RENAME TO "student";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
