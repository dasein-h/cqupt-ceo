import React, { Component } from 'react';
import { Menu,Space,Button,Table } from 'antd';
import {selectedClassTeacher} from '../../../until/api/teacherApi';


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



class StuClass extends React.Component{ 
    constructor(props) { 
        super(props);
        this.state = {
        contentList:"",
        rowSelectionProps:{
          type:'Radio',

        },
        columns: [
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
          {
            title: 'age',
            dataIndex: 'age',
            key: 'ag',
          },
          {
          title: '操作',
          key: 'action',
          align:'center',
          render: (text, record) => (
            <Space size="middle">
              <Button 
                type="primary" 
                ghost 
                onClick={() => {this.handleIntoClass(text,record)}}
            >进入班级</Button>
            </Space>
            ),
          },
        ]
      }
        this.handleIntoClass = this.handleIntoClass.bind(this);
    }
    render() { 
        return (
            <div>
                <div className="topnav">
                    <Menu theme="light"  mode="horizontal" defaultSelectedKeys="1">
                        <Menu.Item key = "1">请选择的班级</Menu.Item>
                    </Menu>
                </div>
                <div>
            <Table 
              dataSource={this.state.contentList} 
              columns={this.state.columns} 
              rowkey={this.state.contentList.teachclass}
              rowSelection={this.state.rowSelectionProps}
              />
        </div>
            </div>
        );

    }
    componentDidMount(){
      let repro = selectedClassTeacher("1","1");
      repro.then((res) => {
        this.setState(
          this.state.contentList = res.data.data
        )
        console.log(res.data.data);
      },(err) => {
        console.log(err);
      })
      console.log(repro);
      
    }
    handleIntoClass = (text,record) => {
      console.log(record.teachclass);
      sessionStorage.setItem('teachclass',record.teachclass);
      this.props.handleDisTeach();
    }
}
export default StuClass;