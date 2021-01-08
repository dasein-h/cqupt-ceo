import React from 'react'
import { changeCompanyName, agreeChange, rejectChange } from '../../../until/api/teacherApi'
import { Table, Space, Button, notification,message} from 'antd'
import '../../../static/style/teacherStyle.scss'
// const { Search } = Input
// const { Option } = Select;
class newLists extends React.Component {
    constructor(...props) {
        localStorage.setItem("newsKey",JSON.stringify({key:1,route:'/Teacher/News/Name'}))
      super(...props)
      this.state = {
        teachclass: localStorage.getItem("teachclass"),
        select: "name",
        value: "",
        loading: true,
        data: [],
        pagination: {
          showSizeChanger: false,
          pageSize: 7,
          current: 1,
          total: "",
          hideOnSinglePage: true,
          onChange: (page, pageSize) => {
            this.changePage(page);
            this.state.pagination.current = page
          }
        },
        columns: [
          {
            title: '申请人姓名',
            dataIndex: 'name',
          },
          {
            title: '申请人学号',
            dataIndex: 'id'
          },
          {
            title: '原公司名',
            dataIndex: 'message',
          },
          {
            title: '修改后公司名',
            dataIndex: 'error',
          },
          {
            title: '操作',
            dataIndex: 'agree',
            align:'center',
            render: (text, record, index) => (
              <Space size="middle">
                <Button size="small" type="primary" ghost onClick={() => { this.clickAgree(text, record, index) }}>同意</Button>
                <Button size="small" danger="true" onClick={() => { this.clickReject(text, record, index) }}>拒绝</Button>
              </Space>
            ),
          },
        ],
  
      }
    }
    render() {
      return (
        <div id="news">
          <div >
            {/* <p  className='title'>消息</p> */}
            {/* <Select defaultValue="name" style={{ width: 100 }} >
              <Option value="name">学生姓名</Option>
              <Option value="id">学生学号</Option>
            </Select>
            <Search
              placeholder="请输入搜索信息"
              enterButton="搜索"
              style={{ width: 200, marginBottom: 10 }}
              onChange={(e) => { this.inputChange(e) }}
              value={this.state.value}
            ></Search> */}
          </div>
          <div className="header" style={{minHeight:'350px'}}>
            <Table
              columns={this.state.columns}
              dataSource={this.state.data}
              pagination={this.state.pagination}
              loading={this.state.loading}
              rowKey="index"
            />
          </div>
        </div>
      )
  
    }
    clickAgree = (text, record, index) => {
      // let newData = [...this.state.data];
      // let pagination = {...this.state.pagination};
      // pagination.total = pagination.total-1;
      // newData.splice((this.state.pagination.current-1)*this.state.pagination.pageSize+index,1);
      // this.setState({
      //   data:newData,
      //   pagination:pagination
      // })
  
      //直接用 this.state.pagination.current 调用数据？
      // console.log(store.getState());
      agreeChange(record.id, record.error,localStorage.teachclass).then((rs) => {
        let res = rs.data;
        if (res.flag === true) {
          this.changePage(this.state.pagination.current)
          message.success( '同意改名成功!');
        } else {
          message.error( '同意改名失败!');
        }
      })
  
    }
    clickReject = (text, record, index) => {
      rejectChange(record.id, record.error,this.state.teachclass).then((rs) => {
        let res = rs.data;
        if (res.flag === true) {
          this.changePage(this.state.pagination.current)
          message.success( '拒绝改名成功!');
        } else {
          message.error( '拒绝改名失败!');
        }
      })
      
    }
    componentDidMount() {
      this.changePage(1)
    }
    changePage = (page, news) => {
      let lists = [];
      let newPage = page;
      // if(page===0){
      //   newPage = 1;
      // }
      changeCompanyName(this.state.teachclass, newPage, "1").then(
        res => {
          if(!res.data.flag && res.data.message === "没有登录，请先登录"){
            localStorage.clear();
            this.props.history.push('/Student/AllCompanies/ChosenClasses');
          }
          this.setState({ loading: false })
          let rs = JSON.parse(res.data);
          if (rs.length === 0) {
            let pagination = this.state.pagination;
            if(pagination.current !== 1){
              pagination.current -= 1;
              pagination.total -= 1;
              this.changePage(pagination.current)
              this.setState({
                pagination
              })
            }else{
              message.info('暂无数据!')
              pagination.total = 0;
              this.setState({
                data: [],
                pagination
              })
            }
           
          } else {
            for (let i = 0; i < rs.length; i++) {
              lists.push({
                "message": rs[i].message,
                "error": rs[i].error,
                "name": rs[i].data.userName,
                "id": rs[i].data.userId,
                "index": i
              })
            }
            let pagination = { ...this.state.pagination };
            pagination.total = rs[0].page
            this.setState({ data: lists, pagination: pagination });
          }
  
        }).catch(err => {
          this.setState({ loading: false })
          notification.warning({
            message: '警告',
            placement: "bottomRight",
            description:
              '请求超时或服务器异常,请检查网络或联系管理员!',
          });
        })
    }
    search = () => {
      if (this.state.select === "id") {
  
      } else if (this.state.select === "name") {
  
      }
      //根据value调用接口 搜索 改变data的值
    }
    inputChange = (e) => {
      this.setState({
        value: e.target.value
      })
    }
  }
  export default newLists