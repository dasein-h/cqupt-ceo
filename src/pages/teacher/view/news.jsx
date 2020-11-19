import React from 'react'
import { changeCompanyName, agreeChange, rejectChange } from '../../../until/api/teacherApi'
import { Table, Space, Button, notification } from 'antd'
import store from '../../../redux/store'
let click = (text,record,index) => {
  console.log(record);//这是这一行的数据
  // console.log(store.getState());
  agreeChange("2017210952")
}
const columns = [
  {
    title: '名字',
    dataIndex: 'name',
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
    render: (text, record, index) => (
      <Space size="middle">
        <Button size="small" type="primary" ghost onClick={() => { click(text,record,index) }}>同意</Button>
        <Button size="small" danger="true">拒绝</Button>
      </Space>
    ),
  },
];
class newLists extends React.Component {
  constructor(...props) {
    super(...props)
    this.state = {
      loading: true,
      data: [],
      pagination: {
        pageSize: 2,
        current: 1,
        total: 5,
        hideOnSinglePage: true,
        onChange: (page, pageSize) => {
          this.state.pagination.current = page
          console.log(this.state.pagination.current);
        }
      }
    }
  }
  render() {
    console.log(this.state);
    return (
      <div id="news">
        <div className="header">
          <Table
            columns={columns}
            dataSource={this.state.data}
            pagination={this.state.pagination}
            loading={this.state.loading}
            rowKey="name"
          />
        </div>
      </div>
    )

  }
  componentDidMount() {
    this.setState({
      data:[{
        name:1,
        message:1,
        error:1
      },
      {
        name:2,
        message:1,
        error:1
      },{
        name:3,
        message:1,
        error:1
      },{
        name:4,
        message:1,
        error:1
      },{
        name:5,
        message:1,
        error:1
      }],
      loading:false,
    })

    // let lists;
    // changeCompanyName('tiansh', "1", "1").then(
    //   res => {
    //     lists = JSON.parse(res.data)
    //     console.log(lists);
    //     this.setState({ data: lists });
    //     this.setState({ loading: false })
    //   }).catch(err => {
    //     console.log(err)
    //     this.setState({ loading: false })
    //     notification.open({
    //       message: '警告',
    //       placement: "bottomRight",
    //       description:
    //         '请求超时或服务器异常,请检查网络或联系管理员!',
    //       onClick: () => {
    //         console.log('Notification Clicked!');
    //       },
    //     });
    //   })
  }
}
export default newLists


