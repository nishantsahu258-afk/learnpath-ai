import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  X, 
  Sparkle, 
  SquaresFour, 
  BookOpen, 
  ListBullets, 
  Target, 
  Gear, 
  ArrowCounterClockwise 
} from '@phosphor-icons/react';
import { useLearning } from '../../context/LearningContext';

/**
 * Mobile Navigation Drawer (<768px)
 * Accessible slide-in navigation panel featuring:
 * - 280px width with smooth 250-300ms translateX animation
 * - Full backdrop blur overlay
 * - Automatic body scroll lock and restore
 * - Escape key & click-outside listeners
 * - Navigation links matching desktop sidebar
 */
export function MobileDrawer({ isOpen, onClose }) {
  const location = useLocation();
  const drawerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const { learningPath, resetAll } = useLearning();

  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: SquaresFour },
    { name: 'My Learning', path: '/learning-path', icon: BookOpen },
    { name: 'Modules', path: '/modules', icon: ListBullets },
    { name: 'Progress', path: '/progress', icon: Target },
    { name: 'AI Assistant', path: '/assistant', icon: Sparkle },
    { name: 'Settings', path: '/settings', icon: Gear },
  ];

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      // Focus close button for accessibility
      setTimeout(() => closeButtonRef.current?.focus(), 50);

      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="md:hidden fixed inset-0 z-50 flex"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      {/* 1. Backdrop Overlay */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
      />

      {/* 2. Slide-In Panel */}
      <div 
        ref={drawerRef}
        className="relative z-10 w-[280px] max-w-[85vw] h-full bg-[#060714] border-r border-purple-900/40 shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col justify-between p-5 animate-in slide-in-from-left duration-300 select-none pb-safe"
      >
        <div>
          {/* Top Header with Brand & Close Button */}
          <div className="flex items-center justify-between pb-6 border-b border-purple-900/30 mb-5">
            <Link 
              to="/" 
              onClick={onClose} 
              className="flex items-center gap-2 group"
              title="LearnPath AI Home"
            >
              <Sparkle 
                size={22} 
                weight="fill" 
                className="text-fuchsia-400 drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]" 
              />
              <span className="text-lg font-bold text-white tracking-tight">
                LearnPath <span className="text-fuchsia-400">AI</span>
              </span>
            </Link>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-white hover:bg-purple-950/40 active:scale-95 transition-all outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500"
            >
              <X size={20} weight="bold" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5" aria-label="Mobile navigation links">
            {links.map((link) => {
              const isActive = location.pathname.startsWith(link.path);
              const Icon = link.icon;
              const isDisabled = (!learningPath && !['/', '/setup', '/assistant', '/settings'].includes(link.path));

              return (
                <Link
                  key={link.name}
                  to={isDisabled ? '#' : link.path}
                  onClick={() => !isDisabled && onClose()}
                  className={`flex items-center gap-3.5 px-3.5 py-3 rounded-xl min-h-[44px] transition-all text-sm font-medium ${
                    isActive 
                      ? 'bg-[#180d30] border border-fuchsia-500/40 text-white shadow-[0_0_15px_rgba(217,70,239,0.25)]' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                  } ${isDisabled ? 'opacity-40 cursor-not-allowed' : ''}`}
                >
                  <Icon 
                    size={20} 
                    weight={isActive ? "fill" : "duotone"} 
                    className={isActive ? 'text-fuchsia-400 drop-shadow-[0_0_6px_rgba(217,70,239,0.6)]' : 'text-slate-400'} 
                  />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Card / Footer */}
        <div className="pt-4 border-t border-purple-900/30">
          <div className="p-3 bg-[#0d0a21] border border-purple-900/30 rounded-xl text-xs text-slate-400 mb-3">
            <div className="flex items-center gap-1.5 text-fuchsia-400 font-semibold mb-1">
              <Sparkle size={14} weight="fill" />
              <span>Personalized AI</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              Adaptive learning calibrated to your schedule.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              if (window.confirm('Are you sure you want to reset your learning path?')) {
                resetAll();
              }
            }}
            className="w-full min-h-[44px] flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-950/30 border border-red-900/30 transition-all"
          >
            <ArrowCounterClockwise size={15} weight="bold" />
            <span>Reset Learning Path</span>
          </button>
        </div>

      </div>
    </div>
  );
}
