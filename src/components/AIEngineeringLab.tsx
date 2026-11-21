import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, 
  BrainCircuit, 
  ShieldAlert, 
  Play, 
  Pause, 
  Search, 
  CheckCircle2, 
  ArrowRight, 
  Activity, 
  FileCheck,
  Send,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';

type LabTab = 'vision' | 'rag' | 'ats';

interface TrackedObject {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  class: string;
  confidence: number;
  faceMatch?: string;
  liveness?: boolean;
  trail: { x: number; y: number }[];
  inZone?: boolean;
}

export const AIEngineeringLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<LabTab>('vision');

  // ----------------------------------------------------
  // TAB 1: VISION LAB STATE (D-FINE-N + ByteTrack Simulator)
  // ----------------------------------------------------
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeCamera, setActiveCamera] = useState<'cam1' | 'cam2'>('cam1');
  const [showTrails, setShowTrails] = useState(true);
  const [zoneAlert, setZoneAlert] = useState(false);
  const [alertCount, setAlertCount] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const objectsRef = useRef<TrackedObject[]>([
    {
      id: 101,
      x: 60,
      y: 120,
      vx: 1.1,
      vy: 0.4,
      w: 48,
      h: 90,
      class: 'Person',
      confidence: 0.96,
      faceMatch: 'ArcFace: Verified (0.92)',
      liveness: true,
      trail: [],
    },
    {
      id: 104,
      x: 320,
      y: 80,
      vx: -0.9,
      vy: 0.6,
      w: 44,
      h: 85,
      class: 'Person',
      confidence: 0.94,
      faceMatch: 'ArcFace: Unknown',
      liveness: true,
      trail: [],
    },
    {
      id: 108,
      x: 180,
      y: 200,
      vx: 0.8,
      vy: -0.7,
      w: 46,
      h: 88,
      class: 'Person',
      confidence: 0.98,
      faceMatch: 'ArcFace: Staff (0.95)',
      liveness: true,
      trail: [],
    },
  ]);

  // Restricted Zone polygon definition (normalized 0..1)
  const zonePolygon = {
    x1: 220,
    y1: 60,
    x2: 440,
    y2: 240,
  };

  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let triggerCooldown = false;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Simulated Camera Feed Grid / Wireframe background
      ctx.fillStyle = '#060a14';
      ctx.fillRect(0, 0, width, height);

      // Floor grid lines
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Draw Spatial Restricted Zone
      const isInAlarm = objectsRef.current.some((obj) => obj.inZone);
      ctx.fillStyle = isInAlarm
        ? 'rgba(244, 63, 94, 0.18)'
        : 'rgba(234, 179, 8, 0.1)';
      ctx.strokeStyle = isInAlarm
        ? 'rgba(244, 63, 94, 0.8)'
        : 'rgba(234, 179, 8, 0.6)';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);

      ctx.fillRect(
        zonePolygon.x1,
        zonePolygon.y1,
        zonePolygon.x2 - zonePolygon.x1,
        zonePolygon.y2 - zonePolygon.y1
      );
      ctx.strokeRect(
        zonePolygon.x1,
        zonePolygon.y1,
        zonePolygon.x2 - zonePolygon.x1,
        zonePolygon.y2 - zonePolygon.y1
      );
      ctx.setLineDash([]);

      // Zone label
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = isInAlarm ? '#f43f5e' : '#eab308';
      ctx.fillText(
        isInAlarm ? '⚠️ RESTRICTED ZONE BREACH' : 'ZONE A: RESTRICTED SECTOR',
        zonePolygon.x1 + 8,
        zonePolygon.y1 + 16
      );

      // 3. Update & Draw Tracked Objects
      let currentAlarmTriggered = false;

      objectsRef.current.forEach((obj) => {
        if (isPlaying) {
          obj.x += obj.vx;
          obj.y += obj.vy;

          // Bounce from canvas edges
          if (obj.x < 20 || obj.x + obj.w > width - 20) obj.vx *= -1;
          if (obj.y < 30 || obj.y + obj.h > height - 20) obj.vy *= -1;

          // Record trail
          obj.trail.push({ x: obj.x + obj.w / 2, y: obj.y + obj.h });
          if (obj.trail.length > 25) obj.trail.shift();
        }

        // Zone intersection check
        const inZone =
          obj.x + obj.w > zonePolygon.x1 &&
          obj.x < zonePolygon.x2 &&
          obj.y + obj.h > zonePolygon.y1 &&
          obj.y < zonePolygon.y2;
        obj.inZone = inZone;

        if (inZone) {
          currentAlarmTriggered = true;
        }

        // Draw Motion Trail (ByteTrack motion association)
        if (showTrails && obj.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(obj.trail[0].x, obj.trail[0].y);
          for (let i = 1; i < obj.trail.length; i++) {
            ctx.lineTo(obj.trail[i].x, obj.trail[i].y);
          }
          ctx.strokeStyle = inZone
            ? 'rgba(244, 63, 94, 0.4)'
            : 'rgba(0, 242, 254, 0.35)';
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Bounding Box (D-FINE-N styling)
        ctx.strokeStyle = inZone ? '#f43f5e' : '#00f2fe';
        ctx.lineWidth = 1.8;
        ctx.strokeRect(obj.x, obj.y, obj.w, obj.h);

        // Corner brackets
        const cornerLen = 6;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        // Top-left
        ctx.beginPath();
        ctx.moveTo(obj.x, obj.y + cornerLen);
        ctx.lineTo(obj.x, obj.y);
        ctx.lineTo(obj.x + cornerLen, obj.y);
        ctx.stroke();
        // Bottom-right
        ctx.beginPath();
        ctx.moveTo(obj.x + obj.w, obj.y + obj.h - cornerLen);
        ctx.lineTo(obj.x + obj.w, obj.y + obj.h);
        ctx.lineTo(obj.x + obj.w - cornerLen, obj.y + obj.h);
        ctx.stroke();

        // Bounding Box Top Label: ID & Confidence
        ctx.fillStyle = inZone ? '#f43f5e' : '#0891b2';
        ctx.fillRect(obj.x, obj.y - 15, obj.w + 35, 14);

        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(
          `ID:#${obj.id} ${Math.round(obj.confidence * 100)}%`,
          obj.x + 2,
          obj.y - 4
        );

        // Biometrics Sub-label (ArcFace & MiniFASNet)
        if (obj.faceMatch) {
          ctx.fillStyle = 'rgba(11, 16, 28, 0.85)';
          ctx.fillRect(obj.x, obj.y + obj.h + 2, 110, 13);
          ctx.fillStyle = obj.faceMatch.includes('Verified') || obj.faceMatch.includes('Staff')
            ? '#34d399'
            : '#cbd5e1';
          ctx.font = '8px "JetBrains Mono", monospace';
          ctx.fillText(obj.faceMatch, obj.x + 3, obj.y + obj.h + 11);
        }
      });

      setZoneAlert(currentAlarmTriggered);
      if (currentAlarmTriggered && !triggerCooldown) {
        triggerCooldown = true;
        setAlertCount((prev) => prev + 1);
        setTimeout(() => {
          triggerCooldown = false;
        }, 1500);
      }

      // Timestamp overlay
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.fillText(
        `FEED: ${activeCamera.toUpperCase()} // D-FINE-N 30.2 FPS // BYTE_TRACK ACTIVE`,
        12,
        20
      );

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [isPlaying, activeCamera, showTrails]);

  // ----------------------------------------------------
  // TAB 2: HYBRID RAG & VECTOR SPACE EXPLORER STATE
  // ----------------------------------------------------
  const [searchQuery, setSearchQuery] = useState('Central AI Platform architecture');
  const [activePreset, setActivePreset] = useState<string>('Central AI Platform');
  const [isSimulatingRAG, setIsSimulatingRAG] = useState(false);

  const ragPresets = [
    {
      title: 'Central AI Platform',
      query: 'How does Uzair architect the Central AI Platform and telephony?',
      chunks: [
        {
          id: 'chunk_82',
          source: 'VeevoTech / Architecture Spec',
          vectorScore: 0.94,
          bm25Rank: 1,
          rrfScore: 0.0328,
          text: 'Centralized microservices AI wrapper providing RAG, conversation memory buffers, and configurable agentic workers to 5-6 company applications with streaming audio telephony.',
        },
        {
          id: 'chunk_14',
          source: 'Telephony / Audio Buffer',
          vectorScore: 0.88,
          bm25Rank: 3,
          rrfScore: 0.0294,
          text: 'Interruption-aware streaming STT pipeline built on WebSockets and FastAPI, halting synthesis in under 80ms upon speech activity detection.',
        },
      ],
    },
    {
      title: 'CCTV Video Tracking',
      query: 'What is the tracking pipeline used in the CCTV product?',
      chunks: [
        {
          id: 'chunk_45',
          source: 'VeevoTech / Vision Pipeline',
          vectorScore: 0.96,
          bm25Rank: 1,
          rrfScore: 0.0335,
          text: 'Combines D-FINE-N real-time detection with ByteTrack temporal association, processing frames in sub-25ms with SCRFD face detection and ArcFace 512D verification.',
        },
        {
          id: 'chunk_51',
          source: 'Spatial Analytics / Rules',
          vectorScore: 0.89,
          bm25Rank: 2,
          rrfScore: 0.0310,
          text: 'Rule-based event analytics including polygon zone breaches, dwell-time counters, restricted area activity, and loitering detection.',
        },
      ],
    },
    {
      title: 'DocMind AI & RRF',
      query: 'Explain Reciprocal Rank Fusion in DocMind AI.',
      chunks: [
        {
          id: 'chunk_03',
          source: 'DocMind AI / Search Engine',
          vectorScore: 0.95,
          bm25Rank: 1,
          rrfScore: 0.0331,
          text: 'Reciprocal Rank Fusion (RRF) reconciles pgvector cosine semantic similarity with PostgreSQL tsvector keyword rankings to prevent hallucinations on technical terminology.',
        },
        {
          id: 'chunk_09',
          source: 'FastAPI / Async Worker',
          vectorScore: 0.86,
          bm25Rank: 4,
          rrfScore: 0.0278,
          text: 'Asynchronous document ingestion using FastAPI BackgroundTasks for non-blocking vector embedding generation with sentence boundary preservation.',
        },
      ],
    },
  ];

  const currentRAGData = ragPresets.find((p) => p.title === activePreset) || ragPresets[0];

  const handleRunRAG = () => {
    setIsSimulatingRAG(true);
    setTimeout(() => {
      setIsSimulatingRAG(false);
    }, 600);
  };

  // ----------------------------------------------------
  // TAB 3: AIAA JOB ATS COMPATIBILITY MATCHER
  // ----------------------------------------------------
  const [jobTitle, setJobTitle] = useState('Senior AI/ML Engineer');
  const [isScanning, setIsScanning] = useState(false);
  const [matchResult, setMatchResult] = useState<{
    score: number;
    fitLevel: string;
    matchedSkills: string[];
    analysis: string;
  }>({
    score: 97,
    fitLevel: 'Exceptional Alignment (Top 1%)',
    matchedSkills: [
      'Production LLMs & RAG',
      'Context Engineering',
      'FastAPI Microservices',
      'pgvector & Vector Search',
      'LangGraph Agentic Graphs',
      'D-FINE-N & ByteTrack Computer Vision',
      'Cross-Platform Flutter & Edge AI',
    ],
    analysis:
      'Muhammad Uzair brings rare end-to-end expertise: developing enterprise Central AI Platforms with RAG & telephony, coupled with deep computer vision video analytics and production cross-platform client delivery.',
  });

  const presetRoles = [
    {
      title: 'Senior AI/ML Engineer (LLMs & RAG)',
      score: 98,
      fitLevel: 'Direct Production Match',
      matchedSkills: ['Central AI Platforms', 'Hybrid RAG (RRF)', 'LangGraph', 'FastAPI', 'pgvector', 'Memory Systems'],
      analysis: 'Direct match for production LLM engineering. He already maintains a centralized AI wrapper for 5-6 production apps with streaming RAG and memory management.',
    },
    {
      title: 'Computer Vision & Tracking Specialist',
      score: 96,
      fitLevel: 'Strong Applied Fit',
      matchedSkills: ['D-FINE-N', 'ByteTrack', 'OpenCV', 'PyTorch', 'SCRFD Face Detection', 'ArcFace', 'Spatial Zone Rules'],
      analysis: 'Currently leading the technical development of an enterprise CCTV product using D-FINE-N detection, ByteTrack tracking, and facial anti-spoofing biometrics.',
    },
    {
      title: 'Full-Stack Edge AI & Client Engineer',
      score: 95,
      fitLevel: 'Unique Cross-Discipline Advantage',
      matchedSkills: ['Flutter Mobile & Desktop', 'Dart', 'FastAPI Backends', 'On-Device Inference', 'Riverpod Clean Architecture'],
      analysis: 'Combines deep machine learning with production Flutter client development — allowing him to ship complete user-facing applications rather than just isolated model scripts.',
    },
  ];

  const handleSelectRole = (role: typeof presetRoles[0]) => {
    setJobTitle(role.title);
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setMatchResult({
        score: role.score,
        fitLevel: role.fitLevel,
        matchedSkills: role.matchedSkills,
        analysis: role.analysis,
      });
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
      });
    }, 500);
  };

  return (
    <section id="ai-lab" className="py-24 px-4 relative overflow-hidden">
      {/* Background radial aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-cyan-500/10 via-purple-600/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3 shadow-md shadow-cyan-950/40">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>LIVE_INFERENCE_LAB & CAPABILITY_SANDBOX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Interactive AI Systems <span className="text-gradient-cyan">Lab</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            Experience Muhammad Uzair's real-world AI pipelines live in your browser: test real-time CCTV multi-object tracking, explore hybrid vector RAG retrieval, and run candidate compatibility matching.
          </p>

          {/* Lab Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md">
            <button
              onClick={() => setActiveTab('vision')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'vision'
                  ? 'bg-gradient-to-r from-cyan-500/25 to-blue-500/25 text-white border border-cyan-500/40 shadow-lg shadow-cyan-950/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span>Real-Time CCTV Vision (D-FINE-N + ByteTrack)</span>
            </button>

            <button
              onClick={() => setActiveTab('rag')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'rag'
                  ? 'bg-gradient-to-r from-purple-500/25 to-blue-500/25 text-white border border-purple-500/40 shadow-lg shadow-purple-950/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BrainCircuit className="w-3.5 h-3.5 text-purple-400" />
              <span>Hybrid RAG & Vector Space (pgvector + RRF)</span>
            </button>

            <button
              onClick={() => setActiveTab('ats')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'ats'
                  ? 'bg-gradient-to-r from-emerald-500/25 to-cyan-500/25 text-white border border-emerald-500/40 shadow-lg shadow-emerald-950/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>AIAA Recruiter Match Engine</span>
            </button>
          </div>
        </div>

        {/* ==================================================== */}
        {/* TAB 1: LIVE COMPUTER VISION & MULTI-OBJECT TRACKING  */}
        {/* ==================================================== */}
        {activeTab === 'vision' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl glass-card p-6 sm:p-8 border border-cyan-500/30 shadow-2xl relative overflow-hidden"
          >
            {/* Control Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-5 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold">
                    D-FINE-N + ByteTrack Simulator
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Sub-25ms Temporal Tracking</span>
                </div>
                <h3 className="text-xl font-bold text-white">Enterprise CCTV Real-Time Video Analytics</h3>
              </div>

              {/* Action Toggles */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-colors ${
                    isPlaying
                      ? 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlaying ? 'Pause Feed' : 'Resume Feed'}</span>
                </button>

                <button
                  onClick={() => setShowTrails(!showTrails)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-colors border ${
                    showTrails
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  Trails: {showTrails ? 'ON' : 'OFF'}
                </button>

                <div className="flex items-center p-0.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
                  <button
                    onClick={() => setActiveCamera('cam1')}
                    className={`px-2.5 py-1 rounded-lg ${
                      activeCamera === 'cam1' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400'
                    }`}
                  >
                    CAM_01
                  </button>
                  <button
                    onClick={() => setActiveCamera('cam2')}
                    className={`px-2.5 py-1 rounded-lg ${
                      activeCamera === 'cam2' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400'
                    }`}
                  >
                    CAM_02
                  </button>
                </div>
              </div>
            </div>

            {/* Live Canvas Viewport */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-black aspect-[16/9] max-h-[460px] flex items-center justify-center">
              <canvas
                ref={canvasRef}
                width={700}
                height={394}
                className="w-full h-full object-cover"
              />

              {/* Real-Time Alert Banner Overlay */}
              <AnimatePresence>
                {zoneAlert && (
                  <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="absolute top-4 left-4 right-4 sm:left-auto sm:right-4 bg-rose-950/90 border border-rose-500/60 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-mono text-rose-200 flex items-center gap-2.5 shadow-xl shadow-rose-950/80 z-20"
                  >
                    <ShieldAlert className="w-4 h-4 text-rose-400 animate-pulse shrink-0" />
                    <div>
                      <div className="font-bold text-white">SPATIAL TRIPWIRE TRIGGERED</div>
                      <div className="text-[10px] text-rose-300">Target entered restricted zone • Alert #{alertCount}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Technical Metrics Footer */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-slate-800 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">INFERENCE ENGINE</span>
                <span className="text-cyan-300 font-bold">D-FINE-N (PyTorch)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">TRACKER ASSOCIATION</span>
                <span className="text-purple-300 font-bold">ByteTrack (Kalman)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">FACIAL BIOMETRICS</span>
                <span className="text-emerald-300 font-bold">SCRFD + ArcFace</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">AVERAGE LATENCY</span>
                <span className="text-white font-bold">&lt;25ms / Frame</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* ==================================================== */}
        {/* TAB 2: HYBRID RAG & RECIPROCAL RANK FUSION (RRF)    */}
        {/* ==================================================== */}
        {activeTab === 'rag' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl glass-card p-6 sm:p-8 border border-purple-500/30 shadow-2xl relative overflow-hidden"
          >
            {/* Header */}
            <div className="pb-5 mb-5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-purple-500/15 text-purple-300 border border-purple-500/30 font-semibold">
                    Hybrid RAG Architecture
                  </span>
                  <span className="text-xs text-slate-400 font-mono">pgvector + BM25 Lexical Fusion</span>
                </div>
                <h3 className="text-xl font-bold text-white">Reciprocal Rank Fusion (RRF) Semantic Search</h3>
              </div>

              {/* Preset Selector */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {ragPresets.map((p) => (
                  <button
                    key={p.title}
                    onClick={() => {
                      setActivePreset(p.title);
                      setSearchQuery(p.query);
                      handleRunRAG();
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                      activePreset === p.title
                        ? 'bg-purple-600 text-white font-bold shadow-md'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {p.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Query Input Bar */}
            <div className="flex items-center gap-2 p-2 rounded-2xl bg-slate-900/90 border border-slate-800 mb-6">
              <Search className="w-4 h-4 text-purple-400 ml-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none"
                placeholder="Type query to test semantic retrieval..."
              />
              <button
                onClick={handleRunRAG}
                disabled={isSimulatingRAG}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-mono text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Execute RRF</span>
              </button>
            </div>

            {/* RAG Dual Pipeline Flow Visualizer */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Dual Stream Comparison */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 font-mono text-xs space-y-3">
                  <div className="text-cyan-400 font-bold flex items-center justify-between">
                    <span>1. DENSE VECTOR STREAM</span>
                    <span className="text-[10px] text-slate-500">pgvector cosine</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Embedding:</span>
                      <span className="text-cyan-300">text-embedding-3-small (1536D)</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Top Semantic Match:</span>
                      <span className="text-white font-bold">{currentRAGData.chunks[0].vectorScore * 100}% Cosine</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 font-mono text-xs space-y-3">
                  <div className="text-purple-400 font-bold flex items-center justify-between">
                    <span>2. SPARSE KEYWORD STREAM</span>
                    <span className="text-[10px] text-slate-500">PostgreSQL tsvector</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Algorithm:</span>
                      <span className="text-purple-300">BM25 Inverted Index</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Top Exact Match:</span>
                      <span className="text-white font-bold">Rank #1 (BM25 Score: 4.82)</span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-950/40 to-cyan-950/40 border border-purple-500/30 text-xs font-mono text-slate-300">
                  <span className="text-cyan-400 font-bold block mb-1">💡 RRF FORMULA:</span>
                  <code>RRF_Score = Σ (1 / (k + rank_i)), k=60</code>
                </div>
              </div>

              {/* Right Column: Fused Results */}
              <div className="lg:col-span-7 space-y-4">
                <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
                  <span>GROUNDED CONTEXT RETRIEVED (TOP FUSED CHUNKS)</span>
                  <span className="text-emerald-400 flex items-center gap-1 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> High Relevance
                  </span>
                </div>

                {currentRAGData.chunks.map((chunk, idx) => (
                  <motion.div
                    key={chunk.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-4 rounded-2xl bg-slate-900/80 border border-purple-500/30 font-mono text-xs space-y-2 relative"
                  >
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="font-bold text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-400" />
                        {chunk.source}
                      </span>
                      <div className="flex items-center gap-3 text-[10px]">
                        <span className="text-cyan-300">Cosine: {chunk.vectorScore}</span>
                        <span className="text-purple-300">BM25: #{chunk.bm25Rank}</span>
                        <span className="text-emerald-300 font-bold">RRF: {chunk.rrfScore}</span>
                      </div>
                    </div>
                    <p className="text-slate-300 font-sans text-xs leading-relaxed">
                      "{chunk.text}"
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ==================================================== */}
        {/* TAB 3: AIAA RECRUITER ATS MATCH ENGINE               */}
        {/* ==================================================== */}
        {activeTab === 'ats' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl glass-card p-6 sm:p-8 border border-emerald-500/30 shadow-2xl relative overflow-hidden"
          >
            {/* Header */}
            <div className="pb-5 mb-5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold">
                    AIAA Intelligent Agent
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Semantic Candidate-Job Scorer</span>
                </div>
                <h3 className="text-xl font-bold text-white">Role Compatibility & ATS Match Analysis</h3>
              </div>

              {/* Preset Selector */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {presetRoles.map((role) => (
                  <button
                    key={role.title}
                    onClick={() => handleSelectRole(role)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                      jobTitle === role.title
                        ? 'bg-emerald-600 text-white font-bold shadow-md'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {role.title.split('(')[0].trim()}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Matcher Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Score Gauge Circle */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
                <div className="relative w-36 h-36 flex items-center justify-center mb-3">
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      cx="72"
                      cy="72"
                      r="60"
                      stroke="rgba(255, 255, 255, 0.08)"
                      strokeWidth="10"
                      fill="transparent"
                    />
                    <motion.circle
                      cx="72"
                      cy="72"
                      r="60"
                      stroke="#10b981"
                      strokeWidth="10"
                      strokeDasharray={377}
                      strokeDashoffset={377 - (377 * matchResult.score) / 100}
                      strokeLinecap="round"
                      fill="transparent"
                      initial={{ strokeDashoffset: 377 }}
                      animate={{ strokeDashoffset: 377 - (377 * matchResult.score) / 100 }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-3xl font-extrabold text-white font-mono">
                      {isScanning ? '...' : `${matchResult.score}%`}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
                      ATS MATCH
                    </span>
                  </div>
                </div>

                <div className="font-mono text-xs font-bold text-emerald-300 mb-1">
                  {matchResult.fitLevel}
                </div>
                <p className="text-[11px] text-slate-400">Evaluated against Muhammad Uzair's Verified Profile</p>
              </div>

              {/* Matched Competencies & Analysis */}
              <div className="lg:col-span-8 space-y-5">
                <div>
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Verified Core Competencies Found in Profile</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {matchResult.matchedSkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans">
                  <strong className="text-white block mb-1 font-mono text-[11px] uppercase tracking-wider text-cyan-400">
                    AIAA Synthesis & Fit Summary:
                  </strong>
                  {matchResult.analysis}
                </div>

                {/* Direct Action */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${personalInfo.email}?subject=Interview%20Invitation%20for%20${encodeURIComponent(jobTitle)}`}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-2 hover:opacity-95 transition-opacity"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Schedule Interview with Uzair</span>
                  </a>

                  <a
                    href="https://wa.me/923201985059?text=Hi%20Uzair,%20we%20reviewed%20your%20portfolio%20and%20would%20like%20to%20discuss%20an%20opportunity!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-mono text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <span>Instant WhatsApp</span>
                    <ArrowRight className="w-3 h-3 text-cyan-400" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
