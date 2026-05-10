'use client';
import { motion } from 'framer-motion';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.line} />
      <div className="container">
        <div className={styles.footerGrid}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span className={styles.logoIcon}>✦</span>
              <span className={styles.logoText}>Wanderer</span>
            </div>
            <p className={styles.tagline}>
              Every road is a pilgrimage.<br />Every destination, a revelation.
            </p>
          </div>

          <div className={styles.links}>
            <h4 className={styles.linkTitle}>Explore</h4>
            <ul>
              {['Home', 'About', 'Journeys', 'Rides', 'Gallery', 'Contact'].map((l) => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase()}`}
                    className={styles.link}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.destinations}>
            <h4 className={styles.linkTitle}>Destinations</h4>
            <ul>
              {['Nepal & Kathmandu', 'Char Dham Yatra', 'Vrindavan', 'Banaras', 'Ayodhya'].map((d) => (
                <li key={d}>
                  <span className={styles.destItem}>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © {year} Wanderer Portfolio. Crafted with wanderlust & devotion.
          </p>
          <motion.div
            className={styles.scrollTop}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            ↑ Back to Top
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
