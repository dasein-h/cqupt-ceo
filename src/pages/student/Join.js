import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
class Join extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="test_all">
                加入公司
                </div>

         );
    }
}
 
export default withRouter(Join);