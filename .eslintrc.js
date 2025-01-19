module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto', // 운영체제에 따라 줄바꿈 문자를 자동으로 설정 (Windows: CRLF, Linux/Mac: LF)
        singleQuote: true, // 문자열에 작은따옴표 사용 ("대신 '를 사용)
        semi: true, // 문장 끝에 세미콜론 사용
        useTabs: false, // 탭 대신 스페이스 사용 false
        tabWidth: 2, // 들여쓰기 너비를 2칸으로 설정
        trailingComma: 'all', // 객체나 배열의 마지막 항목에도 콤마 추가
        printWidth: 120, // 한 줄의 최대 길이를 120자로 제한
        arrowParens: 'always', // 화살표 함수의 매개변수를 항상 괄호로 감싸기 (x => x 대신 (x) => x 사용)
      },
    ],
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
};
