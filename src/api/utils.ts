import { ParameterizedContext } from 'koa';

const failRespon = (ctx: ParameterizedContext, errorMsg: string) => {
    ctx.body = {
        succ: false,
        errorMsg
    };
};

const getQuerySql = (table: string, query?: any) => {
    let sql = `select distinct * from ${table}`;
    if (query) {
        let first = true;
        Object.keys(query).forEach((item: any, index: number) => {
            if (query[item]) {
                if (first) {
                    sql += ` where ${item} = `;
                    first = false;
                } else {
                    sql += ` and ${item} = `;
                }
                if (typeof query[item] === 'string') {
                    sql += `'${query[item]}'`;
                }
                if (typeof query[item] === 'number') {
                   sql += `${query[item]}`;
                }
            }
        });
    }
    return sql;
};

export {
    failRespon,
    getQuerySql,
};