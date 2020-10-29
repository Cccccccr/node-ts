import * as Koa from 'koa';

const app = new Koa();

app.use(async (ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext>, next: Koa.Next) => {
  try {
    // console.log('app.ts init');
    await next();
  } catch (err) {
      ctx.response.status = err.statusCode || err.status || 500;
      ctx.response.body = {
          message: err.message
      };
  }
});

module.exports = app;