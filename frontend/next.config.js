// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: '/_not-found',
        destination: '/', // Redirect or remove this entry if needed
        permanent: true,
      },
    ]
  },
};
