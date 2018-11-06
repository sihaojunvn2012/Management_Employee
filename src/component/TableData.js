import React, { Component } from 'react';
import EmployeeItems from './EmployeeItems';
import { ManagementData } from './FirebaseConnect';
import { connect } from 'react-redux';

class TableData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Datafribase: [],
            SearchData: '',
            Employee: {
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
    }
    ChangeTitleADD = () => {
        var Value = true;
        this.props.ChangeTitle(Value);
        
    }
    ShowForm = () => {
        this.props.ChangeStateOfForm();
        this.ChangeTitleADD();
        this.props.GetEditData(this.state.Employee);
    }
    OnchangeSearch = (event) => {
        var Value = event.target.value
        this.setState({
            SearchData: Value.toLowerCase()

        });

    }
    componentWillMount = () => {
        // console.log(JSON.stringify(ManagementData.child('-LQ5bR2t2lt1FyqCOFLr')));
        ManagementData.on('value', (Employees) => {
            let ArrayData = [];
            console.log(Employees);
            Employees.forEach(Element => {
                const key = Element.key
                const Id = Element.val().ID;
                const Birthday = Element.val().Birthday;
                const Email = Element.val().Email;
                const Name = Element.val().Name;
                const NumberPhone = Element.val().NumberPhone;
                const Password = Element.val().Password;
                const Permission = Element.val().Permission;
                ArrayData.push({
                    Key: key,
                    ID: Id,
                    Birthday: Birthday,
                    Email: Email,
                    Name: Name,
                    NumberPhone: NumberPhone,
                    Password: Password,
                    Permission: Permission
                })

            });
            this.setState({
                Datafribase: ArrayData

            })
        });

    }
    GetData = (KetQua) => {
        if (this.state.SearchData) {
            return KetQua.map((value, key) => {

                return (<EmployeeItems Key={value.Key} Id={value.ID}
                    Birthday={value.Birthday} Email={value.Email}
                    Name={value.Name} NumberPhone={value.NumberPhone}
                    Password={value.Password} Permission={value.Permission}
                    Employee={value} STT={key} />)
            });

        }
        else {
            if (this.state.Datafribase) {
                return this.state.Datafribase.map((value, key) => {

                    return (<EmployeeItems Key={value.Key} Id={value.ID}
                        Birthday={value.Birthday} Email={value.Email}
                        Name={value.Name} NumberPhone={value.NumberPhone}
                        Password={value.Password} Permission={value.Permission}
                        Employee={value} STT={key} />)
                });
            }

        }

    }
    SortName = (value) => {
        this.props.GetNameSort(value);
    }

    render() {
        var KetQua = [];
        if (this.state.SearchData) {
            KetQua = this.state.Datafribase.filter((value) => {
                return value.Name.toLowerCase().indexOf(this.state.SearchData) !== -1
            });
        }
        //  Giả Sử Không Biết  đặt function để xử lý thì cho render() làm thẳng  và xử lý luôn bởi vì dô Render trước rồi mới tới return 
        // chú ý nếu muốn sử lý render cần kết hợp vs state or store của redux
        //Chưa Hiểu Phần Sắp Xếp này Cho Lắm. 
        if (this.props.SortName === 'SortA_Z') {
            // sắp xếp Tăng Dần 
            this.state.Datafribase.sort((a, b) => {
                if (a.Name > b.Name) return 1;
                else if (a.Name < b.Name) return -1;
                else return 0;
            });
            this.state.Datafribase.sort((a, b) => {
                if (a.Email > b.Email) return 1;
                else if (a.Email < b.Email) return -1;
                else return 0;
            });

        }
        else {
            //Sắp Xếp Giảm Dần
            this.state.Datafribase.sort((a, b) => {
                if (a.Name > b.Name) return -1;
                else if (a.Name < b.Name) return 1;
                else return 0;
            });
            this.state.Datafribase.sort((a, b) => {
                if (a.Email > b.Email) return -1;
                else if (a.Email < b.Email) return 1;
                else return 0;
            });
        }


        return (
            <div className="col mt-4 ">
                <button onClick={() => this.ShowForm()} type="submit" className="btn btn-primary ">Add Employees</button>
                {/* form inline */}
                <div className="form-inline mt-5 ">
                    <input onChange={(event) => this.OnchangeSearch(event)} name="search" type="text" className="form-control w-60" id="exampleInputSearch" aria-describedby="emailHelp" placeholder="Search" />
                    <button type="button" className="btn btn-primary rounded-right "> <i className="fas fa-search" /> Search</button>
                    <div className="dropdown ml-4">
                        <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown"><i className="fas fa-sort" />
                            Sort
                </button>
                        <div className="dropdown-menu">
                            <a onClick={() => this.SortName('SortA_Z')} className={'dropdown-item' + ' ' + (this.props.SortName === 'SortA_Z' ? 'Sort_Seleted' : '')} href="#"><i className="fas fa-long-arrow-alt-up" /> Tên A -> Z </a>
                            <a onClick={() => this.SortName('SortZ_A')} className={'dropdown-item' + ' ' + (this.props.SortName === 'SortZ_A' ? 'Sort_Seleted' : '')} href="#"><i className="fas fa-long-arrow-alt-down" /> Tên Z -> A </a>
                        </div>
                    </div>
                </div>{/*End Form Inline*/}
                <table className="table table-hover table-inverse mt-4 table-responsive">
                    <thead className="thead-inverse">
                        <tr className="text-center">
                            <th> STT</th>
                            <th> Name</th>
                            <th> Email </th>
                            <th> Password </th>
                            <th> Birthday </th>
                            <th> Number Phone </th>
                            <th> Permission </th>
                            <th> Manipulation </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.GetData(KetQua)
                        }
                    </tbody>
                </table>
            </div>

        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        GetItems: state.items,
        SortName: state.Sort,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ChangeStateOfForm: () => {
            dispatch({
                type: "CHANGE_STATE",

            })
        },
        GetNameSort: (SortName) => {
            dispatch({
                type: "GET_STATE_SORT",
                SortName
            })

        },
        ChangeTitle: (AddTitle) => {
            dispatch({
                type: "ADD_TITLE",
                AddTitle
            })

        },
        GetEditData: (GetItems) => {
            dispatch({
                type: "GET_EDIT_DATA",
                GetItems

            })
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TableData)