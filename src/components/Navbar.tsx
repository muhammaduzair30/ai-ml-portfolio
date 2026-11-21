import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Menu, 
  X, 
  BrainCircuit, 
  Terminal, 
  Layers, 
  Cpu, 
  User, 
  Mail,
  Smartphone,
  ExternalLink,
  Activity
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';

interface NavbarProps {
  perspective: 'ai' | 'fullstack';
  onTogglePerspective: (p: 'ai' | 'fullstack') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ perspective, onTogglePerspective }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownloadCV = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.15 },
      colors: ['#00f2fe', '#8b5cf6', '#10b981'],
    });
  };

  const navLinks = [
    { name: 'AI Lab', href: '#ai-lab', icon: Activity },
    { name: 'Blueprints', href: '#blueprints', icon: BrainCircuit },
    { name: 'Projects', href: '#projects', icon: Layers },
    { name: 'Experience', href: '#experience', icon: Terminal },
    { name: 'Skills', href: '#skills', icon: Cpu },
    { name: 'About', href: '#about', icon: User },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3 pb-2 transition-all duration-300">
      <nav 
        className={`w-full max-w-6xl rounded-2xl transition-all duration-300 flex items-center justify-between px-4 sm:px-6 py-2.5 ${
          scrolled 
            ? 'bg-[#060a14]/90 backdrop-blur-2xl border border-cyan-500/20 shadow-2xl shadow-cyan-950/30' 
            : 'bg-[#060a14]/65 backdrop-blur-xl border border-white/10'
        }`}
      >
        {/* Brand / Logo (Clean, zero line-wrapping bug) */}
        <a 
          href="#" 
          className="group flex items-center gap-3 text-white"
        >
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/25 via-blue-600/20 to-purple-600/25 border border-cyan-400/40 group-hover:border-cyan-400 transition-colors shadow-sm shadow-cyan-500/20">
            <span className="text-cyan-300 font-extrabold font-mono text-sm tracking-tighter">MU</span>
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors whitespace-nowrap">
                Muhammad Uzair
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-md bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 whitespace-nowrap font-semibold">
                AI / ML
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono leading-none mt-0.5">
              R&D Engineer
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-200 flex items-center gap-1.5 group"
              >
                <Icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                <span>{link.name}</span>
              </a>
            );
          })}
        </div>

        {/* Right Section: Compact Perspective Controller & CV Download */}
        <div className="flex items-center gap-3">
          {/* Dual Perspective Toggle */}
          <div className="hidden lg:flex items-center p-1 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] font-mono">
            <button
              onClick={() => onTogglePerspective('ai')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all duration-200 ${
                perspective === 'ai'
                  ? 'bg-gradient-to-r from-cyan-500/25 to-blue-500/25 text-cyan-300 border border-cyan-500/40 shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Focus on Core AI / LLMs / Computer Vision"
            >
              <BrainCircuit className="w-3.5 h-3.5 text-cyan-400" />
              <span>AI Core</span>
            </button>
            <button
              onClick={() => onTogglePerspective('fullstack')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all duration-200 ${
                perspective === 'fullstack'
                  ? 'bg-gradient-to-r from-purple-500/25 to-emerald-500/25 text-purple-300 border border-purple-500/40 shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Highlight Edge AI & Flutter Client Deployments"
            >
              <Smartphone className="w-3.5 h-3.5 text-purple-400" />
              <span>Edge & Flutter</span>
            </button>
          </div>

          {/* CV Download CTA */}
          <a
            href={personalInfo.cvUrl}
            download="Muhammad_Uzair_AI_ML_CV.pdf"
            onClick={handleDownloadCV}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-medium text-xs hover:opacity-95 shadow-md shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 group"
          >
            <FileText className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            <span className="font-semibold">CV</span>
            <span className="hidden sm:inline text-[10px] opacity-80 font-mono">PDF</span>
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-20 left-4 right-4 bg-[#080d19]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-5 shadow-2xl z-50 flex flex-col gap-4"
          >
            {/* Perspective Selector for Mobile */}
            <div className="flex items-center justify-between p-1 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-mono">
              <button
                onClick={() => {
                  onTogglePerspective('ai');
                  setMobileMenuOpen(false);
                }}
                className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-2 ${
                  perspective === 'ai' ? 'bg-cyan-500/25 text-cyan-300 font-bold border border-cyan-500/30' : 'text-slate-400'
                }`}
              >
                <BrainCircuit className="w-4 h-4 text-cyan-400" />
                <span>AI Core Focus</span>
              </button>
              <button
                onClick={() => {
                  onTogglePerspective('fullstack');
                  setMobileMenuOpen(false);
                }}
                className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-2 ${
                  perspective === 'fullstack' ? 'bg-purple-500/25 text-purple-300 font-bold border border-purple-500/30' : 'text-slate-400'
                }`}
              >
                <Smartphone className="w-4 h-4 text-purple-400" />
                <span>Edge & Flutter</span>
              </button>
            </div>

            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-200 hover:bg-white/5 hover:text-cyan-400 text-sm font-medium transition-colors"
                  >
                    <Icon className="w-4 h-4 text-cyan-400" />
                    <span>{link.name}</span>
                  </a>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono">Peshawar, Pakistan</span>
              <a 
                href={personalInfo.cvUrl} 
                download 
                onClick={handleDownloadCV}
                className="text-cyan-400 flex items-center gap-1 font-semibold"
              >
                Download CV <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
