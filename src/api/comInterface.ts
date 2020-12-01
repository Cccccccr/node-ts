import * as Koa from 'koa';

interface RouterCon {
    path: String;
    method?: string;
    handle?: (ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext>, next?: Koa.Next) => any;
    modules?: Array<RouterCon>;
}

interface UserData {
    userId?: number;
    email?: string;
    password?: string;
    avatar?: string | Array<string>;
    name?: string;
    phone?: string;
    commitScore?: number;
    commitAuth?: number;
    activityScore?: number;
    activityAuth?: number;
}

interface AdminData {
    adminId?: number;
    account?: string;
    password?: string;
    role?: string;
}

interface ActivityData {
    activity_id?: number;
    user_id?: number;
    activity_content?: string;
    activity_create_date?: number;
    activity_start?: number;
    activity_end?: number;
    activity_place?: string;
    activity_state?: number;
}

export {
    RouterCon,
    UserData,
    AdminData,
    ActivityData
};