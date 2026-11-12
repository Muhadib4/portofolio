export type PortfolioLanguage = 'en' | 'id';

export type MenuCopy = {
  openMenu: string;
  closeMenu: string;
  navigation: string;
  socials: string;
  language: string;
  switchToEnglish: string;
  switchToIndonesian: string;
  effects: string;
  openEffects: string;
  cursor: string;
  background: string;
  splashCursor: string;
  topography: string;
  interactionSound: string;
  soundEffects: string;
  volume: string;
};

export type PortfolioCopy = {
  metadata: { title: string; description: string };
  hero: { welcome: string; eyebrow: string; subtitle: string; scroll: string };
  navigation: { home: string; about: string; interests: string; connect: string };
  about: { meta: string; metaDetail: string; kicker: string; title: string; body: string };
  interests: {
    meta: string;
    metaDetail: string;
    kicker: string;
    title: string;
    items: { title: string; detail: string }[];
  };
  connect: {
    meta: string;
    metaDetail: string;
    kicker: string;
    title: string;
    body: string;
    profile: string;
  };
  footer: { backToTop: string };
  menu: MenuCopy;
};

export const portfolioCopy: Record<PortfolioLanguage, PortfolioCopy> = {
  en: {
    metadata: {
      title: 'Muhadiib: Informatics Student',
      description: 'The personal portfolio of Muhadiib Dwi Taajuddiin Trisno.'
    },
    hero: {
      welcome: 'WELCOME',
      eyebrow: 'INFORMATICS · DEVELOPER IN PROGRESS',
      subtitle: 'Learning · Full-Stack Development · Machine Learning · AI Development',
      scroll: 'Scroll to explore'
    },
    navigation: { home: 'Home', about: 'About', interests: 'Interests', connect: 'Connect' },
    about: {
      meta: '01 / About',
      metaDetail: 'Informatics student',
      kicker: 'A little about me',
      title: 'Technology, learned by building.',
      body: 'I’m an Informatics student interested in how technology can turn ideas into useful software. I’m focused on Full-Stack Development, Machine Learning, and AI Development, learning through experimentation and personal projects.'
    },
    interests: {
      meta: '02 / Interests',
      metaDetail: 'Work and play',
      kicker: 'Things I return to',
      title: 'Interests beyond the screen.',
      items: [
        { title: 'Web Development', detail: 'Designing and developing digital experiences through code.' },
        { title: 'Artificial Intelligence & Machine Learning', detail: 'Exploring intelligent systems and how technology can solve problems.' },
        { title: 'Music', detail: 'Finding focus and inspiration through music.' },
        { title: 'Gaming', detail: 'Enjoying games, strategy, and the worlds they create.' }
      ]
    },
    connect: {
      meta: '03 / Connect',
      metaDetail: 'One place to start',
      kicker: 'Find me online',
      title: 'Projects and code.',
      body: 'My GitHub profile is where I share projects and code.',
      profile: 'View profile'
    },
    footer: { backToTop: 'Back to top' },
    menu: {
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      navigation: 'Main navigation',
      socials: 'Social media',
      language: 'Language',
      switchToEnglish: 'Switch language to English',
      switchToIndonesian: 'Switch language to Indonesian',
      effects: 'Effects',
      openEffects: 'Open visual effects settings',
      cursor: 'Cursor',
      background: 'Background',
      splashCursor: 'Splash cursor',
      topography: 'Topography',
      interactionSound: 'Interaction sound',
      soundEffects: 'Sound effects',
      volume: 'Volume'
    }
  },
  id: {
    metadata: {
      title: 'Muhadiib: Mahasiswa Informatika',
      description: 'Portofolio pribadi Muhadiib Dwi Taajuddiin Trisno.'
    },
    hero: {
      welcome: 'SELAMAT DATANG',
      eyebrow: 'MAHASISWA INFORMATIKA · CALON PENGEMBANG',
      subtitle: 'Belajar · Pengembangan Full-Stack · Machine Learning · AI Development',
      scroll: 'Gulir untuk menjelajah'
    },
    navigation: { home: 'Beranda', about: 'Tentang', interests: 'Minat', connect: 'Terhubung' },
    about: {
      meta: '01 / Tentang',
      metaDetail: 'Mahasiswa Informatika',
      kicker: 'Sekilas tentang saya',
      title: 'Belajar teknologi dengan membangun.',
      body: 'Saya mahasiswa Informatika yang tertarik pada cara teknologi mengubah ide menjadi perangkat lunak yang bermanfaat. Fokus saya adalah Full-Stack Development, Machine Learning, dan AI Development, yang saya pelajari melalui eksperimen dan proyek pribadi.'
    },
    interests: {
      meta: '02 / Minat',
      metaDetail: 'Belajar dan bersantai',
      kicker: 'Hal yang saya gemari',
      title: 'Minat di luar layar.',
      items: [
        { title: 'Pengembangan Web', detail: 'Merancang dan mengembangkan pengalaman digital melalui kode.' },
        { title: 'Kecerdasan Buatan & Pembelajaran Mesin', detail: 'Mengeksplorasi sistem cerdas dan cara teknologi membantu menyelesaikan masalah.' },
        { title: 'Musik', detail: 'Menemukan fokus dan inspirasi melalui musik.' },
        { title: 'Game', detail: 'Menikmati permainan, strategi, dan dunia yang dibangun di dalamnya.' }
      ]
    },
    connect: {
      meta: '03 / Terhubung',
      metaDetail: 'Mulai dari sini',
      kicker: 'Temukan saya',
      title: 'Proyek dan kode.',
      body: 'Saya membagikan proyek dan kode melalui profil GitHub.',
      profile: 'Lihat profil'
    },
    footer: { backToTop: 'Kembali ke atas' },
    menu: {
      openMenu: 'Buka menu',
      closeMenu: 'Tutup menu',
      navigation: 'Navigasi utama',
      socials: 'Media sosial',
      language: 'Bahasa',
      switchToEnglish: 'Ganti bahasa ke Inggris',
      switchToIndonesian: 'Ganti bahasa ke Indonesia',
      effects: 'Efek',
      openEffects: 'Buka pengaturan efek visual',
      cursor: 'Kursor',
      background: 'Latar',
      splashCursor: 'Efek riak kursor',
      topography: 'Topografi',
      interactionSound: 'Suara interaksi',
      soundEffects: 'Efek suara',
      volume: 'Volume'
    }
  }
};
