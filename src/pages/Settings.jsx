import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings as SettingsIcon, AlertTriangle, User, Target, Clock, BookOpen, LogOut } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useLearning } from '../context/LearningContext';

export function Settings() {
  const navigate = useNavigate();
  const { learnerProfile, resetAll } = useLearning();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleReset = () => {
    resetAll();
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          Settings <SettingsIcon className="text-fuchsia-400" size={32} />
        </h1>
        <p className="text-slate-400">Manage your profile and learning preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card className="p-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <User size={20} className="text-cyan-400" />
              Learner Profile
            </h2>
            
            {learnerProfile ? (
              <div className="space-y-6">
                <div>
                  <div className="text-sm text-slate-400 mb-1 flex items-center gap-2">
                    <Target size={16} /> Current Goal
                  </div>
                  <div className="text-lg font-medium text-white bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                    {learnerProfile.goal}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-slate-400 mb-1 flex items-center gap-2">
                    <BookOpen size={16} /> Motivation & Reason
                  </div>
                  <div className="text-base text-slate-300 bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                    {learnerProfile.reason}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-slate-400 mb-1 flex items-center gap-2">
                      <Clock size={16} /> Daily Commitment
                    </div>
                    <div className="text-base font-medium text-white bg-slate-950/50 p-4 rounded-xl border border-slate-800 capitalize">
                      {learnerProfile.dailyTime}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400 mb-1 flex items-center gap-2">
                      <Target size={16} /> Experience Level
                    </div>
                    <div className="text-base font-medium text-white bg-slate-950/50 p-4 rounded-xl border border-slate-800 capitalize">
                      {learnerProfile.level}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-400 mb-4">No active profile found.</p>
                <Button variant="gradient" onClick={() => navigate('/setup')}>Set Up Profile</Button>
              </div>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6 border-red-500/20 bg-red-950/10">
            <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
              <AlertTriangle size={20} />
              Danger Zone
            </h3>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Resetting your learning path will permanently delete your current progress, generated modules, and profile data from this device.
            </p>
            
            {!showConfirm ? (
              <Button 
                variant="outline" 
                className="w-full text-red-400 border-red-500/30 hover:bg-red-500/10 hover:border-red-500/50"
                onClick={() => setShowConfirm(true)}
              >
                Reset Learning Path
              </Button>
            ) : (
              <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                <p className="text-sm font-semibold text-white">Are you absolutely sure?</p>
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1 bg-slate-900"
                    onClick={() => setShowConfirm(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="primary" 
                    className="flex-1 bg-red-500 hover:bg-red-600 border-none text-white gap-2"
                    onClick={handleReset}
                  >
                    <LogOut size={16} /> Yes, Reset
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
