const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

// 启用CORS
app.use(cors());

// 配置代理
app.use('/weather', createProxyMiddleware({
  target: 'https://api.map.baidu.com',
  changeOrigin: true,
  pathRewrite: {
    '^/weather': '/weather/v1'
  },
  onProxyReq: (proxyReq, req, res) => {
    // 在这里可以修改请求头或其他请求参数
    console.log('Proxying request to:', req.url);
  },
  onProxyRes: (proxyRes, req, res) => {
    // 在这里可以修改响应头或其他响应参数
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
  }
}));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});