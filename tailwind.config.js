/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
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
