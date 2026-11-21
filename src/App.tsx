import { useState, useEffect } from 'react';
import { NeuralNetworkCanvas } from './components/NeuralNetworkCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AIEngineeringLab } from './components/AIEngineeringLab';
import { ArchitectureSimulator } from './components/ArchitectureSimulator';
import { BenchmarkTelemetry } from './components/BenchmarkTelemetry';
import { ResearchNotes } from './components/ResearchNotes';
import { Projects } from './components/Projects';
import { TerminalPlayground } from './components/TerminalPlayground';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AIAgentChat } from './components/AIAgentChat';
import { CommandPalette } from './components/CommandPalette';

export function App() {
  const [perspective, setPerspective] = useState<'ai' | 'fullstack'>('ai');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const handleOpenPalette = () => setIsCommandPaletteOpen(true);
    window.addEventListener('open-command-palette', handleOpenPalette);
    return () => window.removeEventListener('open-command-palette', handleOpenPalette);
  }, []);

  return (
    <div className="min-h-screen bg-[#05070e] text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-200 relative">
      {/* Interactive Neural Canvas Background */}
      <NeuralNetworkCanvas />

      {/* Navigation */}
      <Navbar 
        perspective={perspective} 
        onTogglePerspective={(p) => setPerspective(p)} 
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col">
        <Hero perspective={perspective} />

        {/* Live Interactive AI Engineering Lab */}
        <AIEngineeringLab />
        
        {/* Interactive AI Architecture Simulator */}
        <ArchitectureSimulator />

        {/* Verified System Telemetry & MLOps Latency Engine */}
        <BenchmarkTelemetry />

        {/* R&D Notes & Technical Architecture Case Studies */}
        <ResearchNotes />

        {/* Bento Grid Projects Showcase */}
        <Projects perspective={perspective} />

        {/* Developer Terminal Playground */}
        <TerminalPlayground />

        {/* Production Experience & Education */}
        <Experience />

        {/* Skills & Arsenal Matrix */}
        <Skills perspective={perspective} />

        {/* Philosophy & Narrative */}
        <About />

        {/* Contact & Collaboration */}
        <Contact />
      </main>

      {/* Autonomous Groq AI Copilot & Agent */}
      <AIAgentChat />

      {/* Spotlight Command Palette (Cmd+K / Ctrl+K) */}
      <CommandPalette 
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        perspective={perspective}
        onTogglePerspective={(p) => setPerspective(p)}
        onOpenChat={() => window.dispatchEvent(new CustomEvent('open-uzair-chat'))}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
