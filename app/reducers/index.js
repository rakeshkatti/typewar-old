import {combineReducers} from 'redux';
import words from './words';
import buffer from './buffer';
import letters from './letters';
import users from './users';

export default combineReducers({
    letters,
    buffer,
    words,
    users
})