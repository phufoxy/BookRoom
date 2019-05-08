<<<<<<< HEAD
import * as types from '../constants/actionType';
import * as typeAPI from '../constants/actionAPI';
import axios from 'axios';
import { message } from 'antd';
// api
=======
import axios from 'axios';
import { message } from 'antd';
export const REQUEST_GET_EVENTS = "REQUEST_GET_EVENTS";
export const REQUEST_LOADING = 'REQUEST_LOADING';
export const REQUEST_REJECTED = 'REQUEST_REJECTED';
export const REQUEST_ADD_EVENT = 'REQUEST_ADD_EVENT';
export const REQUEST_DELETE_EVENT = 'REQUEST_DELETE_EVENT';
// api
const API_URL = "http://localhost/booking-room/public/api/v1";
>>>>>>> First Commit

export function requestGetEvent() {
    return (dispatch) => {
        dispatch(requestLoading());
        return axios.request({
            method: 'GET',
<<<<<<< HEAD
            url: `${typeAPI.API_URL}/bookrooms`,
=======
            url: `${API_URL}/bookrooms`,
>>>>>>> First Commit
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
            },
        }).then(function (response) {
<<<<<<< HEAD
            dispatch(receiveData(types.REQUEST_GET_EVENTS, response.data.data))
=======
            dispatch(receiveData(REQUEST_GET_EVENTS, response.data.data))
>>>>>>> First Commit
        }).catch(function (error) {
            // noteError(error);
            dispatch(requestRejected(error));
        })
    }
}
// add tour 
export function requestAddEvents(data) {
<<<<<<< HEAD
    let formDataObject = {};
    if (data.checkbox === true) {
        let arrayDay = '';
        data.byweekday.forEach((i, index, item) => {
            if (index === item.length - 1) {
                arrayDay += `${item[index]}`;
            } else {
                arrayDay += `${item[index]},`;
            }
        })
        formDataObject = {
            'id_rooms': data.rooms,
            'content': data.title,
            'nameuser': "vanphu",
            'daystart': data.dateStart,
            'timestart': data.timestart,
            'timeend': data.timeend,
            'repeatby': data.choice,
            'interval': 1,
            'count': data.count,
            'byweekday': data.choice === 'weekly' ? arrayDay : ''
        }
    } else {
        formDataObject = {
            'id_rooms': data.rooms,
            'content': data.title,
            'nameuser': "vanphu",
            'daystart': data.dateStart,
            'timestart': data.timestart,
            'timeend': data.timeend
        }

    }
    return (dispatch) => {
        return axios.request({
            method: 'POST',
            url: `${typeAPI.API_URL}/bookrooms`,
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
            },
            data: formDataObject
        }).then(function (response) {
            if (response.data === "Đã có cuộc họp được đặt") {
                message.warning('Trùng Lịch Đặt');
            } else {
                message.success('Thêm Sự Kiện Thành Công');
                dispatch(receiveData(types.REQUEST_ADD_EVENT, response.data.data))
            }

        }).catch(function (error) {
            dispatch(requestRejected(error));
        })
    }
}
export function requestDeleteEvent(id) {
    return (dispatch) => {
        return axios.request({
            method: 'DELETE',
            url: `${typeAPI.API_URL}/bookrooms/${id}`,
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
            },
        }).then(function (response) {
            message.success('Xóa Sự Kiện Thành Công');
            dispatch(receiveData(types.REQUEST_DELETE_EVENT, id))
        }).catch(function (error) {
            // noteError(error);
            dispatch(requestRejected(error));
        })
    }
}
export function requestUpdateEvent(data) {
    let formDataObject = {};
    if (data.is_resize) {
        if (data.is_drop) {
            formDataObject = {
                'daystart': data.daystart,
                'timestart':data.timestart,
                'timeend':data.timeend,
            }
        } else {            
            formDataObject = {
                'timeend': data.timeEnd
            }
        }
    } else {
        if (data.checkbox === true) {
            let arrayDay = '';
=======
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
>>>>>>> First Commit
            data.byweekday.forEach((i, index, item) => {
                if (index === item.length - 1) {
                    arrayDay += `${item[index]}`;
                } else {
                    arrayDay += `${item[index]},`;
                }
            })
<<<<<<< HEAD
            formDataObject = {
                'id_rooms': data.rooms,
                'content': data.title,
                'nameuser': "vanphu",
                'daystart': data.dateStart,
                'timestart': data.timestart,
                'timeend': data.timeend,
                'check': '1',
                'repeatby': data.choice,
                'interval': 1,
                'count': data.count,
                'byweekday': data.choice === 'weekly' ? arrayDay : ''
            }
        } else {
            formDataObject = {
                'id_rooms': data.rooms,
                'content': data.title,
                'nameuser': "vanphu",
                'daystart': data.dateStart,
                'timestart': data.timestart,
                'timeend': data.timeend,
                'check': '0'
            }
        }
    }

    return (dispatch) => {
        return axios.request({
            method: 'PUT',
            url: `${typeAPI.API_URL}/bookrooms/${data.id}`,
            params: formDataObject,
=======
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
>>>>>>> First Commit
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
            },
<<<<<<< HEAD
        }).then(function (response) {
            message.success('Sửa Sự Kiện Thành Công');
            dispatch(receiveData(types.REQUEST_UPDATE_EVENT, response.data.data))
        }).catch(function (error) {
            dispatch(requestRejected(error));
        })
    }
}
// filter event rooms

export function requestGetEventByRoom(id) {
    return (dispatch) => {
        dispatch(requestLoading());
        return axios.request({
            method: 'GET',
            url: `${typeAPI.API_URL}/getbrbyid/${id}`,
=======
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
>>>>>>> First Commit
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
            },
        }).then(function (response) {
<<<<<<< HEAD
            dispatch(receiveData(types.REQUEST_FILTER_EVENT_ROOM, response.data.data))
        }).catch(function (error) {
=======
            message.success('Xóa Sự Kiện Thành Công');
            dispatch(receiveData(REQUEST_DELETE_EVENT, id))
        }).catch(function (error) {
            // noteError(error);
>>>>>>> First Commit
            dispatch(requestRejected(error));
        })
    }
}
export function requestLoading() {
<<<<<<< HEAD
    return { type: types.REQUEST_LOADING };
}
export function requestRejected(response) {
    return { type: types.REQUEST_REJECTED, payload: response };
=======
    return { type: REQUEST_LOADING };
}
export function requestRejected(response) {
    return { type: REQUEST_REJECTED, payload: response };
>>>>>>> First Commit
}
export function receiveData(type, payload) {
    return { type: type, payload };
}
