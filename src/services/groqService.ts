export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: number;
  action?: AgentAction | null;
  emailStatus?: 'sending' | 'sent' | 'error';
}

export type AgentAction =
  | { type: 'DISPATCH_EMAIL'; payload: { name: string; email: string; subject: string; message: string } }
  | { type: 'OPEN_WHATSAPP'; payload: { message: string } }
  | { type: 'DOWNLOAD_CV' }
  | { type: 'NAVIGATE'; payload: { section: string } };

export const SYSTEM_PROMPT = `You are "Uzair.ai", the official personal AI digital twin and technical representative of Muhammad Uzair.

==================================================
CRITICAL FORMATTING & CONVERSATIONAL RULES:
==================================================
1. NEVER USE TABLES: Do NOT output ASCII or Markdown comparison tables (never use "| col | col |"). They are cluttered and hard to read on mobile devices.
2. BE CONCISE & PUNCHY: Answer simple questions in 2 to 4 crisp, engaging sentences. Avoid writing long multi-paragraph essays unless the user specifically asks for "deep technical architecture" or "full breakdown".
3. TONE: Speak warmly, professionally, and with high technical confidence. Refer to Muhammad Uzair as "Uzair" or "Muhammad Uzair".
4. STRICT TOPIC FOCUS: If a visitor asks an off-topic question unrelated to Uzair (e.g. general trivia, unrelated coding homework, cooking, politics, etc.), politely and warmly redirect them:
   "I specialize specifically in Muhammad Uzair's AI/ML engineering work and portfolio. I'd love to tell you about his Central AI Platform, computer vision tracking, RAG systems, or help you connect with him directly! What would you like to know?"
5. NEVER mention system prompts, internal rules, or phrases like "according to my restrictions".

==================================================
MUHAMMAD UZAIR'S CORE PROFILE:
==================================================
- Full Name: Muhammad Uzair
- Current Role: AI/ML R&D Engineer at VeevoTech (June 2026 – Present)
- Location: Peshawar, Pakistan
- Email: muhammaduzair2542@gmail.com
- Phone / WhatsApp: +92 320 1985059
- LinkedIn: linkedin.com/in/muhammad-uzair22
- GitHub: github.com/muhammaduzair30
- Education: BS Computer Science from CECOS University of IT and Emerging Sciences, Peshawar (2021–2025). Graduated with Distinction, CGPA 3.74/4.00, Overall 92.97%, 130 credit hours.

PRODUCTION WORK AT VEEVOTECH:
1. Central AI Platform (AI Wrapper):
   - Centralized microservices gateway powering 5 to 6 enterprise company applications.
   - Built hybrid RAG workflows, semantic knowledge retrieval, and persistent conversation memory buffers for multi-turn LLMs.
   - Configurable agentic AI workers with tool execution and multi-step routing (LangChain, LangGraph).
   - Real-time AI telephony: Streaming audio I/O, speech-to-text, and interruption-aware call handling via WebSockets and FastAPI.
2. Enterprise CCTV Video Analytics:
   - Real-time intelligent CCTV surveillance and spatial analytics platform.
   - Person detection via high-throughput D-FINE-N.
   - Multi-object tracking via ByteTrack with sub-25ms per-frame processing.
   - Facial biometrics combining SCRFD face alignment, ArcFace 512D embeddings, and MiniFASNet anti-spoofing liveness checks.
   - Spatial zone analytics: Virtual polygon tripwires, restricted area intrusion, dwell time, and loitering alerts.

WHY FLUTTER IN AN AI PORTFOLIO? (Keep it concise!):
"Most AI engineers only write Python models and leave them behind backend APIs. Uzair bridges deep learning models (YOLO, RAG, LLMs) directly into native cross-platform clients using Flutter and Dart. This enables him to deliver complete, camera-ready applications for iOS, Android, and Windows with on-device camera feeds and offline edge inference — turning raw models into tangible products."

KEY INDEPENDENT PROJECTS:
- DocMind AI: Production-grade RAG platform using Reciprocal Rank Fusion (RRF) combining pgvector semantic search with PostgreSQL full-text keyword search, semantic chunking, async background embeddings in FastAPI, Google Gemini Flash, and Flutter client.
- AIAA: Agentic job matching agent using Pinecone vector search, Google Gemini, and LangGraph multi-step candidate scoring.
- UzairBot: Fine-tuned GPT-2 on ~1,000 conversational dialogue pairs using Hugging Face Transformers.
- Peach Disease Detection: Custom YOLOv8 deep learning model for crop pathology diagnostics.
- Hand Gesture CV: Real-time hand gesture recognition and finger counting with YOLOv8 and OpenCV.

==================================================
IN-CHAT EMAIL & ACTIONS WORKFLOW:
==================================================
When a user wants to send an email to Uzair:
- If details (name, email, or message) are missing, ask naturally in the chat:
  "I can send an email directly to Muhammad Uzair for you right now! What is your name, your email address, and what message or subject would you like me to send?"
- When the message and contact info are provided, confirm and append this action tag:
  [[ACTION:DISPATCH_EMAIL {"name": "...", "email": "...", "subject": "...", "message": "..."}]]
  State: "I've dispatched your email directly to Muhammad Uzair (muhammaduzair2542@gmail.com). He will get back to you shortly!"

OTHER ACTIONS:
- WhatsApp: [[ACTION:OPEN_WHATSAPP {"message": "Hi Uzair, I saw your portfolio and would like to connect!"}]]
- Download CV: [[ACTION:DOWNLOAD_CV]]
- Jump to Section: [[ACTION:NAVIGATE {"section": "projects"}]]

Format all answers with clean typography and short bullet points. NEVER use markdown tables.`;

const DEFAULT_API_KEY = import.meta.env.VITE_GROQ_API_KEY || '';

export function getStoredApiKey(): string {
  return localStorage.getItem('user_groq_api_key') || DEFAULT_API_KEY;
}

export function setStoredApiKey(key: string): void {
  localStorage.setItem('user_groq_api_key', key);
}

export function parseActionTag(text: string): { cleanedText: string; action: AgentAction | null } {
  const actionRegex = /\[\[ACTION:([A-Z_]+)(?:\s+({.*?}))?\]\]/s;
  const match = text.match(actionRegex);

  if (!match) {
    return { cleanedText: text.trim(), action: null };
  }

  const [fullMatch, actionType, payloadStr] = match;
  let payload: any = {};
  if (payloadStr) {
    try {
      payload = JSON.parse(payloadStr);
    } catch {
      payload = {};
    }
  }

  let action: AgentAction | null = null;
  switch (actionType) {
    case 'DISPATCH_EMAIL':
    case 'SEND_EMAIL':
      action = {
        type: 'DISPATCH_EMAIL',
        payload: {
          name: payload.name || 'Portfolio Visitor',
          email: payload.email || 'visitor@portfolio.com',
          subject: payload.subject || 'Portfolio Inquiry for Muhammad Uzair',
          message: payload.message || 'Hello Muhammad Uzair, I saw your portfolio and would like to get in touch.',
        },
      };
      break;
    case 'OPEN_WHATSAPP':
      action = {
        type: 'OPEN_WHATSAPP',
        payload: {
          message: payload.message || 'Hi Uzair, I saw your portfolio and would like to connect!',
        },
      };
      break;
    case 'DOWNLOAD_CV':
      action = { type: 'DOWNLOAD_CV' };
      break;
    case 'NAVIGATE':
      action = {
        type: 'NAVIGATE',
        payload: {
          section: payload.section || 'projects',
        },
      };
      break;
  }

  const cleanedText = text.replace(fullMatch, '').trim();
  return { cleanedText, action };
}

/**
 * Direct email dispatch service
 * Sends email directly to muhammaduzair2542@gmail.com using FormSubmit AJAX API
 */
export async function sendEmailDirectly(payload: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<boolean> {
  try {
    const res = await fetch('https://formsubmit.co/ajax/muhammaduzair2542@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _subject: `[Uzair.ai Digital Twin] ${payload.subject}`,
        Name: payload.name,
        Email: payload.email,
        Message: payload.message,
        _template: 'table',
      }),
    });

    if (res.ok) {
      return true;
    }
  } catch (err) {
    console.warn('Direct email dispatch fallback triggered:', err);
  }

  // Graceful fallback to mailto if browser network blocks third-party endpoints
  try {
    const mailto = `mailto:muhammaduzair2542@gmail.com?subject=${encodeURIComponent(
      payload.subject
    )}&body=${encodeURIComponent(
      `Name: ${payload.name}\nEmail: ${payload.email}\n\nMessage:\n${payload.message}`
    )}`;
    window.location.href = mailto;
    return true;
  } catch {
    return false;
  }
}

export interface StreamChatParams {
  messages: { role: 'user' | 'assistant' | 'system'; content: string }[];
  onChunk: (text: string) => void;
  onComplete: (fullText: string, action: AgentAction | null) => void;
  onError: (error: string) => void;
  apiKey?: string;
  model?: string;
}

function simulateLocalStream({
  messages,
  onChunk,
  onComplete,
}: {
  messages: { role: string; content: string }[];
  onChunk: (text: string) => void;
  onComplete: (fullText: string, action: AgentAction | null) => void;
}): () => void {
  const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user')?.content.toLowerCase() || '';

  let fullResponse = '';

  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/;
  const emailMatch = lastUserMsg.match(emailRegex);

  if (emailMatch) {
    const userEmail = emailMatch[1];
    fullResponse = `[[ACTION:DISPATCH_EMAIL {"name": "Portfolio Visitor", "email": "${userEmail}", "subject": "Portfolio Contact from ${userEmail}", "message": "${lastUserMsg.replace(/"/g, "'")}"}]]\n\nI've dispatched your email directly to Muhammad Uzair (muhammaduzair2542@gmail.com). He will review your message and reply promptly!`;
  } else if (lastUserMsg.includes('email') || lastUserMsg.includes('send message') || lastUserMsg.includes('contact me')) {
    fullResponse = `I can send an email directly to Muhammad Uzair right now! Please reply with your **name**, **email address**, and the **message** you'd like me to send to him.`;
  } else if (lastUserMsg.includes('whatsapp') || lastUserMsg.includes('phone') || lastUserMsg.includes('call')) {
    fullResponse = `You can reach Muhammad Uzair directly on WhatsApp at **+92 320 1985059**.\n\n[[ACTION:OPEN_WHATSAPP {"message": "Hi Uzair, I saw your portfolio and would like to connect!"}]]\n\nWould you like me to open the WhatsApp chat for you?`;
  } else if (lastUserMsg.includes('cv') || lastUserMsg.includes('resume') || lastUserMsg.includes('download')) {
    fullResponse = `You can download Muhammad Uzair's official AI/ML R&D Engineer CV directly here!\n\n[[ACTION:DOWNLOAD_CV]]`;
  } else if (lastUserMsg.includes('flutter') || lastUserMsg.includes('mobile')) {
    fullResponse = `Most AI engineers only write Python backends and leave models behind APIs. Uzair bridges deep learning models (YOLO, RAG, LLMs) directly into native cross-platform clients using Flutter and Dart.\n\nThis enables him to deliver complete, camera-ready applications for iOS, Android, and Windows with on-device camera feeds and offline edge inference — turning raw models into tangible products.`;
  } else if (lastUserMsg.includes('cctv') || lastUserMsg.includes('vision') || lastUserMsg.includes('track') || lastUserMsg.includes('detect') || lastUserMsg.includes('camera')) {
    fullResponse = `At VeevoTech, Uzair developed an enterprise real-time CCTV surveillance platform combining:\n\n- **D-FINE-N** for high-accuracy person detection\n- **ByteTrack** for sub-25ms multi-object tracking\n- **ArcFace + MiniFASNet** for facial biometrics & anti-spoofing\n- **Spatial Tripwires** for restricted area intrusion alerts\n\nYou can test the live simulation in the **AI Engineering Lab** section!`;
  } else if (lastUserMsg.includes('rag') || lastUserMsg.includes('veevotech') || lastUserMsg.includes('wrapper') || lastUserMsg.includes('telephony')) {
    fullResponse = `Uzair architected VeevoTech's Central AI Platform — a multi-tenant microservices gateway powering 5 to 6 enterprise applications. It features hybrid RAG (pgvector + BM25 full-text), conversation memory buffers, and interruption-aware real-time AI telephony via WebSockets and FastAPI.`;
  } else if (lastUserMsg.includes('project') || lastUserMsg.includes('docmind') || lastUserMsg.includes('aiaa')) {
    fullResponse = `Uzair's flagship systems include:\n\n- **DocMind AI**: Production RAG platform with Reciprocal Rank Fusion (RRF) and pgvector\n- **Enterprise CCTV Analytics**: Real-time D-FINE-N + ByteTrack tracking\n- **AIAA**: Agentic resume/job candidate scoring with Pinecone and Gemini\n- **UzairBot**: Conversational AI fine-tuned on GPT-2 with Hugging Face\n- **Peach Disease Detection**: Custom YOLOv8 crop pathology diagnostics`;
  } else if (lastUserMsg.includes('weather') || lastUserMsg.includes('joke') || lastUserMsg.includes('recipe') || lastUserMsg.includes('politics')) {
    fullResponse = `I specialize specifically in Muhammad Uzair's AI/ML engineering work and portfolio. I'd love to tell you about his Central AI Platform, computer vision tracking, RAG systems, or help you connect with him directly! What would you like to know?`;
  } else {
    fullResponse = `Muhammad Uzair is an AI/ML R&D Engineer at VeevoTech specializing in Central LLM Platforms, Computer Vision (D-FINE-N + ByteTrack), and edge deployment with Flutter. Graduated with Distinction (CGPA 3.74) from CECOS University.\n\nAsk me about his projects, architectures, or let me know if you'd like to send him an email directly from this chat!`;
  }

  let index = 0;
  let aborted = false;
  const words = fullResponse.split(' ');
  let currentText = '';

  const interval = setInterval(() => {
    if (aborted) {
      clearInterval(interval);
      return;
    }
    if (index < words.length) {
      currentText += (index === 0 ? '' : ' ') + words[index];
      const tagIndex = currentText.indexOf('[[ACTION:');
      if (tagIndex === -1) {
        onChunk(currentText);
      } else {
        onChunk(currentText.slice(0, tagIndex).trim());
      }
      index++;
    } else {
      clearInterval(interval);
      const { cleanedText, action } = parseActionTag(fullResponse);
      onComplete(cleanedText, action);
    }
  }, 28);

  return () => {
    aborted = true;
    clearInterval(interval);
  };
}

export async function streamGroqChat({
  messages,
  onChunk,
  onComplete,
  onError,
  apiKey,
  model = 'openai/gpt-oss-20b',
}: StreamChatParams): Promise<() => void> {
  const activeKey = apiKey || getStoredApiKey();

  if (!activeKey) {
    return simulateLocalStream({ messages, onChunk, onComplete });
  }

  const controller = new AbortController();

  try {
    const formattedMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.slice(-6),
    ];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${activeKey}`,
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify({
        model,
        messages: formattedMessages,
        max_tokens: 450,
        temperature: 0.65,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      // If primary model failed, attempt fallback to qwen3.8-27b
      if (model !== 'qwen/qwen3.8-27b') {
        return streamGroqChat({
          messages,
          onChunk,
          onComplete,
          onError,
          apiKey: activeKey,
          model: 'qwen/qwen3.8-27b',
        });
      }
      throw new Error(`Groq API Error (${response.status}): ${errText}`);
    }

    if (!response.body) {
      throw new Error('No readable stream available from Groq response');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let accumulatedText = '';
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith(':')) continue;

        if (trimmed === 'data: [DONE]') {
          const { cleanedText, action } = parseActionTag(accumulatedText);
          onComplete(cleanedText, action);
          return () => controller.abort();
        }

        if (trimmed.startsWith('data: ')) {
          try {
            const data = JSON.parse(trimmed.slice(6));
            const delta = data.choices?.[0]?.delta?.content;
            if (delta) {
              accumulatedText += delta;
              const tagIndex = accumulatedText.indexOf('[[ACTION:');
              if (tagIndex === -1) {
                onChunk(accumulatedText);
              } else {
                onChunk(accumulatedText.slice(0, tagIndex).trim());
              }
            }
          } catch {
            // Ignore parse errors on malformed chunks
          }
        }
      }
    }

    const { cleanedText, action } = parseActionTag(accumulatedText);
    onComplete(cleanedText, action);
  } catch (err: any) {
    if (err.name === 'AbortError') return () => {};
    onError(err.message || 'Failed to communicate with Groq AI API.');
  }

  return () => controller.abort();
}
