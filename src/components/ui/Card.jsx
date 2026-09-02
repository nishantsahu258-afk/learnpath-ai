export function Card({ children, className = '' }) {
  return (
    <div className={`bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-xl shadow-black/20 overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
