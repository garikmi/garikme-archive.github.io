module.exports = {
  // content: ['./src/**/*.{html,js}'],
  content: ['../../layouts/**/*.{html,js}'],
  theme: {
    colors: {
      'sunglo': '#E06C75',
      'fountain_blue': '#56B6C2',
      'cornflower_blue': '#61AFEF',
      'olivine': '#98C379',
      'whiskey': '#D19A66',
      'harvest_gold': '#E5C07B',
      'lavender': '#B57EDC',
      'shuttle_gray': '#5F6672',
      'cadet_blue': '#A9B2C3',
      'ghost': '#C6CCD7',
      'bunker': '#0D1117',
      'woodsmoke': '#181A1F',
      'shark': '#21252B',
      'dodger_blue': '#1085FF',
      'rob_roy': '#E9D16C',
      'valencia': '#D74E42',
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
