module.exports = {
  testEnvironment: "jsdom",
  roots: ["<rootDir>", "<rootDir>/tests"],
  moduleDirectories: ["node_modules", "<rootDir>"], // busca primero node_modules dentro de src, luego en src mismo
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  moduleNameMapper: {
    "^@src/(.*)$": "<rootDir>/$1" // alias opcional si quieres usar @src/ para tus imports internos
  }
};