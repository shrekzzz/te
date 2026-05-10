'use client';
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './Contact.module.css';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setFormState({ name: '', email: '', message: '' });
  };

  const socials = [
    { icon: '📸', label: 'Instagram', handle: '@wanderer.roads', href: '#' },
    { icon: '▶️', label: 'YouTube', handle: 'Wanderer Chronicles', href: '#' },
    { icon: '✈️', label: 'Travel Blog', handle: 'wanderersouls.in', href: '#' },
    { icon: '📧', label: 'Email', handle: 'hello@wanderer.in', href: '#' },
  ];

  return (
    <section id="contact" className="section" ref={ref}>
      {/* Background */}
      <div className={styles.bg}>
        <div className={styles.bgOrb1} />
        <div className={styles.bgOrb2} />
      </div>

      <div className="container">
        <div className={styles.grid}>
          {/* Left */}
          <motion.div
            className={styles.leftCol}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="tag-pill"><span>✦</span> Let's Connect</div>
            <h2 className={styles.heading}>
              Ready to Ride<br />
              <span className="gold-text">Together?</span>
            </h2>
            <div className="divider" />
            <p className={styles.desc}>
              Whether you want to plan a journey, talk about travel, explore 
              spiritual destinations together, or just share road stories — 
              I'm always up for a good conversation around a campfire.
            </p>

            {/* Social links */}
            <div className={styles.socials}>
              {socials.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  className={styles.socialCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ x: 8, borderColor: 'rgba(201,168,76,0.4)' }}
                >
                  <span className={styles.socialIcon}>{social.icon}</span>
                  <div>
                    <div className={styles.socialLabel}>{social.label}</div>
                    <div className={styles.socialHandle}>{social.handle}</div>
                  </div>
                  <motion.span
                    className={styles.socialArrow}
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  >
                    →
                  </motion.span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right — Contact form */}
          <motion.div
            className={styles.rightCol}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className={styles.formCard}>
              <h3 className={styles.formTitle}>Send a Message</h3>

              {sent ? (
                <motion.div
                  className={styles.successMsg}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <span className={styles.successIcon}>✓</span>
                  <h4>Message Sent!</h4>
                  <p>I'll reply as soon as I'm off the road 🏍️</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={`${styles.formGroup} ${focused === 'name' ? styles.focused : ''}`}>
                    <label className={styles.label} htmlFor="name">Your Name</label>
                    <input
                      id="name"
                      type="text"
                      className={styles.input}
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      placeholder="What do they call you?"
                      required
                    />
                  </div>

                  <div className={`${styles.formGroup} ${focused === 'email' ? styles.focused : ''}`}>
                    <label className={styles.label} htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      className={styles.input}
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div className={`${styles.formGroup} ${focused === 'message' ? styles.focused : ''}`}>
                    <label className={styles.label} htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      className={`${styles.input} ${styles.textarea}`}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      placeholder="Tell me about your next adventure..."
                      rows={5}
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Message
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 8l12-6-5 6 5 6-12-6z" fill="currentColor"/>
                    </svg>
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
