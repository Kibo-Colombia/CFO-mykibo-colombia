import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Kibo Main Palette (Updated to match new scheme)
        'kibo-bg': '#1B4034',    // Main Background
        'kibo-red': 'var(--color-present)',   // Kibo Red (Present)
        'kibo-purple': 'var(--color-future)', // Kibo Purple (Future)
        'kibo-blue': 'var(--color-total)',    // Kibo Blue (Total/Income) - UPDATED
        'kibo-teal': 'var(--color-living)',   // Kibo Teal/Green (Living) - UPDATED

        // Categories Palette (Correctly mapped)
        'cat-dark': '#1B4032',
        'cat-mint': 'var(--color-living)',    // Living (Green)
        'cat-sage': 'var(--color-total)',     // Total (Blue)
        'cat-pale': 'var(--color-present)',   // Present (Red)
        'cat-white': '#F2F2F2',   // Text

        // Semantic Mapping (Updated)
        'trust-navy': '#1B4034',
        'growth-green': 'var(--color-living)', // Living (Green) - UPDATED
        'alert-amber': 'var(--color-present)', // Present (Red)
        'cyber-cyan': 'var(--color-living)',   // Living Green - UPDATED
        'laser-magenta': 'var(--color-total)', // Total Blue - UPDATED
        'flux-violet': 'var(--color-future)',  // Future Purple

        // Legacy/Compatibility Layer (Mapped to New Palette to Remove Old Colors)
        'glass-surface': '#1B4034',
        'secondary-text': '#A9D9C7',
        'cobalt-blue': '#A9D9C7',
        'electric-orange': '#614FBB',
        'acid-green': '#614FBB',
        'void-black': '#1B4034',
        'card-surface': '#1B4034',

        // Standard
        background: '#1B4034',
        foreground: '#F2F2F2',
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
