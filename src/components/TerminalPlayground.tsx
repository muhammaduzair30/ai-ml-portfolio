import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Sparkles, CornerDownLeft, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';

interface CommandOutput {
  id: string;
  command: string;
  response: React.ReactNode;
}

export const TerminalPlayground: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      id: 'init-1',
      command: 'uzair --version',
      response: (
        <div className="text-cyan-400 font-mono text-xs">
          uzair-ai-system v2.5.0-production [Python 3.11 / PyTorch / CUDA 12.2 / FastAPI / Flutter]
        </div>
      ),
    },
    {
      id: 'init-2',
      command: 'uzair.getSummary()',
      response: (
        <div className="text-slate-300 font-mono text-xs space-y-1">
          <p>⚡ <strong className="text-white">Role:</strong> AI/ML R&D Engineer @ VeevoTech</p>
          <p>🎯 <strong className="text-white">Focus:</strong> Central AI Platforms, Context-Aware RAG, Real-Time Audio Telephony & CCTV Video Tracking.</p>
          <p>🎓 <strong className="text-white">Education:</strong> BS Computer Science (CGPA 3.74/4.00, Passed with Distinction).</p>
          <p className="text-slate-400">Type <span className="text-cyan-400">help</span> to see all commands or click the shortcut chips below.</p>
        </div>
      ),
    },
  ]);

  const [copied, setCopied] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    let response: React.ReactNode;

    switch (trimmed) {
      case 'help':
        response = (
          <div className="text-xs font-mono space-y-1 text-slate-300">
            <p className="text-cyan-400 font-bold">AVAILABLE COMMANDS:</p>
            <p><span className="text-cyan-300">skills</span> - Display categorized technical capabilities</p>
            <p><span className="text-cyan-300">experience</span> - View production roles & achievements</p>
            <p><span className="text-cyan-300">architecture</span> - Print Central AI Platform & Video pipeline specs</p>
            <p><span className="text-cyan-300">edge</span> - Explore Flutter cross-platform & Edge AI integration</p>
            <p><span className="text-cyan-300">cv</span> - Download official curriculum vitae (PDF)</p>
            <p><span className="text-cyan-300">contact</span> - Retrieve contact coordinates</p>
            <p><span className="text-cyan-300">clear</span> - Clear terminal buffer</p>
          </div>
        );
        break;

      case 'skills':
        response = (
          <div className="text-xs font-mono space-y-1.5 text-slate-300">
            <p className="text-cyan-400 font-bold">CORE TECHNICAL ARSENAL:</p>
            <p>🧠 <span className="text-white font-semibold">LLMs & Agentic:</span> RAG, Context Eng, Memory Systems, LangGraph, LangChain, Hugging Face</p>
            <p>👁️ <span className="text-white font-semibold">Computer Vision:</span> D-FINE-N, ByteTrack, YOLOv8/v11, OpenCV, SCRFD, ArcFace, MiniFASNet</p>
            <p>⚡ <span className="text-white font-semibold">ML & Deep Learning:</span> PyTorch, TensorFlow, Scikit-learn, SentenceTransformers, FAISS</p>
            <p>🚀 <span className="text-white font-semibold">Backend & Vector:</span> FastAPI, PostgreSQL, pgvector, Pinecone, Supabase, WebSockets</p>
            <p>📱 <span className="text-white font-semibold">Cross-Platform / Edge:</span> Flutter, Dart, Riverpod, Provider, On-Device Inference Integration</p>
          </div>
        );
        break;

      case 'experience':
        response = (
          <div className="text-xs font-mono space-y-2 text-slate-300">
            <div>
              <p className="text-cyan-400 font-bold">1. AI/ML R&D ENGINEER | VeevoTech (June 2026 – Present)</p>
              <p className="text-slate-400 pl-3">• Central AI Platform (AI Wrapper): RAG, Memory, Agentic Workers & Telephony</p>
              <p className="text-slate-400 pl-3">• CCTV Video Analytics: D-FINE-N detection + ByteTrack tracking + Anti-spoofing</p>
            </div>
            <div>
              <p className="text-purple-400 font-bold">2. FLUTTER DEV INTERN & AI/ML CONTRIBUTOR | PHI Horizon (Oct 2025 – Apr 2026)</p>
              <p className="text-slate-400 pl-3">• Bridged Flutter mobile frontends to Python/FastAPI ML inference (CNN, YOLO)</p>
            </div>
          </div>
        );
        break;

      case 'architecture':
        response = (
          <div className="text-xs font-mono space-y-1 text-slate-300">
            <p className="text-cyan-400 font-bold">PRODUCTION PIPELINE TOPOLOGY:</p>
            <p className="text-slate-200">
              [Input Stream] ➔ [Audio/Video Decoder] ➔ [D-FINE-N / STT] ➔ [ByteTrack / Context Buffer] ➔ [Hybrid RRF RAG (pgvector + BM25)] ➔ [Agentic Worker] ➔ [Streaming Telephony / Zone Alert]
            </p>
            <p className="text-slate-400 text-[11px] mt-1">End-to-end average latency: Sub-100ms for streamed tokens, 25ms for video frame tracking.</p>
          </div>
        );
        break;

      case 'edge':
        response = (
          <div className="text-xs font-mono space-y-1 text-slate-300">
            <p className="text-emerald-400 font-bold">EDGE & CROSS-PLATFORM ADVANTAGE:</p>
            <p>• Bridges high-performance Python/FastAPI model backends with native Flutter frontends (iOS, Android, Windows Desktop).</p>
            <p>• Architectures: Riverpod reactive state management, clean architecture, offline-first local caching, and on-device camera ML feeds.</p>
          </div>
        );
        break;

      case 'cv':
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.5 },
        });
        window.open(personalInfo.cvUrl, '_blank');
        response = (
          <div className="text-xs font-mono text-emerald-400">
            ✓ Downloading Muhammad_Uzair_AI_ML_CV.pdf... Opening in new tab.
          </div>
        );
        break;

      case 'contact':
        response = (
          <div className="text-xs font-mono space-y-1 text-slate-300">
            <p>📧 Email: <a href={`mailto:${personalInfo.email}`} className="text-cyan-400 underline">{personalInfo.email}</a></p>
            <p>📞 Phone: <span className="text-white">{personalInfo.phone}</span></p>
            <p>🌐 LinkedIn: <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="text-cyan-400 underline">linkedin.com/in/muhammad-uzair22</a></p>
            <p>💻 GitHub: <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-cyan-400 underline">github.com/muhammaduzair30</a></p>
            <p>📍 Location: Peshawar, Pakistan</p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        response = (
          <div className="text-xs font-mono text-rose-400">
            Command not recognized: "{cmd}". Type <span className="text-white font-bold">help</span> to view available instructions.
          </div>
        );
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        command: cmd,
        response,
      },
    ]);
    setInput('');
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-3xl bg-[#070b14] border border-cyan-500/25 shadow-2xl shadow-cyan-950/40 overflow-hidden font-mono text-xs">
          {/* Terminal Window Chrome */}
          <div className="bg-[#0b1020] px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              <span className="ml-2 text-slate-400 text-xs font-semibold flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                uzair@ai-workstation: ~/inference-engine
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-cyan-400 px-2 py-0.5 rounded bg-white/5 border border-white/5 transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied Email' : 'Copy Email'}</span>
              </button>
            </div>
          </div>

          {/* Quick Command Chips */}
          <div className="px-4 py-2 bg-slate-900/60 border-b border-slate-800/80 flex flex-wrap items-center gap-1.5 text-[11px]">
            <span className="text-slate-500 mr-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-cyan-400" /> Run:
            </span>
            {['skills', 'experience', 'architecture', 'edge', 'cv', 'contact', 'clear'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleCommand(cmd)}
                className="px-2 py-0.5 rounded-md bg-slate-800/80 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-slate-700/80 hover:border-cyan-500/40 transition-colors"
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Terminal Body */}
          <div className="p-5 max-h-80 sm:max-h-96 overflow-y-auto space-y-4">
            {history.map((item) => (
              <div key={item.id} className="space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-400">
                  <span className="text-emerald-400">guest@uzair-portfolio:~$</span>
                  <span className="text-white font-bold">{item.command}</span>
                </div>
                <div className="pl-4 border-l border-slate-800">{item.response}</div>
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Terminal Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCommand(input);
            }}
            className="p-3 bg-[#0a0f1e] border-t border-slate-800 flex items-center gap-2"
          >
            <span className="text-emerald-400 pl-2">guest@uzair-portfolio:~$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type 'help' or any command..."
              className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder-slate-600"
            />
            <button
              type="submit"
              className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors"
              aria-label="Submit command"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
