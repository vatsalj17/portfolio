import React from 'react';

const Footer = () => {
  return (
    <footer className="flex flex-col gap-4 mt-8 pb-8">
      <div className="divider">
        <span>────────────────────────────────────────────</span>
      </div>
      <div className="font-mono text-xs text-ctp-overlay1">
        last updated: {new Date().toISOString().split('T')[0]} · vatsalj17 · <a href="https://github.com/vatsalj17" className="link-custom" target="_blank" rel="noopener noreferrer">view source</a>
      </div>
    </footer>
  );
};

export default Footer;
