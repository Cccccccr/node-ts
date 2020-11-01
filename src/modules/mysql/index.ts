import { MysqlError } from 'mysql';
import ConnectMysql from './connectConf';

const connectConfig = new ConnectMysql({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'el1478ELS',
    database: 'activity_db' // activity_db
});

const pool = connectConfig.createPool();

class ActicityDB {
    constructor() {}

    public query(): Promise<any> {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * from ceshidata', function (error: MysqlError | null, results: any) {
                if (error) {
                    throw error;
                }
                resolve(results);
            });
        });
    }
}

const activityDB: ActicityDB = new ActicityDB();

export default activityDB;