import { Check } from '@phosphor-icons/react';

export function StepProgress({ currentStep, steps, onStepClick }) {
  return (
    <div className="w-full">
      {/* Desktop Progress Bar */}
      <div className="hidden sm:flex items-center justify-between relative max-w-xl mx-auto mb-3 sm:mb-4">
        
        {/* Dotted connecting line */}
        <div className="absolute left-6 right-6 top-3.5 -translate-y-1/2 border-t-2 border-dashed border-slate-800 z-0" />
        
        {/* Active colored progress fill line */}
        <div 
          className="absolute left-6 top-3.5 -translate-y-1/2 h-0.5 bg-gradient-to-r from-fuchsia-600 to-pink-500 z-0 transition-all duration-500"
          style={{ 
            width: `${((currentStep - 1) / (steps.length - 1)) * 100 * 0.88}%` 
          }}
        />

        {steps.map((step, index) => {
          const stepNum = index + 1;
          const isCompleted = stepNum < currentStep;
          const isActive = stepNum === currentStep;

          return (
            <div 
              key={step.id} 
              className="relative z-10 flex flex-col items-center group cursor-pointer"
              onClick={() => onStepClick && isCompleted && onStepClick(stepNum)}
            >
              {/* Step Circle */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-fuchsia-950 border-2 border-fuchsia-400 text-white shadow-[0_0_15px_rgba(217,70,239,0.75)] scale-110'
                    : isCompleted
                    ? 'bg-fuchsia-600 border-2 border-fuchsia-400 text-white shadow-[0_0_8px_rgba(217,70,239,0.3)]'
                    : 'bg-[#0b0c1c] border border-slate-800 text-slate-500'
                }`}
              >
                {isCompleted ? (
                  <Check size={12} weight="bold" />
                ) : (
                  stepNum
                )}
              </div>

              {/* Step Label */}
              <span
                className={`mt-1 text-[11px] sm:text-xs transition-colors duration-200 ${
                  isActive
                    ? 'text-white font-semibold'
                    : isCompleted
                    ? 'text-fuchsia-300 font-medium'
                    : 'text-slate-500'
                }`}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile Compact Progress Bar */}
      <div className="sm:hidden flex flex-col gap-1.5 mb-3">
        <div className="flex justify-between items-center text-xs text-slate-400">
          <span className="font-semibold text-fuchsia-400 uppercase tracking-wider text-[10px]">
            STEP {currentStep} OF {steps.length}
          </span>
          <span className="text-white font-medium text-xs">
            {steps[currentStep - 1]?.title}
          </span>
        </div>
        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800">
          <div 
            className="h-full bg-gradient-to-r from-fuchsia-600 to-pink-500 transition-all duration-400 rounded-full"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
