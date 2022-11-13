module.exports = {
  parser: "@typescript-eslint/parser",
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
    // typescript
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      rules: {
        "@typescript-eslint/no-empty-interface": ["off", "never"],
        "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      },
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: [
          "../../packages/**/tsconfig.json",
          "../../apps/**/tsconfig.json"
        ]
      }
    },

    //storybook
    {
      files: ["**/*.stories.*", "**/*.story.*"],
      rules: {
        "@typescript-eslint/await-thenable": ["off", "never"], // enable stepping back in storybook debugger
      }
    }
  ]
};
