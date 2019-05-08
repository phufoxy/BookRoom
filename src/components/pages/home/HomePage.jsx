import React, { Component } from 'react';
import { connect } from 'react-redux'
import { HeaderLayout, SlideBar } from '../../layouts/home';
import { FullcalenderComponent } from '../../shared/home';
import { requestGetEvent, requestAddEvents, requestDeleteEvent } from '../../../actions/events';

class HomePage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            visible: false,
            calender: [],
            is_getdate: false,
            datecalender: ''
        }
    }
    componentDidMount() {
        this.props.requestGetEvent();
        // this.interval = setInterval(() => (this.props.requestGetEvent()), 10000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    onAddEvent = (data) => {
        this.props.requestAddEvents(data);
        this.props.requestGetEvent();
    }
    onGetDate = (data) => {
        this.setState({
            is_getdate: !this.state.is_getdate,
            datecalender: data
        })
    }
    onDelete = (id) => {
        this.props.requestDeleteEvent(id);
    }
    render() {

        return (
            <div className="wrapper">
                <HeaderLayout></HeaderLayout>
                <main className="b-page-main">
                    <div className="b-block">
                        <SlideBar onGetDate={this.onGetDate} onAddEvent={this.onAddEvent}></SlideBar>
                        <div className="b-block-right">
                            <FullcalenderComponent onDelete={this.onDelete} is_checkdate={this.state.is_getdate} datecalender={this.state.datecalender} data={this.props.data}></FullcalenderComponent>
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
        fetched: state.event.fetched
    }
}
export default connect(mapStateProps, { requestGetEvent, requestAddEvents, requestDeleteEvent })(HomePage);