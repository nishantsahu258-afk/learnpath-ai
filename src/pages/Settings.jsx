import { useNavigate } from 'react-router-dom';
import { 
  Gear as SettingsIcon, 
  User, 
  PencilSimple, 
  CaretRight, 
  Warning, 
  Trash, 
  UserMinus 
} from '@phosphor-icons/react';
import { useLearning } from '../context/LearningContext';
import { SettingsTargetGraphic, SettingsDangerGraphic } from '../components/settings/SettingsIllustrations';

/**
 * Settings Page
 * Allows users to inspect their learning profile preferences,
 * navigate to edit them, and manage destructive actions (reset path, delete account).
 */
export function Settings() {
  const navigate = useNavigate();
  const { learnerProfile, resetAll } = useLearning();

  const handleReset = () => {
    resetAll();
    navigate('/');
  };

  return (
    <div className="w-full max-w-[1240px] mx-auto text-white relative select-none">
      
      {/* 1. GREETING HEADER */}
      <div className="mb-3 sm:mb-4 pt-0.5">
        <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3 tracking-tight">
          Settings 
          <SettingsIcon size={28} weight="duotone" className="text-fuchsia-400 drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]" />
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
          Manage your profile, preferences and account.
        </p>
      </div>

      <div className="space-y-3.5 sm:space-y-4">
        
        {/* CARD 1: PROFILE & PREFERENCES */}
        <div className="bg-[#0e0c1a]/90 border border-purple-900/30 rounded-2xl p-4 sm:p-5 shadow-xl relative overflow-hidden group">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 z-10 flex flex-col">
              
              {/* Header */}
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-950 flex items-center justify-center border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                    <User size={20} weight="duotone" className="text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-white leading-tight">Profile & Preferences</h2>
                    <p className="text-slate-400 text-xs">Your learning profile and preferences.</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => navigate('/setup')}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900/80 border border-purple-500/50 rounded-full text-fuchsia-400 text-xs font-medium hover:bg-fuchsia-950/40 hover:border-fuchsia-400/80 transition-all shadow-[0_0_10px_rgba(217,70,239,0.15)]"
                >
                  <PencilSimple size={14} weight="bold" />
                  Edit Profile
                </button>
              </div>

              {/* Key-Value Rows */}
              <div className="flex-1 flex flex-col justify-center space-y-0 text-xs sm:text-sm">
                
                {/* Row 1 */}
                <div className="flex items-center justify-between py-2.5 border-b border-white/5 group/row hover:bg-white/[0.02] -mx-3 px-3 rounded-lg transition-colors cursor-pointer">
                  <div className="w-1/3 text-slate-400">Current Goal</div>
                  <div className="w-2/3 text-white font-medium pl-3 pr-6 line-clamp-1">
                    {learnerProfile?.goal || "Full Stack Web Development"}
                  </div>
                  <CaretRight size={15} weight="bold" className="text-slate-500 shrink-0 group-hover/row:text-white transition-colors" />
                </div>
                
                {/* Row 2 */}
                <div className="flex items-center justify-between py-2.5 border-b border-white/5 group/row hover:bg-white/[0.02] -mx-3 px-3 rounded-lg transition-colors cursor-pointer">
                  <div className="w-1/3 text-slate-400">Motivation & Reason</div>
                  <div className="w-2/3 text-white font-medium pl-3 pr-6 line-clamp-1">
                    {learnerProfile?.reason || "To build my own web apps and start a career as a developer"}
                  </div>
                  <CaretRight size={15} weight="bold" className="text-slate-500 shrink-0 group-hover/row:text-white transition-colors" />
                </div>

                {/* Row 3 */}
                <div className="flex items-center justify-between py-2.5 border-b border-white/5 group/row hover:bg-white/[0.02] -mx-3 px-3 rounded-lg transition-colors cursor-pointer">
                  <div className="w-1/3 text-slate-400">Daily Commitment</div>
                  <div className="w-2/3 text-white font-medium pl-3 pr-6 capitalize">
                    {learnerProfile?.dailyTime || "1 – 2 Hours"}
                  </div>
                  <CaretRight size={15} weight="bold" className="text-slate-500 shrink-0 group-hover/row:text-white transition-colors" />
                </div>

                {/* Row 4 */}
                <div className="flex items-center justify-between py-2.5 group/row hover:bg-white/[0.02] -mx-3 px-3 rounded-lg transition-colors cursor-pointer">
                  <div className="w-1/3 text-slate-400">Experience Level</div>
                  <div className="w-2/3 text-white font-medium pl-3 pr-6 capitalize">
                    {learnerProfile?.level || "Beginner"}
                  </div>
                  <CaretRight size={15} weight="bold" className="text-slate-500 shrink-0 group-hover/row:text-white transition-colors" />
                </div>

              </div>
            </div>

            {/* 3D Illustration */}
            <div className="hidden md:flex w-52 items-center justify-center shrink-0 border-l border-white/5 pl-6">
              <SettingsTargetGraphic />
            </div>
          </div>
          
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-fuchsia-600/5 blur-[120px] rounded-full pointer-events-none" />
        </div>

        {/* CARD 2: DANGER ZONE */}
        <div className="bg-[#120a0f]/90 border border-red-900/30 rounded-2xl p-4 sm:p-5 shadow-xl relative overflow-hidden group">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 z-10 flex flex-col">
              
              {/* Header */}
              <div className="flex items-center gap-3 mb-3.5">
                <div className="w-10 h-10 rounded-full bg-red-950 flex items-center justify-center border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                  <Warning size={20} weight="duotone" className="text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.3)] leading-tight">Danger Zone</h2>
                  <p className="text-slate-400 text-xs">Irreversible and destructive actions.</p>
                </div>
              </div>

              {/* 2 Danger Action Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-auto">
                
                <div 
                  className="bg-slate-950/60 border border-red-900/30 rounded-xl p-3.5 sm:p-4 flex items-center justify-between cursor-pointer hover:bg-red-950/30 hover:border-red-500/50 transition-all group/card shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                  onClick={() => {
                    if(window.confirm('Are you absolutely sure you want to reset your learning path?')) {
                      handleReset();
                    }
                  }}
                >
                  <div className="flex items-start gap-3 pr-3">
                    <Trash size={20} weight="duotone" className="text-red-500 mt-0.5 group-hover/card:drop-shadow-[0_0_8px_rgba(239,68,68,0.6)] transition-all shrink-0" />
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-red-500 mb-0.5 group-hover/card:text-red-400 transition-colors">Reset Learning Path</h3>
                      <p className="text-[11px] text-slate-500 leading-normal">Delete progress, modules and profile data permanently.</p>
                    </div>
                  </div>
                  <CaretRight size={16} weight="bold" className="text-red-500 shrink-0 group-hover/card:translate-x-1 transition-transform" />
                </div>

                <div 
                  className="bg-slate-950/60 border border-red-900/30 rounded-xl p-3.5 sm:p-4 flex items-center justify-between cursor-pointer hover:bg-red-950/30 hover:border-red-500/50 transition-all group/card shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                >
                  <div className="flex items-start gap-3 pr-3">
                    <UserMinus size={20} weight="duotone" className="text-red-500 mt-0.5 group-hover/card:drop-shadow-[0_0_8px_rgba(239,68,68,0.6)] transition-all shrink-0" />
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-red-500 mb-0.5 group-hover/card:text-red-400 transition-colors">Delete Account</h3>
                      <p className="text-[11px] text-slate-500 leading-normal">Permanently delete your account and all associated data.</p>
                    </div>
                  </div>
                  <CaretRight size={16} weight="bold" className="text-red-500 shrink-0 group-hover/card:translate-x-1 transition-transform" />
                </div>

              </div>
            </div>

            {/* 3D Illustration */}
            <div className="hidden md:flex w-52 items-center justify-center shrink-0 border-l border-red-900/20 pl-6">
              <SettingsDangerGraphic />
            </div>
          </div>
          
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 blur-[120px] rounded-full pointer-events-none" />
        </div>

      </div>
    </div>
  );
}
