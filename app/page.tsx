const welcomeLetters = ['W', 'E', 'L', 'C', 'O', 'M', 'E'];

export default function Home() {
  return (
    <main className="intro-home">
      <div className="welcome-intro" aria-hidden="true">
        <p className="welcome-intro__eyebrow">MUHADIIB DWI TAAJUDDIIN TRISNO</p>
        <div className="welcome-intro__word">
          {welcomeLetters.map((letter, index) => (
            <span key={index} style={{ animationDelay: `${index * 65}ms` }}>
              {letter}
            </span>
          ))}
        </div>
        <div className="welcome-intro__line"><span /></div>
      </div>

      <section className="intro-home__content" aria-labelledby="intro-name">
        <p className="intro-home__eyebrow">INFORMATICS · DEVELOPER IN PROGRESS</p>
        <h1 id="intro-name" className="intro-home__name">
          Muhadiib Dwi Taajuddiin Trisno
        </h1>
        <p className="intro-home__focus">
          Learning Full-Stack Development <span>·</span> Machine Learning <span>·</span> AI Development
        </p>
      </section>
    </main>
  );
}
