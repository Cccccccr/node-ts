import session from './session';
import cookies from './cookies';
import { RouterCon } from '../comInterface';

const modules: Array<RouterCon> = [
    session,
    cookies
];

const User: RouterCon = {
    path: '/user',
    modules
};

export default User;

