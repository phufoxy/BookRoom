import React, { Component } from 'react';
<<<<<<< HEAD
// import { connect } from 'react-redux';
import { HeaderLayout, SiderLayout, FooterLayout } from '../../layouts/admin';
import { TableComponent, FormComponent } from '../../shared/admin';

class BookRoomPage extends Component {
    constructor(props) {
=======
import { connect } from 'react-redux';
import { HeaderLayout, SiderLayout,FooterLayout } from '../../layouts/admin';
import { TableComponent,FormComponent } from '../../shared/admin';

class BookRoomPage extends Component {
    constructor(props){
>>>>>>> First Commit
        super(props);
        this.state = {
            views: 'LIST'
        }
    }
<<<<<<< HEAD
    onChangerView = () => {
=======
    onChangerView = () =>{
>>>>>>> First Commit
        this.setState({
            views: 'FORM'
        })
    }
    render() {
<<<<<<< HEAD
        const mainContent = () => {
            switch (this.state.views) {
                case 'LIST':
                    return (
                        <TableComponent choice="BOOK" onChangerView={this.onChangerView}></TableComponent>
                    )
                case 'FORM':
                    return (
                        <FormComponent choice="BOOK"></FormComponent>
                    )
                default:
                    return (<></>)
=======
        const mainContent = ()=>{
            switch(this.state.views){
                case 'LIST':
                    return(
                        <TableComponent choice="BOOK" onChangerView={this.onChangerView}></TableComponent>
                    )
                case 'FORM':
                    return(
                        <FormComponent choice ="BOOK"></FormComponent>
                    )
>>>>>>> First Commit
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
<<<<<<< HEAD

=======
                
>>>>>>> First Commit
            </div>
        );
    }
}

export default BookRoomPage;