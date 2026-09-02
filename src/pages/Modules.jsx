import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/Progress';
import { Button } from '../components/ui/Button';
import { useLearning } from '../context/LearningContext';
import { ChevronRight, PlayCircle, CheckCircle2 } from 'lucide-react';

export function Modules() {
  const navigate = useNavigate();
  const { learningPath, learningProgress } = useLearning();

  if (!learningPath) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-bold mb-4">No Modules Available</h2>
        <Button variant="gradient" onClick={() => navigate('/setup')}>Create My Learning Path</Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Your Learning Modules</h1>
          <p className="text-slate-400">Your journey is divided into the following modules.</p>
        </div>
      </div>

      <div className="space-y-4">
        {learningPath.modules.map((module, index) => {
          const completedLessonsInModule = module.lessons.filter(l => 
            learningProgress.completedLessonIds.includes(l.id)
          ).length;
          
          const totalLessonsInModule = module.lessons.length;
          const progressPercentage = totalLessonsInModule === 0 ? 0 : (completedLessonsInModule / totalLessonsInModule) * 100;
          const isComplete = progressPercentage === 100;
          
          let moduleStatusText = "Not Started";
          if (isComplete) moduleStatusText = "Completed";
          else if (progressPercentage > 0) moduleStatusText = "In Progress";

          return (
            <Card key={module.id} className="p-0 hover:border-slate-700 transition-colors group">
              <Link to={`/lesson/${module.id}/${module.lessons[0]?.id}`} className="block p-6">
                <div className="flex items-center gap-6">
                  <div className={`w-14 h-14 shrink-0 rounded-xl flex items-center justify-center text-2xl font-bold ${
                    isComplete 
                      ? 'bg-cyan-500/20 text-cyan-400' 
                      : progressPercentage > 0 
                        ? 'bg-fuchsia-500/20 text-fuchsia-400' 
                        : 'bg-slate-800 text-slate-400'
                  }`}>
                    {index + 1}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-white mb-1 truncate">{module.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <span>{totalLessonsInModule} Lessons</span>
                      <span>•</span>
                      <span>~{Math.round(module.lessons.reduce((acc, curr) => acc + curr.estimatedMinutes, 0) / 60)} Hours</span>
                    </div>
                  </div>

                  <div className="hidden md:block w-48">
                    {progressPercentage > 0 ? (
                      <div className="flex items-center gap-3">
                        <ProgressBar percentage={progressPercentage} className="flex-1" />
                        <span className="text-sm font-medium">{Math.round(progressPercentage)}%</span>
                      </div>
                    ) : (
                      <div className="text-right text-sm font-medium text-slate-500">
                        {moduleStatusText}
                      </div>
                    )}
                  </div>
                  
                  <div className="shrink-0 text-slate-600 group-hover:text-white transition-colors">
                    {isComplete ? <CheckCircle2 className="text-cyan-400" /> : <ChevronRight />}
                  </div>
                </div>
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
