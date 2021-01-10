import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Table,  Space,   message, Button, Empty } from 'antd';
import actions from '../../redux/actionCreators/creators'
import changePage from '../../until/changePage'
import '../../static/style/style.scss'
class CEO extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            totalNum:0,
            currentPage:parseInt(sessionStorage.getItem("Page2"))||1,
            loading:true,
            b_loading:false,
            data : [
              ],
         }
         this.onPageChange=this.onPageChange.bind(this)
    }

    UNSAFE_componentWillUpdate(newProps,newState){
      if(newProps!==this.props){
        try{
          if(newProps.isShowCeo===true){
            this.setState({
              loading:false
            })
          }
          else if(newProps.isShowCeo===false){
            this.setState({
              loading:false
            })
          }
          if( newProps.isVoteForCeo === true ){
            message.success("投票成功")
            this.props.ShowCeo(parseInt(sessionStorage.getItem("Page2"))||1,sessionStorage.getItem("userId"))
            this.setState({
              loading:true
            })
          }
          if( newProps.isCancelVoteCeo === true ){
            message.success("取消成功")
            this.props.ShowCeo(parseInt(sessionStorage.getItem("Page2"))||1,sessionStorage.getItem("userId"))
            this.setState({
              loading:true
            })
          }
          else if( newProps.isCancelVoteCeo === false ){
            message.error("取消失败")
          }
          if( newProps.message ){
            if( newProps.isRunCeo === true ){
              message.success(newProps.message)
              this.props.ShowCeo(parseInt(sessionStorage.getItem("Page2"))||1,sessionStorage.getItem("userId"))
              this.setState({
                b_loading:false,
                loading:true,
              })
            }
            else if(newProps.isVoteForCeo === false || newProps.isRunCeo === false || newProps.isCancelVoteCeo === false ){
              message.error(newProps.message)
              this.setState({
                b_loading:false,
              })
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
            totalNum:CeoData.totalNumber,
          })
        
        }
        catch{}
      }
    }
    componentDidMount() {
      if(sessionStorage.getItem("userId") && !this.props.CeoData){
        this.props.ShowCeo(parseInt(sessionStorage.getItem("Page2"))||1,sessionStorage.getItem("userId"))
      }
      if(this.props.CeoData){
        this.props.Exist()
        this.setState({
          loading:false
        })
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
      if (sessionStorage.getItem("userId")){
        this.props.ShowCeo(page,sessionStorage.getItem("userId"))
      }
        // let newdata = this.state.data.object
        this.setState({
            currentPage: page,
            loading:true,
            // data:newdata
        })
        changePage(2,page)
    }
    render() { 

      const columns = [
        {
            title: '票数',
            dataIndex: 'count',
            key: 'count',
        },
          {
            title: '姓名',
            dataIndex: 'userName',
            key: 'userName',
          },
        {
            title: '学号',
            dataIndex: 'studentId',
            key: 'studentId',
        },
        {
            title: '状态',
            key: 'state',
            dataIndex: 'state',
        render: (text,record) => {
          if(text===1 && record.studentId === sessionStorage.getItem("userId")){
            sessionStorage.setItem("ceo",'1')
            window.location.reload()
        }    
            if(text===1 && record.studentId !== sessionStorage.getItem("userId")){
                return(<p>已成为CEO</p>)
            }           
            if(text===0){
                return(<p>未成为CEO</p>)
            }
    },
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record) => {
            if(!record.votedOrNot)
            return(
            <Space size="middle">
              <a onClick={this.props.VoteForCeo.bind(this,record.studentId,sessionStorage.getItem("userId"))}>投票</a>
            </Space>
          )
          else{
            return(
            <Space size="middle">
            <a onClick={this.props.CancelVoteCeo.bind(this,sessionStorage.getItem("userId"),record.studentId)}>取消投票</a>
          </Space>
            )
          }
        },
        },
      ]
      const pagination = {
        pageSize: 7,
        total:this.state.totalNum,
        onChange:this.onPageChange,
        current:this.state.currentPage,
        hideOnSinglePage:true,
    }
    if (sessionStorage.getItem("userId")){
        return ( 
            <div className="table_div">
            <Button type="primary" className="RunCeo" onClick={this.props.RunCeo.bind(this,this)} loading={this.state.b_loading}>竞选CEO</Button>
            <Table columns={columns} dataSource={this.state.data} pagination={pagination} loading={this.state.loading}/>
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
  return {
    ShowCeo: (page,studentId) => {
        dispatch(actions.ShowCeo(page,studentId))
    },
    VoteForCeo: (ceoId,studentId) => {
        dispatch(actions.VoteForCeo(ceoId,studentId))
    },
    RunCeo: (that) => {
      dispatch(actions.RunCeo())
      that.setState({
        b_loading:true
      })
    },
    CancelVoteCeo: (studentId,ceoId) => {
      dispatch(actions.CancelVoteCeo(studentId,ceoId))
    },
    Exist: () => {
      dispatch(actions.Exist())
    },
  }
}
const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps, mapDispatchToProps)(CEO)