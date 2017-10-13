// 引用 express 来支持 HTTP Server 的实现
const express = require('express');

// 创建一个 express 实例
const app = express();

// 实现唯一的一个中间件，对于所有请求，都输出 "Response from express"
app.use((request, response, next) => {
    response.write('Response from express');
    response.end();
});

// 监听端口，等待连接
const port = 8765;
app.listen(port);

// 输出服务器启动日志
console.log(`Server listening at http://127.0.0.1:${port}`);
