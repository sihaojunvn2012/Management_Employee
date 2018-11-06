import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (            
            <header id="header">
              <div className="container ">
                <h4 className="text-center mt-3 mb-2">Employees Management</h4>
                <div className="border-bottom mt-5" />
              </div>
            </header>            
        );
    }
}

export default Header;