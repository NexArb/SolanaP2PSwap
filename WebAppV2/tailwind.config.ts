import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-button':
          'linear-gradient(270deg, #10E9A2 -0.08%, #429FD6 50.48%, #9749FB 100%)',
        'pricing-box':
          'linear-gradient(to right, rgba(164, 183, 255, 0.16), rgba(164, 183, 255, 0.16))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-main':
          'linear-gradient(349deg, #4A056A 2.44%, #09092E 14.03%, #000617 32.67%)',
        'gradient-about':
          'linear-gradient(to bottom right, #12056A, #020A07, #06012E, #09092E, #4A056A)'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
export default config
