import React, { Component,Fragment } from 'react'
import { Table } from 'antd'
import {selectedClassTeacher} from '../../../until/api/teacherApi'


const columns = [
                {
                    title: '教学班',
                    dataIndex: 'teachclass',
                    key: 'teachclass'
                    // align: "center"
                }
            ]

class DeleteClass extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource:[
                {
                    teachclass:"423423432434"
                },{
                    teachclass:"423423432434"
                },{
                    teachclass:"423423432434"
                },{
                    teachclass:"423423432434"
                },
            ]
        }
        this.changePage = this.changePage.bind(this);
    }
    render(){
        
        return(
            <Fragment>
                <Table 
                    dataSource={this.state.dataSource} 
                    columns={columns}  
                    rowSelection={{type:"checkbox"}}
                /> 
            </Fragment>
        )
    }
    componentDidMount(){
        this.changePage(this.props.teacherId,1);
    }
    changePage = (teacherId,currentPage) => {
        selectedClassTeacher(teacherId,currentPage).then(
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

export default DeleteClass;