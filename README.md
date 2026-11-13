# Gotong Royong Adventure

> **Permainan Papan Edukasi Multipemain Berbasis Web untuk Penguatan Profil Pelajar Pancasila (Sila ke-3: Persatuan Indonesia)**

Gotong Royong Adventure adalah permainan papan edukatif (*board game*) modern yang memperkenalkan tradisi luhur, kearifan lokal, dan nilai gotong royong dari **38 provinsi di Indonesia**. Dibangun dengan estetika arcade yang ramah anak, permainan ini mengajak siswa dan keluarga belajar tentang persatuan dan toleransi nusantara secara interaktif dan menyenangkan.

---

## Fitur Utama

- **Papan Permainan 42 Petak Nusantara:**
  - 38 petak provinsi yang mewakili 6 gugus kepulauan (Sumatera, Jawa, Kalimantan, Sulawesi, Nusa Tenggara, dan Papua).
  - 4 petak sudut strategis: START (+Rp 50, +10 Poin), Ruang Evaluasi Kebangsaan (Penjara), Pos Persatuan (Bonus Kas), dan Kartu Tantangan Karakter.
- **Kuis Pilihan Ganda (A, B, C, D) 38 Provinsi:**
  - Pertanyaan budaya gotong royong otentik (seperti *Meuseuraya* di Aceh, *Marsiadapari* di Sumut, *Batobo* di Minang, *Ngayah* di Bali, hingga *Bakar Batu* di Papua).
  - Jawaban tepat memberikan +20 Poin Persatuan & +Rp 25 Kas Gotong Royong disertai selebrasi konfeti.
  - Jawaban belum tepat memotong -5 Poin dan mengungkap kunci jawaban yang benar untuk pembelajaran langsung.
- **Dadu 3D & Langkah Pion Realistis:**
  - Animasi putaran dadu arcade dengan sorotan hasil angka yang jelas sebelum pion mulai melangkah.
  - Langkah pion melangkah petak demi petak (*step-by-step*) dengan efek audio langkah kaki.
- **Backsound Tradisional "Cublak-Cublak Suweng":**
  - Streaming audio lagu dolanan anak *Cublak-Cublak Suweng* versi Dongeng Kids / Dongeng Kita.
  - Dilengkapi kontrol widget melayang (Play/Pause, pengatur volume slider 0-100%, dan tombol mute cepat di header).
  - Fallback otomatis ke sintesis melodi Gamelan Slendro berbasis Web Audio API saat offline.
- **Modal Interaktif "Satu Nusa Satu Bangsa":**
  - Edukasi pilar Sila ke-3, semboyan Bhinneka Tunggal Ika, dan ikrar persatuan bangsa.
- **Ensiklopedia Budaya 38 Provinsi:**
  - Katalog lengkap kearifan lokal, filosofi daerah, dan tradisi gotong royong dengan pencarian instan dan filter wilayah.
- **Desain & Tipografi Ramah Anak:**
  - Tipografi membulat ceria: kombinasi **Fredoka** (Display & Judul) + **Nunito** (Teks & Deskripsi).
  - Tampilan responsif yang pas untuk layar laptop maupun perangkat seluler tanpa terpotong.

---

## Teknologi yang Digunakan

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **Bahasa:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animasi:** [Framer Motion](https://www.framer.com/motion/)
- **Ikon:** [Lucide React](https://lucide.dev/)
- **Efek Partikel:** [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Audio:** YouTube IFrame API + Web Audio API synthesizer

---

## Cara Menjalankan Proyek

### 1. Klon Repositori
```bash
git clone <URL_REPO_GITHUB>
cd GRA
```

### 2. Instal Dependensi
```bash
npm install
```

### 3. Jalankan Server Pengembangan
```bash
npm run dev
```
Buka peramban di `http://localhost:3000`.

### 4. Kompilasi Build Produksi
```bash
npm run build
npm run start
```

---

## Lisensi
Proyek ini dibuat untuk tujuan edukasi Pendidikan Pancasila dan pelestarian budaya gotong royong Indonesia.
