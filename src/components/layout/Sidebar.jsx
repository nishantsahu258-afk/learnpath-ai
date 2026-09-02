import { Link, useLocation } from 'react-router-dom';
import { BookOpen, SquaresFour, Target, Sparkle, Gear, ListBullets } from '@phosphor-icons/react';
import { useLearning } from '../../context/LearningContext';

export function Sidebar() {
  const location = useLocation();
  const { learningPath } = useLearning();

  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: SquaresFour },
    { name: 'My Learning', path: '/learning-path', icon: BookOpen },
    { name: 'Modules', path: '/modules', icon: ListBullets },
    { name: 'Progress', path: '/progress', icon: Target },
    { name: 'AI Assistant', path: '/assistant', icon: Sparkle },
    { name: 'Settings', path: '/settings', icon: Gear },
  ];

  return (
    <aside className="w-64 border-r border-slate-900/80 bg-[#060714] backdrop-blur-2xl flex flex-col hidden md:flex h-screen sticky top-0 select-none z-30">
      
      {/* Brand Logo */}
      <Link 
        to="/" 
        className="p-6 flex items-center gap-2.5 group cursor-pointer transition-opacity hover:opacity-90 outline-none"
        title="Go to Home / Landing Page"
      >
        <Sparkle 
          size={26} 
          weight="fill" 
          className="text-fuchsia-400 drop-shadow-[0_0_10px_rgba(217,70,239,0.8)] group-hover:scale-110 transition-transform animate-pulse" 
        />
        <span className="text-xl font-bold tracking-tight text-white group-hover:text-fuchsia-200 transition-colors">
          LearnPath <span className="text-fuchsia-400">AI</span>
        </span>
      </Link>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-2 space-y-1.5">
        {links.map((link) => {
          const isActive = location.pathname.startsWith(link.path) && link.path !== '#';
          const Icon = link.icon;
          const isDisabled = (!learningPath && !['/', '/setup', '/assistant', '/settings'].includes(link.path)) || link.path === '#';

          return (
            <Link
              key={link.name}
              to={isDisabled ? '#' : link.path}
              className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-[#180d30]/90 border border-fuchsia-500/40 text-white shadow-[0_0_18px_rgba(217,70,239,0.22)]' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              } ${isDisabled ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              <Icon 
                size={20} 
                weight={isActive ? "fill" : "duotone"} 
                className={isActive ? 'text-fuchsia-400 drop-shadow-[0_0_6px_rgba(217,70,239,0.6)]' : 'text-slate-400'} 
              />
              <span className="font-medium text-sm">{link.name}</span>
            </Link>
          );
        })}
      </nav>
      
      {/* Bottom Motivational Card (Exact match to reference image) */}
      <div className="p-4 m-4 bg-[#0b0c1e]/90 rounded-2xl border border-purple-500/20 relative overflow-hidden shadow-lg">
        <Sparkle size={22} weight="duotone" className="text-fuchsia-400 mb-3" />
        <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed relative z-10">
          Your best investment is in yourself.
        </p>

        {/* Decorative subtle neon wavy line art in corner */}
        <div className="absolute right-[-8px] bottom-[-8px] w-24 h-24 pointer-events-none opacity-25">
          <svg viewBox="0 0 100 100" className="w-full h-full stroke-fuchsia-400 fill-none stroke-[1.5]">
            <path d="M0,80 Q25,40 50,70 T100,50" />
            <path d="M0,90 Q30,50 60,80 T100,60" />
            <path d="M0,100 Q35,60 70,90 T100,70" />
          </svg>
        </div>
      </div>

    </aside>
  );
}
