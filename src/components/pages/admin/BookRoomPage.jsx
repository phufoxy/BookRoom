import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HeaderLayout, SiderLayout, FooterLayout } from '../../layouts/admin';
import { TableComponent, FormComponent } from '../../shared/admin';
import { requestAddBookRoom, requestDeleteBookRoom, requestGetBookRoom } from '../../../actions/bookroom';
import { requestGetRoom } from '../../../actions/room';

class BookRoomPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            views: 'LIST'
        }
    }
    componentDidMount(){
        this.props.requestGetBookRoom()
    }
    onChangerView = () => {
        this.setState({
            views: 'FORM'
        })
    }
    onDelete = (id) => {
        this.props.requestDeleteBookRoom(id);
    }
    onAddBook = (data) => {
        this.props.requestAddBookRoom(data);
        this.setState({
            views: 'LIST'
        })
    }
    render() {        
        const mainContent = () => {
            switch (this.state.views) {
                case 'LIST':
                    return (
                        <TableComponent data={this.props.data} choice="BOOK" onChangerView={this.onChangerView}></TableComponent>
                    )
                case 'FORM':
                    return (
                        <FormComponent rooms={this.props.rooms} choice="BOOK"></FormComponent>
                    )
                default:
                    return (<></>)
            }
        }
        return (
            <div className="wrapper">
                <HeaderLayout></HeaderLayout>
                <section className="b-dashboard-content">
                    <SiderLayout></SiderLayout>
                    <div className="right-content">
                        <div className="container-fluid">
                            {mainContent()}
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
        data: state.bookroom.all,
        rooms: state.room.all,
    }
}
export default connect(mapStateProps, { requestGetRoom, requestGetBookRoom, requestDeleteBookRoom, requestAddBookRoom })(BookRoomPage);
