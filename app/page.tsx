'use client';

import StaggeredMenu from '@/components/StaggeredMenu';
import SplashCursor from '@/components/SplashCursor';
import TechText from '@/components/TechText';

const welcomeLetters = ['W', 'E', 'L', 'C', 'O', 'M', 'E'];

export default function Home() {
  return (
    <main className="intro-home">
    
    <SplashCursor
        rainbow={false}
        size={1}
        force={3}
        swirl={21.5}
        trail={5}
        clickSplash
        colors={["#006895","#0799ba","#1fa5b0","#8ec1b8","#dfdcd3"]}
        colorSpeed={4}
        intensity={3}
        momentum={2}
        glow={0.1}
    />
      <div className="welcome-intro" aria-hidden="true">
        <p className="welcome-intro__eyebrow">MUHADIIB DWI TAAJUDDIIN TRISNO</p>
        <div className="welcome-intro__word">
          {welcomeLetters.map((letter, index) => (
            <span key={`${letter}-${index}`} style={{ animationDelay: `${index * 65}ms` }}>{letter}</span>
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
        openMenuButtonColor="#000000"
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
