import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [theme, setTheme] = useState('dark');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 1000,
      transition: 'all 0.3s ease',
      backgroundColor: isScrolled ? (theme === 'dark' ? 'rgba(11, 17, 32, 0.9)' : 'rgba(243, 244, 246, 0.9)') : 'transparent',
      backdropFilter: isScrolled ? 'blur(10px)' : 'none',
      borderBottom: isScrolled ? `1px solid var(--border-color)` : '1px solid transparent',
      padding: '1rem 0'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="#home" style={{ fontSize: '1.5rem', fontWeight: 'bold' }} className="gradient-text">
          Portfolio.
        </a>

        {/* Desktop Menu */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-menu">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} style={{ fontWeight: 500 }} className="nav-link">
              {link.name}
            </a>
          ))}
          <button onClick={toggleTheme} style={{
            padding: '0.5rem',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="mobile-toggle" style={{ display: 'none', alignItems: 'center', gap: '0.5rem' }}>
          <button onClick={toggleTheme} style={{
            padding: '0.4rem',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.4rem',
            borderRadius: '6px',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)'
          }}>
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Panel */}
      {isMenuOpen && (
        <div style={{
          backgroundColor: theme === 'dark' ? 'rgba(11,17,32,0.98)' : 'rgba(243,244,246,0.98)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid var(--border-color)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
        }} className="mobile-menu-dropdown">
          <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', padding: '0.75rem 1.5rem' }}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="mobile-nav-link"
                onClick={() => setIsMenuOpen(false)}
                style={{
                  fontWeight: 500,
                  fontSize: '1rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  display: 'block',
                  color: 'var(--text-primary)',
                }}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-toggle { display: none !important; }
          .mobile-menu-dropdown { display: none !important; }
        }
        .nav-link:hover { color: var(--accent-color) !important; }
        .mobile-nav-link:hover { background: var(--hover-primary); color: var(--accent-color) !important; }
      `}} />
    </nav>
  );
};

export default Navbar;
