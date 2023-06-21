module.exports = {
  root: true,
  extends: ["custom"],
  parserOptions: {
    project: ["./tsconfig.json"],
  },
  rules: {
    "no-restricted-imports": [
      "error",
      {
        patterns: ["@features/*/*"],
      },
    ],
  },
};
