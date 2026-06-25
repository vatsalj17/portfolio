import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TerminalOverlay from './components/TerminalOverlay';

const MouseGlow = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setMousePos({ x: e.clientX, y: e.clientY });
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
      style={{
        background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(203, 166, 247, 0.04), transparent 80%)`
      }}
    />
  );
};

const ScrollReveal = ({ children }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform,filter] ${
        isVisible ? "opacity-100 translate-y-0 blur-none" : "opacity-0 translate-y-8 blur-[4px]"
      }`}
    >
      {children}
    </div>
  );
};

function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-ctp-base text-ctp-text flex justify-center w-full relative overflow-hidden">
      <MouseGlow />

      <main className="w-full max-w-[720px] px-6 md:px-8 py-16 md:py-24 flex flex-col gap-20 relative z-10">
        <Hero />
        <ScrollReveal><About /></ScrollReveal>
        <ScrollReveal><Education /></ScrollReveal>
        <ScrollReveal><Skills /></ScrollReveal>
        <ScrollReveal><Projects /></ScrollReveal>
        <ScrollReveal><Contact /></ScrollReveal>
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
