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

interface UserDataDB {
    user_id?: number;
    user_email?: string;
    user_password?: string;
    user_acatar?: string;
    user_phone?: string;
    user_name?: string;
    commit_score?: number;
    commit_auth?: number;
    activity_score?: number;
    activity_auth?: number;
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
    UserDataDB,
    AdminData,
    ActivityData
};