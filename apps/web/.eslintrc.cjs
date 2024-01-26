module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    '@yurychang/react',
    '@yurychang/typescript',
    'plugin:vitest/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'prettier',
  ],
  plugins: ['simple-import-sort', 'import'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  rules: {
    'import/no-absolute-path': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
  },
};
