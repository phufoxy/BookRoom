import React, { Component } from 'react';
import { Modal } from 'antd';
import { connect } from 'react-redux'
import { GoogleLogin } from 'react-google-login';
import Cookies from 'universal-cookie';
import * as action from '../../../actions/login';
import { Redirect } from 'react-router-dom';
const cookies = new Cookies();
class HeaderLayout extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            visible: false,
            is_dropdown: false,
            isLogout: false,
            isRedirect: false
        }
    }
    componentDidMount() {
        this.props.dispatch(action.requestCheckLogin());
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
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
    responseGoogle = (response) => {
        console.log(response);
        
        if (response) {
            this.props.dispatch(action.requestGetLogin(response.accessToken))
            cookies.set('accessToken', response.accessToken);
            this.setState({
                visible: false,
                isLogout: false
            });
        }
    }
    error = (response) => {
        console.error("error " + response) // eslint-disable-line
    }
    logout = () => {
        this.props.dispatch(action.requestLogout(cookies.remove('accessToken')));
        this.setState({
            isLogout: true
        })
    }
    onShowLogout = () => {
        this.setState({
            is_dropdown: !this.state.is_dropdown
        })
    }
    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({
                is_dropdown: false
            })
        }
    }
    setWrapperRef = (node) => {
        this.wrapperRef = node;
    }
    onRedirect = () => {
        this.setState({
            isRedirect: !this.state.isRedirect
        })
    }
    render() {
        if (this.state.isRedirect) {
            return (
                <Redirect to="/admin"></Redirect>
            )
        }
        const contentLogin = () => {
            if (cookies.get('data') !== undefined) {
                return (
                    <>
                        <li className="b-item">
                            <button className="b-btn" onClick={this.onRedirect}><i className="fas fa-cog" /></button>
                        </li>
                        <li className={this.state.is_dropdown ? "b-item b-dropdown is-active" : "b-item b-dropdown"}>
                            <button className="b-btn" onClick={this.onShowLogout}><i className="fas fa-user" /> Xin Chào, {this.props.user.name}</button>
                            <div className="b-hash-menu">
                                <div className="b-logout">
                                    <button className="b-btn" onClick={this.logout}>
                                        <i className="fas fa-sign-out-alt"></i> Logout
                                </button>
                                </div>
                            </div>
                        </li>
                    </>
                )
            } else {
                return (
                    <li className="b-item ">
                        <button className="b-btn" onClick={this.showModal}><i className="fas fa-user"></i> Đăng Nhập</button>
                    </li>
                )

            }
        }
        const contentLogout = () => {
            if (this.state.isLogout) {
                return (
                    <li className="b-item ">
                        <button className="b-btn" onClick={this.showModal}><i className="fas fa-user"></i> Đăng Nhập</button>
                    </li>
                )
            } else {
                return (
                    <>
                        {contentLogin()}
                    </>
                )

            }
        }

        return (
            <header className="b-page-header" ref={this.setWrapperRef}>
                <Modal
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}>
                    <div className="b-login">
                        <div className="b-heading">
                            <h2 className="b-text-title">
                                Đăng Nhập
                            </h2>
                        </div>
                        <div className="b-content">
                            <GoogleLogin
                                clientId="748712237748-u625dabsn5e95cohlu9m31lt765cbvin.apps.googleusercontent.com"
                                scope="https://www.googleapis.com/auth/analytics"
                                onSuccess={this.responseGoogle}
                                onFailure={this.error}
                                // onRequest={loading}
                                offline={false}
                                approvalPrompt="force"
                                responseType="id_token"
                                isSignedIn
                                theme="dark"
                            />

                        </div>
                    </div>
                </Modal>
                <div className="b-block">
                    <div className="b-block-left">
                        <div className="b-icon">
                            <img src="/images/logo-light.svg" alt="Logo" />
                        </div>
                    </div>
                    <div className="b-block-right">
                        <div className="b-list-item">
                            <li className="b-item">
                                <button className="b-btn"><i className="fas fa-bell" /></button>
                            </li>

                            {contentLogout()}

                        </div>
                    </div>
                </div>
            </header>
        );
    }
}
function mapStateProps(state) {
    return {
        isLogin: state.login.isLogin,
        user: state.login.user
    }
}
export default connect(mapStateProps, null)(HeaderLayout);