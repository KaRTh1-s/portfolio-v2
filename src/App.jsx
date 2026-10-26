import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import StatsStrip from './components/StatsStrip';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import ParticleIntro from './components/ParticleIntro';
import CursorGlow from './components/CursorGlow';
import HelpModal from './components/HelpModal';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const [introFinished, setIntroFinished] = useState(() => {
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

      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
      />

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
        {/* Compact stats strip above Achievements */}
        <StatsStrip />
        <Achievements />
        <Contact />
      </main>

      {/* Floating Question-Mark Help Button & Keyboard Shortcuts Modal */}
      <HelpModal />
    </div>
  );
}

export default App;
