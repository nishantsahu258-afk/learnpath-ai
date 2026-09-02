import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkle, 
  Brain, 
  Clock, 
  Target, 
  ArrowRight, 
  GitFork, 
  TrendUp, 
  CaretDown,
  BookOpen,
  Robot,
  Lightning,
  ShieldCheck
} from '@phosphor-icons/react';
import { CosmicParticles } from '../components/ui/CosmicParticles';
import { SpotlightCard } from '../components/ui/SpotlightCard';

export function Landing() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: 'How does LearnPath AI create my custom curriculum?',
      a: 'We use Google Gemini AI to analyze your exact goals, current experience level, and daily time commitment. It synthesizes a logical, prerequisite-aware syllabus divided into progressive modules and hands-on lessons.'
    },
    {
      q: 'Can I learn any topic, or only programming?',
      a: 'You can learn anything! From Full-Stack Web Development, Data Science, and Machine Learning to Digital Marketing, UI/UX Design, Philosophy, or Guitar Theory. Our AI adapts to any subject domain.'
    },
    {
      q: 'What if I need help while going through a lesson?',
      a: 'Every lesson is accompanied by our 24/7 AI Learning Assistant. You can ask for simplified explanations, real-world analogies, code debugging, or extra practice challenges anytime.'
    },
    {
      q: 'Is my learning progress saved across sessions?',
      a: 'Yes! Your profile, roadmap, active modules, lesson completions, and quiz scores are securely saved locally on your browser so you can resume anytime without losing your place.'
    },
    {
      q: 'Can I change my daily learning time or schedule later?',
      a: 'Absolutely. You can visit your Settings page at any point to adjust your commitment or reset and generate a fresh learning roadmap.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#060713] text-white flex flex-col font-sans selection:bg-fuchsia-500 selection:text-white">
      
      {/* HERO SECTION WITH EXACT BACKGROUND */}
      <div className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[url('/landing-bg.jpg')] bg-cover bg-center bg-no-repeat">
        
        {/* Soft radial overlay for perfect text contrast while preserving planet & wave artwork */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#060713]/30 to-[#060713]/70 pointer-events-none z-[1]" />

        {/* 3️⃣ Slow Ambient Cosmic Particles in background */}
        <CosmicParticles />

        {/* 5️⃣ Planet/Horizon Subtle Breathing Glow */}
        <div className="absolute top-[18%] -left-32 sm:-left-24 w-[380px] sm:w-[500px] h-[380px] sm:h-[500px] rounded-full bg-gradient-to-r from-amber-500/25 via-orange-500/10 to-transparent blur-[100px] pointer-events-none animate-pulse-slow z-[2]" />

        {/* 1. FLOATING PILL NAVBAR (Exact match, Theme toggle omitted per request) */}
        <header className="relative z-20 max-w-6xl mx-auto w-full pt-6 px-4">
          <div className="bg-[#0e0f21]/80 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="relative flex items-center justify-center">
                <Sparkle 
                  size={26} 
                  weight="fill" 
                  className="text-fuchsia-400 drop-shadow-[0_0_12px_rgba(217,70,239,0.8)] group-hover:rotate-12 transition-transform duration-300" 
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                LearnPath <span className="text-fuchsia-400">AI</span>
              </span>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">How It Works</a>
              <a href="#faq" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">FAQ</a>
            </nav>

            {/* CTA Button */}
            <div className="flex items-center">
              <Link to="/setup">
                <button className="bg-gradient-to-r from-[#d946ef] via-[#8b5cf6] to-[#3b82f6] text-white text-sm font-semibold px-6 py-2.5 rounded-full flex items-center gap-2 hover:opacity-95 active:scale-95 transition-all shadow-[0_0_22px_rgba(217,70,239,0.45)] hover:shadow-[0_0_30px_rgba(217,70,239,0.7)] cursor-pointer">
                  <span>Get Started</span>
                  <ArrowRight size={16} weight="bold" />
                </button>
              </Link>
            </div>

          </div>
        </header>

        {/* 2. HERO MAIN CONTENT */}
        <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 pt-12 pb-14 max-w-5xl mx-auto w-full">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#181932]/75 border border-purple-500/30 text-xs sm:text-sm text-slate-200 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(168,85,247,0.15)] animate-in fade-in duration-500">
            <Sparkle size={16} weight="duotone" className="text-fuchsia-400" />
            <span>Interactive LMS & Personal Learning Path Generator</span>
          </div>

          {/* Main Headline with 4️⃣ Very Subtle Text Shimmer */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
            Learn anything, <br />
            <span className="animate-shimmer font-extrabold inline-block">
              personalized for you.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed mb-10 font-normal">
            Tell us your goals, skill level, and schedule. Our AI will instantly craft a structured, step-by-step roadmap to get you there.
          </p>

          {/* Primary Action Button */}
          <Link to="/setup">
            <button className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#a855f7] via-[#6366f1] to-[#2563eb] text-white font-semibold text-base sm:text-lg flex items-center gap-3 shadow-[0_0_40px_rgba(147,51,234,0.55)] border border-white/20 hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer">
              <Sparkle size={20} weight="fill" className="text-white" />
              <span>Create My Learning Path</span>
              <ArrowRight size={18} weight="bold" className="text-white" />
            </button>
          </Link>

          {/* Feature Ribbon Pill Bar */}
          <div className="mt-12 inline-flex flex-wrap items-center justify-center gap-6 sm:gap-10 px-8 py-3.5 rounded-full bg-[#0d0e1f]/80 border border-white/10 backdrop-blur-md text-xs sm:text-sm text-slate-200 shadow-2xl">
            <div className="flex items-center gap-2">
              <Brain size={18} weight="duotone" className="text-fuchsia-400" />
              <span className="font-medium">AI-Powered</span>
            </div>
            <div className="flex items-center gap-2">
              <GitFork size={18} weight="duotone" className="text-cyan-400" />
              <span className="font-medium">Personalized Roadmap</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendUp size={18} weight="duotone" className="text-pink-400" />
              <span className="font-medium">Track Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <Target size={18} weight="duotone" className="text-rose-400" />
              <span className="font-medium">Achieve Goals</span>
            </div>
          </div>

          {/* 1️⃣ & 2️⃣ 3 Feature Cards with Spotlight + Border Reveal + 3D Tilt */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left perspective-1000">
            
            {/* Card 1: Goal-Oriented */}
            <SpotlightCard
              spotlightColor="rgba(168, 85, 247, 0.18)"
              borderColor="rgba(192, 132, 252, 0.55)"
              className="group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-5 shadow-inner">
                  <Target size={26} weight="duotone" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Goal-Oriented</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  Set your goals and we create a perfect learning roadmap tailored for success.
                </p>
              </div>
              <div>
                <Link 
                  to="/setup" 
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-500 transition-all cursor-pointer"
                >
                  <ArrowRight size={16} weight="bold" />
                </Link>
              </div>
              {/* Subtle decorative wave art in card corner */}
              <div className="absolute right-[-10px] bottom-[-10px] w-32 h-32 opacity-15 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full stroke-purple-400 fill-none stroke-[1.5]">
                  <path d="M0,80 Q25,40 50,70 T100,50" />
                  <path d="M0,90 Q30,50 60,80 T100,60" />
                  <path d="M0,100 Q35,60 70,90 T100,70" />
                </svg>
              </div>
            </SpotlightCard>

            {/* Card 2: AI-Powered */}
            <SpotlightCard
              spotlightColor="rgba(6, 182, 212, 0.18)"
              borderColor="rgba(34, 211, 238, 0.55)"
              className="group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-5 shadow-inner">
                  <Brain size={26} weight="duotone" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">AI-Powered</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  Advanced AI crafts a structured learning path just for you in seconds.
                </p>
              </div>
              <div>
                <Link 
                  to="/setup" 
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:bg-cyan-600 group-hover:text-white group-hover:border-cyan-500 transition-all cursor-pointer"
                >
                  <ArrowRight size={16} weight="bold" />
                </Link>
              </div>
              {/* Subtle decorative wave art in card corner */}
              <div className="absolute right-[-10px] bottom-[-10px] w-32 h-32 opacity-15 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full stroke-cyan-400 fill-none stroke-[1.5]">
                  <path d="M0,80 Q25,40 50,70 T100,50" />
                  <path d="M0,90 Q30,50 60,80 T100,60" />
                  <path d="M0,100 Q35,60 70,90 T100,70" />
                </svg>
              </div>
            </SpotlightCard>

            {/* Card 3: Time-Aware */}
            <SpotlightCard
              spotlightColor="rgba(244, 114, 182, 0.18)"
              borderColor="rgba(244, 114, 182, 0.55)"
              className="group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 mb-5 shadow-inner">
                  <Clock size={26} weight="duotone" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Time-Aware</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  Your schedule matters. We optimize learning around your available time.
                </p>
              </div>
              <div>
                <Link 
                  to="/setup" 
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:bg-pink-600 group-hover:text-white group-hover:border-pink-500 transition-all cursor-pointer"
                >
                  <ArrowRight size={16} weight="bold" />
                </Link>
              </div>
              {/* Subtle decorative wave art in card corner */}
              <div className="absolute right-[-10px] bottom-[-10px] w-32 h-32 opacity-15 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full stroke-pink-400 fill-none stroke-[1.5]">
                  <path d="M0,80 Q25,40 50,70 T100,50" />
                  <path d="M0,90 Q30,50 60,80 T100,60" />
                  <path d="M0,100 Q35,60 70,90 T100,70" />
                </svg>
              </div>
            </SpotlightCard>

          </div>

        </main>
      </div>

      {/* ========================================================================= */}
      {/* 3. DETAILED FEATURES SECTION (#features) */}
      {/* ========================================================================= */}
      <section id="features" className="py-24 px-6 max-w-6xl mx-auto w-full border-t border-slate-900">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-4">
            Powerful Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Engineered to Accelerate Your Mastery
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Experience an intelligent learning environment that adapts to your learning pace, simplifies complex topics, and keeps you accountable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          <SpotlightCard
            spotlightColor="rgba(217, 70, 239, 0.16)"
            borderColor="rgba(217, 70, 239, 0.45)"
            className="p-7"
          >
            <div className="w-12 h-12 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center text-fuchsia-400 mb-4 shadow-inner">
              <Brain size={24} weight="duotone" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">Adaptive Gemini Syllabus</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              No generic curricula. Our engine generates a sequence of prerequisites and applied projects specifically calibrated for you.
            </p>
          </SpotlightCard>

          <SpotlightCard
            spotlightColor="rgba(6, 182, 212, 0.16)"
            borderColor="rgba(34, 211, 238, 0.45)"
            className="p-7"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 shadow-inner">
              <Robot size={24} weight="duotone" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">24/7 Context-Aware AI Tutor</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Stuck on a concept? Chat directly with your embedded AI assistant that already knows the lesson you are currently studying.
            </p>
          </SpotlightCard>

          <SpotlightCard
            spotlightColor="rgba(244, 114, 182, 0.16)"
            borderColor="rgba(244, 114, 182, 0.45)"
            className="p-7"
          >
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 mb-4 shadow-inner">
              <TrendUp size={24} weight="duotone" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">Milestone & Streak Tracking</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Real-time progress indicators, completion rings, study streak counters, and estimated completion dates to stay focused.
            </p>
          </SpotlightCard>

          <SpotlightCard
            spotlightColor="rgba(16, 185, 129, 0.16)"
            borderColor="rgba(52, 211, 153, 0.45)"
            className="p-7"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 shadow-inner">
              <Lightning size={24} weight="duotone" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">Bite-Sized Practical Lessons</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Structured into manageable 15–45 minute modules so you can make noticeable daily progress without getting overwhelmed.
            </p>
          </SpotlightCard>

          <SpotlightCard
            spotlightColor="rgba(245, 158, 11, 0.16)"
            borderColor="rgba(251, 191, 36, 0.45)"
            className="p-7"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 shadow-inner">
              <BookOpen size={24} weight="duotone" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">Curated External Resources</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Direct access to top documentation, interactive playgrounds, video guides, and deep-dive references for every single topic.
            </p>
          </SpotlightCard>

          <SpotlightCard
            spotlightColor="rgba(59, 130, 246, 0.16)"
            borderColor="rgba(96, 165, 250, 0.45)"
            className="p-7"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4 shadow-inner">
              <ShieldCheck size={24} weight="duotone" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">100% Private & In Your Control</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              No account passwords or tracking cookies required. Your roadmap lives locally on your device with instant reset anytime.
            </p>
          </SpotlightCard>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. HOW IT WORKS SECTION (#how-it-works) */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="py-24 px-6 max-w-5xl mx-auto w-full border-t border-slate-900">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">
            Simple 3-Step Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            From Goal to Mastery in Minutes
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Say goodbye to endless YouTube tutorials and fragmented courses. Here is how LearnPath AI gets you results:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative perspective-1000">
          <SpotlightCard
            spotlightColor="rgba(217, 70, 239, 0.16)"
            borderColor="rgba(217, 70, 239, 0.45)"
            className="p-8 text-center items-center"
          >
            <div className="w-12 h-12 rounded-full bg-fuchsia-600/20 border border-fuchsia-500/30 flex items-center justify-center text-fuchsia-400 font-bold text-lg mb-6 shadow-inner mx-auto">
              1
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Define Your Goal</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Input what you want to learn, why you want to learn it, and how much daily time you can invest.
            </p>
          </SpotlightCard>

          <SpotlightCard
            spotlightColor="rgba(6, 182, 212, 0.16)"
            borderColor="rgba(34, 211, 238, 0.45)"
            className="p-8 text-center items-center"
          >
            <div className="w-12 h-12 rounded-full bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-lg mb-6 shadow-inner mx-auto">
              2
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">AI Builds Roadmap</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Gemini AI analyzes the skill domain, constructs structured modules, and formats bite-sized lessons.
            </p>
          </SpotlightCard>

          <SpotlightCard
            spotlightColor="rgba(59, 130, 246, 0.16)"
            borderColor="rgba(96, 165, 250, 0.45)"
            className="p-8 text-center items-center"
          >
            <div className="w-12 h-12 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-lg mb-6 shadow-inner mx-auto">
              3
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Learn & Excel</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Follow the guided timeline, complete lessons, ask the AI assistant for guidance, and track your achievements.
            </p>
          </SpotlightCard>
        </div>

        <div className="mt-12 text-center">
          <Link to="/setup">
            <button className="bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white font-semibold px-8 py-3.5 rounded-full hover:opacity-95 transition-all shadow-[0_0_25px_rgba(217,70,239,0.35)] cursor-pointer">
              Start Your Journey Now
            </button>
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. FAQ SECTION (#faq) */}
      {/* ========================================================================= */}
      <section id="faq" className="py-24 px-6 max-w-4xl mx-auto w-full border-t border-slate-900">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4">
            Common Inquiries
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Everything you need to know about how LearnPath AI works.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index}
                className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-semibold text-base sm:text-lg text-white hover:text-fuchsia-300 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <CaretDown 
                    size={20} 
                    className={`shrink-0 transition-transform duration-200 text-slate-400 ${isOpen ? 'rotate-180 text-fuchsia-400' : ''}`} 
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm sm:text-base text-slate-400 leading-relaxed border-t border-slate-800/60 pt-4 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FOOTER */}
      {/* ========================================================================= */}
      <footer className="py-12 px-6 border-t border-slate-900 bg-[#04050d] text-slate-400 text-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <Sparkle size={22} weight="fill" className="text-fuchsia-400" />
            <span className="font-bold text-white text-base">LearnPath AI</span>
            <span className="text-xs text-slate-500">© {new Date().getFullYear()} All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <Link to="/setup" className="text-fuchsia-400 hover:text-fuchsia-300 font-medium">Create Path</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
