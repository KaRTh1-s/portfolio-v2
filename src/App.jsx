import React, { useEffect } from 'react';
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

function App() {

  useEffect(() => {
    // Initial theme setup (dark mode by default handled in CSS/Navbar)

    // Interactive Glow Effect for Cards
    const handleMouseMove = (e) => {
      document.querySelectorAll('.card-hover').forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflowX: 'hidden', width: '100%' }}>
      <Navbar />

      <main style={{ flex: 1, overflowX: 'hidden', width: '100%' }}>
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
