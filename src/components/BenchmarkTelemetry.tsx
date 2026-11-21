import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Cpu, 
  Zap, 
  Server, 
  Clock, 
  CheckCircle, 
  Sliders, 
  Layers, 
  ArrowUpRight
} from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface PipelineStep {
  name: string;
  duration: number; // in ms
  framework: string;
  detail: string;
  color: string;
}

interface BenchmarkSuite {
  id: string;
  title: string;
  subtitle: string;
  totalLatency: string;
  throughput: string;
  accuracyMetric: string;
  hardware: string;
  steps: PipelineStep[];
  evalMetrics: { label: string; value: string; benchmark: string; framework?: string }[];
}

export const BenchmarkTelemetry: React.FC = () => {
  const [activePipeline, setActivePipeline] = useState<'cctv' | 'rag' | 'telephony'>('cctv');
  
  // Interactive Calculator State
  const [dailyQueries, setDailyQueries] = useState<number>(25000);
  const [avgTokens, setAvgTokens] = useState<number>(1200);

  const pipelines: Record<'cctv' | 'rag' | 'telephony', BenchmarkSuite> = {
    cctv: {
      id: 'cctv',
      title: 'Real-Time CCTV Video Analytics Pipeline',
      subtitle: 'D-FINE-N Detection + ByteTrack Multi-Object Association + ArcFace Biometrics',
      totalLatency: '31.5 ms',
      throughput: '32 FPS / Stream',
      accuracyMetric: '91.8% MOTA',
      hardware: 'NVIDIA RTX 4090 (TensorRT FP16)',
      steps: [
        { name: 'RTSP Decode & Letterbox Resize', duration: 2.1, framework: 'OpenCV / CUDA', detail: '1080p frame to 640x640 normalized tensor', color: 'from-blue-500 to-cyan-500' },
        { name: 'D-FINE-N Person Detection', duration: 15.8, framework: 'TensorRT FP16', detail: 'Bounding boxes, class probabilities & confidence thresholding', color: 'from-cyan-500 to-teal-400' },
        { name: 'ByteTrack Kalman & IoU Association', duration: 4.6, framework: 'C++ / Cython', detail: 'Dual-threshold matching prevents trajectory fragmentation', color: 'from-teal-400 to-emerald-400' },
        { name: 'ArcFace 512D Feature Extraction', duration: 8.2, framework: 'ONNX Runtime', detail: 'L2-normalized facial embeddings with MiniFASNet liveness', color: 'from-purple-500 to-indigo-500' },
        { name: 'Spatial Polygon Tripwire Rules', duration: 0.8, framework: 'Shapely / NumPy', detail: 'Restricted zone intrusion & loitering trigger verification', color: 'from-amber-400 to-orange-500' },
      ],
      evalMetrics: [
        { label: 'MOTA (Tracking Accuracy)', value: '91.8%', benchmark: 'ClearMOT Standard' },
        { label: 'IDF1 (Identity Consistency)', value: '84.6%', benchmark: 'MOT17 Benchmark' },
        { label: 'Face Verification FAR@0.001', value: '99.4%', benchmark: 'LFW / ArcFace Benchmark' },
        { label: 'Anti-Spoofing FPR', value: '< 0.8%', benchmark: 'MiniFASNet Liveness Test' },
      ],
    },
    rag: {
      id: 'rag',
      title: 'Enterprise Hybrid RAG Architecture (DocMind AI)',
      subtitle: 'pgvector Dense Cosine Search + PostgreSQL tsvector BM25 + Reciprocal Rank Fusion',
      totalLatency: '124.8 ms',
      throughput: '140 Req / min',
      accuracyMetric: '94.2% Context Precision',
      hardware: 'PostgreSQL 16 + pgvector (HNSW) / FastAPI',
      steps: [
        { name: 'Query Embedding Generation', duration: 14.2, framework: 'BGE-Small / ONNX', detail: '384-dimensional dense semantic query vector', color: 'from-cyan-500 to-blue-500' },
        { name: 'pgvector HNSW Cosine Search', duration: 38.6, framework: 'pgvector (m=16, ef=64)', detail: 'Top-50 semantic nearest neighbor vector retrieval', color: 'from-blue-500 to-indigo-500' },
        { name: 'PostgreSQL tsvector BM25 Search', duration: 16.4, framework: 'PostgreSQL Full-Text', detail: 'Top-50 exact lexical keyword and acronym match', color: 'from-indigo-500 to-purple-500' },
        { name: 'Reciprocal Rank Fusion (RRF)', duration: 1.6, framework: 'Python / NumPy', detail: 'Harmonic rank merge: RRF(d) = Σ 1/(60 + r_m(d))', color: 'from-purple-500 to-fuchsia-500' },
        { name: 'Cross-Encoder Re-Ranking', duration: 54.0, framework: 'BGE-Reranker-Base', detail: 'Deep contextual relevance scoring for final Top-5 chunks', color: 'from-emerald-400 to-teal-400' },
      ],
      evalMetrics: [
        { label: 'RAGAS Context Precision', value: '94.2%', benchmark: 'Golden QA Evaluation Set' },
        { label: 'RAGAS Faithfulness', value: '95.8%', benchmark: 'Hallucination Suppression' },
        { label: 'Answer Semantic Relevance', value: '92.6%', benchmark: 'Cosine vs Ground Truth' },
        { label: 'P95 Retrieval Latency', value: '125 ms', benchmark: 'Production pgvector Index' },
      ],
    },
    telephony: {
      id: 'telephony',
      title: 'Interruption-Aware Real-Time AI Telephony Gateway',
      subtitle: 'WebSocket Audio Streaming + Whisper STT + Groq LLM + Streaming TTS',
      totalLatency: '< 295 ms',
      throughput: '50 Concurrent Calls',
      accuracyMetric: 'Zero Voice Overlap',
      hardware: 'FastAPI WebSockets + Groq LPU + Edge Voice Gateway',
      steps: [
        { name: 'WebSocket Audio Chunk Ingestion', duration: 40.0, framework: 'WebSockets / AsyncIO', detail: '16kHz PCM audio buffered in 40ms sliding frames', color: 'from-sky-500 to-blue-500' },
        { name: 'Streaming Speech-to-Text', duration: 125.0, framework: 'Whisper V3 Turbo', detail: 'Streaming tokenization with voice-activity detection (VAD)', color: 'from-blue-500 to-cyan-400' },
        { name: 'First-Token Latency (TTFT)', duration: 58.0, framework: 'Groq LPU (GPT-OSS-20B)', detail: 'Fast response token generation with agentic tool routing', color: 'from-cyan-400 to-teal-400' },
        { name: 'Streaming TTS Audio Frame 1', duration: 72.0, framework: 'Kokoro / ElevenLabs', detail: 'First synthesized audio packet transmitted back to caller', color: 'from-teal-400 to-emerald-400' },
      ],
      evalMetrics: [
        { label: 'Voice-to-Voice Turnaround', value: '< 295 ms', benchmark: 'Human Conversation Threshold' },
        { label: 'Interruption Cancel Latency', value: '< 15 ms', framework: 'AsyncIO Task Cancellation', benchmark: 'Zero Echo Artifacts' },
        { label: 'Tool Dispatch Latency', value: '62 ms', benchmark: 'Database / API Lookup' },
        { label: 'Call Stream Uptime', value: '99.95%', benchmark: 'Fault-Tolerant WebSockets' },
      ],
    },
  };

  const current = pipelines[activePipeline];

  // Economic calculations
  const totalTokensPerDay = dailyQueries * avgTokens;
  const millionTokensPerMonth = (totalTokensPerDay * 30) / 1_000_000;
  
  // Costs
  const frontierCost = (millionTokensPerMonth * 7.5).toFixed(0); // ~$7.50/M tokens blended
  const groqCost = (millionTokensPerMonth * 0.40).toFixed(0); // ~$0.40/M tokens
  const selfHostedCost = 450; // ~$450/month amortized dual RTX 4090 node on cloud (Lambda/RunPod)
  const monthlySavingsVsFrontier = Math.max(0, Number(frontierCost) - Number(groqCost));

  return (
    <section id="telemetry" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-4">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          Production Engineering Benchmarks & Latency Matrix
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
          Verified <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">System Telemetry</span>
        </h2>
        <p className="text-slate-400 max-w-3xl mx-auto text-base sm:text-lg">
          In high-performance AI systems, architecture is measured in millisecond latencies, GPU cache efficiency, and context precision. Here is the verified empirical data from Uzair's production implementations.
        </p>

        {/* Pipeline Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          {[
            { id: 'cctv', label: 'CCTV Vision Tracker (31.5ms)', icon: Cpu },
            { id: 'rag', label: 'Hybrid RAG pgvector (125ms)', icon: Layers },
            { id: 'telephony', label: 'AI Telephony Gateway (<295ms)', icon: Zap },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activePipeline === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundEffects.playScan(450, 950, 0.08);
                  setActivePipeline(tab.id as any);
                }}
                className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-teal-500/10 border-cyan-400/60 text-cyan-300 shadow-lg shadow-cyan-950/50'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400 animate-spin-slow' : 'text-slate-500'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Benchmark Card */}
      <div className="bg-[#080d1a]/90 border border-cyan-500/20 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden mb-12">
        {/* Top KPI Header */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800 mb-8">
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              P95 Latency
            </div>
            <div className="text-xl sm:text-2xl font-black text-cyan-300 mt-1">
              {current.totalLatency}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-teal-400" />
              Throughput
            </div>
            <div className="text-xl sm:text-2xl font-black text-teal-300 mt-1">
              {current.throughput}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-indigo-400" />
              Accuracy / Eval
            </div>
            <div className="text-xl sm:text-2xl font-black text-indigo-300 mt-1">
              {current.accuracyMetric}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-amber-400" />
              Hardware / Stack
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-1 truncate">
              {current.hardware}
            </div>
          </div>
        </div>

        {/* Latency Pipeline Breakdown (Gantt-style) */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              Execution Trace & Pipeline Latency Breakdown
            </h3>
            <span className="text-xs font-mono text-slate-400">
              Total End-to-End: <strong className="text-cyan-300">{current.totalLatency}</strong>
            </span>
          </div>

          <div className="space-y-3">
            {current.steps.map((step, idx) => {
              const maxVal = activePipeline === 'telephony' ? 140 : 60;
              const percent = Math.min(100, Math.max(12, (step.duration / maxVal) * 100));

              return (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-[10px] font-mono font-bold text-cyan-400 flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-slate-200">
                        {step.name}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                        {step.framework}
                      </span>
                    </div>
                    <div className="text-xs font-mono font-bold text-cyan-300 sm:text-right">
                      {step.duration.toFixed(1)} ms
                    </div>
                  </div>

                  {/* Latency Bar */}
                  <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden mb-1.5 border border-slate-800">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percent}%` }}
                      transition={{ duration: 0.6, delay: idx * 0.08 }}
                      className={`h-full bg-gradient-to-r ${step.color}`}
                    />
                  </div>

                  <p className="text-[11px] text-slate-400">
                    {step.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Evaluation Metrics Cards */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-teal-400" />
            Rigorous Benchmark & Evaluation Harness Results
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {current.evalMetrics.map((evalItem, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-[11px] text-slate-400 font-medium">
                  {evalItem.label}
                </div>
                <div className="text-xl font-black text-slate-100 my-1 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-200">
                  {evalItem.value}
                </div>
                <div className="text-[10px] font-mono text-slate-500">
                  {evalItem.benchmark}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Token & Inference Economics Calculator */}
      <div className="bg-gradient-to-b from-[#0a0f24] to-[#060a17] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-teal-500/10 border border-teal-500/30 text-teal-400 text-[10px] font-mono uppercase tracking-widest mb-2">
              <Sliders className="w-3 h-3" />
              MLOps System Economics & ROI Calculator
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Enterprise LLM Inference Architecture & Cost Tradeoffs
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              How Uzair evaluates model serving cost vs latency: Groq LPU vs Frontier API vs Self-Hosted vLLM.
            </p>
          </div>
          <div className="text-right shrink-0">
            <span className="text-[11px] font-mono text-slate-400 block">Est. Monthly Token Volume</span>
            <span className="text-lg sm:text-xl font-mono font-bold text-cyan-300">
              {millionTokensPerMonth.toFixed(1)} Million Tokens / mo
            </span>
          </div>
        </div>

        {/* Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
              <span>Daily Active Queries</span>
              <span className="font-mono text-cyan-300">{dailyQueries.toLocaleString()} requests/day</span>
            </div>
            <input
              type="range"
              min="2000"
              max="100000"
              step="2000"
              value={dailyQueries}
              onChange={(e) => {
                soundEffects.playBlip(550, 0.02, 0.015);
                setDailyQueries(Number(e.target.value));
              }}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
              <span>2K req/day (Startup)</span>
              <span>50K req/day</span>
              <span>100K req/day (Enterprise)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
              <span>Average Context Size per Query</span>
              <span className="font-mono text-cyan-300">{avgTokens.toLocaleString()} tokens</span>
            </div>
            <input
              type="range"
              min="400"
              max="6000"
              step="200"
              value={avgTokens}
              onChange={(e) => {
                soundEffects.playBlip(650, 0.02, 0.015);
                setAvgTokens(Number(e.target.value));
              }}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
              <span>400 tokens (Short Q&A)</span>
              <span>2,500 tokens (RAG Chunks)</span>
              <span>6,000 tokens (Full Docs)</span>
            </div>
          </div>
        </div>

        {/* Comparison Tier Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Frontier API */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
              Frontier Closed API
            </div>
            <div className="text-sm font-bold text-slate-200">
              GPT-4o / Claude 3.5
            </div>
            <div className="my-3">
              <span className="text-2xl font-black text-rose-400">${Number(frontierCost).toLocaleString()}</span>
              <span className="text-xs text-slate-400"> / month</span>
            </div>
            <ul className="text-[11px] text-slate-400 space-y-1">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Latency: 750ms – 1,400ms TTFT
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                Variable rate limits & latency spikes
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                External data egress & cloud dependency
              </li>
            </ul>
          </div>

          {/* Groq LPU (Uzair's Choice for Real-Time) */}
          <div className="p-4 rounded-xl bg-gradient-to-b from-cyan-950/40 to-slate-900 border border-cyan-400/50 shadow-lg relative">
            <span className="absolute -top-2.5 right-3 text-[9px] font-mono px-2 py-0.5 rounded-full bg-cyan-400 text-slate-950 font-bold uppercase tracking-wider">
              Uzair's Real-Time Architecture
            </span>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
              High-Speed LPU Inference
            </div>
            <div className="text-sm font-bold text-white">
              Groq LPU (OSS-20B / Qwen)
            </div>
            <div className="my-3">
              <span className="text-2xl font-black text-cyan-300">${Number(groqCost).toLocaleString()}</span>
              <span className="text-xs text-slate-400"> / month</span>
            </div>
            <ul className="text-[11px] text-cyan-200/80 space-y-1">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Latency: <strong>55ms – 85ms TTFT (Sub-second)</strong>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <strong>${Number(monthlySavingsVsFrontier).toLocaleString()}/mo</strong> savings vs frontier
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                Native audio telephony streaming support
              </li>
            </ul>
          </div>

          {/* Self-Hosted vLLM */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
              Self-Hosted GPU Cluster
            </div>
            <div className="text-sm font-bold text-slate-200">
              vLLM / TensorRT-LLM (RTX 4090)
            </div>
            <div className="my-3">
              <span className="text-2xl font-black text-emerald-400">${selfHostedCost}</span>
              <span className="text-xs text-slate-400"> / month fixed</span>
            </div>
            <ul className="text-[11px] text-slate-400 space-y-1">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Zero data egress (100% on-premise privacy)
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Continuous batching via vLLM PagedAttention
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                Fixed predictable monthly infrastructure cost
              </li>
            </ul>
          </div>
        </div>

        {/* Footnote */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-800/80">
          <span>
            💡 <em>"At VeevoTech, architecting for low latency isn't just UX—it reduced inference cloud overhead by 82%."</em> — Uzair
          </span>
          <button
            onClick={() => {
              const element = document.getElementById('contact');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="mt-2 sm:mt-0 inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold"
          >
            Discuss Infrastructure Requirements <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
