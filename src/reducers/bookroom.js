import * as types from '../constants/actionType';
const INTINIAL_STATE = {
    all: [],
    fetching: false,
    fetched: false,
    error: null,
}

export default function(state = INTINIAL_STATE, action = {}){
    switch(action.type){
        case types.REQUEST_GET_BOOKROOM:
            return Object.assign({},state,{
                all: action.payload
            })
        case types.REQUEST_DELETE_BOOKROOM:
            return Object.assign({},state,{
                all: state.all.filter(item => item.id !== action.payload)
            })
        case types.REQUEST_ADD_BOOKROOM:
            return Object.assign({},state,{
                all: [...state.all,action.payload]
            })

        case types.REQUEST_UPDATE_BOOKROOM:
            return Object.assign({},state,{
                all: state.all.map(data => data.id === action.payload.id ? action.payload : data)
            })
        default:
            return state;
    }
}