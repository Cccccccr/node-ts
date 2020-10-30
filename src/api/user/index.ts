import session from './session';
import { RouterCon } from '../comInterface';

const modules: Array<RouterCon> = [
    session
];

const user: RouterCon = {
    path: '/user',
    modules
};

export default user;

