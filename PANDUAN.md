# Panduan Mengedit & Menambah Isi Website

Website ini dibuat dengan **Astro** dan di-deploy otomatis oleh **Vercel** setiap kali branch `main` di GitHub berubah.
Panduan ini menjelaskan file mana yang diedit untuk tiap jenis perubahan, dan langkah aman sampai perubahan tampil di **www.aprizal.me**.

---

## 0. Alur kerja singkat (selalu sama)

1. **Jalankan website di komputer** → `npm run dev`, buka http://localhost:4321
2. **Edit file** yang sesuai (lihat bagian 2–6).
3. **Cek hasilnya** di browser. Cek juga tampilan HP (perkecil jendela browser).
4. **Build** untuk memastikan tidak ada error → `npm run build` (harus diakhiri `Complete!`).
5. **Commit & push** ke GitHub (bagian 8). Vercel otomatis meng-online-kan dalam 1–2 menit.

> Kalau build gagal, **jangan push**. Perbaiki dulu errornya (lihat bagian 9).

---

## 1. Menjalankan di komputer sendiri

Pertama kali (atau setelah `package.json` berubah):

```bash
npm install
```

Setiap kali mau bekerja:

```bash
npm run dev
```

Buka http://localhost:4321. Tekan `Ctrl + C` di Terminal untuk berhenti.

Perubahan biasanya langsung terlihat. Jika tidak (terutama setelah mengubah file `.md` atau menambah gambar), hentikan dengan `Ctrl + C`, jalankan lagi `npm run dev`, lalu hard refresh browser (**Cmd + Shift + R**).

---

## 2. Peta file: mau ubah apa, edit di mana

| Yang ingin diubah | File |
|---|---|
| Nama, role, lokasi, email, link LinkedIn/Instagram | `src/data/site.ts` |
| Resume (PDF) | ganti file `public/assets/resume.pdf` (nama tetap sama) |
| Teks besar di Home ("Designing simple, intuitive…") | `src/pages/index.astro` |
| Ajakan di bawah Home ("Let's build something meaningful together.") | `src/pages/index.astro` |
| Teks About (statement, paragraf, skills, tools) | `src/data/about.ts` |
| Foto About | ganti file `public/images/about/profile.webp` |
| Isi case study (teks & gambar) | `src/content/case-studies/{nama}.md` |
| Gambar case study | `public/images/{nama}/` |
| Warna latar kartu project di Home/Work | `src/data/projectArt.ts` |
| Item Playground | `src/content/playground/{nama}.md` + gambar di `public/images/playground/{nama}/` |
| Menampilkan / menyembunyikan Playground | `features.playground` di `src/data/site.ts` |
| Favicon & icon | `public/favicon.ico`, `favicon-32x32.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` |
| Gambar preview saat link dibagikan (WhatsApp, LinkedIn, dll.) | `public/og-home.jpg` (1200×630) |
| Warna, jarak, ukuran font global | `src/styles/tokens.css` (hati-hati, berpengaruh ke seluruh website) |

Aturan umum:
- **Hanya ganti teks di antara tanda kutip** atau di antara tag HTML. Jangan hapus tanda kutip, koma, `<` `>`, atau `---`.
- **Ganti gambar dengan nama file yang sama** jika tidak ingin menyentuh kode.

---

## 3. Mengubah teks umum

### Email, sosial media, nama
Buka `src/data/site.ts`. Contoh mengganti email:

```ts
email: 'aprizaltriansyah24@gmail.com',
```

Email ini otomatis dipakai di Home, About, dan footer.

### Halaman About
Buka `src/data/about.ts`:
- `statement` → kalimat besar di atas.
- `paragraphs` → paragraf; tiap paragraf di dalam tanda kutip, dipisah koma.
- `designSkills`, `tools` → daftar; tambah item baru dengan format `'Nama Skill',`.

### Teks Home
Buka `src/pages/index.astro`. Kalimat hero ada di baris dengan class `home-hero__statement`. Kalimat itu dipecah ke beberapa `<span>` untuk desain dua warna, jadi ubah **hanya teks di dalam `<span>`**.
Ada juga `description="…"` di bagian atas file. Itu teks untuk Google & preview link; samakan jika kalimat hero berubah.

---

## 4. Gambar: aturan yang perlu diingat

- **Format:** pakai **WebP** (`.webp`). Konversi PNG/JPG ke WebP bisa lewat https://squoosh.app (quality 85–90).
- **Ukuran:** lebar 1600–2400 px sudah cukup tajam untuk layar retina. Hindari file di atas ~500 KB.
- **Nama file:** huruf kecil, tanpa spasi, pakai tanda hubung. Contoh: `ui-dashboard.webp`.
- **Lokasi:** `public/images/{nama-project}/`. Di kode ditulis **tanpa** `public`, contoh: `/images/klyra/ui-dashboard.webp`.
- **Versi kecil (opsional):** website otomatis memakai file versi kecil jika ada di sebelahnya dengan akhiran lebar, misalnya `cover-800w.webp`, `cover-1200w.webp` (lebar yang dikenali: 640, 800, 1024, 1200, 1600). Ini membuat website lebih cepat di HP, tapi tidak wajib.
- **Teks alt:** setiap gambar punya `alt`, yaitu deskripsi singkat isi gambar (untuk pembaca layar & Google). Isi dengan jujur dan spesifik.
- **Jangan simpan file mentah** (PNG besar, PSD, Figma export yang tidak dipakai) di folder `public/`. Semua isi `public/` ikut ter-upload ke website.

**Mengganti foto About:** siapkan foto persegi (1:1), kepala tidak terlalu dekat ke tepi atas (foto ditampilkan dalam lingkaran), simpan sebagai `public/images/about/profile.webp`.

---

## 5. Case study

Setiap case study = **satu file** di `src/content/case-studies/`. Nama file menjadi alamat halaman:
`klyra.md` → `www.aprizal.me/work/klyra/`

File terdiri dari dua bagian:
1. **Frontmatter**: data di antara dua garis `---` di bagian paling atas.
2. **Isi halaman**: HTML dengan class `cs-…` di bawahnya.

### 5a. Mengedit case study yang ada
- **Teks**: ubah teks di antara tag, misalnya isi `<h2 class="cs-title">…</h2>` atau `<p class="cs-text">…</p>`.
- **Gambar**: ganti file di `public/images/{nama}/` dengan nama yang sama, atau ubah `src="…"` dan `alt="…"` di tag `<img>`.
- **Jangan mengubah nama class** (`cs-section`, `cs-head`, dst.). Class itulah yang mengatur tampilan & jarak.
- Pastikan setiap tag yang dibuka juga ditutup (`<section>` … `</section>`).

### 5b. Isi frontmatter (wajib semua kecuali yang ditandai opsional)

| Field | Fungsi |
|---|---|
| `title` | Nama project |
| `description` | Deskripsi untuk Google & preview link |
| `summary` | Paragraf singkat di kartu halaman Work dan kartu "Next case study" |
| `tagline` | Label pendek yang muncul saat kartu di Home di-hover, misalnya `"Personal finance app"` |
| `type` | Label jenis, misalnya `"Mobile app"` / `"Web app"` |
| `cover`, `coverAlt` | Gambar kartu di Home/Work + deskripsinya |
| `heroImage`, `heroAlt` | Gambar besar di atas halaman case study |
| `heroLayout` | `"stacked"` (gambar lebar, cocok untuk web) atau `"split"` (cocok untuk mockup HP) |
| `heroFill` *(opsional)* | `true` = gambar hero memenuhi kotak tanpa padding |
| `heroDevice` *(opsional)* | `true` = mockup HP kecil di tengah (tidak diperbesar) |
| `template` | Selalu `"editorial"` |
| `role`, `year`, `tags` | Info project; `tags` berupa daftar `["…", "…"]` |
| `meta` | Baris info di bawah judul (Category, Role, Year, …) |
| `order` | Urutan di Home & Work (1 = paling atas). "Next case study" mengikuti urutan ini |
| `outroTitle` | Judul penutup, misalnya `"Thanks for reading."` |
| `outroText` *(opsional)* | Kalimat penutup di bawahnya |

### 5c. Menambah case study baru
1. Buat folder gambar `public/images/{nama-baru}/` dan masukkan gambar WebP (minimal `cover.webp` dan `hero.webp`).
2. **Salin** case study yang paling mirip (web → `flowforge.md` / `evora.md`, mobile → `klyra.md` / `snaphire.md`), lalu ubah nama filenya, misalnya `src/content/case-studies/nama-baru.md`.
3. Ubah semua isi frontmatter: judul, teks, path gambar (`/images/nama-baru/...`), `order`.
4. Ubah isi halaman: ganti teks & gambar per section. Hapus section yang tidak dibutuhkan (hapus **satu blok utuh** dari `<section …>` sampai `</section>`).
5. (Opsional) Tambahkan warna latar kartu di `src/data/projectArt.ts`:

   ```ts
   'nama-baru': { tint: '#e8eef7', fit: 'contain', position: '50% 50%' },
   ```

   Jika tidak ditambahkan, kartu memakai warna abu-abu netral.
6. **Restart** `npm run dev`, cek halaman `/work/nama-baru/`, Home, dan Work.

Menghapus case study: hapus file `.md`-nya dan folder gambarnya. Sesuaikan `order` case study lain jika perlu.

---

## 6. Playground

Setiap item Playground = satu file `.md` di `src/content/playground/` dan satu folder gambar.
Item tampil di halaman `/playground/` dan di section Playground pada Home. Saat diklik, terbuka popup berisi gambar-gambarnya.

1. Simpan gambar di `public/images/playground/{nama}/`, misalnya `01-cover.webp`, `02-detail.webp`. Usahakan **lebar semua gambar sama** supaya menyambung rapi di popup.
2. Buat `src/content/playground/{nama}.md`:

   ```md
   ---
   title: "Judul Item"
   category: "UI/UX Design"
   year: 2026
   thumbnail:
     src: "/images/playground/{nama}/01-cover.webp"
     alt: "Deskripsi gambar thumbnail"
   images:
     - src: "/images/playground/{nama}/01-cover.webp"
       alt: "Deskripsi gambar 1"
     - src: "/images/playground/{nama}/02-detail.webp"
       alt: "Deskripsi gambar 2"
   order: 2
   ---
   ```

   - `thumbnail` = gambar di kartu (boleh berbeda dari gambar pertama di popup).
   - `images` = urutan gambar di popup, dari atas ke bawah.
   - `order` = posisi di galeri (1 = paling depan).
   - Tambahkan `draft: true` untuk menyembunyikan sementara tanpa menghapus.
3. Restart `npm run dev` dan cek `/playground/`.

File yang namanya diawali `_` (seperti `_README.md`) tidak ditampilkan.

---

## 7. Icon, favicon & gambar preview link

- **Favicon/icon**: semua dibuat dari satu foto persegi. Jika ingin mengganti, siapkan gambar persegi lalu ekspor ke ukuran berikut dengan nama file yang sama:
  `favicon.ico` (16/32/48), `favicon-32x32.png` (32), `apple-touch-icon.png` (180), `icon-192.png` (192), `icon-512.png` (512). Situs seperti https://realfavicongenerator.net bisa membantu.
- **Preview link (OG image)**: `public/og-home.jpg`, ukuran **1200×630**. Jika diganti, perbarui juga teks `alt` di `ogImage` pada `src/data/site.ts`.
- Browser & media sosial menyimpan cache gambar ini cukup lama, jadi perubahan bisa butuh waktu untuk terlihat.

---

## 8. Menyimpan ke GitHub & meng-online-kan

Jalankan di Terminal, di folder project:

```bash
npm run build          # wajib berhasil (Complete!)
git status             # lihat file apa saja yang berubah
```

Periksa daftar dari `git status`. Pastikan tidak ada file yang tidak seharusnya ikut: `.env`, password/token, file mentah besar, atau folder backup. Lalu:

```bash
git add .              # atau sebutkan file satu per satu: git add src/data/about.ts
git commit -m "Jelaskan singkat perubahannya"
git fetch origin
git status             # harus "ahead of 'origin/main'", BUKAN "behind"/"diverged"
git push origin main
```

Contoh pesan commit yang jelas: `"Add Playground item: Banking App"`, `"Update About text"`, `"Replace Klyra cover image"`.

Setelah push, cek progres deploy di dashboard Vercel, lalu buka www.aprizal.me (hard refresh: **Cmd + Shift + R**).

Jangan pernah memakai `git push --force`.

---

## 9. Kalau ada masalah

| Masalah | Solusi |
|---|---|
| `npm run build` error | Baca pesan error, biasanya menyebut nama file & baris. Penyebab tersering: tanda kutip/koma hilang di frontmatter, field wajib belum diisi, atau path gambar salah. |
| Perubahan tidak muncul di `npm run dev` | Hentikan (`Ctrl + C`), jalankan lagi `npm run dev`, hard refresh browser. |
| Gambar tidak muncul | Cek path: diawali `/images/…` (tanpa `public`), nama file & huruf besar/kecil persis sama. |
| Ingin membatalkan perubahan sebuah file (belum di-commit) | `git checkout -- path/ke/file` |
| Sudah di-push tapi ingin membatalkan commit terakhir | `git revert HEAD` lalu `git push origin main` (aman, tidak menghapus riwayat). |
| `git status` menunjukkan "behind" / "diverged" | Jangan push dulu. Jalankan `git pull origin main`, cek ulang website, lalu push. |

---

## Lampiran: setup yang sudah dilakukan (tidak perlu diulang)

- Repository: `https://github.com/aprizal24/aprizal-personal-portofolio` (branch `main`).
- Vercel sudah terhubung ke repository ini; setiap push ke `main` otomatis deploy ke production.
- Domain: `www.aprizal.me` (utama). `aprizal.me` diarahkan ke `www`. Pengaturan ada di Vercel → Settings → Domains.
- Alamat lama `/contact/` dan `/experiments/` otomatis diarahkan ke Home dan `/playground/` (diatur di `vercel.json` dan `astro.config.mjs`).
