/** @type {import('jest').Config} */

const config = {
    "preset": "react-native",
    "setupFilesAfterEnv": ["@testing-library/jest-native/extend-expect"],
    "transformIgnorePatterns": [
      "node_modules/(?!((jest-)?react-native(-.*)?|@react-native(-community)?)/)"
        ],
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
    ],
      "moduleNameMapper": {
      "\\.(png)$": "<rootDir>/__mock__/MockImage.tsx",
    },
    "setupFiles": [
        "./jest-setup.js"
      ]
  }

  module.exports = config;