import React from 'react';
import { personalInfo, educationInfo } from '../data/portfolioData';
import { 
  User, 
  Target, 
  Terminal, 
  Workflow, 
  Lightbulb,
  CheckCircle2,
  MapPin,
  Mail
} from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
            <User className="w-3.5 h-3.5" />
            <span>BACKGROUND_NARRATIVE & PHILOSOPHY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            About <span className="text-gradient-cyan">Muhammad Uzair</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            Passionate about bringing mathematical rigor and software engineering excellence to state-of-the-art AI systems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Narrative & Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-3xl glass-card p-6 sm:p-8 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2.5">
                <Terminal className="w-5 h-5 text-cyan-400" />
                <span>The Engineering Philosophy</span>
              </h3>
              
              <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  I am an <strong className="text-white">AI/ML R&D Engineer</strong> and Computer Science graduate from Peshawar, Pakistan, graduated with Distinction (CGPA 3.74/4.00, 92.97% overall percentage).
                </p>
                <p>
                  My engineering journey is driven by a simple realization: <em>the real challenge in AI is not just training a model in isolation, but building the production scaffolding around it</em> — predictable context engineering, low-latency streaming inference, hybrid vector retrieval, and resilient application frontends that real people can use.
                </p>
                <p>
                  At <strong className="text-cyan-300">VeevoTech</strong>, I build and maintain our Central AI Platform (AI Wrapper) which powers multiple enterprise applications, incorporating RAG pipelines, configurable agentic workers, and real-time interruption-aware AI telephony. Simultaneously, I lead our enterprise CCTV computer vision R&D, combining high-speed detection (D-FINE-N), multi-object tracking (ByteTrack), and facial anti-spoofing biometrics.
                </p>
              </div>

              {/* Core Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-800">
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs mb-1.5 font-mono">
                    <Target className="w-4 h-4" />
                    <span>GROUNDED & EXPLAINABLE</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Zero hallucination tolerance. Implementing Reciprocal Rank Fusion (RRF) and verifiable citation chains for bulletproof enterprise RAG.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-2 text-purple-400 font-bold text-xs mb-1.5 font-mono">
                    <Workflow className="w-4 h-4" />
                    <span>PRODUCTION-GRADE PIPELINES</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Sub-100ms streaming responses, async background embedding workers in FastAPI, and sub-25ms video tracking pipelines.
                  </p>
                </div>
              </div>
            </div>

            {/* Areas of Active Exploration */}
            <div className="rounded-3xl glass-card p-6 border border-white/10">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>Primary Areas of Interest & Research</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {educationInfo.areasOfInterest.map((interest, i) => (
                  <div 
                    key={i}
                    className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 text-xs text-slate-300 flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                    <span>{interest}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Identity Card & Quick Stats */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl glass-card p-6 sm:p-7 border border-white/10 relative overflow-hidden">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-800">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border border-cyan-500/40 shrink-0">
                  <img
                    src={personalInfo.avatarUrl}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">{personalInfo.name}</h4>
                  <p className="text-xs font-mono text-cyan-400">{personalInfo.role}</p>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-slate-400" /> {personalInfo.location}
                  </p>
                </div>
              </div>

              {/* Bio summary lines */}
              <div className="space-y-3 text-xs text-slate-300 font-mono mb-6">
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-slate-500">DEGREE:</span>
                  <span className="text-white font-semibold">BS Computer Science</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-slate-500">ACADEMIC HONORS:</span>
                  <span className="text-emerald-400 font-semibold">Passed with Distinction</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-slate-500">CGPA / PERCENTAGE:</span>
                  <span className="text-cyan-400 font-semibold">3.74 / 4.00 (92.97%)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-slate-500">CURRENT AFFILIATION:</span>
                  <span className="text-purple-300 font-semibold">VeevoTech (AI/ML R&D)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-slate-500">CORE FOCUS:</span>
                  <span className="text-white font-semibold">LLMs, RAG, CCTV Vision</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500">AVAILABILITY:</span>
                  <span className="text-emerald-400 font-semibold">Open to Strategic AI Roles</span>
                </div>
              </div>

              {/* Direct email CTA */}
              <a
                href={`mailto:${personalInfo.email}`}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 border border-cyan-500/40 text-cyan-300 hover:text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all font-mono"
              >
                <Mail className="w-4 h-4" />
                <span>muhammaduzair2542@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
