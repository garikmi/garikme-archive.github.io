module.exports = {
  // content: ['./src/**/*.{html,js}'],
  content: ['../../layouts/**/*.{html,js}'],
  theme: {
    colors: {
      'base': '#191724',
      'surface': '#1f1d2e',
      'overlay': '#26233a',
      'muted': '#6e6a86',
      'subtle': '#908caa',
      'text': '#e0def4',
      'love': '#eb6f92',
      'gold': '#f6c177',
      'rose': '#ebbcba',
      'pine': '#31748f',
      'foam': '#9ccfd8',
      'iris': '#c4a7e7',
      'highlight_low': '#21202e',
      'highlight_med': '#403d52g',
      'highlight_high': '#524f67'
    },
    extend: {
      fontFamily: {
        'mono': ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace']
      },
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  plugins: [],
}
