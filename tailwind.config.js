const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        error: 'var(--color-error)',
        additional: 'var(--color-additional)',
        outline: 'var(--color-outline)',
        attention: 'var(--color-attention)',
      },
      opacity: {
        4: '0.04',
        8: '0.08',
        16: '0.16',
        32: '0.32',
        48: '0.48',
        64: '0.64',
      },
      gridTemplateColumns: {
        'detailed-device-view': '256px minmax(0, 1fr)',
        'device-inventory-view': '196px minmax(0, 1fr)',
      },
    },
  },
  plugins: [],
};
