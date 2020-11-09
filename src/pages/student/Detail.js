import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="test_all margindiv">
                宣讲投票
            </div>
         );
    }
}
 
export default withRouter(Detail);