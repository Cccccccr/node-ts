import * as Router from 'koa-router';
import User from './user/index';
import Rsa from './rsa';

import { RouterCon } from './comInterface';
import { methodsEnum } from './comData';

/** api路由模块 */
const router = new Router();
const basePath = '/fcgi';
const modulesList: RouterCon[] = [
    User,
    Rsa
];

const pathArr: Array<string> = [];
function addPath2Router(modulesList: Array<RouterCon>, path: string = basePath) {
    modulesList.forEach(item => {
        if (item.modules) {
            addPath2Router(item.modules, path + item.path);
        } else {
            const resPath = path + item.path;
            const { method, handle } = item;
            pathArr.push(resPath);
            switch (method) {
                case methodsEnum.get:
                    router.get(resPath, handle);
                    break;
                case methodsEnum.post:
                    router.post(resPath, handle);
                    break;
                case methodsEnum.put:
                    router.put(resPath, handle);
                    break;
                case methodsEnum.delete:
                    router.delete(resPath, handle);
                    break;
                case methodsEnum.options:
                    router.options(resPath, handle);
                    break;
                case methodsEnum.patch:
                    router.patch(resPath, handle);
                    break;
                default:
                    console.error('unknow methods');
                    break;
            }
        }
    });
}

addPath2Router(modulesList);

export default router;