import React, { Component, Fragment } from 'react'
import { Table, Button, Space,notification,Input} from 'antd'
import ManagerApi from '../../../until/api/managerApi'
import {Link} from "react-router-dom";

const { Search } = Input;

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
                           <Button type="primary" ghost onClick={() => {this.handleClick(text,record)}}>
                                进入该班级
                            </Button>
                        </Space>
                    )
                }
            ],
            dataSource:[],
            teacherId:'',
            teacherName:'',
            loading:true,
            pagination:{
                showSizeChanger:false,
                defaultCurrent:1,
                current: 1,
                pageSize: 7,
                total:'',
                hideOnSinglePage: true,
                onChange: (page, pageSize) => {
                    this.changePage(page);
                    this.state.pagination.current = page
                }
            }
        }
        this.handleClick = this.handleClick.bind(this);
        this.changePage = this.changePage.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }
    render() {
        return(
            <Fragment>
                <span className="Nav-top">选择老师</span>
                <Search
                    placeholder="请输入老师名字"
                    enterButton
                    size="middle"
                    style={{width:"210px",float:"right"}}
                    maxLength = {6}               
                    onSearch={(value) => {this.onSearch(value)}}                    
                />                                                           
                <Table 
                    dataSource={this.state.dataSource} 
                    columns={this.state.columns}  
                    style = {{marginTop:'10px',minHeight:"370px"}}
                    pagination={this.state.pagination}
                    rowKey={record => record.userId}
                    loading={this.state.loading}
                />
            </Fragment>
        )
    }

    handleClick = (text,record) => {
        sessionStorage.setItem('teachclass',record.userId);
        sessionStorage.setItem('teachName',record.userName);
        this.setState({
        },()=>{
            this.props.history.push({
            pathname: '/Manager/ChoseClass/MenuClass',
            });
        })
        
    }

    componentDidMount (){
        this.changePage(1);
    }
    changePage = (currentPage) => {
        this.setState({
            loading:true
        })
       ManagerApi.showTeacher(currentPage).then(
            (res) => {
                let list = JSON.parse(res.data);
                if(list.length !== 0){
                    let pagination = {...this.state.pagination};
                    pagination.total = list[0].count;
                    pagination.onChange = (page, pageSize) => {
                        this.changePage(page);
                        this.state.pagination.current = page
                    }
                    this.setState({
                        loading:false,
                        dataSource: list,
                        pagination
                    })
                }
            },
            (err) => {
                this.setState({ loading: false })
                notification.open({
                    message: '警告',
                    placement: "bottomRight",
                    description:
                    '请求超时或服务器异常,请检查网络或联系管理员!',
                });
            }
        )
    }

    onSearch = (value) => {
        if(value === ""){
            this.changePage(1);
        }else{
            this.changeSeacherPage(value,1);
        }
    }

    changeSeacherPage = (value,currentPage) => {
        this.setState({
            loading:true
        })
        ManagerApi.searchTeacher(value,currentPage).then(
            (res) => {
                if(res.request.status === 200 && res.request.readyState === 4){
                    let pagination = {...this.state.pagination};
                    pagination.total = res.data.page; 
                    if(currentPage === 1){
                        pagination.current = 1;
                    }
                    pagination.onChange = (page, pageSize) => {
                        this.changeSeacherPage(value,page);
                        this.state.pagination.current = page
                    }
                    this.setState({
                        loading:false,
                        dataSource:res.data.data,
                        pagination
                    })
                }
                
            },(err) => {
            }
        )
    }
}

export default ChoseTeacher;