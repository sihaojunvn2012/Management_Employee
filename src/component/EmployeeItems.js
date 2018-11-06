import React, { Component } from 'react';
import {connect} from 'react-redux'

class EmployeeItems extends Component {
    ChangeTitleEdit =() =>{
        var Value =false;
        this.props.ChangeTitle(Value);

    }
    GetData = ()=>{
        this.props.GetEditData(this.props.Employee);
        this.props.ChangeStateOfForm();
        this.ChangeTitleEdit();
    }
    RemoveData =() =>{
        this.props.RemoveData(this.props.Employee.Key);
        this.props.TurnOn("Remove Success","danger");
    }
    render() {
        
        return (
            <tr className="text-center">
                <td scope="row">{this.props.STT}</td>                
                <td>{this.props.Name}</td>
                <td>{this.props.Email}</td>
                <td>{this.props.Password}</td>
                <td>{this.props.Birthday}</td>
                <td>{this.props.NumberPhone}</td>
                <td>{this.props.Permission}</td>
                <td className="btn-group">
                    <button onClick ={()=>this.GetData()} type="button" className="btn btn-warning"><i className="fas fa-pencil-alt" />Edit</button>
                    <button onClick ={()=>this.RemoveData()}type="button" className="btn btn-danger"><i className="fas fa-times" /> Remove</button>
                </td>
            </tr>

        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        Getitems: state.items
        
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {        
        GetEditData : (GetItems) =>{
            dispatch({
                type: "GET_EDIT_DATA",
                GetItems            

            })
        },
        ChangeStateOfForm: () => {
            dispatch({
                    type:"CHANGE_STATE",
                    
            })
          },      
          RemoveData: (Items) => {
            dispatch({
                    type:"REMOVE_DATA",
                    Items
                    
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
        },
        ChangeTitle: (EditTitle) => {
            dispatch({
                    type:"EDIT_TITLE",
                    EditTitle                
            })
    
        }
    
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeItems)

