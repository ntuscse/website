module.exports = {
  "stories": [
    "../stories/introduction.stories.mdx",
    "../components/**/*.stories.mdx",
    "../components/**/*.stories.@(js|jsx|ts|tsx)",
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  "addons": [
    "@chakra-ui/storybook-addon",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
      "storybook-addon-next",
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-webpack5"
  },
  "features": {
    "emotionAlias": false,
  },
  "staticDirs": ['../assets'],
}
