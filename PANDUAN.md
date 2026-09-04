# Panduan Menjalankan & Mempublikasikan Website

Website ini dibuat dengan Astro. Hasil akhirnya adalah file statis, jadi tidak butuh server khusus.

## 1. Persiapan (sekali saja)

1. Install **Node.js** versi 22 dari https://nodejs.org (pilih yang "LTS").
2. Install **Git** dari https://git-scm.com (di Mac biasanya sudah ada).
3. Buat akun gratis di https://github.com dan https://vercel.com (daftar Vercel pakai akun GitHub supaya langsung terhubung).

## 2. Menjalankan di komputer sendiri

Buka Terminal, masuk ke folder website, lalu jalankan:

```bash
npm install
npm run dev
```

Buka http://localhost:4321 di browser. Tekan `Ctrl + C` di Terminal untuk berhenti.

## 3. Upload ke GitHub

Di Terminal, masih di folder website:

```bash
git init
git add .
git commit -m "Website portfolio"
```

Lalu di GitHub:

1. Klik **New repository**, beri nama misalnya `aprizal-portfolio`, biarkan kosong (jangan centang README), klik **Create**.
2. GitHub akan menampilkan perintah. Jalankan dua baris ini di Terminal (ganti `USERNAME` dengan username GitHub Anda):

```bash
git remote add origin https://github.com/USERNAME/aprizal-portfolio.git
git push -u origin main
```

## 4. Publikasikan di Vercel

1. Masuk ke https://vercel.com, klik **Add New → Project**.
2. Pilih repository `aprizal-portfolio` lalu klik **Import**.
3. Vercel otomatis mendeteksi **Astro**. Tidak perlu mengubah apa pun. Klik **Deploy**.
4. Tunggu 1–2 menit. Website langsung online di alamat sementara seperti `aprizal-portfolio.vercel.app`.

## 5. Pasang domain aprizal.me

1. Di Vercel, buka project → **Settings → Domains**.
2. Tambahkan `www.aprizal.me`, lalu tambahkan juga `aprizal.me`.
3. Jadikan `www.aprizal.me` sebagai **Primary**. Vercel otomatis mengarahkan `aprizal.me` ke `www`.
4. Vercel akan menampilkan DNS record yang harus dipasang. Buka tempat domain dibeli (registrar), lalu buat record berikut:
   - Tipe **A**, nama `@` (atau `aprizal.me`), nilai `76.76.21.21`
   - Tipe **CNAME**, nama `www`, nilai `cname.vercel-dns.com`
5. Tunggu sampai di halaman Domains Vercel statusnya berubah jadi **Valid** (biasanya beberapa menit, paling lama 1 hari). HTTPS otomatis aktif.

Catatan: jika domain ini masih terpasang di project Vercel yang lama, lepas dulu dari project lama (Settings → Domains → Remove) atau pindahkan ke project baru.

## 6. Mengubah isi website di kemudian hari

- **Teks case study**: edit file di `src/content/case-studies/` (`snaphire.md`, `klyra.md`, `flowforge.md`).
- **Gambar**: ganti file di `public/images/` dengan nama yang sama (format `.webp`).
- **Resume**: ganti file `public/assets/resume.pdf`.
- **Teks halaman depan**: edit `src/pages/index.astro`.

Setiap kali ada perubahan, jalankan:

```bash
git add .
git commit -m "Update website"
git push
```

Vercel otomatis membangun ulang dan website terbaru online dalam 1–2 menit.
