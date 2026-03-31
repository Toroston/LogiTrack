module.exports = {
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src", "<rootDir>/tests"], // 👈 importante en tu caso
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  moduleFileExtensions: ["js", "jsx"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"]
};