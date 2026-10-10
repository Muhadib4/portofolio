const welcomeLetters = ['W', 'E', 'L', 'C', 'O', 'M', 'E'];

export default function Home() {
  return (
    <main className="intro-home">
      <div className="welcome-intro" aria-hidden="true">
        <p className="welcome-intro__eyebrow">MUHADIIB DWI TAAJUDDIIN TRISNO</p>
        <div className="welcome-intro__word">
          {welcomeLetters.map((letter, index) => (
            <span key={index} style={{ animationDelay: `${index * 65}ms` }}>{letter}</span>
          ))}
        </div>
        <div className="welcome-intro__line"><span /></div>
      </div>

      <div className="home-frame">
        <header className="home-header">
          <a className="home-header__brand" href="#top" aria-label="Muhadiib home">
            <span className="home-header__mark" aria-hidden="true">M</span>
            <span>MUHADIIB</span>
          </a>
          <p>PERSONAL PORTFOLIO <span>/</span> 01</p>
        </header>

        <section className="intro-home__content" id="top" aria-labelledby="intro-name">
          <div className="intro-home__rail" aria-hidden="true"><span>INFORMATICS</span><i /></div>
          <div className="intro-home__main">
            <p className="intro-home__eyebrow">INFORMATICS · DEVELOPER IN PROGRESS</p>
            <h1 id="intro-name" className="intro-home__name"><span>Muhadiib</span><span>Dwi Taajuddiin Trisno</span></h1>
            <p className="intro-home__focus">Learning <span>·</span> Full-Stack Development <span>·</span> Machine Learning <span>·</span> AI Development</p>
          </div>
          <div className="intro-home__side-note"><span>01</span><p>Learning<br />by building.</p></div>
        </section>

        <footer className="home-footer">
          <span>MUHADIIB DWI TAAJUDDIIN TRISNO</span>
          <span className="home-footer__line" aria-hidden="true" />
          <span>© {new Date().getFullYear()} / HOMEPAGE</span>
        </footer>
      </div>
    </main>
  );
}
