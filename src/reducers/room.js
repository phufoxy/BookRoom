import { REQUEST_GET_ROOMS, REQUEST_DELETE_ROOM, REQUEST_ADD_ROOM,REQUEST_UPDATE_ROOM} from '../actions/room';
const INITIAL_STATE = {
    all: [],
    fetching: false,
    fetched: false,
    error: null,

}

export default function (state = INITIAL_STATE, action = {}) {
    switch (action.type) {

        case REQUEST_GET_ROOMS:
            return Object.assign({}, state, {
                all: action.payload,
            })
        case REQUEST_DELETE_ROOM:
            return Object.assign({}, state, {
                all: state.all.filter(item => item.id !== action.payload)
            })
        case REQUEST_ADD_ROOM:
            return Object.assign({}, state, {
                all: [...state.all, action.payload]
            })
        case REQUEST_UPDATE_ROOM:
            return Object.assign({},state,{
                all: state.all.map(data => data.id === action.payload.id ? action.payload : data)
            })
        default:
            return state;
    }

}