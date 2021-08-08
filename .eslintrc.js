module.exports = {
  extends: [
    'eslint-config-crazymax',
    'eslint-config-crazymax/react',
    'eslint-config-crazymax/typescript',
  ],
  rules: {
    '@typescript-eslint/ban-ts-ignore': 'off',
    // note you must disable the base rule as it can report incorrect errors
    'no-use-before-define': 'off',

    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-use-before-define': ['error'],
    'import/no-default-export': 'warn',
  },
};
