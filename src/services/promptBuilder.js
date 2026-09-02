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
          "id": "lesson-1",
          "title": "Lesson title",
          "objective": "What the learner will achieve",
          "estimatedMinutes": 30,
          "content": "Detailed HTML content for the lesson, using semantic HTML tags like <h3>, <p>, <ul>, <li>, and <code> for examples."
        }
      ]
    }
  ]
}

Ensure the output is valid JSON without any markdown formatting wrappers around it.
  `.trim();
}
