import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';
import rrulePlugin from '@fullcalendar/rrule';
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import allLocales from '@fullcalendar/core/locales-all';
import '../../../../main.scss'
import { Modal } from 'antd';
const confirm = Modal.confirm;
var dateFormat = require('dateformat');
var now = new Date()
dateFormat.i18n = {
    dayNames: [
        'CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7',
        'Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'
    ],
    monthNames: [
        'T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12',
        'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
    ],
    timeNames: [
        'a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'
    ]
};
class FullcalenderComponent extends Component {
    calendarComponentRef = React.createRef()
    constructor(props) {
        super(props);
        this.state = {
            calendarWeekends: true,
            ArrayList: [],
            show: false,
            title: '',
            description: '',
            datenow: now

        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.datecalender !== this.props.datecalender) {
            let calendarApi = this.calendarComponentRef.current.getApi()
            calendarApi.gotoDate(dateFormat(this.props.datecalender, 'yyyy-mm-dd'))
        }
    }
    toggleWeekends = () => {
        this.setState({ // update a property
            calendarWeekends: !this.state.calendarWeekends
        })
    }

    onEvent(info) {
        this.setState({
            show: true,
            title: info.event.title,
            datestart: dateFormat(info.event.start, "dddd ,  dd mmmm yyyy"),
            timestart: info.event.extendedProps.timestart,
            timeend: info.event.extendedProps.timeend,
            room: info.event.extendedProps.room,
            user: info.event.extendedProps.user,
            id: info.event.id,
            redate: info.event.extendedProps.redate,
            recount: info.event.extendedProps.recount,
            reweek: info.event.extendedProps.reweek
        })

    }

    handleClose = () => {
        this.setState({ show: false });
    }
    handleOk = (e) => {
        this.setState({
            show: false,
        });
    }

    handleCancel = (e) => {
        this.setState({
            show: false,
        });
    }
    onDelete(id) {
        var self = this.props;
        confirm({
            title: 'Bạn Muốn Xóa Sự Kiện?',
            content: 'Bạn Có Chắc Chắn',
            onOk() {
                self.onDelete(id);
            },
            onCancel() {
                self.onCancleEdit();
            },
        });
        this.setState({
            show: !this.state.show
        })
    }
    onEdit(id) {
        var self = this.props;
        confirm({
            title: 'Bạn Muốn Sửa Sự Kiện?',
            content: 'Bạn Có Chắc Chắn',
            onOk() {
                self.onEdit(id);
            },
            onCancel() {
            },
        });
        this.setState({
            show: !this.state.show
        })
    }
    handleDrop = (eventObj, date) => {
        console.group('onDrop');
        console.log('date');
        console.dir(date);
        console.groupEnd();
    }
    onResize = (info) => {
        let data = {
            id: info.event.id,
            timeEnd: dateFormat(info.event.end, 'HH:MM'),
            is_resize: true
        }
        this.props.onUpdate(data);
    }
    oneventDrop = (eventDropInfo) => {
        let data = {
            id: eventDropInfo.event.id,
            daystart: dateFormat(eventDropInfo.event.start, 'yyyy-mm-dd'),
            timestart: dateFormat(eventDropInfo.event.start, 'HH:MM'),
            timeend: dateFormat(eventDropInfo.event.end, 'HH:MM'),
            is_resize: true,
            is_drop: true
        }
        this.props.onUpdate(data);
    }
    render() {
        return (
            <div className="b-fullcalender">
                <Modal
                    header={null}
                    visible={this.state.show}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <div className="b-events">
                        <div className="b-button-funtion">
                            <div className="b-item">
                                <button className="b-btn" onClick={this.onEdit.bind(this, this.state.id)}>
                                    <i className="fas fa-pencil-alt" />
                                </button>
                            </div>
                            <div className="b-item">
                                <button className="b-btn" onClick={this.onDelete.bind(this, this.state.id)}>
                                    <i className="far fa-trash-alt" />
                                </button>
                            </div>
                            <div className="b-item">
                                <button className="b-btn">
                                    <i className="fas fa-ellipsis-v"></i>
                                </button>
                            </div>
                        </div>
                        <div className="b-content">
                            <h2 className="b-text-title">
                                [{this.state.title}]
                            </h2>
                            <p className="b-text-norm">
                                {this.state.datestart} ( {this.state.timestart} - {this.state.timeend} )
                            </p>
                            <span className="b-text-rom">
                                {this.state.room}
                            </span>
                            <p className="b-text-user">
                                {this.state.user}
                            </p>
                            <p className={this.state.redate !== 'Không Lặp' ? "b-text-user" : ''}>
                                {this.state.redate === 'daily' ? 'Lặp Theo Ngày' : ''}
                                {this.state.redate === 'weekly' ? 'Lặp Theo Tuần' : ''}
                                {this.state.redate === 'monthly' ? 'Lặp Theo Tháng' : ''}
                                {this.state.redate === 'yearly' ? 'Lặp Theo Năm' : ''}
                            </p>
                            <p>
                                {this.state.recount ? `${this.state.recount + '  lần lặp lại'}` : ''}
                            </p>
                        </div>
                    </div>

                </Modal>
                <FullCalendar
                    defaultView="timeGridWeek"
                    header={{
                        right: 'prev,next today',
                        center: 'title',
                        left: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
                    }}
                    listDayFormat
                    height={'parent'}
                    timeZone={'local'}
                    contentHeight={600}
                    aspectRatio={22}
                    handleWindowResize
                    allDayText={'Giờ'}
                    allDaySlot
                    dayNames={['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']}
                    plugins={[rrulePlugin, dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                    ref={this.calendarComponentRef}
                    weekends={this.state.calendarWeekends}
                    events={this.props.data}
                    defaultDate={dateFormat(this.state.datenow, 'yyyy-mm-dd')}
                    navLinks
                    editable
                    eventLimit
                    viewObject={{
                        currentStart: '2019-05-07'
                    }}
                    minTime={'07:30:00'}
                    maxTime={'19:30:00'}
                    eventClick={this.onEvent.bind(this)}
                    locales={allLocales}
                    locale={'vi'}
                    eventOverlap={function (stillEvent, movingEvent) {
                        return stillEvent.allDay && movingEvent.allDay;
                    }}
                    eventResize={
                        this.onResize
                    }
                    eventDrop={
                        this.oneventDrop
                    }
                />
            </div>
        );
    }
}

export default FullcalenderComponent;