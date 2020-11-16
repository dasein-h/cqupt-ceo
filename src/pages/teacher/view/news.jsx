import React from 'react'
import {changeCompanyName,agreeChange,rejectChange} from '../../../until/api/teacherApi'
import { Table, Tag, Space } from 'antd'

  // const columns = [
  //   {
  //     title: '姓名',
  //     dataIndex: 'name',
  //     key: 'name',
  //     render: text => <a>{text}</a>,
  //   },
  //   {
  //     title: '原公司名',
  //     dataIndex: 'oriName',
  //     key: 'oriName',
  //   },
  //   {
  //     title: '修改后公司名',
  //     dataIndex: 'nowName',
  //     key: 'nowName',
  //   },
  //   {
  //     title: '操作',
  //     key: 'action',
  //     dataIndex: 'action',
  //     render: tags => (
  //       <>
  //         {tags.map(tag => {
  //           let color = tag.length > 5 ? 'geekblue' : 'green';
  //           if (tag === 'loser') {
  //             color = 'volcano';
  //           }
  //           return (
  //             <Tag color={color} key={tag}>
  //               {tag.toUpperCase()}
  //             </Tag>
  //           );
  //         })}
  //       </>
  //     ),
  //   },
  // ];
  
  // const data = [
  //   {
  //     key: '1',
  //     姓名: 'John Brown',
  //     原公司名: 32,
  //     修改后公司名:23,
  //     操作: ['nice', 'developer'],
  //   },
  //   {
  //     key: '2',
  //     name: 'Jim Green',
  //     age: 42,
  //     address: 'London No. 1 Lake Park',
  //     tags: ['loser'],
  //   },
  //   {
  //     key: '3',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sidney No. 1 Lake Park',
  //     tags: ['cool', 'teacher'],
  //   },
  // ];

const columns = [
  {
    title: '名字',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '原公司名',
    dataIndex: 'oriName',
    key: 'oriName',
  },
  {
    title: '修改后公司名',
    dataIndex: 'nowName',
    key: 'nowName',
  },
  {
    title: '同意',
    key: 'agree',
    dataIndex: 'agree',
    render: tags => (
      <>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: '删除',
    key: 'delete',
    render: (text, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    oriName: 32,
    nowName: 'New York No. 1 Lake Park',
    agree: ['nice', 'developer'],
  }
];
class newLists extends React.Component{
    constructor(...props){
        super(...props)
        this.state = {
            
        }
    }
    render(){
        return (
        <div id="news">
            <div className="header">
            <Table columns={columns} dataSource={data} />
            </div>
        </div>
        )
        
    }
    componentWillMount(){
        changeCompanyName('tiansh',"1","1")
    }
}
export default newLists
