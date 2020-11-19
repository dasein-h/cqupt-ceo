import React, { Component } from "react";
import { Table } from 'antd'; 

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
];

class ChosenStuClass extends Component{
    render() {
        return (
        <div>
            <Table dataSource={dataSource} columns={columns}  rowSelection={{type:"checkbox"}}/>
        </div>
  );
};
}

export default ChosenStuClass;