module.exports = {
    env: {
        node: true,
        browser: true,
        es2021: true,
        commonjs: true
    },
    extends: [
        'eslint:recommended'
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    globals: {
        module: 'writable',
        require: 'readonly',
        __dirname: 'readonly'
    }
} 