import { DateTime } from 'luxon';

function parseDate(input) {
    // Mencoba berbagai format tanggal
    const formats = [
        'yyyy-MM-dd',       // ISO format
        'dd-MM-yyyy',       // Format Indonesia
        'MM/dd/yyyy',       // Format US
        'MMMM dd, yyyy',    // Format seperti November 01, 2023
        'dd MMMM yyyy',     // Format seperti 01 November 2023
        // Tambahkan format lain sesuai kebutuhan
    ];

    for (const format of formats) {
        const parsedDate = DateTime.fromFormat(input, format, { locale: 'id' });
        if (parsedDate.isValid) {
            return parsedDate.toFormat('dd MMMM yyyy'); // Format ke format yang diinginkan
        }
    }

    // Jika tidak ada format yang cocok
    throw new Error('Tanggal tidak valida');
}

export function formatDateToIndonesian(dateString) {
  try {
    const date = parseDate(dateString);
    const day = date.getDate();
    const monthNames = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  } catch (error) {
    console.error(error.message);
    return "Tanggal tidak validb";
  }
}