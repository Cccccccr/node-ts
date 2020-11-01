import { RouterCon } from '../comInterface';
import { methodsEnum } from '../comData';

const maxAge = 1000 * 60 * 60;

const setCookies: RouterCon = {
    method: methodsEnum.get,
    path: '/setCookies',
    handle: async ctx => {
        let cookies: string = '';
        cookies = 'leonruncai - node frame';
        ctx.cookies.set('username', 'leonruncai', {
            maxAge,
            httpOnly: true
        });
        ctx.body = {
            cookies
        };
    }
};

const cookies: RouterCon = {
    path: '/cookies',
    modules: [
        setCookies,
    ]
};

export default cookies;

