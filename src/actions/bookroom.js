import axios from 'axios';
import { message } from 'antd';
import * as types from '../constants/actionType';
import * as API from '../constants/actionAPI';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
export function requestGetBookRoom(){
    return (dispatch)=>{
        return axios.request({
            method: 'GET',
            url: `${API.API_URL}/bookrooms`,
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
            }
        }).then(function(response){
            dispatch(receiveData(types.REQUEST_GET_BOOKROOM,response.data.data))
        }).catch(function(error){
            console.log(error);
            
        })
    }
}
export function requestDeleteBookRoom(id){
    return (dispatch)=>{
        return axios.request({
            method: 'DELETE',
            url: `${API.API_URL}/bookrooms/${id}`,
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                'Authorization': `${'bearer ' + cookies.get('token')}`
            }
        }).then(function(response){
            message.success("Bạn đã xóa thành công");
            dispatch(receiveData(types.REQUEST_DELETE_BOOKROOM,id));
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
            url: `${API.API_URL}/bookrooms`,
            headers:{
                "Accept": "application/json",
                'Content-Type': 'application/json',
                'Authorization': `${'bearer ' + cookies.get('token')}`
            },
            data: formData,
        }).then(function(response){
            if(response.data.original === "Thời gian đặt không hợp lệ"){
                message.warning("Phòng đang họp");
            }else{
                message.success("Thêm phòng thành công");
                dispatch(receiveData(types.REQUEST_ADD_BOOKROOM,response.data.data))
            }
                   
            
        }).catch(function(error){
            console.log(error);
        })
    }
}

export function receiveData(action, payload) {
    return { type: action, payload };
}