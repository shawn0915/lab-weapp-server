// 引用 express 来支持 HTTP Server 的实现
const express = require('express');
// 引用 wafer-session 支持小程序会话
const waferSession = require('wafer-node-session'); 
// 使用 MongoDB 作为会话的存储
const MongoStore = require('connect-mongo')(waferSession); 
// 引入配置文件
const config = require('./config'); 

// 创建一个 express 实例
const app = express();

// 添加会话中间件，登录地址是 /login
app.use(waferSession({ 
    appId: config.appId, 
    appSecret: config.appSecret, 
    loginPath: '/login',
    store: new MongoStore({ 
        url: `mongodb://${config.mongoUser}:${config.mongoPass}@${config.mongoHost}:${config.mongoPort}/${config.mongoDb}` 
    }) 
})); 

// 在路由 /me 下，输出会话里包含的用户信息
app.use('/me', (request, response, next) => { 
    response.json(request.session ? request.session.userInfo : { noBody: true }); 
    if (request.session) {
        console.log(`Wafer session success with openId=${request.session.userInfo.openId}`);
    }
}); 

// 实现一个中间件，对于未处理的请求，都输出 "Response from express"
app.use((request, response, next) => {
    response.write('Response from express');
    response.end();
});

// 监听端口，等待连接
app.listen(config.serverPort);

// 输出服务器启动日志
console.log(`Server listening at http://127.0.0.1:${config.serverPort}`);
