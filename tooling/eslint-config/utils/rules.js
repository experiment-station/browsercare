const rules = {
  '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
  '@typescript-eslint/consistent-type-imports': 'error',
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/no-import-type-side-effects': 'error',
  '@typescript-eslint/no-misused-promises': [
    'error',
    {
      checksVoidReturn: false,
    },
  ],
  '@typescript-eslint/no-non-null-assertion': 'warn',
  '@typescript-eslint/no-unsafe-argument': 'off',
  'import/consistent-type-specifier-style': 'error',
  'import/no-default-export': 'off',
  'import/no-duplicates': 'error',
  'import/order': 'off',
  'prefer-named-capture-group': 'off',
  'react/no-array-index-key': 'off',
};

module.exports = rules;
