import BrandRune from '@/components/BrandRune';

export default function Home() {
  return (
    <main className="home-only" id="top">
      <div className="home-only__backdrop" aria-hidden="true" />
      <div className="home-only__grain" aria-hidden="true" />

      <header className="home-only__top">
        <a className="home-only__brand" href="#top" aria-label="Muhadiib home">
          <BrandRune size={24} />
          <span>PORTFOLIO</span>
        </a>
        <span className="home-only__location">INDONESIA</span>
      </header>

      <section className="home-only__hero" aria-labelledby="home-title">
        <p className="home-only__eyebrow">MAHASISWA INFORMATIKA <span>·</span> DEVELOPER IN PROGRESS</p>
        <h1 id="home-title">Muhadiib<span>.</span></h1>
        <p className="home-only__role">Aspiring <em>Full-Stack Developer</em></p>
        <div className="home-only__divider" />
        <p className="home-only__label">FOCUS AREAS</p>
        <ul className="home-only__skills" aria-label="Keahlian dan minat">
          <li>Full-Stack Development</li>
          <li>Machine Learning</li>
          <li>Artificial Intelligence</li>
        </ul>
      </section>

      <footer className="home-only__bottom">
        <span>CURIOUS BY NATURE. BUILDING BY PRACTICE.</span>
        <span>© {new Date().getFullYear()} MUHADIIB</span>
      </footer>
    </main>
  );
}
