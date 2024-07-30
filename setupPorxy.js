const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/api', createProxyMiddleware({
    target: process.env.REACT_APP_API_URL || 'http://127.24.7.29:8080',
    changeOrigin: true,
  }));
};