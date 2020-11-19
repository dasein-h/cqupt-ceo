import React, { Component } from "react";
import { Table } from 'antd'; 
import {unSelectedClassTeacher} from '../../../until/api/teacherApi.js';


const columns = [
  {
    title: 'teachclass',
    dataIndex: 'teachclass',
    key: 'teachclass',
  },
  {
    title: 'age',
    dataIndex: 'age',
    key: 'age',
  },
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

class UnChosenStuClass extends Component{
    render() {
        return (
        <div>
            <Table dataSource={dataSource} columns={columns}  rowSelection={{type:"checkbox"}}/>
        </div>
        );
    };

    componentWillMount(){
        unSelectedClassTeacher("1","79")
    }
}

export default UnChosenStuClass;