Tujuan Akhir
    Buat pengujian mulai dari Unit, Integration, dan End-to-End pada Aplikasi Forum Diskusi.
    Deploy Aplikasi Forum Diskusi dengan teknik CI/CD.
    Memanfaatkan salah satu React Ecosystem pada Aplikasi Forum Diskusi.
    
Kriteria Utama 1: Automation Testing
    Buat minimal dua pengujian fungsi Reducer.
    Buat minimal dua pengujian Thunk Function.
    Buat minimal dua pengujian React Components.
    Buat minimal satu pengujian End-to-End untuk alur login aplikasi.
    Wajib menulis skenario pengujian pada masing-masing berkas pengujian.
    Pengujian dapat dijalankan dengan perintah npm test dan npm run e2e.

Catatan penting.
Anda bisa tentukan sendiri fungsi reducer, thunk, dan React component yang hendak diuji. Untuk mengasah kemampuan, kami sarankan untuk menguji unit yang kompleks. Contonya, fungsi reducer yang memiliki banyak kondisi atau fungsi thunk yang men-dispatch banyak action.


Kriteria Utama 2: Deployment Aplikasi
    Deploy aplikasi dengan menggunakan teknik CI/CD.
    Continuous Integration diterapkan dengan GitHub Actions.
    Continuous Deployment diterapkan dengan Vercel.
    Memproteksi branch master.
    Melampirkan URL Vercel aplikasi Anda pada catatan submission.
    Melampirkan screenshot sebagai bukti telah menerapkan konfigurasi CI/CD dan branch protection dengan benar. Screenshot yang perlu dilampirkan:
        1_ci_check_error: menunjukkan CI check error karena pengujian gagal, contohnya. 
        contoh ada di gambar di folder gambar_intruksi/1_ci_check_error menunjukkan CI check error karena pengujian gagal.jpeg

        2_ci_check_pass: menunjukkan CI check pass karena pengujian lolos, contohnya.
        contoh ada di gambar di folder gambar_intruksi/2_ci_check_pass menunjukkan CI check pass karena pengujian lolos.jpeg

        3_branch_protection: menunjukkan branch proteksi pada halaman PR, contohnya.
        contoh ada di gambar di folder gambar_intruksi/3_branch_protection menunjukkan branch proteksi pada halaman PR.jpeg 


Catatan penting.

    Screenshot dilampirkan di dalam berkas ZIP proyek. Berikut contoh struktur folder ada di
    gambar_intruksi/Screenshot dilampirkan di dalam berkas ZIP proyek.jpeg

    Branch protection hanya bisa dilakukan di repository public, tetapi untuk meminimalisir tingkat plagiarism ke depannya, kami sarankan untuk mengubah repository menjadi private setelah proses penilaian submission selesai.


Kriteria Utama 3: Memanfaatkan Salah Satu Ecosystem React
    Memanfaatkan minimal satu React Ecosystem pada daftar berikut https://github.com/dicodingacademy/awesome-react-ecosystem#react-tools.
    Berikut penggunaan Ecosystem React yang tidak kami pertimbangkan untuk memenuhi kriteria.
        Create React Apps
        Vite
        React Router
        React Icons
        Redux
        Redux Thunk
        Redux Toolkit
        Jest
        Vitest
        React Testing Library


Kriteria Utama 4: Mempertahankan Kriteria Submission Sebelumnya
Aplikasi harus tetap mempertahankan kriteria utama yang ada di submission sebelumnya.
    Fungsionalitas Aplikasi
    Bugs Highlighting
    Arsitektur Aplikasi

Submission akan dinilai oleh reviewer dalam skala 1-5. Untuk mendapatkan nilai tinggi, Anda bisa menerapkan beberapa saran berikut.

    Terdapat lebih dari tiga pengujian fungsi reducer.
    Terdapat lebih dari tiga pengujian fungsi thunks.
    Terdapat lebih dari tiga pengujian pada React Component.
    Memiliki minimal 2 stories komponen.
    Menerapkan saran pada submission sebelumnya, seperti:
        fitur votes pada thread dan komentar;
        menampilkan leaderboard; dan
        filter daftar thread berdasarkan kategori.
    Saran lainnya.
        Aplikasi yang Anda bangun mudah untuk digunakan. Contohnya, tidak membuat pengguna bingung dan menggunakan warna yang mudah dalam membaca teks.
        Aplikasi yang Anda bangun memiliki tampilkan yang menarik.