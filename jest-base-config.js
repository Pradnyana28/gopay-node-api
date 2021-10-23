module.exports = {
  moduleFileExtensions: ['js', 'ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      isolatedModules: true
    }
  }
};
