// postcss.config.mjs
const config = {
  plugins: {
    "@tailwindcss/postcss": {},      // Tailwind v4’s plugin
    autoprefixer: {},                // still useful for vendor prefixes
  },
}
export default config
