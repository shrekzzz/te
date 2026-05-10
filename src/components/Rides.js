'use client';
import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import styles from './Rides.module.css';

const rides = [
  {
    icon: '🏍️',
    title: 'Solo Rides',
    desc: 'Just you, your machine, and the open road stretching into the horizon. No itinerary. No deadlines.',
    count: '50+',
    unit: 'solo trips',
  },
  {
    icon: '🤝',
    title: 'Group Rides',
    desc: 'There\'s a brotherhood in riding together — engines synchronizing, spirits aligning, roads conquered collectively.',
    count: '30+',
    unit: 'group rides',
  },
  {
    icon: '🏕️',
    title: 'Camping Rides',
    desc: 'Park beside a river. Kindle a fire. Sleep under stars that the city never lets you see. Wake before dawn.',
    count: '15+',
    unit: 'camp nights',
  },
  {
    icon: '⛰️',
    title: 'Mountain Passes',
    desc: 'Pushing through altitude, switchbacks, and the thin air of passes that separate plains from paradise.',
    count: '8',
    unit: 'passes crossed',
  },
];

const rideGear = [
  { label: 'Helmet', value: 'Full-face, dual visor' },
  { label: 'Jacket', value: 'Mesh riding jacket with armour' },
  { label: 'Gloves', value: 'Knuckle-protected riding gloves' },
  { label: 'Boots', value: 'Ankle-protection touring boots' },
  { label: 'Bike', value: 'RE Himalayan / RE Classic 350' },
  { label: 'Luggage', value: 'Saddlebags + tank bag + tail pack' },
];

export default function Rides() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.6], ['0%', '100%']);

  return (
    <section id="rides" className={`section ${styles.ridesSection}`} ref={ref}>
      {/* Background */}
      <div className={styles.bg}>
        <div className={styles.bgLine1} />
        <div className={styles.bgLine2} />
      </div>

      <div className="container">
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="tag-pill"><span>🏍️</span> Ride Culture</div>
          <h2 className={styles.heading}>
            The Road is the<br />
            <span className="gold-text">Destination.</span>
          </h2>
          <p className={styles.subtext}>
            Every kilometre is a story. Every engine start is a prayer. 
            Riding isn't transport — it's meditation in motion.
          </p>
        </motion.div>

        {/* Animated progress line */}
        <div className={styles.progressContainer}>
          <motion.div className={styles.progressLine} style={{ width: lineWidth }} />
          <div className={styles.progressDots}>
            {['Start', 'Mid', 'Summit', 'Home'].map((label, i) => (
              <div key={i} className={styles.progressDot}>
                <div className={styles.progressDotCircle} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ride type cards */}
        <div className={styles.rideGrid}>
          {rides.map((ride, i) => (
            <motion.div
              key={i}
              className={styles.rideCard}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.7 }}
              whileHover={{ y: -6, borderColor: 'rgba(201,168,76,0.3)' }}
            >
              <motion.span
                className={styles.rideIcon}
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
              >
                {ride.icon}
              </motion.span>
              <div className={styles.rideCount}>
                <span className={styles.rideCountNum}>{ride.count}</span>
                <span className={styles.rideCountUnit}>{ride.unit}</span>
              </div>
              <h3 className={styles.rideTitle}>{ride.title}</h3>
              <p className={styles.rideDesc}>{ride.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Gear section */}
        <motion.div
          className={styles.gearSection}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className={styles.gearLeft}>
            <h3 className={styles.gearTitle}>
              Gear That Never<br />
              <span className="gold-text">Lets You Down</span>
            </h3>
            <p className={styles.gearDesc}>
              Riding is as much about preparation as it is about spontaneity. 
              The right gear means the difference between adventure and accident.
            </p>
            <motion.div
              className={styles.rideQuote}
              whileHover={{ scale: 1.02 }}
            >
              <span className={styles.quoteIconSmall}>"</span>
              <p>Four wheels move the body. Two wheels move the soul.</p>
            </motion.div>
          </div>
          <div className={styles.gearRight}>
            <div className={styles.gearList}>
              {rideGear.map((item, i) => (
                <motion.div
                  key={i}
                  className={styles.gearItem}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.7 + i * 0.08 }}
                >
                  <span className={styles.gearLabel}>{item.label}</span>
                  <div className={styles.gearDivider} />
                  <span className={styles.gearValue}>{item.value}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
