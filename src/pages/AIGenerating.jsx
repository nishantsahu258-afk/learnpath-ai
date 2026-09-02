import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, CheckCircle2, CircleDashed, AlertTriangle, RefreshCcw } from 'lucide-react';
import { ProgressRing } from '../components/ui/Progress';
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

export function AIGenerating() {
  const navigate = useNavigate();
  const { learnerProfile, savePath } = useLearning();
  
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [error, setError] = useState(null);
  
  const generatingRef = useRef(false);

  const startGeneration = async () => {
    if (!learnerProfile || generatingRef.current) return;
    
    generatingRef.current = true;
    setError(null);
    setProgress(0);
    setCurrentStage(0);

    // Fake progress interval to keep UI alive while API runs
    const progressInterval = setInterval(() => {
      setProgress(p => {
        if (p >= 90) return 90; // Wait at 90% for API to finish
        return p + 1.5;
      });
    }, 100);

    try {
      const result = await generateLearningPath(learnerProfile);
      
      clearInterval(progressInterval);
      setProgress(100);
      setCurrentStage(STAGES.length);
      
      savePath(result);
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 800);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update current stage based on fake progress
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
      <div className="h-full flex flex-col items-center justify-center max-w-2xl mx-auto text-center">
        <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle size={48} className="text-red-500" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Something went wrong</h2>
        <p className="text-slate-400 mb-8 max-w-md">{error}</p>
        <div className="flex gap-4">
          <Button variant="secondary" onClick={() => navigate('/setup')}>Back to Setup</Button>
          <Button variant="gradient" onClick={startGeneration}>
            <RefreshCcw size={18} /> Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col items-center justify-center max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          AI is crafting your <br />
          personalized learning path <Bot className="inline text-fuchsia-400" size={36} />
        </h1>
        <p className="text-slate-400 text-lg">
          Analyzing your goals, skills and the best resources to build your perfect roadmap...
        </p>
      </div>

      <div className="mb-12">
        <ProgressRing percentage={progress} size={200} strokeWidth={12} />
      </div>

      <div className="w-full max-w-md space-y-4">
        {STAGES.map((stage, idx) => {
          const isComplete = currentStage > idx;
          const isCurrent = currentStage === idx && !error;
          return (
            <div 
              key={stage} 
              className={`flex items-center gap-4 transition-all duration-300 ${
                isComplete ? 'text-cyan-400' : isCurrent ? 'text-white' : 'text-slate-600'
              }`}
            >
              {isComplete ? (
                <CheckCircle2 size={24} className="text-cyan-400" />
              ) : isCurrent ? (
                <CircleDashed size={24} className="animate-spin text-fuchsia-400" />
              ) : (
                <div className="w-6 h-6 rounded-full border-2 border-slate-700" />
              )}
              <span className={`text-lg font-medium ${isCurrent ? 'animate-pulse' : ''}`}>
                {stage}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
