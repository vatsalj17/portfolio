import React from 'react';
import { motion } from 'framer-motion';

const SkillBadge = ({ children }) => (
  <motion.div 
    whileHover={{ scale: 1.05, backgroundColor: "#313244", color: "#cdd6f4" }}
    className="px-3 py-1.5 bg-ctp-mantle border border-ctp-surface0 rounded-lg font-mono text-xs text-ctp-subtext0 cursor-default transition-colors duration-200 shadow-sm"
  >
    {children}
  </motion.div>
);

const Skills = () => {
  const systems = ['C', 'C++', 'x86_64 Assembly', 'Linux Internals', 'OS Design', 'Computer Architecture'];
  const tools = ['GDB', 'GNU Make', 'Neovim', 'Tmux', 'Docker', 'Git', 'Bash'];
  const software = ['Python', 'Java', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Networking', 'Algorithms'];

  return (
    <section className="flex flex-col gap-6">
      <div className="font-mono text-lg text-ctp-text flex items-center gap-2">
        <span className="text-accent-primary">~/</span>skills
      </div>
      <div className="flex flex-col gap-6">
        
        <div className="flex flex-col gap-3">
          <h3 className="text-sm text-ctp-overlay1 uppercase tracking-wider font-semibold">Systems & Low-Level</h3>
          <div className="flex flex-wrap gap-2">
            {systems.map(s => <SkillBadge key={s}>{s}</SkillBadge>)}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm text-ctp-overlay1 uppercase tracking-wider font-semibold">Tools & Workflow</h3>
          <div className="flex flex-wrap gap-2">
            {tools.map(s => <SkillBadge key={s}>{s}</SkillBadge>)}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm text-ctp-overlay1 uppercase tracking-wider font-semibold">Software Engineering</h3>
          <div className="flex flex-wrap gap-2">
            {software.map(s => <SkillBadge key={s}>{s}</SkillBadge>)}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;
