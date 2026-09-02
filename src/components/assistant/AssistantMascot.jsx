import React from 'react';

// Small Header Robot Mascot with Cosmic Orbit
export function HeaderRobotMascot() {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      {/* Outer ambient glow */}
      <div className="absolute inset-0 bg-fuchsia-600/30 rounded-full blur-md animate-pulse" />
      
      {/* Orbital ring */}
      <div className="absolute w-14 h-5 rounded-[100%] border border-fuchsia-500/50 -rotate-[25deg] shadow-[0_0_8px_rgba(217,70,239,0.5)] pointer-events-none" />
      
      {/* Core cosmic orb */}
      <div className="relative z-10 w-9 h-9 rounded-full bg-gradient-to-tr from-[#1b0d38] via-[#2f1659] to-[#4c1d95] border border-purple-500/40 flex items-center justify-center shadow-inner">
        {/* Robot face SVG */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d946ef" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_5px_rgba(217,70,239,0.8)]">
          {/* Antenna */}
          <line x1="12" y1="2" x2="12" y2="6" stroke="#f472b6" strokeWidth="2" />
          <circle cx="12" cy="2" r="1" fill="#f472b6" />
          {/* Head */}
          <rect x="4" y="6" width="16" height="14" rx="4" fill="#1b0f33" stroke="#d946ef" strokeWidth="1.8" />
          {/* Eyes */}
          <circle cx="8.5" cy="11" r="1.5" fill="#f472b6" />
          <circle cx="15.5" cy="11" r="1.5" fill="#f472b6" />
          {/* Smile */}
          <path d="M9 15 Q12 17.5 15 15" stroke="#f472b6" strokeWidth="1.8" fill="none" />
          {/* Ears */}
          <rect x="2" y="10" width="2" height="6" rx="1" fill="#a855f7" />
          <rect x="20" y="10" width="2" height="6" rx="1" fill="#a855f7" />
        </svg>
      </div>
    </div>
  );
}

// Hero Floating Cosmic Robot Mascot inside the Main Card
export function HeroCosmicRobot() {
  return (
    <div className="relative w-36 h-36 flex items-center justify-center select-none pointer-events-none mb-3">
      {/* Deep purple/magenta ambient bloom */}
      <div className="absolute inset-2 bg-gradient-to-tr from-purple-700/40 via-fuchsia-600/40 to-pink-500/30 rounded-full blur-2xl" />
      
      {/* Background Star Sparkles */}
      <div className="absolute -top-1 right-5 text-fuchsia-300 text-sm animate-pulse">✦</div>
      <div className="absolute bottom-4 left-3 text-pink-400 text-xs animate-pulse" style={{ animationDelay: '1s' }}>✦</div>
      <div className="absolute top-8 left-4 text-purple-300 text-[10px] animate-ping" style={{ animationDuration: '3s' }}>•</div>
      <div className="absolute bottom-8 right-4 text-pink-300 text-xs animate-pulse" style={{ animationDelay: '1.5s' }}>✦</div>

      {/* Tilted Elliptical Orbital Ring (Front & Back layers) */}
      <div className="absolute w-44 h-14 rounded-[100%] border border-fuchsia-400/40 -rotate-[22deg] shadow-[0_0_15px_rgba(217,70,239,0.35)]" />
      <div className="absolute w-44 h-14 rounded-[100%] border-t border-r border-fuchsia-300/80 -rotate-[22deg] blur-[0.5px]" />

      {/* Floating Main Celestial Orb */}
      <div className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-b from-[#3b1261] via-[#210942] to-[#120524] border border-fuchsia-500/40 shadow-[0_0_30px_rgba(168,85,247,0.5)] flex items-center justify-center animate-[bounce_4s_ease-in-out_infinite]">
        
        {/* Inner glow highlight */}
        <div className="absolute inset-1 rounded-full bg-gradient-to-tr from-transparent via-transparent to-fuchsia-400/20 pointer-events-none" />

        {/* Mascot Robot Face */}
        <svg width="48" height="48" viewBox="0 0 32 32" fill="none" className="drop-shadow-[0_0_10px_rgba(217,70,239,0.9)]">
          {/* Antenna */}
          <line x1="16" y1="3" x2="16" y2="8" stroke="#f472b6" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="16" cy="3" r="1.8" fill="#f472b6" />
          
          {/* Ears / Side nubs */}
          <rect x="3.5" y="13" width="2" height="7" rx="1" fill="#ec4899" />
          <rect x="26.5" y="13" width="2" height="7" rx="1" fill="#ec4899" />
          
          {/* Head shell */}
          <rect x="5.5" y="8" width="21" height="17" rx="5" fill="#1b0b30" stroke="url(#mascotGrad)" strokeWidth="2" />
          
          {/* Digital Screen Face */}
          <rect x="8" y="10.5" width="16" height="12" rx="3" fill="#100522" />
          
          {/* Eyes (Glowing rounded rectangles / pills) */}
          <rect x="10.5" y="13.5" width="3" height="3" rx="1" fill="#f472b6" className="animate-pulse" />
          <rect x="18.5" y="13.5" width="3" height="3" rx="1" fill="#f472b6" className="animate-pulse" />
          
          {/* Friendly curved smile */}
          <path d="M12 18.5 Q16 21 20 18.5" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" fill="none" />
          
          <defs>
            <linearGradient id="mascotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="50%" stopColor="#d946ef" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>

      </div>
    </div>
  );
}

// Bot Chat Bubble Avatar
export function BotMessageAvatar() {
  return (
    <div className="w-9 h-9 rounded-full bg-[#1b0d36] border border-fuchsia-500/40 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(217,70,239,0.3)]">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d946ef" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="2" x2="12" y2="6" />
        <circle cx="12" cy="2" r="1" fill="#d946ef" />
        <rect x="4" y="6" width="16" height="14" rx="4" fill="#130826" stroke="#d946ef" strokeWidth="1.8" />
        <circle cx="9" cy="11" r="1.5" fill="#f472b6" />
        <circle cx="15" cy="11" r="1.5" fill="#f472b6" />
        <path d="M9 15 Q12 17.5 15 15" stroke="#f472b6" strokeWidth="1.8" fill="none" />
      </svg>
    </div>
  );
}
