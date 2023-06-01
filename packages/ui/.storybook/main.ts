import {StorybookConfig} from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: [
    "../components/**/*.stories.mdx",
    "../components/**/*.stories.@(js|jsx|ts|tsx)",
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@chakra-ui/storybook-addon",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-mdx-gfm"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  },
  features: {
    // emotionAlias: false
  },
  typescript: {
    reactDocgen: "react-docgen"
  },
  staticDirs: ["../assets"],
  docs: {
    autodocs: true
  },
  core: {
    disableTelemetry: true
  },
};

export default config;
