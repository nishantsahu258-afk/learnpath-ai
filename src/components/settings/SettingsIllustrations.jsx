import React from 'react';

export function SettingsTargetGraphic() {
  return (
    <div className="relative w-40 h-40 flex items-center justify-center pointer-events-none">
      {/* Glow / Pedestal */}
      <div className="absolute bottom-2 w-32 h-8 rounded-[100%] bg-fuchsia-600/30 blur-xl" />
      <div className="absolute bottom-4 w-24 h-4 rounded-[100%] bg-fuchsia-500/40 blur-md" />
      <div className="absolute bottom-5 w-20 h-2 rounded-[100%] border border-fuchsia-400/50 shadow-[0_0_15px_rgba(217,70,239,0.8)]" />
      
      {/* Floating Target */}
      <div className="relative z-10 animate-[bounce_4s_ease-in-out_infinite]">
        <svg width="100" height="100" viewBox="0 0 100 100" className="drop-shadow-[0_0_15px_rgba(217,70,239,0.6)]">
          {/* Target Base */}
          <circle cx="50" cy="50" r="40" fill="#1e1136" stroke="url(#targetGrad1)" strokeWidth="3" />
          <circle cx="50" cy="50" r="30" fill="transparent" stroke="url(#targetGrad2)" strokeWidth="6" />
          <circle cx="50" cy="50" r="15" fill="url(#targetGrad3)" />
          
          {/* Arrow */}
          <path d="M75,25 L55,45" stroke="#ec4899" strokeWidth="4" strokeLinecap="round" />
          <path d="M75,25 L85,20 L80,30 Z" fill="#d946ef" />
          
          <defs>
            <linearGradient id="targetGrad1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <linearGradient id="targetGrad2" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d946ef" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
            <radialGradient id="targetGrad3" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#9333ea" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      
      {/* Sparkles */}
      <div className="absolute top-8 left-4 w-1.5 h-1.5 bg-fuchsia-300 rounded-full blur-[1px] animate-pulse" />
      <div className="absolute bottom-12 right-6 w-2 h-2 bg-pink-400 rounded-full blur-[1px] animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  );
}

export function SettingsShieldGraphic() {
  return (
    <div className="relative w-40 h-40 flex items-center justify-center pointer-events-none">
      {/* Glow / Pedestal */}
      <div className="absolute bottom-2 w-32 h-8 rounded-[100%] bg-indigo-600/30 blur-xl" />
      <div className="absolute bottom-4 w-28 h-6 rounded-[100%] border border-indigo-400/30" style={{ transform: 'rotateX(70deg)' }} />
      <div className="absolute bottom-4 w-24 h-4 rounded-[100%] bg-indigo-500/40 blur-md shadow-[0_0_15px_rgba(99,102,241,0.6)]" />
      
      {/* Orbiting ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-12 rounded-[100%] border-t-2 border-l-2 border-fuchsia-500/60 rotate-[-15deg] blur-[0.5px] shadow-[0_0_10px_rgba(217,70,239,0.5)] z-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-12 rounded-[100%] border-b-2 border-r-2 border-fuchsia-500/20 rotate-[-15deg] z-0" />

      {/* Floating Shield */}
      <div className="relative z-10 animate-[bounce_3s_ease-in-out_infinite]" style={{ animationDelay: '0.5s' }}>
        <svg width="90" height="100" viewBox="0 0 90 100" className="drop-shadow-[0_0_20px_rgba(139,92,246,0.6)]">
          <path 
            d="M45,5 L85,20 L85,50 C85,75 45,95 45,95 C45,95 5,75 5,50 L5,20 Z" 
            fill="url(#shieldGrad1)" 
            stroke="url(#shieldGrad2)" 
            strokeWidth="3" 
            strokeLinejoin="round" 
          />
          <path 
            d="M45,5 L45,95 C45,95 5,75 5,50 L5,20 Z" 
            fill="rgba(255,255,255,0.05)" 
          />
          {/* Padlock */}
          <rect x="35" y="45" width="20" height="16" rx="4" fill="#f472b6" />
          <path d="M39,45 L39,38 C39,32 51,32 51,38 L51,45" fill="none" stroke="#f472b6" strokeWidth="4" strokeLinecap="round" />
          
          <defs>
            <linearGradient id="shieldGrad1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#31175e" />
              <stop offset="100%" stopColor="#1e1140" />
            </linearGradient>
            <linearGradient id="shieldGrad2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#d946ef" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Sparkles */}
      <div className="absolute top-10 right-4 w-1.5 h-1.5 bg-indigo-300 rounded-full blur-[1px] animate-pulse" />
      <div className="absolute bottom-16 left-6 w-2 h-2 bg-fuchsia-400 rounded-full blur-[1px] animate-pulse" style={{ animationDelay: '1.5s' }} />
    </div>
  );
}

export function SettingsDangerGraphic() {
  return (
    <div className="relative w-40 h-40 flex items-center justify-center pointer-events-none">
      {/* Glow / Pedestal */}
      <div className="absolute bottom-2 w-32 h-8 rounded-[100%] bg-red-600/30 blur-xl" />
      <div className="absolute bottom-4 w-28 h-6 rounded-[100%] border border-red-500/40" style={{ transform: 'rotateX(70deg)' }} />
      <div className="absolute bottom-5 w-24 h-4 rounded-[100%] bg-red-500/40 blur-md shadow-[0_0_20px_rgba(239,68,68,0.7)]" />
      
      {/* Floating Trash Can */}
      <div className="relative z-10 animate-[bounce_4s_ease-in-out_infinite]" style={{ animationDelay: '1s' }}>
        <svg width="80" height="90" viewBox="0 0 80 90" className="drop-shadow-[0_0_15px_rgba(239,68,68,0.7)]">
          {/* Lid */}
          <path d="M20,20 L60,20 L65,25 L15,25 Z" fill="url(#trashGrad1)" stroke="#ef4444" strokeWidth="2" strokeLinejoin="round" />
          <rect x="35" y="15" width="10" height="5" rx="2" fill="#ef4444" />
          
          {/* Body */}
          <path d="M22,25 L58,25 L54,80 L26,80 Z" fill="url(#trashGrad2)" stroke="#ef4444" strokeWidth="2" strokeLinejoin="round" />
          
          {/* Ribs */}
          <line x1="30" y1="35" x2="33" y2="70" stroke="#f87171" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <line x1="40" y1="35" x2="40" y2="70" stroke="#f87171" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <line x1="50" y1="35" x2="47" y2="70" stroke="#f87171" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          
          <defs>
            <linearGradient id="trashGrad1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7f1d1d" />
              <stop offset="100%" stopColor="#450a0a" />
            </linearGradient>
            <linearGradient id="trashGrad2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#450a0a" />
              <stop offset="50%" stopColor="#7f1d1d" />
              <stop offset="100%" stopColor="#450a0a" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Sparkles */}
      <div className="absolute top-12 left-6 w-1.5 h-1.5 bg-red-400 rounded-full blur-[1px] animate-pulse" />
      <div className="absolute bottom-10 right-4 w-2 h-2 bg-rose-400 rounded-full blur-[1px] animate-pulse" style={{ animationDelay: '0.8s' }} />
    </div>
  );
}
