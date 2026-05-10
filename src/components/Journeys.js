'use client';
import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import styles from './Journeys.module.css';

const journeys = [
  {
    id: 1,
    title: 'Nepal & Kathmandu',
    subtitle: 'Where Gods Dwell in the Clouds',
    emoji: '🏔️',
    gradient: 'linear-gradient(145deg, rgba(12,18,30,0.95) 0%, rgba(6,10,20,0.98) 100%)',
    accent: '#5cc8ff',
    tags: ['Pashupatinath', 'Boudhanath', 'Swayambhunath', 'Thamel'],
    description: `Crossing into Nepal felt like stepping into another realm. Kathmandu — ancient and alive — where the Pashupatinath Temple's sacred fires burn beside the Bagmati River, where Boudhanath's Buddha eyes gaze upon centuries of prayer flags snapping in mountain winds.`,
    highlights: [
      'Witnessed Aarti at Pashupatinath',
      'Circumambulated Boudhanath Stupa',
      'Sunrise view of the Himalayas',
      'Ancient Durbar Square exploration',
    ],
    distance: '~1,200 km',
    duration: '12 days',
  },
  {
    id: 2,
    title: 'Char Dham Yatra',
    subtitle: 'The Sacred Circuit of the Gods',
    emoji: '🙏',
    gradient: 'linear-gradient(145deg, rgba(16,12,24,0.95) 0%, rgba(8,6,16,0.98) 100%)',
    accent: '#8cdcff',
    tags: ['Badrinath', 'Kedarnath', 'Gangotri', 'Yamunotri'],
    description: `The ultimate pilgrimage — four dhams, each more breathtaking and soul-stirring than the last. Kedarnath in the snow, Badrinath at dawn, Gangotri where the Ganga meets the glacier, Yamunotri where rivers are born. The divine walks beside you every step.`,
    highlights: [
      'Trek to Kedarnath in snowfall',
      'Early morning aarti at Badrinath',
      `Bathed in Gangotri's sacred waters`,
      'Yamunotri - source of the Yamuna',
    ],
    distance: '~2,400 km',
    duration: '21 days',
  },
  {
    id: 3,
    title: 'Vrindavan',
    subtitle: `Where Krishna's Flute Still Plays`,
    emoji: '🪈',
    gradient: 'linear-gradient(145deg, rgba(14,10,26,0.95) 0%, rgba(8,6,16,0.98) 100%)',
    accent: '#b8eaff',
    tags: ['Banke Bihari', 'ISKCON', 'Prem Mandir', 'Nidhivan'],
    description: 'There is a kind of love in Vrindavan that the world has forgotten. Every lane echoes with bhajans, every ghat tells of eternal devotion. Nidhivan whispers of divine nights; Banke Bihari steals your heart with a single glance.',
    highlights: [
      'Darshan at Banke Bihari Mandir',
      `Nidhivan's mystical night stories`,
      'Sunset cruise on the Yamuna',
      `Prem Mandir's light and sound show`,
    ],
    distance: '~140 km from Delhi',
    duration: '4 days',
  },
  {
    id: 4,
    title: 'Banaras (Varanasi)',
    subtitle: 'The City That Never Sleeps',
    emoji: '🪔',
    gradient: 'linear-gradient(145deg, rgba(16,14,10,0.95) 0%, rgba(10,8,6,0.98) 100%)',
    accent: '#5cc8ff',
    tags: ['Ganga Ghats', 'Kashi Vishwanath', 'Manikarnika', 'Sarnath'],
    description: 'Banaras is the oldest living city on earth — and you feel every one of its years. The Ganga Aarti at Dashashwamedh Ghat is a spectacle of fire, devotion, and smoke that transcends the ordinary. Kashi is not a city; it is a state of consciousness.',
    highlights: [
      'Ganga Aarti at Dashashwamedh Ghat',
      'Pre-dawn boat ride on the Ganga',
      'Kashi Vishwanath temple darshan',
      'Sarnath — where Buddha first taught',
    ],
    distance: '~800 km from Delhi',
    duration: '6 days',
  },
  {
    id: 5,
    title: 'Ayodhya',
    subtitle: 'The Birthplace of Lord Ram',
    emoji: '🏹',
    gradient: 'linear-gradient(145deg, rgba(18,10,10,0.95) 0%, rgba(12,6,6,0.98) 100%)',
    accent: '#8cdcff',
    tags: ['Ram Mandir', 'Saryu Ghat', 'Hanuman Garhi', 'Kanak Bhawan'],
    description: 'To witness Ayodhya after the grand consecration of Ram Mandir was to witness history breathing. The city glows with diyas and devotion. The Saryu flows eternal. Every stone here carries the weight of millennia and the lightness of faith.',
    highlights: [
      'Ram Mandir grand consecration visit',
      'Saryu Ghat evening aarti',
      'Hanuman Garhi darshan',
      'Kanak Bhawan temple visit',
    ],
    distance: '~620 km from Delhi',
    duration: '3 days',
  },
];

export default function Journeys() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeJourney, setActiveJourney] = useState(null);

  return (
    <section id="journeys" className="section" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="tag-pill"><span>✦</span> Sacred Roads</div>
          <h2 className={styles.heading}>
            The Journeys That<br />
            <span className="gold-text">Shaped the Soul</span>
          </h2>
          <p className={styles.subtext}>
            Each destination is not just a place on a map — it is a chapter in the
            story of becoming.
          </p>
        </motion.div>

        {/* Journey cards */}
        <div className={styles.cardsGrid}>
          {journeys.map((journey, i) => (
            <motion.div
              key={journey.id}
              className={styles.journeyCard}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.7 }}
              whileHover={{ y: -8, scale: 1.01 }}
              onClick={() => setActiveJourney(activeJourney?.id === journey.id ? null : journey)}
              data-cursor-hover="true"
            >
              {/* Card gradient bg */}
              <div className={styles.cardBg} style={{ background: journey.gradient }} />

              {/* Accent glow */}
              <div
                className={styles.cardGlow}
                style={{ background: `radial-gradient(circle at 30% 30%, ${journey.accent}12, transparent 70%)` }}
              />

              <div className={styles.cardContent}>
                <div className={styles.cardTop}>
                  <span className={styles.cardEmoji}>{journey.emoji}</span>
                  <div className={styles.cardMeta}>
                    <span className={styles.cardDistance}>{journey.distance}</span>
                    <span className={styles.cardDuration}>{journey.duration}</span>
                  </div>
                </div>

                <h3 className={styles.cardTitle}>{journey.title}</h3>
                <p className={styles.cardSubtitle}>{journey.subtitle}</p>

                <div className={styles.cardTags}>
                  {journey.tags.map((tag) => (
                    <span
                      key={tag}
                      className={styles.cardTag}
                      style={{ borderColor: `${journey.accent}30`, color: journey.accent }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <motion.div
                  className={styles.cardExpandBtn}
                  animate={{ rotate: activeJourney?.id === journey.id ? 45 : 0 }}
                  style={{ borderColor: `${journey.accent}50`, color: journey.accent }}
                >
                  +
                </motion.div>
              </div>

              {/* Expanded details */}
              <AnimatePresence>
                {activeJourney?.id === journey.id && (
                  <motion.div
                    className={styles.expandedContent}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <p className={styles.expandedDesc}>{journey.description}</p>
                    <div className={styles.highlights}>
                      <h4 className={styles.highlightsTitle}>Highlights</h4>
                      <ul className={styles.highlightsList}>
                        {journey.highlights.map((h, idx) => (
                          <li key={idx} className={styles.highlightItem}>
                            <span style={{ color: journey.accent }}>✓</span> {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
