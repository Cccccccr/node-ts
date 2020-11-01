import * as koaSession from 'koa-session';
import { RouterCon } from '../comInterface';
import { methodsEnum } from '../comData';

const getSession: RouterCon = {
    method: methodsEnum.get,
    path: '/getSession',
    handle: async ctx => {
        let session: string = '';
        session = 'leonruncai - node frame';
        ctx.body = {
            session
        };
    }
};

const checkSession: RouterCon = {
    method: methodsEnum.get,
    path: '/checkSession',
    handle: async ctx => {
        console.log('checkSession', ctx);
        ctx.body = {
            path: 'checkSession'
        };
    }
};

const session: RouterCon = {
    path: '/session',
    modules: [
        getSession,
        checkSession
    ]
};

export default session;

