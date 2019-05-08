import { combineReducers } from 'redux';
import EventReducer from './events';
import RoomReducer from './room';
const rootReducer = combineReducers({
    event: EventReducer,
    room: RoomReducer
});
export default rootReducer;