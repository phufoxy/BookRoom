import React, { Component } from 'react';
import { Modal } from 'antd';
const confirm = Modal.confirm;
var dateFormat = require('dateformat');
class TableComponent extends Component {
    onChangerView = () => {
        this.props.onChangerView();
    }
    onDelete(id) {
        this.props.onDelete(id);

    }
    onEdit(id) {
        var self = this.props;
        confirm({
            title: 'Bạn có muốn sửa phòng?',
            content: 'Có chắc chắn !',
            onOk() {
                self.onEdit(id);
            },
            onCancel() {
                console.log('Cancel');
            },
        });

    }
    render() {
        const contentMain = () => {
            switch (this.props.choice) {
                case "ROOM":
                    return (
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr className="bg-table">
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>Create_at</th>
                                        <th>Update_at</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this
                                        .props.data.map(data => (
                                            <tr key={data.id}>
                                                <td>{data.id}</td>
                                                <td>{data.attributes.name}</td>
                                                <td>{data.attributes.type}</td>
                                                <td>{dateFormat(data.attributes.created_at, "dd-mm-yyyy HH:MM:ss")}</td>
                                                <td>{dateFormat(data.attributes.updated_at, "dd-mm-yyyy HH:MM:ss")}</td>
                                                <td>
                                                    <button className="btn_edit" onClick={this.onEdit.bind(this,data.id)}>Edit</button>&nbsp;
                                                   
                                                </td>
                                                <td>
                                                <button
                                                        className="btn_dele"
                                                        onClick={this.onDelete.bind(this, data.id)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))}

                                </tbody>
                            </table>
                        </div>
                    )
                case "BOOK":
                    return (
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr className="bg-table">
                                        <th>ID</th>
                                        <th>Content</th>
                                        <th>Id_Room</th>
                                        <th>NameUser</th>
                                        <th>DayStart</th>
                                        <th>TimeStart</th>
                                        <th>TimeEnd</th>
                                        <th>Repeat</th>
                                        <th>Created_at</th>
                                        <th>Update_at</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this
                                        .props
                                        .data
                                        .map(data => (
                                            <tr key={data.id}>
                                                <td>{data.id}</td>
                                                <td>{data.attributes.content}</td>
                                                <td>{data.attributes.id_rooms}</td>
                                                <td>{data.attributes.nameuser}</td>
                                                <td>{data.attributes.daystart}</td>
                                                <td>{data.attributes.timestart}</td>
                                                <td>{data.attributes.timeend}</td>
                                                <td>{data.attributes.repeat}</td>
                                                <td>{dateFormat(data.attributes.created_at, "yyyy-mm-dd hh:MM:ss")}</td>
                                                <td>{dateFormat(data.attributes.updated_at, "yyyy-mm-dd hh:MM:ss")}</td>
                                                <td>
                                                    <button className="btn_edit">Edit</button>&nbsp;
        
                                                </td>
                                                <td>
                                                    <button className="btn_dele" onClick={this.onDelete.bind(this,data.id)}>Delete</button>
                                                </td>
                                            </tr>

                                        ))
                                }
                                </tbody>
                            </table>
                        </div>
                    )
                default:
                    return (
                        <></>
                    )
            }
        }
        return (
            <div className="add-form">
                <div className="container-fluid">
                    <div className="card-body">
                        <div className="header-card">
                            <div>
                                <h4 className="card-title">Top Selling Products</h4>
                            </div>
                        </div>
                        <div className="add-product">
                            <button className="btn-add" onClick={this.onChangerView}>ADD</button>
                        </div>
                        {contentMain()}
                        <div className="b-pagination">
                            <button className="btn-page">
                                <i className="fas fa-angle-double-left" />
                            </button>
                            <button className="btn-page">
                                <i className="fas fa-chevron-left" />
                            </button>
                            <button className="btn-page">1</button>
                            <button className="btn-page">2</button>
                            <button className="btn-page">3</button>
                            <button className="btn-page">4</button>
                            <button className="btn-page">5</button>
                            <button className="btn-page">
                                <i className="fas fa-chevron-right" />
                            </button>
                            <button className="btn-page">
                                <i className="fas fa-angle-double-right" />
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default TableComponent;