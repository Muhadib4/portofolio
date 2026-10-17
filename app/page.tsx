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
        swirl={10}
        trail={5}
        clickSplash
        colors={[
    "#160D10",
    "#241014",
    "#35151A",
    "#481A20",
    "#5A2027",
    "#70262D",
    "#3D1018",
    "#561923",
    "#2B1118",
    "#40151F",
    "#190C12",
    "#30101B",
    "#471522",
    "#601B2A",
    "#762436",
    "#4D1828",
    "#36121E",
    "#21101B",
    "#0D1713",
    "#12231A",
    "#193024",
    "#203D2B",
    "#294A32",
    "#34563A",
    "#3D6040",
    "#17251D",
    "#26362A",
    "#344438",
    "#3E4A30",
    "#4A512F",
    "#292F1D",
    "#20291D",
    "#332D16",
    "#49401B",
    "#5B4C20",
    "#6B5927",
    "#75612F",
    "#50472B",
    "#28271B",
    "#111522",
    "#151D30",
    "#1A2640",
    "#202F50",
    "#273B60",
    "#30466D",
    "#394F79",
    "#20243D",
    "#292747",
    "#332B53",
    "#3D315F",
    "#49376A",
    "#28203E",
    "#35234A",
    "#432853",
    "#512D5B",
    "#2D1938",
    "#391F47",
    "#482653",
    "#572C5D",
    "#211729",
    "#302039",
    "#3D2949",
    "#493354",
    "#171C20",
    "#252A2D",
    "#34383A",
    "#444643",
    "#55544C",
    "#32291F",
    "#463629",
    "#59422E",
    "#6A4A30",
    "#773C25",
    "#8A4528",
    "#A04B29",
    "#5B2A1D",
    "#6B3020",
    "#7A3822",
    "#49241D",
    "#3D211C",
    "#281B19",
    "#35211B",
    "#46271D",
    "#572C1D",
    "#682F1D",
    "#782F1A",
    "#20291F",
    "#2C3522",
    "#384329",
    "#45502F",
    "#514C2B",
    "#302F25",
    "#423B2B",
    "#514635",
    "#292C27"
]}
        colorSpeed={4}
        intensity={3}
        momentum={2.5}
        glow={0}
        zIndex={0}
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
