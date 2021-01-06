import * as Koa from 'koa';

const app = new Koa();

app.use(async (ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext>, next: Koa.Next) => {
  try {
    // console.log('app.ts init');
    // 把请求url都转为小写
    // ctx.request.url = ctx.request.url.toLowerCase(); // 不是这个
    // ctx.originalUrl = ctx.originalUrl.toLowerCase(); // 不是这个
    // ctx.path = ctx.path.toLowerCase(); // koa-router源码上是这个，但是改了没用
    // console.log(ctx);
    await next();
  } catch (err) {
      ctx.response.status = err.statusCode || err.status || 500;
      ctx.response.body = {
          message: err.message
      };
  }
});

module.exports = app;