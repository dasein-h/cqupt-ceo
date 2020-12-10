import React, { Component, Fragment } from 'react'
import { Table } from 'antd'
import {unSelectedClassTeacher} from '../../../until/api/teacherApi'
 
const columns = [
                {
                    title: '教学班',
                    dataIndex: 'teachclass',
                    key: 'teachclass'
                }
            ]

class AddClass extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource:[]
        }
        this.changePage = this.changePage.bind(this)
    }
    render(){
        return(
            <Fragment>
                <Table 
                    dataSource={this.state.dataSource} 
                    columns={columns}  
                    rowSelection={{type:"checkbox"}}
                    rowKey={record => record.teachclass}
                /> 
            </Fragment>
        )
    }
    componentDidMount(){
        this.changePage(this.props.teacherId,1);
    }
    changePage = (teacherId,currentPage) => {
        unSelectedClassTeacher(teacherId,currentPage).then(
            (res) => {
                this.setState({
                    dataSource: res.data.data
                })
                console.log(res);
            },
            (err) => {
                console.log(err);
            }
        )
    }
}

export default AddClass