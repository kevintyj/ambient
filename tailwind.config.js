/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'am-pink':'#de273c',
        'helper-primary': '#EA6042',
        'helper-secondary': '#FF9979',
        'helper-transparent': '#EA604229',
        'helper-dark': '#511C10'
      },
      fontFamily: {
        'display': ['Hubot Sans', ...defaultTheme.fontFamily.sans],
      },
      typography: ( theme ) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.600'),
            h: {
              color: theme('colors.gray.800'),
            },
            strong: {
              color: theme('colors.gray.700'),
            },
            a: {
              color: theme('colors.green.500'),
              '&:hover': {
                color: theme('colors.green.600')
              },
            },
          },
        }
      })
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
