module.exports = {
  root: true,
  extends: ["custom"],
  rules: {
    "no-restricted-imports": [
      "error",
      {
        "patterns": ["@features/*/*"]
      }
    ]
  },
};
