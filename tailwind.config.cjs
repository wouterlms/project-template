/** @type {import('tailwindcss').Config} */

const themeSwapper = require('tailwindcss-theme-swapper')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,ts}",
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
        9: 9
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
                primary: '#3492D0',
                secondary: '#E83C54',
                green: '#43b581',
                orange: '#e6a23c',
                red: '#f56c6c',
              },
              gray: {
                primary: '#f5f6fc',
                secondary: '#e1e2e8',
                tertiary: '#b8b9be',
                quaternary: '#9c9c9c',
              }
            },
            textColor: {
              primary: '#272c33',
              secondary: '#5b6573',
              tertiary: '#718096',
              input: '#606266',
            },
            backgroundColor: {
              primary: '#ffffff',
              secondary: '#F8F9FD',
              tertiary: '#EFEFF4',
              input: '#ffffff'
            },
            borderColor: {
              primary: '#dcdfe6',
              secondary: '#e4e7ed',
              tertiary: '#ebeef5',
              input: '#dcdfe6'
            },
          },
        },
        {
          name: 'dark',
          selectors: ["[data-theme='dark']"],
          theme: {
            colors: {
              accent: {
                primary: '#3492D0',
                secondary: '#E83C54',
                green: '#43b581',
                orange: '#e6a23c',
                red: '#f56c6c',
              },
              gray: {
                primary: '#1c1d20',
                secondary: '#212225',
                tertiary: '#26272a',
                quaternary: '#2b2c2f',
              }
            },
            textColor: {
              primary: '#ffffff',
              secondary: '#d6d6d6',
              tertiary: '#969696',
              input: '#eeeeee'
            },
            backgroundColor: {
              primary: '#1C1C1E',
              secondary: '#2C2C2E',
              tertiary: '#3A3A3C',
              input: '#18191c'
            },
            borderColor: {
              primary: '#343539',
              secondary: '#2f3034',
              tertiary: '#2A2B2F',
              input: '#0a0a0a'
            },
          },
        }
      ]
    })
  ],
}