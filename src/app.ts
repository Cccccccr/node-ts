import * as Koa from 'koa';

const app = new Koa();

app.use(async (ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext>, next: Koa.Next) => {
  try {
    // console.log('app.ts init');
    console.log(ctx.cookies.get('uid'), '-------------');
    // 这里可以进行全局的接口权限判断
    await next();
  } catch (err) {
      ctx.response.status = err.statusCode || err.status || 500;
      ctx.response.body = {
          message: err.message
      };
  }
});

module.exports = app;