import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Fungsi untuk memasukkan data bulan dalam bahasa Indonesia
async function insertBulan() {
  // Daftar nama bulan dalam bahasa Indonesia
  const bulanIndonesia = [
    { bulan: 1, nama_bulan: 'Januari' },
    { bulan: 2, nama_bulan: 'Februari' },
    { bulan: 3, nama_bulan: 'Maret' },
    { bulan: 4, nama_bulan: 'April' },
    { bulan: 5, nama_bulan: 'Mei' },
    { bulan: 6, nama_bulan: 'Juni' },
    { bulan: 7, nama_bulan: 'Juli' },
    { bulan: 8, nama_bulan: 'Agustus' },
    { bulan: 9, nama_bulan: 'September' },
    { bulan: 10, nama_bulan: 'Oktober' },
    { bulan: 11, nama_bulan: 'November' },
    { bulan: 12, nama_bulan: 'Desember' },
  ];

  // Masukkan data bulan satu per satu ke dalam tabel
  try {
    for (const bulan of bulanIndonesia) {
      await prisma.bulan.create({
        data: bulan,
      });
    }
    console.log("Data bulan berhasil dimasukkan!");
  } catch (error) {
    console.error("Terjadi kesalahan saat memasukkan data bulan:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Panggil fungsi untuk memasukkan data
insertBulan();
