import { RouterCon } from '../comInterface';
import { methodsEnum } from '../comData';
import activityDB from '../../modules/mysql/index';
import { failRespon } from '../utils';

const stateEnum = {
    review: 1,
    access: 2,
    reject: 3,
};

const create: RouterCon = {
    method: methodsEnum.post,
    path: '/create',
    handle: async ctx => {
        console.log('activity create');
        try {
            const reqBody = ctx.request.body;
            const uid = ctx.cookies.get('uid');
            const userSql = `select distinct * from user where user_id = ${uid}`;
            const { content, createTime, startTime, endTime, place } = reqBody;
            if (!uid) {
                failRespon(ctx, '获取用户信息失败');
                return;
            }
            const userRes = await activityDB.query(userSql);
            if (!userRes || !userRes.length) {
                failRespon(ctx, '不存在该用户');
                return;
            }
            const activityRes = await activityDB.query('select * from activity order by activity_id');
            const activityID = activityRes.length ? activityRes[activityRes.length - 1].activity_id + 1 : 1;
            const insertSql = `INSERT INTO activity(activity_id, user_id, activity_content, activity_picture_list, activity_create_date, activity_start, activity_end, activity_place, like_times, favorites_times, activity_state) VALUES (${activityID}, ${uid}, '${content}', '', ${createTime}, ${startTime}, ${endTime}, '${place}', 0, 0, ${stateEnum.review})`;
            const insertRes = await activityDB.insert(insertSql);
            console.log(insertRes);
            if (insertRes) {
                ctx.body = {
                    activityID
                };
            }
        } catch (err) {
            failRespon(ctx, '创建活动失败');
            console.error(err);
        }
    },
};

const modules: Array<RouterCon> = [
    create,
];

const Activity: RouterCon = {
    path: '/activity',
    modules,
};

export default Activity;