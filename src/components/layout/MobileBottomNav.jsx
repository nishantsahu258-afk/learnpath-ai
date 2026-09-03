import { Link, useLocation } from 'react-router-dom';
import { SquaresFour, BookOpen, ListBullets, Target, Sparkle } from '@phosphor-icons/react';
import { useLearning } from '../../context/LearningContext';

/**
 * Mobile Bottom Navigation Dock (<768px)
 * Provides one-thumb access to the 5 primary application tabs:
 * - Dashboard
 * - My Learning
 * - Modules
 * - Progress
 * - AI Assistant
 * 
 * Features:
 * - 44px minimum comfortable touch targets
 * - Subtle purple/magenta glow on active tab
 * - Full iOS/Android safe-area-inset-bottom support
 */
export function MobileBottomNav() {
  const location = useLocation();
  const { learningPath } = useLearning();

  const tabs = [
    { name: 'Dashboard', path: '/dashboard', icon: SquaresFour },
    { name: 'My Learning', path: '/learning-path', icon: BookOpen },
    { name: 'Modules', path: '/modules', icon: ListBullets },
    { name: 'Progress', path: '/progress', icon: Target },
    { name: 'Assistant', path: '/assistant', icon: Sparkle },
  ];

  return (
    <nav 
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#070818]/95 backdrop-blur-2xl border-t border-purple-900/40 px-2 py-1.5 shadow-[0_-8px_30px_rgba(0,0,0,0.8)] pb-safe select-none"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = location.pathname.startsWith(tab.path);
          const Icon = tab.icon;
          const isDisabled = (!learningPath && !['/', '/setup', '/assistant', '/settings'].includes(tab.path));

          return (
            <Link
              key={tab.name}
              to={isDisabled ? '#' : tab.path}
              className={`flex-1 min-h-[44px] flex flex-col items-center justify-center gap-1 rounded-xl px-1 py-1 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 ${
                isActive
                  ? 'text-white'
                  : 'text-slate-400 hover:text-slate-200'
              } ${isDisabled ? 'opacity-30 cursor-not-allowed' : 'active:scale-95'}`}
            >
              {/* Icon Container with subtle glow when active */}
              <div className="relative flex items-center justify-center">
                <Icon 
                  size={20} 
                  weight={isActive ? "fill" : "duotone"} 
                  className={`transition-colors duration-200 ${
                    isActive 
                      ? 'text-fuchsia-400 drop-shadow-[0_0_8px_rgba(217,70,239,0.7)]' 
                      : 'text-slate-400'
                  }`} 
                />
                {isActive && (
                  <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-fuchsia-400 shadow-[0_0_6px_rgba(217,70,239,0.9)]" />
                )}
              </div>

              {/* Tab Label */}
              <span className={`text-[10px] tracking-tight leading-none transition-all ${
                isActive 
                  ? 'font-bold text-fuchsia-300' 
                  : 'font-medium text-slate-400'
              }`}>
                {tab.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
