module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["testing-library"],
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:testing-library/react",
  ],
  overrides: [{ files: ["**/*.tsx"], rules: { "react/prop-types": "off" } }],
};
