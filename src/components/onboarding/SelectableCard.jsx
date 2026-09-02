import { useState, useRef } from 'react';
import { CheckCircle } from '@phosphor-icons/react';

export function SelectableCard({
  title,
  description,
  icon: Icon,
  isSelected,
  onClick,
  className = '',
  compact = false
}) {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top;  // y position within the element
    
    setMousePosition({ x, y });
    
    // Calculate 3D tilt
    // Subtle tilt: max rotation 4 degrees
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4; 
    const rotateY = ((x - centerX) / centerX) * 4;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform(''); // Reset tilt
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transform,
        transition: isHovered ? 'none' : 'transform 0.4s ease-out'
      }}
      className={`relative rounded-xl transition-all duration-300 cursor-pointer text-left overflow-hidden select-none outline-none group ${
        compact ? 'p-2 sm:p-2.5' : 'p-2.5 sm:p-3'
      } ${
        isSelected
          ? 'bg-[#180d30]/95 border border-fuchsia-500 shadow-[0_0_20px_rgba(217,70,239,0.25)]'
          : 'bg-[#0e0f24]/75 border border-slate-800/80 hover:border-slate-700 hover:bg-[#151736]/90'
      } ${className}`}
    >
      {/* 1️⃣ Mouse Spotlight + Border Reveal */}
      <div 
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(217, 70, 239, 0.15), transparent 40%)`,
        }}
      />
      <div 
        className="pointer-events-none absolute -inset-px rounded-xl border border-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(217, 70, 239, 0.4), transparent 40%) border-box`,
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      <div className="flex items-start gap-2.5 sm:gap-3 relative z-10">
        {/* Icon */}
        {Icon && (
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 mt-0.5 ${
              isSelected
                ? 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/40 shadow-inner'
                : 'bg-slate-800/60 text-slate-400 border border-slate-700/50 group-hover:text-fuchsia-300 group-hover:border-fuchsia-500/30 group-hover:bg-fuchsia-500/10'
            }`}
          >
            <Icon size={18} weight={isSelected ? "fill" : "duotone"} className="transition-transform duration-300 group-hover:scale-110" />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 pr-5">
          <h4 className="font-semibold text-xs sm:text-sm text-white tracking-tight leading-snug">
            {title}
          </h4>
          {description && (
            <p className="text-[11px] sm:text-xs text-slate-400 leading-normal font-normal mt-0.5 group-hover:text-slate-300 transition-colors">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Selected Checkmark Badge (Top Right) */}
      {isSelected && (
        <div className="absolute top-2.5 right-2.5 z-10 animate-in fade-in zoom-in-75 duration-200">
          <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-fuchsia-600 to-purple-500 flex items-center justify-center text-white shadow-[0_0_10px_rgba(217,70,239,0.5)]">
            <CheckCircle size={14} weight="bold" />
          </div>
        </div>
      )}

      {/* Subtle bottom-right static glow when selected */}
      <div
        className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full blur-xl pointer-events-none transition-opacity duration-300 ${
          isSelected ? 'bg-fuchsia-600/20 opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
