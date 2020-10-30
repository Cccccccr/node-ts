import router from './api/index';
import * as KoaStatic from 'koa-static';
import * as cors from 'koa2-cors';
import Website from './config/website';

export {
    router,
    KoaStatic,
    cors,
    Website
};