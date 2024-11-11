module.exports = {
  rules: {
    'react/jsx-sort-props': [
      2,
      {
        noSortAlphabetically: true,
      },
    ],
    "@typescript-eslint/consistent-type-definitions": [ "error", "type" ],
    "camelcase": "off",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "variable",
        "format": null
      }
    ]
  },
};
