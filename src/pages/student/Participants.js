import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
class Participants extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="test_all margindiv">
                申请成员
            </div>
         );
    }
}
 
export default withRouter(Participants);