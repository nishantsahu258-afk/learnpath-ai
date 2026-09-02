export function calculateStats(learningPath, learningProgress) {
  if (!learningPath || !learningProgress) {
    return {
      totalModules: 0,
      totalLessons: 0,
      completedLessonsCount: 0,
      overallProgress: 0,
      estimatedHours: 0,
      completedHours: 0,
    };
  }

  let totalModules = learningPath.modules.length;
  let totalLessons = 0;
  let estimatedMinutes = 0;
  let completedMinutes = 0;

  learningPath.modules.forEach(module => {
    totalLessons += module.lessons.length;
    module.lessons.forEach(lesson => {
      estimatedMinutes += lesson.estimatedMinutes;
      if (learningProgress.completedLessonIds.includes(lesson.id)) {
        completedMinutes += lesson.estimatedMinutes;
      }
    });
  });

  const completedLessonsCount = learningProgress.completedLessonIds.length;
  const overallProgress = totalLessons === 0 ? 0 : (completedLessonsCount / totalLessons) * 100;

  return {
    totalModules,
    totalLessons,
    completedLessonsCount,
    overallProgress,
    estimatedHours: Math.round(estimatedMinutes / 60),
    completedHours: Math.round(completedMinutes / 60),
  };
}
