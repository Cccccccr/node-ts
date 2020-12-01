import session from './session';
import cookies from './cookies';
import { RouterCon, UserData } from '../comInterface';
import { methodsEnum } from '../comData';
import activityDB from '../../modules/mysql/index';
import { failRespon } from '../utils';

const login: RouterCon = {
    method: methodsEnum.post,
    path: '/login',
    handle: async ctx => {
        try {
            const reqBody = ctx.request.body;
            const { email, password } = reqBody;
            const sql = `select distinct * from user where user_email = '${email}'`;
            const res = await activityDB.query(sql);
            if (res && res.length) {
                const userData = res[0];
                if (userData.user_password === password) {
                    const respBody: UserData = getUserData(userData);
                    ctx.cookies.set('uid', userData.user_id);
                    ctx.body = respBody;
                } else {
                    failRespon(ctx, '密码错误');
                }
            } else {
                failRespon(ctx, '不存在该用户');
            }
        } catch (err) {
            failRespon(ctx, '查询用户信息失败');
        }
    }
};

const checkLogin: RouterCon = {
    method: methodsEnum.post,
    path: '/checkLogin',
    handle: async ctx => {
        const uid = ctx.cookies.get('uid');
        const sql
         = `select distinct * from user where user_id = ${uid}`;
        const res = await activityDB.query(sql);
        if (res && res.length) {
            const userData = res[0];
            const respBody: UserData = getUserData(userData);
            ctx.body = respBody;
        } else {
            failRespon(ctx, 'cookies失效');
        }
    }
};

const modules: Array<RouterCon> = [
    session,
    cookies,
    login,
    checkLogin,
];

const User: RouterCon = {
    path: '/user',
    modules,
};

export default User;

function getUserData(userData: any) {
    return {
        userId: userData.user_id,
        email: userData.user_email,
        avatar: userData.user_avatar,
        name: userData.user_name,
        phone: userData.user_phone,
        commitScore: userData.commit_score,
        commitAuth: userData.commit_auth,
        activityScore: userData.activity_score,
        activityAuth: userData.activity_auth
    };
}
