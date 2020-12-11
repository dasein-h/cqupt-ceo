import React, { Component, Fragment } from 'react'
import {
  Table, Badge, Menu, Dropdown, Space, Tag,
  Input, Button, InputNumber, Form, Popconfirm, message
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import '../../teacher/style/ComInfo.css';
import { ShowComInfo, putScore,deleteCompany,ShowComMember } from '../../../until/api/teacherApi';

// const menu = (
//   <Menu>
//     <Menu.Item>Action 1</Menu.Item>
//     <Menu.Item>Action 2</Menu.Item>
//   </Menu>
// );
// 父组件
class ComInfo extends Component { 
    constructor(props) { 
      super(props);
      this.handleDelete = this.handleDelete.bind(this);
      this.expandedRowRender = this.expandedRowRender.bind(this);
      this.onExpand = this.onExpand.bind(this);
      this.textInput = React.createRef();
      this.state = {
        columns : [
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
            key: 'scoreTeacher',
            width:'20%',
            render: (text,record) => {
             
              return (
                <Fragment>
                  <CustomTextInput ref={this.textInput} txt={text} record={ record}/>      
                </Fragment>

              )
            },
            width:'6%'
          },
          {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) =>
              this.state.data.length >= 1 ? (
                <Popconfirm title="确认删除该公司?" onConfirm={() => this.handleDelete(record.key,record.ceoID)}>
                  <a>删除公司</a>
                </Popconfirm>
              ) : null,
          },
        ],
        data: [],
        pagination: {
          total:20,
          pageSize: 10,
        },
        expandedData: {},
        loading: false,
        disabled: true,
        expandedloading:false
      };

  }
  handleDelete = (key,ceo) => {
    const dataSource = [...this.state.data];
    console.log(ceo);
    let res = deleteCompany(ceo);
    res.then(
      (result) => { 
        console.log(result);
        this.setState({
          data: dataSource.filter((item) => item.key !== key),
        });
        message.success('删除成功！');
      },
      (err) => { 
        console.log(err);
        message.error('删除失败！');
      }
    )

  };
  expandedRowRender = (record) => {

    // console.log(record);
    const columns = [
      { title: '学号', dataIndex: 'studentId', key: 'studentId' },
      { title: '姓名', dataIndex: 'userName', key: 'userName' },
      {
        title: '公司名',key: 'companyName',dataIndex:'companyName'
      },
      { title: '职位', dataIndex: 'position', key: 'position' },
      { title:'专业',dataIndex:'academy',key:'academy' },
      // {
      //   title: 'Action',
      //   dataIndex: 'operation',
      //   key: 'operation',
      //   render: () => (
      //     <Space size="middle">
      //       <a>Pause</a>
      //       <a>Stop</a>
      //       <Dropdown overlay={menu}>
      //         <a>
      //           More <DownOutlined />
      //         </a>
      //       </Dropdown>
      //     </Space>
      //   ),
      // },
    ]; 
    return (
      <Table
        rowKey={record => record.studentId}
        columns={columns}
        dataSource={this.state.expandedData[record.comName]}
        loading={this.state.expandedloading}
        pagination="false"
      />
    )
  
  };
  onExpand = (expanded, record) => {
    if (expanded == false) {
      console.log('合并');
      this.setState({
        expandedData: {
          ...this.state.expandedData,
          [record.comName]: [],
        }
      });
    }
    else {
      console.log("展开！");
      this.setState({ expandedloading: true });
      let res = ShowComMember(record.ceoID);
      res.then(
        (result) => {
          let mydata = [];
          for (let i in result.data.data) {
            mydata.push({
              key: i,
              'studentId': result.data.data[i].studentId,
              'userName': result.data.data[i].userName,
              'companyName': result.data.data[i].companyName,
              'position': result.data.data[i].position,
              'academy': result.data.data[i].academy
            })
          }
          
          this.setState({
            expandedData: {
              ...this.state.expandedData,
              [record.comName]: mydata,
            }
          });
          // console.log(this.state.expandedData);
          this.setState({ expandedloading: false })
        },
        (err) => {
          console.log(err);
        }
      )
    }
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
      let res = ShowComInfo(localStorage.teachclass);
      let mydata=[];
      res.then(
        (result) => { 
          console.log(result);
          let newData = [];
          for (let j = 0; j < result.data.data["totalNumber"];j++) { 
            newData.push(false);
          }
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
              // "action":result.data.data["object"][i]["companyName"]
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
                columns={this.state.columns}
                dataSource={this.state.data}
                pagination={this.state.pagination}
                loading={this.state.loading}
                expandedRowRender={record => this.expandedRowRender(record)}
                onExpand={(expanded,record)=>this.onExpand(expanded,record)}      
              />
             
              </div>
            </Fragment>
        );
    }
}

// 子组件
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.state = {
      inputValue: this.props.txt,
      record:this.props.record
    }
  }

  focusTextInput() {
    let ceo=this.state.record.ceoID;
    let scoreTeacher = this.textInput.current.value;
    console.log(ceo);
    let res = putScore(ceo, scoreTeacher);
    res.then(
      (result) => { 
        console.log(result);
        message.success('修改成功！');
        
        
      },
      (err) => { 
        console.log(err);
        message.error('修改失败！');
        }
      )
    
  }

  handleInput(e) { 
    let value = e.target.value;
    this.setState({
      inputValue:value
    })
  }
  render() {
    return (
      <div className="Inp-Sco-div">
        <input
          className='InpSco'
          type="text"
          ref={this.textInput}
          value={this.state.inputValue}
          onChange={this.handleInput}
        />
        <input
          className='InpBut'
          type="button"
          value="保存"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}

export default ComInfo;