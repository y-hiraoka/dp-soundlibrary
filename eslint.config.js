import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier";
import tailwindcss from "eslint-plugin-tailwindcss";
import tseslint from "typescript-eslint";

export default [
  ...tseslint.configs.strict,
  ...nextCoreWebVitals,
  ...tailwindcss.configs["flat/recommended"],
  prettier,
  {
    rules: {
      "import/order": ["warn", { alphabetize: { order: "asc" } }],
      "@next/next/no-img-element": "off",
      "no-duplicate-imports": "warn",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/no-access-state-in-setstate": "error",
      "react/jsx-boolean-value": "warn",
      "react/jsx-fragments": "warn",
      "react/self-closing-comp": ["warn", { component: true, html: true }],
      "react/void-dom-elements-no-children": "error",
      "@typescript-eslint/explicit-module-boundary-types": "warn",
    },
  },
];
