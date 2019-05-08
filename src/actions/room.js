import axios from 'axios';
import { message } from 'antd';
export const REQUEST_GET_ROOMS = "REQUEST_GET_ROOMS";
export const REQUEST_DELETE_ROOM = "REQUEST_DELETE_ROOM";
export const REQUEST_ADD_ROOM = "REQUEST_ADD_ROOM";
export const REQUEST_UPDATE_ROOM = "REQUEST_UPDATE_ROOM";
const API_URL = "http://localhost:8080/booking-room/public/api/v1";

export function requestGetRoom() {
    return (dispatch) => {

        return axios.request({
            method: 'GET',
            url: `${API_URL}/rooms`,
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
            },
        }).then(function (response) {
            dispatch(receiveData(REQUEST_GET_ROOMS, response.data.data))
        }).catch(function (error) {

        })
    }
}
// delete room
export function requestDeleteRoom(id) {
    return (dispatch) => {
        return axios.request({
            method: 'DELETE',
            url: `${API_URL}/rooms/${id}`,
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
            },
        }).then(function (response) {
            message.success('Bạn Đã Xóa Thành Công')
            dispatch(receiveData(REQUEST_DELETE_ROOM, id))
        }).catch(function (error) {
            console.log(error);

        })
    }
}
// add room
export function requestAddRoom(data) {
    let formData = new FormData();
    formData.append('name', data.name);
    formData.append('type', data.type);
    return (dispatch) => {
        return axios.request({
            method: 'POST',
            url: `${API_URL}/rooms`,
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
            },
            data: formData
        }).then(function (response) {
            message.success('Bạn Đã Thêm  Thành Công')
            dispatch(receiveData(REQUEST_ADD_ROOM, response.data.data))
        }).catch(function (error) {
            console.log(error);

        })
    }
}
export function receiveData(action, payload) {
    return { type: action, payload };
}

//Edit
export function requestEditRoom(data){
    let formData = new formData();
    formData.append('name',data.name);
    formData.append('type',data.type);
    return (dispatch)=>{
        return axios.request({
            method: 'PUT',
            url: `${API_URL}/rooms/${data.id}`,
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
            },
            data: formData
        }).then(function(response){
            dispatch(updateData(response.data));
        }).catch(function(error){
            console.log(error);
        })
    }
} 
export function updateData(response){
    return{
        type: REQUEST_UPDATE_ROOM,
        payload: response
    }
}