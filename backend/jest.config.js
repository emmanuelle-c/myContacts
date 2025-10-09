export default {
  testEnvironment: "node",
  roots: ["<rootDir>"],
  testMatch: ["**/tests/**/*.test.js"],
  moduleFileExtensions: ["js", "json"],
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  verbose: true,
};
