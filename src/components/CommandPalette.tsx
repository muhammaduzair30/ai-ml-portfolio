import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Terminal, 
  Cpu, 
  FileText, 
  MessageSquare, 
  Phone, 
  Layers, 
  Eye, 
  Database, 
  Briefcase, 
  Volume2, 
  VolumeX, 
  Sliders, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface CommandItem {
  id: string;
  title: string;
  category: 'Actions' | 'Interactive Labs' | 'Navigation' | 'Projects';
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onTogglePerspective: (p: 'ai' | 'fullstack') => void;
  perspective: 'ai' | 'fullstack';
  onOpenChat: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onTogglePerspective,
  perspective,
  onOpenChat,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(soundEffects.getIsMuted());
  const inputRef = useRef<HTMLInputElement | null>(null);

  const scrollTo = (id: string) => {
    onClose();
    soundEffects.playScan(500, 900, 0.08);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  const commands: CommandItem[] = [
    // Quick Actions
    {
      id: 'chat-uzair',
      title: 'Chat with Uzair.ai Digital Twin',
      category: 'Actions',
      description: 'Ask questions, request architecture details, or send an email in-chat',
      icon: MessageSquare,
      badge: 'Groq LLM',
      action: () => {
        onClose();
        soundEffects.playSuccess();
        setTimeout(onOpenChat, 200);
      },
    },
    {
      id: 'download-cv',
      title: 'Download Official CV (PDF)',
      category: 'Actions',
      description: 'Muhammad Uzair AI/ML R&D Engineer Resume (CECOS Distinction)',
      icon: FileText,
      badge: 'PDF',
      action: () => {
        onClose();
        soundEffects.playSuccess();
        const link = document.createElement('a');
        link.href = '/Muhammad_Uzair_AI_ML_CV.pdf';
        link.download = 'Muhammad_Uzair_AI_ML_CV.pdf';
        link.click();
      },
    },
    {
      id: 'whatsapp',
      title: 'Open WhatsApp Chat with Uzair',
      category: 'Actions',
      description: 'Connect directly on mobile at +92 320 1985059',
      icon: Phone,
      badge: '+92 320 1985059',
      action: () => {
        onClose();
        soundEffects.playBlip();
        window.open('https://wa.me/923201985059?text=Hi%20Uzair,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!', '_blank');
      },
    },
    {
      id: 'toggle-perspective',
      title: perspective === 'ai' ? 'Switch to Edge + Flutter Perspective' : 'Switch to AI Core & Vision Perspective',
      category: 'Actions',
      description: 'Toggle dual-perspective engineering lens',
      icon: Sliders,
      badge: perspective === 'ai' ? 'AI Core Active' : 'Edge Active',
      action: () => {
        soundEffects.playBlip(700, 0.06);
        onTogglePerspective(perspective === 'ai' ? 'fullstack' : 'ai');
        onClose();
      },
    },
    {
      id: 'toggle-sound',
      title: isMuted ? 'Unmute Futuristic Sound FX' : 'Mute Sound FX',
      category: 'Actions',
      description: 'Synthesized cybernetic web audio feedback',
      icon: isMuted ? Volume2 : VolumeX,
      badge: isMuted ? 'Muted' : 'Active',
      action: () => {
        const newMuted = soundEffects.toggleMute();
        setIsMuted(newMuted);
      },
    },

    // Interactive Labs
    {
      id: 'lab-cctv',
      title: 'Run CCTV Vision Tracker (D-FINE-N + ByteTrack)',
      category: 'Interactive Labs',
      description: 'Live spatial simulation with ArcFace embeddings & tripwire alarm',
      icon: Eye,
      badge: 'Live Simulator',
      action: () => scrollTo('ai-lab'),
    },
    {
      id: 'lab-rag',
      title: 'Test Hybrid RAG & Vector Space (RRF)',
      category: 'Interactive Labs',
      description: 'Interactive comparison: Dense pgvector cosine vs sparse BM25',
      icon: Database,
      badge: 'Interactive',
      action: () => scrollTo('ai-lab'),
    },
    {
      id: 'lab-ats',
      title: 'Run AIAA ATS Recruiter Matcher',
      category: 'Interactive Labs',
      description: 'Cosine semantic resonance against real job requirements',
      icon: Sparkles,
      badge: 'Live Matcher',
      action: () => scrollTo('ai-lab'),
    },
    {
      id: 'terminal',
      title: 'Open Developer Terminal Playground',
      category: 'Interactive Labs',
      description: 'Interactive CLI supporting help, skills, exp, contact, clear',
      icon: Terminal,
      badge: 'CLI',
      action: () => scrollTo('terminal'),
    },

    // Navigation
    {
      id: 'nav-blueprints',
      title: 'System Architecture Blueprints',
      category: 'Navigation',
      description: 'Central AI Wrapper, CCTV Pipeline, DocMind RRF Blueprints',
      icon: Layers,
      action: () => scrollTo('blueprints'),
    },
    {
      id: 'nav-projects',
      title: 'Production Projects Bento Grid',
      category: 'Navigation',
      description: 'Enterprise production systems and open-source models',
      icon: Cpu,
      action: () => scrollTo('projects'),
    },
    {
      id: 'nav-experience',
      title: 'Work Experience & CECOS Distinction',
      category: 'Navigation',
      description: 'AI/ML R&D Engineer @ VeevoTech and Academic Honors',
      icon: Briefcase,
      action: () => scrollTo('experience'),
    },
    {
      id: 'nav-contact',
      title: 'Contact & Collaboration Desk',
      category: 'Navigation',
      description: 'Send a message directly to muhammaduzair2542@gmail.com',
      icon: MessageSquare,
      action: () => scrollTo('contact'),
    },
  ];

  const filteredCommands = commands.filter((c) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      c.title.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.description?.toLowerCase().includes(q) ||
      c.badge?.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      soundEffects.playScan(400, 800, 0.07);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle palette on Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open palette
          const event = new CustomEvent('open-command-palette');
          window.dispatchEvent(event);
        }
      }

      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        soundEffects.playBlip(600, 0.02, 0.02);
        setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        soundEffects.playBlip(600, 0.02, 0.02);
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Palette Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-2xl bg-[#090d19]/95 border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-950/60 overflow-hidden backdrop-blur-xl"
          >
            {/* Header / Search Input */}
            <div className="flex items-center px-4 py-3.5 border-b border-slate-800/80 bg-slate-900/60">
              <Search className="w-5 h-5 text-cyan-400 mr-3 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command, tool, project or destination... (or ↑↓ to navigate)"
                className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
              />
              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                  ESC to close
                </span>
              </div>
            </div>

            {/* Results List */}
            <div className="max-h-[380px] overflow-y-auto p-2 divide-y divide-slate-800/40">
              {filteredCommands.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-sm">
                  No matching commands for "{query}"
                </div>
              ) : (
                filteredCommands.map((cmd, idx) => {
                  const Icon = cmd.icon;
                  const isSelected = idx === selectedIndex;

                  return (
                    <div
                      key={cmd.id}
                      onClick={() => cmd.action()}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all duration-150 ${
                        isSelected
                          ? 'bg-gradient-to-r from-cyan-950/70 to-slate-900 border border-cyan-500/40 text-cyan-200'
                          : 'hover:bg-slate-900/40 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                              : 'bg-slate-800/80 text-slate-400'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-semibold flex items-center gap-2">
                            <span className="truncate">{cmd.title}</span>
                            {cmd.badge && (
                              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 shrink-0">
                                {cmd.badge}
                              </span>
                            )}
                          </div>
                          {cmd.description && (
                            <p className="text-[11px] text-slate-400 truncate mt-0.5">
                              {cmd.description}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 ml-3">
                        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">
                          {cmd.category}
                        </span>
                        {isSelected && (
                          <ArrowRight className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Quick Keys */}
            <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-950/80 flex items-center justify-between text-[11px] text-slate-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono text-[9px] border border-slate-700">↑↓</kbd> navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono text-[9px] border border-slate-700">↵</kbd> execute
                </span>
              </div>
              <span className="font-mono text-cyan-400/70 text-[10px]">
                Uzair.ai Spotlight Controller
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
