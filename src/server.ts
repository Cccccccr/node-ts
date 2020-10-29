import router from './api/index';
import * as path from 'path';
import * as KoaStatic from 'koa-static';
import * as cors from 'koa2-cors';

const app = require('./app');

// app.use(cors());
app.use(KoaStatic(path.join(__dirname, '../pages')));

const server = app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
  console.log('Press CTRL-C to stop \n');
});

app.use(router.routes());

module.exports = server;