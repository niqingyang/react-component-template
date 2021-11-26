const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    // https://github.com/storybookjs/presets/issues/220
    core: {
        builder: 'webpack5',
    },
    stories: [
        "../src/**/*.stories.mdx",
        "../src/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/preset-scss"
    ],
    // https://github.com/storybookjs/storybook/issues/15336
    typescript: {"reactDocgen": false},
    // custom webpack config
    webpackFinal: (config) => {
        config.resolve.plugins = [
            ...(config.resolve.plugins || []),
            // 配置别名
            // https://storybook.js.org/docs/react/configure/webpack#typescript-module-resolution
            new TsconfigPathsPlugin({
                extensions: config.resolve.extensions,
            }),
        ];
        return config;
    },
}