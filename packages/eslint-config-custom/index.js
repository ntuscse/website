module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "next/core-web-vitals", "turbo", "prettier"],
  plugins: [
    "@typescript-eslint",
    "cypress"
  ],
  rules: {
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
