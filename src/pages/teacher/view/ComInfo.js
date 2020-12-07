import React, { Component, Fragment } from 'react'
import { Table, Badge, Menu, Dropdown, Space,Tag,Input,Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import '../../teacher/style/StuInfo.css';
import { ShowComInfo } from '../../../until/api/teacherApi';

// const { Search } = Input;

const menu = (
  <Menu>
    <Menu.Item>Action 1</Menu.Item>
    <Menu.Item>Action 2</Menu.Item>
  </Menu>
);


const expandedRowRender = () => {
  const columns = [
    { title: '学号', dataIndex: 'stuID', key: 'stuID' },
    { title: '姓名', dataIndex: 'stuname', key: 'stuname' },
    {
      title: 'Status',
      key: 'state',
      render: () => (
        <span>
          <Badge status="success" />
            Finished
        </span>
      ),
    },
    { title: '职位', dataIndex: 'position', key: 'position' },
    {
      title: 'Action',
      dataIndex: 'operation',
      key: 'operation',
      render: () => (
        <Space size="middle">
          <a>Pause</a>
          <a>Stop</a>
          <Dropdown overlay={menu}>
            <a>
              More <DownOutlined />
            </a>
          </Dropdown>
        </Space>
      ),
    },
  ];

  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i,
      stuID: '2019211263',
      stuname: 'marry',
      position: '经理',
    });
  }

  return (
    <Table columns={columns} dataSource={data} pagination={false} />
  )

}; 

const columns = [
  {
    title: '公司ID',
    dataIndex: 'companyID',
    key:'companyID'
  },
  {
    title: '公司名称',
    dataIndex: 'comName',
    key:'comName'
  },
  {
    title: 'CEO学号',
    dataIndex: 'ceoID',
    key:'ceoID'
  },
  {
    title: 'CEO姓名',
    dataIndex: 'ceoname',
    key:'ceoname'
  },
  {
    title: '公司得分',
    dataIndex: 'companyScore',
    key:'companyScore'
  },
  {
    title: '票数',
    dataIndex: 'count',
    key:'count'
  },
  {
    title: '等级',
    dataIndex: 'level',
    key:'level'
  },
  {
    title: '老师打分',
    dataIndex: 'scoreTeacher',
    key:'scoreTeacher'
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    render: (text) => { 
      let color = 'green';
      return (
        <Tag color={ color}>{ text }</Tag>
      )
      
    }
  }
];





// const onSearch = value => console.log(value);


class ComInfo extends Component { 
    constructor(props) { 
        super(props);
        this.state = {
          data: [],
          pagination: {
            total:20,
            pageSize: 10,
            },
            loading: false,
        };
    }
    // 表格
  componentDidMount() {
      this.setState({
        data: [],
        pagination: {
          total:20,
          pageSize: 10,
          },
        loading: true,
      })
      let res = ShowComInfo("SJ00201A2031780003");
      let mydata=[];
      res.then(
        (result) => { 
          console.log(result);
          for (let i in result.data.data["object"]) { 
            mydata.push({
              key:i,
              "companyID": result.data.data["object"][i]["companyID"],
              "comName": result.data.data["object"][i]["companyName"],
              "ceoID":result.data.data["object"][i]["ceo"],
              "ceoname":result.data.data["object"][i]["ceoName"],
              "companyScore":result.data.data["object"][i]["companyScore"],
              "count":result.data.data["object"][i]["count"],
              "level":result.data.data["object"][i]["level"],
              "scoreTeacher":result.data.data["object"][i]["scoreTeacher"],
              "action":"打分",
            })
          }
                this.setState({
                  data: mydata,
                  pagination: {
                    total:result.data.data["totalNumber"],
                    pageSize: result.data.data["pageSize"]
                    },
                    loading: false,
                })
          console.log(this.state);
        },
        (err) => { 
          console.log(err);
        }
      )
      }
    
        
    
    render() { 
        return (
            <Fragment>
                <div>
                    <span className='title'>公司信息</span>
                    <span className='com-search'>
                        <Input placeholder="公司名称" className="input" />
                        <Button type="primary">搜索</Button>
                    </span>
                </div>

                <div>
                    <Table
                    
                      className="components-table-demo-nested"
                        columns={columns}
                        dataSource={this.state.data}
                        pagination={this.state.pagination}
                        loading={this.state.loading}
                        expandable={{ expandedRowRender }}
                      
                    />
                </div>
            </Fragment>
        );
    }
}



export default ComInfo;