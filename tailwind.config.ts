import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#020204', // Background color
        panel: '#021e2e', // bg of panels
        panel2: '#003d48', // bg of before/after section
        ivory: '#e2e2e4',  // text color
        ember: '#0b6fea', // dark ocean blue
        ember2: '#1592C8', // light ocean blue
        mute: '#84868D', // muted text color
        line: 'rgba(226,226,228,0.09)', // line color
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
