'use client';

import { useEffect, useState } from 'react';
import BrandRune from '@/components/BrandRune';

const copy = {
  en: {
    role: 'Informatics student',
    introLabel: 'A personal portfolio / 01',
    heroText: 'Exploring Full-Stack Development, Machine Learning, and Artificial Intelligence through experiments and projects.',
    projects: 'Explore projects',
    aboutCta: 'About me',
    work: 'Selected projects',
    workNote: 'Projects will appear here as they take shape. This space is ready for real work, not invented case studies.',
    interests: 'Technical interests',
    interestsText: 'The questions I keep returning to.',
    about: 'About',
    aboutText: 'I am Muhadiib Dwi Taajuddiin Trisno, an Informatics student learning to make useful systems with care and clarity.',
    contact: 'Open line',
    contactText: 'Have an idea, a question, or simply want to say hello?',
    email: 'Send an email',
    location: 'Based in Indonesia · Open to learning',
  },
  id: {
    role: 'Mahasiswa informatika',
    introLabel: 'Portofolio personal / 01',
    heroText: 'Mengeksplorasi Full-Stack Development, Machine Learning, dan Artificial Intelligence melalui eksperimen dan proyek.',
    projects: 'Lihat proyek',
    aboutCta: 'Tentang saya',
    work: 'Proyek pilihan',
    workNote: 'Proyek akan hadir di sini seiring berkembang. Ruang ini disiapkan untuk karya nyata, bukan studi kasus yang dibuat-buat.',
    interests: 'Minat teknis',
    interestsText: 'Pertanyaan yang terus saya jelajahi.',
    about: 'Tentang',
    aboutText: 'Saya Muhadiib Dwi Taajuddiin Trisno, mahasiswa Informatika yang belajar membuat sistem berguna dengan perhatian dan kejelasan.',
    contact: 'Mari terhubung',
    contactText: 'Punya ide, pertanyaan, atau sekadar ingin menyapa?',
    email: 'Kirim email',
    location: 'Berbasis di Indonesia · Terbuka untuk belajar',
  },
};

type Language = keyof typeof copy;

export default function Home() {
  const [language, setLanguage] = useState<Language>('en');
  const [light, setLight] = useState(false);
  const [introActive, setIntroActive] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const t = copy[language];

  useEffect(() => {
    document.body.classList.toggle('is-light', light);
    return () => document.body.classList.remove('is-light');
  }, [light]);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => {
      const shouldReduce = motionQuery.matches;
      setReducedMotion(shouldReduce);
      if (shouldReduce) setIntroActive(false);
    };

    updateMotion();
    motionQuery.addEventListener('change', updateMotion);
    const introTimer = window.setTimeout(() => setIntroActive(false), motionQuery.matches ? 100 : 4800);

    return () => {
      motionQuery.removeEventListener('change', updateMotion);
      window.clearTimeout(introTimer);
    };
  }, []);

  return (
    <main>
      <section
        className={`cinematic-intro ${introActive ? 'cinematic-intro--active' : ''} ${reducedMotion ? 'cinematic-intro--reduced' : ''}`}
        aria-hidden={!introActive}
      >
        <div className="cinematic-intro__frames" aria-hidden="true">
          <div className="cinematic-intro__frame cinematic-intro__frame--mountain" />
          <div className="cinematic-intro__frame cinematic-intro__frame--forest" />
          <div className="cinematic-intro__frame cinematic-intro__frame--lake" />
        </div>
        <div className="cinematic-intro__shade" />
        <div className="cinematic-intro__topline">
          <span>MUHADIIB / PORTFOLIO</span>
          <span>INDONESIA · 2026</span>
        </div>
        <div className="cinematic-intro__title">
          <BrandRune size={44} className="cinematic-intro__rune" />
          <p>ENTER A DIFFERENT PERSPECTIVE</p>
          <span>MUHADIIB</span>
          <i />
        </div>
        <div className="cinematic-intro__bottomline">
          <span>FULL-STACK · MACHINE LEARNING · AI</span>
          <span className="cinematic-intro__counter">01 <b>/</b> 03</span>
        </div>
      </section>

      <div className="site-shell" id="content" tabIndex={-1}>
        <header className="site-header">
          <a className="brand" href="#top" aria-label="Muhadiib home"><BrandRune size={22} /><span>Muhadiib</span></a>
          <nav aria-label="Primary navigation">
            <a href="#work">{t.work}</a><a href="#about">{t.about}</a><a href="#contact">{t.contact}</a>
          </nav>
          <div className="header-actions">
            <button className="text-button" onClick={() => setLanguage(language === 'en' ? 'id' : 'en')} aria-label="Change language">{language === 'en' ? 'ID' : 'EN'}</button>
            <button className="theme-button" onClick={() => setLight(!light)} aria-label="Toggle light mode">{light ? '☼' : '◐'}</button>
          </div>
        </header>

        <section className="hero" id="top">
          <div className="hero__backdrop" aria-hidden="true" />
          <div className="hero__meta"><span>{t.introLabel}</span><span>Est. / 2024</span></div>
          <div className="hero__content">
            <p className="eyebrow">{t.role}</p>
            <h1>Building for the <em>digital frontier.</em></h1>
            <p className="hero__text">{t.heroText}</p>
            <div className="hero__actions">
              <a className="button button--primary" href="#work">{t.projects}<span>↗</span></a>
              <a className="button button--quiet" href="#about">{t.aboutCta}<span>↓</span></a>
            </div>
          </div>
          <div className="hero__aside"><span className="aside-label">Focus</span><span>Full-stack<br />Machine learning<br />AI development</span></div>
          <div className="scroll-cue"><span>Scroll to explore</span><span className="scroll-cue__line" /></div>
          <div className="hero__coordinates" aria-hidden="true">07°34' S<br />110°49' E</div>
        </section>

        <section className="section work-section" id="work">
          <div className="section-heading"><p className="eyebrow">02 — Archive</p><h2>{t.work}<span className="dot">.</span></h2></div>
          <div className="empty-work"><span className="empty-work__number">00</span><div><p>{t.workNote}</p><span className="empty-work__rule" /></div><span className="empty-work__caption">In progress</span></div>
        </section>

        <section className="section interests-section" id="interests">
          <div className="section-heading"><p className="eyebrow">03 — Direction</p><h2>{t.interests}<span className="dot">.</span></h2></div>
          <div className="interest-grid"><p className="interest-intro">{t.interestsText}</p><div className="interest-list"><span><b>01</b> Full-Stack Development</span><span><b>02</b> Machine Learning</span><span><b>03</b> AI Development</span></div></div>
        </section>

        <section className="section about-section" id="about">
          <div className="section-heading"><p className="eyebrow">04 — Context</p><h2>{t.about}<span className="dot">.</span></h2></div>
          <div className="about-grid"><p className="about-lede">A student with a soft spot for useful systems and thoughtful details.</p><div className="about-copy"><p>{t.aboutText}</p><p className="muted">{t.location}</p></div></div>
        </section>

        <section className="section contact-section" id="contact"><div><p className="eyebrow">05 — Open line</p><h2>{t.contact}<span className="dot">.</span></h2><p className="contact-note">{t.contactText}</p></div><a className="contact-link" href="mailto:hello@muhadiib.dev"><span>{t.email}</span><span>↗</span></a></section>
        <footer className="site-footer"><span>© {new Date().getFullYear()} Muhadiib</span><span>Built with intent.</span><a href="#top">Back to top ↑</a></footer>
      </div>
    </main>
  );
}
