import session from './session';
import cookies from './cookies';
import { RouterCon, UserData, UserDataDB } from '../comInterface';
import { AuthTypeEnum, methodsEnum, ReviewStatusEnum } from '../comData';
import activityDB from '../../modules/mysql/index';
import { failRespon, getQuerySql } from '../utils';

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
        try {
            const uid = ctx.cookies.get('uid');
            const sql
             = `select distinct * from user where user_id = ${uid}`;
            const res = uid !== undefined ? await activityDB.query(sql) : '';
            if (res && res.length) {
                const userData = res[0];
                const respBody: UserData = getUserData(userData);
                ctx.body = respBody;
            } else {
                failRespon(ctx, 'cookies失效');
            }
        } catch (err) {
            console.error(err);
        }
    }
};

const getUserList: RouterCon = {
    method: methodsEnum.post,
    path: '/getUserList',
    handle: async ctx => {
        try {
            const reqBody = ctx.request.body;
            const { userId, email, name, phone, commitAuth, activityAuth } = reqBody;
            const sql = getQuerySql('user', {
                user_id: userId,
                user_email: email,
                user_name: name,
                user_phone: phone,
                commit_auth: commitAuth,
                activity_auth: activityAuth,
            });
            console.log(sql);
            const res = await activityDB.query(sql);
            if (res) {
                const respBody: Array<any> = [];
                res.forEach((item: UserDataDB) => {
                    respBody.push({
                        userId: item.user_id,
                        email: item.user_email,
                        phone: item.user_phone,
                        commitScore: item.commit_score,
                        commitAuth: item.commit_auth,
                        activityScore: item.activity_score,
                        activityAuth: item.activity_auth,
                        name: item.user_name,
                    });
                });
                ctx.body = {
                    infos: respBody,
                    count: respBody.length,
                };
            } else {
                failRespon(ctx, '请求失败');
            }
        } catch (err) {
            console.log(err);
        }
    }
};

const deleteUser: RouterCon = {
    method: methodsEnum.post,
    path: '/deleteUser',
    handle: async ctx => {
        const reqBody = ctx.request.body;
        const { userId } = reqBody;
        const sql
         = `delete from user where user_id = ${userId + 1}`;
        if (userId) {
            const res = await activityDB.query(sql);
            if (res) {
                ctx.body = {};
            } else {
                failRespon(ctx, '删除失败');
            }
        }
    }
};

const authManage: RouterCon = {
    method: methodsEnum.post,
    path: '/authManage',
    handle: async ctx => {
        try {
            const reqBody = ctx.request.body;
            const { userId, authType, authStatus } = reqBody;
            let updateKey = '';
            switch (authType) {
                case AuthTypeEnum.activity:
                    updateKey = 'activity_auth';
                    break;
                case AuthTypeEnum.commit:
                    updateKey = 'commit_auth';
                    break;
                default:
                    break;
            }
            if (userId && updateKey) {
                const sql
                 = `update user set ${updateKey} = ${authStatus} where user_id = ${userId}`;
                const res = await activityDB.query(sql);
                if (res) {
                    ctx.body = {};
                } else {
                    failRespon(ctx, '修改用户权限失败');
                }
            }
        } catch (err) {
            console.error(err);
        }
    }
};

const getActivityList: RouterCon = {
    method: methodsEnum.post,
    path: '/getActivityList',
    handle: async ctx => {
        try {
            const reqBody = ctx.request.body;
            const { status } = reqBody;
            let sql
             = `select distinct * from activity, user where activity.user_id = user.user_id`;
            if (status) {
                sql += ` and activity.activity_state = ${ReviewStatusEnum.access}`;
            }
            const res = await activityDB.query(sql);
            if (res) {
                const respBody: Array<any> = [];
                res.forEach((item: any) => {
                    respBody.push({
                        activityId: item.activity_id,
                        userId: item.user_id,
                        content: item.activity_content,
                        createDate: item.activity_create_date,
                        start: item.activity_start,
                        end: item.activity_end,
                        place: item.activity_place,
                        status: item.activity_state,
                        userName: item.user_name,
                    });
                });
                ctx.body = {
                    infos: respBody,
                    count: respBody.length,
                };
            } else {
                failRespon(ctx, '请求失败');
            }
        } catch (err) {
            console.log(err);
        }
    }
};

const modules: Array<RouterCon> = [
    session,
    cookies,
    login,
    checkLogin,
    getUserList,
    deleteUser,
    authManage,
    getActivityList,
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
