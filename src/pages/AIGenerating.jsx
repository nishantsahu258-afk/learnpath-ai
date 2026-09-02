import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Robot, 
  CheckCircle, 
  CircleNotch, 
  Circle,
  Warning, 
  ArrowsClockwise, 
  Sparkle,
  Target,
  Brain,
  BookOpen,
  Code,
  TrendUp,
  GraduationCap
} from '@phosphor-icons/react';
import { Button } from '../components/ui/Button';
import { useLearning } from '../context/LearningContext';
import { generateLearningPath } from '../services/geminiService';

const STAGES = [
  "Understanding your goals",
  "Analyzing current skill level",
  "Researching best learning resources",
  "Creating customized roadmap",
  "Finalizing your learning plan"
];

const FACTS = [
  "AI-crafted learning paths can increase learning efficiency by up to 70%.",
  "Spaced repetition and bite-sized lessons improve retention by up to 40%.",
  "Goal-oriented curricula eliminate tutorial burnout and keep you building real projects.",
  "Tailoring practice to your learning style helps master complex topics 2x faster."
];

export function AIGenerating() {
  const navigate = useNavigate();
  const { learnerProfile, savePath } = useLearning();
  
  const [progress, setProgress] = useState(12);
  const [currentStage, setCurrentStage] = useState(0);
  const [error, setError] = useState(null);
  const [factIndex, setFactIndex] = useState(0);
  
  const generatingRef = useRef(false);

  const startGeneration = async () => {
    if (!learnerProfile || generatingRef.current) return;
    
    generatingRef.current = true;
    setError(null);
    setProgress(8);
    setCurrentStage(0);

    // Smooth progress simulation while awaiting Gemini API
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 88) return 88; // Hold at 88% until API resolves
        return prev + 1.2;
      });
    }, 120);

    try {
      const result = await generateLearningPath(learnerProfile);
      
      clearInterval(progressInterval);
      setProgress(100);
      setCurrentStage(STAGES.length);
      
      savePath(result);
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 900);
    } catch (err) {
      clearInterval(progressInterval);
      setError(err.message || "Failed to generate learning path.");
      generatingRef.current = false;
    }
  };

  useEffect(() => {
    if (!learnerProfile) {
      navigate('/setup');
      return;
    }
    
    startGeneration();
    // Rotate fact pro-tips
    const factInterval = setInterval(() => {
      setFactIndex(prev => (prev + 1) % FACTS.length);
    }, 4500);

    return () => clearInterval(factInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update current stage based on simulated progress
  useEffect(() => {
    if (progress < 100) {
      const stageIndex = Math.min(
        Math.floor((progress / 100) * STAGES.length),
        STAGES.length - 1
      );
      setCurrentStage(stageIndex);
    }
  }, [progress]);

  if (error) {
    return (
      <div className="h-full flex flex-col items-center justify-center max-w-xl mx-auto text-center py-10">
        <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mb-5 shadow-lg">
          <Warning size={42} weight="duotone" className="text-red-400" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Something went wrong</h2>
        <p className="text-slate-400 text-sm mb-6 max-w-md leading-relaxed">{error}</p>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => navigate('/setup')}>Back to Setup</Button>
          <Button variant="gradient" onClick={startGeneration}>
            <ArrowsClockwise size={16} weight="bold" /> Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Circular progress calculations (Radius 88px)
  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="w-full max-w-5xl mx-auto py-2 sm:py-4 px-2 sm:px-4 text-white flex flex-col items-center justify-center min-h-[600px] select-none">
      
      {/* 1. TOP HEADER (Exact match to reference image) */}
      <div className="text-center mb-5 sm:mb-7">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-1.5 leading-tight">
          AI is crafting your <br />
          <span className="bg-gradient-to-r from-[#f472b6] via-[#d946ef] to-[#fb923c] bg-clip-text text-transparent">
            personalized learning path
          </span>
          <span className="inline-block ml-2 text-2xl sm:text-3xl">
            <Robot size={32} weight="duotone" className="text-fuchsia-400 inline" />
          </span>
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm max-w-md sm:max-w-lg mx-auto leading-relaxed">
          Analyzing your goals, skills and the best resources to build your perfect roadmap...
        </p>
      </div>

      {/* 2. CENTER HERO: COSMIC ORBITS & GLOWING CIRCULAR PROGRESS RING */}
      <div className="relative w-full max-w-[620px] h-[250px] sm:h-[270px] flex items-center justify-center mb-6">
        
        {/* Ambient Stardust Glow behind the ring */}
        <div className="absolute w-64 h-64 bg-fuchsia-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute w-80 h-40 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Orbit Ring 1 (Outer ellipse) */}
        <div 
          className="absolute w-[480px] sm:w-[580px] h-[140px] sm:h-[160px] rounded-[100%] border border-fuchsia-500/10 rotate-[-12deg] pointer-events-none"
        />

        {/* Orbit Ring 2 (Middle ellipse) */}
        <div 
          className="absolute w-[410px] sm:w-[510px] h-[120px] sm:h-[135px] rounded-[100%] border border-purple-500/20 rotate-[5deg] pointer-events-none"
          style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.12)' }}
        />

        {/* Orbit Ring 3 (Inner ellipse) */}
        <div 
          className="absolute w-[340px] sm:w-[420px] h-[95px] sm:h-[110px] rounded-[100%] border border-pink-500/15 rotate-[20deg] pointer-events-none"
        />

        {/* Floating Skill Badges on Orbit Rings (Exact match to reference) */}
        {/* 1. Target (Top-Left / Mid-Left) - Pink/Red ring */}
        <div className="absolute left-10 sm:left-16 top-10 w-9 h-9 rounded-full bg-[#18112e] border-2 border-rose-500/50 flex items-center justify-center text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.4)] z-10">
          <Target size={18} weight="duotone" />
        </div>

        {/* 2. Brain (Far left) - Purple ring */}
        <div className="absolute -left-2 sm:left-4 top-28 w-10 h-10 rounded-full bg-[#18112e] border-2 border-purple-500/50 flex items-center justify-center text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)] z-10">
          <Brain size={20} weight="duotone" />
        </div>

        {/* 3. BookOpen (Near Bottom left) - Purple ring */}
        <div className="absolute left-24 sm:left-32 bottom-2 w-8 h-8 rounded-full bg-[#18112e] border-2 border-purple-500/50 flex items-center justify-center text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.4)] z-10">
          <BookOpen size={16} weight="duotone" />
        </div>

        {/* 4. Code </> (Top right) - Purple ring */}
        <div className="absolute right-12 sm:right-20 top-6 w-9 h-9 rounded-full bg-[#18112e] border-2 border-purple-500/50 flex items-center justify-center text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)] z-10">
          <Code size={18} weight="bold" />
        </div>

        {/* 5. TrendUp (Far right) - Magenta/Purple ring */}
        <div className="absolute -right-2 sm:right-6 top-32 w-10 h-10 rounded-full bg-[#18112e] border-2 border-fuchsia-500/50 flex items-center justify-center text-fuchsia-400 shadow-[0_0_15px_rgba(217,70,239,0.4)] z-10">
          <TrendUp size={20} weight="duotone" />
        </div>

        {/* 6. GraduationCap (Bottom right) - Orange/Amber ring */}
        <div className="absolute right-20 sm:right-28 bottom-4 w-9 h-9 rounded-full bg-[#18112e] border-2 border-amber-500/50 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)] z-10">
          <GraduationCap size={18} weight="duotone" />
        </div>

        {/* CENTRAL GLOWING PROGRESS RING */}
        <div className="relative z-10 flex items-center justify-center">
          <svg className="w-[210px] h-[210px] sm:w-[230px] sm:h-[230px] -rotate-90">
            <defs>
              <linearGradient id="generatingRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d946ef" />
                <stop offset="50%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#fb923c" />
              </linearGradient>
            </defs>

            {/* Background Track Circle */}
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              fill="transparent"
              stroke="#1b1035"
              strokeWidth="10"
            />

            {/* Dynamic Progress Stroke with Neon Drop Shadow */}
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              fill="transparent"
              stroke="url(#generatingRingGradient)"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-300 ease-out"
              style={{
                filter: 'drop-shadow(0 0 10px rgba(217, 70, 239, 0.65))'
              }}
            />
          </svg>

          {/* Text in the Center of Ring */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none">
            <span className="text-4xl sm:text-5xl font-black tracking-tight text-white drop-shadow-md">
              {Math.round(progress)}%
            </span>
            <span className="text-[11px] sm:text-xs text-slate-300 font-medium mt-1">
              Crafting your roadmap
            </span>
            <Sparkle size={16} weight="duotone" className="text-fuchsia-400 mt-1.5 animate-pulse" />
          </div>
        </div>

      </div>

      {/* 3. BOTTOM CARDS (Grid: Checklist on Left, Did You Know on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 w-full max-w-4xl mx-auto">
        
        {/* LEFT CARD: 5-Stage Checklist (lg:col-span-8) */}
        <div className="lg:col-span-8 bg-[#0b0c1e]/85 border border-purple-500/20 rounded-2xl p-4 sm:p-5 backdrop-blur-xl shadow-xl space-y-3">
          {STAGES.map((stage, idx) => {
            const isComplete = currentStage > idx || progress >= 100;
            const isCurrent = currentStage === idx && !isComplete;
            const isPending = !isComplete && !isCurrent;

            return (
              <div 
                key={stage} 
                className="flex items-center justify-between transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  {isComplete ? (
                    <div className="w-[18px] h-[18px] rounded-full bg-purple-500 flex items-center justify-center shrink-0 shadow-[0_0_8px_rgba(168,85,247,0.5)]">
                      <CheckCircle size={14} weight="bold" className="text-white" />
                    </div>
                  ) : isCurrent ? (
                    <CircleNotch size={18} weight="bold" className="text-pink-500 animate-spin shrink-0" />
                  ) : (
                    <Circle size={18} weight="regular" className="text-slate-600 shrink-0" />
                  )}
                  <span className={`text-xs sm:text-sm font-medium ${
                    isComplete ? 'text-white' : isCurrent ? 'text-white font-semibold' : 'text-slate-400'
                  }`}>
                    {stage}
                  </span>
                </div>

                <div>
                  {isComplete && (
                    <span className="text-[11px] font-semibold text-purple-400 tracking-wide uppercase">
                      Complete
                    </span>
                  )}
                  {isCurrent && (
                    <span className="text-[11px] font-semibold text-pink-500 tracking-wide uppercase animate-pulse">
                      In progress
                    </span>
                  )}
                  {isPending && (
                    <span className="text-[11px] font-medium text-slate-500 tracking-wide uppercase">
                      Pending
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT CARD: "Did you know?" (lg:col-span-4) */}
        <div className="lg:col-span-4 bg-[#0b0c1e]/85 border border-purple-500/20 rounded-2xl p-5 backdrop-blur-xl shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <Sparkle size={18} weight="duotone" className="text-fuchsia-400" />
              <h3 className="font-bold text-sm text-white tracking-tight">Did you know?</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {FACTS[factIndex]}
            </p>
          </div>

          {/* Decorative neon corner wave art (Exact match to reference) */}
          <div className="absolute right-[-6px] bottom-[-6px] w-24 h-24 pointer-events-none opacity-25">
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-fuchsia-400 fill-none stroke-[1.5]">
              <path d="M0,80 Q25,40 50,70 T100,50" />
              <path d="M0,90 Q30,50 60,80 T100,60" />
              <path d="M0,100 Q35,60 70,90 T100,70" />
            </svg>
          </div>
        </div>

      </div>

    </div>
  );
}
