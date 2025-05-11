module.exports = {
    root: true,
    "env": {
        "node": true,
        "vue/setup-compiler-macros": true
    },
    extends: [
      'plugin:vue/vue3-recommended',
      'eslint:recommended',
    ],
    globals: {
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly',
      },
    parser: 'vue-eslint-parser',
    parserOptions: {
      parser: '@babel/eslint-parser',
      ecmaVersion: 2020,
      sourceType: 'module',
      extraFileExtensions: ['.vue']
    },
    rules: {
      'vue/no-export-in-script-setup': 'off',
      'no-undef': 'off',
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'func-call-spacing': 'off',

    }
  }
  