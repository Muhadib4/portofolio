'use client';

import PortfolioEffects from '@/components/PortfolioEffects';
import TechText from '@/components/TechText';

const welcomeLetters = ['W', 'E', 'L', 'C', 'O', 'M', 'E'];

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
      </section>
    </main>
  );
}
