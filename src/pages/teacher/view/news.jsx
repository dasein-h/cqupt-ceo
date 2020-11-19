import React from 'react'
import { changeCompanyName, agreeChange, rejectChange } from '../../../until/api/teacherApi'
import { Table, Space, Button, notification } from 'antd'
import store from '../../../redux/store'
class newLists extends React.Component {
  constructor(...props) {
    super(...props)
    this.state = {
      name:"lovia",
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
      },
      columns:[
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
              <Button size="small" type="primary" ghost onClick={() => { this.clickAgree(text,record,index) }}>同意</Button>
              <Button size="small" danger="true" onClick={() => { this.clickReject(text,record,index) }}>拒绝</Button>
            </Space>
          ),
        },
      ]
    }
  }
  render() {
    console.log(this.state);
    return (
      <div id="news">
        <div className="header">
          <Table
            columns={this.state.columns}
            dataSource={this.state.data}
            pagination={this.state.pagination}
            loading={this.state.loading}
            rowKey="name"
          />
        </div>
      </div>
    )

  }
  clickAgree = (text,record,index) => {
    let newData = [...this.state.data];
    let pagination = {...this.state.pagination};
    pagination.total = pagination.total-1;
    newData.splice((this.state.pagination.current-1)*this.state.pagination.pageSize+index,1);
    this.setState({
      data:newData,
      pagination:pagination
    })
    console.log(record);//这是这一行的数据
    // console.log(store.getState());
    // agreeChange("2017210952")
  }
  clickReject = (text,record,index) => {
    let newData = [...this.state.data];
    let pagination = {...this.state.pagination};
    pagination.total = pagination.total-1;
    newData.splice((this.state.pagination.current-1)*this.state.pagination.pageSize+index,1);
    this.setState({
      data:newData,
      pagination:pagination
    })
    console.log(record);//这是这一行的数据
    // console.log(store.getState());
    // agreeChange("2017210952")
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


