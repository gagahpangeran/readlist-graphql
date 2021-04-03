module.exports = {
  testEnvironment: "node",
  transform: {
    ".(ts|tsx)": "ts-jest"
  },
  collectCoverageFrom: ["src/**/*.ts"],
  testMatch: ["<rootDir>/test/**/*.test.ts"],
  moduleFileExtensions: ["ts", "js"]
};
