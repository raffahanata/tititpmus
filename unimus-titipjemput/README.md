# TitipMus — Jasa Titip Barang & Antar Jemput Mahasiswa UNIMUS

Tahap ini berisi **prototipe tampilan (UI) statis**, HTML + Bootstrap 5, untuk seluruh
halaman dari 3 role: **Customer**, **Driver**, dan **Admin**. Belum ada backend/database —
ini murni tampilan agar Anda bisa melihat alur lengkap dulu sebelum masuk ke Laravel.

## 1. Cara Membuka di VS Code

1. Extract/salin folder `unimus-titipjemput` ke lokasi project Anda.
2. Buka folder tersebut di VS Code (`File > Open Folder`).
3. Install extension **Live Server** (by Ritwick Dey) di VS Code.
4. Klik kanan `index.html` → **Open with Live Server**.
5. Semua halaman lain bisa diakses lewat navigasi di dalam web (navbar, sidebar, tombol).

Tidak perlu install apapun (PHP/Node/dsb) untuk tahap ini — murni HTML/CSS/JS + CDN
(Bootstrap, Bootstrap Icons, Google Fonts).

## 2. Struktur Folder

```
unimus-titipjemput/
├── index.html                 # Landing page publik
├── auth/
│   ├── login.html              # Login (tab role: Mahasiswa/Driver/Admin, hanya visual)
│   └── register.html           # Registrasi (pilih role Mahasiswa/Driver)
├── customer/
│   ├── dashboard.html          # Ringkasan pesanan customer
│   ├── titip-barang.html       # CRUD pesanan titip barang (Create+List+Update+Delete)
│   ├── antar-jemput.html       # CRUD pesanan antar jemput
│   ├── riwayat.html            # Riwayat gabungan semua pesanan
│   └── profil.html             # Update data diri & password
├── driver/
│   ├── dashboard.html          # Ringkasan tugas & pendapatan driver
│   ├── pesanan.html            # Terima/tolak pesanan baru + update status antar
│   ├── riwayat.html            # Riwayat & rekap pendapatan driver
│   └── profil.html             # Update data diri & kendaraan
├── admin/
│   ├── dashboard.html          # Ringkasan sistem
│   ├── data-pesanan.html       # CRUD semua pesanan + assign driver
│   ├── data-user.html          # CRUD data customer & driver
│   ├── data-layanan.html       # CRUD layanan & tarif
│   └── laporan.html            # Statistik & laporan
└── assets/
    ├── css/style.css           # Design token & semua komponen (warna, tombol, tabel, sidebar, dst)
    └── js/script.js            # Toggle sidebar mobile, konfirmasi hapus, search tabel, dsb
```

## 3. Konsep Desain

- **Warna**: hijau kampus (`--color-primary`) untuk brand & role Customer, biru (`--color-driver`)
  untuk role Driver, hijau gelap (`--color-admin`) untuk panel Admin — supaya 3 role mudah
  dibedakan sekilas dari warna.
- **Elemen ciri khas**: garis rute putus-putus dengan titik (`.route-line`) melambangkan
  perjalanan titip/antar-jemput, dipakai di hero, kartu pesanan, dan detail pesanan.
- **Font**: Poppins (judul), Inter (teks), JetBrains Mono (ID pesanan/data teknis).
- Semua halaman **responsif**: sidebar dashboard otomatis jadi off-canvas di layar < 992px
  (tombol hamburger di kiri atas topbar).

## 4. Status CRUD di Setiap Role (UI saja, belum backend)

| Role | Entity | Create | Read | Update | Delete |
|---|---|---|---|---|---|
| Customer | Pesanan Titip Barang | ✅ form | ✅ tabel + modal detail | ✅ modal edit | ✅ tombol batal/hapus |
| Customer | Pesanan Antar Jemput | ✅ form | ✅ tabel + modal detail | ✅ modal edit | ✅ tombol batal/hapus |
| Driver | Status Pesanan Berjalan | — | ✅ list pesanan baru | ✅ ubah status antar | ✅ tolak pesanan |
| Admin | Data Pengguna (customer & driver) | ✅ modal tambah | ✅ tabel | ✅ modal edit | ✅ tombol hapus |
| Admin | Data Pesanan | — | ✅ tabel + detail | ✅ assign driver/ubah status | ✅ tombol hapus/batal |
| Admin | Layanan & Tarif | ✅ modal tambah | ✅ tabel | ✅ modal edit | ✅ tombol hapus |

## 5. Langkah Selanjutnya (setelah UI di-ACC)

Karena Anda memilih **Laravel** sebagai backend, urutan yang disarankan:

1. **ERD & migration** — tabel `users` (dengan kolom `role`: customer/driver/admin),
   `drivers` (data kendaraan), `orders` (tipe: titip_barang/antar_jemput, status, dsb),
   `services` (layanan & tarif), `order_status_logs` (riwayat perubahan status).
2. **Install Laravel + Breeze/Jetstream** untuk auth dasar, lalu tambahkan middleware
   `role` untuk membedakan akses Customer/Driver/Admin.
3. **Convert HTML → Blade**: setiap file di atas dipecah jadi `layouts/customer.blade.php`,
   `layouts/driver.blade.php`, `layouts/admin.blade.php` (berisi sidebar+topbar), lalu
   tiap halaman jadi `@extends` dari layout tersebut — sidebar & CSS yang sudah ada tinggal
   dipindah apa adanya ke `resources/views` dan `public/assets`.
4. **Buat Controller + Route resource** (`Route::resource('orders', OrderController::class)`)
   untuk menghidupkan CRUD yang formnya sudah ada di prototipe ini.
5. **Realtime status** (opsional, tahap lanjut): Laravel Echo/Pusher untuk update status
   pesanan secara live tanpa refresh.

Kabari saya kalau mau saya bantu lanjut ke tahap ERD/migration atau langsung setup project
Laravel-nya (composer create-project, struktur folder resources/views, controller, dsb).
