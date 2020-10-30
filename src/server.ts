import router from './api/index';
import * as path from 'path';
import * as KoaStatic from 'koa-static';
import * as cors from 'koa2-cors';
import Website from './config/website';

const app = require('./app');
const website = new Website({
  scheme: 'http',
  host: 'localhost',
  port: 8888
});

// app.use(cors());
console.log(__dirname);
app.use(KoaStatic(path.join(__dirname, 'pages')));

const server = app.listen(website.port, () => {
  console.log(`Server is running at ${website.getUrl()}`);
  console.log('Press CTRL-C to stop.');
});

app.use(router.routes());

module.exports = server;