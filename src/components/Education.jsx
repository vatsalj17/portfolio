import React from 'react';

const Education = () => {
  return (
    <section className="flex flex-col gap-6">
      <div className="font-mono text-lg text-ctp-text flex items-center gap-2">
        <span className="text-accent-primary">~/</span>education
      </div>
      <div className="flex flex-col gap-2 border-l-2 border-ctp-surface0 pl-4">
        <div className="flex justify-between items-start">
          <h3 className="font-mono text-ctp-text text-base">GL Bajaj Institute of Technology and Management</h3>
          <span className="font-mono text-xs text-ctp-overlay1 mt-1 shrink-0">2024 — 2028</span>
        </div>
        <p className="text-sm text-accent-primary">Bachelor of Technology in Computer Science and Engineering</p>
        <p className="text-sm text-ctp-subtext0 mt-2">
          Relevant Coursework: Theory of Computation, Computer Networks, Database Management Systems, Algorithms.
        </p>
      </div>
    </section>
  );
};

export default Education;
