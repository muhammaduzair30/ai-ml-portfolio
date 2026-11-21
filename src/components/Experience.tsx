import React from 'react';
import { motion } from 'framer-motion';
import { experiences, educationInfo } from '../data/portfolioData';
import { 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  Building2, 
  CheckCircle2, 
  Award, 
  Code2
} from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>CAREER_TRACK & PRODUCTION_IMPACT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Professional Experience & <span className="text-gradient-cyan">Track Record</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            Demonstrated engineering experience developing multi-tenant AI platforms, computer vision pipelines, and full-stack software products.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="space-y-12 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:-translate-x-px before:w-0.5 before:bg-gradient-to-b before:from-cyan-500/50 before:via-purple-500/30 before:to-transparent">
          {experiences.map((exp, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative flex flex-col sm:flex-row items-start ${
                  isEven ? 'sm:flex-row-reverse' : ''
                } gap-8 group`}
              >
                {/* Center Node Indicator */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-[#090e1a] border-2 border-cyan-400 group-hover:scale-125 group-hover:shadow-[0_0_15px_rgba(0,242,254,0.6)] transition-all duration-300 z-10">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                </div>

                {/* Content Card */}
                <div className="w-full sm:w-[calc(50%-2.5rem)] pl-12 sm:pl-0">
                  <div className="rounded-3xl glass-card p-6 sm:p-8 border border-white/10 glass-card-hover relative">
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold">
                        {exp.badge}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-sm font-mono text-purple-400 mb-4">
                      <Building2 className="w-4 h-4 text-purple-400" />
                      <span>{exp.company}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-400 text-xs">{exp.type}</span>
                    </div>

                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                      {exp.description}
                    </p>

                    {/* Sub-products (e.g. Central AI Platform and CCTV Vision) */}
                    <div className="space-y-4 mb-6">
                      {exp.products.map((prod, pIdx) => (
                        <div 
                          key={pIdx} 
                          className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800"
                        >
                          <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-800/80">
                            <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                              {prod.name}
                            </h4>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5">
                              {prod.status}
                            </span>
                          </div>
                          <ul className="space-y-2">
                            {prod.points.map((pt, ptIdx) => (
                              <li key={ptIdx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {/* Technologies footer */}
                    <div className="pt-4 border-t border-slate-800/80">
                      <div className="text-[11px] font-mono text-slate-400 mb-2">Technologies Deployed:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-0.5 rounded-lg bg-slate-900 text-[11px] font-mono text-slate-300 border border-slate-800"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Education Highlight Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-3xl glass-card p-6 sm:p-8 border border-white/10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-purple-500/10 via-transparent to-transparent rounded-full pointer-events-none" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-purple-500/15 border border-purple-500/30 text-purple-400">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold flex items-center gap-1">
                    <Award className="w-3 h-3" /> {educationInfo.distinction}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{educationInfo.period}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">{educationInfo.degree}</h3>
                <p className="text-slate-400 text-xs sm:text-sm">{educationInfo.institution}</p>
              </div>
            </div>

            {/* Academic Metrics */}
            <div className="flex items-center gap-4 sm:gap-6 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 font-mono">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-extrabold text-cyan-400">{educationInfo.cgpa}</div>
                <div className="text-[10px] text-slate-400">Cumulative GPA</div>
              </div>
              <div className="h-8 w-px bg-slate-800" />
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-extrabold text-purple-400">{educationInfo.percentage}</div>
                <div className="text-[10px] text-slate-400">Overall Score</div>
              </div>
              <div className="h-8 w-px bg-slate-800" />
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-extrabold text-emerald-400">{educationInfo.creditHours}</div>
                <div className="text-[10px] text-slate-400">Credit Hours</div>
              </div>
            </div>
          </div>

          {/* Key Coursework */}
          <div className="mt-6">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Rigorous Foundational Coursework</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {educationInfo.coursework.map((course) => (
                <span
                  key={course}
                  className="px-3 py-1 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300 font-mono"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
