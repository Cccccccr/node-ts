// 引入babel-ployfill，不然使用babel编译会报错
import 'babel-polyfill';

import * as path from 'path';
import {
  router,
  KoaStatic,
  cors,
  Website,
  bodyparser,
  Koa,
  ErrorHandle,
  redis,
} from './importCom';

const app = require('./app');
const website = new Website({
  scheme: 'http',
  host: 'localhost',
  port: 9527,
});

// 开发环境出现跨域才需要开
app.use(cors());

app.use(KoaStatic(path.join(__dirname, '../', 'static')));
console.log(path.join(__dirname, '../', 'static'));

app.use(bodyparser());

// 在router前面做权限校验，可以使得静态资源时不需要进行校验，节省逻辑判断
app.use(async (ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext>, next: Koa.Next) => {
  console.log(ctx.cookies.get('uid'), '-------------');
  if (ctx.path === '/dist/fcgi/user/checkLogin') {
    ErrorHandle.forbidden(ctx);
    return;
  }
  next();
});

// 测试代码片段
app.use(async (ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext>, next: Koa.Next) => {
  // const rdb1 = redis.createClient();
  // const rbd2 = redis.createClient();
  // console.log(rdb1, rbd2, '-------------');
  next();
});

app.use(router.routes());

const server = app.listen(website.port, () => {
  console.log(`Server is running at ${website.getUrl()}`);
  console.log('Press CTRL-C to stop.');
});

// const client = redis.createClient();
// console.log(client, '-------------');
// client.on('error', (error: any) => {
//   console.log(error, client, '-------------');
//   client.quit();
// });


module.exports = server;