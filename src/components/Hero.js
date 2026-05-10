'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import styles from './Hero.module.css';

const destinations = [
  { emoji: '🏔️', name: 'Nepal', sub: 'Kathmandu', color: '#5cc8ff' },
  { emoji: '🙏', name: 'Char Dham', sub: 'Yatra', color: '#8cdcff' },
  { emoji: '🪔', name: 'Banaras', sub: 'Varanasi', color: '#5cc8ff' },
  { emoji: '🪈', name: 'Vrindavan', sub: 'Mathura', color: '#b8eaff' },
  { emoji: '🏹', name: 'Ayodhya', sub: 'Ram Mandir', color: '#8cdcff' },
];

const stats = [
  { value: '12+', label: 'States' },
  { value: '8K+', label: 'KMs Ridden' },
  { value: '5', label: 'Pilgrimages' },
  { value: '100+', label: 'Roads' },
];

const words = ['Wander,', 'Explore,', 'Seek,', 'Discover,'];

const floatingShapes = [
  { size: 260, x: '72%', y: '8%', delay: 0, dur: 8 },
  { size: 140, x: '5%',  y: '65%', delay: 2, dur: 10 },
  { size: 90,  x: '60%', y: '78%', delay: 1, dur: 7 },
  { size: 60,  x: '88%', y: '55%', delay: 3, dur: 9 },
  { size: 40,  x: '40%', y: '15%', delay: 1.5, dur: 6 },
];

export default function Hero() {
  const containerRef = useRef(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [activeCard, setActiveCard] = useState(0);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const y    = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const fade = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  useEffect(() => {
    const wInt = setInterval(() => setWordIndex(i => (i + 1) % words.length), 2400);
    const cInt = setInterval(() => setActiveCard(i => (i + 1) % destinations.length), 3000);
    return () => { clearInterval(wInt); clearInterval(cInt); };
  }, []);

  return (
    <section id="home" ref={containerRef} className={styles.hero}>
      {/* ── Animated Background ── */}
      <motion.div className={styles.bg} style={{ y }}>
        <div className={styles.bgBase} />
        <div className={styles.bgGrid} />
        {/* Floating orbs */}
        <motion.div className={`${styles.orb} ${styles.orb1}`}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className={`${styles.orb} ${styles.orb2}`}
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }} />
        <motion.div className={`${styles.orb} ${styles.orb3}`}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 4 }} />
      </motion.div>

      {/* ── Floating Geometric Shapes ── */}
      {floatingShapes.map((s, i) => (
        <motion.div
          key={i}
          className={styles.floatShape}
          style={{ width: s.size, height: s.size, left: s.x, top: s.y }}
          animate={{ y: [0, -24, 0], rotate: [0, 8, 0], opacity: [0.04, 0.08, 0.04] }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* ── Floating Particles ── */}
      <div className={styles.particles}>
        {[...Array(22)].map((_, i) => (
          <motion.div key={i} className={styles.particle}
            animate={{ y: [0, -(20 + Math.random() * 30), 0], opacity: [0.15, 0.7, 0.15] }}
            transition={{ duration: 3 + Math.random() * 4, delay: Math.random() * 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
              width: `${1.5 + Math.random() * 2.5}px`, height: `${1.5 + Math.random() * 2.5}px` }}
          />
        ))}
      </div>

      {/* ── Main Content ── */}
      <motion.div className={styles.content} style={{ opacity: fade }}>
        <div className={styles.layout}>

          {/* ─── LEFT COLUMN ─── */}
          <div className={styles.leftCol}>

            {/* Badge */}
            <motion.div className={styles.badge}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}>
              <span className={styles.badgeDot} />
              <span>Wanderer · Pilgrim · Rider</span>
              <span className={styles.badgeBar} />
              <span className={styles.badgeYear}>Since 2019</span>
            </motion.div>

            {/* Heading */}
            <div className={styles.headingBlock}>
              <motion.div className={styles.headLine}
                initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.2 }}>
                <span className={styles.headWord}>Born to</span>
              </motion.div>

              {/* Rotating word */}
              <motion.div className={styles.headLine}
                initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.35 }}>
                <div className={styles.rotatingWordWrap}>
                  <AnimatePresence mode="wait">
                    <motion.span key={wordIndex} className={`${styles.headAccent}`}
                      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -40, filter: 'blur(8px)' }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}>
                      {words[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </motion.div>

              <motion.div className={styles.headLine}
                initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.5 }}>
                <span className={styles.headWordStroke}>Called to Live.</span>
              </motion.div>
            </div>

            {/* Subtext */}
            <motion.p className={styles.subtext}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}>
              From the mighty Himalayas of Nepal to the sacred ghats of Banaras,
              from Vrindavan's eternal devotion to Char Dham's divine path —
              every road tells a story worth living.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div className={styles.ctaRow}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85 }}>
              <motion.button className="btn-primary" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('journeys')?.scrollIntoView({ behavior: 'smooth' })}>
                Explore Journeys
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M2.5 7.5h10M9 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
              <motion.button className="btn-outline" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}>
                View Gallery
              </motion.button>
            </motion.div>

            {/* Stats row */}
            <motion.div className={styles.statsRow}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}>
              {stats.map((s, i) => (
                <motion.div key={i} className={styles.statItem}
                  whileHover={{ y: -4, scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400 }}>
                  <span className={styles.statVal}>{s.value}</span>
                  <span className={styles.statLbl}>{s.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ─── RIGHT COLUMN — Floating Destination Cards ─── */}
          <motion.div className={styles.rightCol}
            initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}>

            {/* Card stack */}
            <div className={styles.cardStack}>
              {destinations.map((dest, i) => {
                const offset = i - activeCard;
                const absOff = Math.abs(offset);
                return (
                  <motion.div
                    key={dest.name}
                    className={styles.destCard}
                    animate={{
                      y: offset === 0 ? 0 : offset * 56,
                      x: offset === 0 ? 0 : offset * 10,
                      scale: offset === 0 ? 1 : 1 - absOff * 0.07,
                      rotateY: offset * -4,
                      opacity: absOff > 2 ? 0 : 1 - absOff * 0.28,
                      zIndex: destinations.length - absOff,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    onClick={() => setActiveCard(i)}
                    style={{ '--card-accent': dest.color }}
                  >
                    <div className={styles.cardShine} />
                    <div className={styles.cardInner}>
                      <span className={styles.destEmoji}>{dest.emoji}</span>
                      <div>
                        <div className={styles.destName}>{dest.name}</div>
                        <div className={styles.destSub}>{dest.sub}</div>
                      </div>
                      <div className={styles.destDot} style={{ background: dest.color }} />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Floating map visual */}
            <motion.div className={styles.mapCard}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
              <div className={styles.mapShine} />
              <div className={styles.mapLabel}>Journey Map</div>
              <div className={styles.mapVisual}>
                {/* Abstract road SVG */}
                <svg width="100%" height="100%" viewBox="0 0 280 180" fill="none" className={styles.mapSvg}>
                  <path d="M20 160 Q80 120 140 90 Q200 60 260 20" stroke="var(--accent)" strokeWidth="2" strokeDasharray="6 4" opacity="0.5" strokeLinecap="round"/>
                  <path d="M20 160 Q80 150 140 140 Q200 130 260 100" stroke="var(--accent)" strokeWidth="1" opacity="0.2" strokeLinecap="round"/>
                  {destinations.map((d, i) => (
                    <g key={i}>
                      <motion.circle
                        cx={30 + i * 55} cy={160 - i * 35} r="5"
                        fill={d.color} opacity="0.8"
                        animate={{ r: activeCard === i ? [5, 7, 5] : 5, opacity: activeCard === i ? [0.8, 1, 0.8] : 0.4 }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <text x={30 + i * 55} y={148 - i * 35} textAnchor="middle"
                        fontSize="9" fill="var(--text-muted)" opacity="0.7" fontFamily="Space Grotesk, sans-serif">
                        {d.name.split(' ')[0]}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
              <div className={styles.mapBadge}>
                <span>{destinations[activeCard].emoji}</span>
                <span>{destinations[activeCard].name}</span>
              </div>
            </motion.div>

            {/* Floating pill badges */}
            <motion.div className={styles.floatBadge1}
              animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}>
              🏍️ Rider
            </motion.div>
            <motion.div className={styles.floatBadge2}
              animate={{ y: [0, -10, 0], rotate: [0, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
              ✦ Pilgrim
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div className={styles.scrollCue}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
        <motion.div className={styles.scrollLine}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} />
        <span className={styles.scrollLabel}>Scroll</span>
      </motion.div>
    </section>
  );
}
