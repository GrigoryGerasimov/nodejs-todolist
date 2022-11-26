module.exports = {
    env: {
        browser: true,
        node: true,
        commonjs: true,
        es2021: true
    },
    extends: "standard",
    overrides: [],
    parserOptions: {
        ecmaVersion: "latest"
    },
    rules: {
        indent: ["error", 4, { SwitchCase: 1 }],
        semi: ["error", "always"],
        "space-before-function-paren": [
            "error",
            { named: "never", asyncArrow: "never", anonymous: "never" }
        ],
        quotes: ["error", "double", { allowTemplateLiterals: true }]
    }
};
