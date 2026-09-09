# DevPulse — Modern Developer Community Forum

Aplikasi Forum Diskusi modern yang dibangun menggunakan **React**, **Redux Toolkit**, dan **Vite** yang terintegrasi dengan **Dicoding Forum API v1** (`https://forum-api.dicoding.dev/v1`).

- 🌐 **Live Demo (Vercel):** [https://devpulse-forum-app.vercel.app](https://devpulse-forum-app.vercel.app)
- 🐙 **Repository GitHub:** [https://github.com/Bintangakbar0420/devpulse-forum-app](https://github.com/Bintangakbar0420/devpulse-forum-app)

Proyek ini telah mengimplementasikan seluruh kriteria **Submission 1** dan **Submission 2 (Submission Akhir)** kelas *Menjadi React Web Developer Expert* dengan pemenuhan seluruh kriteria utama dan saran opsional untuk mencapai penilaian **Bintang 5**.

---

## 🌟 Pemenuhan Kriteria Submission 2 (Submission Akhir)

### 1. Kriteria Utama 1: Automation Testing
- **Pengujian Reducer (> 3 berkas, 16 skenario pengujian)**:
  - `src/states/authUser/reducer.test.js` (3 skenario)
  - `src/states/threads/reducer.test.js` (6 skenario)
  - `src/states/threadDetail/reducer.test.js` (5 skenario)
  - `src/states/isPreload/reducer.test.js` (2 skenario)
- **Pengujian Thunk Function (> 3 berkas, 10 skenario pengujian)**:
  - `src/states/shared/action.test.js` (`asyncPopulateUsersAndThreads`)
  - `src/states/authUser/action.test.js` (`asyncSetAuthUser`, `asyncUnsetAuthUser`)
  - `src/states/threads/action.test.js` (`asyncAddThread`)
  - `src/states/threadDetail/action.test.js` (`asyncReceiveThreadDetail`, `asyncAddComment`)
- **Pengujian React Component (> 3 berkas, 12 skenario pengujian)**:
  - `src/components/common/VoteButton.test.jsx` (5 skenario)
  - `src/components/comments/CommentInput.test.jsx` (3 skenario)
  - `src/components/threads/CategoryFilter.test.jsx` (3 skenario)
  - `src/components/threads/ThreadItem.test.jsx` (1 skenario)
- **Pengujian End-to-End (E2E) Login Flow**:
  - `cypress/e2e/login.cy.js` (3 skenario: kelengkapan form, handling alert kredensial salah, dan redirect saat kredensial valid).
- **Format Skenario**: Seluruh berkas pengujian dilengkapi blok dokumentasi skenario pengujian (`Skenario Pengujian`).
- **Perintah Pengujian**:
  - `npm test` untuk menjalankan seluruh pengujian Unit & Integrasi via Vitest (12 berkas lolos, 38 skenario lolos).
  - `npm run e2e` untuk menjalankan pengujian Cypress E2E headless secara otomatis.

### 2. Kriteria Utama 2: Deployment Aplikasi & CI/CD
- **Continuous Integration**: Menerapkan GitHub Actions workflow pada `.github/workflows/ci.yml` dengan job `automation-test-job` yang menjalankan linter, automated tests, dan build bundle pada branch `master`.
- **Continuous Deployment**: Dikonfigurasi untuk deployment ke Vercel dengan konfigurasi SPA routing pada `vercel.json`.
- **Bukti Konfigurasi CI/CD & Branch Protection**:
  Tersimpan pada direktori `screenshot/`:
  - `screenshot/1_ci_check_error.png` (bukti CI check gagal ketika pengujian error)
  - `screenshot/2_ci_check_pass.png` (bukti CI check sukses ketika pengujian lolos)
  - `screenshot/3_branch_protection.png` (bukti proteksi branch master pada halaman Pull Request)

### 3. Kriteria Utama 3: Memanfaatkan Salah Satu React Ecosystem (Storybook)
- Memanfaatkan **Storybook** (terdaftar di [awesome-react-ecosystem#react-tools](https://github.com/dicodingacademy/awesome-react-ecosystem#react-tools)) sebagai alat dokumentasi dan visualisasi komponen UI terisolasi.
- **Saran Unggul: Memiliki minimal 2 stories komponen (kami menyediakan 4 stories lengkap)**:
  1. `src/stories/VoteButton.stories.jsx` (Default, UserUpvoted, UserDownvoted, HighVoteCounts)
  2. `src/stories/CategoryBadge.stories.jsx` (Default, WithHashtag, Clickable)
  3. `src/stories/Avatar.stories.jsx` (DefaultFallback, CustomImage, LargeProfile)
  4. `src/stories/CommentInput.stories.jsx` (LoggedInUser, GuestUser)
- Perintah menjalankan Storybook: `npm run storybook` atau `npm run build-storybook`.

### 4. Kriteria Utama 4: Mempertahankan Kriteria Submission Sebelumnya
- **Fungsionalitas Aplikasi**: Registrasi, Login, Daftar Thread, Detail Thread, Buat Thread, Komentar, dan Loading Indicator via `react-redux-loading-bar`.
- **Bugs Highlighting**: Menggunakan **Dicoding Academy JavaScript Style Guide** (`eslint-config-dicodingacademy`) dengan **0 error dan 0 warning** (`npm run lint`).
- **Arsitektur Redux Store**: Seluruh data API dikelola di Redux Store (`@reduxjs/toolkit`) tanpa ada pemanggilan REST API langsung di `useEffect` komponen.
- **Saran Bintang 5 Submission 1**:
  - Fitur Votes pada Thread dan Komentar dengan *Optimistically Apply Actions*.
  - Halaman Leaderboard dengan Podium Juara 1, 2, 3 dan skor kontributor.
  - Filter kategori dinamis dan pencarian instan (*search bar*).

---

## 📁 Struktur Direktori

```
suibmission1/
├── .github/
│   └── workflows/
│       └── ci.yml            # Konfigurasi GitHub Actions CI
├── .storybook/               # Konfigurasi Storybook
│   ├── main.js
│   └── preview.js
├── cypress/                  # Konfigurasi & Spesifikasi Cypress E2E
│   ├── e2e/
│   │   └── login.cy.js
│   └── support/
├── public/
│   └── favicon.svg
├── screenshot/               # Bukti Screenshot CI/CD & Branch Protection
│   ├── 1_ci_check_error.png
│   ├── 2_ci_check_pass.png
│   └── 3_branch_protection.png
├── src/
│   ├── components/           # Komponen React & File Test Component
│   ├── pages/                # Halaman aplikasi
│   ├── states/               # Redux Slices, Thunks, dan File Test Unit/Integration
│   ├── stories/              # Berkas Stories Storybook
│   ├── styles/               # Styling aplikasi
│   ├── utils/                # API wrapper, dateHelper, sanitizer
│   ├── setupTests.js         # Setup Jest-DOM & cleanup
│   ├── App.jsx
│   └── main.jsx
├── cypress.config.js
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── vercel.json
└── vite.config.js
```

---

## 🚀 Perintah Menjalankan Aplikasi & Pengujian

```bash
# 1. Menjalankan server development
npm run dev

# 2. Menjalankan audit linter (0 error)
npm run lint

# 3. Menjalankan automated unit & integration testing
npm test

# 4. Menjalankan End-to-End testing (Cypress headless)
npm run e2e

# 5. Menjalankan Storybook UI katalog
npm run storybook

# 6. Membangun bundle produksi
npm run build
```
