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
        'kibo-bg': 'var(--color-kibo-bg)',    // Main Background
        'kibo-red': 'var(--color-present)',   // Kibo Red (Present)
        'kibo-purple': 'var(--color-future)', // Kibo Purple (Future)
        'kibo-blue': 'var(--color-total)',    // Kibo Blue (Total/Income)
        'kibo-teal': 'var(--color-living)',   // Kibo Teal/Green (Living)

        // Categories Palette (Correctly mapped)
        'cat-dark': 'var(--color-kibo-bg)',
        'cat-mint': 'var(--color-living)',    // Living (Green)
        'cat-sage': 'var(--color-total)',     // Total (Blue)
        'cat-pale': 'var(--color-present)',   // Present (Red)
        'cat-white': '#F2F2F2',   // Text

        // Semantic Mapping (Updated)
        'trust-navy': 'var(--color-kibo-bg)',
        'growth-green': 'var(--color-living)', // Living (Green)
        'alert-amber': 'var(--color-present)', // Present (Red)
        'cyber-cyan': 'var(--color-living)',   // Living Green
        'laser-magenta': 'var(--color-total)', // Total Blue
        'flux-violet': 'var(--color-future)',  // Future Purple

        // Legacy/Compatibility Layer (Mapped to New Palette to Remove Old Colors)
        'glass-surface': 'var(--color-kibo-bg)',
        'secondary-text': 'var(--color-living)',
        'cobalt-blue': 'var(--color-living)',
        'electric-orange': 'var(--color-future)',
        'acid-green': 'var(--color-future)',
        'void-black': 'var(--color-kibo-bg)',
        'card-surface': 'var(--color-kibo-bg)',

        // Standard
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
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
