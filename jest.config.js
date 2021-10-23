module.exports = {
  projects: ['./jest-unit-config.js'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '\\.(spec|interface|d|type).ts'
  ],
  coverageReporters: [
    'text-summary',
    'text',
    'html'
  ],
  coverageThreshold: {
    global: {
      lines: 85
    }
  }
};
