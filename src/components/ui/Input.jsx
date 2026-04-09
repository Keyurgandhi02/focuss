'use client';

export function Input({
  label,
  error,
  className = '',
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-white/80 mb-2">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg text-white placeholder-white/40 transition-all duration-300 focus:outline-none focus:border-white/40 focus:bg-white/10 ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}
