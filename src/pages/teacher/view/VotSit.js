import React, { Component } from 'react'
import { Table, Space,Input,Button, Pagination } from 'antd'; 
import { AudioOutlined } from '@ant-design/icons';
import '../style/VoSit.css';
import {showCeo, runCeo, closeCeo} from '../../../until/api/teacherApi';

//table的静态内容





//input框
const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

const onSearch = value => console.log(value);

class VotSit extends Component { 
    constructor(props) { 
        super(props);
        this.state = {
          btuValue: '开启投票',
          isVote: true,
          startCeo:'任命为CEO',
          isCeo:false,
          pagination:{
            
          },
          columns:[
            {        
              title: '学号',
              dataIndex: 'studentid',
              key: 'studentid',
              align:'center'
            },
            {
              title: '姓名',
              dataIndex: 'name',
              key: 'name',
              align:'center'
            },
            {
              title: '教学班',
              dataIndex: 'teachclass',
              key: 'teachclass',
              align:'center'
            },
            {
              title: '操作',
              key: 'action',
              align:'center',
              render: (text, record) => (
                <Space size="middle">
                  <Button type="primary" ghost onClick={() => {this.handleDecideCeo(text,record)}}>{record.action}</Button>
                </Space>
              ),
            },
          ],
          dataSource:[
            {
              key: '1',
              studentid: '胡彦斌',
              name: 32,
              teachclass: '西湖区湖底公园1号',
              action:'任命为CEO'
            },
            {
              key: '2',
              studentid: '胡彦祖',
              name: 42,
              teachclass: '西湖区湖底公园1号',
              action:'任命为CEO'
            },
          ]
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleDecideCeo = this.handleDecideCeo.bind(this);
    }
 
    render() { 
        return (
            <div>
                <span className="title">投票情况</span>
                <span>
                  <Search
                    style={{width:'25%',marginLeft:'53%'}}
                  placeholder="请输入教学班号"
                  allowClear
                  enterButton="搜索"
                  size="samll"
                  onSearch={onSearch}
                  />
                  <Button 
                    type="primary" 
                    size="middle"
                    style={{marginLeft:"20px"}}
                    onClick={this.handleChange}
                  >{this.state.btuValue}</Button>
                </span>
                
                <Table 
                  dataSource={this.state.dataSource} 
                  columns={this.state.columns} 
                  style={{marginTop:"10px"}}
                  pagination={this.state.pagination}
                />;
            </div>
        );
    }

    componentDidMount () {
      //展示竞选ceo的同学以及其的票数
      showCeo("1","SJ00201A2031780003").then(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      )
    }

    //开启投票\关闭投票
    handleChange = () => {
      if(this.state.isVote){
        this.setState({
           btuValue:"关闭投票",
           isVote:!this.state.isVote
        })
        closeCeo("SJ00201A2031780003").then(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      )
      }else{
        this.setState({
          btuValue:"开启投票",
          isVote:!this.state.isVote
        })
        closeCeo("SJ00201A2031780003").then(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
        )
      }
    }
    
    //任命为CEO
    handleDecideCeo = (text,record) => {
      record.action = "取消CEO"
      //dsa
      this.setState({
        dataSource: this.state.dataSource
      })

      
      console.log(record);
    }
}
export default VotSit;