import React from 'react';

const About = () => {
  return (
    <section className="flex flex-col gap-6">
      <div className="font-mono text-lg text-ctp-text flex items-center gap-2">
        <span className="text-accent-primary">~/</span>about
      </div>
      <div className="flex flex-col gap-4 max-w-prose-custom text-base leading-relaxed text-ctp-text">
        <p>
          I’m a Computer Science student with a deep interest in Systems Programming and Low-Level Engineering. My focus is on understanding how software interacts with the hardware. I enjoy working close to the metal, writing C, analyzing x64 disassembly, and using tools like GDB to explore memory management and execution flow.
        </p>
        <p>
          I run an automated, keyboard-centric workflow on Arch Linux and Hyprland, using Tmux and Neovim for high-velocity systems development. When I'm not building things from scratch to understand how they work, I'm a logic enthusiast who loves solving Sudoku and Chess puzzles.
        </p>
      </div>
    </section>
  );
};

export default About;
