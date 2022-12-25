export type ColorGroup = 'accent' | 'neutral' | 'text' | 'background' | 'border'

export interface ColorShade {
  50?: string | [string, string]
  100: string | [string, string]
  200: string | [string, string]
  300: string | [string, string]
  400: string | [string, string]
  500: string | [string, string]
  600: string | [string, string]
  700: string | [string, string]
  800: string | [string, string]
  900: string | [string, string]
}

export type Color = string | [string, string] | ColorShade | [ColorShade, ColorShade]

export type Colors = {
  [key in ColorGroup]: Record<string, Color>
}

const colors = {
  accent: {
    primary: {
      100: '#6193ff',
      200: '#6193ff',
      300: '#6193ff',
      400: '#6193ff',
      500: '#6193ff',
      600: '#6193ff',
      700: '#6193ff',
      800: '#6193ff',
      900: '#6193ff',
    },
    success: {
      100: '#d9f0e6',
      200: '#b4e1cd',
      300: '#8ed3b3',
      400: '#69c49a',
      500: '#43b581',
      600: '#369167',
      700: '#286d4d',
      800: '#1b4834',
      900: '#0d241a',
    },
    warning: {
      100: '#faecd8',
      200: '#f5dab1',
      300: '#f0c78a',
      400: '#ebb563',
      500: '#e6a23c',
      600: '#b88230',
      700: '#8a6124',
      800: '#5c4118',
      900: '#2e200c',
    },
    danger: {
      100: '#fde2e2',
      200: '#fbc4c4',
      300: '#f9a7a7',
      400: '#f78989',
      500: '#f56c6c',
      600: '#c45656',
      700: '#934141',
      800: '#622b2b',
      900: '#311616',
    },
  },
  neutral: {
    50: ['#fafafa', '0f0f0f'],
    100: ['#f5f5f5', '#171717'],
    200: ['#e5e5e5', '#262626'],
    300: ['#d4d4d4', '#404040'],
    400: ['#a3a3a3', '#525252'],
    500: ['#737373', '#737373'],
    600: ['#525252', '#f5f5f5'],
    700: ['#404040', '#e5e5e5'],
    800: ['#262626', '#d4d4d4'],
    900: ['#171717', '#a3a3a3'],
  },
  background: {
    primary: ['#ffffff', '#1C1C1E'],
    primaryInverted: ['#1C1C1E', '#ffffff'],
    secondary: ['#F8F9FD', '#2C2C2E'],
    tertiary: ['#EFEFF4', '#3A3A3C'],
    input: ['#ffffff', '#141414'],
    inputDisabled: ['#f7fafc', '#141414'],
    switch: ['#dddfe6', '#39383c'],
  },
  text: {
    primary: ['#272c33', '#ffffff'],
    primaryInverted: ['#ffffff', '#272c33'],
    secondary: ['#5b6573', '#d6d6d6'],
    tertiary: ['#718096', '#969696'],
    input: ['#606266', '#eeeeee'],
    inputDisabled: ['#c0c4cc', '#686868'],
    inputPlaceholder: ['#c0c4cc', '#585858'],
  },
  border: {
    input: ['#dcdfe6', '#0a0a0a'],
  },
}/* satisfies Colors */

export default colors
