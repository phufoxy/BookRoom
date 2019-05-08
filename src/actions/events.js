import axios from 'axios';
import { message } from 'antd';
export const REQUEST_GET_EVENTS = "REQUEST_GET_EVENTS";
export const REQUEST_LOADING = 'REQUEST_LOADING';
export const REQUEST_REJECTED = 'REQUEST_REJECTED';
export const REQUEST_ADD_EVENT = 'REQUEST_ADD_EVENT';
export const REQUEST_DELETE_EVENT = 'REQUEST_DELETE_EVENT';
// api
const API_URL = "http://localhost/booking-room/public/api/v1";

export function requestGetEvent() {
    return (dispatch) => {
        dispatch(requestLoading());
        return axios.request({
            method: 'GET',
            url: `${API_URL}/bookrooms`,
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
            },
        }).then(function (response) {
            dispatch(receiveData(REQUEST_GET_EVENTS, response.data.data))
        }).catch(function (error) {
            // noteError(error);
            dispatch(requestRejected(error));
        })
    }
}
// add tour 
export function requestAddEvents(data) {
    let formData = new FormData();
    if (data.checkbox === true) {
        formData.append('id_rooms', data.rooms);
        formData.append('content', data.title);
        formData.append('nameuser', "vanphu");
        formData.append('daystart', data.dateStart);
        formData.append('timestart', data.timestart);
        formData.append('timeend', data.timeend);
        if (data.choice === 'yearly') {
            formData.append('repeatby', 'yearly');
            formData.append('interval', 1);
            formData.append('count', data.count);
        }
        if (data.choice === 'yearly') {
            formData.append('repeatby', 'yearly');
            formData.append('interval', 1);
            formData.append('count', data.count);
        } else if (data.choice === 'monthly') {
            formData.append('repeatby', 'monthly');
            formData.append('interval', 1);
            formData.append('count', data.count);
        } else if (data.choice === 'daily') {
            formData.append('repeatby', 'daily');
            formData.append('interval', 1);
            formData.append('count', data.count);
        } else if (data.choice === 'weekly') {
            let arrayDay = '';
            formData.append('repeatby', 'weekly');
            formData.append('interval', 1);
            formData.append('count', data.count);
            data.byweekday.forEach((i, index, item) => {
                if (index === item.length - 1) {
                    arrayDay += `${item[index]}`;
                } else {
                    arrayDay += `${item[index]},`;
                }
            })
            formData.append('byweekday', arrayDay);
        }
    } else {
        formData.append('id_rooms', data.rooms);
        formData.append('content', data.title);
        formData.append('nameuser', "vanphu");
        formData.append('daystart', data.dateStart);
        formData.append('timestart', data.timestart);
        formData.append('timeend', data.timeend);
    }
    return (dispatch) => {
        return axios.request({
            method: 'POST',
            url: `${API_URL}/bookrooms`,
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
            },
            data: formData
        }).then(function (response) {
            console.log(response.data.data);
            
            message.success('Thêm Sự Kiện Thành Công');
            dispatch(receiveData(REQUEST_ADD_EVENT, response.data.data))
        }).catch(function (error) {
            dispatch(requestRejected(error));

        })
    }
}
export function requestDeleteEvent(id) {
    return (dispatch) => {
        return axios.request({
            method: 'DELETE',
            url: `${API_URL}/bookrooms/${id}`,
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
            },
        }).then(function (response) {
            message.success('Xóa Sự Kiện Thành Công');
            dispatch(receiveData(REQUEST_DELETE_EVENT, id))
        }).catch(function (error) {
            // noteError(error);
            dispatch(requestRejected(error));
        })
    }
}
export function requestLoading() {
    return { type: REQUEST_LOADING };
}
export function requestRejected(response) {
    return { type: REQUEST_REJECTED, payload: response };
}
export function receiveData(type, payload) {
    return { type: type, payload };
}
