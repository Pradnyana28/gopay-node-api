const base = require('./jest-base-config');

module.exports = {
  ...base,
  displayName: {
    name: 'unit',
    color: 'yellow'
  },
  testRegex: './src/.+(spec|test)\\.ts$',
  moduleNameMapper: {
    '^index': '<rootDir>/src/index'
  }
};
