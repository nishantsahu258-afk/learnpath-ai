import { useNavigate, Link } from 'react-router-dom';
import { 
  Target, 
  Clock, 
  Fire, 
  BookOpen, 
  Play, 
  CheckCircle, 
  Sparkle, 
  Cube, 
  PlayCircle,
  CaretRight
} from '@phosphor-icons/react';
import { useLearning } from '../context/LearningContext';
import { calculateStats } from '../utils/progressUtils';
import { Button } from '../components/ui/Button';
import { 
  DashboardDartboard, 
  DashboardWaypointCurve, 
  DashboardHourglass, 
  DashboardIsometricLaptop 
} from '../components/dashboard/DashboardIllustrations';

/**
 * Dashboard Page (/dashboard)
 * Primary user command center displaying:
 * - Active Goal card with next actionable lesson shortcut
 * - Real-time statistics overview and circular completion gauge
 * - Visual waypoints and achievement benchmarks
 */
export function Dashboard() {
  const navigate = useNavigate();
  const { learnerProfile, learningPath, learningProgress } = useLearning();

  if (!learningPath) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center py-20">
        <div className="w-20 h-20 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-full flex items-center justify-center mb-6 shadow-lg">
          <Sparkle size={40} weight="duotone" className="text-fuchsia-400 animate-pulse" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">No Learning Path Found</h2>
        <p className="text-slate-400 text-sm mb-6 max-w-md">You haven't generated a personalized learning path yet.</p>
        <Button variant="gradient" onClick={() => navigate('/setup')}>Create My Learning Path</Button>
      </div>
    );
  }

  const stats = calculateStats(learningPath, learningProgress);
  
  // Find current lesson
  let currentLessonInfo = null;
  if (learningProgress.currentLessonId) {
    for (const m of learningPath.modules) {
      const lesson = m.lessons.find(l => l.id === learningProgress.currentLessonId);
      if (lesson) {
        currentLessonInfo = { module: m, lesson };
        break;
      }
    }
  }

  // Fallback to first incomplete lesson
  if (!currentLessonInfo) {
    for (const m of learningPath.modules) {
      const lesson = m.lessons.find(l => !learningProgress.completedLessonIds.includes(l.id));
      if (lesson) {
        currentLessonInfo = { module: m, lesson };
        break;
      }
    }
  }

  // Fallback to first lesson if all completed
  if (!currentLessonInfo && learningPath.modules?.[0]?.lessons?.[0]) {
    currentLessonInfo = {
      module: learningPath.modules[0],
      lesson: learningPath.modules[0].lessons[0]
    };
  }

  // Progress ring math
  const ringRadius = 46;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference - (stats.overallProgress / 100) * ringCircumference;

  return (
    <div className="w-full max-w-[1240px] mx-auto text-white relative pb-6 select-none">
      
      {/* 1. SUNRISE MOUNTAIN HORIZON BACKGROUND (Top-Right, matching reference image) */}
      <div className="absolute -top-5 right-0 w-[520px] sm:w-[620px] lg:w-[720px] h-[190px] sm:h-[230px] rounded-3xl overflow-hidden pointer-events-none -z-10 opacity-75">
        <img 
          src="/dashboard-horizon.jpg" 
          alt="Sunrise over mountains" 
          className="w-full h-full object-cover object-center" 
          style={{
            maskImage: 'radial-gradient(ellipse at 82% 52%, black 45%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 82% 52%, black 45%, transparent 80%)'
          }}
        />
      </div>

      {/* 2. GREETING HEADER */}
      <div className="mb-5 sm:mb-6 pt-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5 tracking-tight">
          Hey, Learner! <span className="text-2xl">👋</span>
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-0.5 font-normal">
          You’re on your way to greatness!
        </p>
      </div>

      {/* 3. ROW 1: 3 SUMMARY METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-5 sm:mb-6">
        
        {/* Card 1: Goal */}
        <div className="bg-[#0b0c1e]/85 border border-purple-500/20 rounded-2xl p-4 sm:p-5 backdrop-blur-xl shadow-xl flex items-center justify-between relative overflow-hidden group">
          <div className="flex-1 pr-3 z-10">
            <div className="flex items-center gap-1.5 text-fuchsia-400 mb-2">
              <Target size={16} weight="duotone" />
              <span className="text-xs font-semibold tracking-wide">Goal</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white leading-snug line-clamp-3">
              {learningPath.goal || learnerProfile?.goal || "Build responsive, interactive personal web projects from scratch"}
            </h3>
          </div>
          
          <DashboardDartboard />
        </div>
        
        {/* Card 2: Duration */}
        <div className="bg-[#0b0c1e]/85 border border-purple-500/20 rounded-2xl p-4 sm:p-5 backdrop-blur-xl shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="z-10">
            <div className="flex items-center gap-1.5 text-cyan-400 mb-1.5">
              <Clock size={16} weight="duotone" />
              <span className="text-xs font-semibold tracking-wide">Duration</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {learningPath.duration || learnerProfile?.duration || "3 Months"}
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Estimated completion
            </p>
          </div>

          <DashboardWaypointCurve />
        </div>

        {/* Card 3: Commitment */}
        <div className="bg-[#0b0c1e]/85 border border-purple-500/20 rounded-2xl p-4 sm:p-5 backdrop-blur-xl shadow-xl flex items-center justify-between relative overflow-hidden">
          <div className="flex-1 pr-3 z-10">
            <div className="flex items-center gap-1.5 text-orange-400 mb-1.5">
              <Fire size={16} weight="duotone" />
              <span className="text-xs font-semibold tracking-wide">Commitment</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
              {learnerProfile?.dailyTime || "1 – 2 hours a day"} / day
            </h3>
            <p className="text-[11px] text-slate-400 mt-1 max-w-[150px] leading-relaxed">
              Consistent practice leads to mastery
            </p>
          </div>

          <DashboardHourglass />
        </div>

      </div>

      {/* 4. ROW 2: OVERALL PROGRESS & NEXT UP */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5 sm:mb-6">
        
        {/* Left Card: Overall Progress (lg:col-span-7) */}
        <div className="lg:col-span-7 bg-[#0b0c1e]/85 border border-purple-500/20 rounded-2xl p-5 sm:p-6 backdrop-blur-xl shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-3">Overall Progress</h3>
            
            {/* Completion stats text */}
            <div className="flex justify-between text-xs text-slate-400 mb-1.5">
              <span>Course Completion</span>
              <span className="font-semibold text-slate-300">
                {stats.completedLessonsCount} / {stats.totalLessons} Lessons
              </span>
            </div>

            {/* Glowing Progress bar */}
            <div className="w-full bg-[#120a26] h-2 rounded-full overflow-hidden border border-purple-900/30 mb-6">
              <div 
                className="h-full bg-gradient-to-r from-fuchsia-600 via-pink-500 to-rose-500 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(217,70,239,0.5)]"
                style={{ width: `${Math.max(stats.overallProgress, 2)}%` }}
              />
            </div>
          </div>

          {/* Bottom Grid: 3 Metric boxes + Circular Progress Ring */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
            
            {/* 3 Metric boxes */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3 flex-1 w-full">
              {/* Box 1: Modules */}
              <div className="bg-[#0e0f26]/80 border border-slate-800/80 rounded-xl p-3 text-left">
                <Cube size={18} weight="duotone" className="text-fuchsia-400 mb-1.5" />
                <div className="text-lg sm:text-xl font-bold text-white leading-tight">
                  {stats.totalModules}
                </div>
                <div className="text-xs font-semibold text-slate-300 mt-0.5">Modules</div>
                <div className="text-[10px] text-slate-500">Across your path</div>
              </div>

              {/* Box 2: Lessons */}
              <div className="bg-[#0e0f26]/80 border border-slate-800/80 rounded-xl p-3 text-left">
                <PlayCircle size={18} weight="duotone" className="text-pink-400 mb-1.5" />
                <div className="text-lg sm:text-xl font-bold text-white leading-tight">
                  {stats.totalLessons}
                </div>
                <div className="text-xs font-semibold text-slate-300 mt-0.5">Lessons</div>
                <div className="text-[10px] text-slate-500">To complete</div>
              </div>

              {/* Box 3: Total Hours */}
              <div className="bg-[#0e0f26]/80 border border-slate-800/80 rounded-xl p-3 text-left">
                <Clock size={18} weight="duotone" className="text-amber-400 mb-1.5" />
                <div className="text-lg sm:text-xl font-bold text-white leading-tight">
                  {stats.estimatedHours}h
                </div>
                <div className="text-xs font-semibold text-slate-300 mt-0.5">Total Hours</div>
                <div className="text-[10px] text-slate-500">Of learning</div>
              </div>
            </div>

            {/* Circular Progress Ring with % */}
            <div className="relative shrink-0 flex items-center justify-center w-28 h-28">
              <svg className="w-28 h-28 -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r={ringRadius}
                  fill="transparent"
                  stroke="#160d2e"
                  strokeWidth="7"
                />
                <circle
                  cx="56"
                  cy="56"
                  r={ringRadius}
                  fill="transparent"
                  stroke="url(#dashRingGrad)"
                  strokeWidth="7"
                  strokeDasharray={ringCircumference}
                  strokeDashoffset={ringOffset}
                  strokeLinecap="round"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(217, 70, 239, 0.6))' }}
                />
                <defs>
                  <linearGradient id="dashRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d946ef" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {Math.round(stats.overallProgress)}%
                </span>
              </div>
            </div>

          </div>

          {/* Decorative neon corner wave art */}
          <div className="absolute right-[-8px] bottom-[-8px] w-28 h-28 pointer-events-none opacity-20">
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-fuchsia-400 fill-none stroke-[1.5]">
              <path d="M0,80 Q25,40 50,70 T100,50" />
              <path d="M0,90 Q30,50 60,80 T100,60" />
              <path d="M0,100 Q35,60 70,90 T100,70" />
            </svg>
          </div>
        </div>

        {/* Right Card: Next Up (Current Lesson) (lg:col-span-5) */}
        <div className="lg:col-span-5 bg-[#0b0c1e]/85 border border-purple-500/20 rounded-2xl p-5 sm:p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between relative overflow-hidden">
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base sm:text-lg font-bold text-white">Next Up</h3>
              <BookOpen size={20} weight="duotone" className="text-purple-400" />
            </div>

            {currentLessonInfo ? (
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 pr-2">
                  {/* Module Pill */}
                  <div className="inline-block px-2.5 py-0.5 rounded-md bg-fuchsia-950/60 border border-fuchsia-500/30 text-[10px] font-bold text-fuchsia-300 tracking-wider uppercase mb-2">
                    {currentLessonInfo.module.title}
                  </div>
                  
                  {/* Lesson Title */}
                  <h4 className="text-base sm:text-lg font-bold text-white mb-1.5 leading-snug">
                    {currentLessonInfo.lesson.title}
                  </h4>

                  {/* Objective */}
                  <p className="text-xs text-slate-400 line-clamp-2 max-w-[280px] leading-relaxed mb-5">
                    {currentLessonInfo.lesson.objective}
                  </p>

                  {/* Continue Learning Button */}
                  <Link 
                    to={`/lesson/${currentLessonInfo.module.id}/${currentLessonInfo.lesson.id}`} 
                    state={{ from: '/dashboard' }}
                  >
                    <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-600 via-pink-500 to-rose-500 text-white font-semibold text-xs sm:text-sm shadow-[0_0_22px_rgba(217,70,239,0.4)] hover:shadow-[0_0_30px_rgba(217,70,239,0.65)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer">
                      <Play size={14} weight="fill" />
                      <span>Continue Learning</span>
                    </button>
                  </Link>
                </div>

                {/* 3D Isometric Laptop Illustration */}
                <DashboardIsometricLaptop />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-8">
                <CheckCircle size={44} weight="duotone" className="text-fuchsia-400 mb-2" />
                <h4 className="text-base font-bold text-white">All Caught Up!</h4>
                <p className="text-xs text-slate-400 mt-1">You have completed all lessons in your path.</p>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* 5. BOTTOM MOTIVATIONAL RIBBON */}
      <div className="bg-[#0b0c20]/80 border border-slate-800/80 rounded-2xl px-5 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2.5">
          <Sparkle size={18} weight="duotone" className="text-fuchsia-400 shrink-0" />
          <span className="text-xs text-slate-300">
            Small <span className="text-fuchsia-400 font-semibold">consistent</span> steps today, create <span className="text-pink-400 font-semibold">extraordinary</span> results tomorrow.
          </span>
        </div>
        <CaretRight size={14} className="text-slate-600 shrink-0" />
      </div>

    </div>
  );
}
