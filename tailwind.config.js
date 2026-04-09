/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/app/**/*.{js,jsx}", "./src/components/**/*.{js,jsx}"],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 0.5s ease-out",
        slideIn: "slideIn 0.3s ease-out",
        gradientShift: "gradientShift 15s ease-in-out infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(-10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          from: { opacity: "0", transform: "translateX(-20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        gradientShift: {
          "0%, 100%": { filter: "brightness(1)" },
          "50%": { filter: "brightness(1.1)" },
        },
      },
      backdropBlur: {
        xl: "20px",
      },
      colors: {
        glow: "rgba(168, 85, 247, 0.5)",
      },
    },
  },
  plugins: [],
};
