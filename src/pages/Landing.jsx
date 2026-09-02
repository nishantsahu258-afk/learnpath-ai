import { Link } from 'react-router-dom';
import { Sparkles, Brain, Clock, Target } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function Landing() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col relative overflow-hidden font-sans">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-fuchsia-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none" />
      
      <header className="p-6 flex justify-between items-center z-10 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2 text-fuchsia-400">
          <Sparkles size={28} className="animate-pulse" />
          <span className="text-2xl font-bold tracking-tight text-white">LearnPath <span className="text-fuchsia-400">AI</span></span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center p-6 z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-sm font-medium text-slate-300 mb-8">
          <Sparkles size={16} className="text-fuchsia-400" />
          <span>Interactive LMS & Personal Learning Path Generator</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl">
          Learn anything, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400">
            personalized for you.
          </span>
        </h1>
        
        <p className="text-xl text-slate-400 mb-12 max-w-2xl leading-relaxed">
          Tell us your goals, skill level, and schedule. Our AI will instantly craft a structured, step-by-step roadmap to get you there.
        </p>
        
        <Link to="/setup">
          <Button variant="gradient" className="text-lg px-8 py-4">
            Create My Learning Path
          </Button>
        </Link>
        
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full text-left">
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl backdrop-blur-sm">
            <Target className="text-fuchsia-400 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Goal-Oriented</h3>
            <p className="text-slate-400">Paths are tailored specifically to what you want to achieve, skipping the fluff.</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl backdrop-blur-sm">
            <Brain className="text-cyan-400 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">AI-Powered</h3>
            <p className="text-slate-400">Powered by Gemini to structure concepts logically based on your current skill level.</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl backdrop-blur-sm">
            <Clock className="text-fuchsia-400 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Time-Aware</h3>
            <p className="text-slate-400">Fits perfectly into your schedule, calculating milestones based on your daily availability.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
