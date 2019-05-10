import {REQUEST_GET_BOOKROOM,REQUEST_DELETE_BOOKROOM,REQUEST_ADD_BOOKROOM} from '../actions/bookroom';

const INTINIAL_STATE = {
    all: [],
    fetching: false,
    fetched: false,
    error: null,
}

export default function(state = INTINIAL_STATE, action = {}){
    switch(action.type){
        case REQUEST_GET_BOOKROOM:
            return Object.assign({},state,{
                all: action.payload
            })
        case REQUEST_DELETE_BOOKROOM:
            return Object.assign({},state,{
                all: state.all.filter(item => item.id !== action.payload)
            })
        case REQUEST_ADD_BOOKROOM:
            return Object.assign({},state,{
                all: [...state.all,action.payload]
            })
        default:
            return state;
    }
}