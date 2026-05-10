'use client';
import { motion } from 'framer-motion';
import { ThemeProvider } from '../context/ThemeContext';
import CustomCursor from '../components/CustomCursor';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Journeys from '../components/Journeys';
import Rides from '../components/Rides';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <ThemeProvider>
      <CustomCursor />
      <div className="noise-overlay" />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar />
        <Hero />
        <About />
        <Journeys />
        <Rides />
        <Gallery />
        <Contact />
        <Footer />
      </motion.main>
    </ThemeProvider>
  );
}
