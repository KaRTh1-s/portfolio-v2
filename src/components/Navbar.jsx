import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Home, User, GraduationCap, Briefcase, FolderOpen, Code2, Mail } from 'lucide-react';

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

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const navLinks = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'About', href: '#about', icon: User },
    { name: 'Education', href: '#education', icon: GraduationCap },
    { name: 'Experience', href: '#experience', icon: Briefcase },
    { name: 'Projects', href: '#projects', icon: FolderOpen },
    { name: 'Skills', href: '#skills', icon: Code2 },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      transition: 'all 0.3s ease',
      backgroundColor: isScrolled
        ? (theme === 'dark' ? 'rgba(11, 17, 32, 0.95)' : 'rgba(250, 250, 249, 0.95)')
        : 'transparent',
      backdropFilter: isScrolled ? 'blur(12px)' : 'none',
      borderBottom: isScrolled ? '1px solid var(--border-color)' : '1px solid transparent',
    }}>
      {/* Top bar */}
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.85rem 1.5rem',
      }}>
        <a href="#home" style={{ fontSize: '1.5rem', fontWeight: 'bold', flexShrink: 0 }} className="gradient-text">
          Portfolio.
        </a>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-menu">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} style={{ fontWeight: 500 }} className="nav-link">
              {link.name}
            </a>
          ))}
          <button onClick={toggleTheme} className="theme-btn" aria-label="Toggle theme" style={{
            padding: '0.45rem',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile Hamburger only */}
        <button
          className="mobile-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          style={{
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            backgroundColor: isMenuOpen ? 'var(--accent-color)' : 'var(--bg-card)',
            color: isMenuOpen ? '#fff' : 'var(--text-primary)',
            border: '1px solid var(--border-color)',
            flexShrink: 0,
            transition: 'all 0.2s ease'
          }}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Full Dropdown */}
      <div
        className="mobile-drawer"
        style={{
          maxHeight: isMenuOpen ? '600px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          backgroundColor: theme === 'dark' ? 'rgba(11,17,32,0.98)' : 'rgba(250, 250, 249, 0.98)',
          backdropFilter: 'blur(16px)',
          borderTop: isMenuOpen ? '1px solid var(--border-color)' : 'none',
        }}
      >
        <div style={{ padding: '1rem 1.5rem 1.25rem' }}>
          {/* Nav Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '1rem' }}>
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    color: 'var(--text-primary)',
                    fontWeight: 500,
                    fontSize: '1rem',
                    textDecoration: 'none',
                    transition: 'background 0.18s ease, color 0.18s ease',
                  }}
                  className="mobile-nav-link"
                >
                  <span style={{
                    width: '34px', height: '34px',
                    borderRadius: '8px',
                    background: 'var(--hover-primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--accent-color)',
                    flexShrink: 0,
                  }}>
                    <Icon size={16} />
                  </span>
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Divider + Theme Row */}
          <div style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
              {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
            </span>
            <button onClick={toggleTheme} style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '0.45rem 1rem',
              borderRadius: '20px',
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              fontSize: '0.85rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}>
              {theme === 'dark' ? <><Sun size={15} /> Light</> : <><Moon size={15} /> Dark</>}
            </button>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-toggle { display: none !important; }
          .mobile-drawer { display: none !important; }
        }
        .nav-link:hover { color: var(--accent-color) !important; }
        .mobile-nav-link:hover {
          background: var(--hover-primary) !important;
          color: var(--accent-color) !important;
        }
        .theme-btn:hover { opacity: 0.85; }
      ` }} />
    </nav>
  );
};

export default Navbar;
