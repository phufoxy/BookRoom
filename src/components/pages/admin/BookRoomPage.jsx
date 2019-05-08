import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HeaderLayout, SiderLayout,FooterLayout } from '../../layouts/admin';
import { TableComponent,FormComponent } from '../../shared/admin';

class BookRoomPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            views: 'LIST'
        }
    }
    onChangerView = () =>{
        this.setState({
            views: 'FORM'
        })
    }
    render() {
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

export default BookRoomPage;