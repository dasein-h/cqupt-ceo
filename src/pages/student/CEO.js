import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Table, Tag, Space,pagination, message, Button, Empty } from 'antd';
import actions from '../../redux/actionCreators/creators'
import changePage from '../../until/changePage'
import '../../static/style/style.scss'
// const columns = [
//     {
//       title: 'count',
//       dataIndex: 'count',
//       key: 'count',
//     },
//     {
//       title: 'type',
//       dataIndex: 'type',
//       key: 'type',
//     },
//     {
//       title: 'companyName',
//       dataIndex: 'companyName',
//       key: 'companyName',
//     },
//     {
//       title: 'ceoName',
//       key: 'ceoName',
//       dataIndex: 'ceoName',

//     },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (text, record) => (
//         <Space size="middle">
//           <a>Invite {record.name}</a>
//           <a>Delete</a>
//         </Space>
//       ),
//     },
//   ];

class CEO extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            totalNum:0,
            currentPage:parseInt(sessionStorage.getItem("Page2"))||1,
            data : [
              ],
         }
         this.onPageChange=this.onPageChange.bind(this)
    }

    UNSAFE_componentWillUpdate(newProps,newState){
      if(newProps!==this.props){
        try{
          if(newProps.message){
            if(newProps.isVoteForCeo === true || newProps.isRunCeo === true ){
              message.success(newProps.message)
            }
            else if(newProps.isVoteForCeo === false || newProps.isRunCeo === false ){
              message.error(newProps.message)
            }
          }
          const {CeoData} = newProps
          let newdata = CeoData.object
          for (let item in newdata){
            newdata[item].key = item
          }
          this.setState({
            currentPage: parseInt(sessionStorage.getItem("Page2"))||1,
            data:newdata,
            totalNum:CeoData.totalNumber
          })
        
        }
        catch{
          console.log("error")
        }
      }
    }
    componentDidMount() {
      //如果要获取数据，最好在这里进行，组件在render之前不会返回数据
      if(localStorage.getItem("userId") && !this.props.CeoData){
        this.props.ShowCeo(parseInt(sessionStorage.getItem("Page2"))||1,localStorage.getItem("userId"))
      }
      if(this.props.CeoData){
        this.props.Exist()
      }
    }
    shouldComponentUpdate(nextProps, nextState) {
      if (nextProps !== this.props || nextState!== this.state) {
        return true
      }
      else {
        return false
      }
    }
    
    onPageChange (page,pageSize) {
      if (localStorage.getItem("userId")){
        this.props.ShowCeo(page,localStorage.getItem("userId"))
      }
        // let newdata = this.state.data.object
        this.setState({
            currentPage: page,
            // data:newdata
        })
        changePage(2,page)
    }
    render() { 

      const columns = [
        {
            title: 'count',
            dataIndex: 'count',
            key: 'count',
        },
          {
            title: 'userName',
            dataIndex: 'userName',
            key: 'userName',
          },
        {
            title: 'studentId',
            dataIndex: 'studentId',
            key: 'studentId',
        },
        {
            title: 'state',
            key: 'state',
            dataIndex: 'state',
        render: (text) => {
            if(text===1){
                return(<p>已成为CEO</p>)
            }            
            if(text===0){
                return(<p>未成为CEO</p>)
            }
    },
        },

        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
              <a onClick={this.props.VoteForCeo.bind(this,record.studentId,localStorage.getItem("userId"))}>为{record.userName}投票</a>
            </Space>
          ),
        },
      ]
      const pagination = {
        pageSize: 8,
        total:this.state.totalNum,
        onChange:this.onPageChange,
        current:this.state.currentPage,
    }
    if (localStorage.getItem("userId")){
        return ( 
            <div className="table_div">
            <Button type="primary" className="RunCeo" onClick={this.props.RunCeo}>成为CEO</Button>
            <Table columns={columns} dataSource={this.state.data} pagination={pagination}/>
            </div>
             )
        }
        else{
          return ( 
            <div className="table_div">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}>请登录后查看</Empty>
            </div>
             )
        }
    } 
}
 
const mapDispatchToProps = (dispatch) => {
  //把发送action的方法绑定到当前组件的props
  return {
    ShowCeo: (page,studentId) => {
        dispatch(actions.ShowCeo(page,studentId))
    },
    VoteForCeo: (ceoId,studentId) => {
        dispatch(actions.VoteForCeo(ceoId,studentId))
    },
    RunCeo: () => {
      dispatch(actions.RunCeo())
    },
    Exist: () => {
      dispatch(actions.Exist())
    },
  }
}
const mapStateToProps = state => {
  //把store里的state绑定到当前组件的props
  return state
}

export default connect(mapStateToProps, mapDispatchToProps)(CEO)