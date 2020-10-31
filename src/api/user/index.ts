import session from './session';
import cookies from './cookies';
import { RouterCon } from '../comInterface';

const modules: Array<RouterCon> = [
    session,
    cookies
];

const user: RouterCon = {
    path: '/user',
    modules
};

export default user;

