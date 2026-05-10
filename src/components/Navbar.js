'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import styles from './Navbar.module.css';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#journeys', label: 'Journeys' },
  { href: '#rides', label: 'Rides' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map(l => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className={styles.inner}>
          {/* Logo */}
          <motion.a href="#home" className={styles.logo}
            onClick={e => { e.preventDefault(); handleNav('#home'); }}
            whileHover={{ scale: 1.03 }}>
            <span className={styles.logoMark}>✦</span>
            <span className={styles.logoText}>Wanderer</span>
          </motion.a>

          {/* Nav links */}
          <ul className={styles.links}>
            {navLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`${styles.link} ${activeSection === link.href.slice(1) ? styles.active : ''}`}
                  onClick={e => { e.preventDefault(); handleNav(link.href); }}
                >
                  {link.label}
                  {activeSection === link.href.slice(1) && (
                    <motion.span className={styles.activeLine} layoutId="navIndicator" />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className={styles.actions}>
            {/* Theme toggle */}
            <motion.button
              className={styles.themeBtn}
              onClick={toggleTheme}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              aria-label="Toggle theme"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <div className={styles.themeBtnTrack}>
                <motion.div
                  className={styles.themeBtnThumb}
                  animate={{ x: theme === 'light' ? 22 : 2 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </div>
              <AnimatePresence mode="wait">
                <motion.span key={theme}
                  className={styles.themeIcon}
                  initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
                  transition={{ duration: 0.25 }}>
                  {theme === 'dark' ? '🌙' : '☀️'}
                </motion.span>
              </AnimatePresence>
              <span className={styles.themeLbl}>{theme === 'dark' ? 'Dark' : 'Light'}</span>
            </motion.button>

            {/* CTA */}
            <motion.a href="#contact" className="btn-primary"
              style={{ fontSize: '13px', padding: '10px 22px' }}
              onClick={e => { e.preventDefault(); handleNav('#contact'); }}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              Connect
            </motion.a>

            {/* Hamburger */}
            <button className={styles.burger} onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
              <span className={`${styles.burgerBar} ${menuOpen ? styles.open : ''}`} />
              <span className={`${styles.burgerBar} ${menuOpen ? styles.open : ''}`} />
              <span className={`${styles.burgerBar} ${menuOpen ? styles.open : ''}`} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div className={styles.overlay}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)} />
            <motion.div className={styles.mobileMenu}
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
              {/* Mobile theme toggle */}
              <button className={styles.mobileThemeBtn} onClick={toggleTheme}>
                {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </button>
              <ul className={styles.mobileLinks}>
                {navLinks.map((link, i) => (
                  <motion.li key={link.href}
                    initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}>
                    <a href={link.href} className={styles.mobileLink}
                      onClick={e => { e.preventDefault(); handleNav(link.href); }}>
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
