import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { skillCategories } from '../data/portfolioData';
import { 
  BrainCircuit, 
  Eye, 
  Cpu, 
  Server, 
  Smartphone, 
  Code2, 
  Sparkles, 
  CheckCircle2,
  Zap
} from 'lucide-react';

interface SkillsProps {
  perspective: 'ai' | 'fullstack';
}

export const Skills: React.FC<SkillsProps> = ({ perspective }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain':
        return BrainCircuit;
      case 'Eye':
        return Eye;
      case 'Cpu':
        return Cpu;
      case 'Server':
        return Server;
      case 'Smartphone':
        return Smartphone;
      case 'Code':
        return Code2;
      default:
        return Sparkles;
    }
  };

  const displayedCategories = activeCategory === 'all'
    ? skillCategories
    : skillCategories.filter((cat) => cat.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <section id="skills" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>TECHNICAL_ARSENAL & PROFICIENCY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Core Competencies & <span className="text-gradient-emerald">Specializations</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            A balanced matrix of cutting-edge LLM context engineering, low-latency computer vision pipelines, distributed vector architectures, and production edge deployment.
          </p>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                activeCategory === 'all'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Domains
            </button>
            {skillCategories.map((cat) => {
              const Icon = getCategoryIcon(cat.icon);
              const isActive = activeCategory === cat.category;
              return (
                <button
                  key={cat.category}
                  onClick={() => setActiveCategory(cat.category)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.category.split('&')[0].trim()}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Full-Stack Edge Callout Box */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`mb-12 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-purple-950/40 to-slate-900/80 border p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden transition-all duration-300 ${
            perspective === 'fullstack' ? 'border-purple-500/60 shadow-lg shadow-purple-950/40' : 'border-cyan-500/30'
          }`}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/40 text-cyan-300 shrink-0">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 uppercase tracking-wide">
                    The Edge Engineering Advantage
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Why Flutter in AI/ML?</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5">
                  Bridging Deep Learning Inference to Production Client Applications
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                  While most AI engineers stop at Python microservices, my background in <strong className="text-cyan-300">Flutter & Dart</strong> allows me to design end-to-end user experiences. From camera-feed preprocessing and on-device computer vision integration to real-time WebSockets and streaming audio telephony, I deliver complete products ready for immediate end-user deployment.
                </p>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-2 font-mono text-xs text-cyan-400 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>End-to-End Delivery</span>
            </div>
          </div>
        </motion.div>

        {/* Skill Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCategories.map((category, catIdx) => {
            const Icon = getCategoryIcon(category.icon);

            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: catIdx * 0.05 }}
                className="rounded-3xl glass-card p-6 border border-white/10 glass-card-hover flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-cyan-400">
                      <Icon className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-white">{category.category}</h3>
                      <p className="text-[11px] text-slate-400">{category.description}</p>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-3.5 mt-5">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className={`font-medium flex items-center gap-1.5 ${
                            skill.highlight ? 'text-white' : 'text-slate-300'
                          }`}>
                            {skill.highlight && (
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            )}
                            {skill.name}
                          </span>
                          <div className="flex items-center gap-1.5">
                            {skill.badge && (
                              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                                {skill.badge}
                              </span>
                            )}
                            <span className="text-[11px] font-mono text-slate-400">
                              {skill.level}%
                            </span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-1.5 rounded-full bg-slate-800/80 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
                            className={`h-full rounded-full ${
                              skill.highlight
                                ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500'
                                : 'bg-gradient-to-r from-slate-500 to-slate-400'
                            }`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>CATEGORY INDEX: 0{catIdx + 1}</span>
                  <span className="text-emerald-400 font-semibold">PRODUCTION TESTED</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
