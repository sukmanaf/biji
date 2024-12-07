-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_foto_berseri_file" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "keterangan" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "foto_berseri_id" INTEGER NOT NULL,
    CONSTRAINT "foto_berseri_file_foto_berseri_id_fkey" FOREIGN KEY ("foto_berseri_id") REFERENCES "foto_berseri" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_foto_berseri_file" ("file_path", "foto_berseri_id", "id", "keterangan") SELECT "file_path", "foto_berseri_id", "id", "keterangan" FROM "foto_berseri_file";
DROP TABLE "foto_berseri_file";
ALTER TABLE "new_foto_berseri_file" RENAME TO "foto_berseri_file";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
