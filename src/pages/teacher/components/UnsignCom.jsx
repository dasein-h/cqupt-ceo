import React from 'react'
import { Table, Button, notification, Space, message } from "antd"
import { noSign, setNosign } from '../../../until/api/teacherApi'
class UnsignCom extends React.Component {
    constructor(props) {
        super(props)
        localStorage.setItem("signKey", JSON.stringify({ key: 2, route: '/Teacher/Sign/UnSign' }))
        this.state = {
            teachclass: localStorage.getItem("teachclass"),
            loading: true,
            data: [],
            pagination: {
                showQuickJumper: true,
                late: "迟到",
                drop: "旷课",
                onclass: "到勤",
                showSizeChanger: false,
                pageSize: 7,
                current: 1,
                total: "",
                hideOnSinglePage: true,
                onChange: (page, pageSize) => {
                    //   this.changePage(page);
                    this.state.pagination.current = page
                }
            },
            columns: [
                // {
                //     title: '名字',
                //     dataIndex: 'name',

                // },
                {
                    title: '学号',
                    dataIndex: 'id',

                },
                {
                    title: '状态',
                    dataIndex: 'sign'
                },
                {
                    title: '时间',
                    dataIndex: 'time'
                },
                {
                    title: '操作',
                    dataIndex: 'agree',
                    render: (text, record, index) => {
                        return (
                            <Space>
                                <Button size="small" disabled={record.agree.read} type="primary" ghost onClick={() => { this.setOn(record, index) }}>{record.onclass}</Button>
                                <Button size="small" disabled={record.agree.read} type="primary" ghost onClick={() => { this.setOther(record, index) }}>{record.setSign}</Button>
                            </Space>
                        )
                    }
                }
            ]
        }
    }
    componentDidMount() {
        this.changePage();
    }
    changePage = (page) => {
        let lists = [];
        noSign(this.state.teachclass).then((res) => {
            this.setState({ loading: false });
            if (res.data.flag === false) {
                this.setState({
                    data: []
                })
                message.info('没有缺勤学生!')
            } else {
                let rs = res.data.data;
                for (let i = 0; i < rs.length; i++) {
                    let sign;
                    let setsign;
                    if (rs[i].sign === 1) {
                        sign = "迟到"
                        setsign = "旷课"
                    } else if (rs[i].sign === 2) {
                        sign = "旷课"
                        setsign = "迟到"
                    }
                    lists.push({
                        "id": rs[i].studentId,
                        "time": rs[i].addtime,
                        "index": i,
                        "onclass": "出勤",
                        "sign": sign,
                        "setSign": setsign,
                        "agree": {
                            read: false,
                        }
                    })
                }
                let pagination = { ...this.state.pagination };
                pagination.total = rs.length;
                this.setState({ data: lists, pagination: pagination });
                //   console.log(this.state.pagination.total);
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
    render() {
        return (
            <div style={{minHeight:'350px'}}>
                <Table
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    columns={this.state.columns}
                    dataSource={this.state.data}
                    rowKey={record => record.index}
                ></Table>
            </div>
        )
    }
    setOn = (record, index) => {
        let num = (this.state.pagination.current - 1) * (this.state.pagination.pageSize) + index;
        let info = this.state.data[num]
        setNosign(this.state.teachclass, info.id, 1, 0, info.time).then(rs => {
            if (rs.data.flag === true) {
                message.success('设置成功');
                let data = [...this.state.data];
                let pagination = { ...this.state.pagination };
                pagination.total = pagination.total - 1;
                data.splice(num, 1);
                if (pagination.current === (pagination.total) / 7 + 1) {
                    if (parseInt.current !== 1)
                        pagination.current -= 1;
                }
                this.setState({
                    data: data,
                    pagination
                })

            } else {
                message.error('设置失败')
            }
        })
    }
    setOther = (record, index) => {
        let num = (this.state.pagination.current - 1) * (this.state.pagination.pageSize) + index;
        let info = this.state.data[num]
        let type;
        if (record.sign === "迟到") {
            type = 2;
        } else if (record.sign === "旷课") {
            type = 1;
        }
        setNosign(this.state.teachclass, info.id, 1, type, info.time).then(rs => {
            if (rs.data.flag === true) {
                let data = this.state.data;
                let setType;
                if (data[num].setSign === "迟到") {
                    setType = "旷课"
                } else {
                    setType = "迟到"
                }
                data[num].sign = data[num].setSign;
                data[num].setSign = setType;
                this.setState({ data })
                message.success('设置成功')
            } else {
                message.error('设置失败!')
            }
        })
    }
}
export default UnsignCom