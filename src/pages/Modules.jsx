import { Link, useNavigate } from 'react-router-dom';
import { useLearning } from '../context/LearningContext';
import { CaretRight, FileText, Clock, Sparkle } from '@phosphor-icons/react';
import { Button } from '../components/ui/Button';
import { 
  FrontendBrowserIcon, 
  ReactAtomIcon, 
  NodeJsHexIcon, 
  RocketDeployIcon,
  CosmicBottomWave 
} from '../components/modules/ModuleIcons';

const MODULE_THEMES = [
  {
    borderAccent: 'border-l-[3px] border-l-fuchsia-500 shadow-[0_0_20px_rgba(217,70,239,0.08)]',
    cardBorder: 'border-purple-900/30 hover:border-fuchsia-500/40',
    numberStyle: 'bg-[#140b28] border border-fuchsia-500/30 text-white',
    iconComponent: FrontendBrowserIcon
  },
  {
    borderAccent: 'border-l-[3px] border-l-cyan-400 shadow-[0_0_20px_rgba(56,189,248,0.08)]',
    cardBorder: 'border-purple-900/30 hover:border-cyan-400/40',
    numberStyle: 'bg-[#07172b] border border-cyan-500/30 text-white',
    iconComponent: ReactAtomIcon
  },
  {
    borderAccent: 'border-l-[3px] border-l-emerald-400 shadow-[0_0_20px_rgba(34,197,94,0.08)]',
    cardBorder: 'border-purple-900/30 hover:border-emerald-400/40',
    numberStyle: 'bg-[#071c14] border border-emerald-500/30 text-white',
    iconComponent: NodeJsHexIcon
  },
  {
    borderAccent: 'border-l-[3px] border-l-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.08)]',
    cardBorder: 'border-purple-900/30 hover:border-orange-400/40',
    numberStyle: 'bg-[#1c0f0d] border border-orange-500/30 text-white',
    iconComponent: RocketDeployIcon
  }
];

/**
 * Modules Overview Page (/modules)
 * Showcases all curriculum modules in themed horizontal cards with:
 * - Module index badges & custom icons (Frontend, React, Node, Deploy)
 * - Completion statuses (Completed, In Progress, Locked)
 * - Direct lesson access button with source route tracking
 */
export function Modules() {
  const navigate = useNavigate();
  const { learningPath, learningProgress } = useLearning();

  if (!learningPath || !learningPath.modules || learningPath.modules.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center py-20">
        <div className="w-16 h-16 rounded-full bg-fuchsia-600/10 border border-fuchsia-500/30 flex items-center justify-center mb-4">
          <Sparkle size={32} weight="duotone" className="text-fuchsia-400" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">No Modules Available</h2>
        <p className="text-slate-400 text-sm mb-6 max-w-md">Generate your personalized learning path to view your modules.</p>
        <Button variant="gradient" onClick={() => navigate('/setup')}>Create My Learning Path</Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1240px] mx-auto text-white relative pb-10 select-none">
      
      {/* 1. TOP HEADER (Exact typography from mockup) */}
      <div className="mb-6 sm:mb-8 pt-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2 tracking-tight">
          <span>Your</span>{' '}
          <span className="text-fuchsia-400">Learning</span>{' '}
          <span>Modules</span>
          <span className="text-fuchsia-400 text-base relative -top-1 animate-pulse">✦</span>
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          Your journey is divided into the following modules.
        </p>
      </div>

      {/* 2. STACK OF MODULE BANNER CARDS */}
      <div className="space-y-4 sm:space-y-5 relative z-10">
        {learningPath.modules.map((module, index) => {
          const theme = MODULE_THEMES[index % MODULE_THEMES.length];
          const IconComp = theme.iconComponent;
          
          const completedLessonsInModule = module.lessons.filter(l => 
            learningProgress.completedLessonIds?.includes(l.id)
          ).length;
          
          const totalLessonsInModule = module.lessons?.length || 0;
          const isComplete = totalLessonsInModule > 0 && completedLessonsInModule === totalLessonsInModule;
          const inProgress = completedLessonsInModule > 0 && !isComplete;

          let statusLabel = "Not Started";
          if (isComplete) statusLabel = "Completed";
          else if (inProgress) statusLabel = "In Progress";

          // Calculate estimated hours
          const totalMinutes = module.lessons?.reduce((acc, curr) => acc + (curr.estimatedMinutes || 45), 0) || 0;
          const estimatedHours = Math.max(1, Math.round(totalMinutes / 60));

          // First lesson destination
          const firstLessonId = module.lessons?.[0]?.id || '1';

          return (
            <Link 
              key={module.id || index}
              to={`/lesson/${module.id}/${firstLessonId}`} 
              state={{ from: '/modules' }} 
              className="block group outline-none"
            >
              <div 
                className={`bg-[#0c0a1d]/90 border ${theme.cardBorder} ${theme.borderAccent} rounded-2xl p-4 sm:p-5 flex items-center justify-between transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#110d29] shadow-xl relative overflow-hidden`}
              >
                
                {/* Left Section: Number + Icon + Title & Meta */}
                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0 pr-4">
                  
                  {/* Number Box (e.g. 01, 02) */}
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center font-mono font-bold text-base sm:text-lg shrink-0 shadow-inner ${theme.numberStyle}`}>
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  {/* Vibrant Glowing Mascot Icon */}
                  <div className="shrink-0">
                    <IconComp />
                  </div>

                  {/* Module Title & Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-white tracking-tight truncate group-hover:text-fuchsia-200 transition-colors">
                      {module.title}
                    </h3>
                    
                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                      <div className="flex items-center gap-1.5">
                        <FileText size={14} weight="regular" className="text-slate-400" />
                        <span>{totalLessonsInModule} Lessons</span>
                      </div>
                      <span className="text-slate-600">•</span>
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} weight="regular" className="text-slate-400" />
                        <span>~{estimatedHours} Hours</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right Section: Status Pill + Chevron Circle */}
                <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                  
                  {/* Status Badge */}
                  <div className="px-3.5 sm:px-4 py-1.5 rounded-xl bg-slate-900/80 border border-purple-900/40 text-[11px] sm:text-xs font-medium text-slate-400 shadow-sm group-hover:border-purple-500/40 transition-colors">
                    {statusLabel}
                  </div>

                  {/* Right Arrow Circle Button */}
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#120e24] border border-purple-900/40 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:border-purple-500/50 group-hover:scale-105 group-hover:bg-[#1a1236] transition-all shadow-sm">
                    <CaretRight size={16} weight="bold" />
                  </div>

                </div>

              </div>
            </Link>
          );
        })}
      </div>

      {/* 3. BOTTOM RIGHT COSMIC WAVE DECORATION */}
      <CosmicBottomWave />

    </div>
  );
}
