module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'no-console': 'error',
    semi: ['error', 'always'],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    quotes: ['error', 'single'],
    eqeqeq: ['error', 'always'],
    'sort-imports': 'off',
    'no-duplicate-imports': 'error',
    'no-trailing-spaces': 'warn',
    'comma-dangle': ['error', {
      arrays: 'never',
      objects: 'never',
      imports: 'never',
      exports: 'never',
      functions: 'never'
    }],
    'object-curly-spacing': ['error', 'always'],
    'no-multi-spaces': 'warn',
    '@typescript-eslint/no-var-requires': 'off',
    'array-bracket-spacing': ['error', 'always'],
    camelcase: 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off'
  },
};
