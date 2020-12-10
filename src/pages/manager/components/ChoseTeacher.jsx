import React, { Component, Fragment } from 'react'
import { Table, Button, Space} from 'antd'
import ManagerApi from '../../../until/api/ManagerApi'

const dataSource = [
  {
    key:"1",
    discipline: "工商管理系",
    userId: "tiansh",
    userName: "田帅辉",
  },
  {
    key:"2",
    discipline: "工商管理系",
    userId: "lihd",
    userName: "李怀东"
  },
  {
    key: '3',
    discipline: "",
    userId: "longwei",
    userName: "龙伟"
  },
  {
    key: '4',
    discipline: "工商管理系",
    userId: "shitao",
    userName: "施涛"
  }
];

class ChoseTeacher extends Component{
    constructor(props){
        super(props);
        this.state = {
            columns: [
                {
                    title: '姓名',
                    dataIndex: 'userName',
                    key: 'userName',
                    align: "center",
                    width: "30%"
                },
                {
                    title: '系别',
                    dataIndex: 'discipline',
                    key: 'discipline',
                    align: "center",
                    width: "40%"
                },
                {
                    title: '操作',
                    key: 'action',
                    dataIndex:"uesrId",
                    align:'center',
                    render: (text, record) => (
                        <Space size="middle">
                            <Button type="primary" ghost onClick={() => {this.handleClick(text,record)}}>进入该班级</Button>
                        </Space>
                    )
                }
            ],
            dataSource:[]
        }
        this.handleClick = this.handleClick.bind(this);
        this.changePage = this.changePage.bind(this);
    }
    render() {
        return(
            <Fragment>
                <Table 
                    dataSource={this.state.dataSource} 
                    columns={this.state.columns}  
                    style = {{marginTop:'10px'}}
                    rowKey={record => record.userId}
                />
            </Fragment>
        )
    }

    handleClick = (text,record) => {
        console.log(record.userId);
        this.props.changeComponent(true);
        this.props.getTeacherId(record.userId,record.userName);
    }

    componentDidMount (){
        this.changePage(1);
    }
    changePage = (currentPage) => {
       ManagerApi.showTeacher(currentPage).then(
            (res) => {
                let list = JSON.parse(res.data);
                this.setState({
                    dataSource: list
                })
                console.log(JSON.parse(res.data));
            },
            (err) => {
                console.log(err);
            }
        )
    }
}

export default ChoseTeacher;