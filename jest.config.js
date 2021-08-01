require('jest-fetch-mock').enableMocks();

module.exports = {
  testURL: 'http://localhost:9999',
  testPathIgnorePatterns: ['__mocks__/*'],
  moduleNameMapper: {
    '\\.(css|scss|jpg|png|svg)$': '<rootDir>/empty-module.js'
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  modulePaths: ['<rootDir>'],
  setupFiles: ['<rootDir>/setupTests.js'],
  name: 'product-grid',
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95
    }
  }
};
