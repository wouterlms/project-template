/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const themeSwapper = require('tailwindcss-theme-swapper')

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,ts}',
  ],
  theme: {
    extend: {
      zIndex: {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
      },
      boxShadow: {
        card: 'rgb(0 0 0 / 2%) 0px 2px 4px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    themeSwapper({
      themes: [
        {
          name: 'base',
          selectors: [':root'],
          theme: {
            colors: {
              accent: {
                primary: '#000000',
                secondary: '#E83C54',
                green: '#43b581',
                orange: '#e6a23c',
                red: '#f56c6c',
              },
              gray: {
                'primary': '#f5f6fc',
                'primary-inverted': '#1c1d20',
                'secondary': '#e1e2e8',
                'secondary-inverted': '#212225',
                'tertiary': '#b8b9be',
                'tertiary-inverted': '#26272a',
                'quaternary': '#9c9c9c',
                'quaternary-inverted': '#2b2c2f',
              },
            },
            textColor: {
              'primary': '#272c33',
              'primary-inverted': '#ffffff',
              'secondary': '#5b6573',
              'secondary-inverted': '#d6d6d6',
              'tertiary': '#718096',
              'tertiary-inverted': '#969696',
              'input': '#606266',
            },
            backgroundColor: {
              'primary': '#ffffff',
              'primary-inverted': '#1C1C1E',
              'secondary': '#F8F9FD',
              'secondary-inverted': '#2C2C2E',
              'tertiary': '#EFEFF4',
              'tertiary-inverted': '#3A3A3C',
              'input': '#ffffff',
            },
            borderColor: {
              'primary': '#dcdfe6',
              'primary-inverted': '#343539',
              'secondary': '#e4e7ed',
              'secondary-inverted': '#2f3034',
              'tertiary': '#ebeef5',
              'tertiary-inverted': '#2A2B2F',
              'input': '#dcdfe6',
            },
          },
        },
        {
          name: 'dark',
          selectors: ['[data-theme=\'dark\']'],
          theme: {
            colors: {
              accent: {
                primary: '#ffffff',
                secondary: '#E83C54',
                green: '#43b581',
                orange: '#e6a23c',
                red: '#f56c6c',
              },
              gray: {
                'primary': '#1c1d20',
                'primary-inverted': '#f5f6fc',
                'secondary': '#212225',
                'secondary-inverted': '#e1e2e8',
                'tertiary': '#26272a',
                'tertiary-inverted': '#b8b9be',
                'quaternary': '#2b2c2f',
                'quaternary-inverted': '#9c9c9c',
              },
            },
            textColor: {
              'primary': '#ffffff',
              'primary-inverted': '#272c33',
              'secondary': '#d6d6d6',
              'secondary-inverted': '#5b6573',
              'tertiary': '#969696',
              'tertiary-inverted': '#718096',
              'input': '#eeeeee',
            },
            backgroundColor: {
              'primary': '#1C1C1E',
              'primary-inverted': '#ffffff',
              'secondary': '#2C2C2E',
              'secondary-inverted': '#F8F9FD',
              'tertiary': '#3A3A3C',
              'tertiary-inverted': '#EFEFF4',
              'input': '#18191c',
            },
            borderColor: {
              'primary': '#343539',
              'primary-inverted': '#dcdfe6',
              'secondary': '#2f3034',
              'secondary-inverted': '#e4e7ed',
              'tertiary': '#2A2B2F',
              'tertiary-inverted': '#ebeef5',
              'input': '#0a0a0a',
            },
          },
        },
      ],
    }),
  ],
}
