/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gh: {
          canvas: {
            DEFAULT: '#0d1117',
            subtle: '#161b22',
            inset: '#010409',
            overlay: '#1f242c',
          },
          border: {
            DEFAULT: '#30363d',
            muted: '#21262d',
            active: '#58a6ff',
          },
          text: {
            DEFAULT: '#e6edf3',
            muted: '#848d97',
            subtle: '#6e7681',
          },
          accent: {
            DEFAULT: '#58a6ff',
            emphasis: '#1f6feb',
            muted: 'rgba(56, 139, 253, 0.15)',
          },
          success: {
            DEFAULT: '#238636',
            fg: '#3fb950',
            emphasis: '#2ea043',
            muted: 'rgba(46, 160, 67, 0.15)',
          },
          danger: {
            DEFAULT: '#da3633',
            fg: '#f85149',
            muted: 'rgba(248, 81, 73, 0.15)',
          },
          attention: {
            DEFAULT: '#9e6a03',
            fg: '#d29922',
            muted: 'rgba(187, 128, 9, 0.15)',
          },
          purple: {
            DEFAULT: '#8957e5',
            fg: '#a371f7',
            muted: 'rgba(163, 113, 247, 0.15)',
          }
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Noto Sans', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'SF Mono', 'Menlo', 'Consolas', '"Liberation Mono"', 'monospace'],
      }
    },
  },
  plugins: [],
}
