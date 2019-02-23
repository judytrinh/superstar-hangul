module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    '@neutrinojs/airbnb',
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
