/**
 * Normalizes learningPath modules and lessons so every lesson has a globally unique ID.
 * Also migrates completedLessonIds if lessons previously had duplicate IDs (e.g. 'lesson-1' in every module).
 */
export function normalizePathAndProgress(path, progress) {
  if (!path || !Array.isArray(path.modules)) {
    return { normalizedPath: path, normalizedProgress: progress };
  }

  // Check if duplicate lesson IDs exist across different modules
  const seen = new Set();
  let hasDuplicates = false;
  for (const mod of path.modules) {
    for (const lesson of mod.lessons || []) {
      if (seen.has(lesson.id)) {
        hasDuplicates = true;
        break;
      }
      seen.add(lesson.id);
    }
    if (hasDuplicates) break;
  }

  // If IDs are already completely unique, return as-is
  if (!hasDuplicates) {
    return { normalizedPath: path, normalizedProgress: progress };
  }

  const rawCompleted = progress?.completedLessonIds || [];
  let remainingCompletedCount = rawCompleted.length;
  const newCompletedIds = [];

  const normalizedModules = path.modules.map((mod, mIdx) => {
    const modId = mod.id || `module-${mIdx + 1}`;
    const normalizedLessons = (mod.lessons || []).map((lesson, lIdx) => {
      const oldId = lesson.id || `lesson-${lIdx + 1}`;
      const newId = `${modId}_${oldId}`;

      // Assign completed status in order up to user's completed count
      if (remainingCompletedCount > 0 && rawCompleted.includes(oldId)) {
        newCompletedIds.push(newId);
        remainingCompletedCount--;
      }

      return {
        ...lesson,
        id: newId,
      };
    });

    return {
      ...mod,
      id: modId,
      lessons: normalizedLessons,
    };
  });

  const normalizedPath = {
    ...path,
    modules: normalizedModules,
  };

  let newCurrentLessonId = progress?.currentLessonId;
  if (newCurrentLessonId) {
    for (const mod of normalizedModules) {
      const match = mod.lessons.find(l => l.id.endsWith(`_${newCurrentLessonId}`));
      if (match) {
        newCurrentLessonId = match.id;
        break;
      }
    }
  }

  const normalizedProgress = {
    ...progress,
    completedLessonIds: newCompletedIds,
    currentLessonId: newCurrentLessonId || normalizedModules[0]?.lessons[0]?.id || null,
  };

  return { normalizedPath, normalizedProgress };
}
