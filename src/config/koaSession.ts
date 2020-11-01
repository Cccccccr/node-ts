const KoaSessionConf = {
    key: 'koa:defaultsess', // 默认的cookie签名
    maxAge: 60 * 60 * 1000, // cookie的最大过期时间
    autoCommit: true, // (boolean) automatically commit headers (default true)
    overwrite: true, // 无效属性
    httpOnly: true, // (boolean) httpOnly or not (default true)
    signed: true, // 默认签名与否
    rolling: false, // 每次请求强行设置cookie
    renew: false, // cookie快过期时自动重新设置
};