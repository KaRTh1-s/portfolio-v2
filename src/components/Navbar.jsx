import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Home, User, GraduationCap, Briefcase, FolderOpen, Code2, Mail, Award } from 'lucide-react';

const Navbar = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'light';
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

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
      transition: 'all 0.25s ease',
      backgroundColor: isScrolled
        ? (theme === 'dark' ? 'rgba(15, 23, 22, 0.94)' : 'rgba(250, 249, 247, 0.94)')
        : 'transparent',
      backdropFilter: isScrolled ? 'blur(10px)' : 'none',
      borderBottom: isScrolled ? '1px solid var(--border-color)' : '1px solid transparent',
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.9rem 1.5rem',
      }}>
        {/* Brand */}
        <a href="#home" style={{
          fontSize: '1.4rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          letterSpacing: '-0.02em',
          display: 'flex',
          alignItems: 'center',
          gap: '2px'
        }}>
          Portfolio<span style={{ color: 'var(--accent-color)' }}>.</span>
        </a>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: '1.75rem', alignItems: 'center' }} className="desktop-menu">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={{
                fontSize: '0.925rem',
                fontWeight: 500,
                color: 'var(--text-primary)',
                transition: 'color 0.2s ease'
              }}
              className="nav-link"
            >
              {link.name}
            </a>
          ))}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="theme-btn"
            aria-label="Toggle theme"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              cursor: 'pointer',
              transition: 'border-color 0.2s ease, transform 0.2s ease, background-color 0.2s ease'
            }}
          >
            {theme === 'dark' ? <Sun size={17} color="var(--accent-color)" /> : <Moon size={17} />}
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="mobile-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          style={{
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            width: '38px',
            height: '38px',
            borderRadius: '8px',
            backgroundColor: 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
            flexShrink: 0,
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className="mobile-drawer"
        style={{
          maxHeight: isMenuOpen ? '500px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          backgroundColor: theme === 'dark' ? 'rgba(15, 23, 22, 0.98)' : 'rgba(250, 249, 247, 0.98)',
          backdropFilter: 'blur(12px)',
          borderTop: isMenuOpen ? '1px solid var(--border-color)' : 'none',
          boxShadow: isMenuOpen ? '0 10px 25px rgba(0,0,0,0.05)' : 'none'
        }}
      >
        <div style={{ padding: '1rem 1.25rem 1.25rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1rem' }}>
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
                    gap: '0.75rem',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    color: 'var(--text-primary)',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    textDecoration: 'none',
                    transition: 'background 0.15s ease, color 0.15s ease',
                  }}
                  className="mobile-nav-link"
                >
                  <span style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    background: 'var(--hover-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
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

          <div style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
              {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
            </span>
            <button onClick={toggleTheme} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0.4rem 0.85rem',
              borderRadius: '9999px',
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              fontSize: '0.825rem',
              fontWeight: 500,
              cursor: 'pointer',
            }}>
              {theme === 'dark' ? <><Sun size={14} color="var(--accent-color)" /> Light</> : <><Moon size={14} /> Dark</>}
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
        .theme-btn:hover {
          border-color: var(--accent-color) !important;
          transform: scale(1.05);
        }
      ` }} />
    </nav>
  );
};

export default Navbar;
