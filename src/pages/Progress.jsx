import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { ProgressRing, ProgressBar } from '../components/ui/Progress';
import { Button } from '../components/ui/Button';
import { useLearning } from '../context/LearningContext';
import { calculateStats } from '../utils/progressUtils';
import { Trophy, CalendarDays, Clock, Award } from 'lucide-react';

export function Progress() {
  const navigate = useNavigate();
  const { learningPath, learningProgress } = useLearning();

  if (!learningPath) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-bold mb-4">No Progress to Track</h2>
        <Button variant="gradient" onClick={() => navigate('/setup')}>Create My Learning Path</Button>
      </div>
    );
  }

  const stats = calculateStats(learningPath, learningProgress);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Your Progress</h1>
          <p className="text-slate-400">Track your learning journey and stay consistent!</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Overall Progress Card */}
        <Card className="p-8 flex flex-col items-center justify-center text-center">
          <h3 className="text-lg font-semibold w-full text-left mb-8">Overall Progress</h3>
          <ProgressRing percentage={stats.overallProgress} size={180} strokeWidth={14} />
          <p className="mt-8 text-slate-300">
            You've completed <span className="text-white font-bold">{stats.completedLessonsCount}</span> of <span className="text-white font-bold">{stats.totalLessons}</span> lessons
          </p>
        </Card>

        {/* Module Progress Card */}
        <Card className="p-8 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-6">Module Progress</h3>
          <div className="space-y-6">
            {learningPath.modules.map((module, idx) => {
              const completedLessonsInModule = module.lessons.filter(l => 
                learningProgress.completedLessonIds.includes(l.id)
              ).length;
              const totalLessonsInModule = module.lessons.length;
              const progressPercentage = totalLessonsInModule === 0 ? 0 : (completedLessonsInModule / totalLessonsInModule) * 100;
              
              return (
                <div key={module.id}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-slate-300">{idx + 1}. {module.title}</span>
                    <span className="text-slate-500">{Math.round(progressPercentage)}% ({completedLessonsInModule}/{totalLessonsInModule})</span>
                  </div>
                  <ProgressBar percentage={progressPercentage} className="h-2" />
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Learning Stats */}
      <h3 className="text-xl font-bold mt-8 mb-4">Learning Stats</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Card className="p-6 text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-xl bg-fuchsia-500/20 text-fuchsia-400 flex items-center justify-center mb-4">
            <Trophy size={24} />
          </div>
          <div className="text-3xl font-bold mb-1">{stats.completedLessonsCount}</div>
          <div className="text-sm text-slate-400">Lessons Completed</div>
        </Card>
        
        <Card className="p-6 text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
            <Clock size={24} />
          </div>
          <div className="text-3xl font-bold mb-1">{stats.completedHours}</div>
          <div className="text-sm text-slate-400">Hours Spent</div>
        </Card>
        
        <Card className="p-6 text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center mb-4">
            <CalendarDays size={24} />
          </div>
          <div className="text-3xl font-bold mb-1">3</div>
          <div className="text-sm text-slate-400">Day Streak</div>
        </Card>
        
        <Card className="p-6 text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
            <Award size={24} />
          </div>
          <div className="text-3xl font-bold mb-1">0</div>
          <div className="text-sm text-slate-400">Certificates Earned</div>
        </Card>
      </div>

    </div>
  );
}
