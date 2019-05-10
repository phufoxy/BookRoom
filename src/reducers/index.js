import { combineReducers } from 'redux';
import EventReducer from './events';
import RoomReducer from './room';
import BookRoomReducer from './bookroom';
const rootReducer = combineReducers({
    event: EventReducer,
    room: RoomReducer,
    bookroom: BookRoomReducer,
});
export default rootReducer;