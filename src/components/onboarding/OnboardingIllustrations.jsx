import { Target, Flag, Clock, GraduationCap, Sparkle } from '@phosphor-icons/react';

/**
 * Top-Right Header Orbit Graphic matching reference image
 */
export function HeaderOrbitGraphic() {
  return (
    <div className="relative w-48 h-20 hidden lg:flex items-center justify-center select-none pointer-events-none shrink-0">
      {/* Outer Glow */}
      <div className="absolute w-28 h-28 bg-purple-600/20 rounded-full blur-xl" />

      {/* Tilted Orbit Ring 1 */}
      <div 
        className="absolute w-40 h-14 rounded-[100%] border border-purple-500/25 rotate-[-12deg]"
        style={{ boxShadow: '0 0 12px rgba(168, 85, 247, 0.15)' }}
      />
      {/* Tilted Orbit Ring 2 */}
      <div 
        className="absolute w-36 h-12 rounded-[100%] border border-pink-500/20 rotate-[18deg]"
      />

      {/* Floating Badges on Orbits */}
      {/* 1. Target */}
      <div className="absolute left-2 bottom-3 w-6 h-6 rounded-full bg-[#18122B] border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-[0_0_8px_rgba(168,85,247,0.4)]">
        <Target size={12} weight="duotone" />
      </div>
      {/* 2. Flag */}
      <div className="absolute right-3 top-2 w-6 h-6 rounded-full bg-[#18122B] border border-pink-500/40 flex items-center justify-center text-pink-300 shadow-[0_0_8px_rgba(244,114,182,0.4)]">
        <Flag size={12} weight="duotone" />
      </div>
      {/* 3. Clock */}
      <div className="absolute right-2 bottom-2 w-6 h-6 rounded-full bg-[#18122B] border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-[0_0_8px_rgba(168,85,247,0.4)]">
        <Clock size={12} weight="duotone" />
      </div>
      {/* 4. Graduation Cap */}
      <div className="absolute bottom-0 right-12 w-6 h-6 rounded-full bg-[#18122B] border border-pink-500/40 flex items-center justify-center text-pink-300 shadow-[0_0_8px_rgba(244,114,182,0.4)]">
        <GraduationCap size={12} weight="duotone" />
      </div>

      {/* Center Glowing Orb */}
      <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-tr from-purple-800 via-fuchsia-600 to-pink-500 p-0.5 shadow-[0_0_20px_rgba(217,70,239,0.7)] flex items-center justify-center">
        <div className="w-full h-full rounded-full bg-[#120a26]/80 flex items-center justify-center backdrop-blur-sm">
          <Sparkle size={20} weight="fill" className="text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
        </div>
      </div>
    </div>
  );
}

/**
 * Step 1 Illustration: 3D Bullseye with Neon Dart (Exact match to reference image)
 */
export function GoalDartboardIllustration() {
  return (
    <div className="relative w-full max-w-[170px] aspect-square flex items-center justify-center mx-auto select-none">
      {/* Ambient background glow */}
      <div className="absolute w-44 h-44 rounded-full bg-fuchsia-600/25 blur-3xl" />

      {/* SVG 3D Target board with perspective and neon pink dart */}
      <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]">
        <defs>
          <radialGradient id="targetPlate" cx="45%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#2e1065" />
            <stop offset="60%" stopColor="#1e0a3d" />
            <stop offset="100%" stopColor="#0b031c" />
          </radialGradient>
          <linearGradient id="neonPink" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#db2777" />
          </linearGradient>
          <linearGradient id="neonPurple" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Shadow Ellipse (Base) */}
        <ellipse cx="115" cy="180" rx="75" ry="18" fill="rgba(0,0,0,0.6)" filter="blur(4px)" />

        {/* Concentric Base Rings */}
        <ellipse cx="115" cy="175" rx="70" ry="14" fill="#17092b" stroke="#7c3aed" strokeWidth="1" opacity="0.6" />
        <ellipse cx="115" cy="172" rx="55" ry="11" fill="#200a3d" stroke="#c084fc" strokeWidth="1" opacity="0.8" />

        {/* Standing 3D Target Board (Tilted Angle) */}
        <g transform="translate(15, 5)">
          {/* Back rim */}
          <circle cx="100" cy="120" r="72" fill="#0f0521" stroke="#3b0764" strokeWidth="8" />
          
          {/* Outer Ring */}
          <circle cx="100" cy="120" r="68" fill="url(#targetPlate)" stroke="#6b21a8" strokeWidth="2" />
          <circle cx="100" cy="120" r="66" fill="none" stroke="#d946ef" strokeWidth="2" opacity="0.7" filter="url(#glow)" />
          
          {/* Middle Ring */}
          <circle cx="100" cy="120" r="48" fill="#1a0833" stroke="#9333ea" strokeWidth="4" />
          <circle cx="100" cy="120" r="46" fill="none" stroke="#ec4899" strokeWidth="2.5" opacity="0.9" filter="url(#glow)" />
          
          {/* Inner Ring */}
          <circle cx="100" cy="120" r="28" fill="#240b45" stroke="#a855f7" strokeWidth="4" />
          <circle cx="100" cy="120" r="26" fill="none" stroke="#f472b6" strokeWidth="2" filter="url(#glow)" />
          
          {/* Bullseye Core */}
          <circle cx="100" cy="120" r="12" fill="url(#neonPink)" filter="url(#glow)" />
          <circle cx="100" cy="120" r="6" fill="#ffffff" />

          {/* Neon Dart embedded at the center */}
          <g transform="rotate(38 100 120)">
            {/* Dart Shaft */}
            <line x1="100" y1="120" x2="165" y2="120" stroke="#f472b6" strokeWidth="3" filter="url(#glow)" />
            <line x1="100" y1="120" x2="165" y2="120" stroke="#ffffff" strokeWidth="1.5" />
            
            {/* Dart Fins / Flights */}
            <polygon points="155,120 178,108 172,120" fill="url(#neonPink)" filter="url(#glow)" />
            <polygon points="155,120 178,132 172,120" fill="url(#neonPink)" filter="url(#glow)" />
            <polygon points="160,120 185,116 180,120" fill="#fbcfe8" />
            <polygon points="160,120 185,124 180,120" fill="#fbcfe8" />
          </g>
        </g>
      </svg>
    </div>
  );
}

/**
 * Step 2 Illustration: Mission Rocket / Purpose Compass
 */
export function PurposeIllustration() {
  return (
    <div className="relative w-full max-w-[170px] aspect-square flex items-center justify-center mx-auto select-none">
      <div className="absolute w-44 h-44 rounded-full bg-pink-600/25 blur-3xl" />
      <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]">
        <defs>
          <filter id="glow2" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Orbit Rings */}
        <ellipse cx="120" cy="130" rx="80" ry="30" fill="none" stroke="#7c3aed" strokeWidth="1.5" opacity="0.5" strokeDasharray="4 4" transform="rotate(-15 120 130)" />
        <ellipse cx="120" cy="130" rx="60" ry="22" fill="none" stroke="#ec4899" strokeWidth="2" opacity="0.8" transform="rotate(20 120 130)" />

        {/* Central Compass / Beacon */}
        <circle cx="120" cy="120" r="50" fill="#14082b" stroke="#a855f7" strokeWidth="2" />
        <circle cx="120" cy="120" r="42" fill="#1d0d3d" stroke="#f472b6" strokeWidth="1.5" opacity="0.8" />
        
        {/* Needle / Rocket vector */}
        <polygon points="120,80 132,120 120,112 108,120" fill="#f472b6" filter="url(#glow2)" />
        <polygon points="120,160 132,120 120,128 108,120" fill="#7c3aed" />
        <circle cx="120" cy="120" r="6" fill="#ffffff" />
      </svg>
    </div>
  );
}

/**
 * Step 3 Illustration: 3-Tier Skill Gauge / Mastery Pyramid
 */
export function SkillLevelIllustration() {
  return (
    <div className="relative w-full max-w-[170px] aspect-square flex items-center justify-center mx-auto select-none">
      <div className="absolute w-44 h-44 rounded-full bg-purple-600/25 blur-3xl" />
      <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]">
        <defs>
          <filter id="glow3" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Tier 1 (Base - Beginner) */}
        <polygon points="60,170 180,170 160,140 80,140" fill="#240b45" stroke="#7c3aed" strokeWidth="2" />
        
        {/* Tier 2 (Middle - Intermediate) */}
        <polygon points="76,134 164,134 146,104 94,104" fill="#3b0f69" stroke="#c084fc" strokeWidth="2" />
        
        {/* Tier 3 (Peak - Advanced) */}
        <polygon points="90,98 150,98 120,60" fill="#ec4899" stroke="#f472b6" strokeWidth="2" filter="url(#glow3)" />

        {/* Floating Mastery Star */}
        <circle cx="120" cy="46" r="8" fill="#ffffff" filter="url(#glow3)" />
      </svg>
    </div>
  );
}

/**
 * Step 4 Illustration: Cosmic Chronometer / Hourglass
 */
export function TimeCommitmentIllustration() {
  return (
    <div className="relative w-full max-w-[170px] aspect-square flex items-center justify-center mx-auto select-none">
      <div className="absolute w-44 h-44 rounded-full bg-pink-600/25 blur-3xl" />
      <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]">
        <defs>
          <filter id="glow4" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Hourglass Frame */}
        <path d="M85,70 L155,70 L125,120 L155,170 L85,170 L115,120 Z" fill="#1a0833" stroke="#a855f7" strokeWidth="2.5" />
        
        {/* Glowing Sand in Top Chamber */}
        <polygon points="95,80 145,80 120,110" fill="#f472b6" opacity="0.8" filter="url(#glow4)" />
        
        {/* Sand Stream */}
        <line x1="120" y1="110" x2="120" y2="145" stroke="#ffffff" strokeWidth="2" strokeDasharray="3 2" />

        {/* Glowing Sand in Bottom Chamber */}
        <polygon points="120,145 140,165 100,165" fill="#ec4899" filter="url(#glow4)" />

        {/* Orbit ring around the waist */}
        <ellipse cx="120" cy="120" rx="35" ry="10" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

/**
 * Step 5 Illustration: Synaptic Learning Prism
 */
export function LearningStyleIllustration() {
  return (
    <div className="relative w-full max-w-[170px] aspect-square flex items-center justify-center mx-auto select-none">
      <div className="absolute w-44 h-44 rounded-full bg-fuchsia-600/25 blur-3xl" />
      <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]">
        <defs>
          <filter id="glow5" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Connected Synaptic Nodes */}
        <line x1="120" y1="75" x2="75" y2="140" stroke="#7c3aed" strokeWidth="2" opacity="0.7" />
        <line x1="120" y1="75" x2="165" y2="140" stroke="#ec4899" strokeWidth="2" opacity="0.7" />
        <line x1="75" y1="140" x2="165" y2="140" stroke="#c084fc" strokeWidth="2" opacity="0.7" />

        {/* Nodes */}
        <circle cx="120" cy="75" r="14" fill="#a855f7" filter="url(#glow5)" />
        <circle cx="75" cy="140" r="14" fill="#ec4899" filter="url(#glow5)" />
        <circle cx="165" cy="140" r="14" fill="#38bdf8" filter="url(#glow5)" />

        {/* Inner highlights */}
        <circle cx="120" cy="75" r="6" fill="#ffffff" />
        <circle cx="75" cy="140" r="6" fill="#ffffff" />
        <circle cx="165" cy="140" r="6" fill="#ffffff" />

        {/* Center Spark */}
        <circle cx="120" cy="120" r="8" fill="#ffffff" filter="url(#glow5)" />
      </svg>
    </div>
  );
}
