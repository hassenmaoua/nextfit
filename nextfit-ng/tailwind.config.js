/** @type {import('tailwindcss').Config} */
import PrimeUI from 'tailwindcss-primeui';

export default {
    darkMode: ['selector', '[class="app-dark"]'],
    content: ['./src/**/*.{html,ts,scss,css}', './index.html'],
    plugins: [PrimeUI],
    theme: {
        screens: {
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            '2xl': '1920px'
        }
    },
    safelist: [
    // Grid columns
    ...Array.from({ length: 12 }, (_, i) => `md:grid-cols-${i + 1}`),
    // Column spans
    ...Array.from({ length: 12 }, (_, i) => `md:col-span-${i + 1}`),
    // Full span
    'md:col-span-full'
  ],
};
