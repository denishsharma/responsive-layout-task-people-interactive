import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  stylistic: {
    indent: 2,
    semi: false,
    quotes: 'single',
    overrides: {
      'style/comma-dangle': ['error', 'always-multiline'],
      'style/array-bracket-newline': ['error', { multiline: true, minItems: 3 }],
      'style/function-call-argument-newline': ['error', 'consistent'],
      'style/brace-style': [
        'error',
        '1tbs',
        { allowSingleLine: true },
      ],
      'style/max-statements-per-line': ['error', { max: 2 }],
      'style/wrap-regex': 'error',
      'style/member-delimiter-style': 'error',
    },
  },
  typescript: {
    overrides: {
      'ts/no-redeclare': 'off',
    },
  },
  lessOpinionated: true,
})
