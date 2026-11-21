import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  layer: number;
  pulsePhase: number;
}

interface Pulse {
  fromIndex: number;
  toIndex: number;
  progress: number;
  speed: number;
}

export const NeuralNetworkCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse tracking
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 140,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Particle nodes count based on screen size
    const nodeCount = Math.floor(Math.min(width, 1600) / 22);
    const particles: Particle[] = [];
    const pulses: Pulse[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const radius = Math.random() * 2.2 + 1.2;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        radius: radius,
        baseRadius: radius,
        layer: Math.floor(Math.random() * 3), // 0: cyan, 1: purple, 2: emerald
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    const maxDistance = 145;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      const connectedPairs: [number, number][] = [];

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            connectedPairs.push([i, j]);
            const alpha = (1 - dist / maxDistance) * 0.22;
            
            // Choose subtle gradient
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Randomly spawn synaptic pulses
      if (Math.random() < 0.08 && connectedPairs.length > 0 && pulses.length < 25) {
        const pair = connectedPairs[Math.floor(Math.random() * connectedPairs.length)];
        pulses.push({
          fromIndex: pair[0],
          toIndex: pair[1],
          progress: 0,
          speed: Math.random() * 0.02 + 0.015,
        });
      }

      // Update & draw pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed;

        if (p.progress >= 1) {
          pulses.splice(i, 1);
          continue;
        }

        const from = particles[p.fromIndex];
        const to = particles[p.toIndex];
        if (!from || !to) {
          pulses.splice(i, 1);
          continue;
        }

        const px = from.x + (to.x - from.x) * p.progress;
        const py = from.y + (to.y - from.y) * p.progress;

        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = '#00f2fe';
        ctx.shadowColor = '#00f2fe';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Update & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce from walls
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse interaction
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mDist < mouse.radius) {
          const force = (1 - mDist / mouse.radius) * 1.5;
          p.x += (mdx / mDist) * force * 2;
          p.y += (mdy / mDist) * force * 2;
          p.radius = p.baseRadius * 1.8;
        } else {
          p.radius = p.baseRadius;
        }

        p.pulsePhase += 0.03;
        const pulseFactor = Math.sin(p.pulsePhase) * 0.3 + 1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * pulseFactor, 0, Math.PI * 2);

        if (p.layer === 0) {
          ctx.fillStyle = 'rgba(0, 242, 254, 0.75)';
          ctx.shadowColor = '#00f2fe';
        } else if (p.layer === 1) {
          ctx.fillStyle = 'rgba(168, 85, 247, 0.75)';
          ctx.shadowColor = '#a855f7';
        } else {
          ctx.fillStyle = 'rgba(52, 211, 153, 0.75)';
          ctx.shadowColor = '#34d399';
        }

        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-45"
      aria-hidden="true"
    />
  );
};
