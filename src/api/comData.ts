const methodsEnum = {
    get: 'get',
    post: 'post',
    put: 'put',
    delete: 'delete',
    options: 'options',
    patch: 'patch',
};

const ReviewStatusEnum =  {
    review: 1, // 审核中
    access: 2, // 审核通过
    reject: 3, // 审核拒绝
};

const AuthEnum = {
    access: 1, // 有权限
    reject: 2, // 没有权限
};

const ParmasType = {
    str: 'string',
    num: 'number',
};

const AuthTypeEnum = {
    commit: 1, // 评论
    activity: 2, // 活动
};

const AddAndDeleteEnum = {
    add: 1, // 增加
    delete: 2, // 删除
};

export {
    methodsEnum,
    ReviewStatusEnum,
    AuthEnum,
    ParmasType,
    AuthTypeEnum,
    AddAndDeleteEnum,
};