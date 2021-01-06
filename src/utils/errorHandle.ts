import { Koa } from '../importCom';

class ErrorHandle {
    constructor() {}

    public forbidden (ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext>) {
        // ctx.status = 403;
        // ctx.set('fcgi-error', '权限校验失败');
        ctx.body = {};
        ctx.append('fcig-error', '权限校验失败');
    }
}

export default new ErrorHandle();