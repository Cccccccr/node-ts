import { ParameterizedContext } from 'koa';

const failRespon = (ctx: ParameterizedContext, errorMsg: string) => {
    ctx.body = {
        succ: false,
        errorMsg
    };
};

export {
    failRespon
};