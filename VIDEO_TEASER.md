# Konsep Video Teaser Flow Radar - 1 Menit

## Tujuan video

Membuat penonton langsung memahami bahwa **Flow Radar mengubah data pasar yang tersebar menjadi sinyal aliran modal yang ringkas, transparan, dan bisa ditindaklanjuti untuk riset lebih lanjut**.

Video harus terasa cepat dan visual. Hindari penjelasan arsitektur yang panjang; tunjukkan produk bekerja dari ranking, bukti di balik skor, sampai ringkasan yang dapat diakses kembali melalui Telegram.

## Konsep kreatif

- **Judul/angle:** "Stop guessing. Follow the flow."
- **Struktur cerita:** masalah -> radar dua horizon -> bukti PGEO -> monitoring -> akses melalui Telegram.
- **Target audiens:** trader ritel Indonesia yang memantau broker/foreign flow dan investor yang ingin menghubungkan fundamental dengan akumulasi institusional.
- **Pesan utama:** setiap ranking memiliki alasan dan data pendukung; Flow Radar tidak memberi rekomendasi beli atau jual.
- **Gaya:** screen recording bersih, gerakan cursor halus, zoom ringan pada angka penting, musik elektronik minimal, dan subtitle selalu aktif.
- **Durasi sasaran:** 56-59 detik agar aman terhadap batas satu menit.
- **Format:** 16:9, 1080p, 30 fps. Buat versi turunan 9:16 hanya jika akan diunggah ke Reels atau TikTok.

## Persiapan rekaman

1. Jalankan aplikasi dengan snapshot pasar 2 Oktober di `http://127.0.0.1:5173/?src=out`. Karena `data/out` saat ini dapat berisi snapshot yang lebih baru, layani histori dari folder temporary dan jangan menimpa output utama:

   ```powershell
   $videoDataRoot = Join-Path $env:TEMP 'flow-radar-video-2026-10-02'
   New-Item -ItemType Directory -Force -Path (Join-Path $videoDataRoot 'out') | Out-Null
   Copy-Item -Path 'data/out/history/2026-10-02/*' -Destination (Join-Path $videoDataRoot 'out') -Recurse -Force
   $env:RADAR_DATA_DIR = $videoDataRoot
   & .\.venv\Scripts\python.exe -m uvicorn radar.api.app:app --app-dir backend --host 127.0.0.1 --port 8000
   ```

   Jalankan frontend seperti biasa pada terminal terpisah.
2. Gunakan zoom browser 90-100% dan resolusi minimal 1440x900 agar ranking dan penjelasan skor terbaca.
3. Kosongkan watchlist sebelum merekam agar aksi menyimpan PGEO terlihat jelas.
4. Mulai dari halaman **Overview**, dengan posisi scroll paling atas.
5. Gunakan snapshot yang tersedia dengan label tanggal tetap terlihat. Angka dalam naskah mengacu pada snapshot **2 Oktober 2026**.
6. Jangan menyebut "saham terbaik", "buy", atau "sell". Gunakan "sinyal", "akumulasi", "distribusi", dan "bahan investigasi".
7. Jalankan bot pada terminal terpisah dengan snapshot yang sama: `& .\.venv\Scripts\python.exe -m radar bot --out data/out/history/2026-10-02`.
8. Siapkan chat Telegram khusus demo tanpa nama, foto, notifikasi, atau percakapan pribadi yang terlihat. Pastikan respons `/stock PGEO` sudah diuji sebelum merekam.

## Urutan visual utama

| Waktu | Tampilan dan aksi | Teks layar/editor |
| --- | --- | --- |
| 00:00-00:05 | Overview; tampilkan hero dan spotlight pemimpin daily flow. | **Raw data != clear insight** |
| 00:05-00:12 | Klik **Daily flow**, lalu filter **Accumulation**. | **Daily Flow -100 to +100** |
| 00:12-00:20 | Fokus ke PGEO; buka **Explain this score**. | **PGEO #3 / +16.8** |
| 00:20-00:31 | Buka halaman PGEO; tampilkan dua skor lalu scroll melewati grafik foreign flow dan tabel broker. | **Every score has evidence** |
| 00:31-00:38 | Klik **Investor lens**; sorot PGEO dan tiga pilarnya. | **Quality + Valuation + Slow Flow** |
| 00:38-00:44 | Bintangi PGEO, lalu potong cepat ke **Market brief** dan score flip-nya. | **Know what changed** |
| 00:44-00:55 | Pindah ke Telegram; kirim `/stock PGEO`, lalu tahan respons pada dua skor dan alasan institusional. | **Research, wherever you are** |
| 00:55-00:59 | Kembali ke brand/end card. Pertahankan attribution dan disclaimer. | **Flow Radar / Built with Sectors Financial API** |

## Naskah Bahasa Indonesia

> Tempo sasaran: tegas, sekitar 125-135 kata per menit. Beri jeda sangat pendek saat angka PGEO muncul.

| Waktu | Narasi | Aksi layar |
| --- | --- | --- |
| 00:00-00:05 | Data broker tersedia. Tetapi insight-nya sering tenggelam di dalam tabel. | Tampilkan Overview dan spotlight. |
| 00:05-00:12 | Flow Radar mengubah data Sectors menjadi dua radar aliran modal yang mudah ditelusuri. | Masuk ke Daily flow dan pilih Accumulation. |
| 00:12-00:20 | Pada horizon harian, PGEO berada di peringkat tiga dengan flow score positif 16,8. Setiap kontribusinya terlihat. | Buka penjelasan skor PGEO. |
| 00:20-00:31 | Masuk lebih dalam untuk melihat arus asing, riwayat skor, konsentrasi broker, serta bukti institusional - bukan sekadar satu angka hitam-box. | Buka PGEO dan scroll grafik serta broker. |
| 00:31-00:38 | Untuk horizon lebih panjang, Investor Lens menggabungkan kualitas, valuasi, dan slow flow. | Tampilkan Investor lens dan pilar PGEO. |
| 00:38-00:44 | Simpan riset ke watchlist, lalu lihat perubahan penting di Market Brief. | Bintangi PGEO dan sorot score flip di Market Brief. |
| 00:44-00:55 | Di Telegram, cukup kirim `/stock PGEO` untuk melihat kedua skor dan alasan utamanya dari snapshot yang sama. | Kirim command dan tahan respons agar terbaca. |
| 00:55-00:59 | Flow Radar. Dibangun dengan Sectors. Informasi, bukan nasihat investasi. | End card, attribution lengkap, dan disclaimer. |

## English Script

> Target pace: confident, around 125-135 words per minute. Pause briefly when the PGEO score appears.

| Time | Voice-over | On-screen action |
| --- | --- | --- |
| 00:00-00:05 | Broker data is everywhere. But the insight is often buried in tables. | Show the Overview and spotlight card. |
| 00:05-00:12 | Flow Radar turns Sectors data into two clear, explorable views of capital flow. | Open Daily flow and select Accumulation. |
| 00:12-00:20 | On the daily horizon, PGEO ranks third with a positive flow score of 16.8. Every contribution is visible. | Expand PGEO's score explanation. |
| 00:20-00:31 | Go deeper into foreign flow, score history, broker concentration, and institutional evidence - not just one black-box number. | Open PGEO and scroll through charts and brokers. |
| 00:31-00:38 | For the longer horizon, Investor Lens combines quality, valuation, and slow flow. | Show Investor Lens and PGEO's pillars. |
| 00:38-00:44 | Save the research to a watchlist, then catch important changes in Market Brief. | Star PGEO and highlight its score flip in Market Brief. |
| 00:44-00:55 | On Telegram, send `/stock PGEO` to retrieve both scores and their main reasons from the same snapshot. | Send the command and hold on the readable response. |
| 00:55-00:59 | Flow Radar. Built with Sectors. Information, not investment advice. | Show the brand, full attribution, and disclaimer. |

## Arahan editing

- Gunakan hard cut mengikuti perubahan halaman; hindari transisi dekoratif yang memperlambat demo.
- Perbesar area cursor sekitar 110-125% dan tambahkan click highlight yang halus.
- Tampilkan tiga callout utama saja: **#3**, **+16.8**, dan **/stock PGEO**.
- Subtitle maksimum dua baris. Gunakan warna aksen produk untuk kata **Daily Flow**, **Investor Lens**, dan **Market Brief**.
- Musik harus berada sekitar -24 sampai -20 LUFS di bawah voice-over dan tidak memiliki masalah lisensi publikasi.
- Jangan mempercepat footage sampai teks tidak dapat dibaca; potong jeda loading dan perpindahan cursor sebagai gantinya.
- Saat berpindah ke Telegram, gunakan hard cut atau phone-frame sederhana; tahan respons minimal dua detik agar skor dan alasan dapat dibaca.

## Checklist sebelum publikasi

- [ ] Durasi final tidak melebihi 60 detik.
- [ ] Produk terlihat bekerja, bukan hanya montage layar statis.
- [ ] Label snapshot, attribution Sectors, dan disclaimer terlihat.
- [ ] Command `/stock PGEO` dan respons Telegram terlihat jelas serta memakai snapshot 2 Oktober 2026.
- [ ] Tidak ada API key, isi `.env`, terminal, notifikasi pribadi, atau tab lain di rekaman.
- [ ] Nama akun, chat lain, foto profil, dan identitas Telegram pribadi sudah disembunyikan.
- [ ] Subtitle sudah diperiksa terhadap versi bahasa yang dipilih.
- [ ] Video diunggah **publik** ke YouTube atau media sosial dan dapat dibuka tanpa login khusus.
