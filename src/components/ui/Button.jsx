import { Sparkles } from 'lucide-react';

export function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  icon = null, 
  isLoading = false,
  ...props 
}) {
  const baseStyle = "inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-fuchsia-600 hover:bg-fuchsia-500 text-white shadow-[0_0_15px_rgba(192,38,211,0.5)]",
    secondary: "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700",
    gradient: "bg-gradient-to-r from-fuchsia-600 to-cyan-500 hover:from-fuchsia-500 hover:to-cyan-400 text-white shadow-[0_0_20px_rgba(192,38,211,0.5)]",
    ghost: "bg-transparent hover:bg-slate-800 text-slate-300",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} disabled={isLoading} {...props}>
      {isLoading ? <Sparkles className="animate-spin" size={18} /> : icon}
      {children}
    </button>
  );
}
