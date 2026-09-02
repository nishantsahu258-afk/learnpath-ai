import React from 'react';

// 1. Glowing Pink Browser with Sparkle
export function FrontendBrowserIcon({ className = "text-fuchsia-400" }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg width="34" height="34" viewBox="0 0 32 32" fill="none" className="drop-shadow-[0_0_10px_rgba(217,70,239,0.7)]">
        {/* Sparkle top left */}
        <path d="M4 4 L5 7 L8 8 L5 9 L4 12 L3 9 L0 8 L3 7 Z" fill="#f472b6" />
        
        {/* Outer Browser Window */}
        <rect x="5" y="8" width="24" height="19" rx="3.5" stroke="#d946ef" strokeWidth="2" fill="#180b2a" />
        <line x1="5" y1="14" x2="29" y2="14" stroke="#d946ef" strokeWidth="1.5" />
        
        {/* Window dots */}
        <circle cx="9" cy="11" r="1.2" fill="#ec4899" />
        <circle cx="13" cy="11" r="1.2" fill="#ec4899" />
        <circle cx="17" cy="11" r="1.2" fill="#ec4899" />
        
        {/* Inner layout wireframe */}
        <rect x="8" y="17" width="8" height="7" rx="1.5" stroke="#f472b6" strokeWidth="1.5" fill="#240f3b" />
        <line x1="19" y1="18" x2="26" y2="18" stroke="#f472b6" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="19" y1="22" x2="24" y2="22" stroke="#f472b6" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// 2. Glowing Cyan React Atom
export function ReactAtomIcon({ className = "text-cyan-400" }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg width="34" height="34" viewBox="0 0 32 32" fill="none" className="drop-shadow-[0_0_10px_rgba(56,189,248,0.75)]">
        {/* Central nucleus */}
        <circle cx="16" cy="16" r="2.5" fill="#38bdf8" />
        
        {/* 3 Ellipses */}
        <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#38bdf8" strokeWidth="1.8" />
        <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#38bdf8" strokeWidth="1.8" transform="rotate(60 16 16)" />
        <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#38bdf8" strokeWidth="1.8" transform="rotate(120 16 16)" />
      </svg>
    </div>
  );
}

// 3. Glowing Green Node / JS Hexagon
export function NodeJsHexIcon({ className = "text-emerald-400" }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg width="34" height="34" viewBox="0 0 32 32" fill="none" className="drop-shadow-[0_0_10px_rgba(52,211,153,0.7)]">
        {/* Hexagon shape */}
        <polygon 
          points="16,3 28,10 28,22 16,29 4,22 4,10" 
          stroke="#10b981" 
          strokeWidth="2" 
          strokeLinejoin="round" 
          fill="#071b14" 
        />
        {/* "JS" text stylised */}
        <text 
          x="16" 
          y="20" 
          textAnchor="middle" 
          fill="#34d399" 
          fontSize="11" 
          fontWeight="bold" 
          fontFamily="monospace"
        >
          JS
        </text>
      </svg>
    </div>
  );
}

// 4. Glowing Orange Rocket
export function RocketDeployIcon({ className = "text-orange-400" }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg width="34" height="34" viewBox="0 0 32 32" fill="none" className="drop-shadow-[0_0_10px_rgba(249,115,22,0.75)]">
        {/* Rocket Body */}
        <path 
          d="M26 6 C20 7 14 12 12 17 L15 20 C20 18 25 12 26 6 Z" 
          fill="#2b1112" 
          stroke="#f97316" 
          strokeWidth="1.8" 
          strokeLinejoin="round" 
        />
        {/* Window */}
        <circle cx="19.5" cy="12.5" r="2" fill="#ec4899" stroke="#fb923c" strokeWidth="1.2" />
        
        {/* Left Fin */}
        <path d="M12 17 L8 18 L10 22 L14 20" stroke="#f43f5e" strokeWidth="1.8" fill="#1f0a0d" />
        {/* Right Fin */}
        <path d="M15 20 L14 24 L18 22 L17 18" stroke="#f43f5e" strokeWidth="1.8" fill="#1f0a0d" />
        
        {/* Thrust flames */}
        <path d="M11 21 L6 26 L10 24 Z" fill="#fbbf24" />
        <path d="M13 23 L9 28 L12 25 Z" fill="#ef4444" />
      </svg>
    </div>
  );
}

// Background Cosmic Wave / Mesh in bottom right
export function CosmicBottomWave() {
  return (
    <div className="absolute right-0 bottom-0 w-[550px] h-[280px] pointer-events-none opacity-30 select-none overflow-hidden">
      <svg viewBox="0 0 600 300" className="w-full h-full stroke-purple-500 fill-none">
        <path d="M 0,260 Q 150,200 300,240 T 600,160" stroke="#d946ef" strokeWidth="1.2" strokeDasharray="3 4" />
        <path d="M 50,280 Q 200,220 350,260 T 600,180" stroke="#a855f7" strokeWidth="1" strokeDasharray="2 3" />
        <path d="M 100,300 Q 250,240 400,280 T 600,200" stroke="#c084fc" strokeWidth="0.8" strokeDasharray="4 4" />
        <path d="M 150,320 Q 300,260 450,300 T 600,220" stroke="#e879f9" strokeWidth="0.7" />
        
        {/* Star sparkles */}
        <circle cx="480" cy="190" r="1.5" fill="#f472b6" />
        <circle cx="530" cy="230" r="1.2" fill="#d946ef" />
        <circle cx="410" cy="250" r="1" fill="#c084fc" />
        <circle cx="570" cy="170" r="1.5" fill="#ffffff" />
      </svg>
    </div>
  );
}
