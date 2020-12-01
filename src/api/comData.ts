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

export {
    methodsEnum,
    ReviewStatusEnum,
};