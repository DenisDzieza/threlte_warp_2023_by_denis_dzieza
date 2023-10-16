import plugin from 'tailwindcss/plugin';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1440px',
      },
    },
    extend: {
      colors: {
        magnum: {
          '50': '#fff9ed',
          '100': '#fef2d6',
          '200': '#fce0ac',
          '300': '#f9c978',
          '400': '#f7b155',
          '500': '#f38d1c',
          '600': '#e47312',
          '700': '#bd5711',
          '800': '#964516',
          '900': '#793a15',
          '950': '#411c09',
        },
        blue: {
          '50': 'hsl(217, 50%, 97%)',
          '100': 'hsl(218, 51%, 93%)',
          '200': 'hsl(215, 51%, 87%)',
          '300': 'hsl(214, 51%, 78%)',
          '400': 'hsl(214, 50%, 68%)',
          '500': 'hsl(219, 48%, 60%)',
          '600': 'hsl(223, 45%, 53%)',
          '700': 'hsl(226, 41%, 50%)',
          '800': 'hsl(228, 38%, 40%)',
          '900': 'hsl(227, 35%, 33%)',
          '950': 'hsl(227, 31%, 21%)',
        },
        earth: {
          '50': 'hsl(276, 29%, 97%)',
          '100': 'hsl(273, 35%, 94%)',
          '200': 'hsl(278, 33%, 89%)',
          '300': 'hsl(281, 31%, 82%)',
          '400': 'hsl(285, 31%, 74%)',
          '500': 'hsl(290, 28%, 67%)',
          '600': 'hsl(295, 26%, 59%)',
          '700': 'hsl(296, 20%, 51%)',
          '800': 'hsl(295, 18%, 41%)',
          '900': 'hsl(294, 17%, 34%)',
          '950': 'hsl(295, 16%, 16%)',
        },
        gray: {
          '50': 'hsl(240, 17%, 98%)',
          '100': 'hsl(280, 13%, 95%)',
          '200': 'hsl(260, 14%, 92%)',
          '300': 'hsl(264, 13%, 85%)',
          '400': 'hsl(265, 14%, 76%)',
          '500': 'hsl(270, 13%, 66%)',
          '600': 'hsl(273, 13%, 58%)',
          '700': 'hsl(275, 10%, 49%)',
          '800': 'hsl(274, 11%, 42%)',
          '900': 'hsl(273, 10%, 35%)',
          '950': 'hsl(272, 11%, 23%)',
        },
        green: {
          '50': 'hsl(144, 71%, 96%)',
          '100': 'hsl(141, 69%, 90%)',
          '200': 'hsl(145, 66%, 80%)',
          '300': 'hsl(148, 62%, 67%)',
          '400': 'hsl(150, 55%, 52%)',
          '500': 'hsl(152, 72%, 43%)',
          '600': 'hsl(154, 81%, 30%)',
          '700': 'hsl(155, 81%, 24%)',
          '800': 'hsl(155, 76%, 20%)',
          '900': 'hsl(157, 74%, 16%)',
          '950': 'hsl(157, 78%, 9%)',
        },
        orange: {
          '50': 'hsl(26, 89%, 96%)',
          '100': 'hsl(25, 95%, 92%)',
          '200': 'hsl(23, 91%, 83%)',
          '300': 'hsl(22, 90%, 72%)',
          '400': 'hsl(18, 90%, 63%)',
          '500': 'hsl(15, 88%, 53%)',
          '600': 'hsl(11, 85%, 48%)',
          '700': 'hsl(8, 83%, 40%)',
          '800': 'hsl(6, 73%, 34%)',
          '900': 'hsl(6, 69%, 28%)',
          '950': 'hsl(3, 76%, 15%)',
        },
        red: {
          '50': 'hsl(333, 60%, 97%)',
          '100': 'hsl(332, 70%, 95%)',
          '200': 'hsl(333, 77%, 90%)',
          '300': 'hsl(334, 76%, 82%)',
          '400': 'hsl(335, 76%, 70%)',
          '500': 'hsl(337, 72%, 60%)',
          '600': 'hsl(340, 63%, 51%)',
          '700': 'hsl(342, 69%, 45%)',
          '800': 'hsl(343, 66%, 35%)',
          '900': 'hsl(343, 61%, 30%)',
          '950': 'hsl(342, 75%, 17%)',
        },
        violet: {
          '50': 'hsl(276, 45%, 98%)',
          '100': 'hsl(273, 48%, 95%)',
          '200': 'hsl(276, 42%, 91%)',
          '300': 'hsl(278, 40%, 83%)',
          '400': 'hsl(279, 40%, 73%)',
          '500': 'hsl(279, 36%, 61%)',
          '600': 'hsl(280, 30%, 52%)',
          '700': 'hsl(281, 32%, 40%)',
          '800': 'hsl(282, 31%, 33%)',
          '900': 'hsl(283, 27%, 28%)',
          '950': 'hsl(283, 39%, 16%)',
        }
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'SF Mono',
          'Menlo',
          'Consolas',
          'Liberation Mono',
          'monospace',
        ],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            code: {
              position: 'relative',
              borderRadius: theme('borderRadius.md'),
            },
          },
        },
      }),
    },
  },

  plugins: [
    typography,
    plugin(function ({ addVariant, matchUtilities, theme }) {
      addVariant('hocus', ['&:hover', '&:focus']);
      // Square utility
      matchUtilities(
        {
          square: (value) => ({
            width: value,
            height: value,
          }),
        },
        { values: theme('spacing') }
      );
    }),
  ],
};
