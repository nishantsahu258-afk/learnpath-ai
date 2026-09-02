import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLearning } from '../context/LearningContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ArrowLeft, CheckCircle2, Circle, Clock, ChevronRight, ChevronLeft, ExternalLink } from 'lucide-react';
import { useEffect } from 'react';

export function Lesson() {
  const { moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const { learningPath, learningProgress, markLessonComplete, setCurrentLesson } = useLearning();

  useEffect(() => {
    if (lessonId && learningPath) {
      setCurrentLesson(lessonId);
    }
  }, [lessonId, learningPath, setCurrentLesson]);

  if (!learningPath) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-bold mb-4">Path Not Found</h2>
        <Button variant="gradient" onClick={() => navigate('/setup')}>Create My Learning Path</Button>
      </div>
    );
  }

  const moduleIndex = learningPath.modules.findIndex(m => m.id === moduleId);
  const currentModule = learningPath.modules[moduleIndex];
  
  if (!currentModule) return <div>Module not found</div>;

  const lessonIndex = currentModule.lessons.findIndex(l => l.id === lessonId);
  const currentLesson = currentModule.lessons[lessonIndex];

  if (!currentLesson) return <div>Lesson not found</div>;

  const isCompleted = learningProgress.completedLessonIds.includes(lessonId);
  
  // Nav logic
  const prevLesson = lessonIndex > 0 ? currentModule.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < currentModule.lessons.length - 1 ? currentModule.lessons[lessonIndex + 1] : null;

  const handleComplete = () => {
    if (!isCompleted) {
      markLessonComplete(lessonId);
    }
    if (nextLesson) {
      navigate(`/lesson/${moduleId}/${nextLesson.id}`);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto h-[calc(100vh-80px)]">
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0 overflow-y-auto pr-2 pb-20 lg:pb-0">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/modules')} 
            className="mb-4 pl-0 text-fuchsia-400 hover:text-fuchsia-300 hover:bg-transparent"
          >
            ← Back to Modules
          </Button>
          <div className="text-sm font-semibold text-slate-400 tracking-wider uppercase mb-2">
            Module {moduleIndex + 1}: {currentModule.title}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {currentLesson.title}
          </h1>
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <Clock size={16} /> {currentLesson.estimatedMinutes} min
          </div>
        </div>

        <Card className="p-6 mb-8 bg-fuchsia-900/10 border-fuchsia-500/20">
          <h3 className="text-lg font-semibold text-fuchsia-400 mb-2">Objective</h3>
          <p className="text-slate-200 leading-relaxed">{currentLesson.objective}</p>
        </Card>

        <div className="prose prose-invert prose-fuchsia max-w-none mb-12">
          {/* We assume content is HTML from Gemini, so we dangerouslySetInnerHTML it. 
              In a real app we'd sanitize it, but for this MVP it's acceptable. */}
          <div dangerouslySetInnerHTML={{ __html: currentLesson.content }} />
        </div>

        <div className="mt-auto pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto">
            {prevLesson && (
              <Button 
                variant="ghost" 
                onClick={() => navigate(`/lesson/${moduleId}/${prevLesson.id}`)}
                className="w-full sm:w-auto"
              >
                <ChevronLeft size={20} /> Previous Lesson
              </Button>
            )}
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
            <Button 
              variant={isCompleted ? "secondary" : "gradient"} 
              onClick={handleComplete}
              className="w-full sm:w-auto"
            >
              {isCompleted ? (
                <><CheckCircle2 size={20} className="text-cyan-400" /> Completed</>
              ) : (
                <>Mark as Complete <CheckCircle2 size={20} /></>
              )}
            </Button>
            {nextLesson && isCompleted && (
              <Button 
                variant="primary" 
                onClick={() => navigate(`/lesson/${moduleId}/${nextLesson.id}`)}
                className="w-full sm:w-auto hidden sm:flex"
              >
                Next Lesson <ChevronRight size={20} />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <div className="hidden lg:flex w-80 flex-col shrink-0 border-l border-slate-800 pl-8 overflow-y-auto">
        <h3 className="font-bold text-lg mb-6">Lessons in this Module</h3>
        <div className="space-y-1">
          {currentModule.lessons.map((lesson, idx) => {
            const isCurrent = lesson.id === lessonId;
            const isLessonCompleted = learningProgress.completedLessonIds.includes(lesson.id);
            
            return (
              <Link 
                key={lesson.id} 
                to={`/lesson/${moduleId}/${lesson.id}`}
                className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                  isCurrent ? 'bg-slate-800/80 text-white' : 'hover:bg-slate-900 text-slate-400'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isLessonCompleted ? (
                    <CheckCircle2 size={18} className="text-cyan-400" />
                  ) : (
                    <Circle size={18} className={isCurrent ? 'text-fuchsia-400' : 'text-slate-600'} />
                  )}
                </div>
                <div>
                  <div className={`text-sm font-medium ${isCurrent && !isLessonCompleted ? 'text-fuchsia-400' : ''}`}>
                    {idx + 1}. {lesson.title}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-12">
          <Card className="p-5 bg-cyan-900/10 border-cyan-500/20">
            <h4 className="flex items-center gap-2 font-semibold text-cyan-400 mb-2">
              <ExternalLink size={16} /> Resources
            </h4>
            <p className="text-sm text-slate-400 mb-4">
              Explore these external links to deepen your understanding.
            </p>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-fuchsia-400 hover:underline">MDN Web Docs</a></li>
              <li><a href="#" className="text-fuchsia-400 hover:underline">W3Schools Tutorial</a></li>
            </ul>
          </Card>
        </div>
      </div>

    </div>
  );
}
