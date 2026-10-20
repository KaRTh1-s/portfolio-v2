import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import ParticleIntro from './components/ParticleIntro';
import CursorGlow from './components/CursorGlow';

function App() {
  const [introFinished, setIntroFinished] = useState(() => {
    // If intro was already shown in this browser session or direct section link accessed, skip intro
    if (typeof window !== 'undefined') {
      const seen = sessionStorage.getItem('portfolio_intro_seen') === 'true';
      const hasHash = window.location.hash.length > 1;
      const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
      return seen || hasHash || prefersReduced;
    }
    return false;
  });

  return (
    <div
      className="app-container"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
        width: '100%',
        position: 'relative'
      }}
    >
      {/* Feature 1: Full-Screen 3D Particle Intro with Convergence Reveal */}
      {!introFinished && (
        <ParticleIntro onComplete={() => setIntroFinished(true)} />
      )}

      {/* Feature 2: Subtle Theme-Aware Cursor Glow */}
      <CursorGlow />

      <Navbar />

      <main
        style={{
          flex: 1,
          overflowX: 'hidden',
          width: '100%',
          opacity: introFinished ? 1 : 0.95,
          transition: 'opacity 0.6s ease',
        }}
      >
        <Hero />
        <About />
        <Education />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Achievements />
        <Contact />
      </main>
    </div>
  );
}

export default App;
