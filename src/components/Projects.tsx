import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/portfolioData';
import type { Project } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';
import { 
  BrainCircuit, 
  Eye, 
  Bot, 
  Layers, 
  Smartphone, 
  ExternalLink, 
  ArrowUpRight
} from 'lucide-react';
import { GithubIcon } from './Icons';

interface ProjectsProps {
  perspective: 'ai' | 'fullstack';
}

export const Projects: React.FC<ProjectsProps> = ({ perspective }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // If perspective is fullstack, default to showing edge + all
  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'all') {
      if (perspective === 'fullstack') {
        // In fullstack mode, emphasize projects that involve client/edge or end-to-end integration
        return true;
      }
      return true;
    }
    if (activeFilter === 'llm') return project.category === 'llm';
    if (activeFilter === 'vision') return project.category === 'vision';
    if (activeFilter === 'agentic') return project.category === 'agentic';
    if (activeFilter === 'edge') return project.category === 'edge' || project.technologies.includes('Flutter');
    return true;
  });

  const getCategoryIcon = (category: Project['category']) => {
    switch (category) {
      case 'llm':
        return BrainCircuit;
      case 'vision':
        return Eye;
      case 'agentic':
        return Bot;
      case 'edge':
        return Smartphone;
      default:
        return Layers;
    }
  };

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-mono mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>ENGINEERED_SYSTEMS & RESEARCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Featured AI & Engineering <span className="text-gradient-purple">Projects</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            A curated portfolio of production AI platforms, real-time computer vision engines, and multimodal applications. Click any system for deep architectural insights.
          </p>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
            {[
              { id: 'all', label: 'All Systems', icon: Layers },
              { id: 'llm', label: 'LLMs & RAG', icon: BrainCircuit },
              { id: 'vision', label: 'Computer Vision', icon: Eye },
              { id: 'agentic', label: 'Agentic AI', icon: Bot },
              { id: 'edge', label: 'Edge & Flutter', icon: Smartphone },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-500/25 to-cyan-500/25 text-white border border-purple-500/40 shadow-md shadow-purple-950/40 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project, index) => {
              const Icon = getCategoryIcon(project.category);
              const isFeatured = project.featured;

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`group relative rounded-3xl glass-card p-6 flex flex-col justify-between border border-white/10 glass-card-hover ${
                    isFeatured ? 'lg:col-span-1 border-cyan-500/20' : ''
                  }`}
                >
                  {/* Card Header */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 group-hover:border-cyan-500/40 group-hover:text-cyan-300 transition-colors">
                          <Icon className="w-4 h-4" />
                        </span>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700">
                          {project.badge}
                        </span>
                      </div>

                      <button
                        onClick={() => setSelectedProject(project)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                        title="Open Deep Dive"
                        aria-label="Open Deep Dive"
                      >
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-cyan-400" />
                      </button>
                    </div>

                    <h3 
                      onClick={() => setSelectedProject(project)}
                      className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors cursor-pointer leading-snug mb-1"
                    >
                      {project.title}
                    </h3>

                    <p className="text-xs font-mono text-slate-400 mb-3 line-clamp-1">
                      {project.subtitle}
                    </p>

                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Highlights bullet previews */}
                    <div className="mb-4 space-y-1.5">
                      {project.architectureHighlights.slice(0, 2).map((h, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-400 line-clamp-1">
                          <span className="text-cyan-400 mt-0.5">•</span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer: Tech Tags & Action */}
                  <div className="pt-4 border-t border-slate-800/80">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md bg-slate-900/80 border border-slate-800 text-[10px] font-mono text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-1.5 py-0.5 rounded-md bg-white/5 text-[10px] font-mono text-slate-500">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="text-cyan-400 hover:text-cyan-300 font-semibold font-mono flex items-center gap-1 text-[11px]"
                      >
                        <span>Deep Dive Architecture</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>

                      <div className="flex items-center gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded text-slate-400 hover:text-white transition-colors"
                            title="GitHub"
                          >
                            <GithubIcon className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded text-slate-400 hover:text-cyan-400 transition-colors"
                            title="Live Demo"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Project Deep Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
