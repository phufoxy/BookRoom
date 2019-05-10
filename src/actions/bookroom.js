import axios from 'axios';
import { message } from 'antd';

export const REQUEST_GET_BOOKROOM = "REQUEST_GET_BOOKROOM";
export const REQUEST_DELETE_BOOKROOM = "REQUEST_DELETE_BOOKROOM";
export const REQUEST_ADD_BOOKROOM = "REQUEST_ADD_BOOKROOM";
// export const REQUEST_UPDATE_BOOKROOM = "REQUEST_UPDATE_BOOKROOM";
const API_URL = "http://localhost:8080/booking-room/public/api/v1";
// var dateFormat = require('dateformat');
export function requestGetBookRoom(){
    return (dispatch)=>{
        return axios.request({
            method: 'GET',
            url: `${API_URL}/bookrooms`,
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
            }
        }).then(function(response){
            dispatch(receiveData(REQUEST_GET_BOOKROOM,response.data.data))
        }).catch(function(error){
            console.log(error);
            
        })
    }
}
export function requestDeleteBookRoom(id){
    return (dispatch)=>{
        return axios.request({
            method: 'DELETE',
            url: `${API_URL}/bookrooms/${id}`,
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
            }
        }).then(function(response){
            message.success("Bạn đã xóa thành công");
            dispatch(receiveData(REQUEST_DELETE_BOOKROOM,id));
        }).catch(function(error){
            console.log(error);
            
        })
    }
}

export function requestAddBookRoom(data){
    let formData = null;
    formData = {
        id_rooms: data.id_rooms,
        content: data.content,
        nameuser: data.nameuser,
        daystart: data.daystart,
        timestart: data.timestart,
        timeend: data.timeend,
    }
    
    return (dispatch)=>{
        return axios.request({
            method: 'POST',
            url: `${API_URL}/bookrooms`,
            headers:{
                "Accept": "application/json",
                'Content-Type': 'application/json',
            },
            data: formData,
        }).then(function(response){
            if(response.data === "Đã có cuộc họp được đặt"){
                message.warning("Phòng đang họp");
            }else{
                message.success("Thêm phòng thành công");
                dispatch(receiveData(REQUEST_ADD_BOOKROOM,response.data.data))
            }
                   
            
        }).catch(function(error){
            console.log(error);
        })
    }
}
export function receiveData(action, payload) {
    return { type: action, payload };
}