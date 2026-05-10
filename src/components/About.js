'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './About.module.css';

const traits = [
  { icon: '🏔️', title: 'Mountain Soul', desc: 'The peaks call and the heart answers. Every altitude brings clarity.' },
  { icon: '🛕', title: 'Spiritual Seeker', desc: 'From Char Dham to Vrindavan, seeking the divine in every destination.' },
  { icon: '🏍️', title: 'Ride or Die', desc: 'The rumble of an engine, the wind at full throttle — freedom, defined.' },
  { icon: '📸', title: 'Visual Storyteller', desc: 'Capturing raw moments that words struggle to hold.' },
];

const timeline = [
  { year: '2019', event: 'First solo ride — discovered the call of the open road' },
  { year: '2021', event: 'Nepal & Kathmandu — crossed the border, touched the Himalayas' },
  { year: '2022', event: 'Char Dham Yatra — Badrinath, Kedarnath, Gangotri, Yamunotri' },
  { year: '2023', event: 'Vrindavan & Banaras — immersed in ancient devotion' },
  { year: '2024', event: 'Ayodhya — witnessed the grand Ram Mandir consecration' },
  { year: '2025', event: 'Still riding, still wandering, still seeking…' },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
  };

  return (
    <section id="about" className="section" ref={ref}>
      <div className="container">
        <div className={styles.grid}>
          {/* Left column */}
          <motion.div
            className={styles.leftCol}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.div variants={itemVariants} className="tag-pill">
              <span>✦</span> About the Wanderer
            </motion.div>

            <motion.h2 variants={itemVariants} className={styles.heading}>
              A restless spirit<br />
              <span className="gold-text">chasing horizons.</span>
            </motion.h2>

            <motion.div variants={itemVariants} className="divider" />

            <motion.p variants={itemVariants} className={styles.bio}>
              Not all those who wander are lost — some are simply on a pilgrimage 
              that the modern world hasn't mapped yet. My journeys span the sacred 
              and the wild, the devotional and the adventurous.
            </motion.p>

            <motion.p variants={itemVariants} className={styles.bio}>
              I ride through mountain passes at dawn, stand at ghats as the sun dips 
              into the Ganga, and find myself renewed at every temple I kneel before. 
              This isn't just travel — it's a way of being.
            </motion.p>

            <motion.div variants={itemVariants} className={styles.traitGrid}>
              {traits.map((trait, i) => (
                <motion.div
                  key={i}
                  className={styles.traitCard}
                  whileHover={{ scale: 1.03, borderColor: 'rgba(201,168,76,0.3)' }}
                  transition={{ duration: 0.2 }}
                >
                  <span className={styles.traitIcon}>{trait.icon}</span>
                  <div>
                    <h4 className={styles.traitTitle}>{trait.title}</h4>
                    <p className={styles.traitDesc}>{trait.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column — Timeline */}
          <motion.div
            className={styles.rightCol}
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <div className={styles.timelineCard}>
              <h3 className={styles.timelineTitle}>
                <span className="gold-text">The Journey</span> So Far
              </h3>
              <div className={styles.timeline}>
                {timeline.map((item, i) => (
                  <motion.div
                    key={i}
                    className={styles.timelineItem}
                    initial={{ opacity: 0, x: 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                  >
                    <div className={styles.timelineDot}>
                      <div className={styles.timelineDotInner} />
                    </div>
                    <div className={styles.timelineContent}>
                      <span className={styles.timelineYear}>{item.year}</span>
                      <p className={styles.timelineEvent}>{item.event}</p>
                    </div>
                  </motion.div>
                ))}
                <div className={styles.timelineLine} />
              </div>
            </div>

            {/* Quote card */}
            <motion.div
              className={styles.quoteCard}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2, duration: 0.7 }}
            >
              <span className={styles.quoteIcon}>"</span>
              <p className={styles.quoteText}>
                The world is a book, and those who do not travel read only one page.
              </p>
              <span className={styles.quoteAuthor}>— Saint Augustine</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
