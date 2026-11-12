'use client';

import PortfolioEffects from '@/components/PortfolioEffects';
import TechText from '@/components/TechText';

const welcomeLetters = ['W', 'E', 'L', 'C', 'O', 'M', 'E'];

const interests = [
  { number: '01', title: 'Building for the web', detail: 'Designing and developing digital experiences through code.' },
  { number: '02', title: 'AI & Machine Learning', detail: 'Exploring intelligent systems and how technology can solve problems.' },
  { number: '03', title: 'Music', detail: 'Finding focus and inspiration through music.' },
  { number: '04', title: 'Gaming', detail: 'Enjoying games, strategy, and the worlds they create.' },
];

export default function Home() {
  return (
    <main className="intro-home">
      <PortfolioEffects />
      <div className="welcome-intro" aria-hidden="true">
        <p className="welcome-intro__eyebrow">MUHADIIB DWI TAAJUDDIIN TRISNO</p>
        <div className="welcome-intro__word">
          {welcomeLetters.map((letter, index) => (
            <span key={`${letter}-${index}`} style={{ animationDelay: `${index * 65}ms` }}>{letter}</span>
          ))}
        </div>
        <div className="welcome-intro__line"><span /></div>
      </div>

      <section className="home-content" id="top" aria-labelledby="intro-name">
        <p className="home-content__eyebrow">INFORMATICS · DEVELOPER IN PROGRESS</p>
        <h1 id="intro-name" className="home-content__name">
          <TechText
            text="Muhadiib"
            fontWeight={555}
            fontSize={150}
            align="left"
            fontFamily="Arial, Helvetica, sans-serif"
            color="#F5F5F5"
            accentColor="#00d8ff"
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
        <p className="home-content__subtitle">Learning · Full-Stack Development · Machine Learning · AI Development</p>
        <a className="home-content__scroll" href="#about" aria-label="Scroll to about me">
          <span>SCROLL TO EXPLORE</span><span className="home-content__scroll-line" />
        </a>
      </section>

      <section className="portfolio-section about-section" id="about" aria-labelledby="about-title">
        <div className="section-meta"><span>01 / ABOUT</span><span>A LITTLE INTRODUCTION</span></div>
        <div className="about-layout">
          <p className="section-kicker">WHO I AM</p>
          <div>
            <h2 id="about-title">Curious by nature.<br />Driven to create.</h2>
            <p className="about-copy">
              Hi, I’m Muhadiib — an Informatics student with a growing interest in technology and software development.
              I enjoy learning how things work, turning ideas into projects, and exploring the possibilities of Full-Stack
              Development, Machine Learning, and Artificial Intelligence.
            </p>
            <p className="about-copy about-copy--muted">
              I’m still learning, experimenting, and improving one project at a time.
            </p>
          </div>
        </div>
      </section>

      <section className="portfolio-section interests-section" id="interests" aria-labelledby="interests-title">
        <div className="section-meta"><span>02 / INTERESTS</span><span>OUTSIDE THE CODE</span></div>
        <div className="interests-heading">
          <p className="section-kicker">WHAT I ENJOY</p>
          <h2 id="interests-title">A few things<br />that keep me curious.</h2>
        </div>
        <div className="interest-list">
          {interests.map((item) => (
            <article className="interest-item" key={item.number}>
              <span className="interest-number">{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
              <span className="interest-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-section connect-section" id="connect" aria-labelledby="connect-title">
        <div className="section-meta"><span>03 / CONNECT</span><span>ELSEWHERE ON THE INTERNET</span></div>
        <p className="section-kicker">FIND ME ONLINE</p>
        <h2 id="connect-title">Let’s connect.</h2>
        <p className="connect-copy">You can find my work and projects on GitHub.</p>
        <a className="social-link" href="https://github.com/Muhadib4" target="_blank" rel="noopener noreferrer">
          <span>GitHub</span><span>@Muhadib4</span><span aria-hidden="true">↗</span>
        </a>
        <footer className="portfolio-footer">
          <span>MUHADIIB DWI TAAJUDDIIN TRISNO</span>
          <a href="#top">BACK TO TOP ↑</a>
          <span>© {new Date().getFullYear()}</span>
        </footer>
      </section>
    </main>
  );
}
