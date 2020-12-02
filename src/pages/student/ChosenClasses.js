import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Table, Tag, Space,pagination } from 'antd';
import actions from '../../redux/actionCreators/creators'
import changePage from '../../until/changePage'
const columns = [
    {
      title: 'companyID',
      dataIndex: 'companyID',
      key: 'companyID',
    },
    {
      title: 'type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'companyName',
      dataIndex: 'companyName',
      key: 'companyName',
    },
    {
      title: 'ceoName',
      key: 'ceoName',
      dataIndex: 'ceoName',

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
              ],
         }
         this.onPageChange=this.onPageChange.bind(this)
    }
    componentWillMount(){
      if(localStorage.getItem("userId")){
        this.props.getAllCompanies(localStorage.getItem("userId"),parseInt(sessionStorage.getItem("Page1"))||'1')
      }
    }
    componentWillUpdate(newProps){
      if(newProps!==this.props&&newProps.isgetAllCompanies===true&&newProps.isgetAllCompanies!==undefined){
        const {payload} = newProps
        try{
        let newdata = payload.data.object
        for (let item in newdata){
          newdata[item].key = item
        }
        this.setState({
          currentPage: parseInt(sessionStorage.getItem("Page1"))||'1',
          data:newdata
        })
      }
      catch{
        console.log("error")
      }
      }
    }
    componentDidMount() {
      //如果要获取数据，最好在这里进行，组件在render之前不会返回数据

      
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


        changePage(1,page)
    }
    render() { 
  //     if(this.props.payload.data!==undefined){
  //     let newdata = this.props.payload.data.object
  //     this.setState({
  //       currentPage: parseInt(sessionStorage.getItem("Page1"))||'1',
  //       data:newdata
  //   })
  // }
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
  return state
}

export default connect(mapStateToProps, mapDispatchToProps)(ChosenClasses)