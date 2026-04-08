import { colors } from './colors.config'
import type { Config } from 'tailwindcss'

const {
  primary_light,
  primary,
  primary_dark,
  secondary_light,
  secondary,
  warn,
  active,
  active_light,
  danger,
  border,
  light_gray,
  blue,
} = colors

const config: Config = {
  important: true,
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        onest: 'var(--font-onest)',
      },
      colors: {
        border: border,
        primary: {
          light: primary_light,
          DEFAULT: primary,
          dark: primary_dark,
        },
        active: { DEFAULT: active, light: active_light },
        warn: { DEFAULT: warn },
        danger: { DEFAULT: danger },
        secondary: { light: secondary_light, DEFAULT: secondary },
        gray: {
          light: light_gray,
        },
        blue,
      },
      container: {
        center: true,
      },
      screens: {
        d2xl: { max: '1535px' },
        dxl: { max: '1279px' },
        dlg: { max: '1000px' },
        dmx: { max: '960px' },
        dmd: { max: '860px' },
        dsm: { max: '639px' },
        dxx: { max: '570px' },
        dxs: { max: '400px' },
      },
    },
  },
  plugins: [],
}
export default config
