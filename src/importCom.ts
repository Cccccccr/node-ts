import router from './api/index';
import * as KoaStatic from 'koa-static';
import * as cors from 'koa2-cors';
import Website from './config/website';
import * as Koa from 'koa';
import ErrorHandle from './utils/errorHandle';

const bodyparser = require('koa-bodyparser');
const redis = require('redis');

export {
    router,
    KoaStatic,
    cors,
    Website,
    bodyparser,
    Koa,
    ErrorHandle,
    redis,
};