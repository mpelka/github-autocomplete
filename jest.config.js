module.exports = {
  globals: { "ts-jest": { isolatedModules: true } },
  moduleNameMapper: { "\\.(css)$": "<rootDir>/test-utils/styleMock.ts" },
  preset: "ts-jest",
  roots: ["<rootDir>"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect", "./jest.setup.ts"],
  testEnvironment: "node",
  transform: { "^.+\\.(ts|tsx)$": "ts-jest", "^.+\\.(js|jsx)$": "ts-jest" },
};
