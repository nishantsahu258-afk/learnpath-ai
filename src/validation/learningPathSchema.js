export function validateLearningPath(data) {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid response: Expected an object');
  }

  if (!data.title || typeof data.title !== 'string') {
    throw new Error('Invalid response: Missing or invalid title');
  }

  if (!Array.isArray(data.modules) || data.modules.length === 0) {
    throw new Error('Invalid response: Modules must be a non-empty array');
  }

  const seenLessonIds = new Set();

  data.modules.forEach((mod, mIndex) => {
    if (!mod.id) mod.id = `module-${mIndex + 1}`;
    if (!mod.title) {
      throw new Error(`Invalid module at index ${mIndex}: Missing id or title`);
    }
    
    if (!Array.isArray(mod.lessons) || mod.lessons.length === 0) {
      throw new Error(`Invalid module '${mod.title}': Lessons must be a non-empty array`);
    }

    mod.lessons.forEach((lesson, lIndex) => {
      if (!lesson.title || !lesson.content) {
        throw new Error(`Invalid lesson at index ${lIndex} in module '${mod.title}': Missing title or content`);
      }
      
      // Enforce unique lesson IDs across all modules
      if (!lesson.id || seenLessonIds.has(lesson.id)) {
        lesson.id = `${mod.id}_${lesson.id || `lesson-${lIndex + 1}`}`;
      }
      seenLessonIds.add(lesson.id);
    });
  });

  return data;
}
