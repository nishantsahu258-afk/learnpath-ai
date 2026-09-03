import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { List, Sparkle, User, Gear, ArrowCounterClockwise } from '@phosphor-icons/react';
import { useLearning } from '../../context/LearningContext';

/**
 * Mobile Top Bar (<768px)
 * Fixed top bar featuring:
 * - 44px Hamburger touch target
 * - Mathematically centered LearnPath AI brand logo
 * - 44px Profile avatar with compact dropdown menu (Profile, Settings, Reset)
 */
export function MobileTopBar({ onOpenDrawer }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { learnerProfile, resetAll } = useLearning();

  // Close dropdown on route change without cascading effect
  const [prevPath, setPrevPath] = useState(location.pathname);
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setMenuOpen(false);
  }

  // Close dropdown on click outside or Escape
  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  const handleResetClick = () => {
    setMenuOpen(false);
    if (window.confirm('Are you sure you want to reset your learning path?')) {
      resetAll();
      navigate('/setup');
    }
  };

  return (
    <header className="md:hidden fixed top-0 left-0 right-0 z-30 h-14 bg-[#060714]/90 backdrop-blur-xl border-b border-purple-900/30 px-3 flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.5)] pt-safe select-none">
      
      {/* 1. Left: 44px Hamburger Button */}
      <button
        type="button"
        onClick={onOpenDrawer}
        aria-label="Open navigation menu"
        className="w-11 h-11 flex items-center justify-center rounded-xl text-slate-300 hover:text-white hover:bg-slate-900/80 active:scale-95 transition-all outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500"
      >
        <List size={22} weight="bold" />
      </button>

      {/* 2. Center: Mathematically Centered LearnPath AI Brand Logo */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center pointer-events-auto">
        <Link 
          to="/" 
          className="flex items-center gap-2 group outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 rounded-lg px-2 py-1"
          title="LearnPath AI Home"
        >
          <Sparkle 
            size={20} 
            weight="fill" 
            className="text-fuchsia-400 drop-shadow-[0_0_10px_rgba(217,70,239,0.8)] animate-pulse" 
          />
          <span className="text-lg font-bold tracking-tight text-white group-hover:text-fuchsia-200 transition-colors">
            LearnPath <span className="text-fuchsia-400">AI</span>
          </span>
        </Link>
      </div>

      {/* 3. Right: 44px Profile Avatar with Menu Dropdown */}
      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-haspopup="menu"
          aria-label="User profile and account options"
          className="w-11 h-11 flex items-center justify-center rounded-xl group transition-all outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500"
        >
          <div className="w-8 h-8 rounded-full bg-[#120f26] border border-purple-500/40 flex items-center justify-center text-purple-300 group-hover:text-white group-hover:border-fuchsia-400 group-hover:shadow-[0_0_12px_rgba(217,70,239,0.5)] transition-all">
            <User size={17} weight="duotone" />
          </div>
        </button>

        {/* Compact Account Dropdown */}
        {menuOpen && (
          <div 
            role="menu"
            className="absolute right-0 mt-2 w-56 bg-[#0e0c1f] border border-purple-900/50 rounded-2xl p-2 shadow-[0_15px_40px_rgba(0,0,0,0.8)] z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-2xl"
          >
            {/* Header info */}
            <div className="px-3 py-2 border-b border-purple-900/30 mb-1">
              <div className="text-xs font-bold text-white truncate">
                {learnerProfile?.goal || "Learner"}
              </div>
              <div className="text-[11px] text-slate-400 capitalize">
                {learnerProfile?.level || "Beginner"} Level
              </div>
            </div>

            {/* Menu Items */}
            <Link
              to="/settings"
              role="menuitem"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-purple-950/40 hover:border hover:border-purple-500/30 transition-all"
            >
              <User size={16} weight="duotone" className="text-purple-400" />
              <span>Profile</span>
            </Link>

            <Link
              to="/settings"
              role="menuitem"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-purple-950/40 hover:border hover:border-purple-500/30 transition-all"
            >
              <Gear size={16} weight="duotone" className="text-fuchsia-400" />
              <span>Settings</span>
            </Link>

            <div className="my-1 border-t border-purple-900/30" />

            <button
              type="button"
              role="menuitem"
              onClick={handleResetClick}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-all text-left"
            >
              <ArrowCounterClockwise size={16} weight="duotone" />
              <span>Reset Learning Path</span>
            </button>
          </div>
        )}
      </div>

    </header>
  );
}
