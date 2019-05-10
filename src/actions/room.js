import axios from 'axios';
import { message } from 'antd';
import * as typeAPI from '../constants/actionAPI';
import * as types from '../constants/actionType';
export function requestGetRoom() {
    return (dispatch) => {
        return axios.request({
            method: 'GET',
            url: `${typeAPI.API_URL}/rooms`,
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
            },
        }).then(function (response) {
            dispatch(receiveData(types.REQUEST_GET_ROOMS, response.data.data))
        }).catch(function (error) {
            message.error(error);
        })
    }
}
// delete room
export function requestDeleteRoom(id) {
    return (dispatch) => {
        return axios.request({
            method: 'DELETE',
            url: `${typeAPI.API_URL}/rooms/${id}`,
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
            },
        }).then(function (response) {
            message.success('Bạn Đã Xóa Thành Công')
            dispatch(receiveData(types.REQUEST_DELETE_ROOM, id))
        }).catch(function (error) {
            message.error(error);

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
            url: `${typeAPI.API_URL}/rooms`,
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
            },
            data: body
        }).then(function (response) {
            message.success('Bạn Đã Thêm  Thành Công')
            dispatch(receiveData(types.REQUEST_ADD_ROOM, response.data.data))
        }).catch(function (error) {
            message.error(error);
        })
    }
}
//Edit
<<<<<<< HEAD
<<<<<<< HEAD
export function requestEditRoom(data) {
    return (dispatch) => {
=======
export function requestEditRoom(data){
    let formData = new FormData();
    formData.append('name',data.name);
    formData.append('type',data.type);
    return (dispatch)=>{
>>>>>>> First Commit
        return axios.request({
            method: 'PUT',
            url: `${API_URL}/rooms/${data.id}?name=${data.name}&type=${data.type}`,
=======
export function requestEditRoom(data) {
    let params = {
        'name': data.name,
        'type': data.type
    }
    return (dispatch) => {
        return axios.request({
            method: 'PUT',
            url: `${typeAPI.API_URL}/rooms/${data.id}`,
>>>>>>> Fix
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
            },
<<<<<<< HEAD

        }).then(function (response) {            
            dispatch(receiveData(REQUEST_UPDATE_ROOM,response.data.data))
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
=======
            params: params
        }).then(function (response) {            
            dispatch(receiveData(types.REQUEST_UPDATE_ROOM, response.data))
        }).catch(function (error) {
            message.error(error);
        })
    }
}
export function receiveData(action, payload) {
    return { type: action, payload };
}
>>>>>>> Fix
