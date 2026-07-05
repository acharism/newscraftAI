
// ===============================
// NEWSCRAFT AI - RESULT FINAL
// ===============================

// ambil data utama
const data = JSON.parse(localStorage.getItem("berita"));

// ambil AI result
let ai = localStorage.getItem("beritaAI");

// area output
const hasil = document.getElementById("hasilBerita");

// fallback kalau kosong / null
if (!ai || ai === "null" || ai === "undefined" || ai.trim() === "") {
    ai = `
${data.deskripsi}

(⚠️ AI belum menghasilkan teks, tampilkan deskripsi asli)
`;
}

// render hasil
if (data) {

    hasil.innerHTML = `

        <h2>${data.judul}</h2>

        <hr>

        <div style="white-space:pre-line; line-height:1.6;">

            ${ai}

        </div>

        <hr>

        <p><b>Kategori:</b> ${data.kategori}</p>
        <p><b>Gaya:</b> ${data.gaya}</p>
        <p><b>Panjang:</b> ${data.panjang}</p>

    `;

} else {

    hasil.innerHTML = `
        <p style="color:red;">Data tidak ditemukan. Kembali ke halaman utama.</p>
    `;

}
// =========================
// Tombol Copy Berita
// =========================

const copyBtn = document.getElementById("copyBtn");

copyBtn.addEventListener("click", function(){

    const isiBerita = document.getElementById("hasilBerita").innerText;

    navigator.clipboard.writeText(isiBerita);

    alert("Berita berhasil disalin.");

});
// =========================
// Download Berita
// =========================

const downloadBtn = document.getElementById("downloadBtn");

downloadBtn.addEventListener("click", function(){

    const isiBerita = document.getElementById("hasilBerita").innerText;

    const file = new Blob([isiBerita], {
        type: "text/plain"
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(file);

    link.download = "Berita.txt";

    link.click();

});
// =========================
// Download PDF
// =========================

const pdfBtn = document.getElementById("pdfBtn");

if (pdfBtn) {

    pdfBtn.addEventListener("click", async function () {

        const { jsPDF } = window.jspdf;

        const element = document.getElementById("pdfContent");

        const canvas = await html2canvas(element, {
            scale: 2
        });

        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");

        const pageWidth = pdf.internal.pageSize.getWidth();

        const margin = 15;

        const imgWidth = pageWidth - (margin * 2);

        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(
            imgData,
            "PNG",
            margin,
            margin,
            imgWidth,
            imgHeight
        );

        pdf.save("Berita-NewsCraftAI.pdf");

    });

}