import * as types from '../constants/actionType';
import * as typeAPI from '../constants/actionAPI';
import axios from 'axios';
import { message } from 'antd';
// api

export function requestGetEvent() {
    return (dispatch) => {
        dispatch(requestLoading());
        return axios.request({
            method: 'GET',
            url: `${typeAPI.API_URL}/bookrooms`,
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
            },
        }).then(function (response) {
            dispatch(receiveData(types.REQUEST_GET_EVENTS, response.data.data))
        }).catch(function (error) {
            // noteError(error);
            dispatch(requestRejected(error));
        })
    }
}
// add tour 
export function requestAddEvents(data) {
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
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
            },
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
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
            },
        }).then(function (response) {
            dispatch(receiveData(types.REQUEST_FILTER_EVENT_ROOM, response.data.data))
        }).catch(function (error) {
            dispatch(requestRejected(error));
        })
    }
}
export function requestLoading() {
    return { type: types.REQUEST_LOADING };
}
export function requestRejected(response) {
    return { type: types.REQUEST_REJECTED, payload: response };
}
export function receiveData(type, payload) {
    return { type: type, payload };
}
