import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
class AllCompanies extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (             
        <div className="test_all margindiv">
            所有公司信息
            </div> );
    }
}
 
export default withRouter(AllCompanies);