import { combineReducers } from 'redux';
import EventReducer from './events';
import RoomReducer from './room';
import BookRoomReducer from './bookroom';
import LoginReducer from './login';
const rootReducer = combineReducers({
    event: EventReducer,
    room: RoomReducer,
    bookroom: BookRoomReducer,
    login: LoginReducer
});
export default rootReducer;