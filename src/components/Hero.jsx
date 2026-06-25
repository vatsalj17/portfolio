import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="flex flex-col gap-6 pt-10">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="font-mono text-base md:text-lg text-ctp-overlay1"
      >
        Vatsal Jaiswal
      </motion.div>
      <div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-mono text-3xl md:text-4xl text-ctp-text leading-tight max-w-[650px] font-bold"
        >
          Systems programmer exploring <span className="text-accent-primary">kernels</span>, <span className="text-accent-secondary">architecture</span>, and <span className="text-accent-green">low-level internals</span>.
        </motion.h1>
      </div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-4 flex items-center gap-3 text-sm font-mono text-ctp-subtext0"
      >
        <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse"></span>
        <span>Open to systems roles</span>
      </motion.div>
    </section>
  );
};

export default Hero;
