import React from 'react';
import { motion } from 'framer-motion';

interface AIAvatarProps {
  size?: 'sm' | 'md' | 'lg';
  isSpeaking?: boolean;
  className?: string;
  imageSrc?: string;
}

export const AIAvatar: React.FC<AIAvatarProps> = ({ 
  size = 'md', 
  isSpeaking = false,
  className = '',
  imageSrc = '/avatar.png'
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const imageSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  return (
    <div className={`relative flex items-center justify-center select-none ${sizeClasses[size]} ${className}`}>
      {/* Outer ambient holographic glow */}
      <motion.div
        animate={{
          scale: isSpeaking ? [1, 1.25, 1] : [1, 1.1, 1],
          opacity: isSpeaking ? [0.6, 0.9, 0.6] : [0.3, 0.5, 0.3],
        }}
        transition={{
          repeat: Infinity,
          duration: isSpeaking ? 1.2 : 3,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 blur-md pointer-events-none"
      />

      {/* Orbiting Gyroscope Ring (Rotating Clockwise) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: 'linear',
        }}
        className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/50 pointer-events-none"
      />

      {/* Counter-rotating subtle purple accent ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: 'linear',
        }}
        className="absolute -inset-1 rounded-full border border-purple-500/30 pointer-events-none"
      />

      {/* Real AI Stylized Portrait of Uzair */}
      <motion.div
        animate={{
          y: [-1.5, 1.5, -1.5],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: 'easeInOut',
        }}
        className={`relative z-10 rounded-full overflow-hidden border-2 border-cyan-400/80 shadow-md shadow-cyan-950/60 bg-slate-900 ${imageSizes[size]}`}
      >
        <img
          src={imageSrc}
          alt="Uzair AI Avatar"
          className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-300"
        />

        {/* Holographic scanline sheen effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent pointer-events-none animate-pulse" />
      </motion.div>

      {/* Speech Audio Wave Visualizer Bars (when active/speaking) */}
      {isSpeaking && (
        <div className="absolute -bottom-1 z-20 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-slate-950/90 border border-cyan-400/60 shadow-sm">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{
                height: ['3px', '9px', '3px'],
              }}
              transition={{
                repeat: Infinity,
                duration: 0.5,
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
              className="w-0.5 rounded-full bg-cyan-400 inline-block"
            />
          ))}
        </div>
      )}

      {/* Online Status Dot */}
      {!isSpeaking && (
        <span className="absolute -bottom-0.5 -right-0.5 z-20 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-slate-950"></span>
        </span>
      )}
    </div>
  );
};
