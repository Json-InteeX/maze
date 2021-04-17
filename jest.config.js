module.exports = {
  collectCoverage: true,
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  globals: {
    TYPE: 'SERVER',
  },
  coverageReporters: ['json', 'json-summary'],
  moduleFileExtensions: ['js', 'json'],
};