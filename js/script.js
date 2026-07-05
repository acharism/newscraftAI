
// ===============================
// NEWSCRAFT AI - SCRIPT FINAL
// ===============================

const form = document.getElementById("newsForm");

form.addEventListener("submit", async function (event) {

    event.preventDefault();
    
    // Ambil tombol Generate
const tombol = form.querySelector("button[type='submit']");

// Ubah tampilan tombol
tombol.disabled = true;
tombol.innerHTML = "⏳ Sedang membuat berita...";

// Cursor loading
document.body.style.cursor = "wait";

    // ambil input
    const judul = document.getElementById("judul").value.trim();
    const deskripsi = document.getElementById("deskripsi").value.trim();
    const kategori = document.getElementById("kategori").value;
    const gaya = document.getElementById("gaya").value;
    const panjang = document.querySelector('input[name="panjang"]:checked').value;

    // validasi
    if (!judul || !deskripsi) {
        alert("Judul dan Deskripsi wajib diisi!");
        return;
    }

    // simpan data dasar
    const berita = {
        judul,
        deskripsi,
        kategori,
        gaya,
        panjang
    };

    localStorage.setItem("berita", JSON.stringify(berita));

    // default AI dulu (biar tidak null)
    localStorage.setItem("beritaAI", "");

    // ===== AI PROCESS =====
    try {

        if (typeof generateNews === "function") {

            const prompt = `
Buatkan berita profesional dari data berikut:

Judul: ${judul}
Deskripsi: ${deskripsi}
Kategori: ${kategori}
Gaya: ${gaya}
Panjang: ${panjang}

Buat dalam format:
- Judul menarik
- Lead berita
- Isi berita
- Penutup
`;

            const hasilAI = await generateNews(prompt);

            localStorage.setItem("beritaAI", hasilAI);

        }

    } catch (error) {

        console.log("AI Error:", error);

        localStorage.setItem("beritaAI", "");

    }

    // pindah halaman (WAJIB di akhir)
    window.location.href = "result.html";

});