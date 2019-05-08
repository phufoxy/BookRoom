import React, { Component } from 'react';
import { Modal } from 'antd';

class HeaderLayout extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            visible: false
        }
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
    render() {
        return (
            <header className="b-page-header">
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
                            <form className="b-form">
                                <div className="b-form-group">
                                    <input type="text" placeholder="Email" className="b-input" />
                                </div>
                                <div className="b-form-group">
                                    <input type="text" placeholder="Email" className="b-input" />
                                </div>
                                <div className="b-form-group">
                                    <button type="submit" className="b-btn waves-effect waves-teal">Đăng Nhập</button>
                                </div>
                            </form>
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
                            <li className="b-item">
                                <button className="b-btn"><i className="fas fa-cog" /></button>
                            </li>
                            <li className="b-item b-dropdown">
                                <button className="b-btn"><i className="fas fa-user" /> Xin Chào, Hau</button>
                            </li>
                            <li className="b-item ">
                                <button className="b-btn" onClick={this.showModal}><i className="fas fa-user"></i> Đăng Nhập</button>
                            </li>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default HeaderLayout;