import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
class WriteWant extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="test_all margindiv">
                成员互评
            </div>
         );
    }
}
 
export default withRouter(WriteWant);