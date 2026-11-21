import React from 'react';
import { motion } from 'framer-motion';
import { 
  BrainCircuit, 
  ArrowRight, 
  Terminal, 
  FileText, 
  Eye, 
  Cpu, 
  Activity, 
  MapPin, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';

interface HeroProps {
  perspective: 'ai' | 'fullstack';
}

export const Hero: React.FC<HeroProps> = ({ perspective }) => {
  const handleDownloadCV = () => {
    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.3 },
      colors: ['#00f2fe', '#8b5cf6', '#10b981'],
    });
  };

  return (
    <section className="relative min-h-screen pt-28 pb-16 flex items-center justify-center px-4 overflow-hidden">
      {/* Background radial glow spots */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-cyan-500/15 via-blue-600/10 to-transparent rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[110px] pointer-events-none -z-10" />

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Hero Copy & Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7 flex flex-col items-start text-left"
        >
          {/* Unified High-Tech Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#080e1e]/90 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-5 backdrop-blur-md shadow-lg shadow-cyan-950/40">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="font-semibold text-white">AI/ML R&D Engineer @ VeevoTech</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-cyan-400" /> Peshawar, PK
            </span>
            {perspective === 'fullstack' && (
              <>
                <span className="text-slate-600">•</span>
                <span className="text-purple-300 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-purple-400" /> Edge & Flutter Active
                </span>
              </>
            )}
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-3">
            Muhammad <span className="text-gradient-cyan">Uzair</span>
          </h1>

          {/* Subtitle / Role */}
          <div className="text-sm sm:text-base font-mono text-slate-300 mb-6 flex flex-wrap items-center gap-2">
            <span className="text-cyan-400 font-bold tracking-wide">AI/ML R&D ENGINEER</span>
            <span className="text-slate-600">/</span>
            <span className="text-purple-400 font-bold tracking-wide">LLM SYSTEMS & RAG</span>
            <span className="text-slate-600">/</span>
            <span className="text-emerald-400 font-bold tracking-wide">COMPUTER VISION</span>
          </div>

          {/* Narrative Pitch */}
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl font-normal">
            Developing enterprise-grade AI infrastructure: from centralized <strong className="text-white font-semibold">multi-application LLM wrappers</strong> and <strong className="text-white font-semibold">interruption-aware AI telephony</strong> to real-time <strong className="text-white font-semibold">CCTV video analytics</strong> (D-FINE-N + ByteTrack). Elevated with production cross-platform client delivery.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-10">
            <a
              href="#blueprints"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              <BrainCircuit className="w-4 h-4" />
              <span>Explore System Blueprints</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </a>

            <a
              href="#projects"
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl glass-card text-slate-200 hover:text-white hover:border-cyan-500/40 font-medium text-sm flex items-center justify-center gap-2 transition-all duration-200"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>View Projects</span>
            </a>

            <a
              href={personalInfo.cvUrl}
              download="Muhammad_Uzair_AI_ML_CV.pdf"
              onClick={handleDownloadCV}
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-[#090e1c] border border-slate-700 hover:border-purple-500/50 text-slate-200 hover:text-white font-medium text-sm flex items-center justify-center gap-2 transition-all duration-200 group shadow-md"
            >
              <FileText className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
              <span>Download CV</span>
            </a>
          </div>

          {/* Key Metric Highlights */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800/80">
            {personalInfo.stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono flex items-center gap-1">
                  {stat.value}
                </span>
                <span className="text-xs font-semibold text-slate-200">{stat.label}</span>
                <span className="text-[11px] text-slate-500 leading-tight">{stat.desc}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Interactive Profile Card with Hologram Glow & Tech Badges */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative w-full max-w-sm sm:max-w-md">
            {/* Ambient halo glow */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500/25 via-blue-600/25 to-purple-600/25 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition duration-1000"></div>

            {/* Main Cybernetic Container */}
            <div className="relative rounded-3xl bg-[#070c18]/90 border border-white/10 p-6 backdrop-blur-2xl shadow-2xl flex flex-col items-center">
              {/* Header Status Bar inside card */}
              <div className="w-full flex items-center justify-between pb-4 mb-4 border-b border-slate-800 font-mono text-[11px]">
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                  <span className="text-cyan-300 font-bold">SYSTEM_ONLINE</span>
                </div>
                <div className="text-slate-400">
                  <span className="text-emerald-400 font-bold">CGPA 3.74</span> (Distinction)
                </div>
              </div>

              {/* Avatar Container with Neural Pulse Orbit */}
              <div className="relative w-44 h-44 sm:w-48 sm:h-48 mb-6 flex items-center justify-center">
                {/* Rotating gradient ring */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-500/40 animate-[spin_24s_linear_infinite]" />
                <div className="absolute -inset-2 rounded-full border border-purple-500/20 animate-[spin_32s_linear_infinite_reverse]" />

                {/* Avatar Photo */}
                <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-cyan-400/60 shadow-xl bg-slate-900 z-10">
                  <img
                    src={personalInfo.avatarUrl}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Floating Tech Pill 1: PyTorch */}
                <motion.div 
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute -top-1 -right-2 bg-slate-900/90 border border-cyan-500/40 text-cyan-300 px-2.5 py-1 rounded-full text-[11px] font-mono shadow-lg flex items-center gap-1 z-20"
                >
                  <Cpu className="w-3 h-3 text-cyan-400" />
                  <span>PyTorch</span>
                </motion.div>

                {/* Floating Tech Pill 2: RAG & LLMs */}
                <motion.div 
                  animate={{ y: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -bottom-2 -left-3 bg-slate-900/90 border border-purple-500/40 text-purple-300 px-2.5 py-1 rounded-full text-[11px] font-mono shadow-lg flex items-center gap-1 z-20"
                >
                  <BrainCircuit className="w-3 h-3 text-purple-400" />
                  <span>RAG & LLMs</span>
                </motion.div>

                {/* Floating Tech Pill 3: Computer Vision */}
                <motion.div 
                  animate={{ x: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                  className="absolute top-1/2 -left-6 bg-slate-900/90 border border-emerald-500/40 text-emerald-300 px-2 py-1 rounded-full text-[10px] font-mono shadow-lg flex items-center gap-1 z-20"
                >
                  <Eye className="w-3 h-3 text-emerald-400" />
                  <span>D-FINE-N</span>
                </motion.div>
              </div>

              {/* Identity & Core R&D Focus */}
              <div className="w-full text-center">
                <h2 className="text-xl font-bold text-white mb-0.5">Muhammad Uzair</h2>
                <p className="text-xs font-mono text-cyan-400 mb-3">AI / Machine Learning Engineer</p>

                <div className="w-full p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 text-left mb-4">
                  <div className="text-[11px] font-mono text-slate-400 mb-2.5 flex items-center justify-between">
                    <span>ACTIVE_WORKSTREAMS</span>
                    <span className="text-emerald-400 flex items-center gap-1 font-bold">
                      <Activity className="w-3 h-3" /> Live
                    </span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                      <span>Central AI Wrapper & Real-Time Telephony</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />
                      <span>CCTV Multi-Object Tracking (ByteTrack)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      <span>Cross-Platform Flutter & Edge AI Delivery</span>
                    </li>
                  </ul>
                </div>

                {/* Quick tech badge row */}
                <div className="flex flex-wrap justify-center gap-1.5">
                  {['FastAPI', 'pgvector', 'LangGraph', 'YOLOv8', 'Flutter', 'PyTorch'].map((tech) => (
                    <span 
                      key={tech}
                      className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300 font-mono text-[10px]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
