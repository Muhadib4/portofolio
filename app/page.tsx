'use client';

import StaggeredMenu from '@/components/StaggeredMenu';

const welcomeLetters = ['W', 'E', 'L', 'C', 'O', 'M', 'E'];

export default function Home() {
  return (
    <main className="intro-home">
      <div className="welcome-intro" aria-hidden="true">
        <p className="welcome-intro__eyebrow">MUHADIIB DWI TAAJUDDIIN TRISNO</p>
        <div className="welcome-intro__word">
          {welcomeLetters.map((letter, index) => (
            <span key={letter} style={{ animationDelay: `${index * 65}ms` }}>{letter}</span>
          ))}
        </div>
        <div className="welcome-intro__line"><span /></div>
      </div>

      <StaggeredMenu
        isFixed
        position="right"
        displaySocials
        displayItemNumbering
        menuButtonColor="#FFFFFF"
        openMenuButtonColor="#FFFFFF"
        changeMenuColorOnOpen
        colors={[
          '#000000',
          '#050B1F',
          '#0A1B4D',
          '#123A8C',
          '#155EEF',
          '#3B82F6',
          '#BFDBFE',
          '#FFFFFF'
        ]}
        accentColor="#155EEF"
        items={[{ label: 'Home', link: '#top', ariaLabel: 'Return to homepage' }]}
        socialItems={[{ label: 'GitHub', link: 'https://github.com/Muhadib4/portofolio' }]}
      />

      <section className="home-content" id="top" aria-labelledby="intro-name">
        <p className="home-content__eyebrow">INFORMATICS · DEVELOPER IN PROGRESS</p>
        <h1 id="intro-name">Muhadiib Dwi Taajuddiin Trisno</h1>
        <p className="home-content__subtitle">Learning · Full-Stack Development · Machine Learning · AI Development</p>
      </section>
    </main>
  );
}
