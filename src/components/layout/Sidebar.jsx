import { Link, useLocation } from 'react-router-dom';
import { BookOpen, LayoutDashboard, Target, Sparkles, Settings, List } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

export function Sidebar() {
  const location = useLocation();
  const { learningPath } = useLearning();

  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Learning', path: '/learning-path', icon: BookOpen },
    { name: 'Modules', path: '/modules', icon: List },
    { name: 'Progress', path: '/progress', icon: Target },
    { name: 'AI Assistant', path: '/assistant', icon: Sparkles },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-950/50 backdrop-blur-xl flex flex-col hidden md:flex h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3 text-fuchsia-400">
        <Sparkles size={24} className="animate-pulse" />
        <span className="text-xl font-bold tracking-tight text-white">LearnPath <span className="text-fuchsia-400">AI</span></span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {links.map((link) => {
          const isActive = location.pathname.startsWith(link.path) && link.path !== '#';
          const Icon = link.icon;
          const isDisabled = (!learningPath && !['/', '/setup', '/assistant', '/settings'].includes(link.path)) || link.path === '#';

          return (
            <Link
              key={link.name}
              to={isDisabled ? '#' : link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? 'bg-fuchsia-600/10 text-fuchsia-400' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Icon size={20} className={isActive ? 'text-fuchsia-400' : ''} />
              <span className="font-medium">{link.name}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-6">
        <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
          <p className="text-sm text-slate-300 font-medium">Your best investment is in yourself.</p>
          <Sparkles className="mt-3 text-fuchsia-400" size={20} />
        </div>
      </div>
    </aside>
  );
}
