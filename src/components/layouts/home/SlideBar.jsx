import React, { Component } from 'react';
import { Modal, Button, DatePicker, TimePicker, Checkbox, Select } from 'antd';
import { CalenderComponent } from '../../shared/home';
import moment from 'moment';
// import locale from 'antd/lib/date-picker/locale/vi_VN';
import 'antd/dist/antd.css';
var dateFormatDate = require('dateformat');
const format = 'HH:mm';
const dateFormat = 'YYYY-MM-DD';
var now = new Date()
const Option = Select.Option;
const children = [
    { id: '1', name: 'su' },
    { id: '2', name: 'mo' },
    { id: '3', name: 'tu' },
    { id: '4', name: 'we' },
    { id: '5', name: 'th' },
    { id: '6', name: 'fr' },
    { id: '7', name: 'sa' }
];

class SlideBar extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            visible: false,
            calender: [],
            title: '',
            dateStart: dateFormatDate(now, 'yyyy-mm-dd'),
            rooms: 1,
            timestart: '08:30',
            timeend: '09:30',
            checkbox: false,
            byweekday: ['su', 'mo'],
            count: 1,
            choice: 'daily'
        }

    }
    showModal = () => {
        this.setState({
            visible: true
        })
    }
    handleOk = (e) => {
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    onChanger = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    onChangerTime = (value) => {
        this.setState({
            duration: value._i
        })
    }
    onChangerSelect = (value) => {
        this.setState({
            rooms: value
        })
    }
    onChangeTime = (time, timeString) => {
        if (timeString >= this.state.timeend) {
            this.setState({
                timestart: timeString,
                timeend: timeString
            })
        } else {
            this.setState({
                timestart: timeString,
                timeend: timeString
            })
        }
    }
    onChangeTimeItem = (date, dateString) => {
        this.setState({
            timeend: dateString
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.setState({
            visible: false
        })
        this.props.onAddEvent(this.state)
        this.onReset();
    }
    onChangerCheck = (e) => {
        this.setState({
            checkbox: e.target.checked
        })

    }
    handleChange = (value) => {
        this.setState({
            byweekday: value
        })
    }
    onGetDate = (data) => {
        this.props.onGetDate(data);
    }
    onReset() {
        this.setState({
            title: '',
            choice: 'daily',
            checkbox: false,
        })
    }
    onChange = (date, dateString) => {
        this.setState({
            dateStart: dateString
        })
    }

    render() {

        return (
            <div className="b-block-left">
                <div className="b-group-btn">
                    <Button className="b-btn waves-effect waves-light" onClick={this.showModal}>
                        TẠO
                </Button>
                </div>
                <Modal
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}>
                    <div className="b-book">
                        <div className="b-heading">
                            <h2 className="b-text-title">
                                ĐẶT LỊCH PHÒNG HỌP
                            </h2>
                        </div>
                        <div className="b-content">
                            <form className="b-form" onSubmit={this.onSubmit}>
                                <div className="b-form-group">
                                    <input type="text" placeholder="Nhập Tiêu Đề" name="title" className="b-input" onChange={this.onChanger} value={this.state.title} />
                                </div>
                                <div className="b-form-group">
                                    <label style={{ paddingRight: '10px' }}>Chọn Ngày</label>
                                    <DatePicker onChange={this.onChange} defaultValue={moment(now, dateFormat)} />
                                </div>
                                <div className="b-form-group">
                                    <label style={{ paddingRight: '10px' }}>Giờ Bắt Đầu</label>
                                    <TimePicker minuteStep={30} defaultValue={moment(this.state.timestart, format)} format={format} onChange={this.onChangeTime} />,
                                </div>
                                <div className="b-form-group">
                                    <label style={{ paddingRight: '10px' }}>Giờ Bắt Kết Thúc</label>
                                    <TimePicker minuteStep={30} defaultValue={moment(this.state.timeend, format)} value={moment(this.state.timeend, format)} format={format} onChange={this.onChangeTimeItem} />,
                                </div>
                                <div className="b-form-group">
                                    <label htmlFor="c">Chọn Phòng</label>
                                    <select className="b-select" defaultValue={this.state.rooms} name="rooms" onChange={this.onChanger}>
                                        <option value={1}>Phòng Nhỏ  </option>
                                        <option value={2}>Phòng lớn</option>
                                        <option>Phòng lớn</option>
                                    </select>
                                </div>
                                <div className="b-form-group">
                                    <Checkbox name="checkbox" onChange={this.onChangerCheck} value={this.state.checkbox}>Lặp Lại</Checkbox>,
                                </div>
                                <div className={this.state.checkbox ? "b-repeat" : "b-repeat is-disable"}>

                                    <div className="b-form-group">
                                        <label >Theo</label>
                                        <select className="b-select" name='choice' defaultValue={this.state.choice} onChange={this.onChanger}>
                                            <option value="daily">Ngày</option>
                                            <option value="weekly">Tuần</option>
                                            <option value="monthly">Tháng</option>
                                            <option value="yearly">Năm</option>
                                        </select>
                                    </div>
                                    {this.state.choice === 'weekly' ?
                                        <div className="b-form-group">
                                            <Select
                                                mode="multiple"
                                                style={{ width: '100%' }}
                                                placeholder="Please select"
                                                defaultValue={this.state.byweekday}
                                                onChange={this.handleChange}>
                                                {children.map(data => (
                                                    <Option key={data.id} value={data.name}>{data.name}</Option>
                                                ))}
                                            </Select>,
                                        </div>
                                        :
                                        <></>
                                    }

                                    <div className="b-form-group">
                                        <label >Lặp Lại</label>
                                        <select className="b-select" name='count' defaultValue={this.state.count} onChange={this.onChanger}>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                            <option value={5}>5</option>
                                            <option value={6}>6</option>
                                            <option value={7}>7</option>
                                            <option value={8}>8</option>
                                            <option value={10}>10</option>
                                            <option value={15}>15</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="b-form-button">
                                    <button type="cancel" className="b-btn b-btn-save waves-effect waves-teal">Hủy</button>
                                    <button type="submit" className="b-btn b-btn-cancel waves-effect waves-teal">Lưu</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal>
                <CalenderComponent onGetDate={this.onGetDate}></CalenderComponent>
                <div className="b-rooms">
                    <div className="b-heading text-center">
                        <h2 className="b-text-title">
                            PHÒNG
                    </h2>
                    </div>
                    <div className="b-form">
                        <form>
                            <div className="b-form-group">
                                <input type="checkbox" name="a" />
                                <label htmlFor='a' className="b-lable-checkbox">
                                    Phòng họp nhỏ 1
                                </label>
                            </div>

                        </form>
                    </div>
                </div>
            </div >
        );
    }
}

export default SlideBar;