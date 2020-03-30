module.exports = {
  client: {
    // includes: ['app/app/frontend/src/**/*.{js,graphql}', 'frontend/src/**/*.{js,graphql}'],
    // excludes: ['app/app/frontend/tests/**/*.js'],
    service: {
      // name: 'gateway',
      url: 'http://localhost:4000/graphql',
      skipSSLValidation: true,
    },
  },
};
