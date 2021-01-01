import React from 'react'
import { Table, Button, notification, Space, message, Select, Input } from "antd"
import { showAll, setNosign, search } from '../../../until/api/teacherApi'
import '../../../static/style/teacherStyle.scss'
const { Search } = Input
const { Option } = Select;
class SignedCom extends React.Component {
  constructor(props) {
    localStorage.setItem("signKey", JSON.stringify({ key: 1, route: '/Teacher/Sign/Signed' }))
    super(props)
    this.state = {
      searchOrNot: false,
      select: "id",
      value: "",
      teachclass: localStorage.getItem("teachclass"),
      late: "迟到",
      drop: "旷课",
      data: [],
      loading: true,
      pagination: {
        showQuickJumper: true,
        showSizeChanger: false,
        pageSize: 7,
        current: 1,
        total: "",
        hideOnSinglePage: true,
        onChange: (page, pageSize) => {
          if (this.state.searchOrNot === false)
            this.changePage(page);
          else this.changePageSearch(this.state.value, page)
          this.state.pagination.current = page
        }
      },
      columns: [
        {
          title: '名字',
          dataIndex: 'name',

        },
        {
          title: '学号',
          dataIndex: 'id',

        },
        {
          title: '专业',
          dataIndex: 'major'
        },
        {
          title: '班级',
          dataIndex: 'class'
        },
        {
          title: '操作',
          dataIndex: 'agree',
          render: (text, record, index) => {


            return (
              <Space size="middle">
                <Button size="small" disabled={record.agree.read} type="primary" ghost onClick={() => { this.beLate(record, index) }}>{record.agree.late}</Button>
                <Button size="small" disabled={record.agree.read} type="primary" ghost onClick={() => { this.dropClass(record, index) }}>{record.agree.drop}</Button>
              </Space>
            )

          },
        },
      ]
    }
  }
  render() {
    return (
      <div className='sign'>
        <div style={{ margin: '10px 0 2px 0' }}>
          <Select defaultValue="id" className="select"
            style={{ width: 100 }}
            onSelect={(value) => { this.changeSelect(value) }} >
            {/* <Option value="name">学生姓名</Option> */}
            <Option value="id">学生学号</Option>
          </Select>
          <Search
            placeholder="请输入搜索信息"
            // loading='true'
            enterButton="搜索"
            style={{ width: 200, marginBottom: 10 }}
            onSearch={() => { this.search() }}
            onChange={(e) => { this.inputChange(e) }}
            value={this.state.value}
          ></Search>
        </div>
        <Table style={{minHeight:'300px'}}
          pagination={this.state.pagination}
          columns={this.state.columns}
          loading={this.state.loading}
          rowSelection={this.state.rowSelect}
          dataSource={this.state.data}
          rowKey={record => record.id} />
      </div>
    )
  }
  componentDidMount() {
    this.changePage(1);
  }
  setData = (res) => {

  }
  changePage = (page) => {
    showAll(this.state.teachclass, page).then((res) => {
      let lists = [];
      this.setState({ loading: false, searchOrNot: false });
      if (res.data !== null) {
        let rs = JSON.parse(res.data);
        for (let i = 0; i < rs.length; i++) {
          lists.push({
            "name": rs[i].userName,
            "id": rs[i].studentId,
            "major": rs[i].academy,
            "class": rs[i].cls,
            "agree": {
              read: false,
              late: '迟到',
              drop: '旷课'
            }
          })
        }
        if (rs.length !== 0) {
          let pagination = { ...this.state.pagination };
          pagination.total = rs[0].page
          this.setState({ data: lists, pagination: pagination });
        }
      }else{
        message.warning('没有学生！')
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
  changePageSearch = (value, page) => {
    this.setState({
      loading:true
    })
    search(this.state.teachclass, value, page).then((res) => {
      let lists = [];
      this.setState({ loading: false, searchOrNot: true });
      if (res.data.data !== null) {
        let rs = res.data.data
        for (let i = 0; i < rs.length; i++) {
          lists.push({
            "name": rs[i].userName,
            "id": rs[i].userId,
            "major": rs[i].academy,
            "class": rs[i].cls,
            "agree": {
              read: false,
              late: '迟到',
              drop: '旷课'
            }
          })
        }
        let pagination = { ...this.state.pagination };
        pagination.total = res.data.page
        this.setState({ data: lists, pagination: pagination });
      } else {
        message.error('没有这个人!')
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
      this.changePageSearch(this.state.value, "1")
    } else if (this.state.select == "name") {
      // console.log('name');

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
  beLate = (record, index) => {
    setNosign(this.state.teachclass, record.id, 10, 1).then(rs => {
      let res = rs.data;
      if (res.flag == true) {
        
        let data = this.state.data;
        data[index].agree.read = true;
        data[index].agree.late = '已迟到';
        this.setState(
          {
            data,
          }
        )
      } else {
        message.error(`设置失败（${res.message}）!`)
      }
    })
  }
  dropClass = (record, index) => {
    setNosign(this.state.teachclass, record.id, 10, 2).then(rs => {
      let res = rs.data
      if (res.flag == true) {
        let data = this.state.data;
        data[index].agree.read = true;
        data[index].agree.drop = '已旷课';
        this.setState(
          {
            data,
          }
        )
      } else {
        message.error(`设置失败（${res.message}）!`);
      }
    })
  }
}
export default SignedCom;