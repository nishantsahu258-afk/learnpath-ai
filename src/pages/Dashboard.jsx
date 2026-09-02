import { useNavigate, Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ProgressRing, ProgressBar } from '../components/ui/Progress';
import { useLearning } from '../context/LearningContext';
import { calculateStats } from '../utils/progressUtils';
import { Target, Clock, Flame, BookOpen, ArrowRight, Play } from 'lucide-react';

export function Dashboard() {
  const navigate = useNavigate();
  const { learnerProfile, learningPath, learningProgress } = useLearning();

  if (!learningPath) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-bold mb-4">No Learning Path Found</h2>
        <p className="text-slate-400 mb-8">You haven't generated a personalized learning path yet.</p>
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          Hey, Learner! <span className="text-xl">👋</span>
        </h1>
        <p className="text-slate-400">You're on your way to greatness!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-fuchsia-400 mb-2">
              <Target size={20} />
              <span className="text-sm font-semibold">Goal</span>
            </div>
            <h3 className="text-xl font-bold">{learningPath.goal}</h3>
          </div>
        </Card>
        
        <Card className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 mb-2">
              <Clock size={20} />
              <span className="text-sm font-semibold">Duration</span>
            </div>
            <h3 className="text-xl font-bold">{learningPath.duration}</h3>
          </div>
        </Card>

        <Card className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-orange-400 mb-2">
              <Flame size={20} />
              <span className="text-sm font-semibold">Commitment</span>
            </div>
            <h3 className="text-xl font-bold">{learnerProfile?.dailyTime} / day</h3>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-8 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-6">Overall Progress</h3>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 w-full">
              <div className="flex justify-between text-sm mb-2 text-slate-400">
                <span>Course Completion</span>
                <span>{stats.completedLessonsCount} / {stats.totalLessons} Lessons</span>
              </div>
              <ProgressBar percentage={stats.overallProgress} className="h-3 mb-8" />
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                  <div className="text-2xl font-bold text-white mb-1">{stats.totalModules}</div>
                  <div className="text-xs text-slate-400">Modules</div>
                </div>
                <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                  <div className="text-2xl font-bold text-white mb-1">{stats.totalLessons}</div>
                  <div className="text-xs text-slate-400">Lessons</div>
                </div>
                <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                  <div className="text-2xl font-bold text-white mb-1">{stats.estimatedHours}h</div>
                  <div className="text-xs text-slate-400">Total Hours</div>
                </div>
              </div>
            </div>
            
            <div className="shrink-0">
              <ProgressRing percentage={stats.overallProgress} size={140} strokeWidth={10} />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-slate-900 to-slate-950 flex flex-col">
          <h3 className="text-lg font-semibold mb-6 flex items-center justify-between">
            Next Up
            <BookOpen size={20} className="text-fuchsia-400" />
          </h3>
          
          {currentLessonInfo ? (
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold text-cyan-400 tracking-wider uppercase mb-2">
                  {currentLessonInfo.module.title}
                </div>
                <h4 className="text-xl font-bold mb-3">{currentLessonInfo.lesson.title}</h4>
                <p className="text-sm text-slate-400 line-clamp-3 mb-6">
                  {currentLessonInfo.lesson.objective}
                </p>
              </div>
              <Link to={`/lesson/${currentLessonInfo.module.id}/${currentLessonInfo.lesson.id}`} state={{ from: '/dashboard' }}>
                <Button variant="gradient" className="w-full">
                  <Play size={18} /> Continue Learning
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <CheckCircle2 size={48} className="text-cyan-400 mb-4" />
              <h4 className="text-xl font-bold mb-2">All Caught Up!</h4>
              <p className="text-sm text-slate-400">You've completed all lessons.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
