import { Quiz } from "@/types/game";

export const CHALLENGE_QUIZZES: Quiz[] = [
  {
    id: 1,
    q: "Mengapa gotong royong dipandang sebagai intisari dari nilai-nilai luhur Pancasila?",
    options: [
      {
        text: "Karena mencerminkan kebiasaan hidup mandiri tanpa campur tangan orang lain",
        correct: false,
      },
      {
        text: "Karena menyatukan kebajikan Ketuhanan, Kemanusiaan, Persatuan, Musyawarah, dan Keadilan dalam aksi bersama",
        correct: true,
      },
      {
        text: "Karena menjadi syarat mutlak untuk mendapatkan piagam penghargaan dari dinas",
        correct: false,
      },
      {
        text: "Karena hanya boleh dilaksanakan saat hari perayaan libur nasional",
        correct: false,
      },
    ],
    explain:
      "Bung Karno menegaskan jika Pancasila diperas menjadi satu prinsip luhur, maka prinsip itu adalah Gotong Royong!",
    sila: "Sila ke-3",
  },
  {
    id: 2,
    q: "Tradisi 'Ngayah' di Bali dan 'Sambatan' di Jawa memiliki kesamaan mendasar, yaitu...",
    options: [
      { text: "Dikerjakan demi upah materi yang tinggi", correct: false },
      {
        text: "Menolong sesama warga dengan ketulusan dan ikhlas tanpa pamrih",
        correct: true,
      },
      { text: "Wajib dihadiri oleh pejabat pemerintahan saja", correct: false },
      { text: "Hanya dilakukan saat musim hujan tiba", correct: false },
    ],
    explain:
      "Keduanya merupakan wujud keikhlasan sosial masyarakat Nusantara dalam merawat keharmonisan hidup bersama.",
    sila: "Sila ke-3",
  },
  {
    id: 3,
    q: "Di Papua, tradisi sakral 'Bakar Batu' biasanya dilaksanakan oleh warga sebagai sarana...",
    options: [
      {
        text: "Perdamaian, syukuran panen, dan mempererat tali persaudaraan antar suku",
        correct: true,
      },
      {
        text: "Lomba memasak antar desa untuk memperebutkan hadiah",
        correct: false,
      },
      { text: "Pamer kekayaan hasil perkebunan keluarga", correct: false },
      { text: "Upacara perpisahan warga yang pindah tempat tinggal", correct: false },
    ],
    explain:
      "Bakar Batu adalah media sakral rekonsiliasi damai, saling memaafkan, dan perjamuan syukur kebersamaan.",
    sila: "Sila ke-3",
  },
  {
    id: 4,
    q: "Sikap manakah di lingkungan sekolah yang paling tepat mengamalkan Sila ke-3 (Persatuan Indonesia)?",
    options: [
      {
        text: "Membentuk kelompok belajar hanya dengan teman yang satu suku saja",
        correct: false,
      },
      {
        text: "Mengajak dan merangkul semua teman tanpa membedakan suku, agama, dan daerah asal saat piket kelas",
        correct: true,
      },
      {
        text: "Menolak memakai pakaian adat nusantara pada hari peringatan nasional",
        correct: false,
      },
      {
        text: "Mengutamakan kepentingan pribadi di atas tugas kelompok bersama",
        correct: false,
      },
    ],
    explain:
      "Persatuan Indonesia diwujudkan melalui keterbukaan, toleransi, dan kehangatan berteman tanpa diskriminasi.",
    sila: "Sila ke-3",
  },
  {
    id: 5,
    q: "Filosofi luhur Minangkabau 'Barek samo dipikua, ringan samo dijinjiang' mengajarkan kita untuk...",
    options: [
      {
        text: "Menyerahkan semua beban pekerjaan kepada ketua adat",
        correct: false,
      },
      {
        text: "Memikul beban berat dan menikmati kegembiraan secara bersama-sama dalam semangat kekeluargaan",
        correct: true,
      },
      {
        text: "Menghindari pekerjaan yang membutuhkan tenaga fisik",
        correct: false,
      },
      {
        text: "Hanya membantu jika ada imbalan yang setara",
        correct: false,
      },
    ],
    explain:
      "Pepatah ini melambangkan tanggung jawab kolektif dan solidaritas murni agar tidak ada kerabat yang menanggung kesulitan sendirian.",
    sila: "Sila ke-3",
  },
];

