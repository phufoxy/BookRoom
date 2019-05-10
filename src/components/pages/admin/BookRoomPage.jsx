import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HeaderLayout, SiderLayout,FooterLayout } from '../../layouts/admin';
import { TableComponent,FormComponent } from '../../shared/admin';
import {requestGetBookRoom,requestDeleteBookRoom,requestAddBookRoom} from '../../../actions/bookroom';
import {requestGetRoom} from '../../../actions/room';
class BookRoomPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            views: 'LIST'
        }
    }
    componentDidMount(){
        this.props.requestGetBookRoom();
        this.props.requestGetRoom();
    }
    onChangerView = () =>{
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
            switch(this.state.views){
                case "LIST":
                    return(
                        <TableComponent choice="BOOK" onChangerView={this.onChangerView} data={this.props.data} onDelete={this.onDelete}></TableComponent>
                    )
                case 'FORM':
                    return(
                        <FormComponent choice ="BOOK" onAddBook={this.onAddBook} rooms={this.props.rooms}></FormComponent>
                    )
                default:
                    return (
                        <></>
                    )
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
export default connect(mapStateProps,{requestGetRoom,requestGetBookRoom,requestDeleteBookRoom,requestAddBookRoom})(BookRoomPage);
