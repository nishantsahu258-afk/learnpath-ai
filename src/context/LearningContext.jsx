import { createContext, useContext, useCallback, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const LearningContext = createContext(null);

export function LearningProvider({ children }) {
  const [learnerProfile, setLearnerProfile] = useLocalStorage('learningProfile', null);
  const [learningPath, setLearningPath] = useLocalStorage('learningPath', null);
  const [learningProgress, setLearningProgress] = useLocalStorage('learningProgress', {
    completedLessonIds: [],
    currentLessonId: null,
  });

  const saveProfile = useCallback((profile) => {
    setLearnerProfile(profile);
  }, [setLearnerProfile]);

  const savePath = useCallback((path) => {
    setLearningPath(path);
    // When a new path is generated, reset progress
    setLearningProgress({
      completedLessonIds: [],
      currentLessonId: path?.modules?.[0]?.lessons?.[0]?.id || null,
    });
  }, [setLearningPath, setLearningProgress]);

  const markLessonComplete = useCallback((lessonId) => {
    setLearningProgress((prev) => {
      const completed = new Set(prev.completedLessonIds);
      completed.add(lessonId);
      return {
        ...prev,
        completedLessonIds: Array.from(completed),
      };
    });
  }, [setLearningProgress]);

  const setCurrentLesson = useCallback((lessonId) => {
    setLearningProgress((prev) => ({
      ...prev,
      currentLessonId: lessonId,
    }));
  }, [setLearningProgress]);

  const resetAll = useCallback(() => {
    setLearnerProfile(null);
    setLearningPath(null);
    setLearningProgress({
      completedLessonIds: [],
      currentLessonId: null,
    });
  }, [setLearnerProfile, setLearningPath, setLearningProgress]);

  const value = useMemo(() => ({
    learnerProfile,
    learningPath,
    learningProgress,
    saveProfile,
    savePath,
    markLessonComplete,
    setCurrentLesson,
    resetAll,
  }), [learnerProfile, learningPath, learningProgress, saveProfile, savePath, markLessonComplete, setCurrentLesson, resetAll]);

  return (
    <LearningContext.Provider value={value}>
      {children}
    </LearningContext.Provider>
  );
}

export function useLearning() {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
}
