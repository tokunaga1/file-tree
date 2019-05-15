const tilde = require('./postcss-tilde-module')();

module.exports = (ctx) => ({
  plugins: [
    tilde,
  ]
});
