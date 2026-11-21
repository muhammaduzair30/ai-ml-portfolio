import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { systemBlueprints } from '../data/portfolioData';
import type { ArchitectureNode, SystemBlueprint } from '../data/portfolioData';
import { 
  BrainCircuit, 
  Video, 
  FileText, 
  Clock, 
  Cpu, 
  Database, 
  Share2, 
  Sparkles,
  Info
} from 'lucide-react';

export const ArchitectureSimulator: React.FC = () => {
  const [activeBlueprintId, setActiveBlueprintId] = useState<string>(systemBlueprints[0].id);
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode | null>(systemBlueprints[0].diagram[0]);

  const activeBlueprint: SystemBlueprint = 
    systemBlueprints.find((b) => b.id === activeBlueprintId) || systemBlueprints[0];

  const handleSelectBlueprint = (id: string) => {
    setActiveBlueprintId(id);
    const bp = systemBlueprints.find((b) => b.id === id);
    if (bp && bp.diagram.length > 0) {
      setSelectedNode(bp.diagram[0]);
    }
  };

  const getNodeIcon = (type: ArchitectureNode['type']) => {
    switch (type) {
      case 'input':
        return Share2;
      case 'process':
        return Cpu;
      case 'model':
        return BrainCircuit;
      case 'db':
        return Database;
      case 'output':
        return Sparkles;
      default:
        return Cpu;
    }
  };

  const getNodeColor = (type: ArchitectureNode['type']) => {
    switch (type) {
      case 'input':
        return 'border-blue-500/40 bg-blue-950/30 text-blue-300';
      case 'process':
        return 'border-purple-500/40 bg-purple-950/30 text-purple-300';
      case 'model':
        return 'border-cyan-500/40 bg-cyan-950/30 text-cyan-300';
      case 'db':
        return 'border-amber-500/40 bg-amber-950/30 text-amber-300';
      case 'output':
        return 'border-emerald-500/40 bg-emerald-950/30 text-emerald-300';
    }
  };

  return (
    <section id="blueprints" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>SYSTEM_ARCHITECTURE_SIMULATOR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Interactive AI System <span className="text-gradient-cyan">Blueprints</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            Inspect real-world engineering workflows designed and implemented in production. Click on any pipeline stage to inspect data structures, models, and latency budgets.
          </p>

          {/* Blueprint Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md">
            {systemBlueprints.map((bp) => {
              const isActive = bp.id === activeBlueprintId;
              let Icon = BrainCircuit;
              if (bp.id === 'video-analytics') Icon = Video;
              if (bp.id === 'docmind-rag') Icon = FileText;

              return (
                <button
                  key={bp.id}
                  onClick={() => handleSelectBlueprint(bp.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 text-white border border-cyan-500/40 shadow-lg shadow-cyan-950/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{bp.title.split('(')[0].trim()}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Blueprint Viewer Card */}
        <div className="rounded-3xl glass-card p-6 sm:p-8 relative overflow-hidden border border-white/10">
          {/* Header Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  {activeBlueprint.tag}
                </span>
                <span className="text-xs font-mono text-slate-500">6 Stages Pipeline</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">{activeBlueprint.title}</h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">{activeBlueprint.subtitle}</p>
            </div>
            <div className="text-xs font-mono text-slate-400 bg-slate-900/80 px-3 py-2 rounded-xl border border-slate-800 self-start sm:self-auto">
              <span className="text-cyan-400">STATUS:</span> ACTIVE_PRODUCTION
            </div>
          </div>

          <p className="text-slate-300 text-xs sm:text-sm my-6 bg-slate-900/40 p-3.5 rounded-xl border border-slate-800/80">
            💡 {activeBlueprint.summary}
          </p>

          {/* Flow Diagram (Interactive Node Chain) */}
          <div className="my-8">
            <div className="text-xs font-mono text-slate-400 mb-3 flex items-center justify-between">
              <span>PIPELINE_FLOW (CLICK NODE TO INSPECT)</span>
              <span className="text-[11px] text-cyan-400 flex items-center gap-1">
                <Info className="w-3 h-3" /> Real-time telemetry simulation
              </span>
            </div>

            {/* Nodes Grid / Flow */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
              {activeBlueprint.diagram.map((node, index) => {
                const Icon = getNodeIcon(node.type);
                const isSelected = selectedNode?.id === node.id;
                const nodeColor = getNodeColor(node.type);

                return (
                  <motion.div
                    key={node.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedNode(node)}
                    className={`cursor-pointer rounded-2xl p-4 transition-all duration-200 border flex flex-col justify-between relative group ${
                      isSelected
                        ? 'border-cyan-400 bg-slate-900/90 shadow-xl shadow-cyan-500/20 ring-1 ring-cyan-400/50'
                        : `${nodeColor} hover:border-slate-500`
                    }`}
                  >
                    {/* Node Stage Number & Type Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center font-mono text-[10px] text-slate-300 font-bold">
                        {index + 1}
                      </span>
                      <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-black/40 text-slate-400">
                        {node.type}
                      </span>
                    </div>

                    {/* Icon & Title */}
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <Icon className="w-4 h-4 text-cyan-400 shrink-0" />
                        <h4 className="text-xs font-bold text-white leading-tight">{node.name}</h4>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2">{node.tech}</p>
                    </div>

                    {/* Latency footer */}
                    {node.latency && (
                      <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
                        <span>Latency</span>
                        <span className="text-cyan-300 font-bold">{node.latency}</span>
                      </div>
                    )}

                    {/* Selection Indicator */}
                    {isSelected && (
                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-cyan-400 rounded-full" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Node Inspector Drawer */}
          <AnimatePresence mode="wait">
            {selectedNode && (
              <motion.div
                key={selectedNode.id + activeBlueprintId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 rounded-2xl bg-[#070b14]/90 border border-cyan-500/30 p-5 backdrop-blur-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                      {React.createElement(getNodeIcon(selectedNode.type), { className: 'w-4 h-4' })}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        {selectedNode.name}
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/20">
                          STAGE {selectedNode.id}
                        </span>
                      </h4>
                      <p className="text-xs font-mono text-slate-400">Tech Stack: {selectedNode.tech}</p>
                    </div>
                  </div>

                  {selectedNode.latency && (
                    <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-300 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Budget: {selectedNode.latency}</span>
                    </div>
                  )}
                </div>

                <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <p className="mb-2">
                    <strong className="text-white">Engineering Specification:</strong> {selectedNode.description}
                  </p>
                  <p className="text-slate-400 text-xs">
                    Designed for high reliability and non-blocking asynchronous execution within distributed Python microservices and vector stores.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
