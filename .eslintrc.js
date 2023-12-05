/** @type {import("eslint").Linter.Config} */
module.exports = {
  ignorePatterns: ['apps/**', 'packages/**', 'tooling/**'],
  extends: ['@browsercare/eslint-config/node.js'],
};
