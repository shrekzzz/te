'use client';
import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import styles from './Gallery.module.css';

const galleryItems = [
  {
    id: 1,
    title: 'Himalayan Mist',
    location: 'Nepal',
    category: 'Mountains',
    emoji: '🌄',
    color: '#080c18',
    accent: '#5cc8ff',
    span: 'large',
  },
  {
    id: 2,
    title: 'Boudhanath at Dusk',
    location: 'Kathmandu',
    category: 'Temples',
    emoji: '🕌',
    color: '#0c0814',
    accent: '#8cdcff',
    span: 'small',
  },
  {
    id: 3,
    title: 'Ganga Aarti Fire',
    location: 'Varanasi',
    category: 'Rituals',
    emoji: '🪔',
    color: '#100c06',
    accent: '#5cc8ff',
    span: 'small',
  },
  {
    id: 4,
    title: 'Open Highway',
    location: 'Mountain Pass',
    category: 'Rides',
    emoji: '🛣️',
    color: '#060c08',
    accent: '#b8eaff',
    span: 'medium',
  },
  {
    id: 5,
    title: 'Ram Mandir Glory',
    location: 'Ayodhya',
    category: 'Temples',
    emoji: '🏹',
    color: '#100606',
    accent: '#8cdcff',
    span: 'medium',
  },
  {
    id: 6,
    title: 'Kedarnath Snow',
    location: 'Char Dham',
    category: 'Mountains',
    emoji: '❄️',
    color: '#060a14',
    accent: '#5cc8ff',
    span: 'small',
  },
  {
    id: 7,
    title: 'Vrindavan Lamps',
    location: 'Vrindavan',
    category: 'Rituals',
    emoji: '🪈',
    color: '#0a0614',
    accent: '#b8eaff',
    span: 'small',
  },
  {
    id: 8,
    title: 'Sunrise Ride',
    location: 'Mountain Road',
    category: 'Rides',
    emoji: '🌅',
    color: '#0e0a04',
    accent: '#8cdcff',
    span: 'large',
  },
];

const categories = ['All', 'Mountains', 'Temples', 'Rituals', 'Rides'];

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredId, setHoveredId] = useState(null);

  const filtered = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <section id="gallery" className="section" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="tag-pill"><span>📸</span> Visual Diary</div>
          <h2 className={styles.heading}>
            Moments Frozen<br />
            <span className="gold-text">in Time</span>
          </h2>

          {/* Filter tabs */}
          <div className={styles.filterTabs}>
            {categories.map((cat) => (
              <motion.button
                key={cat}
                className={`${styles.filterTab} ${activeCategory === cat ? styles.active : ''}`}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div className={styles.tabIndicator} layoutId="tabIndicator" />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Gallery grid */}
        <motion.div className={styles.galleryGrid} layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                className={`${styles.galleryItem} ${styles[item.span]}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onHoverStart={() => setHoveredId(item.id)}
                onHoverEnd={() => setHoveredId(null)}
                whileHover={{ scale: 1.02 }}
                data-cursor-hover="true"
              >
                {/* Background */}
                <div
                  className={styles.itemBg}
                  style={{ background: `radial-gradient(ellipse at 30% 30%, ${item.color}, #020204)` }}
                />

                {/* Accent glow */}
                <motion.div
                  className={styles.itemGlow}
                  animate={{
                    opacity: hoveredId === item.id ? 0.25 : 0.08,
                  }}
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${item.accent}, transparent 70%)`,
                  }}
                />

                {/* Emoji art */}
                <motion.div
                  className={styles.itemEmoji}
                  animate={{
                    scale: hoveredId === item.id ? 1.2 : 1,
                    rotate: hoveredId === item.id ? 5 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {item.emoji}
                </motion.div>

                {/* Content overlay */}
                <motion.div
                  className={styles.itemOverlay}
                  animate={{ opacity: hoveredId === item.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.itemCategory} style={{ color: item.accent, borderColor: `${item.accent}40` }}>
                    {item.category}
                  </div>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <p className={styles.itemLocation}>📍 {item.location}</p>
                </motion.div>

                {/* Bottom info (always visible) */}
                <div className={styles.itemInfo}>
                  <span className={styles.itemInfoTitle}>{item.title}</span>
                  <span className={styles.itemInfoLocation}>{item.location}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
