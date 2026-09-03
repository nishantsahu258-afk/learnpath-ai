import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { useLearning } from '../context/LearningContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { CheckCircle, Circle, Clock, CaretRight, CaretLeft, ArrowSquareOut, ListBullets, CaretDown } from '@phosphor-icons/react';

/**
 * Interactive Lesson Reader Page (/lesson/:moduleId/:lessonId)
 * Handles:
 * - Dynamic route parameters for active module & lesson
 * - Intelligent back-navigation preserving user's entry point (/learning-path, /modules, /dashboard)
 * - Semantic HTML lesson content rendering
 * - Sequential lesson progression & mark as complete logic
 */
export function Lesson() {
  const { moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { learningPath, learningProgress, markLessonComplete, setCurrentLesson } = useLearning();
  const [mobileLessonsOpen, setMobileLessonsOpen] = useState(false);

  const fromPath = location.state?.from || '/modules';
  let backLabel = '← Back to Modules';
  if (fromPath === '/learning-path') backLabel = '← Back to My Learning';
  if (fromPath === '/dashboard') backLabel = '← Back to Dashboard';

  useEffect(() => {
    if (lessonId && learningPath) {
      setCurrentLesson(lessonId);
    }
  }, [lessonId, learningPath, setCurrentLesson]);

  if (!learningPath) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h2 className="text-2xl font-bold mb-4">No Learning Path Found</h2>
        <Button onClick={() => navigate('/setup')}>Create Your Path</Button>
      </div>
    );
  }

  const moduleIndex = learningPath.modules.findIndex(m => m.id === moduleId);
  const currentModule = learningPath.modules[moduleIndex];

  if (!currentModule) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h2 className="text-2xl font-bold mb-4">Module Not Found</h2>
        <Button onClick={() => navigate('/learning-path')}>Back to Roadmap</Button>
      </div>
    );
  }

  const lessonIndex = currentModule.lessons.findIndex(l => l.id === lessonId);
  const currentLesson = currentModule.lessons[lessonIndex];

  if (!currentLesson) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h2 className="text-2xl font-bold mb-4">Lesson Not Found</h2>
        <Button onClick={() => navigate('/learning-path')}>Back to Roadmap</Button>
      </div>
    );
  }

  const isCompleted = learningProgress.completedLessonIds.includes(lessonId);
  const prevLesson = lessonIndex > 0 ? currentModule.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < currentModule.lessons.length - 1 ? currentModule.lessons[lessonIndex + 1] : null;

  const handleComplete = () => {
    if (!isCompleted) {
      markLessonComplete(lessonId);
    }
    if (nextLesson) {
      navigate(`/lesson/${moduleId}/${nextLesson.id}`, { state: { from: fromPath } });
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 max-w-7xl mx-auto min-h-0 lg:h-[calc(100dvh-80px)] pb-8 lg:pb-0">
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0 overflow-y-auto pr-0 lg:pr-2 pb-10 lg:pb-0">
        <div className="mb-5 sm:mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(fromPath)} 
            className="mb-3 sm:mb-4 pl-0 text-fuchsia-400 hover:text-fuchsia-300 hover:bg-transparent min-h-[44px] flex items-center"
          >
            {backLabel}
          </Button>
          <div className="text-xs sm:text-sm font-semibold text-slate-400 tracking-wider uppercase mb-1.5 sm:mb-2">
            Module {moduleIndex + 1}: {currentModule.title}
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight break-words">
            {currentLesson.title}
          </h1>
          <div className="flex items-center gap-2 text-slate-400 text-xs sm:text-sm">
            <Clock size={16} weight="duotone" /> {currentLesson.estimatedMinutes} min
          </div>
        </div>

        {/* Mobile Collapsible Module Lessons Accordion (< lg) */}
        <div className="lg:hidden mb-6 bg-[#0c0a1d] border border-purple-900/40 rounded-2xl overflow-hidden shadow-lg">
          <button
            type="button"
            onClick={() => setMobileLessonsOpen((prev) => !prev)}
            className="w-full min-h-[44px] px-4 py-3 flex items-center justify-between text-xs font-semibold text-slate-300 hover:text-white bg-purple-950/30 transition-colors"
          >
            <div className="flex items-center gap-2">
              <ListBullets size={18} weight="duotone" className="text-fuchsia-400" />
              <span>Lessons in this Module ({lessonIndex + 1} of {currentModule.lessons.length})</span>
            </div>
            <CaretDown size={16} weight="bold" className={`transition-transform duration-200 ${mobileLessonsOpen ? 'rotate-180' : ''}`} />
          </button>

          {mobileLessonsOpen && (
            <div className="p-2 space-y-1 border-t border-purple-900/30 max-h-60 overflow-y-auto">
              {currentModule.lessons.map((lesson, idx) => {
                const isCurrent = lesson.id === lessonId;
                const isLessonCompleted = learningProgress.completedLessonIds.includes(lesson.id);
                return (
                  <Link
                    key={lesson.id}
                    to={`/lesson/${moduleId}/${lesson.id}`}
                    state={{ from: fromPath }}
                    onClick={() => setMobileLessonsOpen(false)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs transition-all min-h-[44px] ${
                      isCurrent ? 'bg-[#180d30] border border-fuchsia-500/40 text-white font-semibold' : 'text-slate-400 hover:text-white hover:bg-slate-900/40'
                    }`}
                  >
                    <div className="shrink-0">
                      {isLessonCompleted ? (
                        <CheckCircle size={16} weight="duotone" className="text-cyan-400" />
                      ) : (
                        <Circle size={16} weight={isCurrent ? "duotone" : "regular"} className={isCurrent ? 'text-fuchsia-400' : 'text-slate-600'} />
                      )}
                    </div>
                    <span className="truncate">{idx + 1}. {lesson.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <Card className="p-4 sm:p-6 mb-6 sm:mb-8 bg-fuchsia-900/10 border-fuchsia-500/20">
          <h3 className="text-base sm:text-lg font-semibold text-fuchsia-400 mb-2">Objective</h3>
          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">{currentLesson.objective}</p>
        </Card>

        <div className="prose prose-invert prose-fuchsia max-w-none mb-10 text-sm sm:text-base leading-relaxed break-words">
          <div dangerouslySetInnerHTML={{ __html: currentLesson.content }} />
        </div>

        {/* Responsive Bottom Navigation Controls */}
        <div className="mt-auto pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          <div className="w-full sm:w-auto">
            {prevLesson && (
              <Button 
                variant="ghost" 
                onClick={() => navigate(`/lesson/${moduleId}/${prevLesson.id}`, { state: { from: fromPath } })}
                className="w-full sm:w-auto min-h-[44px] flex items-center justify-center"
              >
                <CaretLeft size={20} weight="bold" /> Previous Lesson
              </Button>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <Button 
              variant={isCompleted ? "secondary" : "gradient"} 
              onClick={handleComplete}
              className="w-full sm:w-auto min-h-[44px] flex items-center justify-center"
            >
              {isCompleted ? (
                <><CheckCircle size={20} weight="duotone" className="text-cyan-400 mr-2" /> Completed</>
              ) : (
                <>Mark as Complete <CheckCircle size={20} weight="duotone" className="ml-2" /></>
              )}
            </Button>
            {nextLesson && (
              <Button 
                variant="primary" 
                onClick={() => navigate(`/lesson/${moduleId}/${nextLesson.id}`, { state: { from: fromPath } })}
                className="w-full sm:w-auto min-h-[44px] flex items-center justify-center"
              >
                Next Lesson <CaretRight size={20} weight="bold" className="ml-1" />
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
                state={{ from: fromPath }}
                className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                  isCurrent ? 'bg-slate-800/80 text-white' : 'hover:bg-slate-900 text-slate-400'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isLessonCompleted ? (
                    <CheckCircle size={18} weight="duotone" className="text-cyan-400" />
                  ) : (
                    <Circle size={18} weight={isCurrent ? "duotone" : "regular"} className={isCurrent ? 'text-fuchsia-400' : 'text-slate-600'} />
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
              <ArrowSquareOut size={16} weight="duotone" /> Resources
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
