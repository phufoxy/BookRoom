import axios from 'axios';
import { message } from 'antd';
import * as types from '../constants/actionType';
import * as API from '../constants/actionAPI';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
export function requestGetRoom() {
    return (dispatch) => {
        return axios.request({
            method: 'GET',
            url: `${API.API_URL}/rooms`,
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
            },
        }).then(function (response) {
            dispatch(receiveData(types.REQUEST_GET_ROOMS, response.data.data))
        }).catch(function (error) {

        })
    }
}
// delete room
export function requestDeleteRoom(id) {
    return (dispatch) => {
        return axios.request({
            method: 'DELETE',
            url: `${API.API_URL}/rooms/${id}`,
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                'Authorization': `${'bearer ' + cookies.get('token')}`
            },
        }).then(function (response) {
            message.success('Bạn Đã Xóa Thành Công')
            dispatch(receiveData(types.REQUEST_DELETE_ROOM, id))
        }).catch(function (error) {
            console.log(error);

        })
    }
}
// add room
export function requestAddRoom(data) {
    let body = null;
    body = {
        id: data.id,
        name: data.name,
        type: data.type
    }
    return (dispatch) => {
        return axios.request({
            method: 'POST',
            url: `${API.API_URL}/rooms`,
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                'Authorization': `${'bearer ' + cookies.get('token')}`
            },
            data: body
        }).then(function (response) {
            message.success('Bạn Đã Thêm  Thành Công')
            dispatch(receiveData(types.REQUEST_ADD_ROOM, response.data.data))
        }).catch(function (error) {
            console.log(error);

        })
    }
}
export function receiveData(action, payload) {
    return { type: action, payload };
}

//Edit
export function requestEditRoom(data) {    
    return (dispatch) => {
        return axios.request({
            method: 'PUT',
            url: `${API.API_URL}/rooms/${data.id}?name=${data.name}&type=${data.type}`,
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                'Authorization': `${'bearer ' + cookies.get('token')}`
            },

        }).then(function (response) {            
            dispatch(receiveData(types.REQUEST_UPDATE_ROOM, response.data))
        }).catch(function (error) {
            console.log(error);
        })
    }
}
// export function updateData(response) {
//     return {
//         type: REQUEST_UPDATE_ROOM,
//         payload: response
//     }
// }
