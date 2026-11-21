import { useState } from 'react';
import { NeuralNetworkCanvas } from './components/NeuralNetworkCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AIEngineeringLab } from './components/AIEngineeringLab';
import { ArchitectureSimulator } from './components/ArchitectureSimulator';
import { Projects } from './components/Projects';
import { TerminalPlayground } from './components/TerminalPlayground';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AIAgentChat } from './components/AIAgentChat';

export function App() {
  const [perspective, setPerspective] = useState<'ai' | 'fullstack'>('ai');

  return (
    <div className="min-h-screen bg-[#05070e] text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-200 relative">
      {/* Interactive Neural Canvas Background */}
      <NeuralNetworkCanvas />

      {/* Navigation */}
      <Navbar 
        perspective={perspective} 
        onTogglePerspective={(p) => setPerspective(p)} 
      />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col">
        <Hero perspective={perspective} />

        {/* Live Interactive AI Engineering Lab */}
        <AIEngineeringLab />
        
        {/* Interactive AI Architecture Simulator */}
        <ArchitectureSimulator />

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

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
