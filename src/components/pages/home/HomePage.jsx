import React, { Component } from 'react';
import { connect } from 'react-redux'
import { HeaderLayout, SlideBar } from '../../layouts/home';
import { FullcalenderComponent } from '../../shared/home';
import * as action from '../../../actions/events';
import * as action_Room from '../../../actions/room';
var moment = require('moment');

class HomePage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            visible: false,
            calender: [],
            is_getdate: false,
            datecalender: '',
            edit: false,
            dataEdit: {},
            is_edit: false
        }
    }
    componentDidMount() {
        this.onGetData();
    }
    onGetData() {
        this.props.dispatch(action.requestGetEvent());
        this.props.dispatch(action_Room.requestGetRoom());
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    onAddEvent = (data) => {
        this.props.dispatch(action.requestAddEvents(data));
    }
    onGetDate = (data) => {
        this.setState({
            is_getdate: !this.state.is_getdate,
            datecalender: data
        })
    }
    onDelete = (id) => {
        this.props.dispatch(action.requestDeleteEvent(id));
    }
    onEdit = (id) => {
        let item = [...this.props.data].filter(item => item.id === id);
        if (item.length > 0) {
            this.setState({
                dataEdit: item[0],
                edit: true
            })
        }

    }
    onUpdate = (data) => {
        this.props.dispatch(action.requestUpdateEvent(data));
        this.setState({
            edit: false
        })
    }
    onCancleEdit = () => {
        this.setState({
            edit: false
        })
    }

    onChangerRoom = (data) => {
        if (data === 0) {
            this.props.dispatch(action.requestGetEvent());
        } else {
            this.props.dispatch(action.requestGetEventByRoom(data));
        }
    }
    onEdit = (id) => {
        let item = [...this.props.data].filter(item => item.id === id);
        if (item.length > 0) {
            this.setState({
                dataEdit: item[0],
                edit: true
            })
        }

    }
    onUpdate = (data) => {
        this.props.dispatch(action.requestUpdateEvent(data));
        this.setState({
            edit: false
        })
    }
    onCancleEdit = () => {
        this.setState({
            edit: false
        })
    }
    convertMinsToHrsMins(mins) {
        let h = Math.floor(mins / 60);
        let m = mins % 60;
        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;
        return `${h}:${m}`;
    }
    convertToFrontEnd(arrA) {
        let arrB = []
        if (arrA.length) {
            arrB = arrA.map(item => {
                let attributes = item.attributes;
                return {
                    resourceId: attributes.id_rooms,
                    id: item.id,
                    title: attributes.content,
                    className: attributes.id_rooms === 1 ? "SMALL" : "BIG",
                    start: attributes.daystart,
                    room: attributes.id_rooms === 1 ? "Phòng Nhỏ" : "Phòng Lớn",
                    user: attributes.nameuser,
                    timestart: attributes.timestart,
                    timeend: attributes.timeend,
                    redate: attributes && attributes.repeat !== null ? attributes.repeat.repeatby : 'Không Lặp',
                    reweek: attributes && attributes.repeat !== null ? attributes.repeat.byweekday : '',
                    recount: attributes && attributes.repeat !== null ? attributes.repeat.count : '',
                    repeat: attributes && attributes.repeat !== null ? '1' : '0',
                    rrule: attributes && attributes.repeat !== null ?
                        {
                            freq: attributes.repeat.repeatby,
                            interval: attributes.repeat.interval,
                            byweekday: attributes.repeat.byweekday,
                            dtstart: `${attributes.daystart + ' ' + attributes.timestart}`,
                            count: attributes.repeat.count
                        } : {
                            freq: "daily",
                            interval: 1,
                            dtstart: `${attributes.daystart + ' ' + attributes.timestart}`,
                            count: 1
                        },
                    duration: this.convertMinsToHrsMins(moment(`${attributes.daystart + ' ' + attributes.timeend}`).diff(`${item.attributes.daystart + ' ' + item.attributes.timestart}`, 'minutes'))
                }
            })
        }
        return arrB;
    }
    convertArrayRoom(arrA) {
        let arrB = []
        if (arrA.length) {
            arrB = arrA.map(item => {
                return {
                    id: item.id,
                    title: item.attributes.name,
                }
            })
        }
        return arrB;
    }
    onChangerRoom = (data) => {
        if (data === 0) {
            this.props.dispatch(action.requestGetEvent());
        } else {
            this.props.dispatch(action.requestGetEventByRoom(data));
        }
    }
    render() {
        return (
            <div className="wrapper">
                <HeaderLayout></HeaderLayout>
                <main className="b-page-main">
                    <div className="b-block">
                        <SlideBar onCancleEdit={this.onCancleEdit} onChangerRoom={this.onChangerRoom} onUpdate={this.onUpdate} dataEdit={this.state.dataEdit} edit={this.state.edit} onGetDate={this.onGetDate} onAddEvent={this.onAddEvent}></SlideBar>
                        <div className="b-block-right">
                            <FullcalenderComponent room={this.convertArrayRoom(this.props.room)} onCancleEdit={this.onCancleEdit} onUpdate={this.onUpdate} onEdit={this.onEdit} onDelete={this.onDelete} is_checkdate={this.state.is_getdate} datecalender={this.state.datecalender} data={this.convertToFrontEnd(this.props.data)}></FullcalenderComponent>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}
function mapStateProps(state) {
    return {
        data: state.event.all,
        room: state.room.all,
        fetched: state.event.fetched
    }
}
export default connect(mapStateProps, null)(HomePage);
