import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  ChevronRight, 
  Clock, 
  X, 
  CheckCircle2, 
  Code2, 
  Cpu, 
  Database, 
  Zap, 
  Smartphone
} from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface ResearchNote {
  id: string;
  title: string;
  subtitle: string;
  category: 'Computer Vision' | 'LLMs & RAG' | 'Real-Time Voice' | 'Edge Deployment';
  readTime: string;
  date: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  abstract: string;
  problem: string;
  architectureBreakdown: string[];
  mathematicalFormulation?: string;
  productionImpact: string[];
  takeaways: string;
}

export const ResearchNotes: React.FC = () => {
  const [selectedNote, setSelectedNote] = useState<ResearchNote | null>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedNote(null);
      }
    };
    if (selectedNote) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedNote]);

  const notes: ResearchNote[] = [
    {
      id: 'bytetrack-cctv',
      title: 'Why ByteTrack Beats DeepSORT on Occluded CCTV Surveillance',
      subtitle: 'Dual-Threshold Kalman Filtering & Trajectory Preservation in Real-Time Video',
      category: 'Computer Vision',
      readTime: '4 min read',
      date: '2026',
      icon: Cpu,
      accentColor: 'from-cyan-500 to-teal-400',
      abstract: 'Traditional multi-object tracking (MOT) systems like DeepSORT frequently fragment tracks and swap identities when pedestrians walk behind obstacles, pass under dark awnings, or cross paths. Here is how ByteTrack solves this in enterprise CCTV deployments.',
      problem: 'In standard SORT algorithms, detections below a confidence threshold (e.g., conf < 0.5) are discarded outright to prevent false positives. However, during occlusion or motion blur, valid bounding boxes temporarily drop in confidence to 0.2–0.4. Discarding them causes track terminations, followed by re-initialization with a new ID when the person emerges.',
      architectureBreakdown: [
        'High-Throughput D-FINE-N detector yields bounding boxes with confidences and class logits.',
        'Stage 1 Association: High-confidence detections (conf > 0.6) are matched with existing Kalman-predicted tracklets using Hungarian bipartite matching on IoU distance.',
        'Stage 2 Association: Unmatched tracklets are then matched against low-confidence detections (0.2 < conf < 0.6), recovering occluded persons without generating false tracks.',
        'ArcFace 512D Embeddings: Periodically extracted only on high-quality unobstructed crops to maintain gallery consistency.',
      ],
      mathematicalFormulation: 'Cost_{IoU}(T_i, D_j) = 1 - \\frac{Area(T_i \\cap D_j)}{Area(T_i \\cup D_j)}, \\quad \\text{where } D_{low} = \\{d_k \\mid 0.2 \\le \\text{score}(d_k) < 0.6\\}',
      productionImpact: [
        'Reduced trajectory ID switches by 78% on low-resolution enterprise cameras.',
        'Maintained 31.5 ms end-to-end frame processing (32 FPS) on TensorRT FP16.',
        'Virtually zero false positives in restricted zone intrusion triggers.',
      ],
      takeaways: 'Never discard low-confidence detections in surveillance video: they hold the missing link between pre-occlusion and post-occlusion trajectories.',
    },
    {
      id: 'hybrid-rag-rrf',
      title: 'Dense Vectors Aren\'t Enough: Production Hybrid RAG with Reciprocal Rank Fusion',
      subtitle: 'Combining pgvector HNSW Cosine Similarity with PostgreSQL tsvector BM25',
      category: 'LLMs & RAG',
      readTime: '5 min read',
      date: '2026',
      icon: Database,
      accentColor: 'from-blue-500 to-indigo-500',
      abstract: 'Dense embeddings excel at grasping abstract conceptual meaning, but fail notoriously on exact part numbers, contract IDs, and rare domain terminology. This note breaks down the production hybrid search architecture behind DocMind AI.',
      problem: 'Embedding models (e.g. OpenAI text-embedding-3 or BGE) compress thousands of lexical dimensions into a 384D or 1536D continuous space. Words with high precision requirements (e.g. "Model 82-B-v2") get blurred with "Model 82-A-v1". A pure vector search frequently ranks completely irrelevant documents high simply because the tone is similar.',
      architectureBreakdown: [
        'PostgreSQL Dual-Index Schema: Each document chunk stores a vector(384) with HNSW index (m=16, ef_construction=64) alongside a tsvector GIN index.',
        'Parallel Retrieval: Executes dense cosine distance and sparse ts_rank BM25 in a single database round-trip, returning top-50 from each engine.',
        'Reciprocal Rank Fusion (RRF): Blends ranks without requiring score normalization across fundamentally different score distributions.',
        'Cross-Encoder Re-Ranking: Top 15 fused candidates pass through BGE-Reranker-Base to produce the final top-5 context for the LLM prompt.',
      ],
      mathematicalFormulation: 'RRF\\_Score(d) = \\sum_{m \\in \\{dense, sparse\\}} \\frac{1}{k + r_m(d)}, \\quad \\text{with smoothing constant } k = 60',
      productionImpact: [
        'RAGAS Context Precision climbed from 71.2% (pure dense) to 94.2% (hybrid RRF).',
        'Database query latency: 54ms total for combined HNSW + GIN lookup.',
        'Zero hallucinated technical specifications on internal enterprise documents.',
      ],
      takeaways: 'Hybrid search with Reciprocal Rank Fusion is the single highest-ROI improvement any RAG pipeline can make—far outpacing prompt tweaks.',
    },
    {
      id: 'voice-telephony',
      title: 'Engineering Zero-Lag Interruption-Aware Real-Time Voice Agents',
      subtitle: 'Streaming Audio Buffering, Voice-Activity Detection, and Sub-300ms Turnaround',
      category: 'Real-Time Voice',
      readTime: '4 min read',
      date: '2026',
      icon: Zap,
      accentColor: 'from-teal-400 to-emerald-400',
      abstract: 'Traditional voice bots feel robotic because of turn-taking latency (>1.5s) and the inability to stop speaking when the human interrupts. Here is how Uzair engineered VeevoTech\'s interruption-aware AI telephony wrapper.',
      problem: 'Batching audio into complete sentences before calling an LLM introduces unacceptable pauses. Furthermore, if the bot is in the middle of synthesizing a 5-second sentence and the user says "Wait, that\'s wrong", traditional systems keep talking over the user, destroying the conversational illusion.',
      architectureBreakdown: [
        'Full-Duplex WebSockets: 16kHz PCM audio streamed over WebSockets in 40ms frame chunks.',
        'Client-Side & Server-Side VAD: Energy-based speech activity detection identifies the exact millisecond the user starts speaking.',
        'AsyncIO Cancellation Token: When user interruption is detected, the server immediately sends a CANCEL packet to the audio player and aborts in-flight LLM/TTS generation tasks within <15ms.',
        'Groq LPU Acceleration: First-token latency of ~58ms allows streaming LLM response tokens directly into a chunked streaming TTS engine.',
      ],
      mathematicalFormulation: 'Latency_{V2V} = \\tau_{VAD} + \\tau_{STT\\_stream} + \\tau_{LLM\\_TTFT} + \\tau_{TTS\\_chunk1} < 295\\text{ ms}',
      productionImpact: [
        'Total voice-to-voice latency lowered to <295ms (approaching natural human 200ms cadence).',
        'Zero speech overlap collisions during interruptions.',
        'Seamless integration with enterprise PBX telephony protocols.',
      ],
      takeaways: 'Real-time voice is not an LLM problem—it is a streaming systems architecture problem. Cancellation tokens must have higher priority than token generation.',
    },
    {
      id: 'flutter-edge-ai',
      title: 'Compiling Deep Learning to Cross-Platform Flutter Edge Clients',
      subtitle: 'Dart FFI, On-Device ONNX Runtime, and 60 FPS Camera Pipeline Integration',
      category: 'Edge Deployment',
      readTime: '3 min read',
      date: '2026',
      icon: Smartphone,
      accentColor: 'from-purple-500 to-pink-500',
      abstract: 'Why Uzair treats Flutter as a core AI superpower: delivering computer vision and LLM intelligence to iOS, Android, and Windows from a single unified codebase.',
      problem: 'Enterprise clients want AI features in native mobile and desktop apps. Building native vision pipelines in Swift for iOS and Kotlin/C++ for Android doubles development overhead and creates synchronization lag between platform updates.',
      architectureBreakdown: [
        'Flutter Camera Controller: Configured for raw NV21 / YUV420_888 frame streaming at 30 FPS.',
        'Dart FFI (Foreign Function Interface): Bypasses standard platform channels to pass raw memory pointers directly to C++ ONNX Runtime without serialized memory copies.',
        'Quantized Edge Models: YOLOv8-Nano and MobileNetV3 quantized to INT8 with zero perceptual accuracy degradation.',
        'Riverpod State Management: Offloads inference processing to background Dart isolates, keeping the Flutter UI thread at a silky 60 FPS.',
      ],
      productionImpact: [
        'Single codebase deploying across iOS, Android, Windows, and Web.',
        'Sub-40ms on-device inference without needing an active internet connection.',
        'Zero UI frame drops or thermal throttling on consumer devices.',
      ],
      takeaways: 'An AI model that only lives in a Python notebook is a prototype. Wrapping it in Flutter with FFI transforms it into a production consumer product.',
    },
  ];

  return (
    <section id="research" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-4">
          <BookOpen className="w-3.5 h-3.5" />
          R&D Notes & Technical Architecture Deep Dives
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
          Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">Case Studies</span>
        </h2>
        <p className="text-slate-400 max-w-3xl mx-auto text-base sm:text-lg">
          Deep architectural breakdowns detailing real-world engineering decisions, mathematical formulations, and production trade-offs from Uzair's systems.
        </p>
      </div>

      {/* Grid of Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {notes.map((note) => {
          const Icon = note.icon;
          return (
            <motion.div
              key={note.id}
              whileHover={{ y: -4 }}
              onClick={() => {
                soundEffects.playScan(500, 1000, 0.08);
                setSelectedNote(note);
              }}
              className="group cursor-pointer p-6 sm:p-7 rounded-2xl bg-[#080d1a]/80 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 shadow-xl hover:shadow-cyan-950/40 backdrop-blur-xl relative flex flex-col justify-between"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono font-semibold text-cyan-300 uppercase tracking-wider">
                      {note.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{note.readTime}</span>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2 leading-snug">
                  {note.title}
                </h3>
                <p className="text-xs font-mono text-slate-400 mb-4">
                  {note.subtitle}
                </p>
                <p className="text-sm text-slate-300 line-clamp-3 leading-relaxed mb-6">
                  {note.abstract}
                </p>
              </div>

              {/* Card Footer CTA */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:text-cyan-300">
                <span>Read Architecture Deep-Dive</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {selectedNote && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNote(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-[#090e1f] border border-cyan-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto text-slate-200"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedNote(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 uppercase tracking-wider font-semibold">
                  {selectedNote.category}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  {selectedNote.readTime} • {selectedNote.date}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 leading-tight">
                {selectedNote.title}
              </h2>
              <p className="text-sm font-mono text-slate-400 mb-6">
                {selectedNote.subtitle}
              </p>

              {/* The Engineering Challenge */}
              <div className="mb-6 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-rose-400 mb-2 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  The Production Challenge
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedNote.problem}
                </p>
              </div>

              {/* Architecture & Implementation */}
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-cyan-400 mb-3 flex items-center gap-1.5">
                  <Code2 className="w-4 h-4" />
                  Technical Architecture & Solution
                </h4>
                <ul className="space-y-2.5">
                  {selectedNote.architectureBreakdown.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/30 text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mathematical Formulation (if any) */}
              {selectedNote.mathematicalFormulation && (
                <div className="mb-6 p-4 rounded-xl bg-slate-950/80 border border-cyan-500/20">
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Mathematical Formulation:
                  </h4>
                  <div className="font-mono text-xs text-cyan-300 overflow-x-auto py-1">
                    <code>{selectedNote.mathematicalFormulation}</code>
                  </div>
                </div>
              )}

              {/* Production Impact */}
              <div className="mb-6 p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-emerald-400 mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Verified Production Impact
                </h4>
                <ul className="space-y-1.5 text-xs text-emerald-200/90">
                  {selectedNote.productionImpact.map((impact, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {impact}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Core Takeaway */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 italic">
                <strong className="text-cyan-400 font-normal uppercase font-mono not-italic block mb-1">
                  Core Engineering Takeaway:
                </strong>
                "{selectedNote.takeaways}"
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
