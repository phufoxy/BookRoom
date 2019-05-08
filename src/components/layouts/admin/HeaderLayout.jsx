import React, {Component} from 'react';

class HeaderLayout extends Component {
    render() {
        return (
            <header className="b-dashboard-header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="b-header">
                            <div className="b-logo">
                                <a href="/">
                                    <img
                                        src="https://greenglobal.vn/wp-content/themes/gg2019/resources/assets/images/logo-light.svg"
                                        alt="logo"
                                        className="link-logo"/>
                                </a>
                            </div>
                        </div>
                        <div className="b-menu">
                            <div className="b-search">
                                <a href="/"><i className="fas fa-search"/></a>
                            </div>
                            <div className="b-user">
                                <a href="/"><img src="../../images/user.jpg" className="img-user" alt="user"/></a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default HeaderLayout;