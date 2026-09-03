import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { User } from '@phosphor-icons/react';
import { Sidebar } from './Sidebar';
import { MobileTopBar } from './MobileTopBar';
import { MobileDrawer } from './MobileDrawer';
import { MobileBottomNav } from './MobileBottomNav';

/**
 * Main Application Shell Layout
 * Responsive adaptive shell:
 * - Desktop (>=768px): Sticky left sidebar + top-right profile button
 * - Mobile (<768px): Fixed top bar (hamburger + centered logo + profile menu) + slide-in drawer + bottom nav dock
 * - Onboarding routes (/setup, /generating): Automatically hides mobile bottom dock to prioritize step navigation buttons
 * - Automatic safe area and viewport adjustments
 */
export function MainLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const isSetupOrGenerating = ['/setup', '/generating'].includes(location.pathname);

  return (
    <div className="flex h-screen min-h-dvh bg-[#060713] text-white overflow-hidden font-sans selection:bg-fuchsia-500 selection:text-white">
      {/* Desktop Sidebar (>=768px) */}
      <Sidebar />

      {/* Mobile Top Bar (<768px) */}
      <MobileTopBar onOpenDrawer={() => setDrawerOpen(true)} />

      {/* Mobile Slide-In Navigation Drawer (<768px) */}
      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      
      <main className="flex-1 overflow-y-auto relative flex flex-col min-h-0 pt-safe pb-safe">
        {/* Soft background ambient glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-fuchsia-900/10 rounded-full blur-[140px] pointer-events-none -z-10" />

        {/* Desktop Top-Right Control Bar (>=768px) */}
        <header className="hidden md:flex absolute top-4 right-5 sm:right-8 items-center z-30 pt-2">
          {/* User Profile Avatar (Unknown User Icon) */}
          <Link to="/settings" className="group" title="Settings / Profile">
            <div className="w-10 h-10 rounded-full bg-[#120f26] border border-purple-500/40 flex items-center justify-center text-purple-300 group-hover:text-white group-hover:border-fuchsia-400 group-hover:shadow-[0_0_15px_rgba(217,70,239,0.5)] transition-all cursor-pointer shadow-md">
              <User size={20} weight="duotone" />
            </div>
          </Link>
        </header>

        {/* Main Routed Page Content (Comfortable vertical clearance for top bar and bottom dock) */}
        <div className={`flex-1 px-3.5 sm:px-6 lg:px-12 pt-16 sm:pt-18 md:pt-5 ${isSetupOrGenerating ? 'pb-12 sm:pb-16' : 'pb-24 md:pb-5'} max-w-[1360px] mx-auto w-full flex flex-col justify-start min-h-0`}>
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Navigation Dock (<768px, hidden during onboarding setup) */}
      {!isSetupOrGenerating && <MobileBottomNav />}
    </div>
  );
}
