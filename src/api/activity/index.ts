import { RouterCon } from '../comInterface';
import { AddAndDeleteEnum, methodsEnum } from '../comData';
import activityDB from '../../modules/mysql/index';
import { failRespon, getInsertSql } from '../utils';

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

const like: RouterCon = {
    method: methodsEnum.post,
    path: '/like',
    handle: async ctx => {
        try {
            const userId = ctx.cookies.get('uid');
            const reqBody = ctx.request.body;
            const { activityId, date, type } = reqBody;
            let sql = '';
            switch (type) {
                case AddAndDeleteEnum.add:
                    sql = getInsertSql('love', {
                        activity_id: activityId,
                        user_id: Number(userId),
                        like_date: date,
                    });
                    break;
                case AddAndDeleteEnum.delete:
                    sql = `delete from love where user_id = ${userId} and activity_id = ${activityId}`;
                    break;
            }
            if (userId && activityId && date) {
                const res = await activityDB.query(sql);
                if (res) {
                    ctx.body = {};
                } else {
                    failRespon(ctx, '点赞失败');
                }
            }
        } catch (err) {
            console.log(err);
        }
    }
};

const favorite: RouterCon = {
    method: methodsEnum.post,
    path: '/favorite',
    handle: async ctx => {
        try {
            const userId = ctx.cookies.get('uid');
            const reqBody = ctx.request.body;
            const { activityId, date, type } = reqBody;
            let sql = '';
            switch (type) {
                case AddAndDeleteEnum.add:
                    sql = getInsertSql('favorite', {
                        activity_id: activityId,
                        user_id: Number(userId),
                        favorite_date: date,
                    });
                    break;
                case AddAndDeleteEnum.delete:
                    sql = `delete from favorite where user_id = ${userId} and activity_id = ${activityId}`;
                    break;
            }
            if (userId && activityId && date && type) {
                const res = await activityDB.query(sql);
                if (res) {
                    ctx.body = {};
                } else {
                    failRespon(ctx, '收藏失败');
                }
            }
        } catch (err) {
            console.log(err);
        }
    }
};

const deleteActivity: RouterCon = {
    method: methodsEnum.post,
    path: '/delete',
    handle: async ctx => {
        const reqBody = ctx.request.body;
        const { activityId } = reqBody;
        const sql
         = `delete from activity where activity_id = ${activityId}`;
        if (activityId) {
            const res = await activityDB.query(sql);
            if (res) {
                ctx.body = {};
            } else {
                failRespon(ctx, '删除失败');
            }
        }
    }
};

const modules: Array<RouterCon> = [
    create,
    like,
    favorite,
    deleteActivity,
];

const Activity: RouterCon = {
    path: '/activity',
    modules,
};

export default Activity;