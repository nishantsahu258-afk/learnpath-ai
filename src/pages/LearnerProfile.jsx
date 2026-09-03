import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkle, 
  ArrowRight, 
  Code,
  DeviceMobile,
  Brain,
  Desktop,
  Database,
  DotsThree,
  Briefcase,
  TrendUp,
  Rocket,
  Globe,
  UsersThree,
  Baby,
  Gauge,
  Lightning,
  Folder,
  Video,
  Path,
  BookOpen,
  Trophy
} from '@phosphor-icons/react';
import { useLearning } from '../context/LearningContext';
import { StepProgress } from '../components/onboarding/StepProgress';
import { SelectableCard } from '../components/onboarding/SelectableCard';
import { 
  HeaderOrbitGraphic,
  GoalDartboardIllustration,
  PurposeIllustration,
  SkillLevelIllustration,
  TimeCommitmentIllustration,
  LearningStyleIllustration
} from '../components/onboarding/OnboardingIllustrations';
import { CosmicParticles } from '../components/ui/CosmicParticles';

const STEPS = [
  { id: 'goal', title: 'Your Goal' },
  { id: 'purpose', title: 'Your Purpose' },
  { id: 'level', title: 'Your Level' },
  { id: 'time', title: 'Your Time' },
  { id: 'style', title: 'Your Style' }
];

export function LearnerProfile() {
  const navigate = useNavigate();
  const { saveProfile } = useLearning();

  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    goal: 'Full Stack Web Development',
    customGoal: '',
    reason: 'Build my own projects',
    level: 'Beginner',
    dailyTime: '1 – 2 hours a day',
    duration: '3 Months',
    learningStyle: 'Project-based'
  });

  const handleSelect = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleFinalSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    handleFinalSubmit();
  };

  const handleFinalSubmit = () => {
    const finalGoal = (formData.goal === 'Other' && formData.customGoal.trim()) 
      ? formData.customGoal.trim() 
      : formData.goal;

    const payload = {
      goal: finalGoal,
      reason: formData.reason,
      level: formData.level,
      dailyTime: formData.dailyTime,
      duration: formData.duration,
      learningStyle: formData.learningStyle
    };

    saveProfile(payload);
    navigate('/generating');
  };

  // Validation per step
  const canProceed = () => {
    if (currentStep === 1) {
      if (formData.goal === 'Other') {
        return formData.customGoal.trim().length > 0;
      }
      return Boolean(formData.goal);
    }
    if (currentStep === 2) return Boolean(formData.reason);
    if (currentStep === 3) return Boolean(formData.level);
    if (currentStep === 4) return Boolean(formData.dailyTime) && Boolean(formData.duration);
    if (currentStep === 5) return Boolean(formData.learningStyle);
    return true;
  };

  return (
    <div className="w-full max-w-[1220px] mx-auto py-1 sm:py-2 text-white flex flex-col justify-center min-h-[calc(100vh-6rem)] relative z-0">
      
      {/* 5️⃣ Planet/Horizon breathing glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-2]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] bg-fuchsia-900/10 blur-[120px] rounded-[100%] animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute -bottom-[10%] left-1/2 -translate-x-1/2 w-[100vw] h-[50vh] bg-purple-900/10 blur-[150px] rounded-[100%] animate-[pulse_12s_ease-in-out_infinite]" />
      </div>

      {/* 3️⃣ Slow Ambient Cosmic Particles */}
      <CosmicParticles />

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .animate-shimmer {
          background-size: 200% auto;
          animation: shimmer 4s linear infinite;
        }
      `}} />

      
      {/* 1. TOP HEADER (Exact match to reference image) */}
      <div className="flex flex-row items-center justify-between gap-6 mb-3 sm:mb-4 px-1">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight relative">
            Let’s build your <br />
            {/* 4️⃣ Very subtle Headline Shimmer */}
            <span className="bg-gradient-to-r from-[#f472b6] via-[#d946ef] to-[#fb923c] bg-clip-text text-transparent animate-shimmer relative inline-block">
              personalized learning path
            </span>
            <Sparkle size={26} weight="duotone" className="text-fuchsia-400 inline ml-2 animate-pulse relative -top-1" />
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl leading-relaxed mt-1">
            We’ll understand your goals and preferences to craft the perfect roadmap just for you.
          </p>
        </div>

        {/* Top-Right Celestial Orbit Graphic */}
        <HeaderOrbitGraphic />
      </div>

      {/* 2. HORIZONTAL 5-STEP PROGRESS INDICATOR */}
      <StepProgress 
        currentStep={currentStep} 
        steps={STEPS} 
        onStepClick={(stepNum) => setCurrentStep(stepNum)} 
      />

      {/* 3. MAIN INTERACTIVE CARD CONTAINER (Spacious 3-Column Grid matching reference image) */}
      <div className="bg-[#0b0c1e]/85 border border-purple-500/20 rounded-3xl p-5 sm:p-7 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden transition-all duration-300">
        
        {/* Soft internal ambient glow */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-fuchsia-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
          
          {/* LEFT COLUMN: 3D Illustration per Step (Hidden on mobile phones to prioritize questions & option cards) */}
          <div className="lg:col-span-4 hidden sm:flex items-center justify-center p-2 border-b lg:border-b-0 lg:border-r border-slate-800/80">
            <div key={`illustration-${currentStep}`} className="animate-in fade-in zoom-in-95 duration-300 w-full flex items-center justify-center">
              {currentStep === 1 && <GoalDartboardIllustration />}
              {currentStep === 2 && <PurposeIllustration />}
              {currentStep === 3 && <SkillLevelIllustration />}
              {currentStep === 4 && <TimeCommitmentIllustration />}
              {currentStep === 5 && <LearningStyleIllustration />}
            </div>
          </div>

          {/* RIGHT COLUMN: Question, 3-Column Options Grid & Navigation */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            
            <div key={`step-content-${currentStep}`} className="animate-in fade-in slide-in-from-right-3 duration-200">
              
              {/* Badge */}
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-fuchsia-950/40 border border-fuchsia-500/30 text-[10px] font-semibold text-fuchsia-400 mb-1.5">
                STEP {currentStep} OF 5
              </div>

              {/* ========================================================= */}
              {/* STEP 1: YOUR GOAL (Exact 3x2 Grid matching reference image) */}
              {/* ========================================================= */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-0.5 tracking-tight">
                    What do you want to learn?
                  </h2>
                  <p className="text-xs text-slate-400 mb-3.5">
                    Choose the option that best describes your primary goal.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {/* Row 1 */}
                    <SelectableCard
                      title="Full Stack Web Development"
                      description="Build complete web apps from front to back."
                      icon={Code}
                      isSelected={formData.goal === 'Full Stack Web Development'}
                      onClick={() => handleSelect('goal', 'Full Stack Web Development')}
                    />
                    <SelectableCard
                      title="Mobile App Development"
                      description="Create modern cross-platform mobile applications."
                      icon={DeviceMobile}
                      isSelected={formData.goal === 'Mobile App Development'}
                      onClick={() => handleSelect('goal', 'Mobile App Development')}
                    />
                    <SelectableCard
                      title="Data Science / AI & ML"
                      description="Dive into data, AI models and intelligent systems."
                      icon={Brain}
                      isSelected={formData.goal === 'Data Science / AI & ML'}
                      onClick={() => handleSelect('goal', 'Data Science / AI & ML')}
                    />

                    {/* Row 2 */}
                    <SelectableCard
                      title="Frontend Development"
                      description="Design and build engaging user interfaces."
                      icon={Desktop}
                      isSelected={formData.goal === 'Frontend Development'}
                      onClick={() => handleSelect('goal', 'Frontend Development')}
                    />
                    <SelectableCard
                      title="Backend Development"
                      description="Build robust APIs and server-side applications."
                      icon={Database}
                      isSelected={formData.goal === 'Backend Development'}
                      onClick={() => handleSelect('goal', 'Backend Development')}
                    />
                    
                    {/* Card 6: Other with smart inline input */}
                    <div
                      onClick={() => handleSelect('goal', 'Other')}
                      role="button"
                      tabIndex={0}
                      className={`relative rounded-xl transition-all duration-300 cursor-pointer text-left overflow-hidden select-none outline-none group p-2.5 sm:p-3 hover:-translate-y-0.5 ${
                        formData.goal === 'Other'
                          ? 'bg-[#180d30]/95 border border-fuchsia-500 shadow-[0_0_20px_rgba(217,70,239,0.25)]'
                          : 'bg-[#0e0f24]/75 border border-slate-800/80 hover:border-slate-700 hover:bg-[#151736]/90'
                      }`}
                    >
                      <div className="flex items-start gap-2.5 relative z-10">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 mt-0.5 ${
                            formData.goal === 'Other'
                              ? 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/40 shadow-inner'
                              : 'bg-slate-800/60 text-slate-400 border border-slate-700/50 group-hover:text-fuchsia-300 group-hover:border-fuchsia-500/30 group-hover:bg-fuchsia-500/10'
                          }`}
                        >
                          <DotsThree size={18} weight={formData.goal === 'Other' ? "bold" : "duotone"} className="transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        <div className="flex-1 pr-4">
                          <h4 className="font-semibold text-xs sm:text-sm text-white tracking-tight leading-snug">
                            Other
                          </h4>
                          {formData.goal === 'Other' ? (
                            <input
                              type="text"
                              placeholder="Type custom topic..."
                              value={formData.customGoal}
                              onChange={(e) => handleSelect('customGoal', e.target.value)}
                              onClick={(e) => e.stopPropagation()}
                              className="w-full bg-[#1b0e35] border border-fuchsia-400/60 rounded-md px-2 py-0.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-fuchsia-400 mt-1 shadow-inner transition-all"
                              autoFocus
                            />
                          ) : (
                            <p className="text-[11px] text-slate-400 leading-normal font-normal mt-0.5 group-hover:text-slate-300 transition-colors">
                              Something else you have in mind.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* STEP 2: YOUR PURPOSE (3x2 Grid) */}
              {/* ========================================================= */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-0.5 tracking-tight">
                    Why do you want to learn this?
                  </h2>
                  <p className="text-xs text-slate-400 mb-3.5">
                    Tell us what you’re hoping to achieve.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <SelectableCard
                      title="Start a new career"
                      description="Transition into tech and land your dream role."
                      icon={Briefcase}
                      isSelected={formData.reason === 'Start a new career'}
                      onClick={() => handleSelect('reason', 'Start a new career')}
                    />
                    <SelectableCard
                      title="Get a better job"
                      description="Level up skills for promotion or salary growth."
                      icon={TrendUp}
                      isSelected={formData.reason === 'Get a better job'}
                      onClick={() => handleSelect('reason', 'Get a better job')}
                    />
                    <SelectableCard
                      title="Build my own projects"
                      description="Turn your ideas into functional SaaS products."
                      icon={Rocket}
                      isSelected={formData.reason === 'Build my own projects'}
                      onClick={() => handleSelect('reason', 'Build my own projects')}
                    />
                    <SelectableCard
                      title="Freelance & Remote"
                      description="Work independently with clients worldwide."
                      icon={Globe}
                      isSelected={formData.reason === 'Freelance & Remote'}
                      onClick={() => handleSelect('reason', 'Freelance & Remote')}
                    />
                    <SelectableCard
                      title="Prepare for interviews"
                      description="Sharpen technical concepts and system design."
                      icon={UsersThree}
                      isSelected={formData.reason === 'Prepare for interviews'}
                      onClick={() => handleSelect('reason', 'Prepare for interviews')}
                    />
                    <SelectableCard
                      title="Personal growth"
                      description="Learn purely out of curiosity and passion."
                      icon={Sparkle}
                      isSelected={formData.reason === 'Personal growth'}
                      onClick={() => handleSelect('reason', 'Personal growth')}
                    />
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* STEP 3: YOUR LEVEL (3 Columns side by side) */}
              {/* ========================================================= */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-0.5 tracking-tight">
                    What’s your current skill level?
                  </h2>
                  <p className="text-xs text-slate-400 mb-3.5">
                    This helps us set the right pace and prerequisites for you.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <SelectableCard
                      title="Beginner"
                      description="“I’m starting from the basics. I want step-by-step guidance from scratch.”"
                      icon={Baby}
                      isSelected={formData.level === 'Beginner'}
                      onClick={() => handleSelect('level', 'Beginner')}
                    />
                    <SelectableCard
                      title="Intermediate"
                      description="“I understand the fundamentals. I want to build more complex applications.”"
                      icon={Gauge}
                      isSelected={formData.level === 'Intermediate'}
                      onClick={() => handleSelect('level', 'Intermediate')}
                    />
                    <SelectableCard
                      title="Advanced"
                      description="“I’m comfortable building projects. I want deep-dive architectural mastery.”"
                      icon={Lightning}
                      isSelected={formData.level === 'Advanced'}
                      onClick={() => handleSelect('level', 'Advanced')}
                    />
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* STEP 4: YOUR TIME & DURATION (Compact & Elegant) */}
              {/* ========================================================= */}
              {currentStep === 4 && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-0.5 tracking-tight">
                    How much time can you invest?
                  </h2>
                  <p className="text-xs text-slate-400 mb-3">
                    We’ll shape your learning plan around your real availability.
                  </p>

                  {/* Daily Commitment */}
                  <div className="mb-3.5">
                    <label className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
                      Daily Commitment
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        { time: '30 mins / day', label: 'Light' },
                        { time: '1 – 2 hrs / day', label: 'Balanced' },
                        { time: '2 – 3 hrs / day', label: 'Accelerated' },
                        { time: '3+ hrs / day', label: 'Intensive' }
                      ].map((item) => (
                        <div
                          key={item.time}
                          onClick={() => handleSelect('dailyTime', item.time)}
                          className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all duration-300 hover:-translate-y-0.5 ${
                            formData.dailyTime === item.time
                              ? 'bg-[#180d30] border-fuchsia-500 text-white shadow-[0_0_15px_rgba(217,70,239,0.3)]'
                              : 'bg-[#0e0f24]/75 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-[#151736]'
                          }`}
                        >
                          <div className="font-semibold text-xs sm:text-sm">{item.time}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5 group-hover:text-slate-300">{item.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Target Duration */}
                  <div>
                    <label className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
                      Target Journey Duration
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        { dur: '1 Month', note: 'Sprint' },
                        { dur: '3 Months', note: 'Recommended' },
                        { dur: '6 Months', note: 'Deep Dive' },
                        { dur: '12 Months', note: 'Mastery' }
                      ].map((item) => (
                        <div
                          key={item.dur}
                          onClick={() => handleSelect('duration', item.dur)}
                          className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all duration-300 hover:-translate-y-0.5 ${
                            formData.duration === item.dur
                              ? 'bg-[#180d30] border-fuchsia-500 text-white shadow-[0_0_15px_rgba(217,70,239,0.3)]'
                              : 'bg-[#0e0f24]/75 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-[#151736]'
                          }`}
                        >
                          <div className="font-semibold text-xs sm:text-sm">{item.dur}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5 group-hover:text-slate-300">{item.note}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* ========================================================= */}
              {/* STEP 5: YOUR STYLE (3x2 Grid) */}
              {/* ========================================================= */}
              {currentStep === 5 && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-0.5 tracking-tight">
                    How do you prefer to learn?
                  </h2>
                  <p className="text-xs text-slate-400 mb-3.5">
                    Choose the learning format that works best for your brain.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <SelectableCard
                      title="Project-based"
                      description="Learn by coding actual real-world projects."
                      icon={Folder}
                      isSelected={formData.learningStyle === 'Project-based'}
                      onClick={() => handleSelect('learningStyle', 'Project-based')}
                    />
                    <SelectableCard
                      title="Video + Practice"
                      description="Visual conceptual video guides with hands-on practice."
                      icon={Video}
                      isSelected={formData.learningStyle === 'Video + Practice'}
                      onClick={() => handleSelect('learningStyle', 'Video + Practice')}
                    />
                    <SelectableCard
                      title="Guided step-by-step"
                      description="Clear sequential roadmap with zero ambiguity."
                      icon={Path}
                      isSelected={formData.learningStyle === 'Guided step-by-step'}
                      onClick={() => handleSelect('learningStyle', 'Guided step-by-step')}
                    />
                    <SelectableCard
                      title="Theory + Practice"
                      description="In-depth conceptual foundation paired with tasks."
                      icon={BookOpen}
                      isSelected={formData.learningStyle === 'Theory + Practice'}
                      onClick={() => handleSelect('learningStyle', 'Theory + Practice')}
                    />
                    <SelectableCard
                      title="Challenges & exercises"
                      description="Problem solving, quizzes, and code katas."
                      icon={Trophy}
                      isSelected={formData.learningStyle === 'Challenges & exercises'}
                      onClick={() => handleSelect('learningStyle', 'Challenges & exercises')}
                    />
                    <SelectableCard
                      title="A mix of everything"
                      description="Balanced combination adapted per topic."
                      icon={Sparkle}
                      isSelected={formData.learningStyle === 'A mix of everything'}
                      onClick={() => handleSelect('learningStyle', 'A mix of everything')}
                    />
                  </div>
                </div>
              )}

            </div>

            {/* 4. NAVIGATION CONTROLS (Responsive stacking with 44px touch targets) */}
            <div className="pt-4 mt-4 border-t border-slate-800/80 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
              
              {/* Left: Skip for now */}
              <div>
                <button
                  type="button"
                  onClick={handleSkip}
                  className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-xl border border-slate-800 bg-[#0e1024] hover:bg-slate-800 text-xs sm:text-sm font-medium text-slate-400 hover:text-white transition-all cursor-pointer shadow-sm flex items-center justify-center"
                >
                  Skip for now
                </button>
              </div>

              {/* Right: Back button + Next/Create button */}
              <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 sm:flex-initial min-h-[44px] px-6 py-2.5 rounded-xl border border-slate-800 bg-[#0e1024] hover:bg-slate-800 text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-all cursor-pointer shadow-sm flex items-center justify-center"
                  >
                    Back
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="flex-1 sm:flex-initial min-h-[44px] px-8 py-2.5 rounded-xl bg-gradient-to-r from-[#d946ef] via-[#ec4899] to-[#f97316] text-white font-semibold text-xs sm:text-sm shadow-[0_0_22px_rgba(217,70,239,0.45)] hover:shadow-[0_0_30px_rgba(217,70,239,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none"
                >
                  <span>
                    {currentStep === 5 ? 'Create My Learning Path' : 'Next'}
                  </span>
                  <ArrowRight size={16} weight="bold" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
