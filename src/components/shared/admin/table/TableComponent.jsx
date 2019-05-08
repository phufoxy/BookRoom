import React, { Component } from 'react';

var dateFormat = require('dateformat');
class TableComponent extends Component {
    onChangerView = () => {
        this
            .props
            .onChangerView();
    }
    onDelete(id) {
        this
            .props
            .onDelete(id);

    }
    onEdit(){
        this.props.onEdit(this.props.id);
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
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this
                                        .props
                                        .data
                                        .map(data => (
                                            <tr key={data.id}>
                                                <td>{data.id}</td>
                                                <td>{data.attributes.name}</td>
                                                <td>{data.attributes.type}</td>
                                                <td>{dateFormat(data.attributes.created_at, "dd-mm-yyyy hh:MM:ss")}</td>
                                                <td>{dateFormat(data.attributes.updated_at, "dd-mm-yyyy hh:MM:ss")}</td>
                                                <td>
                                                    <button className="btn_edit" onClick={this.onEdit.bind(this)}>Edit</button>&nbsp;
                                                    <button
                                                        className="btn_dele"
                                                        onClick={this
                                                            .onDelete
                                                            .bind(this, data.id)}>Delete</button>
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
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr >
                                        <td>1</td>
                                        <td>Họp Phỏng Vấn</td>
                                        <td>2</td>
                                        <td>văn phú</td>
                                        <td>2019/05/07</td>
                                        <td>09:30:00</td>
                                        <td>10:30:00</td>
                                        <td>null</td>
                                        <td>07-05-2019 02:27:40</td>
                                        <td>07-05-2019 02:27:40</td>
                                        <td>
                                            <button className="btn_edit">Edit</button>&nbsp;
                                            <button className="btn_dele">Delete</button>
                                        </td>
                                    </tr>
                                    <tr >
                                        <td>2</td>
                                        <td>Họp Phỏng Vấn</td>
                                        <td>3</td>
                                        <td>văn phú</td>
                                        <td>2019/05/07</td>
                                        <td>09:30:00</td>
                                        <td>10:30:00</td>
                                        <td>null</td>
                                        <td>07-05-2019 02:27:40</td>
                                        <td>07-05-2019 02:27:40</td>
                                        <td>
                                            <button className="btn_edit">Edit</button>&nbsp;
                                            <button className="btn_dele">Delete</button>
                                        </td>
                                    </tr>
                                    <tr >
                                        <td>2</td>
                                        <td>Họp Phỏng Vấn</td>
                                        <td>3</td>
                                        <td>văn phú</td>
                                        <td>2019/05/07</td>
                                        <td>09:30:00</td>
                                        <td>10:30:00</td>
                                        <td>null</td>
                                        <td>07-05-2019 02:27:40</td>
                                        <td>07-05-2019 02:27:40</td>
                                        <td>
                                            <button className="btn_edit">Edit</button>&nbsp;
                                            <button className="btn_dele">Delete</button>
                                        </td>
                                    </tr>
                                    <tr >
                                        <td>2</td>
                                        <td>Họp Phỏng Vấn</td>
                                        <td>3</td>
                                        <td>văn phú</td>
                                        <td>2019/05/07</td>
                                        <td>09:30:00</td>
                                        <td>10:30:00</td>
                                        <td>null</td>
                                        <td>07-05-2019 02:27:40</td>
                                        <td>07-05-2019 02:27:40</td>
                                        <td>
                                            <button className="btn_edit">Edit</button>&nbsp;
                                            <button className="btn_dele">Delete</button>
                                        </td>
                                    </tr>
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