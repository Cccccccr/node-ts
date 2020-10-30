import * as Koa from 'koa';

interface RouterCon {
    path: String;
    method?: string;
    handle?: (ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext>, next?: Koa.Next) => any;
    modules?: Array<RouterCon>;
}

export {
    RouterCon
};