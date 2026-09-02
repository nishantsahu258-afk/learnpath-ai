/**
 * Glowing 3D Target Bullseye for Dashboard Goal Card
 */
export function DashboardDartboard() {
  return (
    <div className="relative w-28 h-28 shrink-0 flex items-center justify-center select-none pointer-events-none">
      <div className="absolute w-20 h-20 bg-fuchsia-600/25 rounded-full blur-xl" />
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
        <defs>
          <radialGradient id="dashTargetPlate" cx="45%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#2e1065" />
            <stop offset="70%" stopColor="#180730" />
            <stop offset="100%" stopColor="#080214" />
          </radialGradient>
          <linearGradient id="dashNeonPink" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <filter id="dashGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Base shadow */}
        <ellipse cx="100" cy="165" rx="60" ry="12" fill="rgba(0,0,0,0.6)" filter="blur(3px)" />
        <ellipse cx="100" cy="160" rx="55" ry="10" fill="#1b0833" stroke="#a855f7" strokeWidth="1" opacity="0.7" />

        {/* Board */}
        <g transform="translate(0, -5)">
          <circle cx="100" cy="100" r="62" fill="url(#dashTargetPlate)" stroke="#7c3aed" strokeWidth="4" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="#d946ef" strokeWidth="1.5" opacity="0.8" filter="url(#dashGlow)" />
          
          <circle cx="100" cy="100" r="42" fill="#16082b" stroke="#9333ea" strokeWidth="3" />
          <circle cx="100" cy="100" r="40" fill="none" stroke="#ec4899" strokeWidth="2" opacity="0.9" filter="url(#dashGlow)" />
          
          <circle cx="100" cy="100" r="24" fill="#240b45" stroke="#c084fc" strokeWidth="3" />
          <circle cx="100" cy="100" r="22" fill="none" stroke="#f472b6" strokeWidth="1.5" filter="url(#dashGlow)" />

          {/* Bullseye Center */}
          <circle cx="100" cy="100" r="10" fill="url(#dashNeonPink)" filter="url(#dashGlow)" />
          <circle cx="100" cy="100" r="4" fill="#ffffff" />

          {/* Embedded Neon Dart */}
          <g transform="rotate(36 100 100)">
            <line x1="100" y1="100" x2="155" y2="100" stroke="#f472b6" strokeWidth="2.5" filter="url(#dashGlow)" />
            <line x1="100" y1="100" x2="155" y2="100" stroke="#ffffff" strokeWidth="1" />
            <polygon points="145,100 166,90 160,100" fill="url(#dashNeonPink)" filter="url(#dashGlow)" />
            <polygon points="145,100 166,110 160,100" fill="url(#dashNeonPink)" filter="url(#dashGlow)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

/**
 * Undulating Neon Waypoint Path for Dashboard Duration Card
 */
export function DashboardWaypointCurve() {
  return (
    <div className="relative w-full h-12 select-none pointer-events-none mt-2">
      <svg viewBox="0 0 240 50" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="35%" stopColor="#818cf8" />
            <stop offset="70%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>
          <filter id="curveGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient glow stroke */}
        <path
          d="M10,38 C50,42 80,28 120,32 C160,36 190,14 230,12"
          fill="none"
          stroke="url(#curveGradient)"
          strokeWidth="3"
          filter="url(#curveGlow)"
          opacity="0.85"
        />
        {/* Core crisp stroke */}
        <path
          d="M10,38 C50,42 80,28 120,32 C160,36 190,14 230,12"
          fill="none"
          stroke="url(#curveGradient)"
          strokeWidth="1.5"
        />

        {/* Waypoint glowing nodes */}
        {/* Node 1 */}
        <circle cx="50" cy="39" r="3.5" fill="#38bdf8" filter="url(#curveGlow)" />
        <circle cx="50" cy="39" r="1.5" fill="#ffffff" />

        {/* Node 2 */}
        <circle cx="105" cy="30" r="3.5" fill="#818cf8" filter="url(#curveGlow)" />
        <circle cx="105" cy="30" r="1.5" fill="#ffffff" />

        {/* Node 3 */}
        <circle cx="150" cy="34" r="3.5" fill="#a855f7" filter="url(#curveGlow)" />
        <circle cx="150" cy="34" r="1.5" fill="#ffffff" />

        {/* Node 4 */}
        <circle cx="190" cy="20" r="4" fill="#ec4899" filter="url(#curveGlow)" />
        <circle cx="190" cy="20" r="2" fill="#ffffff" />

        {/* Node 5 (Peak) */}
        <circle cx="230" cy="12" r="4.5" fill="#f472b6" filter="url(#curveGlow)" />
        <circle cx="230" cy="12" r="2" fill="#ffffff" />
      </svg>
    </div>
  );
}

/**
 * 3D Glowing Cosmic Hourglass for Dashboard Commitment Card
 */
export function DashboardHourglass() {
  return (
    <div className="relative w-28 h-28 shrink-0 flex items-center justify-center select-none pointer-events-none">
      <div className="absolute w-20 h-20 bg-amber-600/20 rounded-full blur-xl" />
      <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
        <defs>
          <linearGradient id="glassFrame" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#9a3412" />
          </linearGradient>
          <linearGradient id="amberSand" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <filter id="glassGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Base shadow & rings */}
        <ellipse cx="80" cy="142" rx="45" ry="9" fill="rgba(0,0,0,0.6)" filter="blur(2px)" />
        <ellipse cx="80" cy="138" rx="40" ry="7" fill="#1c0f06" stroke="#f59e0b" strokeWidth="1.5" opacity="0.8" />
        <ellipse cx="80" cy="22" rx="40" ry="7" fill="#1c0f06" stroke="#f59e0b" strokeWidth="1.5" opacity="0.8" />

        {/* Hourglass Bulb Geometry */}
        {/* Top Bulb */}
        <path
          d="M50,26 C50,55 74,75 80,80 C86,75 110,55 110,26 Z"
          fill="#140a1c"
          stroke="url(#glassFrame)"
          strokeWidth="2.5"
          opacity="0.9"
        />
        {/* Bottom Bulb */}
        <path
          d="M50,134 C50,105 74,85 80,80 C86,85 110,105 110,134 Z"
          fill="#140a1c"
          stroke="url(#glassFrame)"
          strokeWidth="2.5"
          opacity="0.9"
        />

        {/* Glowing Sand in Top Bulb */}
        <path
          d="M58,38 C60,55 76,70 80,75 C84,70 100,55 102,38 Z"
          fill="url(#amberSand)"
          opacity="0.75"
          filter="url(#glassGlow)"
        />

        {/* Sand Stream Trickle */}
        <line x1="80" y1="75" x2="80" y2="105" stroke="#fde047" strokeWidth="2" strokeDasharray="3 2" filter="url(#glassGlow)" />

        {/* Sand Pile in Bottom Bulb */}
        <path
          d="M62,130 C66,115 76,108 80,105 C84,108 94,115 98,130 Z"
          fill="url(#amberSand)"
          filter="url(#glassGlow)"
        />

        {/* Ambient glass reflections */}
        <path d="M54,34 C54,50 68,68 72,74" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.4" />
        <path d="M54,126 C54,110 68,92 72,86" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.4" />
      </svg>
    </div>
  );
}

/**
 * 3D Isometric Laptop with Glowing Code for Dashboard Next Up Card
 */
export function DashboardIsometricLaptop() {
  return (
    <div className="relative w-44 h-40 shrink-0 hidden sm:flex items-center justify-center select-none pointer-events-none">
      <div className="absolute w-36 h-36 bg-fuchsia-600/20 rounded-full blur-2xl" />
      <svg viewBox="0 0 200 180" className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]">
        <defs>
          <linearGradient id="screenBorder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="50%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          <linearGradient id="screenBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e0a38" />
            <stop offset="100%" stopColor="#0b0319" />
          </linearGradient>
          <filter id="laptopGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Base / Keyboard Platform (Isometric Diamond) */}
        {/* Base Shadow */}
        <polygon points="100,165 175,130 100,105 25,130" fill="rgba(0,0,0,0.6)" filter="blur(3px)" />
        
        {/* Base Bottom Edge */}
        <polygon points="25,130 100,165 100,172 25,137" fill="#150826" />
        <polygon points="100,165 175,130 175,137 100,172" fill="#0f041d" />

        {/* Base Top Surface */}
        <polygon points="100,163 173,129 100,104 27,129" fill="#1c0b33" stroke="#a855f7" strokeWidth="1" />

        {/* Glowing Keyboard Grid Lines */}
        <polygon points="100,154 158,128 100,110 42,128" fill="#291147" stroke="#ec4899" strokeWidth="0.8" opacity="0.8" />
        <line x1="60" y1="126" x2="140" y2="126" stroke="#c084fc" strokeWidth="0.7" opacity="0.6" />
        <line x1="75" y1="135" x2="125" y2="135" stroke="#c084fc" strokeWidth="0.7" opacity="0.6" />

        {/* Laptop Screen (Upright Isometric Polygon) */}
        {/* Screen Bezel Outer */}
        <polygon points="100,20 173,56 173,126 100,90" fill="url(#screenBg)" stroke="url(#screenBorder)" strokeWidth="2.5" />

        {/* Inner Screen Display */}
        <polygon points="104,26 168,58 168,120 104,88" fill="#120424" />

        {/* Glowing Code Brackets </> on Screen */}
        <g transform="translate(136, 74) scale(0.65)">
          {/* Left Bracket < */}
          <path d="M-18,-14 L-32,0 L-18,14" fill="none" stroke="#f472b6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" filter="url(#laptopGlow)" />
          <path d="M-18,-14 L-32,0 L-18,14" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Slash / */}
          <line x1="-5" y1="16" x2="5" y2="-16" stroke="#d946ef" strokeWidth="4" strokeLinecap="round" filter="url(#laptopGlow)" />
          <line x1="-5" y1="16" x2="5" y2="-16" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />

          {/* Right Bracket > */}
          <path d="M18,-14 L32,0 L18,14" fill="none" stroke="#f472b6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" filter="url(#laptopGlow)" />
          <path d="M18,-14 L32,0 L18,14" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}
