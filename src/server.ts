import * as path from 'path';
import {
  router,
  KoaStatic,
  cors,
  Website,
  bodyparser,
} from './importCom';

const app = require('./app');
const website = new Website({
  scheme: 'http',
  host: 'localhost',
  port: 9527,
});

app.use(cors());
app.use(KoaStatic(path.join(__dirname, 'static')));
app.use(bodyparser());

app.use(router.routes());

const server = app.listen(website.port, () => {
  console.log(`Server is running at ${website.getUrl()}`);
  console.log('Press CTRL-C to stop.');
});

module.exports = server;