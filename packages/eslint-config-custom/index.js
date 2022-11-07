module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: [
            '../../apps/*/tsconfig.json',
            '../../packages/*/tsconfig.json'
        ],
    },
    ignorePatterns: [
        "**/dist/*",
        "**/build/*",
        "**/.next/*",
        "**/storybook-static/*",
        "**/node_modules/*",
    ],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "next/core-web-vitals",
        "turbo",
        "prettier"
    ],
    plugins: [
        "@typescript-eslint",
        "cypress"
    ],
    rules: {
        // common
        "object-curly-spacing": ["error", "always"],
        //  next
        "@next/next/no-html-link-for-pages": "off",
        // react
        "react/jsx-key": "off",
        // cypress
        "cypress/no-assigning-return-values": "error",
        "cypress/no-unnecessary-waiting": "error",
        "cypress/assertion-before-screenshot": "warn",
        "cypress/no-force": "warn",
        "cypress/no-async-tests": "error",
        "cypress/no-pause": "error"
    },
    env: {
        es2021: true
    }
};
