// jest.config.js
module.exports = {
  // The test environment that will be used for testing
  testEnvironment: 'jsdom',

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // A map from regular expressions to module names or to arrays of module names
  // that allow to stub out resources with a single module
  moduleNameMapper: {
    // Handle path aliases (adjust based on your tsconfig.json)
    '^@/(.*)$': '<rootDir>/$1',

    // Handle CSS imports (if you import CSS in components)
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',

    // Handle image imports
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js', // You might need to create this mock file
  },

  // Indicates whether each individual test should be reported during the run
  verbose: true,

  // Setup files to run before each test file (e.g., for polyfills or jest-dom setup)
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js', '<rootDir>/jest.setup.js'],

  // The pattern Jest uses to detect test files
  // testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$', // Default, adjust if needed

  // Transform files with babel-jest using next/babel preset
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }], // Use next/babel preset for Next.js compatibility
  },

  // Ignore transformations for node_modules except for specific ones if needed
  transformIgnorePatterns: [
      '/node_modules/',
      '^.+\\.module\\.(css|sass|scss)$',
  ],
};
