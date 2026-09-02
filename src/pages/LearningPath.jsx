import { useNavigate, Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/Progress';
import { useLearning } from '../context/LearningContext';
import { calculateStats } from '../utils/progressUtils';
import { Target, Clock, CheckCircle, Play, BookOpen, CircleNotch, CaretRight } from '@phosphor-icons/react';

export function LearningPath() {
  const navigate = useNavigate();
  const { learningPath, learningProgress, learnerProfile } = useLearning();

  if (!learningPath) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-bold mb-4">No Learning Path Found</h2>
        <Button variant="gradient" onClick={() => navigate('/setup')}>Create My Learning Path</Button>
      </div>
    );
  }

  const stats = calculateStats(learningPath, learningProgress);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header & Profile Summary */}
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          My Learning Journey <BookOpen className="text-fuchsia-400" size={32} weight="duotone" />
        </h1>
        <p className="text-slate-400 mb-6">Your personalized roadmap to mastering your goal.</p>
        
        <Card className="p-6 bg-slate-900/50 border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="text-sm font-semibold text-fuchsia-400 uppercase tracking-wider mb-1">Goal</div>
            <div className="text-xl font-bold text-white mb-2">{learningPath.goal}</div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1"><Target size={16} weight="duotone" /> {learnerProfile?.level || 'Beginner'}</span>
              <span className="flex items-center gap-1"><Clock size={16} weight="duotone" /> {learningPath.duration}</span>
            </div>
          </div>
          <div className="w-full md:w-64 shrink-0">
            <div className="flex justify-between text-sm mb-2 text-slate-300">
              <span>Overall Progress</span>
              <span className="font-bold">{Math.round(stats.overallProgress)}%</span>
            </div>
            <ProgressBar percentage={stats.overallProgress} className="h-2.5" />
          </div>
        </Card>
      </div>

      {/* Roadmap Timeline */}
      <div className="relative mt-8">
        {/* Vertical Line */}
        <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-slate-800" />

        <div className="space-y-8">
          {learningPath.modules.map((module, index) => {
            const completedLessonsInModule = module.lessons.filter(l => 
              learningProgress.completedLessonIds.includes(l.id)
            ).length;
            
            const totalLessonsInModule = module.lessons.length;
            const progressPercentage = totalLessonsInModule === 0 ? 0 : (completedLessonsInModule / totalLessonsInModule) * 100;
            const isComplete = progressPercentage === 100;
            
            // Determine if this is the "Current" module (first one not 100% complete)
            const isCurrentModule = !isComplete && (
              index === 0 || 
              (learningPath.modules[index - 1].lessons.every(l => learningProgress.completedLessonIds.includes(l.id)))
            );

            // Determine Status UI
            let statusIcon;
            let statusBadge;
            let borderClass = 'border-slate-800 hover:border-slate-700';

            if (isComplete) {
              statusIcon = <CheckCircle size={24} weight="duotone" className="text-cyan-400" />;
              statusBadge = <span className="text-xs font-bold text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded-md uppercase tracking-wide">Completed</span>;
            } else if (isCurrentModule) {
              statusIcon = <CircleNotch size={24} weight="bold" className="text-fuchsia-400 animate-spin" />;
              statusBadge = <span className="text-xs font-bold text-fuchsia-400 bg-fuchsia-400/10 px-2 py-1 rounded-md uppercase tracking-wide">In Progress</span>;
              borderClass = 'border-fuchsia-500/30 ring-1 ring-fuchsia-500/10 shadow-[0_0_15px_rgba(217,70,239,0.05)]';
            } else {
              statusIcon = <div className="w-4 h-4 rounded-full border-2 border-slate-600 m-1" />;
              statusBadge = <span className="text-xs font-bold text-slate-500 bg-slate-800 px-2 py-1 rounded-md uppercase tracking-wide">Upcoming</span>;
            }

            const firstUncompletedLesson = module.lessons.find(l => !learningProgress.completedLessonIds.includes(l.id)) || module.lessons[0];

            return (
              <div key={module.id} className="relative flex items-start gap-6">
                {/* Timeline Node */}
                <div className="relative z-10 shrink-0 w-14 h-14 bg-slate-950 rounded-full border-4 border-slate-950 flex items-center justify-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isComplete ? 'bg-cyan-500/20' : isCurrentModule ? 'bg-fuchsia-500/20' : 'bg-slate-900'
                  }`}>
                    {statusIcon}
                  </div>
                </div>

                {/* Module Card */}
                <div className="flex-1 min-w-0 pt-1">
                  <Card className={`p-6 transition-all ${borderClass} overflow-hidden relative group`}>
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-bold text-slate-500">MODULE {index + 1}</span>
                          {statusBadge}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{module.title}</h3>
                        <p className="text-sm text-slate-400 line-clamp-2 mb-4">
                          {module.lessons.map(l => l.title).join(' • ')}
                        </p>
                        
                        <div className="flex items-center gap-4 text-sm font-medium text-slate-300">
                          <span>{completedLessonsInModule} / {totalLessonsInModule} Lessons</span>
                          <span className="w-1 h-1 rounded-full bg-slate-700" />
                          <span>~{Math.round(module.lessons.reduce((acc, curr) => acc + curr.estimatedMinutes, 0) / 60)} Hours</span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="shrink-0 mt-4 md:mt-0">
                        {isCurrentModule ? (
                          <Link to={`/lesson/${module.id}/${firstUncompletedLesson.id}`} state={{ from: '/learning-path' }}>
                            <Button variant="gradient" className="w-full shadow-lg shadow-fuchsia-500/20">
                              <Play size={16} weight="fill" className="mr-2" /> 
                              {completedLessonsInModule > 0 ? 'Continue' : 'Start'}
                            </Button>
                          </Link>
                        ) : isComplete ? (
                          <Link to={`/lesson/${module.id}/${module.lessons[0].id}`} state={{ from: '/learning-path' }}>
                            <Button variant="outline" className="w-full border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10">
                              Review
                            </Button>
                          </Link>
                        ) : (
                          <Link to={`/lesson/${module.id}/${module.lessons[0].id}`} state={{ from: '/learning-path' }}>
                            <Button variant="ghost" className="w-full text-slate-400 hover:text-white flex items-center gap-1">
                              View <CaretRight size={16} weight="bold" />
                            </Button>
                          </Link>
                        )}
                      </div>

                    </div>
                    
                    {/* Module Progress Bar */}
                    {progressPercentage > 0 && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800">
                        <div 
                          className={`h-full transition-all duration-1000 ${isComplete ? 'bg-cyan-400' : 'bg-fuchsia-500'}`}
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                    )}
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
