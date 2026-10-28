# Muhadiib Portfolio

> Personal portfolio of **Muhadiib Dwi Taajuddiin Trisno** — an Informatics student exploring Full-Stack Development, Machine Learning, and AI Development.

**Languages / Bahasa:** [Bahasa Indonesia](#bahasa-indonesia) · [English](#english)

---

# Bahasa Indonesia

## Tentang Proyek

Muhadiib Portfolio adalah situs portofolio pribadi yang menampilkan identitas dan fokus belajar saya sebagai mahasiswa Informatika. Halaman utama dirancang dengan pendekatan minimalis, latar gelap, tipografi besar, animasi pembuka, serta efek visual interaktif yang dapat diatur melalui menu.

Repositori ini berisi kode sumber situs. README ini menjelaskan cara menjalankan proyek, teknologi yang digunakan, serta lokasi utama untuk menyesuaikan tampilan dan efek.

## Fitur Saat Ini

- **Halaman utama personal** — menampilkan nama, identitas sebagai mahasiswa Informatika, dan bidang yang sedang dipelajari.
- **Animasi pembuka** — teks “WELCOME” muncul sebelum konten utama ditampilkan.
- **Efek teks teknis** — nama “Muhadiib” menggunakan komponen animasi teks berbasis canvas.
- **Menu navigasi animatif** — menu di sisi kanan dengan transisi bertahap.
- **Pengaturan efek visual** — panel *Effects* pada menu menyediakan pilihan efek kursor dan latar belakang yang tersedia di aplikasi.
- **Splash Cursor** — efek visual yang mengikuti pergerakan kursor dan dapat menghasilkan efek saat klik.
- **Topography** — efek latar berupa garis kontur animatif yang dapat merespons interaksi pointer.
- **Suara interaksi** — efek suara antarmuka dan interaksi visual dapat diaktifkan atau dinonaktifkan; volume juga dapat disesuaikan.
- **Tampilan responsif** — ukuran teks dan jarak tata letak menggunakan nilai CSS adaptif agar lebih sesuai pada berbagai ukuran layar.

> Catatan: pilihan efek yang aktif saat ini dikelola di dalam state aplikasi. Pengaturan tersebut belum dibuat sebagai preferensi permanen lintas sesi.

## Teknologi

| Teknologi | Kegunaan |
| --- | --- |
| [Next.js](https://nextjs.org/) 14 | Framework React dan pengelolaan aplikasi web |
| [React](https://react.dev/) 18 | Komponen dan antarmuka pengguna |
| [TypeScript](https://www.typescriptlang.org/) | Penulisan JavaScript dengan pemeriksaan tipe |
| [Tailwind CSS](https://tailwindcss.com/) 3 | Utilitas styling |
| [GSAP](https://gsap.com/) | Animasi menu dan transisi |
| HTML Canvas / Web Audio API | Efek visual teks dan suara interaksi |

## Persyaratan

Pastikan perangkat sudah memiliki:

- **Node.js** versi LTS yang kompatibel (disarankan Node.js 20 atau 22).
- **npm**, yang biasanya terpasang bersama Node.js.
- **Git** untuk mengkloning repositori.

Untuk memeriksa instalasi:

```bash
node --version
npm --version
git --version
```

## Menjalankan Proyek Secara Lokal

### 1. Kloning repositori

```bash
git clone https://github.com/Muhadib4/portofolio.git
cd portofolio
```

### 2. Pasang dependensi

```bash
npm install
```

### 3. Jalankan server pengembangan

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser. Perubahan kode biasanya akan ditampilkan otomatis selama server pengembangan berjalan.

### 4. Periksa dan build aplikasi

```bash
npm run type-check
npm run lint
npm run build
```

Untuk menjalankan hasil build produksi secara lokal:

```bash
npm run start
```

Jalankan `npm run build` terlebih dahulu sebelum menggunakan `npm run start`.

## Struktur Proyek

Bagian utama repositori:

```text
portofolio/
├── app/
│   ├── globals.css          # Gaya global, layout, animasi, dan responsivitas
│   ├── layout.tsx           # Root layout dan metadata situs
│   └── page.tsx             # Konten halaman utama
├── components/
│   ├── PortfolioEffects.tsx # Mengatur efek visual, suara, dan menu
│   ├── StaggeredMenu.tsx    # Menu navigasi dan panel pengaturan Effects
│   ├── StaggeredMenu.css    # Styling menu
│   ├── TechText.tsx         # Komponen animasi teks berbasis canvas
│   └── TechText.css         # Styling komponen TechText
├── next.config.mjs          # Konfigurasi Next.js
├── postcss.config.mjs       # Konfigurasi PostCSS
├── tailwind.config.ts       # Konfigurasi Tailwind CSS
├── tsconfig.json            # Konfigurasi TypeScript
└── package.json             # Dependensi dan perintah npm
```

Komponen efek lain, seperti Splash Cursor dan Topography, juga digunakan oleh `PortfolioEffects.tsx`.

## Cara Menyesuaikan Situs

### Mengubah nama dan teks utama

Buka `app/page.tsx`. Di sana terdapat nama, teks identitas, dan kalimat bidang yang sedang dipelajari:

- `INFORMATICS · DEVELOPER IN PROGRESS`
- `Learning · Full-Stack Development · Machine Learning · AI Development`

Sesuaikan teks tersebut jika identitas atau fokus belajar berubah.

### Mengubah warna, latar, dan animasi halaman

Buka `app/globals.css`. File ini mengatur warna dasar, tipografi, jarak, animasi pembuka, serta tata letak halaman utama. Variabel warna global yang tersedia antara lain `--background`, `--foreground`, `--muted`, dan `--line`.

### Mengubah efek kursor, latar, dan suara

Buka `components/PortfolioEffects.tsx`:

- `SPLASH_CURSOR_COLORS` — daftar warna efek Splash Cursor.
- `TOPOGRAPHY_SETTINGS` — pengaturan tampilan dan gerakan Topography, seperti warna, jumlah garis, kecepatan, dan intensitas.
- `selectedEffects` — efek kursor dan latar yang dipilih saat aplikasi pertama kali dibuka.
- `soundEnabled` dan `soundVolume` — status awal dan volume suara interaksi.

Pengaturan yang diteruskan ke komponen efek berada di bagian render pada file yang sama.

### Mengubah item menu dan tautan sosial

Buka `components/PortfolioEffects.tsx`, lalu sesuaikan properti `items` dan `socialItems` yang diteruskan ke `StaggeredMenu`. Saat ini menu menyediakan tautan Home dan GitHub.

### Mengubah animasi menu

Buka `components/StaggeredMenu.tsx` dan `components/StaggeredMenu.css`. Komponen TypeScript mengatur perilaku menu, sedangkan file CSS mengatur tampilannya.

## Deployment

Proyek Next.js ini dapat di-deploy ke layanan yang mendukung Next.js, termasuk [Vercel](https://vercel.com/).

Garis besar deployment:

1. Push kode ke repositori GitHub.
2. Impor repositori `Muhadib4/portofolio` ke Vercel.
3. Pastikan framework terdeteksi sebagai Next.js dan direktori root mengarah ke folder proyek.
4. Jalankan deployment. Untuk proyek ini, tidak ada environment variable khusus yang diperlukan oleh konfigurasi yang saat ini tersedia.

Sebelum deployment, jalankan `npm run type-check` dan `npm run build untuk memeriksa tipe serta memastikan aplikasi dapat dibangun.

## Status Pengembangan

Portofolio ini masih dikembangkan. Fokus saat ini adalah pengalaman halaman utama dan efek interaktif. Jangan menganggap bagian seperti daftar proyek, pengalaman kerja, blog, atau formulir kontak sudah tersedia kecuali memang telah ditambahkan ke kode.

## Lisensi

Belum ada lisensi khusus yang dinyatakan dalam README ini. Jika repositori ingin digunakan, disalin, atau dimodifikasi oleh pihak lain, tambahkan file lisensi yang sesuai terlebih dahulu.

---

# English

## About

Muhadiib Portfolio is a personal website introducing me as an Informatics student interested in Full-Stack Development, Machine Learning, and AI Development. The homepage uses a dark, minimal visual style, large typography, an animated intro, and interactive visual effects that can be configured through the navigation menu.

This repository contains the website's source code. This README covers the current features, technology stack, local setup, project structure, and the main places to customize the experience.

## Current Features

- **Personal homepage** — presents my name, Informatics student identity, and current learning interests.
- **Animated intro** — displays a “WELCOME” sequence before revealing the main content.
- **Technical text effect** — the “Muhadiib” heading uses a canvas-based animated text component.
- **Animated navigation menu** — a right-side menu with staggered transitions.
- **Visual effects settings** — the menu's *Effects* panel provides the cursor and background effects currently available in the app.
- **Splash Cursor** — a cursor-following visual effect with click interaction.
- **Topography** — an animated contour-line background that can respond to pointer interaction.
- **Interaction sounds** — interface and visual-interaction sounds can be enabled or disabled, with adjustable volume.
- **Responsive layout** — adaptive CSS sizing helps the page fit different viewport sizes.

> Note: effect selections are currently held in application state. They are not saved as persistent preferences across sessions.

## Technology Stack

| Technology | Purpose |
| --- | --- |
| [Next.js](https://nextjs.org/) 14 | React framework and web application structure |
| [React](https://react.dev/) 18 | UI components |
| [TypeScript](https://www.typescriptlang.org/) | Typed JavaScript |
| [Tailwind CSS](https://tailwindcss.com/) 3 | Utility-first styling |
| [GSAP](https://gsap.com/) | Menu animations and transitions |
| HTML Canvas / Web Audio API | Text visuals and interaction sounds |

## Requirements

Install the following tools first:

- **Node.js**, using a compatible LTS release (Node.js 20 or 22 is recommended).
- **npm**, usually included with Node.js.
- **Git**, to clone the repository.

Check your installation:

```bash
node --version
npm --version
git --version
```

## Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/Muhadib4/portofolio.git
cd portofolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. While the development server is running, most code changes will appear automatically.

### 4. Check and build the application

```bash
npm run type-check
npm run lint
npm run build
```

To run the production build locally:

```bash
npm run start
```

Run `npm run build` before using `npm run start`.

## Project Structure

Key files and directories:

```text
portofolio/
├── app/
│   ├── globals.css          # Global styles, layout, animations, responsiveness
│   ├── layout.tsx           # Root layout and site metadata
│   └── page.tsx             # Homepage content
├── components/
│   ├── PortfolioEffects.tsx # Visual effects, sound, and menu coordination
│   ├── StaggeredMenu.tsx    # Navigation menu and Effects settings panel
│   ├── StaggeredMenu.css    # Menu styles
│   ├── TechText.tsx         # Canvas-based animated text component
│   └── TechText.css         # TechText styles
├── next.config.mjs          # Next.js configuration
├── postcss.config.mjs       # PostCSS configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and npm scripts
```

Additional effect components, including Splash Cursor and Topography, are imported by `PortfolioEffects.tsx`.

## Customization Guide

### Change the name and homepage copy

Open `app/page.tsx`. The name, student tagline, and learning-focus text are defined there:

- `INFORMATICS · DEVELOPER IN PROGRESS`
- `Learning · Full-Stack Development · Machine Learning · AI Development`

Update these strings to reflect your current identity or interests.

### Change page colors, background, and animations

Open `app/globals.css`. This file controls the base colors, typography, spacing, intro animation, and homepage layout. Global color variables include `--background`, `--foreground`, `--muted`, and `--line`.

### Customize cursor, background, and sound effects

Open `components/PortfolioEffects.tsx`:

- `SPLASH_CURSOR_COLORS` — the Splash Cursor color palette.
- `TOPOGRAPHY_SETTINGS` — Topography appearance and motion settings, including color, line count, and speed.
- `selectedEffects` — the initial cursor and background effect selections.
- `soundEnabled` and `soundVolume` — the initial interaction-sound state and volume.

The effect component props are configured in the render section of the same file.

### Change menu items and social links

Open `components/PortfolioEffects.tsx` and edit the `items` and `socialItems` props passed to `StaggeredMenu`. The current menu includes Home and GitHub links.

### Customize menu animations

Edit `components/StaggeredMenu.tsx` and `components/StaggeredMenu.css`. The TypeScript component handles menu behavior; the CSS file controls its appearance.

## Deployment

This Next.js project can be deployed to a platform that supports Next.js, including [Vercel](https://vercel.com/).

General deployment steps:

1. Push the source code to GitHub.
2. Import `Muhadib4/portofolio` into Vercel.
3. Confirm that Next.js is detected and the root directory points to the project folder.
4. Deploy the project. No custom environment variables are required by the configuration currently present in this repository.

Before deploying, run `npm run type-check` and `npm run build` to check types and verify that the application builds.

## Development Status

This portfolio is still in progress. The current focus is the homepage and its interactive effects. Do not assume that project listings, work experience, a blog, or a contact form are available unless they have been implemented in the code.

## License

No specific license is declared in this README. If you want others to use, copy, or modify this repository, add an appropriate license file first.

---

**Repository:** [Muhadib4/portofolio](https://github.com/Muhadib4/portofolio)
