import React, { Component } from 'react';
import { HeaderLayout, SiderLayout, FooterLayout } from '../../layouts/admin';
import { CalenderComponent, FormModalComponent, CardCalenderComponent } from '../../shared/admin';
import { connect } from 'react-redux';
import * as action from '../../../actions/events';
import * as action_Room from '../../../actions/room';
import Cookies from 'universal-cookie';
import { message } from 'antd';
var dateFormatDate = require('dateformat');
const cookies = new Cookies();
var moment = require('moment');
var now = new Date()
class EventAdminPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            visible: false,
            edit: false,
            dataEdit: {},
            onDate: dateFormatDate(now, 'yyyy-mm-dd')
        }
    }
    componentDidMount() {
        this.onGetData();
    }
    onGetData() {
        this.props.dispatch(action.requestGetEvent());
        this.props.dispatch(action_Room.requestGetRoom());
    }

    convertToFrontEnd(arrA) {
        let arrB = []
        if (arrA.length) {
            arrB = arrA.map(item => {
                let attributes = item.attributes;
                return {
                    resourceId: attributes.room_id,
                    id: item.id,
                    title: attributes.content,
                    className: "room_" + attributes.room_id,
                    start: attributes.daystart,
                    room: attributes.room_name,
                    user: attributes.username,
                    user_id: attributes.user_id,
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
    convertMinsToHrsMins(mins) {
        let h = Math.floor(mins / 60);
        let m = mins % 60;
        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;
        return `${h}:${m}`;
    }
    onDelete = (id) => {
        this.props.dispatch(action.requestDeleteEvent(id));
    }
    onEdit = (id) => {
        let item = [...this.props.data].filter(item => item.id === id);
        if (item.length > 0) {
            this.setState({
                dataEdit: item[0],
                visible: true,
                edit: true
            })
        }

    }
    onUpdate = (data) => {
        this.props.dispatch(action.requestUpdateEvent(data));
        this.setState({
            visible: false,
            edit: false
        })

    }
    onCancleEdit = () => {
        this.setState({
            edit: false
        })
    }
    onAddEvent = (data) => {
        if (cookies.get('data') === undefined) {
            message.warning('Vui Lòng Đăng Nhập Để Được Đặt Lịch !')
        } else {
            this.props.dispatch(action.requestAddEvents(data));
            this.setState({
                visible: false
            })
        }
    }
    onShowModal = () => {
        this.onResetView();
        this.setState({
            visible: true,
            edit: false,
        })
    }
    onCheckModal = () => {
        this.setState({
            visible: false,
            edit: false
        })
    }
    onCalenderCard = () => {
        this.setState({
            isCard: true
        })
    }
    onResetCalender = () => {
        this.setState({
            isCard: false
        })
    }
    onGetDate = (data) => {
        this.setState({
            onDate: data
        })
    }
    onResearch = () => {
        this.setState({
            visible: true,
            edit: false,
            views: 'SEARCH'
        })
    }
    onSearchEvent = (data) => {
        this.props.dispatch(action.requestSearchEvent(data));
        this.setState({
            isFilter: true,
            onDate: data.dateStart
        })
    }
    onResetView = () => {
        this.setState({
            views: 'VIEW'
        })
    }
    render() {
        return (
            <div className="wrapper">
                <FormModalComponent onSearchEvent={this.onSearchEvent} views={this.state.views} onCheckModal={this.onCheckModal} visible={this.state.visible} onUpdate={this.onUpdate} dataEdit={this.state.dataEdit} edit={this.state.edit} onAddEvent={this.onAddEvent} room={this.convertArrayRoom(this.props.room)}></FormModalComponent>
                <HeaderLayout></HeaderLayout>
                <section className="b-dashboard-content">
                    <SiderLayout></SiderLayout>
                    <div className="right-content">
                        <div className="container-fluid">
                            <div className="b-admin-calender">
                                <div className="b-calender">
                                    <div className="b-heading">
                                        <div className="b-block">
                                            <div className="b-block-left">
                                                <CardCalenderComponent onGetDate={this.onGetDate} onResetCalender={this.onResetCalender} isCard={this.state.isCard}></CardCalenderComponent>
                                                <h3 className="b-text-title"  >
                                                    <i className="fas fa-calendar-week" style={{ cursor: 'pointer' }} onClick={this.onCalenderCard}></i> Calender
                                                </h3>
                                            </div>
                                            <div className="b-block-right">
                                                <button className="b-btn mr-2" onClick={this.onResearch}>
                                                    <i className="fas fa-search-location" ></i> Tìm Kiếm
                                                </button>
                                                <button className="b-btn" onClick={this.onShowModal}>
                                                    <i className="fas fa-plus"></i> Thêm
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="b-content-main">
                                        <CalenderComponent isFilter={this.state.isFilter} onDate={this.state.onDate} onUpdate={this.onUpdate} onEdit={this.onEdit} onDelete={this.onDelete} data={this.convertToFrontEnd(this.props.data)}></CalenderComponent>
                                    </div>
                                </div>


                            </div>
                        </div>
                        <FooterLayout></FooterLayout>
                    </div>

                </section>
            </div>
        );
    }
}
function mapStateProps(state) {
    return {
        data: state.event.all,
        room: state.room.all
    }
}
export default connect(mapStateProps, null)(EventAdminPage);