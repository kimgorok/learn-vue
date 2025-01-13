module.exports = {
  root: true,
  parserOptions: {
    requireConfigFile: false,
    parser: "@babel/eslint-parser",
    ecmaVersion: 2020,
    sourceType: "module",
  },
  env: {
    es6: true,
    node: true,
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended"],
};
