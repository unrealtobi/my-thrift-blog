/** @type {import('tailwindcss').Config} */
export default {
  // Content paths remain largely the same in v4
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // In v4, `extend` is no longer needed for most theme customizations
    colors: {
      // Use direct theme object in v4 instead of extend
      background: "var(--background)",
      foreground: "var(--foreground)",
      customGreen: "#0B4525",
      customDarkGreen: "#08311a",
      customPink: "#F7A49D",
      customWhite: "#FFFFFF",
      customBg: "#FAFFFC",
      // Make sure to include these or inherit using `DEFAULT: { ... }`
      // to avoid overriding Tailwind's default colors
      inherit: "inherit",
      current: "currentColor",
      transparent: "transparent",
    },
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
      pacifico: ["Pacifico", "cursive"],
      raleway: ["Raleway", "sans-serif"],
    },
    fontSize: {
      // v4 approach - define your custom sizes alongside defaults
      "10xl": "190px",
    },
    extend: {
      // Items that should augment the defaults rather than replace them
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        bounceOutward: {
          "0%": {
            transform: "translate(-50%, -50%) scale(0)",
          },
          "60%": {
            transform: "translate(-50%, -50%) scale(1.1)",
          },
          "80%": {
            transform: "translate(-50%, -50%) scale(0.95)",
          },
          "100%": {
            transform: "translate(0, 0) scale(1)",
          },
        },
        "bounce-up": {
          "0%": {
            transform: "translateY(100%)",
            opacity: "0",
          },
          "80%": {
            transform: "translateY(-10px)",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        "fade-in-up": {
          "0%": {
            transform: "translateY(20px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        glow: {
          "0%, 100%": { textShadow: "0 0 5px #00ff00, 0 0 10px #00ff00" },
          "50%": { textShadow: "0 0 15px #00ff00, 0 0 20px #00ff00" },
        },
        smoothOpening: {
          "0%": {
            transform: "scaleX(0)",
            opacity: "0",
          },
          "100%": {
            transform: "scaleX(1)",
            opacity: "1",
          },
        },
      },
      animation: {
        smoothOpening: "smoothOpening 1s ease-in-out forwards",
        scroll: "scroll 20s linear infinite",
        "bounce-up": "bounce-up 1s ease forwards",
        bounce: "bounce 1s ease-in-out infinite",
        "text-glow": "glow 1.5s ease-in-out infinite",
        "fade-in-up": "fade-in-up 1s ease forwards",
        "bounce-outward": "bounceOutward 1s ease-out forwards",
        "scroll-mobile": "scroll 30s linear infinite",
      },
      screens: {
        sm: { min: "768px", max: "1024px" },
        tablet: { min: "768px", max: "1024px" },
        md: { min: "1025px", max: "1920px" },
        lg: { min: "1921px" },
      },
    },
  },
  // Tailwind v4 uses a new plugin system
  plugins: [],
};
