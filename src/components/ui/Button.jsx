"use client";

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  href,
  ...props
}) {
  const baseStyle =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 cursor-pointer hover:scale-105";

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg",
    secondary:
      "bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20",
    success:
      "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg",
    danger:
      "bg-gradient-to-r from-red-500 to-pink-600 text-white hover:shadow-lg",
    outline:
      "bg-transparent border-2 border-white/30 text-white hover:bg-white/5",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const Element = href ? "a" : "button";

  return (
    <Element
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      href={href}
      {...props}
    >
      {children}
    </Element>
  );
}
