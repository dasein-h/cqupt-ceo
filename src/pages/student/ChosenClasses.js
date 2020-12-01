import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Table, Tag, Space,pagination } from 'antd';
import actions from '../../redux/actionCreators/creators'
import changePage from '../../until/changePage'
const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
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
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

class ChosenClasses extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            totalNum:30,
            currentPage:parseInt(sessionStorage.getItem("Page1"))||"1",
            data : [
              ]
         }
         this.onPageChange=this.onPageChange.bind(this)
    }
    componentDidMount() {
      //如果要获取数据，最好在这里进行，组件在render之前不会返回数据
      if(localStorage.getItem("userId")){
      this.props.getAllCompanies(localStorage.getItem("userId"),parseInt(sessionStorage.getItem("Page1"))||'1')
      let newdata = this.state.data.object
      this.setState({
          currentPage: parseInt(sessionStorage.getItem("Page1"))||'1',
          data:newdata
      })
    }
    }
    shouldComponentUpdate(nextProps, nextState){
        if(this.state!==nextState||this.props!==nextProps){
            return true
        }
        else {
          return false
        }
    }
    onPageChange (page,pageSize) {
        this.props.getAllCompanies(localStorage.getItem("userId"),page)
        // let newdata = this.state.data.object
        this.setState({
            currentPage: page,
            // data:newdata
        })
        console.log(this.state.data)
        changePage(1,page)
        console.log("设置"+sessionStorage.getItem("Page1"))
    }
    render() { 
        console.log(this.state.data)
        const pagination = {
            pageSize: 8,
            total:this.state.totalNum,
            onChange:this.onPageChange,
            current:this.state.currentPage,
        }
        return ( 
            <Table columns={columns} dataSource={this.state.data} pagination={pagination}/>
             );
    } 
}
 
const mapDispatchToProps = (dispatch) => {
  //把发送action的方法绑定到当前组件的props
  return {
    getAllCompanies: (userId, page) => {
      dispatch(actions.getAllCompanies(userId,page))
    },
  }
}
const mapStateToProps = state => {
  //把store里的state绑定到当前组件的props
  console.log("ChonsenClasses", state)
  return state
}

export default connect(mapStateToProps, mapDispatchToProps)(ChosenClasses)