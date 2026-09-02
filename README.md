# Interactive LMS & Personal Learning Path Generator

LearnPath AI is a frontend-only interactive Learning Management System (LMS) MVP that leverages Google Gemini to generate highly personalized, structured learning paths based on a user's goals, skill level, and schedule.

## Features
- **Personalized Curriculum**: Generates custom modules and lessons tailored to your specific goals and available time.
- **Interactive Lesson View**: Read lesson objectives, core content, and track completion.
- **Progress Tracking**: Visual indicators (rings and bars) of overall completion, module progress, and learning stats.
- **Frontend-only Architecture**: No custom backend or database. All state and generation logic run directly in the browser.
- **Local Persistence**: Saves your learning profile, generated path, and progress in the browser's `localStorage` so you don't lose them on refresh.

## Tech Stack
- React + Vite
- Tailwind CSS (v4)
- React Router
- Context API
- Lucide React (Icons)
- Google GenAI JavaScript SDK (`@google/genai`)

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Configuration:**
   Copy `.env.example` to `.env` and add your Gemini API Key:
   ```bash
   cp .env.example .env
   ```
   *Edit `.env` to include your actual `VITE_GEMINI_API_KEY`.*

3. **Start the development server:**
   ```bash
   npm run dev
   ```

## ⚠️ Security Limitation (Frontend-only Prototype)
**Important Note:** This project is intentionally built as a **frontend-only MVP** for a rapid build sprint.
Because there is no backend, the Google Gemini API key (`VITE_GEMINI_API_KEY`) is exposed in the browser client. 

**This is NOT a production-safe pattern.** For a real-world production application, the Gemini API calls must be moved behind a secure server-side API (e.g., Node.js/Express backend) to protect the credentials. For demonstration purposes, it is highly recommended to use a restricted/test API key or a BYOK (Bring Your Own Key) approach.

## Deployment
This project is configured to be deployed easily to platforms like Vercel. 
Ensure you add `VITE_GEMINI_API_KEY` to your Vercel Environment Variables before deploying.
