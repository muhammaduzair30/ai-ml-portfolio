import React from 'react';
import { ArrowUp } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-[#04060b] text-slate-400 py-12 px-4 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Status */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center font-mono font-bold text-cyan-400 text-xs">
              MU
            </div>
            <span className="text-white font-bold text-sm">Muhammad Uzair</span>
            <span className="text-xs font-mono text-cyan-400">• AI/ML R&D Engineer</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>SYSTEMS_OPERATIONAL // VEVEOTECH PRODUCTION // PESHAWAR, PK</span>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-5 text-xs font-mono">
          <a href="#ai-lab" className="hover:text-cyan-400 transition-colors">AI Lab</a>
          <a href="#blueprints" className="hover:text-cyan-400 transition-colors">Blueprints</a>
          <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
          <a href="#experience" className="hover:text-cyan-400 transition-colors">Experience</a>
          <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
          <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
          <a href={personalInfo.cvUrl} download className="text-purple-400 hover:text-purple-300 font-bold transition-colors">Download CV</a>
        </div>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400 hover:text-white hover:border-cyan-500/40 transition-colors"
          aria-label="Back to top"
        >
          <span>TOP</span>
          <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
        </button>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-slate-900 text-center text-[11px] font-mono text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© {new Date().getFullYear()} Muhammad Uzair. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Built with React 19, TypeScript, Tailwind CSS & Framer Motion.
        </p>
      </div>
    </footer>
  );
};
