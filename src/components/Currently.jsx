import React from 'react';

const Currently = () => {
  return (
    <section className="flex flex-col gap-6">
      <div className="font-mono text-lg text-ctp-text flex items-center gap-2">
        <span className="text-accent-primary">~/</span>currently
      </div>
      <div className="terminal">
        <div className="text-ctp-overlay1 mb-4">$ ps aux | grep vatsal</div>
        <div className="flex flex-col gap-2 font-mono whitespace-pre overflow-x-auto">
          <div className="flex"><span className="w-32 shrink-0">vdbg</span><span className="text-accent-primary shrink-0">████████░░░░</span><span className="ml-4 text-ctp-subtext0 truncate">mid-implementation on `step_over`</span></div>
          <div className="flex"><span className="w-32 shrink-0">cve_research</span><span className="text-accent-primary shrink-0">██████░░░░░░</span><span className="ml-4 text-ctp-subtext0 truncate">studying Dirty Pipe & Copy Fail</span></div>
          <div className="flex"><span className="w-32 shrink-0">leetcode</span><span className="text-accent-primary shrink-0">████░░░░░░░░</span><span className="ml-4 text-ctp-subtext0 truncate">daily practice</span></div>
        </div>
      </div>
    </section>
  );
};

export default Currently;
