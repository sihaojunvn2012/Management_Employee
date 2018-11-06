import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddAndEditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: '',
            Name: '',
            Email: '',
            Password: '',
            Birthday: '',
            NumberPhone: '',
            Permission: '',
            Key: ''

        }
    }    
    componentWillMount = () => {

        if (this.props.Getitems.Key) {
            this.setState({
                ID: this.props.Getitems.ID,
                Name: this.props.Getitems.Name,
                Email: this.props.Getitems.Email,
                Password: this.props.Getitems.Password,
                Birthday: this.props.Getitems.Birthday,
                NumberPhone: this.props.Getitems.NumberPhone,
                Permission: this.ChangeStatePermission1(this.props.Getitems.Permission),
                Key: this.props.Getitems.Key

            });

        }
    }
    
    isChange = (event) => {
        const Name = event.target.name;
        const Value = event.target.value;
        this.setState({
            [Name]: Value

        });

    }
    CancelForm = () => {
        this.props.ChangeStateOfForm();
    }
    EditOrAddForm = (Name, Email, Password, Birthday, NumberPhone, Permission, Key) => {
        if (this.state.ID) {
            var Items = {}
            Items.Name = Name;
            Items.Email = Email;
            Items.Password = Password;
            Items.Birthday = Birthday;
            Items.NumberPhone = NumberPhone;
            Items.Permission = this.ChangeStatePermission(Permission);
            Items.KeyID = Key;
            this.props.EditData(Items);
            this.props.ChangeStateOfForm();
            this.props.TurnOn("Edit content success", "warning");
            console.log("OK");
        }        
        else {         
            
            var Object = {};
            const code = require('uuid/v3');
            Object.ID = code.DNS;
            Object.Name = Name;
            Object.Email = Email;
            Object.Password = Password;
            Object.Birthday = Birthday;
            Object.NumberPhone = NumberPhone;
            Object.Permission = this.ChangeStatePermission(Permission);
            this.props.AddDataStore(Object);
            this.props.ChangeStateOfForm();
            this.props.TurnOn("Add content success", "info");
        }

    }
    ChangeStatePermission = (Value) => {

        if (parseInt(Value) === 1) {
            return ('Admin')
        }
        else if (parseInt(Value) === 2) {
            return ('Moderator')

        }
        else {
            return ('Normal')

        }

    }
    ChangeStatePermission1 = (Value) => {

        if (Value === 'Admin') {
            return 1
        }
        else if (Value === 'Moderator') {
            return 2

        }
        else {
            return 3

        }

    }
    ChangeTitle =()=>{
        if(this.props.stateTitle===true){
           
           return <h5 className="mw-100 text-center ">Add Employees</h5>

        }
        else {
            return <h5 className="mw-100 text-center ">Edit Employees</h5>
        }
    }
    render() {
        

        return (
            <div className="col mt-4  ">
                <div className="border px-3">
                    {
                        this.ChangeTitle()
                    }
                    <form>
                        <div className="form-group ">
                            <label className="w-100">Full Name</label>
                            <input defaultValue={this.props.Getitems.Name} onChange={(event) => this.isChange(event)} name="Name" type="text" className="form-control" id="exampleInputFullName1" aria-describedby="emailHelp" placeholder="Enter Name" />
                        </div>
                        <div className="form-group">
                            <label className="w-100">Email address</label>
                            <input defaultValue={this.props.Getitems.Email} onChange={(event) => this.isChange(event)} name="Email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label className="w-100">Password</label>
                            <input defaultValue={this.props.Getitems.Password} onChange={(event) => this.isChange(event)} name="Password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                        </div>
                        <div className="form-group">
                            <label className="w-100">Birthday</label>
                            <input defaultValue={this.props.Getitems.Birthday} onChange={(event) => this.isChange(event)} name="Birthday" type="date" className="form-control" defaultValue="2018-10-29" id="exampleInputBirthday1" aria-describedby="emailHelp" />
                        </div>
                        <div className="form-group">
                            <label className="w-100">Number Phone</label>
                            <input defaultValue={this.props.Getitems.NumberPhone} onChange={(event) => this.isChange(event)} name="NumberPhone" type="tel" className="form-control" id="exampleInputtelephone1" aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label>Permission</label>
                            <select defaultValue={this.ChangeStatePermission1(this.props.Getitems.Permission)} className="custom-select form-control" name="Permission" id="exampleInputPermission1" onChange={(event) => this.isChange(event)}>
                                <option>Premission</option>
                                <option value={1}>Admin</option>
                                <option value={2}>Moderator</option>
                                <option value={3}>Normal</option>
                            </select>
                        </div>
                        <div className="mw-100 d-flex justify-content-center mb-5">
                            <button type="reset" className="btn btn-primary"
                                onClick={() => this.EditOrAddForm(this.state.Name, this.state.Email, this.state.Password, this.state.Birthday, this.state.NumberPhone, this.state.Permission, this.state.Key)} >Save</button>
                            <button onClick={() => this.props.ChangeStateOfForm()} type="button" className="btn btn-danger">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        Getitems: state.items,
        stateTitle : state.StateTitle
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        AddDataStore: (GetItems) => {
            dispatch({
                type: "ADD_DATA",
                GetItems
            })
        },
        EditData: (Items) => {
            dispatch({
                type: "EDIT_DATA",
                Items
            })

        },
        ChangeStateOfForm: () => {
            dispatch({
                type: "CHANGE_STATE",

            })
        },
        TurnOn: (AlertContents, Types) => {
            dispatch({
                type: "TURN_ON", AlertContents, Types
            })
        },
        TurnOff: () => {
            dispatch({
                type: "TURN_OFF"
            })
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddAndEditUser)