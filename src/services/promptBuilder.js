/**
 * Constructs a structured system prompt for Gemini to generate
 * a personalized, sequential curriculum tailored to user profile metrics.
 * 
 * @param {Object} profile - User learning profile (goal, reason, level, dailyTime, duration, learningStyle)
 * @returns {string} Fully formulated system prompt with JSON schema constraint
 */
export function buildPrompt(profile) {
  return `
SYSTEM/INSTRUCTION INTENT
- Act as an expert learning-path designer.
- Build a realistic, sequential, time-aware curriculum.
- Respect the learner's level and available study time.
- Do not invent impossible workload assumptions.
- Ensure prerequisite topics are covered before advanced topics.
- Break down the learning into modules, and modules into specific, actionable lessons.

USER PROFILE
Goal: ${profile.goal}
Reason: ${profile.reason}
Level: ${profile.level}
Daily study time: ${profile.dailyTime}
Duration: ${profile.duration}
Preferred learning style: ${profile.learningStyle || 'A mix of theory, practical projects, and exercises'}

- Calibrate lesson structure and examples to match the preferred learning style (${profile.learningStyle || 'Practical & Project-based'}).

Return the response strictly as a JSON object matching this schema:
{
  "title": "A descriptive title for the path",
  "goal": "The learner's goal",
  "duration": "Total duration (e.g., 3 Months)",
  "modules": [
    {
      "id": "module-1",
      "title": "Module title",
      "description": "Module description",
      "lessons": [
        {
          "id": "m1-lesson-1 (MUST be unique across all modules, e.g. m1-lesson-1, m1-lesson-2, m2-lesson-1)",
          "title": "Lesson title",
          "objective": "What the learner will achieve",
          "estimatedMinutes": 30,
          "content": "Detailed HTML content for the lesson, using semantic HTML tags like <h3>, <p>, <ul>, <li>, and <code> for examples."
        }
      ]
    }
  ]
}

Ensure every lesson ID is strictly unique across all modules. Ensure the output is valid JSON without any markdown formatting wrappers around it.
  `.trim();
}
