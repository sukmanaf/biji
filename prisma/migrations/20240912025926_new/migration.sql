-- CreateTable
CREATE TABLE "student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "kelompok" TEXT NOT NULL,
    "semester" TEXT NOT NULL,
    "tahun_ajaran" INTEGER NOT NULL,
    CONSTRAINT "student_tahun_ajaran_fkey" FOREIGN KEY ("tahun_ajaran") REFERENCES "tahun_ajaran" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tahun_ajaran" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tahun_ajaran" TEXT NOT NULL
);
