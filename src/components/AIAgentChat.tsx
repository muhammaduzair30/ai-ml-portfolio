import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  X, 
  Send, 
  RotateCcw, 
  Phone, 
  Mail, 
  FileText, 
  ArrowRight, 
  ExternalLink, 
  Sparkles,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';
import { 
  streamGroqChat, 
  sendEmailDirectly 
} from '../services/groqService';
import type { ChatMessage, AgentAction } from '../services/groqService';
import { AIAvatar } from './AIAvatar';

export const AIAgentChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: `Hello! I'm **Uzair.ai**, the personal AI digital twin of **Muhammad Uzair** (AI/ML R&D Engineer at VeevoTech).\n\nAsk me anything about his **Central AI Platform**, **CCTV Video Analytics (D-FINE-N + ByteTrack)**, **RAG workflows**, or **Flutter edge deployments**.\n\nYou can also have me **send an email directly to Uzair** right from this chat, or connect with him on **WhatsApp**!`,
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMessageId = Date.now().toString();
    const newMessages: ChatMessage[] = [
      ...messages,
      { id: userMessageId, role: 'user', content: text, timestamp: Date.now() },
    ];

    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    const assistantMessageId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      { id: assistantMessageId, role: 'assistant', content: '', timestamp: Date.now() },
    ]);

    await streamGroqChat({
      messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
      onChunk: (chunkText) => {
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantMessageId ? { ...m, content: chunkText } : m))
        );
      },
      onComplete: async (fullText, action) => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessageId
              ? { 
                  ...m, 
                  content: fullText, 
                  action: action || null,
                  emailStatus: action?.type === 'DISPATCH_EMAIL' ? 'sending' : undefined 
                }
              : m
          )
        );
        setIsLoading(false);

        // Auto execute actions
        if (action?.type === 'DISPATCH_EMAIL') {
          const success = await sendEmailDirectly(action.payload);
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMessageId
                ? { ...m, emailStatus: success ? 'sent' : 'error' }
                : m
            )
          );
          if (success) {
            confetti({
              particleCount: 55,
              spread: 65,
              origin: { y: 0.6 },
              colors: ['#00f2fe', '#8b5cf6', '#10b981'],
            });
          }
        } else if (action?.type === 'DOWNLOAD_CV') {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 },
          });
        } else if (action?.type === 'NAVIGATE') {
          const sectionEl = document.getElementById(action.payload.section);
          sectionEl?.scrollIntoView({ behavior: 'smooth' });
        }
      },
      onError: (err) => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessageId
              ? {
                  ...m,
                  content: `⚠️ Failed to get a response: ${err}\n\nPlease try asking again or feel free to message Uzair directly via WhatsApp!`,
                }
              : m
          )
        );
        setIsLoading(false);
      },
    });
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        content: `Conversation reset. I'm ready to answer any questions about Muhammad Uzair's AI/ML architectures, experience, or help you send him a message!`,
        timestamp: Date.now(),
      },
    ]);
  };

  const executeAction = (action: AgentAction) => {
    switch (action.type) {
      case 'OPEN_WHATSAPP': {
        const encoded = encodeURIComponent(action.payload.message);
        window.open(`https://wa.me/923201985059?text=${encoded}`, '_blank');
        break;
      }
      case 'DISPATCH_EMAIL': {
        const p = action.payload;
        const mailto = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
          p.subject || 'Portfolio Inquiry'
        )}&body=${encodeURIComponent(
          `From: ${p.name || 'Visitor'} (${p.email || 'No email provided'})\n\n${p.message}`
        )}`;
        window.location.href = mailto;
        break;
      }
      case 'DOWNLOAD_CV': {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
        });
        const link = document.createElement('a');
        link.href = personalInfo.cvUrl;
        link.download = 'Muhammad_Uzair_AI_ML_CV.pdf';
        link.click();
        break;
      }
      case 'NAVIGATE': {
        const sec = document.getElementById(action.payload.section);
        sec?.scrollIntoView({ behavior: 'smooth' });
        break;
      }
    }
  };

  return (
    <>
      {/* Floating Launcher Button with Uzair's Real AI Avatar */}
      <div className="fixed bottom-6 right-6 z-40">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="relative flex items-center gap-3 pl-2.5 pr-4 py-2 rounded-full bg-[#0a1122]/90 hover:bg-[#0d162d] text-white font-medium text-xs shadow-2xl shadow-cyan-950/80 border border-cyan-500/40 hover:border-cyan-400 backdrop-blur-xl group transition-all duration-300"
              aria-label="Open Uzair.ai Digital Twin"
            >
              {/* Uzair's Real Stylized AI Avatar */}
              <AIAvatar size="sm" isSpeaking={false} />

              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5 font-bold tracking-wide text-white text-xs">
                  <span>Uzair.ai</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <span className="text-[10px] text-cyan-300/80 font-mono">Chat with Uzair's AI Twin</span>
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-[440px] h-[600px] max-h-[85vh] z-50 rounded-3xl bg-[#080d19]/95 backdrop-blur-2xl border border-cyan-500/30 shadow-2xl shadow-black/80 flex flex-col overflow-hidden font-sans"
          >
            {/* Header with Uzair's Real Stylized AI Avatar */}
            <div className="px-4 py-3 bg-gradient-to-r from-slate-900/95 via-[#0a1020]/95 to-purple-950/50 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AIAvatar size="md" isSpeaking={isLoading} />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-extrabold text-white leading-none">Uzair.ai</h3>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold">
                      Digital Twin
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Active // Ready to assist</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                  title="Reset Conversation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                  aria-label="Close Chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Prompt Chips */}
            <div className="px-3 py-2 bg-slate-900/60 border-b border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar text-[11px] font-mono">
              {[
                'Why Flutter in AI?',
                'Central AI Platform?',
                'CCTV Video Analytics?',
                'Send an Email to Uzair',
                'WhatsApp Chat',
                'Download CV',
              ].map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleSendMessage(chip)}
                  disabled={isLoading}
                  className="whitespace-nowrap px-3 py-1 rounded-full bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/5 hover:border-cyan-500/30 transition-colors disabled:opacity-50 shrink-0 font-medium"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Messages Stream with Full Clean Markdown Rendering (No Tables) */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
              {messages.map((msg) => {
                const isUser = msg.role === 'user';

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[90%] rounded-2xl p-3.5 leading-relaxed ${
                        isUser
                          ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-xs shadow-md shadow-cyan-950/40'
                          : 'bg-slate-900/90 border border-white/10 text-slate-200 rounded-bl-xs shadow-sm'
                      }`}
                    >
                      {/* Rich Markdown Formatting with Clean Typography */}
                      <div className="markdown-content text-slate-200 text-xs sm:text-[13px] leading-relaxed">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            h1: ({ children }) => (
                              <h1 className="text-sm font-bold text-white mb-2 pb-1 border-b border-white/10">{children}</h1>
                            ),
                            h2: ({ children }) => (
                              <h2 className="text-xs sm:text-sm font-bold text-cyan-300 mt-2.5 mb-1">{children}</h2>
                            ),
                            h3: ({ children }) => (
                              <h3 className="text-xs font-bold text-cyan-400 mt-2 mb-1">{children}</h3>
                            ),
                            p: ({ children }) => (
                              <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>
                            ),
                            strong: ({ children }) => (
                              <strong className="font-bold text-white">{children}</strong>
                            ),
                            ul: ({ children }) => (
                              <ul className="list-disc pl-4 space-y-1 my-2 text-slate-300">{children}</ul>
                            ),
                            ol: ({ children }) => (
                              <ol className="list-decimal pl-4 space-y-1 my-2 text-slate-300">{children}</ol>
                            ),
                            li: ({ children }) => (
                              <li className="leading-relaxed">{children}</li>
                            ),
                            code: ({ children }) => (
                              <code className="px-1.5 py-0.5 rounded bg-black/40 text-cyan-300 font-mono text-[11px] border border-white/5">
                                {children}
                              </code>
                            ),
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      </div>

                      {/* Interactive In-Chat Action Cards */}
                      {msg.action && (
                        <div className="mt-3.5 pt-3 border-t border-white/10">
                          {/* Direct Email Card with Automatic Live Dispatch */}
                          {msg.action.type === 'DISPATCH_EMAIL' && (
                            <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-200 space-y-2.5">
                              <div className="flex items-center justify-between text-[11px] font-mono">
                                <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                                  <Mail className="w-3.5 h-3.5" /> Direct Email Delivery
                                </span>
                                <span className="text-[10px] text-slate-400">To: {personalInfo.email}</span>
                              </div>

                              <div className="text-[11px] text-slate-300 bg-black/30 p-2.5 rounded-lg space-y-1 font-mono">
                                <div><strong className="text-white">From:</strong> {msg.action.payload.name} ({msg.action.payload.email})</div>
                                <div><strong className="text-white">Subject:</strong> {msg.action.payload.subject}</div>
                                <div className="text-slate-400 italic pt-1 border-t border-white/5">
                                  "{msg.action.payload.message}"
                                </div>
                              </div>

                              {/* Status indicator */}
                              {msg.emailStatus === 'sending' && (
                                <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono py-1">
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  <span>Dispatching email to Uzair's inbox...</span>
                                </div>
                              )}

                              {msg.emailStatus === 'sent' && (
                                <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                  <span>Email delivered directly to Muhammad Uzair! He will reply shortly.</span>
                                </div>
                              )}

                              {msg.emailStatus === 'error' && (
                                <div className="space-y-2">
                                  <div className="text-xs text-amber-300 font-mono">
                                    Click below to send via your mail client:
                                  </div>
                                  <button
                                    onClick={() => executeAction(msg.action!)}
                                    className="w-full py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                                  >
                                    <span>Open Email Client</span>
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              )}
                            </div>
                          )}

                          {/* WhatsApp Action Card */}
                          {msg.action.type === 'OPEN_WHATSAPP' && (
                            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 space-y-2">
                              <div className="flex items-center justify-between text-[11px] font-mono">
                                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                                  <Phone className="w-3.5 h-3.5" /> WhatsApp Direct Chat
                                </span>
                                <span>+92 320 1985059</span>
                              </div>
                              <p className="text-[11px] text-slate-300 italic bg-black/30 p-2 rounded-lg font-mono">
                                "{msg.action.payload.message}"
                              </p>
                              <button
                                onClick={() => executeAction(msg.action!)}
                                className="w-full py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-emerald-950/50"
                              >
                                <span>Open WhatsApp (+92 320 1985059)</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}

                          {/* CV Download Card */}
                          {msg.action.type === 'DOWNLOAD_CV' && (
                            <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-200 space-y-2">
                              <div className="flex items-center gap-1.5 text-[11px] font-mono text-purple-300 font-bold">
                                <FileText className="w-3.5 h-3.5" /> Official Curriculum Vitae (PDF)
                              </div>
                              <p className="text-[11px] text-slate-300">
                                Verified document: Muhammad Uzair - AI/ML R&D Engineer.
                              </p>
                              <button
                                onClick={() => executeAction(msg.action!)}
                                className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 hover:opacity-90 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-opacity"
                              >
                                <span>Download CV (PDF)</span>
                                <FileText className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}

                          {/* Section Navigation Card */}
                          {msg.action.type === 'NAVIGATE' && (
                            <button
                              onClick={() => executeAction(msg.action!)}
                              className="w-full py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-cyan-300 font-mono text-xs flex items-center justify-between transition-colors"
                            >
                              <span>Jump to #{msg.action.payload.section}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs p-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>Uzair.ai is responding...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Action Bar above input */}
            <div className="px-3 py-1.5 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                <Sparkles className="w-3 h-3 text-cyan-400" /> Ask anything or request an email
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSendMessage('Can I message Uzair on WhatsApp?')}
                  className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 p-1 hover:bg-white/5 rounded"
                  title="Connect on WhatsApp"
                >
                  <Phone className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleSendMessage('I want to send an email to Uzair')}
                  className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 p-1 hover:bg-white/5 rounded"
                  title="Send Direct Email"
                >
                  <Mail className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleSendMessage('Download Uzair CV')}
                  className="text-purple-400 hover:text-purple-300 flex items-center gap-1 p-1 hover:bg-white/5 rounded"
                  title="Download Resume"
                >
                  <FileText className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-[#0a0f1e] border-t border-slate-800 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Uzair's projects or say 'Send an email'..."
                disabled={isLoading}
                className="flex-1 bg-slate-900 px-3.5 py-2.5 rounded-xl border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 transition-colors placeholder-slate-600 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white disabled:opacity-40 hover:opacity-90 transition-opacity"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
