module.exports = {
  clearMocks: true,
  verbose:true,
  roots: ['<rootDir>/src'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/config/setupTests.ts'],

  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  testRegex: '((\\.|/*.)(test|spec))\\.[tj]sx?$',

  coverageDirectory: "<rootDir>/reports",
  coverageReporters: ['cobertura', 'html', 'lcov', 'text-summary', 'text'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/index.tsx',
    '!src/themes/**/*.{js,ts}',
    '!src/index.dev.ts',
    '!src/**/*.styles.ts',
    '!src/config/**/*.{ts,js}',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/i18n/**/*.{js,ts}',
    '!src/clients/**/*',
    '!src/types/**/*.d.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      lines: 100,
      functions: 100,
      statements: 100,
    },
  },
  moduleNameMapper: {
    '\\.(svg)$': '<rootDir>/config/mocks/fileMock.js',
    "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules"
  },

  testResultsProcessor: 'jest-sonar-reporter',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'jest tests',
        outputDirectory: "<rootDir>/reports",
        outputName: 'junit.xml',
        classNameTemplate: '{classname} - {title}',
        titleTemplate: '{classname} - {title}',
        ancestorSeparator: ' > ',
        usePathForSuiteName: 'true',
      },
    ],
  ],
};