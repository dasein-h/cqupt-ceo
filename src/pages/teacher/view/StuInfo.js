import React, { Component} from 'react'
import { Button,Table, notification,message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { showAll,downLoadStudent} from '../../../until/api/teacherApi'
import '../../../static/style/teacherStyle.scss'
import axios from 'axios'
// const { Search } = Input
// const { Option } = Select;
// 定义表格的行
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    // width:"10%"
  },
  {
    title: '学号',
    dataIndex: 'id',
    // width:"12%"
  },
  {
    title: '专业',
    dataIndex: 'major',
    // width:"20%"

  },
  {
    title: '公司',
    dataIndex: 'company',
    // width:"20%"
  },
  {
    title: '总分',
    dataIndex: 'score',
  },
  // {
  //   title: '操作',
  //   dataIndex: 'email',
  // }
];

class StuInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teachclass:sessionStorage.getItem("teachclass"),
      select: "name",
      value: "",
      data: [],
      pagination: {
        showQuickJumper:true,
        showSizeChanger:false,
        defaultCurrent:1,
        current: 1,
        pageSize: 7,
        total:"",
        hideOnSinglePage: true,
        onChange: (page, pageSize) => {
          this.changePage(page);
          this.state.pagination.current = page
        }
      },
      loading: true,
      btnLoad:false
    };
  }
  componentDidMount(){
    this.changePage(1)
  }

  render() {
    return (
      <div id="StuInfo">
        <div className='header'>
          <div className='left'>
            <p className='title'>学生信息</p>
            {/* <Select defaultValue="name" className="select"
              style={{ width: 100 }}
              onSelect={(value) => { this.changeSelect(value) }} >
              <Option value="name">学生姓名</Option>
              <Option value="id">学生学号</Option>
            </Select>
            <Search
              placeholder="请输入搜索信息"
              // loading='true'
              enterButton="搜索"
              style={{ width: 200, marginBottom: 10 }}
              onSearch={() => {this.search()}}
              onChange={(e) => { this.inputChange(e) }}
              value={this.state.value}
            ></Search> */}
          </div>
          <div className="right">
            <Button type="primary" loading={this.state.btnLoad} shape="round" icon={<DownloadOutlined />} size='middle' onClick={() => {this.downLoad()}}>导出Excel表</Button>
          </div>
        </div>
        <div>
          <Table
          style={{minHeight:'350px'}}
          columns={columns}
          rowKey={record => record.id}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          />
        </div>
      </div>
    );
  }
  changePage = (page) => {
    let lists = [];
    showAll(this.state.teachclass,page).then((res) => {
      this.setState({loading:false});
      let rs = JSON.parse(res.data);
      let companyName
      for (let i = 0; i < rs.length; i++){
        if(rs[i].companyName === undefined|| rs[i].companyName === null||rs[i].companyName === 'null')
          companyName = "无"
        else companyName = rs[i].companyName
        lists.push({
          "name":rs[i].userName,
          "id":rs[i].studentId,
          "major":rs[i].academy,
          "company":companyName,
          "score":rs[i].personalScore
        })
      }
      if(rs.length!==0){
        let pagination = {...this.state.pagination};
        pagination.total = rs[0].page
        this.setState({ data:lists,pagination:pagination });
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
  changeSelect = (value) => {
    this.setState({
      select: value
    })
  }
  downLoad = () => {
    this.setState({
      btnLoad:true
    })
    let param = new FormData();
param.append('teachclass',this.state.teachclass)
    downLoadStudent(param).then(res => {
  const xlsx = 'application/vnd.ms-excel'
  const blob = new Blob([res.data], { type: xlsx })
  const a = document.createElement('a') // 转换完成，创建一个a标签用于下载
  a.download = `学生成绩表.xlsx`
  a.href = window.URL.createObjectURL(blob)
  a.click()
  a.remove()
  this.setState({
    btnLoad:false
  })
 }).catch(err => {
   message.error('导出错误!')
 })
}}


export default StuInfo


