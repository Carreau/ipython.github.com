/** @type {import('tailwindcss').Config}
 * Legacy compatibility config. New code should use the semantic tokens declared
 * in src/styles/global.css (`text-ink`, `bg-surface-2`, `text-brand-text`, …).
 * These entries only keep the older React islands (theme toggles, seasonal
 * banner, animated terminal) compiling.
 */
export default {
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        'ipython': {
          'blue': 'var(--theme-primary, #0D5C63)',
          'cyan': 'var(--theme-secondary, #008B95)',
          'green': 'var(--theme-accent, #059669)',
          'dark': '#0B1220',
          'slate': '#172238',
          'light': '#F0FDFA',
        },
      },
    },
  },
  plugins: [],
};
