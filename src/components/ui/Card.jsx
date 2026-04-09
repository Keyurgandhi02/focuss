'use client';

export function Card({
  children,
  className = '',
  glassmorphic = true,
}) {
  const baseStyle = 'rounded-2xl p-6 transition-all duration-300';
  const glassStyle = 'bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl hover:shadow-2xl';

  return (
    <div className={`${baseStyle} ${glassmorphic ? glassStyle : 'bg-white'} ${className}`}>
      {children}
    </div>
  );
}
