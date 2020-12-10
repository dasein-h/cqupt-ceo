import React, { Component, Fragment } from 'react'
import { Table, Button, Space} from 'antd';
import {unSelectedClassTeacher} from '../../../until/api/teacherApi';

const columns = [
  {
    title: 'teachclass',
    dataIndex: 'teachclass',
    key: 'teachclass'
  },
 {
    title: '操作',
    key: 'action',
    align:'center',
    render: (text, record) => (
        <Space size="middle">
            <Button type="primary" ghost >{record.action}</Button>
         </Space>
    )//onClick={() => {this.handleDecideCeo(text,record)}}
 }
];

const dataSource = [
  {
    key: '1',
    teachclass: 42342,
    age: 32,
  },
  {
    key: '2',
    teachclass: 12445,
    age: 42,
  },
  {
    key: '3',
    teachclass: 15432445,
    age: 42,
  },
  {
    key: '4',
    teachclass: 12434245,
    age: 42,
  },
  {
    key: '5',
    teachclass: 11232445,
    age: 42,
  },
];

class ChoseClass extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataSouce: []
        }
    }
    render() { 
        return (
            <Fragment>
                <Table 
                    dataSource={dataSource} 
                    columns={columns}  
                    rowSelection={{type:"checkbox"}}
                />
            </Fragment>
        )
    }
     componentWillMount(){
        unSelectedClassTeacher("1","79")
    }
    changePage = () => {

    }
}
export default ChoseClass