import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HeaderLayout, FooterLayout, SiderLayout } from '../../layouts/admin';
import { TableComponent, FormComponent } from '../../shared/admin';
import { requestGetRoom, requestDeleteRoom, requestAddRoom,requestEditRoom } from '../../../actions/room';
class RoomPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            views: 'LIST',
            dataEdit: {},
            edit: false
        }
    }
    componentDidMount() {
        this.props.requestGetRoom();
    }
    onChangerView = () => {
        this.setState({
            views: 'FORM'
        })
    }
    onDelete = (id) => {
        this.props.requestDeleteRoom(id);

    }

    onAdd = (data) => {
        this.props.requestAddRoom(data);
        this.setState({
            views: "LIST"
        })

    }
    onEdit = (id) =>{
        let item = [...this.props.room].filter(item => item.id === id)
        if(item.length > 0){
            this.setState({
                dataEdit: item[0],
                views: 'FORM',
                edit: true
            })
        }
    }
    onUpdate(data){
        this.props.requestEditRoom(data);
        this.setState({
            views: "LIST"
        })
    }
    render() {

        const mainContent = () => {
            switch (this.state.views) {
                case "LIST":
                    return (
                        <TableComponent choice="ROOM" onDelete={this.onDelete} data={this.props.data} onChangerView={this.onChangerView}></TableComponent>
                    )
                case "FORM":
                    return (
                        <FormComponent choice="ROOM" onUpdate = {this.onUpdate.bind(this)} edit={this.state.edit} onAdd={this.onAdd} onEdit={this.onEdit}></FormComponent>
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
        data: state.room.all,
    }
}
export default connect(mapStateProps, { requestGetRoom, requestDeleteRoom, requestAddRoom,requestEditRoom })(RoomPage);