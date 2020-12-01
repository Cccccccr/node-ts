import { RouterCon, AdminData, ActivityData } from '../comInterface';
import { methodsEnum, ReviewStatusEnum } from '../comData';
import activityDB from '../../modules/mysql/index';
import { failRespon } from '../utils';

const login: RouterCon = {
    method: methodsEnum.post,
    path: '/login',
    handle: async ctx => {
        try {
            const reqBody = ctx.request.body;
            const { email, password } = reqBody;
            const sql = `select distinct * from admin where admin_account = '${email}'`;
            const res = await activityDB.query(sql);
            if (res && res.length) {
                const userData = res[0];
                if (userData.admin_password === password) {
                    const respBody: AdminData = getAdminData(userData);
                    ctx.cookies.set('adminid', userData.admin_id);
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
        const adminid = ctx.cookies.get('adminid');
        const sql
         = `select distinct * from admin where admin_id = ${adminid}`;
        const res = await activityDB.query(sql);
        if (res && res.length) {
            const userData = res[0];
            const respBody: AdminData = getAdminData(userData);
            ctx.body = respBody;
        } else {
            failRespon(ctx, 'cookies失效');
        }
    }
};

const getActivityList: RouterCon = {
    method: methodsEnum.post,
    path: '/getActivityList',
    handle: async ctx => {
        const sql
         = `select distinct * from activity`;
        const res = await activityDB.query(sql);
        if (res) {
            const respBody: Array<any> = [];
            res.forEach((item: ActivityData) => {
                respBody.push({
                    activityId: item.activity_id,
                    userId: item.user_id,
                    content: item.activity_content,
                    createDate: item.activity_create_date,
                    start: item.activity_start,
                    end: item.activity_end,
                    place: item.activity_place,
                    status: item.activity_state,
                });
            });
            ctx.body = {
                infos: respBody,
                count: respBody.length,
            };
        } else {
            failRespon(ctx, '请求失败');
        }
    }
};

const reviewActicity: RouterCon = {
    method: methodsEnum.post,
    path: '/reviewActicity',
    handle: async ctx => {
        const reqBody = ctx.request.body;
        const { activityId, status } = reqBody;
        if (activityId && status) {
            const sql
             = `select distinct * from activity where activity_id = ${activityId}`;
            const updateSql = `UPDATE activity SET activity_state = ${status} WHERE activity_id = ${activityId};`;
            const res = await activityDB.query(sql);
            if (res && res.length) {
                const currStatus = res[0].activity_state;
                console.log(status, ~Object.values(ReviewStatusEnum).indexOf(status));
                if (currStatus !== ReviewStatusEnum.review) {
                    failRespon(ctx, '不是审核中的活动不可以更改活动状态');
                } else {
                    if (!~Object.values(ReviewStatusEnum).indexOf(status)) {
                        failRespon(ctx, '未知的活动状态');
                    } else {
                        const res = await activityDB.query(updateSql);
                        if (res) {
                            ctx.body = {};
                        }
                    }
                }
            } else {
                failRespon(ctx, '查找活动失败');
            }
        }
    }
};

const modules: Array<RouterCon> = [
    login,
    checkLogin,
    getActivityList,
    reviewActicity,
];

const Admin: RouterCon = {
    path: '/admin',
    modules,
};

export default Admin;

function getAdminData(adminData: any): AdminData {
    return {
        adminId: adminData.admin_id,
        account: adminData.admin_account,
        role: adminData.admin_role,
    };
}
