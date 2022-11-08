module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: [
      '../../apps/*/tsconfig.json',
      '../../packages/*/tsconfig.json'
    ],
  },
  env: {
    es2021: true
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
    "prettier",
    "plugin:storybook/recommended",
  ],
  plugins: [
    "@typescript-eslint",
    "cypress"
  ],
  rules: {
    // common
    "object-curly-spacing": ["error", "always"],
    // typescript
    "@typescript-eslint/no-empty-interface": ["off", "never"],
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
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
  overrides: [
    {
      files: ["**/*.stories.*", "**/*.story.*"],
      rules: {
        "@typescript-eslint/await-thenable": ["off", "never"], // enable stepping back in storybook debugger
      }
    }
  ]
};
