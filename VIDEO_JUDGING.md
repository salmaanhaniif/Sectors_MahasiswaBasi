# Konsep Judging Video Flow Radar - Maksimal 3 Menit

## Sasaran video

Dalam kurang dari tiga menit, juri harus memahami empat hal:

1. masalah nyata yang dialami investor ritel Indonesia;
2. siapa yang menggunakan Flow Radar dan mengapa ada dua horizon;
3. bagaimana workflow utama berjalan dari sinyal menuju bukti, monitoring, dan akses ulang melalui Telegram;
4. bagaimana data Sectors diproses menjadi insight yang transparan dan dapat diverifikasi.

Video ini diposisikan untuk track **Market Intelligence**. Fokus utamanya adalah kegunaan nyata, storytelling, dan kedalaman teknis - bukan daftar seluruh menu.

## Ringkasan produk untuk narasi

**Problem statement satu kalimat:**

> Investor ritel Indonesia dapat melihat siapa yang memperdagangkan sebuah saham, tetapi sulit mengetahui apakah modal institusional sedang mengakumulasi atau keluar tanpa memeriksa tabel broker, foreign flow, fundamental, dan perubahan kepemilikan satu per satu.

**Solusi:** Flow Radar mengubah data Sectors untuk universe LQ45 menjadi dua ranking yang transparan:

- **Daily Flow** untuk trader: skor -100 sampai +100 dari foreign flow lima hari, streak, konsentrasi broker, institutional net flow, divergence, dan aktivitas insider.
- **Investor Lens** untuk investor: skor 0 sampai 100 dari quality 40%, valuation 25%, dan slow flow 35%, lengkap dengan coverage data.

Setiap skor menampilkan alasan, input, kontribusi, seri historis, dan keterbatasannya. Output akhirnya dapat digunakan di dashboard, watchlist, brief harian/mingguan, serta bot Telegram read-only untuk meminta ranking, brief, atau ringkasan saham kapan saja. Produk memberi informasi dan analisis - bukan rekomendasi transaksi.

## Flow teknis yang perlu divisualkan

```mermaid
flowchart LR
    A[Sectors REST API] --> B[Cache + SQLite]
    B --> C[Rules-based signal engine]
    C --> D[Validated JSON snapshots]
    D --> E[Read-only FastAPI]
    E --> F[React dashboard]
    D --> G[Daily/weekly briefs]
    G --> H[Local download / Email]
    D --> I[Read-only Telegram bot]
    I --> J[/daily /weekly /brief /stock]
```

Narasi teknis cukup 12-15 detik. Diagram dapat ditambahkan sebagai overlay sederhana saat voice-over menjelaskan pipeline.

## Strategi demo

Gunakan **PGEO sebagai benang merah** karena snapshot 2 Oktober 2026 memperlihatkan workflow lengkap:

- Daily rank **#3** dengan flow score **+16,8**;
- berubah dari **neutral 11,5** menjadi **accumulation 16,8**;
- institutional brokers menunjukkan net accumulation sebesar **42% dari net traded value** dalam dua minggu;
- Investor rank **#9**, coverage **100%**, dengan slow-flow pillar sekitar **71,9**;
- valuasi PE dan PB sekitar **0,76x peer average** dalam data yang diekspor.
- command Telegram `/stock PGEO` mengembalikan kedua skor dan alasan utama dari snapshot yang sama;
- command `/brief daily` menampilkan perubahan PGEO dari netral menjadi akumulasi.

Angka-angka tersebut adalah observasi pada snapshot, bukan prediksi hasil investasi.

## Persiapan snapshot rekaman

Demo pada naskah ini **harus memakai snapshot 2 Oktober 2026**. Snapshot aktif di
`data/out` dapat lebih baru dan tidak selalu memiliki sinyal accumulation; jika itu
terjadi, filter **Accumulation** akan menampilkan `No signals match just yet.`.

### Merekam situs Vercel

Setelah commit yang menyediakan source `video` selesai dideploy oleh Vercel, buka:

```text
https://flow-radar-zeta.vercel.app/?src=video#daily
```

Pastikan header menampilkan **As of Oct 2, 2026** dan label **Historical market
data**. URL live biasa tanpa `?src=video` tetap menggunakan snapshot terbaru dan
tidak cocok dengan angka dalam naskah.

Langkah terminal di bawah hanya diperlukan jika merekam aplikasi lokal.

1. Hentikan FastAPI/uvicorn yang masih berjalan di port 8000. Environment variable
   di bawah hanya dibaca ketika proses backend dimulai, sehingga backend lama akan
   tetap menyajikan `data/out` terbaru.
2. Jalankan backend khusus rekaman dari root repository di terminal baru:

   ```powershell
   $videoDataRoot = Join-Path $env:TEMP 'flow-radar-video-2026-10-02'
   New-Item -ItemType Directory -Force -Path (Join-Path $videoDataRoot 'out') | Out-Null
   Copy-Item -Path 'data/out/history/2026-10-02/*' -Destination (Join-Path $videoDataRoot 'out') -Recurse -Force
   $env:RADAR_DATA_DIR = $videoDataRoot
   & .\.venv\Scripts\python.exe -m uvicorn radar.api.app:app --app-dir backend --host 127.0.0.1 --port 8000
   ```

3. Jalankan frontend seperti biasa di terminal terpisah, lalu buka
   `http://127.0.0.1:5173/?src=out`.
4. Sebelum merekam, buka `http://127.0.0.1:8000/api/snapshots/out/meta` dan
   pastikan `as_of` bernilai `2026-10-02`. Di Daily Flow, filter Accumulation harus
   menampilkan UNTR, AMRT, dan PGEO; PGEO harus berada di peringkat 3 dengan skor
   16,8.

Jangan menyalin snapshot histori langsung ke `data/out`; folder temporary menjaga
snapshot terbaru tetap utuh.

## Storyboard utama

| Waktu | Bagian | Tampilan dan aksi | Pesan yang harus tertangkap |
| --- | --- | --- | --- |
| 00:00-00:16 | Masalah | Mulai dari Overview; sisipkan overlay tabel broker yang padat bila tersedia. | Data tersedia, tetapi proses menemukan sinyal masih lambat dan terfragmentasi. |
| 00:16-00:32 | Audiens dan solusi | Tampilkan dua CTA: Daily flow dan Investor lens. | Satu produk, dua horizon pengguna. |
| 00:32-00:47 | Orientasi | Tunjukkan metric cards, breadth, tanggal snapshot, LQ45, dan attribution Sectors. | Cakupan pasar dan konteks selalu terlihat. |
| 00:47-01:16 | Daily workflow | Buka Daily flow, filter Accumulation, cari PGEO, expand **Explain this score**. | Ranking transparan dan dapat difilter; komponen skor dapat diaudit. |
| 01:16-01:51 | Bukti saham | Masuk ke PGEO. Tampilkan dua score cards, chart foreign flow, dan top brokers. | Pengguna bergerak dari sinyal menuju bukti, bukan berhenti pada ranking. |
| 01:51-02:11 | Investor workflow | Buka Investor lens, cari PGEO, tampilkan pillar bars dan coverage. | Fundamental dan arus modal jangka panjang terhubung dalam satu konteks. |
| 02:11-02:25 | Monitoring | Bintangi PGEO, buka Watchlist, lalu Market Brief dan sorot score flip PGEO. | Insight berubah menjadi workflow riset berulang. |
| 02:25-02:43 | Telegram | Buka chat bot; kirim `/stock PGEO`, lalu tampilkan `/brief daily` dengan quick cut. | Pengguna dapat meminta skor, alasan, dan perubahan pasar dari snapshot yang sama di luar dashboard. |
| 02:43-02:55 | Kedalaman teknis | Tampilkan diagram pipeline atau Methodology, termasuk cabang Telegram. | Sectors adalah sumber inti; dashboard dan bot memakai output tervalidasi yang sama. |
| 02:55-02:59 | Penutup | End card dengan brand, track, attribution, disclaimer. | Nama produk dan proposisi nilai melekat. |

## Naskah Bahasa Indonesia

> Durasi sasaran voice-over: 2 menit 45 detik sampai 2 menit 55 detik. Baca natural; jangan mempercepat bagian bukti PGEO.

| Waktu | Narasi | Aksi layar |
| --- | --- | --- |
| 00:00-00:16 | Investor ritel Indonesia sudah dapat melihat broker summary, foreign flow, fundamental, dan data kepemilikan. Masalahnya, data itu tersebar dan harus dibandingkan satu per satu. | Overview, lalu overlay singkat data/tabel yang padat. |
| 00:16-00:32 | Flow Radar adalah market intelligence untuk saham LQ45, dibangun di atas Sectors Financial API. Trader dapat melihat ke mana modal bergerak hari ini, sementara investor dapat menilai akumulasi dalam horizon lebih panjang. | Sorot tombol Daily flow dan Investor lens. |
| 00:32-00:47 | Overview merangkum breadth pasar dan pemimpin di kedua horizon. Tanggal snapshot, sumber data, serta disclaimer selalu terlihat agar setiap angka memiliki konteks. | Scroll perlahan melalui metric cards dan breadth. |
| 00:47-01:16 | Kita mulai dari Daily Flow. Skor berjalan dari minus seratus untuk distribusi hingga plus seratus untuk akumulasi. Ranking dapat dicari dan difilter. PGEO berada di peringkat tiga dengan skor 16,8. Buka penjelasannya untuk melihat kontribusi foreign flow, streak, konsentrasi broker, institutional net flow, divergence, dan insider - bukan skor misterius. | Filter Accumulation, fokus PGEO, buka Explain this score. |
| 01:16-01:51 | Klik PGEO untuk memeriksa buktinya. Satu halaman menghubungkan kedua skor dengan harga, foreign flow harian dan kumulatif, riwayat skor, komposisi pemegang saham, serta broker pembeli dan penjual terbesar. Pada snapshot ini, broker institusional menunjukkan net accumulation sekitar 42 persen dari net traded value selama dua minggu. | Buka PGEO, sorot dua skor, lalu scroll grafik dan tabel broker. |
| 01:51-02:11 | Investor Lens menggabungkan quality 40 persen, valuation 25 persen, dan slow flow 35 persen. PGEO berada di peringkat sembilan dengan coverage 100 persen; setiap input tetap dapat diperiksa sebelum masuk watchlist. | Buka Investor lens, cari PGEO, sorot pilar dan coverage, lalu bintangi. |
| 02:11-02:25 | Watchlist menjaga riset tetap fokus. Market Brief kemudian menangkap perubahan penting, termasuk PGEO yang bergerak dari netral 11,5 menjadi akumulasi 16,8. | Buka Watchlist, lalu Market Brief dan sorot score flip PGEO. |
| 02:25-02:43 | Riset tidak berhenti di dashboard. Di Telegram, kirim `/stock PGEO` untuk melihat kedua skor dan alasan utama, lalu `/brief daily` untuk membaca perubahan pasar dari snapshot yang sama. Bot ini read-only dan tidak melakukan transaksi. | Tampilkan command `/stock PGEO`, responsnya, lalu quick cut ke `/brief daily`. |
| 02:43-02:55 | Di belakang layar, data Sectors masuk ke SQLite, diproses dengan aturan transparan, lalu divalidasi menjadi snapshot JSON yang sama untuk dashboard, brief, dan bot Telegram. Hasilnya konsisten dan dapat diaudit. | Tampilkan diagram pipeline dengan cabang dashboard dan Telegram, lalu Methodology. |
| 02:55-02:59 | Flow Radar: clarity behind the capital. Informasi, bukan nasihat investasi. | End card. |

## English Script

> Target voice-over length: 2 minutes 45 seconds to 2 minutes 55 seconds. Keep a natural pace and leave room for the PGEO evidence to remain readable.

| Time | Voice-over | On-screen action |
| --- | --- | --- |
| 00:00-00:16 | Indonesian retail investors can access broker summaries, foreign flow, fundamentals, and ownership data. The problem is fragmentation: the evidence still has to be compared one table at a time. | Show the Overview, then a brief overlay of dense source tables. |
| 00:16-00:32 | Flow Radar is market intelligence for LQ45 equities, built on the Sectors Financial API. Traders can see where capital is moving today, while investors can examine accumulation over a longer horizon. | Highlight the Daily flow and Investor lens actions. |
| 00:32-00:47 | The Overview summarizes market breadth and the leaders for both horizons. The snapshot date, data source, and disclaimer stay visible, so every number keeps its context. | Move through the metric cards and breadth chart. |
| 00:47-01:16 | Start with Daily Flow. Scores run from minus one hundred for distribution to plus one hundred for accumulation. The ranking is searchable and filterable. PGEO ranks third at 16.8. Expand the explanation to inspect foreign flow, streak, broker concentration, institutional net flow, divergence, and insider activity - not a mysterious black-box score. | Filter Accumulation, focus on PGEO, and expand Explain this score. |
| 01:16-01:51 | Open PGEO to inspect the evidence. One page connects both scores with price, daily and cumulative foreign flow, score history, ownership composition, and the leading buying and selling brokers. In this snapshot, institutional brokers show net accumulation equal to about 42 percent of net traded value over two weeks. | Open PGEO, show both scores, then scroll through charts and broker tables. |
| 01:51-02:11 | Investor Lens combines 40 percent quality, 25 percent valuation, and 35 percent slow flow. PGEO ranks ninth with full input coverage, and every input remains available for inspection before it enters a watchlist. | Open Investor Lens, find PGEO, highlight pillars and coverage, then star it. |
| 02:11-02:25 | The watchlist keeps research focused. Market Brief captures important changes, including PGEO moving from neutral at 11.5 to accumulation at 16.8. | Open Watchlist, then Market Brief and highlight PGEO's score flip. |
| 02:25-02:43 | Research does not stop at the dashboard. On Telegram, `/stock PGEO` retrieves both scores and their main reasons, while `/brief daily` returns market changes from the same snapshot. The bot is read-only and never executes trades. | Show `/stock PGEO` and its response, then quick-cut to `/brief daily`. |
| 02:43-02:55 | Behind the interface, Sectors data enters SQLite, passes through transparent rules, and becomes validated JSON shared by the dashboard, briefs, and Telegram bot. The result is consistent and auditable. | Show the pipeline with its dashboard and Telegram branches, then Methodology. |
| 02:55-02:59 | Flow Radar: clarity behind the capital. Information, not investment advice. | Show the end card. |

## Arahan produksi

- Rekam voice-over lebih dahulu, lalu sesuaikan screen recording terhadap ritmenya.
- Gunakan chapter card sangat singkat: **The Problem**, **Two Horizons**, **Follow the Evidence**, dan **Research Anywhere**.
- Pertahankan cursor pada elemen yang sedang dibahas; jangan melakukan klik saat kalimat penting belum selesai.
- Beri zoom editor pada komponen PGEO ketika kontribusi skor dan angka 42% disebut.
- Untuk Telegram, rekam hanya area chat bot, perbesar teks, dan tahan setiap respons cukup lama untuk membaca dua skor serta minimal satu alasan.
- Gunakan setup snapshot temporary di atas, lalu jalankan bot dengan `& .\.venv\Scripts\python.exe -m radar bot --out data/out/history/2026-10-02` agar angka Telegram identik dengan demo dashboard tanpa menimpa `data/out` terbaru.
- Sembunyikan username, foto profil, daftar chat, notifikasi, token, dan identitas pribadi lain sebelum merekam Telegram.
- Diagram teknis harus tetap sederhana; tidak perlu memperlihatkan source code kecuali ada waktu lebih.
- Jika durasi terlalu panjang, potong overlay masalah dan interaksi chart-range terlebih dahulu. Jangan memotong problem, audiens, core workflow, bukti Telegram, atau attribution Sectors.
- Gunakan satu bahasa voice-over per versi video. Jangan mencampur narasi Inggris dan Indonesia dalam satu upload.

## Checklist validasi isi

- [ ] Problem dan intended audience dijelaskan dalam 35 detik pertama.
- [ ] Core workflow terlihat end-to-end: ranking -> explanation -> stock evidence -> watchlist/brief -> Telegram.
- [ ] Daily Flow dan Investor Lens dibedakan dengan jelas.
- [ ] Sectors Financial API disebut sebagai sumber data inti.
- [ ] Contoh PGEO dan angka yang disebut cocok dengan snapshot yang direkam.
- [ ] `/stock PGEO` dan `/brief daily` menampilkan respons dari snapshot 2 Oktober 2026, bukan output terbaru yang berbeda.
- [ ] Telegram ditampilkan sebagai interface read-only; tidak ada klaim alert real-time atau eksekusi transaksi.
- [ ] Tidak ada identitas chat, notifikasi pribadi, atau credential Telegram yang terlihat.
- [ ] Tidak ada klaim rekomendasi, prediksi return, atau jaminan hasil.
- [ ] Disclaimer terlihat pada penutup dan tetap tersedia di UI.
- [ ] Durasi final di bawah 3:00, idealnya 2:50-2:57.
- [ ] Video dapat dibuka juri tanpa meminta akses: YouTube/Vimeo public atau unlisted, Google Drive link-sharing aktif, atau Loom.
