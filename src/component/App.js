import React, { Component } from 'react';
import Header from './Header';
import AddAndEditUser from './AddAndEditUser';
import TableData from './TableData';
import {connect} from 'react-redux';
import Notification from './Notification'
class App extends Component {
  constructor(props) {
    super(props);
    
  }
  
  CheckStateOfForm =()=>{
    if(this.props.CheckState ===true){
        return (<AddAndEditUser/>) 
    }
  }

  render() {
    return (
      <div>         
          <Header/>
          <div id="body ">
              <div className="container">
                 <div className="row ">
                    {
                      this.CheckStateOfForm()

                    }                    
                    <TableData/>
                    <Notification/>
                </div>
              </div>
           </div>
     </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
   CheckState : state.EditState 
  }
}

export default connect(mapStateToProps)(App)