export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'llm' | 'vision' | 'agentic' | 'edge';
  categoryLabel: string;
  badge: string;
  description: string;
  longDescription: string;
  architectureHighlights: string[];
  metrics?: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface ArchitectureNode {
  id: string;
  name: string;
  type: 'input' | 'process' | 'model' | 'db' | 'output';
  description: string;
  tech: string;
  latency?: string;
}

export interface SystemBlueprint {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  summary: string;
  diagram: ArchitectureNode[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  type: string;
  badge: string;
  description: string;
  products: {
    name: string;
    status: string;
    points: string[];
  }[];
  technologies: string[];
}

export interface SkillCategory {
  category: string;
  icon: string;
  description: string;
  skills: {
    name: string;
    level: number;
    highlight?: boolean;
    badge?: string;
  }[];
}

export const personalInfo = {
  name: "Muhammad Uzair",
  role: "AI/ML R&D Engineer",
  specialization: "LLM Systems & Computer Vision",
  tagline: "Building Production AI Platforms, Context-Aware RAG & Real-Time Computer Vision Analytics",
  location: "Peshawar, Pakistan",
  email: "muhammaduzair2542@gmail.com",
  phone: "+92 320 1985059",
  linkedin: "https://linkedin.com/in/muhammad-uzair22",
  github: "https://github.com/muhammaduzair30",
  cvUrl: "/Muhammad_Uzair_AI_ML_CV.pdf",
  avatarUrl: "/avatar.png",
  summary: `AI/ML R&D Engineer and Computer Science graduate (CGPA 3.74/4.00, Passed with Distinction) with hands-on experience designing and deploying enterprise AI systems and real-time computer vision products. Currently developing a centralized AI platform (AI Wrapper) powering multiple company applications at VeevoTech, spanning hybrid RAG, context engineering, agentic workers, and real-time interruption-aware AI telephony. Leading technical development of an intelligent CCTV video-analytics product combining D-FINE-N detection, ByteTrack tracking, face recognition, and spatial rule monitoring. Offers an uncommon end-to-end advantage: deep PyTorch & LLM engineering paired with cross-platform Flutter/Dart client integration for production-ready edge and client delivery.`,
  stats: [
    { label: "Production Applications", value: "5-6", desc: "Powered by Central AI Platform" },
    { label: "Academic CGPA", value: "3.74", desc: "Graduated with Distinction (92.97%)" },
    { label: "Real-Time Tracking", value: "<25ms", desc: "D-FINE-N & ByteTrack Pipelines" },
    { label: "Hybrid RAG Search", value: "RRF", desc: "pgvector + BM25 Reciprocal Rank Fusion" },
  ]
};

export const systemBlueprints: SystemBlueprint[] = [
  {
    id: "central-ai-wrapper",
    title: "Central AI Platform (AI Wrapper & Telephony)",
    subtitle: "Enterprise Microservices Platform powering 5-6 Production Applications",
    tag: "Production Platform @ VeevoTech",
    summary: "A unified AI gateway orchestrating LLMs, multi-modal embeddings, conversation memory buffers, and real-time telephony with interruption-aware audio streams.",
    diagram: [
      { id: "1", name: "Inbound Stream / Query", type: "input", description: "Voice audio stream (telephony) or multi-tenant REST payload", tech: "WebSockets / REST", latency: "~5ms" },
      { id: "2", name: "Audio & Speech Engine", type: "process", description: "Streaming STT with interruption detection and speech activity monitoring", tech: "WebRTC / Audio Buffer", latency: "~45ms" },
      { id: "3", name: "Context & Memory Manager", type: "db", description: "Multi-turn session history, user preferences, and rolling context windowing", tech: "Redis / PostgreSQL", latency: "~8ms" },
      { id: "4", name: "Hybrid RAG Engine", type: "process", description: "Dual-track semantic search + BM25 keyword matching fused via Reciprocal Rank Fusion", tech: "pgvector + SQLAlchemy", latency: "~30ms" },
      { id: "5", name: "Agentic Worker Orchestrator", type: "model", description: "Configurable AI workers with tool execution, routing, and guardrails", tech: "LangGraph / LLM APIs", latency: "~180ms" },
      { id: "6", name: "Real-Time Response Dispatch", type: "output", description: "Interruption-aware audio synthesis and low-latency JSON payload streaming", tech: "FastAPI Streaming", latency: "~35ms" }
    ]
  },
  {
    id: "video-analytics",
    title: "Enterprise CCTV Intelligent Video Analytics",
    subtitle: "Multi-Camera Real-Time Spatial Event & Tracking Engine",
    tag: "R&D Enterprise System",
    summary: "High-throughput edge & server video pipeline running person detection, multi-object tracking, anti-spoofing face recognition, and polygon-based spatial zone rules.",
    diagram: [
      { id: "1", name: "RTSP Camera Ingestion", type: "input", description: "Multi-stream RTSP feed decoder with frame-dropping safeguards", tech: "OpenCV / GStreamer", latency: "~10ms" },
      { id: "2", name: "Person & Object Detection", type: "model", description: "Real-time bounding box detection using high-performance D-FINE-N architecture", tech: "D-FINE-N / TensorRT", latency: "~12ms" },
      { id: "3", name: "Multi-Object Tracking", type: "process", description: "Temporal association and trajectory smoothing with Kalman filter motion estimation", tech: "ByteTrack", latency: "~4ms" },
      { id: "4", name: "Facial Feature & Anti-Spoofing", type: "model", description: "SCRFD face alignment, MiniFASNet liveness check, and ArcFace 512D embedding match", tech: "SCRFD + ArcFace", latency: "~18ms" },
      { id: "5", name: "Spatial Zone & Loitering Rules", type: "process", description: "Virtual polygon breach checks, dwell-time counters, and restricted-area monitoring", tech: "Shapely / Custom Rules", latency: "~2ms" },
      { id: "6", name: "Event & Incident Dispatch", type: "output", description: "Instant alert webhooks, snapshot evidence logging, and live WebSocket telemetry", tech: "FastAPI / WebSocket", latency: "~15ms" }
    ]
  },
  {
    id: "docmind-rag",
    title: "DocMind AI – Multimodal Document Intelligence",
    subtitle: "Enterprise PDF Parsing & Hybrid Vector Retrieval Pipeline",
    tag: "Production RAG Architecture",
    summary: "Production-ready document QA system with semantic sentence chunking, background vector generation, and Reciprocal Rank Fusion hybrid retrieval.",
    diagram: [
      { id: "1", name: "PDF Document Ingestion", type: "input", description: "Multi-page PDF upload with layout extraction and OCR fallback", tech: "FastAPI / PyMuPDF", latency: "~120ms" },
      { id: "2", name: "Semantic Chunking", type: "process", description: "Boundary-aware text chunking preserving complete paragraphs & context", tech: "Python / NLTK", latency: "~25ms" },
      { id: "3", name: "Background Embedding Worker", type: "process", description: "Non-blocking asynchronous vector generation via background worker queue", tech: "FastAPI BackgroundTasks", latency: "~80ms" },
      { id: "4", name: "Hybrid Vector + Keyword DB", type: "db", description: "Dual index: pgvector cosine similarity + PostgreSQL tsvector inverted index", tech: "PostgreSQL / pgvector", latency: "~18ms" },
      { id: "5", name: "RRF Fusion & Reranking", type: "process", description: "Reciprocal Rank Fusion algorithm reconciling semantic and exact lexical signals", tech: "NumPy / Custom RRF", latency: "~5ms" },
      { id: "6", name: "Grounded LLM Generation", type: "output", description: "Context-injected prompt synthesis with cited source attribution", tech: "Google Gemini Flash", latency: "~220ms" }
    ]
  }
];

export const projects: Project[] = [
  {
    id: "central-ai-wrapper",
    title: "Central AI Platform (AI Wrapper)",
    subtitle: "Enterprise AI Infrastructure Powering 5-6 Company Apps",
    category: "llm",
    categoryLabel: "LLM Platform / Telephony",
    badge: "VeevoTech Production",
    description: "Architected and maintain the core centralized AI platform at VeevoTech, serving shared AI capabilities across 5+ company applications.",
    longDescription: "The Central AI Platform serves as the backbone for VeevoTech's internal and client-facing AI capabilities. It centralizes LLM governance, hybrid RAG workflows, persistent conversation memory, configurable agentic workers, and a low-latency real-time AI telephony pipeline supporting bi-directional streaming audio with interruption awareness.",
    architectureHighlights: [
      "Engineered hybrid RAG workflows with semantic knowledge retrieval and context engineering.",
      "Designed persistent memory-management components enabling context-aware multi-turn conversations.",
      "Developed configurable agentic AI workers with dynamic tool integration and multi-step execution graphs.",
      "Integrated real-time AI telephony workflows supporting streaming audio and interruption-aware call handling.",
      "Built resilient FastAPI microservices orchestrating multi-tenant workloads."
    ],
    metrics: ["5-6 Production Apps Served", "Sub-100ms Streaming Latency", "Multi-Agent Orchestration"],
    technologies: ["FastAPI", "RAG", "LangChain", "LangGraph", "WebSockets", "PostgreSQL", "pgvector", "Python"],
    featured: true
  },
  {
    id: "enterprise-cctv-vision",
    title: "Enterprise CCTV Video Analytics & Spatial AI",
    subtitle: "Intelligent Video Monitoring & Real-Time Event Analytics",
    category: "vision",
    categoryLabel: "Computer Vision & Video",
    badge: "Enterprise R&D",
    description: "Leading the technical development of an enterprise computer-vision platform for intelligent CCTV surveillance and automated spatial security analytics.",
    longDescription: "Spearheading the engineering of an end-to-end video analytics engine that processes multi-stream CCTV footage in real-time. Combines modern D-FINE-N detector with ByteTrack temporal tracking, SCRFD face detection, MiniFASNet anti-spoofing liveness verification, ArcFace identity matching, and geometric spatial polygon zone rules for restricted area intrusion and loitering detection.",
    architectureHighlights: [
      "Developed high-throughput person detection and multi-object tracking pipelines using D-FINE-N and ByteTrack.",
      "Integrated biometric facial verification combining SCRFD face alignment, ArcFace feature extraction, and MiniFASNet anti-spoofing.",
      "Implemented rule-based event analytics including virtual tripwires, spatial zone breach, occupancy counting, and loitering alerts.",
      "Optimized inference pipelines for stable FPS across multi-camera streams."
    ],
    metrics: ["Real-time multi-camera tracking", "Anti-spoofing liveness check", "Zero false-positive zone rules"],
    technologies: ["PyTorch", "D-FINE-N", "ByteTrack", "OpenCV", "SCRFD", "ArcFace", "MiniFASNet", "FastAPI"],
    featured: true
  },
  {
    id: "docmind-ai",
    title: "DocMind AI – Document Intelligence Platform",
    subtitle: "Production Hybrid-Search RAG with pgvector & Gemini Flash",
    category: "llm",
    categoryLabel: "RAG & LLM Application",
    badge: "Independent System",
    description: "Production-grade RAG platform featuring hybrid search (pgvector + BM25 keyword) via Reciprocal Rank Fusion (RRF) for multi-document Q&A.",
    longDescription: "DocMind AI allows users to upload complex PDFs and query them through a natural language interface powered by Google Gemini (gemini-2.5-flash). Engineered with semantic chunking that respects paragraph and sentence boundaries, multi-tenant JWT security, and asynchronous background embedding workers in FastAPI for near-instant file ingestion.",
    architectureHighlights: [
      "Implemented Hybrid Search using Reciprocal Rank Fusion (RRF), combining pgvector semantic embeddings with PostgreSQL full-text keyword indexing.",
      "Developed semantic boundary chunking preserving contextual integrity across long multi-column PDFs.",
      "Non-blocking asynchronous ML embedding via FastAPI BackgroundTasks.",
      "Cross-platform client interface engineered in Flutter connecting to FastAPI backend.",
      "Deployed with Supabase and Render cloud infrastructure."
    ],
    metrics: ["Dual-engine RRF Search", "Async Background Embeddings", "Multi-Tenant JWT Auth"],
    technologies: ["FastAPI", "PostgreSQL", "pgvector", "SQLAlchemy", "Google Gemini SDK", "SentenceTransformers", "Flutter"],
    githubUrl: "https://github.com/muhammaduzair30/aiaa_frontend",
    featured: true
  },
  {
    id: "aiaa-agent",
    title: "AIAA – AI Job Application & Resume Matching Agent",
    subtitle: "Agentic Candidate Shortlisting & Semantic Match Intelligence",
    category: "agentic",
    categoryLabel: "Agentic AI & NLP",
    badge: "Agentic Platform",
    description: "Autonomous career agent utilizing Pinecone vector retrieval, Google Gemini, and LangChain/LangGraph for semantic job matching and automated cover letters.",
    longDescription: "An intelligent platform combining resume parsing, job-description matching, and semantic similarity. Implements weighted candidate scoring, explainable matching insights, and explored agentic workflow patterns for structured multi-stage resume evaluation.",
    architectureHighlights: [
      "Pinecone vector infrastructure for high-dimensional semantic candidate-job alignment.",
      "LangGraph agentic evaluation loop with multi-step reasoning and criteria validation.",
      "Automated personalized cover letter generation with explainable qualification rationale.",
      "High-performance FastAPI microservice backend connected to Flutter client."
    ],
    metrics: ["Vector Semantic Scoring", "Explainable Insights", "LangGraph Workflow"],
    technologies: ["LangGraph", "LangChain", "FastAPI", "Pinecone", "Gemini API", "PostgreSQL", "Flutter"],
    githubUrl: "https://github.com/muhammaduzair30/aiaa_frontend",
    featured: true
  },
  {
    id: "uzairbot-gpt2",
    title: "UzairBot – Personalized Fine-Tuned GPT-2",
    subtitle: "Custom Dialogue Fine-Tuning & Controlled Inference",
    category: "llm",
    categoryLabel: "NLP / Model Fine-Tuning",
    badge: "Fine-Tuned Model",
    description: "Fine-tuned GPT-2 on ~1,000 conversational dialogue pairs using Hugging Face Transformers with controlled generation parameters.",
    longDescription: "Built an end-to-end NLP model fine-tuning pipeline starting from raw conversational exports. Handled tokenization, custom special tokens, data preprocessing, gradient accumulation, loss tracking, and conversational inference with tuned temperature, top-p nucleus sampling, and repetition penalties. Deployed on Hugging Face Spaces.",
    architectureHighlights: [
      "Custom conversational dataset preprocessing and tokenization using Hugging Face tokenizers.",
      "Fine-tuned GPT-2 weights on dialogue context-response pairs.",
      "Controlled sampling algorithms (temperature, top-p, repetition penalty) preventing degenerate loops.",
      "Hosted interactive demo on Hugging Face Spaces."
    ],
    metrics: ["1,000+ Dialogue Pairs", "Hugging Face Deployment", "Custom Tokenizer Pipeline"],
    technologies: ["PyTorch", "Hugging Face Transformers", "GPT-2", "Python", "Hugging Face Spaces"],
    githubUrl: "https://github.com/muhammaduzair30",
    featured: false
  },
  {
    id: "peach-disease-cv",
    title: "Peach Crop Disease Diagnostics via YOLOv8",
    subtitle: "Agricultural Deep Learning Computer Vision & Mobile Inference",
    category: "vision",
    categoryLabel: "Computer Vision & Edge",
    badge: "Deep Learning CV",
    description: "Deep learning computer vision application for identifying peach crop diseases from field images using custom YOLOv8 and FastAPI backend.",
    longDescription: "Developed an end-to-end computer vision solution to help agriculturalists diagnose peach fruit and leaf pathology in the field. Trained and validated YOLOv8 models on custom field imagery, built a FastAPI inference microservice with low-latency image processing, and developed a Flutter mobile interface for instant image capture, bounding-box overlay, and disease remediation guidance.",
    architectureHighlights: [
      "Curated, augmented, and annotated custom crop pathology image dataset.",
      "Trained and evaluated YOLOv8 architecture for multi-class pathology classification.",
      "Engineered FastAPI microservice for asynchronous image decoding and tensor inference.",
      "Flutter mobile interface for one-tap field camera capture and prediction visualization."
    ],
    metrics: ["Multi-class Detection", "FastAPI Microservice", "On-Field Mobile UX"],
    technologies: ["Python", "YOLOv8", "OpenCV", "FastAPI", "Flutter", "PyTorch"],
    featured: false
  },
  {
    id: "hand-gesture-cv",
    title: "Real-Time Hand Gesture & Spatial CV System",
    subtitle: "Sub-15ms Spatial Gesture Recognition & Finger Counting",
    category: "vision",
    categoryLabel: "Computer Vision",
    badge: "Real-Time CV",
    description: "Real-time hand gesture detection and finger counting system built with YOLOv8 on a custom annotated webcam dataset.",
    longDescription: "Engineered a low-latency spatial interaction system running real-time hand gesture detection and finger counting. Collected and annotated a custom multi-angle dataset via webcam, fine-tuned YOLOv8 for edge inference, and achieved seamless sub-15ms latency suitable for touchless human-computer interaction.",
    architectureHighlights: [
      "Custom dataset collection and bounding-box annotation for diverse lighting and skin tones.",
      "Trained fine-tuned YOLOv8 model for real-time edge performance.",
      "OpenCV video capture loop with non-maximum suppression (NMS) and count stabilization."
    ],
    metrics: ["Sub-15ms Latency", "Custom Annotated Dataset", "Real-Time OpenCV Pipeline"],
    technologies: ["Python", "YOLOv8", "OpenCV", "Deep Learning"],
    featured: false
  },
  {
    id: "ai-tic-tac-toe",
    title: "AI Game Engine – Minimax Decision Search",
    subtitle: "Unbeatable Decision-Tree Game AI with Alpha-Beta Pruning",
    category: "agentic",
    categoryLabel: "Game AI & Algorithms",
    badge: "Algorithmic AI",
    description: "Classic AI game intelligence implementing state-space exploration with Minimax decision logic for mathematically optimal moves.",
    longDescription: "An algorithmic exploration of zero-sum game theory and state-space search trees. Implemented the Minimax algorithm with alpha-beta branch pruning in Dart/Flutter, guaranteeing mathematically optimal decisions where defeat is impossible.",
    architectureHighlights: [
      "Recursive game-tree traversal evaluating all terminal state utilities.",
      "Alpha-beta pruning optimization reducing state-space search complexity.",
      "Polished cross-platform interactive UI."
    ],
    metrics: ["Mathematically Unbeatable", "State-Space Pruning", "Cross-Platform GUI"],
    technologies: ["Dart", "Flutter", "Minimax Algorithm", "Game Theory"],
    liveUrl: "https://lnkd.in/d-z5Ufpx",
    githubUrl: "https://lnkd.in/dNKbQwiF",
    featured: false
  },
  {
    id: "flutter-edge-pos",
    title: "Enterprise Retail Management & POS Platform",
    subtitle: "High-Performance Desktop Client with Clean Architecture",
    category: "edge",
    categoryLabel: "Edge / Client Engineering",
    badge: "Production Client",
    description: "Comprehensive Windows desktop POS and retail management system with real-time inventory synchronization, offline resilience, and Riverpod state management.",
    longDescription: "Demonstrates production client engineering capabilities. Built a Windows-native desktop application in Flutter with Riverpod state management, transactional barcode scanning, offline-first local caching, receipt generation, and RESTful inventory synchronization.",
    architectureHighlights: [
      "Clean Architecture with separation of domain, data, and presentation layers.",
      "Riverpod reactive state management for real-time inventory recalculations.",
      "Offline-first sync logic handling network interruptions gracefully."
    ],
    metrics: ["Windows Native Deployment", "Riverpod Clean Architecture", "Offline-First Sync"],
    technologies: ["Flutter Desktop", "Riverpod", "Dart", "REST APIs", "Inno Setup"],
    featured: false
  }
];

export const experiences: ExperienceItem[] = [
  {
    id: "veevotech",
    role: "AI/ML R&D Engineer",
    company: "VeevoTech",
    period: "June 2026 – Present",
    type: "Full-Time",
    badge: "Current Role",
    description: "Driving R&D and core technical implementation across centralized LLM platforms and enterprise computer vision video analytics products.",
    products: [
      {
        name: "Central AI Platform (AI Wrapper)",
        status: "Production Platform",
        points: [
          "Architect and maintain a centralized AI platform providing shared AI capabilities to 5 to 6 company applications.",
          "Design and implement RAG workflows, knowledge retrieval, context-engineering processes, and memory-management components for context-aware LLM applications.",
          "Develop agentic AI capabilities involving configurable AI workers, dynamic tool integrations, and orchestration of multi-step workflows.",
          "Integrate audio input/output and real-time AI telephony workflows for voice-based interactions, including streaming and interruption-aware call handling; develop backend services and application integrations."
        ]
      },
      {
        name: "Enterprise Computer Vision & Video Analytics",
        status: "Under Active Development",
        points: [
          "Lead the technical development of a computer-vision product for intelligent CCTV monitoring and real-time video analytics.",
          "Develop person-detection and multi-object-tracking pipelines using D-FINE-N and ByteTrack, and integrate face-recognition and anti-spoofing components (SCRFD, ArcFace, MiniFASNet) into the video-analytics workflow.",
          "Implement spatial-zone monitoring and rule-based event analytics for use cases including restricted-area activity, occupancy monitoring, and loitering detection."
        ]
      }
    ],
    technologies: ["FastAPI", "PyTorch", "D-FINE-N", "ByteTrack", "LangChain", "LangGraph", "pgvector", "PostgreSQL", "WebSockets", "ArcFace", "SCRFD", "MiniFASNet"]
  },
  {
    id: "phi-horizon",
    role: "Flutter Developer Intern | AI/ML Contributor",
    company: "PHI Horizon Tech and Services",
    period: "Oct 2025 – Apr 2026",
    type: "PSEB-Supported Internship",
    badge: "Internship",
    description: "Bridged client-side mobile engineering with backend AI/ML computer vision microservices in a PSEB-supported program.",
    products: [
      {
        name: "Cross-Platform Engineering & ML Prototyping",
        status: "Completed",
        points: [
          "Developed cross-platform Flutter applications and integrated REST services to support end-to-end application workflows.",
          "Built and evaluated CNN- and YOLO-based computer-vision prototypes using OpenCV, and connected model inference to Python/FastAPI services.",
          "Worked with MySQL and PostgreSQL for application data storage, caching, and retrieval."
        ]
      }
    ],
    technologies: ["Flutter", "Dart", "FastAPI", "Python", "YOLO", "OpenCV", "TensorFlow", "PostgreSQL", "MySQL"]
  },
  {
    id: "freelance-independent",
    role: "Independent AI & Software Systems Developer",
    company: "Client & Autonomous Projects",
    period: "2023 – Present",
    type: "Contract & R&D",
    badge: "Independent",
    description: "Delivering end-to-end digital solutions combining modern AI intelligence with high-standard mobile/desktop client experiences.",
    products: [
      {
        name: "Production Deliverables & Prototypes",
        status: "Delivered",
        points: [
          "Architected and deployed DocMind AI and AIAA, achieving production-grade RAG and agentic candidate shortlisting.",
          "Engineered commercial desktop POS systems and on-demand mobile apps with GPS tracking and payment flows.",
          "Completed 5+ client applications reaching hundreds of active end users."
        ]
      }
    ],
    technologies: ["Python", "Flutter", "FastAPI", "Pinecone", "pgvector", "Riverpod", "Docker", "Render"]
  }
];

export const skillCategories: SkillCategory[] = [
  {
    category: "LLMs & Agentic Systems",
    icon: "Brain",
    description: "Context engineering, retrieval augmentation, agentic graphs, and real-time voice orchestration.",
    skills: [
      { name: "Retrieval-Augmented Gen (RAG)", level: 95, highlight: true, badge: "Production" },
      { name: "Context Engineering & Memory", level: 92, highlight: true, badge: "Production" },
      { name: "Agentic Workflows (LangGraph)", level: 90, highlight: true },
      { name: "Tool Integration & Routing", level: 90 },
      { name: "LangChain & LLM APIs", level: 92 },
      { name: "Hugging Face Transformers", level: 88 },
      { name: "Real-Time AI Telephony", level: 85, badge: "Specialty" },
      { name: "Prompt Optimization & Guardrails", level: 90 },
    ]
  },
  {
    category: "Computer Vision & Video Analytics",
    icon: "Eye",
    description: "Real-time edge and server video pipelines, temporal object tracking, and facial biometrics.",
    skills: [
      { name: "D-FINE-N Object Detection", level: 94, highlight: true, badge: "Production" },
      { name: "ByteTrack Multi-Object Tracking", level: 92, highlight: true, badge: "Production" },
      { name: "YOLO (v8 / v11)", level: 95, highlight: true },
      { name: "OpenCV Video Pipelines", level: 90 },
      { name: "Face Recognition (ArcFace / SCRFD)", level: 88 },
      { name: "Anti-Spoofing (MiniFASNet)", level: 86 },
      { name: "Spatial Zone & Loitering Rules", level: 92 },
      { name: "MediaPipe", level: 85 },
    ]
  },
  {
    category: "Machine Learning & Deep Learning",
    icon: "Cpu",
    description: "Core neural network training, model fine-tuning, embeddings, and statistical learning.",
    skills: [
      { name: "PyTorch", level: 90, highlight: true },
      { name: "TensorFlow & Keras", level: 85 },
      { name: "Model Fine-Tuning (GPT-2 / LLMs)", level: 88 },
      { name: "Scikit-Learn", level: 88 },
      { name: "SentenceTransformers & Embeddings", level: 92 },
      { name: "Vector Indexing (pgvector / Pinecone)", level: 90 },
      { name: "FAISS", level: 82 },
    ]
  },
  {
    category: "Backend & AI Infrastructure",
    icon: "Server",
    description: "High-throughput asynchronous microservices, streaming protocols, and vector databases.",
    skills: [
      { name: "FastAPI", level: 95, highlight: true, badge: "Core Stack" },
      { name: "PostgreSQL & pgvector", level: 90, highlight: true },
      { name: "REST APIs & WebSockets", level: 94 },
      { name: "Supabase & SQL databases", level: 88 },
      { name: "SQLAlchemy & ORMs", level: 85 },
      { name: "Node.js Basics", level: 78 },
      { name: "Docker & Containerization", level: 82 },
      { name: "Render & Cloud Deployments", level: 85 },
    ]
  },
  {
    category: "Edge AI & Production Frontends",
    icon: "Smartphone",
    description: "The unique cross-platform advantage: Bridging AI backends with polished mobile and desktop clients.",
    skills: [
      { name: "Flutter (Mobile & Desktop)", level: 95, highlight: true, badge: "Edge Advantage" },
      { name: "Dart", level: 94 },
      { name: "Riverpod State Architecture", level: 92 },
      { name: "Provider & Clean Architecture", level: 88 },
      { name: "On-Device Inference Integration", level: 88 },
      { name: "Responsive UI & Hardware Interfacing", level: 90 },
    ]
  },
  {
    category: "Languages & Engineering Tools",
    icon: "Code",
    description: "Programming languages, version control, and development environments.",
    skills: [
      { name: "Python", level: 96, highlight: true, badge: "Primary" },
      { name: "Dart", level: 94 },
      { name: "C / C++", level: 82 },
      { name: "JavaScript / TypeScript", level: 80 },
      { name: "Git & GitHub Actions", level: 90 },
      { name: "Postman & API Testing", level: 92 },
      { name: "Jupyter Notebook & Google Colab", level: 92 },
    ]
  }
];

export const educationInfo = {
  degree: "BS Computer Science",
  institution: "CECOS University of IT and Emerging Sciences, Peshawar, Pakistan",
  period: "2021 – 2025",
  cgpa: "3.74 / 4.00",
  percentage: "92.97%",
  distinction: "Passed with Distinction",
  creditHours: 130,
  coursework: [
    "Artificial Intelligence",
    "Machine Learning",
    "Digital Image Processing",
    "Data Structures & Algorithms",
    "Design & Analysis of Algorithms",
    "Operating Systems",
    "Database Systems & Data Warehousing",
    "Computer Networks",
    "Parallel & Distributed Computing",
    "Probability & Statistics",
    "Linear Algebra & Calculus"
  ],
  areasOfInterest: [
    "Retrieval-Augmented Generation & LLM Memory Systems",
    "Context Engineering & Agentic Workflow Graphs",
    "Multimodal AI & Real-Time Computer Vision",
    "Explainable, Grounded & Reliable AI Systems"
  ]
};
