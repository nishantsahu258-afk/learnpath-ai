import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Landing } from './pages/Landing';
import { LearnerProfile } from './pages/LearnerProfile';
import { AIGenerating } from './pages/AIGenerating';
import { AIAssistant } from './pages/AIAssistant';
import { Settings } from './pages/Settings';
import { Dashboard } from './pages/Dashboard';
import { Modules } from './pages/Modules';
import { Lesson } from './pages/Lesson';
import { Progress } from './pages/Progress';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route element={<MainLayout />}>
        <Route path="/setup" element={<LearnerProfile />} />
        <Route path="/generating" element={<AIGenerating />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/learning-path" element={<Modules />} />
        <Route path="/modules" element={<Modules />} />
        <Route path="/lesson/:moduleId/:lessonId" element={<Lesson />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/assistant" element={<AIAssistant />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
