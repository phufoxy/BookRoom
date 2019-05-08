import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HeaderLayout, SiderLayout } from '../../layouts/admin';
import { DashboardComponent } from '../../shared/admin';
class HomePage extends Component {
    render() {
        return (
            <div className="wrapper">
                <HeaderLayout></HeaderLayout>
                <section className="b-dashboard-content">
                    <SiderLayout></SiderLayout>
                    <div className="right-content">
                        <div className="container-fluid">
                            <DashboardComponent></DashboardComponent>
                        </div>
                    </div>

                </section>
                
            </div>
        );
    }
}

function mapStateProps(state) {
    return {

    }
}
export default connect(mapStateProps, {})(HomePage);