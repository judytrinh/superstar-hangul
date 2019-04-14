module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    [
      '@neutrinojs/airbnb',
      {
        eslint: {
          // For supported options, see:
          // https://github.com/webpack-contrib/eslint-loader#options
          // https://eslint.org/docs/developer-guide/nodejs-api#cliengine
          // The options under `baseConfig` correspond to those
          // that can be used in an `.eslintrc.*` file.
          baseConfig: {
            rules: {
              'babel/semi': 'off',
              'react/destructuring-assignment': 'off',
              'jsx-a11y/no-autofocus': 'off'
            },
          },
        },
      }
    ],
    [
      '@neutrinojs/react',
      {
        html: {
          title: 'superstar-hangul'
        }
      }
    ],
    '@neutrinojs/jest'
  ]
};
