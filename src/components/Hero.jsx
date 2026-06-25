import React, { useEffect, useState } from 'react';

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger animations right after mount
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="flex flex-col gap-6 pt-10">
      <div 
        className={`font-mono text-base md:text-lg text-ctp-overlay1 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform] ${
          mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
        }`}
      >
        Vatsal Jaiswal
      </div>
      <div>
        <h1 
          className={`font-mono text-3xl md:text-4xl text-ctp-text leading-tight max-w-[650px] font-bold transition-all duration-1000 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform] ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Systems programmer exploring <span className="text-accent-primary">kernels</span>, <span className="text-accent-secondary">architecture</span>, and <span className="text-accent-green">low-level internals</span>.
        </h1>
      </div>
      <div 
        className={`mt-4 flex items-center gap-3 text-sm font-mono text-ctp-subtext0 transition-all duration-1000 delay-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-opacity ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse"></span>
        <span>Open to systems roles</span>
      </div>
    </section>
  );
};

export default Hero;
