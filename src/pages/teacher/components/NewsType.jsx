import React from 'react'
// import {
//     showChangeNewsType,
//     agreeNewsType,
//     rejectNewsType
// } from '../../../until/api/teacherApi'
import { 
    // Table, Space, Button, notification, 
    // Input, Select, 
    message } from 'antd'
import '../../../static/style/teacherStyle.scss'
// const { Search } = Input
// const { Option } = Select;
class newsType extends React.Component {
    constructor(...props) {
        super(...props)
        localStorage.setItem("newsKey",JSON.stringify({key:2,route:'/Teacher/News/Type'}))
        message.info('暂无数据!')
    //     this.state = {
    //         teachclass: localStorage.getItem("teachclass"),
    //         select: "name",
    //         value: "",
    //         loading: true,
    //         data: [],
    //         pagination: {
    //             showSizeChanger: false,
    //             pageSize: 7,
    //             current: 1,
    //             total: "",
    //             hideOnSinglePage: true,
    //             onChange: (page, pageSize) => {
    //                 this.changePage(page);
    //                 this.state.pagination.current = page
    //             }
    //         },
    //         columns: [
    //             {
    //                 title: '申请人姓名',
    //                 dataIndex: 'name',
    //             },
    //             {
    //                 title: '申请人学号',
    //                 dataIndex: 'id'
    //             },
    //             {
    //                 title: '原公司名',
    //                 dataIndex: 'message',
    //             },
    //             {
    //                 title: '修改后公司名',
    //                 dataIndex: 'error',
    //             },
    //             {
    //                 title: '操作',
    //                 dataIndex: 'agree',
    //                 render: (text, record, index) => (
    //                     <Space size="middle">
    //                         <Button size="small" type="primary" ghost onClick={() => { this.clickAgree(text, record, index) }}>同意</Button>
    //                         <Button size="small" danger="true" onClick={() => { this.clickReject(text, record, index) }}>拒绝</Button>
    //                     </Space>
    //                 ),
    //             },
    //         ],

    //     }
    }
    render() {
        return (
            <div id="news">
                <div style={{minHeight:'350px'}}>
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
                {/* <div className="header">
                    <Table
                        columns={this.state.columns}
                        dataSource={this.state.data}
                        pagination={this.state.pagination}
                        loading={this.state.loading}
                        rowKey="index"
                    />
                </div> */}
            </div>
        )

    }
  
    // componentDidMount() {
    //     this.changePage(1)
    // }
    // clickAgree = (text, record, index) => {
    //     agreeNewsType(record.ceo, record.type, record.id).then((rs) => {
    //         let res = rs.data;
    //         console.log(res);
    //         if (res.flag === true) {
    //             console.log(this.state.pagination.current);
    //             this.changePage(this.state.pagination.current)
    //             message.success('同意改名成功!');

    //         } else {
    //             message.error('同意改名失败!');
    //         }
    //     })

    // }
    // clickReject = (text, record, index) => {
    //     rejectNewsType(record.ceo, record.id).then((rs) => {
    //         let res = rs.data;
    //         console.log(res);
    //         if (res.flag === true) {
    //             message.success('拒绝改名成功!');
    //         } else {
    //             message.error('同意改名失败!');
    //         }
    //     })
    //     this.changePage(this.state.pagination.current)
    // }
    // changePage = (page, news) => {
    //     let lists = [];
    //     let newPage = page;
    //     changeCompanyName(this.state.teachclass, newPage).then(
    //         res => {
    //             this.setState({ loading: false })
    //             let rs = JSON.parse(res.data);
    //             if (rs.length === 0) {
    //                 this.setState({
    //                     data: []
    //                 })
    //             } else {
    //                 for (let i = 0; i < rs.length; i++) {
    //                     lists.push({
    //                         "message": rs[i].message,
    //                         "error": rs[i].error,
    //                         "name": rs[i].data.userName,
    //                         "id": rs[i].data.userId,
    //                         "index": i
    //                     })
    //                 }
    //                 let pagination = { ...this.state.pagination };
    //                 pagination.total = rs[0].page
    //                 this.setState({ data: lists, pagination: pagination });
    //                 console.log(this.state.data);
    //             }

    //         }).catch(err => {
    //             console.log(err)
    //             this.setState({ loading: false })
    //             notification.warning({
    //                 message: '警告',
    //                 placement: "bottomRight",
    //                 description:
    //                     '请求超时或服务器异常,请检查网络或联系管理员!',
    //             });
    //         })
    // }
}
export default newsType