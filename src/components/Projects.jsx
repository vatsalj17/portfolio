import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const ProjectCard = ({ title, tag, desc, interesting, link }) => (
  <motion.a 
    href={link} target="_blank" rel="noopener noreferrer"
    whileHover={{ scale: 1.02, y: -4 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="group block border border-ctp-surface0 bg-ctp-base hover:bg-ctp-mantle hover:border-accent-primary p-5 relative rounded-lg overflow-hidden cursor-pointer shadow-sm hover:shadow-lg hover:shadow-accent-primary/5 transition-all duration-300"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/0 via-accent-primary/5 to-accent-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="flex justify-between items-start relative z-10">
      <div className="flex items-center gap-2">
        <h3 className="font-mono text-ctp-text text-lg group-hover:text-accent-primary transition-colors font-bold">{title}</h3>
        <ExternalLink className="w-4 h-4 text-ctp-overlay1 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <span className="font-mono text-xs text-accent-secondary bg-accent-secondary/10 px-2 py-1 rounded-full border border-accent-secondary/20">
        {tag}
      </span>
    </div>
    <p className="text-sm text-ctp-subtext0 leading-relaxed mt-3 relative z-10 group-hover:text-ctp-text transition-colors">{desc}</p>
    <div className="mt-4 bg-ctp-crust/50 p-3 rounded border border-ctp-surface0/50 relative z-10">
      <p className="text-xs"><span className="font-semibold text-accent-yellow">Implementation detail:</span> <span className="text-ctp-subtext0">{interesting}</span></p>
    </div>
  </motion.a>
);

const Projects = () => {
  const projects = [
    {
      title: 'vdbg',
      tag: 'C',
      desc: 'A ptrace/DWARF-based debugger built from scratch. Implements step, finish, breakpoints, multi-file DWARF source resolution, and ELF symbol lookup.',
      interesting: 'implementing `next` requires tracking inline call depth in the DWARF line table — harder than step.',
      link: 'https://github.com/vatsalj17/vdbg'
    },
    {
      title: 'arch8',
      tag: 'Logisim',
      desc: 'A fully custom, hand-crafted 8-bit CPU designed from first principles. Features a microcoded control unit and a custom Instruction Set Architecture (ISA).',
      interesting: 'building the gate-level RAM module entirely with flip-flops and decoders instead of using prebuilt RAM.',
      link: 'https://github.com/vatsalj17/arch8'
    },
    {
      title: 'Heap Tracer',
      tag: 'C',
      desc: 'A runtime memory allocation tracker using LD_PRELOAD to intercept malloc/free. Monitors heap activity and spots memory leaks in real time.',
      interesting: 'printing a Heap Summary automatically on exit by overriding libc memory functions using LD_PRELOAD.',
      link: 'https://github.com/vatsalj17/heap-tracer'
    },
    {
      title: 'C Generics',
      tag: 'C',
      desc: 'A dependency-free C library of generic data structures including Vector, Hash Table, and Priority Queue, built entirely using void pointers.',
      interesting: 'managing generic element copies and pointers consistently without macros or templates, using type erasure.',
      link: 'https://github.com/vatsalj17/c-generics'
    },
    {
      title: 'VZIP',
      tag: 'C',
      desc: 'A file compression tool implementing static Huffman coding from scratch. Analyzes byte frequencies and compresses data using custom bit-level I/O.',
      interesting: 'writing a custom bit-writer to handle unaligned bit sequences directly into memory buffers.',
      link: 'https://github.com/vatsalj17/vzip'
    },
    {
      title: 'vsh (V Shell)',
      tag: 'C',
      desc: 'A custom Unix shell implementation from scratch. Supports built-in commands, external execution, I/O redirection, pipes, and signal handling.',
      interesting: 'managing process forking and handling background execution states effectively.',
      link: 'https://github.com/vatsalj17/vsh'
    },
    {
      title: 'C Chatroom',
      tag: 'C',
      desc: 'A real-time multi-client chat application utilizing TCP sockets and POSIX threads. Supports public broadcasting and private messaging.',
      interesting: 'handling concurrent connections gracefully without race conditions using pthreads.',
      link: 'https://github.com/vatsalj17/c-chatroom'
    }
  ];

  return (
    <section className="flex flex-col gap-6">
      <div className="font-mono text-lg text-ctp-text flex items-center gap-2">
        <span className="text-accent-primary">~/</span>projects
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((p, i) => <ProjectCard key={i} {...p} />)}
      </div>
    </section>
  );
};

export default Projects;
