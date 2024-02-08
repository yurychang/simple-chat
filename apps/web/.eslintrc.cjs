module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'plugin:vitest/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    '@yurychang/typescript',
    '@yurychang/react',
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
    '@typescript-eslint/no-misused-promises': [
      2,
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
    'react/prop-types': 'off',
  },
};
