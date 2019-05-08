import React, {Component} from 'react';

class SiderLayout extends Component {
    render() {
        return (
            <div className="left-menu">
                <ul className="list-menu">
                    <li>
                        <div className="user-profile">
                            <div className="user-pic">
                                <img className="img-user" src="../../images/user.jpg" alt="img-user"/></div>
                            <div className="user-content">
                                <a href="/">
                                    <h5 className="name-title">User Name &nbsp;<i className="fas fa-sort-down"/>
                                    </h5>
                                    <span className="user-email text-muted">user@gmail.com</span>
                                </a>
                            </div>
                        </div>
                    </li>
                    <li className="item-btn">
                        <a className="btn-create" href="/admin/room">
                            <i className="fas fa-plus"/>&nbsp;
                            <span className="hide-menu">Create New</span>
                        </a>
                    </li>
                    <li className="item-menu ">
                        <a className="item-link active waves-effect waves-dark" href="/admin" >
                            <i className="fas fa-database"/>
                            <span className="hide-menu">Dashboard</span>
                        </a>
                    </li>
                    <li className="item-menu ">
                        <a className="item-link waves-effect waves-dark" href="/admin/profile" >
                            <i className="fas fa-users"/>
                            <span className="hide-menu">Profile</span>
                        </a>
                    </li>
                    <li className="item-menu">
                        <a className="item-link waves-effect waves-dark" href="/admin/room">
                            <i className="fas fa-table"/>
                            <span className="hide-menu">Table Room</span>
                        </a>
                    </li>
                    <li className="item-menu">
                        <a className="item-link waves-effect waves-dark" href="/admin/bookroom">
                            <i className="fas fa-table"/>
                            <span className="hide-menu">Book Room</span>
                        </a>
                    </li>
                    <li className="text-center">
                        <a href="/" className="link-upgrade">Upgrade to pro</a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default SiderLayout;