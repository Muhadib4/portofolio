'use client';

import { useEffect, useState } from 'react';
import PortfolioEffects from '@/components/PortfolioEffects';
import SocialIcon from '@/components/SocialIcon';
import TechText from '@/components/TechText';
import { portfolioCopy, type PortfolioLanguage } from '@/app/portfolio-copy';
import { socialLinks } from '@/app/social-links';

export default function Home() {
  const [language, setLanguage] = useState<PortfolioLanguage>('en');
  const copy = portfolioCopy[language];
  const welcomeLetters = Array.from(copy.hero.welcome);

  useEffect(() => {
    try {
      const savedLanguage = window.localStorage.getItem('portfolio-language');
      if (savedLanguage === 'en' || savedLanguage === 'id') setLanguage(savedLanguage);
    } catch (error) {
      console.warn('Unable to read the saved language preference.', error);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = copy.metadata.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', copy.metadata.description);
  }, [copy.metadata.description, copy.metadata.title, language]);

  const changeLanguage = (nextLanguage: PortfolioLanguage) => {
    setLanguage(nextLanguage);
    try {
      window.localStorage.setItem('portfolio-language', nextLanguage);
    } catch (error) {
      console.warn('Unable to save the language preference.', error);
    }
  };

  return (
    <>
      <PortfolioEffects language={language} onLanguageChange={changeLanguage} copy={copy.menu} navigation={copy.navigation} />
      <main className="intro-home">
      <div className="welcome-intro" aria-hidden="true">
        <p className="welcome-intro__eyebrow">MUHADIIB DWI TAAJUDDIIN TRISNO</p>
        <div className={`welcome-intro__word${language === 'id' ? ' welcome-intro__word--long' : ''}`}>
          {welcomeLetters.map((letter, index) => (
            <span className={letter === ' ' ? 'welcome-intro__space' : undefined} key={`${letter}-${index}`} style={{ animationDelay: `${index * 65}ms` }}>
              {letter === ' ' ? '\u00a0' : letter}
            </span>
          ))}
        </div>
        <div className="welcome-intro__line"><span /></div>
      </div>

      <section className="home-content" id="top" aria-labelledby="intro-name">
        <p className="home-content__eyebrow">{copy.hero.eyebrow}</p>
        <h1 id="intro-name" className="home-content__name">
          <TechText
            text="Muhadiib"
            fontWeight={555}
            fontSize={150}
            align="left"
            fontFamily="Arial, Helvetica, sans-serif"
            color="#FFFFFF"
            accentColor="#4F7CFF"
            reveal="letter"
            dashLength={4}
            dashGap={2}
            specks={48}
            selection
            labels={false}
            draggable={false}
            sweep
            speed={.7}
            className="home-content__tech"
          />
          <span className="home-content__name-line">Dwi</span>
          <span className="home-content__name-line">Taajuddiin</span>
          <span className="home-content__name-line">Trisno</span>
        </h1>
        <p className="home-content__subtitle">{copy.hero.subtitle}</p>
        <a className="home-content__scroll" href="#about" aria-label={copy.hero.scroll}>
          <span>{copy.hero.scroll}</span><span className="home-content__scroll-line" aria-hidden="true" />
        </a>
      </section>

      <section className="portfolio-section about-section" id="about" aria-labelledby="about-title">
        <div className="section-meta"><span>{copy.about.meta}</span><span>{copy.about.metaDetail}</span></div>
        <div className="about-layout">
          <p className="section-kicker">{copy.about.kicker}</p>
          <div>
            <h2 id="about-title">{copy.about.title}</h2>
            <p className="about-copy">{copy.about.body}</p>
          </div>
        </div>
      </section>

      <section className="portfolio-section interests-section" id="interests" aria-labelledby="interests-title">
        <div className="section-meta"><span>{copy.interests.meta}</span><span>{copy.interests.metaDetail}</span></div>
        <div className="interests-heading">
          <p className="section-kicker">{copy.interests.kicker}</p>
          <h2 id="interests-title">{copy.interests.title}</h2>
        </div>
        <div className="interest-list">
          {copy.interests.items.map((item, index) => (
            <article className={`interest-item interest-item--${index + 1}`} key={index}>
              <div className="interest-art" aria-hidden="true">
                {index === 0 && (
                  <svg viewBox="0 0 220 132" fill="none">
                    <rect x="17" y="18" width="186" height="96" rx="8" />
                    <path d="M17 43h186" />
                    <circle cx="32" cy="31" r="3" /><circle cx="44" cy="31" r="3" /><circle cx="56" cy="31" r="3" />
                    <path d="m76 70-12 12 12 12m68-24 12 12-12 12m-20-19-10 14" />
                    <path className="interest-art__accent" d="M91 82h18" />
                  </svg>
                )}
                {index === 1 && (
                  <svg viewBox="0 0 220 132" fill="none">
                    <path d="m54 38 53 27m58-27-58 27m-53 28 53-28m58 28-58-28m0 0 1 43" />
                    <circle cx="54" cy="38" r="10" /><circle cx="165" cy="38" r="10" />
                    <circle cx="54" cy="93" r="10" /><circle cx="165" cy="93" r="10" />
                    <circle className="interest-art__core" cx="110" cy="65" r="14" />
                    <circle cx="111" cy="108" r="8" />
                  </svg>
                )}
                {index === 2 && (
                  <svg viewBox="0 0 220 132" fill="none">
                    <path d="M19 69h12l8-21 13 43 12-57 14 73 13-54 12 37 12-47 13 37 11-27 12 23 10-10h31" />
                  </svg>
                )}
                {index === 3 && (
                  <svg viewBox="0 0 220 132" fill="none">
                    <path d="M70 45h80c14 0 21 9 25 24l8 27c3 11-9 18-18 11l-25-19H80L55 107c-9 7-21 0-18-11l8-27c4-15 11-24 25-24Z" />
                    <path d="M74 63v24m-12-12h24m54-5h.1m13 13h.1" />
                    <circle className="interest-art__accent" cx="141" cy="70" r="3" />
                    <circle className="interest-art__accent" cx="154" cy="83" r="3" />
                  </svg>
                )}
              </div>
              <div className="interest-copy">
                <span className="interest-number">{String(index + 1).padStart(2, '0')}</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-section connect-section" id="connect" aria-labelledby="connect-title">
        <div className="section-meta"><span>{copy.connect.meta}</span><span>{copy.connect.metaDetail}</span></div>
        <div className="connect-layout">
          <div className="connect-intro">
            <p className="section-kicker">{copy.connect.kicker}</p>
            <h2 id="connect-title">{copy.connect.title}</h2>
            <p className="connect-copy">{copy.connect.body}</p>
          </div>
          <ul className="social-links">
            {socialLinks.map(social => (
              <li key={social.platform}>
                <a className="social-link" href={social.href} target="_blank" rel="noopener noreferrer">
                  <SocialIcon platform={social.platform} />
                  <span>{social.platform}</span>
                  <span className="social-link__handle">{social.handle || copy.connect.profile}</span>
                  <span className="social-link__arrow" aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      </main>
      <footer className="portfolio-footer">
        <span>MUHADIIB DWI TAAJUDDIIN TRISNO</span>
        <a href="#top">{copy.footer.backToTop}</a>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </>
  );
}
