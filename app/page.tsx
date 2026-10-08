'use client';

import { useEffect, useState } from 'react';

const copy = {
  en: {
    enter: 'Enter portfolio',
    role: 'Informatics student',
    intro: 'Learning to build things that make sense.',
    kicker: 'A quiet place for curious work.',
    work: 'Selected work',
    workNote: 'A collection of things I am learning to make. Case studies will find their way here soon.',
    about: 'About',
    aboutText: 'I am Muhadiib Dwi Taajuddiin Trisno, an Informatics student exploring full-stack development, machine learning, and AI development.',
    contact: 'Let’s talk',
    contactText: 'Have an idea, a question, or just want to say hello?',
    email: 'Send an email',
    location: 'Based in Indonesia · Open to learning',
  },
  id: {
    enter: 'Masuk ke portofolio',
    role: 'Mahasiswa informatika',
    intro: 'Belajar membangun hal-hal yang masuk akal.',
    kicker: 'Ruang tenang untuk karya yang penuh rasa ingin tahu.',
    work: 'Karya pilihan',
    workNote: 'Kumpulan hal yang sedang saya pelajari untuk dibuat. Studi kasus akan hadir di sini.',
    about: 'Tentang',
    aboutText: 'Saya Muhadiib Dwi Taajuddiin Trisno, mahasiswa Informatika yang mengeksplorasi full-stack development, machine learning, dan AI development.',
    contact: 'Mari terhubung',
    contactText: 'Punya ide, pertanyaan, atau sekadar ingin menyapa?',
    email: 'Kirim email',
    location: 'Berbasis di Indonesia · Terbuka untuk belajar',
  },
};

type Language = keyof typeof copy;

function Mark() {
  return <span className="mark" aria-hidden="true"><span /><span /><span /></span>;
}

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [light, setLight] = useState(false);
  const t = copy[language];

  useEffect(() => {
    document.body.classList.toggle('is-light', light);
    document.body.classList.toggle('is-entered', entered);
    return () => {
      document.body.classList.remove('is-light', 'is-entered');
    };
  }, [entered, light]);

  const enter = () => {
    setEntered(true);
    window.setTimeout(() => document.getElementById('content')?.focus(), 650);
  };

  return (
    <main>
      <section className={`threshold ${entered ? 'threshold--left' : ''}`} aria-hidden={entered}>
        <div className="threshold__grain" />
        <div className="threshold__top"><span>MMXXIV / 01</span><span>Portfolio</span></div>
        <div className="threshold__center">
          <p className="eyebrow">{t.role}</p>
          <h1>Muhadiib<span className="dot">.</span></h1>
          <p className="threshold__name">Muhadiib Dwi Taajuddiin Trisno</p>
          <button className="enter-button" onClick={enter} autoFocus>
            <span>{t.enter}</span><span className="arrow">↗</span>
          </button>
        </div>
        <div className="threshold__bottom"><span>Scroll to explore</span><span className="line" /></div>
      </section>

      <div className="site-shell" id="content" tabIndex={-1}>
        <header className="site-header">
          <a className="brand" href="#top" aria-label="Muhadiib home"><Mark /><span>Muhadiib</span></a>
          <nav aria-label="Primary navigation">
            <a href="#work">{t.work}</a><a href="#about">{t.about}</a><a href="#contact">{t.contact}</a>
          </nav>
          <div className="header-actions">
            <button className="text-button" onClick={() => setLanguage(language === 'en' ? 'id' : 'en')} aria-label="Change language">{language === 'en' ? 'ID' : 'EN'}</button>
            <button className="theme-button" onClick={() => setLight(!light)} aria-label="Toggle light mode">{light ? '☼' : '◐'}</button>
          </div>
        </header>

        <section className="hero" id="top">
          <div className="hero__meta"><span>01 — Intro</span><span>{t.kicker}</span></div>
          <div className="hero__content"><p className="eyebrow">{t.role} / 2024</p><h2>{t.intro}</h2><p className="hero__signature">— Muhadiib</p></div>
          <div className="hero__aside"><span className="aside-label">Focus</span><span>Full-stack<br />Machine learning<br />AI development</span></div>
          <div className="scroll-cue"><span>Scroll down</span><span className="scroll-cue__line" /></div>
        </section>

        <section className="section work-section" id="work">
          <div className="section-heading"><p className="eyebrow">02 — Archive</p><h3>{t.work}<span className="dot">.</span></h3></div>
          <div className="empty-work"><span className="empty-work__number">00</span><div><p>{t.workNote}</p><span className="empty-work__rule" /></div><span className="empty-work__caption">In progress</span></div>
        </section>

        <section className="section about-section" id="about">
          <div className="section-heading"><p className="eyebrow">03 — Context</p><h3>{t.about}<span className="dot">.</span></h3></div>
          <div className="about-grid"><p className="about-lede">A student with a soft spot for useful systems and thoughtful details.</p><div className="about-copy"><p>{t.aboutText}</p><p className="muted">{t.location}</p></div></div>
        </section>

        <section className="section contact-section" id="contact"><div><p className="eyebrow">04 — Open line</p><h3>{t.contact}<span className="dot">.</span></h3><p className="contact-note">{t.contactText}</p></div><a className="contact-link" href="mailto:hello@muhadiib.dev"><span>{t.email}</span><span>↗</span></a></section>

        <footer className="site-footer"><span>© {new Date().getFullYear()} Muhadiib</span><span>Built with intent.</span><a href="#top">Back to top ↑</a></footer>
      </div>
    </main>
  );
}
