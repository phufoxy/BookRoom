import React, { Component } from 'react';

class FormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            type: ''
        }
    }
    onChanger = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    onSubmit = (event) =>{
        event.preventDefault();
        this.props.onAdd(this.state);
        
    }
    render() {
        const contentMain = () => {
            switch (this.props.choice) {
                case "ROOM":
                    return (
                        <form className="form-horizontal form-material" onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label className="text-contact">Name</label>
                                <input
                                    onChange={this.onChanger}
                                    name="name"
                                    value={this.state.name}
                                    className="form-control"
                                    placeholder="Johnathan Doe"
                                    type="text" />
                            </div>
                            <div className="form-group">
                                <label className="text-contact">Phòng</label>
                                <select className="form-control" name="type" onChange={this.onChanger} defaultValue="Phòng Lớn">
                                    <option className="city">Phòng Lớn</option>
                                    <option className="city">Phòng Nhỏ 1</option>
                                    <option className="city">Phòng Nhỏ 2</option>

                                </select>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-success">Save</button>
                            </div>
                        </form>
                    )
                case "BOOK":
                    return (
                        <form className="form-horizontal form-material">
                            <div className="form-group">
                                <label className="text-contact">Content</label>
                                <input
                                    name="name"
                                    className="form-control"
                                    type="text" />
                            </div>
                            <div className="form-group">
                                <label className="text-contact">Id_Room</label>
                                <select className="form-control" name="type"  defaultValue="Phòng Lớn">
                                    <option className="city">1</option>
                                    <option className="city">2</option>
                                    <option className="city">3</option>

                                </select>
                            </div>
                            <div className="form-group">
                                <label className="text-contact">NameUser</label>
                                <input
                                    name="name"
                                    className="form-control"
                                    type="text" />
                            </div>
                            <div className="form-group">
                                <label className="text-contact">DayStart</label>
                                <input
                                    name="name"
                                    className="form-control"
                                    type="text" />
                            </div>
                            <div className="form-group">
                                <label className="text-contact">TimeStart</label>
                                <input
                                    name="name"
                                    className="form-control"
                                    type="text" />
                            </div>
                            <div className="form-group">
                                <label className="text-contact">TimeEnd</label>
                                <input
                                    name="name"
                                    className="form-control"
                                    type="text" />
                            </div>
                            <div className="form-group">
                                <label className="text-contact">Repeat</label>
                                <input
                                    name="name"
                                    className="form-control"
                                    type="text" />
                            </div>
                            <div className="form-group">
                                <label className="text-contact">Created_at</label>
                                <input
                                    name="name"
                                    className="form-control"
                                    type="text" />
                            </div>
                            <div className="form-group">
                                <label className="text-contact">Update_at</label>
                                <input
                                    name="name"
                                    className="form-control"
                                    type="text" />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-success" >Save</button>
                            </div>
                        </form>
                    )
                default:
                    return <></>
            }
        }
        return (
            <div className="edit-form ">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="b-card">
                                <div className="card-body">
                                    {contentMain()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FormComponent;