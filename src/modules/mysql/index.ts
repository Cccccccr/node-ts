import { MysqlError } from 'mysql';
import ConnectMysql from './connectConf';

const connectConfig = new ConnectMysql({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'qwer0515',
    database: 'school_activity' // activity_db
});

const pool = connectConfig.createPool();

class ActicityDB {
    constructor() {}

    public query(sql: string): Promise<any> {
        return new Promise((resolve, reject) => {
            pool.query(sql, function (error: MysqlError | null, results: any) {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
    }

    public insert(sql: string): Promise<any> {
        return new Promise((resolve, reject) => {
            pool.query(sql, function (error: MysqlError | null, results: any) {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
    }
 }

const activityDB: ActicityDB = new ActicityDB();

export default activityDB;