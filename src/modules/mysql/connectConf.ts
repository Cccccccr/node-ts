import * as mysql from 'mysql';

interface MysqlConnectConf {
    connectionLimit?: number;
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
}

class ConnectMysql {
    public initConf: MysqlConnectConf;

    constructor(conf: MysqlConnectConf) {
        this.initConf = conf;
    }

    public getConf() {
        return this.initConf;
    }

    public createPool(conf: MysqlConnectConf = this.initConf) {
        return mysql.createPool(conf);
    }

    public createConnection(conf: MysqlConnectConf = this.initConf) {
        return mysql.createConnection(conf);
    }
}

export default ConnectMysql;


