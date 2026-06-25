import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Currently from './components/Currently';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TerminalOverlay from './components/TerminalOverlay';

function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '`') {
        e.preventDefault();
        setTerminalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-ctp-base text-ctp-text flex justify-center w-full relative overflow-hidden">
      {/* Dynamic Mouse Glow */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(203, 166, 247, 0.04), transparent 80%)`
        }}
      />

      <main className="w-full max-w-[720px] px-6 md:px-8 py-16 md:py-24 flex flex-col gap-20 relative z-10">
        <Hero />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}><About /></motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}><Education /></motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}><Skills /></motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}><Projects /></motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}><Currently /></motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}><Contact /></motion.div>
        <Footer />
      </main>

      {/* Floating Terminal Hint */}
      {!terminalOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="fixed bottom-6 right-6 font-mono text-xs text-ctp-overlay1 bg-ctp-mantle/80 backdrop-blur border border-ctp-surface0 px-3 py-2 rounded-full z-20 pointer-events-none"
        >
          Press <kbd className="bg-ctp-surface0 px-1.5 py-0.5 rounded text-ctp-text">`</kbd> to open terminal
        </motion.div>
      )}

      {terminalOpen && <TerminalOverlay onClose={() => setTerminalOpen(false)} />}
    </div>
  );
}

export default App;
