module.exports = {
  comments: false,
  presets: [
    [
      '@babel/preset-env',
    ],
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties', {loose: true}],
  ],
  env: {
    node: {
      sourceMaps: 'both',
      sourceType: 'unambiguous',
      sourceFileName: 'js/index.js',
    },
  },
  ignore: ['node_modules'],
};