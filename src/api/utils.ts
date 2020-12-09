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

const getInsertSql = (table: string, data?: any) => {
    let sql = `insert into ${table} set`;
    if (data) {
        const arr = Object.keys(data);
        arr.forEach((item: any, index: number) => {
            if (data[item]) {
                sql += ` ${item} = `;
                if (typeof data[item] === 'string') {
                    sql += `'${data[item]}'`;
                }
                if (typeof data[item] === 'number') {
                   sql += `${data[item]}`;
                }
                if (index !== arr.length - 1) {
                    sql += ',';
                }
            }
        });
    }
    console.log(sql);
    return sql;
};

export {
    failRespon,
    getQuerySql,
    getInsertSql,
};