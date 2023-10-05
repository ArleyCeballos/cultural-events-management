import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      colors: {
        "event-gray": '#121212',
        "light-grey": '#A7A7A7',
        "degradate-gray":"#1C1C1C",
        "card-grey": "#242424",
        "NavBar": "#3B4653",
        "Icon-fond": "#090909",
        "Text-Icon": "#9F9F9F",
        "Show":"#B3B3B3",
        "Card-Font": "#181818",
        "svg-fond": "#1F4E99",
        "sideBar": "#1B222A",
      }

    },
  },
  plugins: [],
}
export default config
