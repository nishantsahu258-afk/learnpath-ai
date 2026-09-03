import { Outlet, Link } from 'react-router-dom';
import { User } from '@phosphor-icons/react';
import { Sidebar } from './Sidebar';

/**
 * Main Application Shell Layout
 * Renders the persistent dark cosmic sidebar, ambient background glows,
 * top-right profile navigation avatar, and routed child outlet.
 */
export function MainLayout() {
  return (
    <div className="flex h-screen bg-[#060713] text-white overflow-hidden font-sans selection:bg-fuchsia-500 selection:text-white">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto relative flex flex-col min-h-0">
        {/* Soft background ambient glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-fuchsia-900/10 rounded-full blur-[140px] pointer-events-none -z-10" />

        {/* Top-Right Control Bar */}
        <header className="absolute top-4 right-5 sm:right-8 flex items-center z-30 pt-2">
          {/* User Profile Avatar (Unknown User Icon) */}
          <Link to="/settings" className="group" title="Settings / Profile">
            <div className="w-10 h-10 rounded-full bg-[#120f26] border border-purple-500/40 flex items-center justify-center text-purple-300 group-hover:text-white group-hover:border-fuchsia-400 group-hover:shadow-[0_0_15px_rgba(217,70,239,0.5)] transition-all cursor-pointer shadow-md">
              <User size={20} weight="duotone" />
            </div>
          </Link>
        </header>

        {/* Main Routed Page Content */}
        <div className="flex-1 px-4 sm:px-8 lg:px-12 pt-4 pb-4 sm:pt-5 sm:pb-5 max-w-[1360px] mx-auto w-full flex flex-col justify-start min-h-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
