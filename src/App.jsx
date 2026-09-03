import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Landing } from './pages/Landing';
import { LearnerProfile } from './pages/LearnerProfile';
import { AIGenerating } from './pages/AIGenerating';
import { AIAssistant } from './pages/AIAssistant';
import { Settings } from './pages/Settings';
import { Dashboard } from './pages/Dashboard';
import { LearningPath } from './pages/LearningPath';
import { Modules } from './pages/Modules';
import { Lesson } from './pages/Lesson';
import { Progress } from './pages/Progress';

/**
 * LearnPath AI - Application Routing Configuration
 * 
 * Hierarchy:
 * - Public routes: Landing Page (/)
 * - Protected / Main Application Shell: Wraps routes inside MainLayout (Sidebar + Cosmic background + Header)
 *   - /setup: Multi-step interactive onboarding flow to build learner profile
 *   - /generating: AI curriculum generation transition with real-time status updates
 *   - /dashboard: High-level overview of active path, stats, next lesson
 *   - /learning-path: Sequenced roadmap and journey timeline of modules
 *   - /modules: Comprehensive modules overview and curriculum breakdown
 *   - /lesson/:moduleId/:lessonId: Immersive lesson reader with progress marking
 *   - /progress: Detailed analytics, waypoints, and completion gauges
 *   - /assistant: AI Tutor powered by Gemini with tailored learning prompts
 *   - /settings: Profile inspection, preferences, and data reset
 * - Fallback: All unmatched routes redirect to landing page
 */
function App() {
  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={<Landing />} />

      {/* Main Authenticated Layout Shell */}
      <Route element={<MainLayout />}>
        <Route path="/setup" element={<LearnerProfile />} />
        <Route path="/generating" element={<AIGenerating />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/learning-path" element={<LearningPath />} />
        <Route path="/modules" element={<Modules />} />
        <Route path="/lesson/:moduleId/:lessonId" element={<Lesson />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/assistant" element={<AIAssistant />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Catch-all 404 redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
