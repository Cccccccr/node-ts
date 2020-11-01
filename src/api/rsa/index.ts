import { RouterCon } from '../comInterface';
import { methodsEnum } from '../comData';

const getRsa: RouterCon = {
    method: methodsEnum.get,
    path: '/getRsa',
    handle: async ctx => {
        let rsa: string = '';
        rsa = 'leonruncai - node frame';
        ctx.body = {
            rsa
        };
    }
};

const checkRsa: RouterCon = {
    method: methodsEnum.get,
    path: '/checkRsa',
    handle: async ctx => {
        console.log('checkRsa', ctx);
        ctx.body = {
            path: 'checkRsa'
        };
    }
};

const Rsa: RouterCon = {
    path: '/rsa',
    modules: [
        getRsa,
        checkRsa
    ]
};

export default Rsa;

