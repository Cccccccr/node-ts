import * as path from 'path';
import {
  router,
  KoaStatic,
  cors,
  Website
} from './importCom';

const app = require('./app');
const website = new Website({
  scheme: 'http',
  host: 'localhost',
  port: 8888
});

app.use(cors());
app.use(KoaStatic(path.join(__dirname, 'pages')));

app.use(router.routes());

const server = app.listen(website.port, () => {
  console.log(`Server is running at ${website.getUrl()}`);
  console.log('Press CTRL-C to stop.');
});

module.exports = server;